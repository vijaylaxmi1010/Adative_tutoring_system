import { BKTParams, StudentLevel, QuestionResponse, Question } from '@/types';

type BKTCoreDefaults = Pick<BKTParams, 'pL0' | 'pT' | 'pG' | 'pS'>;

type PreSurveyConfig = {
  easyWeight: number;
  mediumWeight: number;
  hardWeight: number;
  lowThreshold: number;
  highThreshold: number;
  pL0Map: {
    low: number;
    medium: number;
    high: number;
  };
};

type AssessmentConfig = {
  correctWeight: {
    easy: number;
    medium: number;
    hard: number;
  };
  remedialThreshold: number;
};

type EngagementConfig = {
  maxHintsPerQuestion: number;
  emotionAlertFrames: number;
  timeOverrunFactor: number;
  popupCooldownSeconds: number;
};

type ProgressionConfig = {
  remedialTriggerPL: number;
  maxRemedialAttempts: number;
  unlockThresholdPL: number;
  maxAttemptsBeforeForceAdvance: number;
  finalScoreWeight: number;
  bonusNoHintsFirstAttempt: number;
  penaltyPerExtraRemedialRound: number;
};

export const TOPIC_BKT_DEFAULTS: Record<string, BKTCoreDefaults> = {
  'LA-01': { pL0: 0.2, pT: 0.3, pG: 0.2, pS: 0.1 },
  'LA-02': { pL0: 0.15, pT: 0.28, pG: 0.18, pS: 0.12 },
  'LA-03': { pL0: 0.12, pT: 0.25, pG: 0.15, pS: 0.13 },
  'LA-04': { pL0: 0.1, pT: 0.22, pG: 0.14, pS: 0.14 },
  'LA-05': { pL0: 0.18, pT: 0.27, pG: 0.17, pS: 0.11 },
  'PC-01': { pL0: 0.15, pT: 0.25, pG: 0.16, pS: 0.12 },
  'PC-02': { pL0: 0.1, pT: 0.22, pG: 0.14, pS: 0.14 },
  'PC-03': { pL0: 0.08, pT: 0.2, pG: 0.12, pS: 0.15 },
  'PC-04': { pL0: 0.08, pT: 0.18, pG: 0.12, pS: 0.16 },
  'PC-05': { pL0: 0.05, pT: 0.15, pG: 0.1, pS: 0.18 },
};

const TOPIC_PRE_SURVEY_CONFIG: Record<string, PreSurveyConfig> = {
  'LA-01': { easyWeight: 1, mediumWeight: 1.5, hardWeight: 2, lowThreshold: 6.9, highThreshold: 10.3, pL0Map: { low: 0.1, medium: 0.2, high: 0.35 } },
  'LA-02': { easyWeight: 1, mediumWeight: 1.5, hardWeight: 2, lowThreshold: 6.9, highThreshold: 10.3, pL0Map: { low: 0.08, medium: 0.15, high: 0.28 } },
  'LA-03': { easyWeight: 1, mediumWeight: 1.5, hardWeight: 2, lowThreshold: 7.5, highThreshold: 11.2, pL0Map: { low: 0.06, medium: 0.12, high: 0.25 } },
  'LA-04': { easyWeight: 1, mediumWeight: 1.5, hardWeight: 2.5, lowThreshold: 8.4, highThreshold: 12.6, pL0Map: { low: 0.05, medium: 0.1, high: 0.22 } },
  'LA-05': { easyWeight: 1, mediumWeight: 1.5, hardWeight: 2, lowThreshold: 6.9, highThreshold: 10.3, pL0Map: { low: 0.08, medium: 0.18, high: 0.3 } },
  'PC-01': { easyWeight: 1, mediumWeight: 1.5, hardWeight: 2, lowThreshold: 6.9, highThreshold: 10.3, pL0Map: { low: 0.08, medium: 0.15, high: 0.28 } },
  'PC-02': { easyWeight: 1, mediumWeight: 1.5, hardWeight: 2.5, lowThreshold: 8.4, highThreshold: 12.6, pL0Map: { low: 0.05, medium: 0.1, high: 0.22 } },
  'PC-03': { easyWeight: 1, mediumWeight: 1.5, hardWeight: 2.5, lowThreshold: 8.4, highThreshold: 12.6, pL0Map: { low: 0.04, medium: 0.08, high: 0.2 } },
  'PC-04': { easyWeight: 1, mediumWeight: 2, hardWeight: 2.5, lowThreshold: 9.3, highThreshold: 14, pL0Map: { low: 0.04, medium: 0.08, high: 0.18 } },
  'PC-05': { easyWeight: 1, mediumWeight: 2, hardWeight: 3, lowThreshold: 11.4, highThreshold: 17.1, pL0Map: { low: 0.03, medium: 0.05, high: 0.15 } },
};

