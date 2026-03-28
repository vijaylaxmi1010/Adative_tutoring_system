import { AppState, TopicProgress, QuestionResponse, StudentProfile } from '@/types';
import { TOPICS } from './mock-data';

const STATE_KEY = 'ats_state';

export function getDefaultState(): AppState {
  const topicProgress: Record<string, TopicProgress> = {};
  for (const topic of TOPICS) {
    topicProgress[topic.id] = {
      topicId: topic.id,
      studentId: '',
      isUnlocked: topic.prerequisites.length === 0,
      isCompleted: false,
      pL: 0,
      pL0: 0,
      pT: 0.1,
      pG: 0.2,
      pS: 0.1,
      hintsUsed: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      weakSubtopics: [],
    };
  }
  return {
    student: null,
    topicProgress,
    currentTopicId: null,
    responses: [],
  };
}

export function getState(): AppState {
  if (typeof window === 'undefined') return getDefaultState();
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw) as AppState;
    // Ensure all topics exist in progress
    const state = { ...parsed };
    const defaultState = getDefaultState();
    for (const topic of TOPICS) {
      if (!state.topicProgress[topic.id]) {
        state.topicProgress[topic.id] = defaultState.topicProgress[topic.id];
      }
    }
    return state;
  } catch {
    return getDefaultState();
  }
}

export function saveState(state: AppState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {
    // Storage might be full
  }
}

export function setStudent(student: StudentProfile): void {
  const state = getState();
  state.student = student;
  // Update studentId in all topic progress
  for (const key of Object.keys(state.topicProgress)) {
    state.topicProgress[key].studentId = student.id;
  }
  saveState(state);
}

export function updateTopicProgress(topicId: string, updates: Partial<TopicProgress>): void {
  const state = getState();
  if (state.topicProgress[topicId]) {
    state.topicProgress[topicId] = {
      ...state.topicProgress[topicId],
      ...updates,
    };
  }
  saveState(state);
}

export function unlockNextTopics(completedTopicId: string): void {
  const state = getState();
  for (const topic of TOPICS) {
    if (
      topic.prerequisites.includes(completedTopicId) &&
      !state.topicProgress[topic.id].isUnlocked
    ) {
      // Check if ALL prerequisites are completed
      const allPrereqsDone = topic.prerequisites.every(
        (prereqId) => state.topicProgress[prereqId]?.isCompleted
      );
      if (allPrereqsDone) {
        state.topicProgress[topic.id].isUnlocked = true;
      }
    }
  }
  saveState(state);
}

export function addResponse(response: QuestionResponse): void {
  const state = getState();
  // Remove any existing response for this question
  state.responses = state.responses.filter((r) => r.questionId !== response.questionId);
  state.responses.push(response);
  saveState(state);
}

export function setCurrentTopic(topicId: string | null): void {
  const state = getState();
  state.currentTopicId = topicId;
  saveState(state);
}

export function clearState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STATE_KEY);
}

export function getTopicProgress(topicId: string): TopicProgress | null {
  const state = getState();
  return state.topicProgress[topicId] || null;
}

export function getOverallProgress(): number {
  const state = getState();
  const progresses = Object.values(state.topicProgress);
  if (progresses.length === 0) return 0;
  const total = progresses.reduce((sum, p) => sum + p.pL, 0);
  return total / progresses.length;
}
