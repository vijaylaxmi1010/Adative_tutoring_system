'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  color?: 'indigo' | 'amber' | 'emerald' | 'yellow';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({
  value,
  className,
  color = 'indigo',
  showLabel = false,
  size = 'md',
}: ProgressBarProps) {
  const colors = {
    indigo: 'bg-indigo-500',
    amber: 'bg-amber-500',
    emerald: 'bg-emerald-500',
    yellow: 'bg-yellow-400',
  };

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-slate-400">Progress</span>
          <span className="text-xs text-slate-300 font-medium">{Math.round(value)}%</span>
        </div>
      )}
      <div className={cn('bg-slate-700 rounded-full overflow-hidden', heights[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-700 ease-out', colors[color])}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

interface CircularProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export function CircularProgress({
  value,
  size = 60,
  strokeWidth = 5,
  color = '#6366f1',
  trackColor = '#334155',
  showLabel = true,
  label,
  className,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.7s ease-out' }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-bold text-white leading-none">{Math.round(value)}%</span>
          {label && <span className="text-[9px] text-slate-400 mt-0.5">{label}</span>}
        </div>
      )}
    </div>
  );
}
