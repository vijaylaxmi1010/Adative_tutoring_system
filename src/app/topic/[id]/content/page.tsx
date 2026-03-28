'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Camera } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import ContentPlayer from '@/components/content/ContentPlayer';
import EmotionDetector from '@/components/content/EmotionDetector';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { getState, saveState } from '@/lib/store';
import { TOPICS, TOPIC_CONTENT } from '@/lib/mock-data';
import { use } from 'react';
import { Topic, TopicProgress, LearningPreference } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ContentPage({ params }: PageProps) {
  const router = useRouter();
  const { id: topicId } = use(params);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [progress, setProgress] = useState<TopicProgress | null>(null);
  const [preference, setPreference] = useState<LearningPreference>('video');
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [isRevision, setIsRevision] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const state = getState();
    if (!state.student) { router.push('/'); return; }

    const t = TOPICS.find((x) => x.id === topicId);
    const p = state.topicProgress[topicId];
    if (!t || !p?.isUnlocked) { router.push('/map'); return; }

    setTopic(t);
    setProgress(p);
    setPreference(state.student.preference);
    // Medium level gets revision content
    setIsRevision(p.studentLevel === 'medium');
    setReady(true);
  }, [topicId, router]);

  const handleTogglePreference = () => {
    const newPref: LearningPreference = preference === 'video' ? 'text' : 'video';
    setPreference(newPref);
    // Update student preference
    const state = getState();
    if (state.student) {
      state.student.preference = newPref;
      saveState(state);
    }
  };

  const handleConfusion = () => {
    handleTogglePreference();
  };

  const content = TOPIC_CONTENT.find((c) => c.topicId === topicId);

  if (!topic || !progress || !content || !ready) return null;

  const levelLabel = {
    low: { text: 'Full Content', color: 'text-blue-400', badge: 'info' as const },
    medium: { text: 'Revision Mode', color: 'text-yellow-400', badge: 'warning' as const },
    high: { text: 'Quick Review', color: 'text-emerald-400', badge: 'success' as const },
  };
  const levelInfo = progress.studentLevel ? levelLabel[progress.studentLevel] : levelLabel.low;

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Back */}
          <button
            onClick={() => router.push(`/topic/${topicId}`)}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-5 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Topic
          </button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6 flex-wrap gap-3"
          >
            <div>
              <h1 className="text-2xl font-black text-white mb-1">{topic.name}</h1>
              <div className="flex items-center gap-2">
                <Badge variant={levelInfo.badge}>
                  {levelInfo.text}
                </Badge>
                {progress.studentLevel && (
                  <span className="text-xs text-slate-500">
                    Based on your pre-assessment ({progress.studentLevel} level)
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Content area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-slate-800 rounded-2xl border border-slate-700/50 p-6 shadow-xl">
                <ContentPlayer
                  content={content}
                  preference={preference}
                  isRevision={isRevision}
                  onTogglePreference={handleTogglePreference}
                />
              </div>

              {/* Ready button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
              >
                <Button
                  variant="success"
                  size="lg"
                  className="w-full"
                  onClick={() => router.push(`/topic/${topicId}/assessment`)}
                >
                  I&apos;m Ready for Assessment
                  <ArrowRight size={18} />
                </Button>
              </motion.div>
            </motion.div>

            {/* Side panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {/* Emotion detector */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700/50 p-4 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Camera size={14} className="text-slate-400" />
                  <h3 className="text-sm font-bold text-white">Emotion Tracker</h3>
                </div>
                <EmotionDetector
                  isActive={cameraEnabled}
                  onToggle={() => setCameraEnabled(!cameraEnabled)}
                  onConfusionDetected={handleConfusion}
                />
              </div>

              {/* Subtopics sidebar */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700/50 p-4 shadow-xl">
                <h3 className="text-sm font-bold text-white mb-3">Subtopics</h3>
                <div className="space-y-2">
                  {topic.subtopics.map((sub) => (
                    <div
                      key={sub}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-700/40"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-indigo-900/20 rounded-2xl border border-indigo-500/20 p-4">
                <p className="text-xs font-bold text-indigo-300 mb-2">Study Tips</p>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  <li className="flex items-start gap-1.5">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    Take notes as you go through the content
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    Try to visualize the geometric concepts
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    Draw diagrams on paper to practice
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
