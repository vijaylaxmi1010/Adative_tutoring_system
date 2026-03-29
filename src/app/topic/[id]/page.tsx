'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, ClipboardList, Tag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
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

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push('/map')}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Map
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-start gap-6">
              <div className={`w-16 h-16 rounded-2xl ${cfg.bg} border border-white/10 flex items-center justify-center flex-shrink-0`}>
                <span className="text-3xl">
                  {topic.track === 'geometry' ? '📐' : topic.track === 'construction' ? '🔧' : '🎨'}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge variant={cfg.badge}>{topic.track}</Badge>
                  <Badge variant="default">Layer {topic.layer}</Badge>
                  {progress.isCompleted && <Badge variant="success">Completed</Badge>}
                </div>
                <h1 className="text-3xl font-black text-white mb-3">{topic.name}</h1>
                <p className="text-slate-400 text-base leading-relaxed">{topic.description}</p>
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
                <h3 className="font-bold text-white text-sm">What You Will Learn</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {topic.subtopics.map((sub) => (
                  <span
                    key={sub}
                    className="px-3 py-1.5 bg-slate-700/60 border border-slate-600/50 rounded-full text-sm text-slate-300 leading-snug"
                  >
                    {sub}
                  </span>
                ))}
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
                      You scored {Math.round(progress.pL * 100)}% •{' '}
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
                  <p className="text-sm text-indigo-300 font-medium">Quick quiz completed!</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Your level: <strong className="text-white capitalize">{progress.studentLevel}</strong> — content is ready for you!
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
