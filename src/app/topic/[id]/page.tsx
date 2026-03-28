'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Play, ClipboardList, Tag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { CircularProgress } from '@/components/ui/Progress';
import { getState, setCurrentTopic } from '@/lib/store';
import { TOPICS } from '@/lib/mock-data';
import { use } from 'react';
import { Topic, TopicProgress } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function TopicPage({ params }: PageProps) {
  const router = useRouter();
  const { id: topicId } = use(params);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [progress, setProgress] = useState<TopicProgress | null>(null);

  useEffect(() => {
    const state = getState();
    if (!state.student) {
      router.push('/');
      return;
    }
    const t = TOPICS.find((x) => x.id === topicId);
    if (!t) {
      router.push('/map');
      return;
    }
    const p = state.topicProgress[topicId];
    if (!p?.isUnlocked) {
      router.push('/map');
      return;
    }
    setTopic(t);
    setProgress(p);
    setCurrentTopic(topicId);
  }, [topicId, router]);

  if (!topic || !progress) return null;

  const trackConfig = {
    geometry: { color: 'text-indigo-400', bg: 'bg-indigo-400/10', badge: 'geometry' as const },
    construction: { color: 'text-amber-400', bg: 'bg-amber-400/10', badge: 'construction' as const },
    capstone: { color: 'text-emerald-400', bg: 'bg-emerald-400/10', badge: 'capstone' as const },
  };
  const cfg = trackConfig[topic.track];

  const bktGauges = [
    { label: 'Knowledge P(L)', value: progress.pL, color: '#6366f1', desc: 'Current knowledge probability' },
    { label: 'Guess P(G)', value: progress.pG, color: '#f59e0b', desc: 'Probability of correct guess' },
    { label: 'Slip P(S)', value: progress.pS, color: '#ef4444', desc: 'Probability of careless error' },
    { label: 'Transit P(T)', value: progress.pT, color: '#10b981', desc: 'Learning speed probability' },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push('/map')}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Map
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl ${cfg.bg} border border-white/10 flex items-center justify-center flex-shrink-0`}>
                <span className="text-2xl">
                  {topic.track === 'geometry' ? '📐' : topic.track === 'construction' ? '🔧' : '🎨'}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge variant={cfg.badge}>{topic.track}</Badge>
                  <Badge variant="default">Layer {topic.layer}</Badge>
                  {progress.isCompleted && <Badge variant="success">Completed</Badge>}
                </div>
                <h1 className="text-3xl font-black text-white mb-2">{topic.name}</h1>
                <p className="text-slate-400">{topic.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Subtopics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={15} className="text-slate-400" />
                <h3 className="font-bold text-white text-sm">Topics Covered</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {topic.subtopics.map((sub) => (
                  <span
                    key={sub}
                    className="px-3 py-1 bg-slate-700/60 border border-slate-600/50 rounded-full text-sm text-slate-300"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* BKT Parameters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="mb-6">
              <h3 className="font-bold text-white text-sm mb-4">Knowledge State (BKT Parameters)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {bktGauges.map((gauge) => (
                  <div key={gauge.label} className="flex flex-col items-center gap-2">
                    <CircularProgress
                      value={gauge.value * 100}
                      size={64}
                      strokeWidth={5}
                      color={gauge.color}
                      showLabel
                    />
                    <div className="text-center">
                      <p className="text-xs font-semibold text-slate-300">{gauge.label}</p>
                      <p className="text-[10px] text-slate-500 leading-tight">{gauge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-slate-700/30 rounded-xl border border-slate-700/50">
                <p className="text-xs text-slate-400">
                  <strong className="text-slate-300">P(L)</strong> is your current knowledge probability.
                  It updates after every question based on your answers, time taken, and hints used.
                  Reach{' '}
                  <strong className="text-emerald-400">P(L) ≥ 70%</strong> to complete this topic!
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            {progress.isCompleted ? (
              <div className="space-y-3">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-semibold text-emerald-400">Topic Completed!</p>
                    <p className="text-sm text-slate-400">
                      Final P(L): {Math.round(progress.pL * 100)}% •{' '}
                      {progress.correctAnswers}/{progress.totalQuestions} correct answers
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={() => router.push(`/topic/${topicId}/assessment`)}
                >
                  <Play size={16} />
                  Practice Again
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  className="w-full"
                  onClick={() => router.push('/map')}
                >
                  Back to Map
                </Button>
              </div>
            ) : progress.preAssessmentScore !== undefined ? (
              <div className="space-y-3">
                <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
                  <p className="text-sm text-indigo-300 font-medium">Pre-assessment completed</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Your level: <strong className="text-white capitalize">{progress.studentLevel}</strong> •
                    P(L₀) = {Math.round(progress.pL0 * 100)}%
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => router.push(`/topic/${topicId}/content`)}
                >
                  <Play size={16} />
                  {progress.studentLevel === 'high' ? 'Start Assessment' : 'View Content'}
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => router.push(`/topic/${topicId}/pre-assessment`)}
                >
                  <ClipboardList size={16} />
                  Start Pre-Assessment
                </Button>
                <p className="text-center text-xs text-slate-500">
                  3 quick questions to personalize your learning path
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
