'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play, ChevronRight, ChevronLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { TopicContent } from '@/types';
import { cn } from '@/lib/utils';

interface ContentPlayerProps {
  content: TopicContent;
  preference: 'video' | 'text';
  isRevision?: boolean;
  onTogglePreference: () => void;
  onContentCompleted?: () => void;
  pauseVideo?: boolean;
}

export default function ContentPlayer({
  content,
  preference,
  isRevision,
  onTogglePreference,
  onContentCompleted,
  pauseVideo,
}: ContentPlayerProps) {
  const [section, setSection] = useState(0);
  const visitedRef = useRef<Set<number>>(new Set([0]));
  const [visitedCount, setVisitedCount] = useState(1);
  const [videoIndex, setVideoIndex] = useState(0);
  const ytContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const onContentCompletedRef = useRef(onContentCompleted);
  onContentCompletedRef.current = onContentCompleted;

  const videos = content.videoUrl;
  const currentVideoUrl = videos[videoIndex] ?? '';

  const textContent = isRevision ? content.revisionContent : content.textContent;

  const markdownComponents = {
    h1: ({ children }: any) => <h1 className="text-2xl font-bold text-white mb-3">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-xl font-semibold text-white mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-lg font-semibold text-white mb-2">{children}</h3>,
    p: ({ children }: any) => <p className="text-slate-300 text-sm leading-relaxed">{children}</p>,
    ul: ({ children }: any) => <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">{children}</ul>,
    ol: ({ children }: any) => <ol className="list-decimal list-inside space-y-1 text-slate-300 text-sm">{children}</ol>,
    li: ({ children }: any) => <li>{children}</li>,
    strong: ({ children }: any) => <strong className="text-white font-semibold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-slate-800/80 text-amber-300 rounded px-1 py-0.5 text-xs">{children}</code>
    ),
    hr: () => <hr className="border-slate-600 my-3" />,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-indigo-400 pl-3 italic text-slate-300">{children}</blockquote>
    ),
  };

  // ── Text mode: track which sections have been visited ──────────────────────
  const goToSection = (idx: number, totalSections: number) => {
    const wasNew = !visitedRef.current.has(idx);
    visitedRef.current.add(idx);
    setSection(idx);
    if (wasNew) {
      setVisitedCount(visitedRef.current.size);
      if (visitedRef.current.size >= totalSections) {
        onContentCompletedRef.current?.();
      }
    }
  };

  // Parse markdown-ish content into sections
  const sections = textContent
    .split(/\n(?=##\s)/)
    .filter((s) => s.trim())
    .map((s) => {
      const lines = s.trim().split('\n');
      const title = lines[0].replace(/^#{1,3}\s/, '').trim();
      const body = lines.slice(1).join('\n').trim();
      return { title, body };
    });

  // Single-section text: student sees everything on load — unlock immediately
  useEffect(() => {
    if (preference === 'text' && sections.length <= 1) {
      onContentCompletedRef.current?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preference, sections.length]);

  // ── Pause video from outside ────────────────────────────────────────────────
  useEffect(() => {
    if (pauseVideo && playerRef.current?.pauseVideo) {
      playerRef.current.pauseVideo();
    }
  }, [pauseVideo]);

  // ── Video mode: YouTube IFrame API — fire when video ends ──────────────────
  useEffect(() => {
    if (preference !== 'video') return;

    const videoId = currentVideoUrl.match(/\/embed\/([^?&]+)/)?.[1];
    if (!videoId) return;

    let destroyed = false;

    const createPlayer = () => {
      if (destroyed || !ytContainerRef.current) return;
      playerRef.current = new (window as any).YT.Player(ytContainerRef.current, {
        height: '100%',
        width: '100%',
        videoId,
        playerVars: { rel: 0, modestbranding: 1 },
        events: {
          onStateChange: (e: any) => {
            // YT.PlayerState.ENDED === 0
            if (e.data === 0) {
              if (videoIndex < videos.length - 1) {
                setVideoIndex((i) => i + 1);
              } else {
                onContentCompletedRef.current?.();
              }
            }
          },
        },
      });
    };

    if ((window as any).YT?.Player) {
      createPlayer();
    } else {
      // Chain on any previously registered callback so multiple topics don't clash
      const prev = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => {
        prev?.();
        createPlayer();
      };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
    }

    return () => {
      destroyed = true;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preference, currentVideoUrl, videoIndex]);

  // ── Video render ───────────────────────────────────────────────────────────
  if (preference === 'video') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePreference}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            <BookOpen size={14} />
            Switch to text version
          </button>
        </div>

        {/* Video counter for multi-video topics */}
        {videos.length > 1 && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Video {videoIndex + 1} of {videos.length}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setVideoIndex((i) => Math.max(0, i - 1))}
                disabled={videoIndex === 0}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={14} /> Prev
              </button>
              <button
                onClick={() => setVideoIndex((i) => Math.min(videos.length - 1, i + 1))}
                disabled={videoIndex === videos.length - 1}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* YT Player mounts into this div */}
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-2xl border border-slate-700">
          <div ref={ytContainerRef} className="w-full h-full" />
        </div>

        <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-700/50">
          <p className="text-sm text-slate-400">
            🎬 Watch the full video — the assessment button unlocks automatically when the video ends.
          </p>
        </div>
      </div>
    );
  }

  // ── Text render ────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onTogglePreference}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
        >
          <Play size={14} />
          Switch to video version
        </button>
      </div>

      {/* Section tabs */}
      {sections.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap">
          {sections.map((s, i) => {
            const isVisited = visitedCount >= 0 && visitedRef.current.has(i);
            return (
              <button
                key={i}
                onClick={() => goToSection(i, sections.length)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5',
                  section === i
                    ? 'bg-indigo-600 text-white'
                    : isVisited
                      ? 'bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50'
                      : 'bg-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-700'
                )}
              >
                {isVisited && section !== i && <span className="text-emerald-400">✓</span>}
                {s.title.length > 20 ? s.title.substring(0, 20) + '...' : s.title}
              </button>
            );
          })}
        </div>
      )}

      {/* Section content */}
      <motion.div
        key={section}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-slate-700/30 rounded-2xl p-6 border border-slate-700/50 min-h-64"
      >
        {sections[section] ? (
          <>
            <h3 className="text-lg font-bold text-white mb-4">{sections[section].title}</h3>
            <div className="text-slate-300 text-sm leading-relaxed space-y-3">
              <ReactMarkdown components={markdownComponents}>{sections[section].body}</ReactMarkdown>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <ReactMarkdown components={markdownComponents}>{textContent}</ReactMarkdown>
          </div>
        )}
      </motion.div>

      {/* Prev / Next navigation */}
      {sections.length > 1 && (
        <div className="flex justify-between items-center">
          <button
            onClick={() => goToSection(Math.max(0, section - 1), sections.length)}
            disabled={section === 0}
            className="flex items-center gap-1 text-sm text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <span className="text-xs text-slate-500">
            {section + 1} / {sections.length}
          </span>
          <button
            onClick={() => goToSection(Math.min(sections.length - 1, section + 1), sections.length)}
            disabled={section === sections.length - 1}
            className="flex items-center gap-1 text-sm text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
