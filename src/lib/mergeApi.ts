// Merge Platform API Integration
// Handles session extraction from redirect URL and recommendation submission

/** Canonical chapter ID assigned to this team — must match the Merge portal exactly */
export const CHAPTER_ID = 'grade6_lines_and_angles_and_constructions';

const RECOMMEND_URL = 'https://kaushik-dev.online/api/recommend/';
const PENDING_KEY = 'pendingRecommendation';

export function extractSessionParams(): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const student_id = params.get('student_id');
  const session_id = params.get('session_id');
  if (token) {
    sessionStorage.setItem('merge_token', token);
    // Record session start time for time_spent_seconds tracking
    sessionStorage.setItem('merge_session_start', Date.now().toString());
  }
  if (student_id) sessionStorage.setItem('merge_student_id', student_id);
  if (session_id) sessionStorage.setItem('merge_session_id', session_id);
}

export function getSessionParams() {
  if (typeof window === 'undefined') {
    return { token: null, student_id: null, session_id: null };
  }
  return {
    token: sessionStorage.getItem('merge_token'),
    student_id: sessionStorage.getItem('merge_student_id'),
    session_id: sessionStorage.getItem('merge_session_id'),
  };
}

/** Returns the Unix timestamp (ms) when the Merge session started */
export function getSessionStartTime(): number {
  if (typeof window === 'undefined') return Date.now();
  const stored = sessionStorage.getItem('merge_session_start');
  return stored ? parseInt(stored, 10) : Date.now();
}

export interface RecommendPayload {
  student_id: string;
  session_id: string;
  chapter_id: string;
  timestamp: string;
  session_status: 'completed' | 'exited_midway';
  correct_answers: number;
  wrong_answers: number;
  questions_attempted: number;
  total_questions: number;
  retry_count: number;
  hints_used: number;
  total_hints_embedded: number;
  time_spent_seconds: number;
  topic_completion_ratio: number;
}

export interface RecommendResponse {
  student_id: string;
  chapter_id: string;
  performance_score: number;
  confidence_score: number;
  learning_state: string;
  diagnosis: {
    accuracy: number;
    hint_dependency: string;
    retry_behavior: string;
    time_efficiency: string;
    history: {
      past_attempts: number;
      avg_performance: number;
      trend: string;
    };
  };
  recommendation: {
    type: string;
    reason: string;
    next_steps: string[];
    prerequisite_url?: string;
  };
}

/**
 * Validates payload against all rules from section 8.4.
 * Returns { valid: true } on success, or { valid: false, error } on failure.
 */
export function validatePayload(payload: RecommendPayload): { valid: boolean; error?: string } {
  const {
    correct_answers,
    wrong_answers,
    questions_attempted,
    total_questions,
    retry_count,
    hints_used,
    total_hints_embedded,
    topic_completion_ratio,
    session_status,
  } = payload;

  if (correct_answers + wrong_answers !== questions_attempted) {
    return {
      valid: false,
      error: `correct_answers(${correct_answers}) + wrong_answers(${wrong_answers}) must equal questions_attempted(${questions_attempted})`,
    };
  }
  if (questions_attempted > total_questions) {
    return {
      valid: false,
      error: `questions_attempted(${questions_attempted}) must be <= total_questions(${total_questions})`,
    };
  }
  if (retry_count > questions_attempted) {
    return {
      valid: false,
      error: `retry_count(${retry_count}) must be <= questions_attempted(${questions_attempted})`,
    };
  }
  if (hints_used > total_hints_embedded) {
    return {
      valid: false,
      error: `hints_used(${hints_used}) must be <= total_hints_embedded(${total_hints_embedded})`,
    };
  }
  if (topic_completion_ratio < 0 || topic_completion_ratio > 1) {
    return {
      valid: false,
      error: `topic_completion_ratio(${topic_completion_ratio}) must be between 0 and 1`,
    };
  }
  if (session_status === 'completed' && questions_attempted !== total_questions) {
    return {
      valid: false,
      error: `When session_status is "completed", questions_attempted(${questions_attempted}) must equal total_questions(${total_questions})`,
    };
  }

  return { valid: true };
}

/** POST with exponential backoff. Throws on all retries exhausted. */
async function submitWithRetry(
  payload: RecommendPayload,
  token: string,
  maxRetries = 3,
): Promise<RecommendResponse> {
  let lastError: unknown;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(RECOMMEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) return (await response.json()) as RecommendResponse;

      const body = await response.text().catch(() => '');
      console.error(`[Merge API] Attempt ${attempt + 1} — HTTP ${response.status}:`, body);
      lastError = new Error(`API error ${response.status}: ${body}`);
    } catch (err) {
      console.error(`[Merge API] Attempt ${attempt + 1} — network error:`, err);
      lastError = err;
    }

    if (attempt < maxRetries - 1) {
      // Exponential backoff: 1 s, 2 s, 3 s
      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }

  throw lastError;
}

/**
 * Validates the payload, then sends it to the Recommendation API with retry.
 * Saves to localStorage on total failure so it can be retried next session.
 * Returns the recommendation response, or null on failure.
 */
export async function sendRecommendation(payload: RecommendPayload): Promise<RecommendResponse | null> {
  const validation = validatePayload(payload);
  if (!validation.valid) {
    console.error('[Merge API] Payload validation failed — not sending:', validation.error, payload);
    return null;
  }

  const { token } = getSessionParams();

  try {
    const result = await submitWithRetry(payload, token ?? '', 3);
    // Clear any pending recommendation since this one succeeded
    try { localStorage.removeItem(PENDING_KEY); } catch { /* ignore */ }
    return result;
  } catch (error) {
    console.error('[Merge API] All retries failed. Saving payload locally for next session.', error);
    try {
      localStorage.setItem(PENDING_KEY, JSON.stringify(payload));
    } catch { /* ignore storage errors */ }
    return null;
  }
}

/**
 * Called on app load. If a previous session failed to send its recommendation,
 * retries it now using the current session token.
 * The same session_id is reused — the server deduplicates duplicate submissions.
 */
export async function retryPendingRecommendation(): Promise<void> {
  if (typeof window === 'undefined') return;

  const pending = localStorage.getItem(PENDING_KEY);
  if (!pending) return;

  const { token } = getSessionParams();
  if (!token) return; // can't retry without an auth token

  let payload: RecommendPayload;
  try {
    payload = JSON.parse(pending) as RecommendPayload;
  } catch {
    localStorage.removeItem(PENDING_KEY);
    return;
  }

  console.log('[Merge API] Retrying pending recommendation from previous session…');
  try {
    await submitWithRetry(payload, token, 3);
    localStorage.removeItem(PENDING_KEY);
    console.log('[Merge API] Pending recommendation delivered successfully.');
  } catch (error) {
    console.error('[Merge API] Retry of pending recommendation failed:', error);
  }
}
