'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lightbulb, CheckCircle, XCircle, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import QuestionCard from '@/components/assessment/QuestionCard';
import HintSystem from '@/components/assessment/HintSystem';
import Timer from '@/components/assessment/Timer';
import { CircularProgress } from '@/components/ui/Progress';
import Button from '@/components/ui/Button';
import { getState, updateTopicProgress, addResponse, unlockNextTopics } from '@/lib/store';
import { QUESTIONS } from '@/lib/mock-data';
import { updateBKT } from '@/lib/bkt';
import { use } from 'react';
import { Question, QuestionResponse, BKTParams } from '@/types';
import { cn } from '@/lib/utils';

interface PageProps {
  params: Promise<{ id: string }>;
}

type AssessmentPhase = 'questions' | 'result' | 'complete';

export default function AssessmentPage({ params }: PageProps) {
  const router = useRouter();
  const { id: topicId } = use(params);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [currentResponse, setCurrentResponse] = useState<QuestionResponse | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [hintsUsedThisQuestion, setHintsUsedThisQuestion] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [bktParams, setBktParams] = useState<BKTParams | null>(null);
  const [phase, setPhase] = useState<AssessmentPhase>('questions');
  const [weakSubtopics, setWeakSubtopics] = useState<string[]>([]);
  const [showHintNudge, setShowHintNudge] = useState(false);
  const timeRef = useRef(0);
  const nudgeShownRef = useRef(false);
  const questionRef = useRef<Question | null>(null);

  useEffect(() => {
    const state = getState();
    if (!state.student) { router.push('/'); return; }
    const p = state.topicProgress[topicId];
    if (!p?.isUnlocked) { router.push('/map'); return; }

    setBktParams({
      topicId,
      pL: p.pL,
      pL0: p.pL0,
      pT: p.pT,
      pG: p.pG,
      pS: p.pS,
    });

    const qs = QUESTIONS.filter((q) => q.topicId === topicId && !q.isPreAssessment);
    // Shuffle for variety
    const shuffled = [...qs].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, [topicId, router]);

  const handleTimeUpdate = useCallback((seconds: number) => {
    timeRef.current = seconds;
    if (!nudgeShownRef.current && questionRef.current) {
      const threshold = Math.ceil(questionRef.current.avgTimeSeconds * 1.5);
      if (seconds >= threshold) {
        nudgeShownRef.current = true;
        setShowHintNudge(true);
      }
    }
  }, []);

  const handleAnswer = useCallback((answer: string | string[], isCorrect: boolean) => {
    if (!bktParams || !questions[currentIndex]) return;

    const question = questions[currentIndex];
    setTimerRunning(false);

    // Update BKT
    const updatedParams = updateBKT({
      params: bktParams,
      isCorrect,
      difficultyScore: question.difficultyScore,
      avgTimeSeconds: question.avgTimeSeconds,
      timeTakenSeconds: timeRef.current,
      hintsUsed: hintsUsedThisQuestion,
    });
    setBktParams(updatedParams);

    const response: QuestionResponse = {
      questionId: question.id,
      isCorrect,
      hintsUsed: hintsUsedThisQuestion,
      timeTakenSeconds: timeRef.current,
      selectedAnswer: answer,
    };
    setCurrentResponse(response);
    setShowResult(true);

    // Track weak subtopics
    if (!isCorrect) {
      setWeakSubtopics((prev) => {
        const updated = [...prev];
        if (!updated.includes(question.subtopic)) updated.push(question.subtopic);
        return updated;
      });
    }

    addResponse(response);

    setTimeout(() => {
      setShowResult(false);
      setCurrentResponse(null);
      setIsHintOpen(false);
      setHintsUsedThisQuestion(0);
      setShowHintNudge(false);
      nudgeShownRef.current = false;
      timeRef.current = 0;

      const newResponses = [...responses, response];
      setResponses(newResponses);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setTimerRunning(true);
      } else {
        // Done!
        setPhase('complete');
        finalizeAssessment(updatedParams, newResponses);
      }
    }, 2000);
  }, [bktParams, questions, currentIndex, hintsUsedThisQuestion, responses, topicId]);

  const finalizeAssessment = useCallback((finalParams: BKTParams, allResponses: QuestionResponse[]) => {
    const correct = allResponses.filter((r) => r.isCorrect).length;
    const totalHints = allResponses.reduce((sum, r) => sum + r.hintsUsed, 0);
    const passed = finalParams.pL >= 0.7;

    updateTopicProgress(topicId, {
      ...finalParams,
      assessmentScore: correct / allResponses.length,
      isCompleted: passed,
      hintsUsed: totalHints,
      totalQuestions: allResponses.length,
      correctAnswers: correct,
      weakSubtopics,
    });

    if (passed) {
      unlockNextTopics(topicId);
    }
  }, [topicId, weakSubtopics]);

  if (!bktParams || questions.length === 0) return null;

  const question = questions[currentIndex];
  questionRef.current = question;
  const pLPercent = Math.round(bktParams.pL * 100);
  const passed = bktParams.pL >= 0.7;

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className={cn('mx-auto px-8 sm:px-12 transition-all duration-300', isHintOpen ? 'max-w-3xl mr-80' : 'max-w-4xl')}>
          {/* Back */}
          <button
            onClick={() => router.push(`/topic/${topicId}`)}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Topic
          </button>

          {/* Questions phase */}
          {phase === 'questions' && (
            <>
              {/* Top bar */}
              <div className="flex items-center justify-between mb-5 gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">
                    Question {currentIndex + 1}/{questions.length}
                  </span>
                  <div className="flex gap-1">
                    {questions.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i < currentIndex
                            ? 'w-6 bg-emerald-500'
                            : i === currentIndex
                            ? 'w-6 bg-indigo-500 animate-pulse'
                            : 'w-4 bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Timer
                    avgTimeSeconds={question.avgTimeSeconds}
                    onTimeUpdate={handleTimeUpdate}
                    isRunning={timerRunning}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-slate-800 rounded-2xl border border-slate-700/50 p-8 shadow-xl"
                >
                  {/* Difficulty badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={cn(
                      'text-xs px-2.5 py-1 rounded-full font-medium',
                      question.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-400' :
                      question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    )}>
                      {question.difficulty}
                    </span>
                    <span className="text-xs text-slate-500">{question.subtopic}</span>
                  </div>

                  {/* Question text */}
                  <h2 className="text-2xl font-bold text-white mb-8 leading-snug">
                    {question.text}
                  </h2>

                  {/* Answer result */}
                  <AnimatePresence>
                    {showResult && currentResponse && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-0 flex items-center justify-center rounded-2xl z-20 backdrop-blur-sm ${
                          currentResponse.isCorrect ? 'bg-emerald-900/80' : 'bg-red-900/80'
                        }`}
                      >
                        <div className="text-center">
                          {currentResponse.isCorrect ? (
                            <CheckCircle size={48} className="text-emerald-400 mx-auto mb-2" />
                          ) : (
                            <XCircle size={48} className="text-red-400 mx-auto mb-2" />
                          )}
                          <p className={`font-bold text-xl mb-1 ${currentResponse.isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
                            {currentResponse.isCorrect ? 'Correct!' : 'Incorrect'}
                          </p>
                          {!currentResponse.isCorrect && (
                            <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto px-4">
                              {question.explanation}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <QuestionCard
                    question={question}
                    onAnswer={handleAnswer}
                    showResult={showResult}
                    isCorrect={currentResponse?.isCorrect ?? null}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Hint button */}
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => setIsHintOpen(!isHintOpen)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    isHintOpen
                      ? 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400'
                      : 'bg-slate-700/60 border border-slate-600/50 text-slate-400 hover:text-yellow-400 hover:border-yellow-500/30'
                  )}
                >
                  <Lightbulb size={14} />
                  Hints
                  {hintsUsedThisQuestion > 0 && (
                    <span className="w-5 h-5 rounded-full bg-yellow-500 text-slate-900 text-xs font-bold flex items-center justify-center">
                      {hintsUsedThisQuestion}
                    </span>
                  )}
                </button>
              </div>
            </>
          )}

          {/* Complete phase */}
          {phase === 'complete' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="mb-6">
                <CircularProgress
                  value={pLPercent}
                  size={100}
                  strokeWidth={8}
                  color={passed ? '#10b981' : '#6366f1'}
                  showLabel
                  className="mx-auto"
                />
              </div>

              <h2 className="text-3xl font-black text-white mb-3">
                {passed ? 'Excellent Work! 🎉' : 'Good Effort! 💪'}
              </h2>

              <p className="text-slate-400 mb-2">
                Your Score: <strong className={passed ? 'text-emerald-400' : 'text-yellow-400'}>{pLPercent}%</strong>
              </p>
              <p className="text-slate-400 mb-1">
                {responses.filter((r) => r.isCorrect).length}/{responses.length} correct answers
              </p>
              <p className="text-slate-400 mb-6">
                Hints used: {responses.reduce((sum, r) => sum + r.hintsUsed, 0)}
              </p>

              {/* Score breakdown */}
              <div className="grid grid-cols-3 gap-3 mb-8 max-w-xs mx-auto">
                {responses.map((r, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border text-sm font-bold ${
                      r.isCorrect
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                        : 'bg-red-500/15 border-red-500/40 text-red-400'
                    }`}
                  >
                    Q{i + 1}<br />
                    <span className="text-xs font-normal">{r.isCorrect ? '✓' : '✗'}</span>
                  </div>
                ))}
              </div>

              {passed ? (
                <div className="space-y-3">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl mb-4">
                    <p className="text-emerald-400 font-semibold">Topic Mastered!</p>
                    <p className="text-sm text-slate-400 mt-1">
                      New topics have been unlocked on your concept map.
                    </p>
                  </div>
                  <Button
                    variant="success"
                    size="lg"
                    className="w-full"
                    onClick={() => router.push('/map')}
                  >
                    Back to Concept Map
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {weakSubtopics.length > 0 && (
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl mb-3 text-left">
                      <p className="text-yellow-400 font-semibold text-sm mb-1">Weak areas identified:</p>
                      <div className="flex flex-wrap gap-1">
                        {weakSubtopics.map((s) => (
                          <span key={s} className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => router.push(`/topic/${topicId}/remedial`)}
                  >
                    Review Weak Topics
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    className="w-full"
                    onClick={() => router.push('/map')}
                  >
                    Continue to Map
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Hint panel */}
        {phase === 'questions' && question && (
          <HintSystem
            hints={question.hints}
            hintsUsed={hintsUsedThisQuestion}
            onHintUsed={setHintsUsedThisQuestion}
            isOpen={isHintOpen}
            onClose={() => setIsHintOpen(false)}
          />
        )}

        {/* Timed hint nudge */}
        <AnimatePresence>
          {showHintNudge && !isHintOpen && !showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-slate-800 border border-yellow-500/40 rounded-2xl px-5 py-3.5 shadow-2xl"
            >
              <Lightbulb size={16} className="text-yellow-400 flex-shrink-0" />
              <span className="text-sm text-slate-300">Taking a while? A hint might help!</span>
              <button
                onClick={() => { setIsHintOpen(true); setShowHintNudge(false); }}
                className="text-xs bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap"
              >
                Show Hint
              </button>
              <button
                onClick={() => setShowHintNudge(false)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
