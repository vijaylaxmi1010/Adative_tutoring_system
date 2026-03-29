export type LearningPreference = 'video' | 'text';
export type StudentLevel = 'low' | 'medium' | 'high';
export type QuestionType = 'mcq' | 'arrange' | 'match' | 'true-false';
export type TopicTrack = 'geometry' | 'construction' | 'capstone';

export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  grade: string;
  preference: LearningPreference;
  createdAt: string;
}

export interface Topic {
  id: string;
  name: string;
  subtopics: string[];
  layer: number;
  track: TopicTrack;
  difficulty: number;
  prerequisites: string[];
  description: string;
  color: string;
}

export interface BKTParams {
  topicId: string;
  pL: number;
  pL0: number;
  pT: number;
  pG: number;
  pS: number;
}

export interface Question {
  id: string;
  topicId: string;
  subtopic: string;
  text: string;
  type: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  difficultyScore: number;
  avgTimeSeconds: number;
  options?: string[];
  correctAnswer: string | string[];
  hints: [string, string, string, string];
  explanation: string;
  isPreAssessment: boolean;
}

export interface TopicProgress {
  topicId: string;
  studentId: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  pL: number;
  pL0: number;
  pT: number;
  pG: number;
  pS: number;
  preAssessmentScore?: number;
  studentLevel?: StudentLevel;
  assessmentScore?: number;
  hintsUsed: number;
  totalQuestions: number;
  correctAnswers: number;
  assessmentAttempts: number;
  remedialAttempts: number;
  weakSubtopics: string[];
  completedAt?: string;
}

export interface QuestionResponse {
  questionId: string;
  isCorrect: boolean;
  hintsUsed: number;
  timeTakenSeconds: number;
  selectedAnswer: string | string[];
}

export interface AppState {
  student: StudentProfile | null;
  topicProgress: Record<string, TopicProgress>;
  currentTopicId: string | null;
  responses: QuestionResponse[];
}

export interface TopicContent {
  topicId: string;
  textContent: string;
  videoUrl: string;
  revisionContent: string;
  remedialContent: Record<string, string>;
}
