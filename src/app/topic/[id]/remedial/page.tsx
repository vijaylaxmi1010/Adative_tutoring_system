'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, RefreshCw, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import { getState } from '@/lib/store';
import { TOPICS, TOPIC_CONTENT } from '@/lib/mock-data';
import { getTopicProgressionConfig, getTopicAssessmentConfig } from '@/lib/bkt';
import { use } from 'react';
import { Topic, TopicProgress } from '@/types';
import ReactMarkdown from 'react-markdown';

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
  const [remedialLimitReached, setRemedialLimitReached] = useState(false);
  const [remedialThreshold, setRemedialThreshold] = useState(0.6);

  useEffect(() => {
    const state = getState();
    if (!state.student) { router.push('/'); return; }
    const t = TOPICS.find((x) => x.id === topicId);
    const p = state.topicProgress[topicId];
    if (!t || !p) { router.push('/map'); return; }
    const progressionConfig = getTopicProgressionConfig(topicId);
    const assessmentConfig = getTopicAssessmentConfig(topicId);
    setTopic(t);
    setProgress(p);
    setRemedialThreshold(assessmentConfig.remedialThreshold);
    // >= because maxRemedialAttempts is the limit — reaching it means no more rounds
    setRemedialLimitReached((p.remedialAttempts ?? 0) >= progressionConfig.maxRemedialAttempts);
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
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16">
          {/* Back */}
          <button
            onClick={() => router.push(`/topic/${topicId}`)}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Topic
          </button>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Let&apos;s Review Together!</h1>
            <p className="text-slate-400 text-base leading-relaxed">
              Your score on some subtopics was below the required threshold. Read through each section carefully before trying the assessment again.
            </p>
            {remedialLimitReached && (
              <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                <p className="text-yellow-400 text-sm font-medium">
                  Maximum remedial rounds reached. Try the assessment again to continue to the next topic.
                </p>
              </div>
            )}
          </motion.div>

          {/* Weak subtopics list */}
          {!remedialLimitReached && (
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
          )}

          {/* Active content */}
          {!remedialLimitReached && activeSubtopic && (
            <motion.div
              key={activeSubtopic}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="bg-slate-800 rounded-2xl border border-slate-700/50 p-8 shadow-xl">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <BookOpen size={18} className="text-indigo-400" />
                    <h3 className="font-bold text-white text-lg">{activeSubtopic}</h3>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-700/60 px-2 py-1 rounded-lg">
                    Needs &gt; {Math.round(remedialThreshold * 100)}% correct to pass
                  </span>
                </div>

                {content.remedialContent[activeSubtopic] ? (
                  <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-700/50 prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => <h1 className="text-xl font-bold text-white mb-3">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-lg font-semibold text-white mb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-base font-semibold text-white mb-2">{children}</h3>,
                        p: ({ children }) => <p className="text-slate-300 text-sm leading-relaxed mb-2">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm mb-2">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 text-slate-300 text-sm mb-2">{children}</ol>,
                        li: ({ children }) => <li className="text-slate-300">{children}</li>,
                        strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                        hr: () => <hr className="border-slate-600 my-3" />,
                      }}
                    >
                      {content.remedialContent[activeSubtopic]}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-700/50">
                    <p className="text-slate-400 text-sm">
                      Review the main content for this subtopic by going back to the content page.
                      Focus on understanding the definition and examples of <strong className="text-white">{activeSubtopic}</strong>.
                    </p>
                  </div>
                )}
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
