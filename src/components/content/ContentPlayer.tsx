'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play, ChevronRight, ChevronLeft } from 'lucide-react';
import { TopicContent } from '@/types';
import { cn } from '@/lib/utils';

interface ContentPlayerProps {
  content: TopicContent;
  preference: 'video' | 'text';
  isRevision?: boolean;
  onTogglePreference: () => void;
}

export default function ContentPlayer({
  content,
  preference,
  isRevision,
  onTogglePreference,
}: ContentPlayerProps) {
  const [section, setSection] = useState(0);

  const textContent = isRevision ? content.revisionContent : content.textContent;

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

  if (preference === 'video') {
    return (
      <div className="space-y-4">
        {/* Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePreference}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            <BookOpen size={14} />
            Switch to text version
          </button>
        </div>

        {/* Video embed */}
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-2xl border border-slate-700">
          <iframe
            src={content.videoUrl}
            title="Learning video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-700/50">
          <p className="text-sm text-slate-400">
            Watch the full video, then click &quot;I&apos;m Ready for Assessment&quot; below.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={onTogglePreference}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
        >
          <Play size={14} />
          Switch to video version
        </button>
      </div>

      {/* Section nav */}
      {sections.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap">
          {sections.map((s, i) => (
            <button
              key={i}
              onClick={() => setSection(i)}
              className={cn(
                'px-3 py-1 rounded-lg text-xs font-medium transition-colors',
                section === i
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-700'
              )}
            >
              {s.title.length > 20 ? s.title.substring(0, 20) + '...' : s.title}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
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
              {sections[section].body.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <p key={i} className="font-semibold text-yellow-400">
                      {line.replace(/\*\*/g, '')}
                    </p>
                  );
                }
                if (line.startsWith('- ')) {
                  return (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-1">•</span>
                      <span>{line.substring(2)}</span>
                    </div>
                  );
                }
                if (line.startsWith('1. ') || line.startsWith('2. ') || line.match(/^\d+\. /)) {
                  const num = line.match(/^(\d+)\. /)?.[1];
                  return (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-indigo-400 font-mono text-xs mt-1 flex-shrink-0">
                        {num}.
                      </span>
                      <span>{line.replace(/^\d+\. /, '')}</span>
                    </div>
                  );
                }
                if (line.trim() === '') return <div key={i} className="h-2" />;
                // Handle inline bold
                const boldFormatted = line.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
                  }
                  return part;
                });
                return <p key={i}>{boldFormatted}</p>;
              })}
            </div>
          </>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none">
            <p className="text-slate-300">{textContent}</p>
          </div>
        )}
      </motion.div>

      {/* Prev/Next section */}
      {sections.length > 1 && (
        <div className="flex justify-between">
          <button
            onClick={() => setSection(Math.max(0, section - 1))}
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
            onClick={() => setSection(Math.min(sections.length - 1, section + 1))}
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
