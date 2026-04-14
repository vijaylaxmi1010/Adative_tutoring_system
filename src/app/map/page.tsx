'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import ConceptMap from '@/components/map/ConceptMap';
import { getState } from '@/lib/store';
import { AppState } from '@/types';
import { ProgressBar } from '@/components/ui/Progress';
import Button from '@/components/ui/Button';
import { TOPICS, QUESTIONS } from '@/lib/mock-data';
import { getSessionParams, getSessionStartTime, CHAPTER_ID } from '@/lib/mergeApi';

export default function MapPage() {
  const router = useRouter();
  const [state, setState] = useState<AppState | null>(null);

  useEffect(() => {
    const s = getState();
    if (!s.student) {
      router.push('/');
      return;
    }
    setState(s);
  }, [router]);

  // Alert + send exited_midway to Merge API when student closes/leaves the chapter
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const { student_id, session_id } = getSessionParams();
      if (!student_id || !session_id) return;

      // Show the browser "Are you sure?" dialog
      event.preventDefault();
      event.returnValue = 'Your progress will be saved. Are you sure you want to leave?';

      // Aggregate stats from all topics attempted so far
      const s = getState();
      const progressValues = Object.values(s.topicProgress);
      const completedCount = progressValues.filter((p) => p.isCompleted).length;
      const correctAnswers = progressValues.reduce((sum, p) => sum + (p.correctAnswers || 0), 0);
      const attempted = progressValues.reduce((sum, p) => sum + (p.totalQuestions || 0), 0);
      const hintsUsed = progressValues.reduce((sum, p) => sum + (p.hintsUsed || 0), 0);
      const retryCount = progressValues.reduce((sum, p) => sum + ((p.assessmentAttempts || 0) + (p.remedialAttempts || 0)), 0);
      const totalQs = QUESTIONS.filter((q) => !q.isPreAssessment).length;
      const timeSpent = Math.round((Date.now() - getSessionStartTime()) / 1000);

      const payload = {
        student_id,
        session_id,
        chapter_id: CHAPTER_ID,
        timestamp: new Date().toISOString(),
        session_status: 'exited_midway',
        correct_answers: correctAnswers,
        wrong_answers: Math.max(0, attempted - correctAnswers),
        questions_attempted: attempted,
        total_questions: Math.max(attempted, totalQs),
        retry_count: retryCount,
        hints_used: hintsUsed,
        total_hints_embedded: totalQs * 4,
        time_spent_seconds: timeSpent,
        topic_completion_ratio: progressValues.length > 0 ? completedCount / progressValues.length : 0,
      };

      // sendBeacon works reliably even when the tab is closing
      navigator.sendBeacon(
        'https://kaushik-dev.online/api/recommend/',
        new Blob([JSON.stringify(payload)], { type: 'application/json' })
      );
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  if (!state?.student) return null;

  const completedCount = Object.values(state.topicProgress).filter((p) => p.isCompleted).length;
  const progressValues = Object.values(state.topicProgress);
  const overallProgress =
    progressValues.length > 0
      ? (progressValues.reduce((sum, p) => sum + p.pL, 0) / progressValues.length) * 100
      : 0;
  const unlockedCount = Object.values(state.topicProgress).filter((p) => p.isUnlocked).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Navbar />

      {/* Full-page content below navbar */}
      <div className="flex flex-col flex-1 pt-16" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {/* Compact header bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between px-8 py-4 bg-slate-800/80 border-b border-slate-700/50 flex-shrink-0"
        >
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-base font-black text-white leading-tight">Geometry Concept Map</h1>
              <p className="text-xs text-slate-400">
                Welcome,{' '}
                <span className="text-indigo-300 font-medium">{state.student.name}</span>!
                {' '}Click an unlocked topic to begin.
              </p>
            </div>
            {/* Inline stats */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-white">{completedCount}</span>
                <span className="text-xs text-slate-500">/ {TOPICS.length} Done</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-emerald-400">{unlockedCount}</span>
                <span className="text-xs text-slate-500">Unlocked</span>
              </div>
              <div className="flex items-center gap-2 min-w-[120px]">
                <span className="text-xs text-indigo-300 font-semibold whitespace-nowrap">
                  {Math.round(overallProgress)}%
                </span>
                <div className="flex-1">
                  <ProgressBar value={overallProgress} size="sm" color="indigo" />
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push('/report')}
          >
            <BarChart3 size={14} />
            My Report
          </Button>
        </motion.div>

        {/* Map fills the rest of the page */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex-1 overflow-y-auto"
        >
          <ConceptMap topicProgress={state.topicProgress} />
        </motion.div>
      </div>
    </div>
  );
}
