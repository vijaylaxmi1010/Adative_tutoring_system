'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ClipboardList, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import QuestionCard from '@/components/assessment/QuestionCard';
import { getState, updateTopicProgress, addResponse } from '@/lib/store';
import { QUESTIONS } from '@/lib/mock-data';
import { calculatePL0FromPreAssessment, classifyStudent, getInitialBKTParams } from '@/lib/bkt';
import { use } from 'react';
import { Question, QuestionResponse } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PreAssessmentPage({ params }: PageProps) {
  const router = useRouter();
  const { id: topicId } = use(params);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [phase, setPhase] = useState<'intro' | 'questions' | 'calculating' | 'done'>('intro');

  useEffect(() => {
    const state = getState();
    if (!state.student) { router.push('/'); return; }
    const progress = state.topicProgress[topicId];
    if (!progress?.isUnlocked) { router.push('/map'); return; }

    const qs = QUESTIONS.filter((q) => q.topicId === topicId && q.isPreAssessment);
    setQuestions(qs);
  }, [topicId, router]);

  const handleAnswer = useCallback((answer: string | string[], isCorrect: boolean) => {
    const question = questions[currentIndex];
    if (!question) return;

    const response: QuestionResponse = {
      questionId: question.id,
      isCorrect,
      hintsUsed: 0,
      timeTakenSeconds: 15,
      selectedAnswer: answer,
    };

    setLastCorrect(isCorrect);
    setShowResult(true);

    const newResponses = [...responses, response];
    setResponses(newResponses);
    addResponse(response);

    setTimeout(() => {
      setShowResult(false);
      setLastCorrect(null);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // All pre-assessment done
        setPhase('calculating');
        const pL0 = calculatePL0FromPreAssessment(newResponses, questions);
        const level = classifyStudent(pL0);
        const bktParams = getInitialBKTParams(topicId, pL0);

        const correctCount = newResponses.filter((r) => r.isCorrect).length;
        const score = correctCount / questions.length;

        updateTopicProgress(topicId, {
          ...bktParams,
          preAssessmentScore: score,
          studentLevel: level,
        });

        setTimeout(() => setPhase('done'), 2000);
        setTimeout(() => {
          if (level === 'high') {
            router.push(`/topic/${topicId}/assessment`);
          } else {
            router.push(`/topic/${topicId}/content`);
          }
        }, 4000);
      }
    }, 1500);
  }, [questions, currentIndex, responses, topicId, router]);

  if (questions.length === 0) return null;

  const question = questions[currentIndex];

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Back */}
          <button
            onClick={() => router.push(`/topic/${topicId}`)}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Topic
          </button>

          {/* Intro phase */}
          {phase === 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <ClipboardList size={28} className="text-indigo-400" />
              </div>
              <h1 className="text-3xl font-black text-white mb-3">Quick Pre-Assessment</h1>
              <p className="text-slate-400 mb-2">
                3 questions to gauge your current knowledge.
              </p>
              <p className="text-slate-500 text-sm mb-8">
                Don&apos;t worry — this helps us personalize your learning path!
              </p>
              <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-slate-800 rounded-xl p-3 text-center border border-slate-700">
                    <p className="text-xl font-black text-indigo-400">{n}</p>
                    <p className="text-xs text-slate-500">Question</p>
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPhase('questions')}
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-lg transition-colors shadow-lg shadow-indigo-500/25"
              >
                Begin Assessment
              </motion.button>
            </motion.div>
          )}

          {/* Questions phase */}
          {phase === 'questions' && (
            <div>
              {/* Progress indicator */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-2">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-2 rounded-full transition-all duration-300 ${
                        i < currentIndex
                          ? 'bg-emerald-500'
                          : i === currentIndex
                          ? 'bg-indigo-500'
                          : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-400">
                  Question {currentIndex + 1} of {questions.length}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-800 rounded-2xl border border-slate-700/50 p-6 shadow-xl"
                >
                  {/* Subtopic tag */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-indigo-400 bg-indigo-400/10 px-2.5 py-1 rounded-full font-medium">
                      {question.subtopic}
                    </span>
                    <span className="text-xs text-slate-500">Pre-assessment</span>
                  </div>

                  {/* Question */}
                  <h2 className="text-xl font-bold text-white mb-6 leading-snug">
                    {question.text}
                  </h2>

                  {/* Answer result overlay */}
                  <AnimatePresence>
                    {showResult && lastCorrect !== null && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-0 flex items-center justify-center rounded-2xl z-10 ${
                          lastCorrect ? 'bg-emerald-500/20' : 'bg-red-500/20'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-5xl mb-2">{lastCorrect ? '✅' : '❌'}</div>
                          <p className={`font-bold text-lg ${lastCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                            {lastCorrect ? 'Correct!' : 'Not quite...'}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative">
                    <QuestionCard
                      question={question}
                      onAnswer={handleAnswer}
                      showResult={showResult}
                      isCorrect={lastCorrect}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Calculating phase */}
          {(phase === 'calculating' || phase === 'done') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ rotate: phase === 'calculating' ? 360 : 0 }}
                transition={{ duration: 1.5, repeat: phase === 'calculating' ? Infinity : 0, ease: 'linear' }}
                className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 flex items-center justify-center"
              >
                {phase === 'done' ? (
                  <CheckCircle size={32} className="text-emerald-400" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-500/30 animate-pulse" />
                )}
              </motion.div>

              <h2 className="text-2xl font-black text-white mb-3">
                {phase === 'calculating'
                  ? 'Analyzing your results...'
                  : 'Learning path ready!'}
              </h2>
              <p className="text-slate-400 mb-2">
                {phase === 'calculating'
                  ? 'Calculating your knowledge level using BKT...'
                  : 'Redirecting to your personalized content...'}
              </p>

              {phase === 'done' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center gap-2 mt-4 flex-wrap"
                >
                  {responses.map((r, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 ${
                        r.isCorrect
                          ? 'bg-emerald-500/20 border-emerald-500'
                          : 'bg-red-500/20 border-red-500'
                      }`}
                    >
                      {r.isCorrect ? '✓' : '✗'}
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
