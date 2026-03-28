import { BKTParams, StudentLevel, QuestionResponse, Question } from '@/types';

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

  // Difficulty weighting
  if (isCorrect) {
    if (difficultyScore > 0.6) {
      transitMultiplier = 1.3; // Hard question correct: bigger boost
    } else if (difficultyScore < 0.3) {
      transitMultiplier = 0.9; // Easy question correct: smaller boost
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
  responses: QuestionResponse[],
  questions: Question[]
): number {
  if (responses.length === 0) return 0.1;

  let totalWeight = 0;
  let weightedScore = 0;

  for (const response of responses) {
    const question = questions.find((q) => q.id === response.questionId);
    if (!question) continue;

    const weight = 1 + question.difficultyScore;
    totalWeight += weight;

    if (response.isCorrect) {
      // Reduce credit if hints were heavily used
      const hintReduction = response.hintsUsed * 0.1;
      const credit = Math.max(0, 1 - hintReduction);
      weightedScore += weight * credit;
    }
  }

  if (totalWeight === 0) return 0.1;

  const rawScore = weightedScore / totalWeight;
  // Map to reasonable P(L0) range: 0.05 to 0.85
  return Math.min(Math.max(rawScore * 0.8 + 0.05, 0.05), 0.85);
}

export function classifyStudent(pL0: number): StudentLevel {
  if (pL0 < 0.3) return 'low';
  if (pL0 <= 0.6) return 'medium';
  return 'high';
}

export function getInitialBKTParams(topicId: string, pL0: number): BKTParams {
  return {
    topicId,
    pL: pL0,
    pL0,
    pT: 0.1,
    pG: 0.2,
    pS: 0.1,
  };
}