const TOPIC_ASSESSMENT_CONFIG: Record<string, AssessmentConfig> = {
  'LA-01': { correctWeight: { easy: 1, medium: 1.3, hard: 1.8 }, remedialThreshold: 0.6 },
  'LA-02': { correctWeight: { easy: 1, medium: 1.3, hard: 1.8 }, remedialThreshold: 0.6 },
  'LA-03': { correctWeight: { easy: 1, medium: 1.4, hard: 2 }, remedialThreshold: 0.55 },
  'LA-04': { correctWeight: { easy: 1, medium: 1.4, hard: 2 }, remedialThreshold: 0.55 },
  'LA-05': { correctWeight: { easy: 1, medium: 1.3, hard: 1.8 }, remedialThreshold: 0.6 },
  'PC-01': { correctWeight: { easy: 1, medium: 1.3, hard: 1.8 }, remedialThreshold: 0.6 },
  'PC-02': { correctWeight: { easy: 1, medium: 1.4, hard: 2 }, remedialThreshold: 0.55 },
  'PC-03': { correctWeight: { easy: 1, medium: 1.4, hard: 2 }, remedialThreshold: 0.55 },
  'PC-04': { correctWeight: { easy: 1, medium: 1.5, hard: 2.2 }, remedialThreshold: 0.5 },
  'PC-05': { correctWeight: { easy: 1, medium: 1.5, hard: 2.5 }, remedialThreshold: 0.5 },
};

const TOPIC_ENGAGEMENT_CONFIG: Record<string, EngagementConfig> = {
  'LA-01': { maxHintsPerQuestion: 4, emotionAlertFrames: 20, timeOverrunFactor: 1.5, popupCooldownSeconds: 60 },
  'LA-02': { maxHintsPerQuestion: 4, emotionAlertFrames: 20, timeOverrunFactor: 1.5, popupCooldownSeconds: 60 },
  'LA-03': { maxHintsPerQuestion: 4, emotionAlertFrames: 18, timeOverrunFactor: 1.4, popupCooldownSeconds: 60 },
  'LA-04': { maxHintsPerQuestion: 4, emotionAlertFrames: 18, timeOverrunFactor: 1.4, popupCooldownSeconds: 60 },
  'LA-05': { maxHintsPerQuestion: 4, emotionAlertFrames: 20, timeOverrunFactor: 1.5, popupCooldownSeconds: 60 },
  'PC-01': { maxHintsPerQuestion: 4, emotionAlertFrames: 20, timeOverrunFactor: 1.5, popupCooldownSeconds: 60 },
  'PC-02': { maxHintsPerQuestion: 4, emotionAlertFrames: 18, timeOverrunFactor: 1.4, popupCooldownSeconds: 60 },
  'PC-03': { maxHintsPerQuestion: 4, emotionAlertFrames: 18, timeOverrunFactor: 1.4, popupCooldownSeconds: 60 },
  'PC-04': { maxHintsPerQuestion: 4, emotionAlertFrames: 15, timeOverrunFactor: 1.3, popupCooldownSeconds: 60 },
  'PC-05': { maxHintsPerQuestion: 4, emotionAlertFrames: 15, timeOverrunFactor: 1.3, popupCooldownSeconds: 60 },
};

