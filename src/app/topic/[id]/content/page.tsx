'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, HelpCircle, X } from 'lucide-react';
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
  const [isRevision, setIsRevision] = useState(false);
  const [ready, setReady] = useState(false);
  const [contentFinished, setContentFinished] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [showConfusionModal, setShowConfusionModal] = useState(false);

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
    // Reset gate when switching mode
    setContentFinished(false);
    const state = getState();
    if (state.student) {
      state.student.preference = newPref;
      saveState(state);
    }
  };

  const handleConfusion = () => {
    setVideoPaused(true);
    setShowConfusionModal(true);
  };

  const handleConfusionYes = () => {
    setShowConfusionModal(false);
    setVideoPaused(false);
    if (preference === 'video') handleTogglePreference();
  };

  const handleConfusionNo = () => {
    setShowConfusionModal(false);
    setVideoPaused(false);
  };

  const content = TOPIC_CONTENT.find((c) => c.topicId === topicId);

  if (!topic || !progress || !content || !ready) return null;

  const canProceed = contentFinished;

  const levelLabel = {
    low: { text: 'Full Content', color: 'text-blue-400', badge: 'info' as const },
    medium: { text: 'Revision Mode', color: 'text-yellow-400', badge: 'warning' as const },
    high: { text: 'Quick Review', color: 'text-emerald-400', badge: 'success' as const },
  };
  const levelInfo = progress.studentLevel ? levelLabel[progress.studentLevel] : levelLabel.low;

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
          {/* Back */}
          <button
            onClick={() => router.push(`/topic/${topicId}`)}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Topic
          </button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8 flex-wrap gap-3"
          >
            <div>
              <h1 className="text-3xl font-black text-white mb-2">{topic.name}</h1>
              <div className="flex items-center gap-3">
                <Badge variant={levelInfo.badge}>
                  {levelInfo.text}
                </Badge>
                {progress.studentLevel && (
                  <span className="text-sm text-slate-400">
                    Content personalized for you
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Main layout — 4 content + 1 sidebar on large screens */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            {/* Content area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="xl:col-span-4"
            >
              <div className="relative bg-slate-800 rounded-2xl border border-slate-700/50 p-8 shadow-xl">
                <ContentPlayer
                  content={content}
                  preference={preference}
                  isRevision={isRevision}
                  onTogglePreference={handleTogglePreference}
                  onContentCompleted={() => setContentFinished(true)}
                  pauseVideo={videoPaused}
                />

                {/* Confusion modal — overlays the content when triggered */}
                {showConfusionModal && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-900/80 backdrop-blur-sm z-20">
                    <div className="bg-slate-800 border border-yellow-500/40 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <HelpCircle size={20} className="text-yellow-400 flex-shrink-0" />
                          <h3 className="text-white font-bold text-lg">Feeling confused?</h3>
                        </div>
                        <button onClick={handleConfusionNo} className="text-slate-500 hover:text-white transition-colors">
                          <X size={18} />
                        </button>
                      </div>
                      <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                        We noticed you might be struggling. Would you like a detailed text explanation instead?
                      </p>
                      <div className="flex flex-col gap-3">
                        <Button variant="primary" size="md" className="w-full" onClick={handleConfusionYes}>
                          Yes, show me a detailed explanation
                        </Button>
                        <Button variant="secondary" size="md" className="w-full" onClick={handleConfusionNo}>
                          No, I&apos;m fine — continue
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Ready button — locked until content is finished */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <Button
                  variant="success"
                  size="lg"
                  className="w-full"
                  disabled={!canProceed}
                  onClick={() => router.push(`/topic/${topicId}/assessment`)}
                >
                  I&apos;m Ready for Assessment
                  <ArrowRight size={18} />
                </Button>
                {!canProceed && (
                  <p className="text-center text-sm text-slate-500 mt-3">
                    {preference === 'video'
                      ? '🎬 The button unlocks automatically when the video finishes.'
                      : '📖 Read through all sections using the Next button to unlock this.'}
                  </p>
                )}
              </motion.div>
            </motion.div>

            {/* Side panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-5"
            >
              {/* Hidden background emotion detector */}
              <EmotionDetector
                isActive
                hidden
                onToggle={() => {}}
                onConfusionDetected={handleConfusion}
              />

              {/* Subtopics sidebar */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700/50 p-5 shadow-xl">
                <h3 className="text-sm font-bold text-white mb-4">Subtopics</h3>
                <div className="space-y-2.5">
                  {topic.subtopics.map((sub) => (
                    <div
                      key={sub}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/40"
                    >
                      <div className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
                      <span className="text-sm text-slate-300 leading-snug">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-indigo-900/20 rounded-2xl border border-indigo-500/20 p-5">
                <p className="text-sm font-bold text-indigo-300 mb-3">Study Tips</p>
                <ul className="space-y-2.5 text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
                    Take notes as you go through the content
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
                    Try to visualize the geometric concepts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
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
