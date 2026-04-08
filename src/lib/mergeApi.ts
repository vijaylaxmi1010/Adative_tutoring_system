// Merge Platform API Integration
// Handles session extraction from redirect URL and recommendation submission

export function extractSessionParams(): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const student_id = params.get('student_id');
  const session_id = params.get('session_id');
  if (token) sessionStorage.setItem('merge_token', token);
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

export async function sendRecommendation(payload: RecommendPayload): Promise<RecommendResponse | null> {
  const { token } = getSessionParams();

  try {
    const response = await fetch('https://kaushik-dev.online/api/recommend/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token ?? ''}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json() as RecommendResponse;
  } catch (error) {
    console.error('Failed to send recommendation:', error);
    try {
      localStorage.setItem('pendingRecommendation', JSON.stringify(payload));
    } catch { /* ignore storage errors */ }
    return null;
  }
}
