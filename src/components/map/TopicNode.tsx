'use client';

import { motion } from 'framer-motion';
import { Lock, CheckCircle } from 'lucide-react';
import { Topic, TopicProgress } from '@/types';
import { CircularProgress } from '@/components/ui/Progress';
import { cn } from '@/lib/utils';

interface TopicNodeProps {
  topic: Topic;
  progress: TopicProgress;
  onClick?: () => void;
  index?: number;
}

const trackStyles = {
  geometry: {
    bg: 'bg-indigo-700/30',
    border: 'border-indigo-500/50',
    hoverBorder: 'hover:border-indigo-400',
    glow: 'hover:shadow-indigo-500/20',
    progressColor: '#6366f1',
    badge: 'bg-indigo-600',
  },
  construction: {
    bg: 'bg-amber-800/30',
    border: 'border-amber-600/50',
    hoverBorder: 'hover:border-amber-500',
    glow: 'hover:shadow-amber-500/20',
    progressColor: '#d97706',
    badge: 'bg-amber-700',
  },
  capstone: {
    bg: 'bg-emerald-800/30',
    border: 'border-emerald-600/50',
    hoverBorder: 'hover:border-emerald-500',
    glow: 'hover:shadow-emerald-500/20',
    progressColor: '#059669',
    badge: 'bg-emerald-700',
  },
};

export default function TopicNode({ topic, progress, onClick, index = 0 }: TopicNodeProps) {
  const styles = trackStyles[topic.track];
  const isLocked = !progress.isUnlocked;
  const isCompleted = progress.isCompleted;
  const pLPercent = Math.round(progress.pL * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, type: 'spring', stiffness: 150 }}
      whileHover={!isLocked ? { scale: 1.04 } : {}}
      whileTap={!isLocked ? { scale: 0.97 } : {}}
      onClick={!isLocked ? onClick : undefined}
      className={cn(
        'relative flex flex-col items-center p-3 rounded-xl border transition-all duration-300 select-none',
        'w-36 min-h-[120px] shadow-lg',
        isLocked
          ? 'bg-slate-800/50 border-slate-600/30 opacity-55 cursor-not-allowed'
          : cn(
              styles.bg,
              styles.border,
              styles.hoverBorder,
              styles.glow,
              'hover:shadow-xl cursor-pointer'
            )
      )}
    >
      {/* Lock / Complete icon */}
      <div className="absolute -top-2 -right-2 z-10">
        {isLocked ? (
          <div className="w-6 h-6 rounded-full bg-slate-600 border-2 border-slate-700 flex items-center justify-center">
            <Lock size={10} className="text-slate-400" />
          </div>
        ) : isCompleted ? (
          <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-emerald-600 flex items-center justify-center">
            <CheckCircle size={10} className="text-white" />
          </div>
        ) : null}
      </div>

      {/* Progress ring */}
      <div className="mb-2">
        {isLocked ? (
          <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center">
            <Lock size={18} className="text-slate-500" />
          </div>
        ) : (
          <CircularProgress
            value={pLPercent}
            size={48}
            strokeWidth={4}
            color={isCompleted ? '#10b981' : styles.progressColor}
            trackColor={isLocked ? '#334155' : '#1e293b'}
            showLabel={true}
          />
        )}
      </div>

      {/* Topic name */}
      <p
        className={cn(
          'text-center font-semibold leading-tight text-xs',
          isLocked ? 'text-slate-500' : 'text-white'
        )}
        style={{ fontSize: '0.68rem' }}
      >
        {topic.name}
      </p>

      {/* Track badge */}
      <div className="mt-1.5">
        <span
          className={cn(
            'text-white/70 px-1.5 py-0.5 rounded text-[9px] font-medium uppercase tracking-wide',
            isLocked ? 'bg-slate-700' : styles.badge
          )}
        >
          {topic.track}
        </span>
      </div>
    </motion.div>
  );
}
