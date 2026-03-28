'use client';

import { useEffect, useState, useRef } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerProps {
  avgTimeSeconds: number;
  onTimeUpdate: (seconds: number) => void;
  isRunning: boolean;
  className?: string;
}

export default function Timer({ avgTimeSeconds, onTimeUpdate, isRunning, className }: TimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 1;
          onTimeUpdate(next);
          return next;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, onTimeUpdate]);

  // Reset when component remounts (new question)
  useEffect(() => {
    setElapsed(0);
  }, [avgTimeSeconds]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}:${sec.toString().padStart(2, '0')}` : `${sec}s`;
  };

  const isOverTime = elapsed > avgTimeSeconds * 1.5;
  const isNearTime = elapsed > avgTimeSeconds;

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-mono font-semibold transition-colors',
        isOverTime
          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
          : isNearTime
          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
          : 'bg-slate-700/60 text-slate-300 border border-slate-600/50',
        className
      )}
    >
      <Clock size={14} className={isOverTime ? 'animate-pulse' : ''} />
      {formatTime(elapsed)}
    </div>
  );
}