const TOPIC_PROGRESSION_CONFIG: Record<string, ProgressionConfig> = {
  'LA-01': { remedialTriggerPL: 0.5, maxRemedialAttempts: 2, unlockThresholdPL: 0.85, maxAttemptsBeforeForceAdvance: 4, finalScoreWeight: 10, bonusNoHintsFirstAttempt: 0.05, penaltyPerExtraRemedialRound: 0.02 },
  'LA-02': { remedialTriggerPL: 0.5, maxRemedialAttempts: 2, unlockThresholdPL: 0.85, maxAttemptsBeforeForceAdvance: 4, finalScoreWeight: 12, bonusNoHintsFirstAttempt: 0.05, penaltyPerExtraRemedialRound: 0.02 },
  'LA-03': { remedialTriggerPL: 0.45, maxRemedialAttempts: 2, unlockThresholdPL: 0.8, maxAttemptsBeforeForceAdvance: 4, finalScoreWeight: 10, bonusNoHintsFirstAttempt: 0.05, penaltyPerExtraRemedialRound: 0.02 },
  'LA-04': { remedialTriggerPL: 0.45, maxRemedialAttempts: 2, unlockThresholdPL: 0.8, maxAttemptsBeforeForceAdvance: 4, finalScoreWeight: 12, bonusNoHintsFirstAttempt: 0.05, penaltyPerExtraRemedialRound: 0.02 },
  'LA-05': { remedialTriggerPL: 0.45, maxRemedialAttempts: 2, unlockThresholdPL: 0.82, maxAttemptsBeforeForceAdvance: 4, finalScoreWeight: 10, bonusNoHintsFirstAttempt: 0.05, penaltyPerExtraRemedialRound: 0.02 },
  'PC-01': { remedialTriggerPL: 0.45, maxRemedialAttempts: 2, unlockThresholdPL: 0.82, maxAttemptsBeforeForceAdvance: 4, finalScoreWeight: 10, bonusNoHintsFirstAttempt: 0.05, penaltyPerExtraRemedialRound: 0.02 },
  'PC-02': { remedialTriggerPL: 0.4, maxRemedialAttempts: 2, unlockThresholdPL: 0.8, maxAttemptsBeforeForceAdvance: 4, finalScoreWeight: 12, bonusNoHintsFirstAttempt: 0.05, penaltyPerExtraRemedialRound: 0.02 },
  'PC-03': { remedialTriggerPL: 0.4, maxRemedialAttempts: 2, unlockThresholdPL: 0.78, maxAttemptsBeforeForceAdvance: 4, finalScoreWeight: 12, bonusNoHintsFirstAttempt: 0.05, penaltyPerExtraRemedialRound: 0.02 },
  'PC-04': { remedialTriggerPL: 0.4, maxRemedialAttempts: 2, unlockThresholdPL: 0.78, maxAttemptsBeforeForceAdvance: 4, finalScoreWeight: 12, bonusNoHintsFirstAttempt: 0.05, penaltyPerExtraRemedialRound: 0.02 },
  'PC-05': { remedialTriggerPL: 0.35, maxRemedialAttempts: 2, unlockThresholdPL: 0.75, maxAttemptsBeforeForceAdvance: 4, finalScoreWeight: 10, bonusNoHintsFirstAttempt: 0.05, penaltyPerExtraRemedialRound: 0.02 },
};

export function getTopicBKTDefaults(topicId: string): BKTCoreDefaults {
  return TOPIC_BKT_DEFAULTS[topicId] ?? { pL0: 0.1, pT: 0.1, pG: 0.2, pS: 0.1 };
}

export function getTopicAssessmentConfig(topicId: string): AssessmentConfig {
  return TOPIC_ASSESSMENT_CONFIG[topicId] ?? {
    correctWeight: { easy: 1, medium: 1.3, hard: 1.8 },
    remedialThreshold: 0.6,
  };
}

export function getTopicEngagementConfig(topicId: string): EngagementConfig {
  return TOPIC_ENGAGEMENT_CONFIG[topicId] ?? {
    maxHintsPerQuestion: 4,
    emotionAlertFrames: 20,
    timeOverrunFactor: 1.5,
    popupCooldownSeconds: 60,
  };
}

export function getTopicProgressionConfig(topicId: string): ProgressionConfig {
  return TOPIC_PROGRESSION_CONFIG[topicId] ?? {
    remedialTriggerPL: 0.5,
    maxRemedialAttempts: 2,
    unlockThresholdPL: 0.8,
    maxAttemptsBeforeForceAdvance: 4,
    finalScoreWeight: 10,
    bonusNoHintsFirstAttempt: 0.05,
    penaltyPerExtraRemedialRound: 0.02,
  };
}

export interface BKTUpdateInput {
  params: BKTParams;
  isCorrect: boolean;
  difficultyScore: number;
  avgTimeSeconds: number;
  timeTakenSeconds: number;
  hintsUsed: number;
}

