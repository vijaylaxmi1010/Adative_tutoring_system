'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, RefreshCw, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import { getState } from '@/lib/store';
import { TOPICS, TOPIC_CONTENT } from '@/lib/mock-data';
import { use } from 'react';
import { Topic, TopicProgress } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RemedialPage({ params }: PageProps) {
  const router = useRouter();
  const { id: topicId } = use(params);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [progress, setProgress] = useState<TopicProgress | null>(null);
  const [viewedSubtopics, setViewedSubtopics] = useState<Set<string>>(new Set());
  const [activeSubtopic, setActiveSubtopic] = useState<string | null>(null);
  const [allViewed, setAllViewed] = useState(false);

  useEffect(() => {
    const state = getState();
    if (!state.student) { router.push('/'); return; }
    const t = TOPICS.find((x) => x.id === topicId);
    const p = state.topicProgress[topicId];
    if (!t || !p) { router.push('/map'); return; }
    setTopic(t);
    setProgress(p);
    // Auto-select first weak subtopic
    if (p.weakSubtopics.length > 0) {
      setActiveSubtopic(p.weakSubtopics[0]);
    }
  }, [topicId, router]);

  const content = TOPIC_CONTENT.find((c) => c.topicId === topicId);

  const handleView = (subtopic: string) => {
    setActiveSubtopic(subtopic);
    const newViewed = new Set(viewedSubtopics);
    newViewed.add(subtopic);
    setViewedSubtopics(newViewed);

    const weakSet = new Set(progress?.weakSubtopics || []);
    const allDone = [...weakSet].every((s) => newViewed.has(s));
    setAllViewed(allDone);
  };

  if (!topic || !progress || !content) return null;

  const weakSubtopics = progress.weakSubtopics.length > 0
    ? progress.weakSubtopics
    : topic.subtopics;

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back */}
          <button
            onClick={() => router.push(`/topic/${topicId}`)}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-5 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Topic
          </button>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-2xl font-black text-white mb-1">Remedial Review</h1>
            <p className="text-slate-400 text-sm">
              Let&apos;s strengthen your understanding of the areas that need attention.
            </p>
          </motion.div>

          {/* Weak subtopics list */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-5"
          >
            <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wide">
              Subtopics to review ({viewedSubtopics.size}/{weakSubtopics.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {weakSubtopics.map((sub) => {
                const isViewed = viewedSubtopics.has(sub);
                const isActive = activeSubtopic === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => handleView(sub)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white border border-indigo-500'
                        : isViewed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-700/60 text-slate-300 border border-slate-600/50 hover:bg-slate-700'
                    }`}
                  >
                    {isViewed && !isActive && <CheckCircle size={12} />}
                    {sub}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Active content */}
          {activeSubtopic && content.remedialContent[activeSubtopic] && (
            <motion.div
              key={activeSubtopic}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="bg-slate-800 rounded-2xl border border-slate-700/50 p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen size={16} className="text-indigo-400" />
                  <h3 className="font-bold text-white">{activeSubtopic}</h3>
                  <span className="text-xs text-slate-500">Remedial content</span>
                </div>
                <div className="text-slate-300 text-sm leading-relaxed bg-slate-700/30 rounded-xl p-4 border border-slate-700/50">
                  {content.remedialContent[activeSubtopic]}
                </div>
              </div>
            </motion.div>
          )}

          {activeSubtopic && !content.remedialContent[activeSubtopic] && (
            <motion.div
              key={activeSubtopic}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <div className="bg-slate-800 rounded-2xl border border-slate-700/50 p-6">
                <h3 className="font-bold text-white mb-3">{activeSubtopic}</h3>
                <p className="text-slate-400 text-sm">
                  Review the main content for this subtopic by going back to the content page.
                  Focus on understanding the definition and examples of {activeSubtopic}.
                </p>
              </div>
            </motion.div>
          )}

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            {allViewed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center mb-3"
              >
                <p className="text-emerald-400 font-semibold">
                  All topics reviewed! You&apos;re ready to try again.
                </p>
              </motion.div>
            )}

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => router.push(`/topic/${topicId}/assessment`)}
            >
              <RefreshCw size={16} />
              Try Assessment Again
            </Button>

            <Button
              variant="secondary"
              size="md"
              className="w-full"
              onClick={() => router.push(`/topic/${topicId}/content`)}
            >
              <BookOpen size={16} />
              Review Full Content
            </Button>

            <Button
              variant="ghost"
              size="md"
              className="w-full"
              onClick={() => router.push('/map')}
            >
              <ArrowRight size={16} />
              Continue to Map
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
