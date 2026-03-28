import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'geometry' | 'construction' | 'capstone';
}

export default function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-slate-700 text-slate-300',
    success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    error: 'bg-red-500/20 text-red-400 border border-red-500/30',
    info: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
    geometry: 'bg-indigo-700/40 text-indigo-300 border border-indigo-500/30',
    construction: 'bg-amber-700/40 text-amber-300 border border-amber-600/30',
    capstone: 'bg-emerald-700/40 text-emerald-300 border border-emerald-600/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