export function updateBKT(input: BKTUpdateInput): BKTParams {
  const { params, isCorrect, difficultyScore, avgTimeSeconds, timeTakenSeconds, hintsUsed } = input;
  let { pL, pT, pG, pS } = params;

  // Adjust pG and pS based on time taken
  let adjustedPG = pG;
  let adjustedPS = pS;

  if (isCorrect) {
    // Very fast correct answer may indicate guessing
    if (timeTakenSeconds < 0.5 * avgTimeSeconds) {
      adjustedPG = Math.min(0.5, pG * 1.2);
    }
    // Slow but correct indicates careful thinking (reduce slip)
    if (timeTakenSeconds > 2 * avgTimeSeconds) {
      adjustedPS = Math.max(0.05, pS * 0.9);
    }
  }

  // Hints used reduce confidence in knowledge assessment
  const hintPenalty = hintsUsed * 0.05;
  adjustedPS = Math.min(0.4, adjustedPS + hintPenalty);

  // Standard BKT update
  const pCorrect = pL * (1 - adjustedPS) + (1 - pL) * adjustedPG;
  const pWrong = pL * adjustedPS + (1 - pL) * (1 - adjustedPG);

  let pLGivenEvidence: number;
  if (isCorrect) {
    pLGivenEvidence = (pL * (1 - adjustedPS)) / Math.max(pCorrect, 0.001);
  } else {
    pLGivenEvidence = (pL * adjustedPS) / Math.max(pWrong, 0.001);
  }

  // Transit: P(L_{n+1}) = P(L_n | evidence) + (1 - P(L_n | evidence)) * P(T)
  let transitMultiplier = 1.0;

  const assessmentConfig = getTopicAssessmentConfig(params.topicId);

  // Difficulty weighting
  if (isCorrect) {
    if (difficultyScore < 0.34) {
      transitMultiplier = assessmentConfig.correctWeight.easy;
    } else if (difficultyScore < 0.67) {
      transitMultiplier = assessmentConfig.correctWeight.medium;
    } else {
      transitMultiplier = assessmentConfig.correctWeight.hard;
    }
  } else {
    if (difficultyScore < 0.3) {
      transitMultiplier = 0.7; // Easy question wrong: bigger penalty
    }
  }

  const effectivePT = Math.min(pT * transitMultiplier, 0.5);
  let newPL = pLGivenEvidence + (1 - pLGivenEvidence) * effectivePT;

  // Clamp
  newPL = Math.min(Math.max(newPL, 0.01), 0.99);

  return {
    ...params,
    pL: newPL,
    pG: adjustedPG,
    pS: adjustedPS,
  };
}

export function calculatePL0FromPreAssessment(
  topicId: string,
  responses: QuestionResponse[],
  questions: Question[]
): number {
  if (responses.length === 0) return 0.1;

  const preSurveyConfig = TOPIC_PRE_SURVEY_CONFIG[topicId];
  if (!preSurveyConfig) return 0.1;

  const getQuestionWeight = (question: Question) => {
    if (question.difficulty === 'easy') return preSurveyConfig.easyWeight;
    if (question.difficulty === 'hard') return preSurveyConfig.hardWeight;
    return preSurveyConfig.mediumWeight;
  };

  const totalWeight = questions.reduce((sum, question) => sum + getQuestionWeight(question), 0);
  let weightedScore = 0;

  for (const response of responses) {
    const question = questions.find((q) => q.id === response.questionId);
    if (!question) continue;

    const weight = getQuestionWeight(question);

    if (response.isCorrect) {
      // Reduce credit if hints were heavily used
      const hintReduction = response.hintsUsed * 0.1;
      const credit = Math.max(0, 1 - hintReduction);
      weightedScore += weight * credit;
    }
  }

  if (totalWeight === 0) return 0.1;

  if (weightedScore < preSurveyConfig.lowThreshold) {
    return preSurveyConfig.pL0Map.low;
  }

  if (weightedScore > preSurveyConfig.highThreshold) {
    return preSurveyConfig.pL0Map.high;
  }

  return preSurveyConfig.pL0Map.medium;
}

export function classifyStudent(topicId: string, pL0: number): StudentLevel {
  const preSurveyConfig = TOPIC_PRE_SURVEY_CONFIG[topicId];
  if (preSurveyConfig) {
    const epsilon = 1e-6;
    if (Math.abs(pL0 - preSurveyConfig.pL0Map.low) < epsilon) return 'low';
    if (Math.abs(pL0 - preSurveyConfig.pL0Map.medium) < epsilon) return 'medium';
    if (Math.abs(pL0 - preSurveyConfig.pL0Map.high) < epsilon) return 'high';
  }

  if (pL0 < 0.3) return 'low';
  if (pL0 <= 0.6) return 'medium';
  return 'high';
}

export function getInitialBKTParams(topicId: string, pL0: number): BKTParams {
  const defaults = getTopicBKTDefaults(topicId);

  return {
    topicId,
    pL: pL0,
    pL0,
    pT: defaults.pT,
    pG: defaults.pG,
    pS: defaults.pS,
  };
}
