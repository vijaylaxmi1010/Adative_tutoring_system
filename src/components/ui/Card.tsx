import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: 'indigo' | 'amber' | 'emerald' | 'none';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = 'none', children, ...props }, ref) => {
    const glowStyles = {
      indigo: 'shadow-indigo-500/10 border-indigo-500/20',
      amber: 'shadow-amber-500/10 border-amber-500/20',
      emerald: 'shadow-emerald-500/10 border-emerald-500/20',
      none: 'border-slate-700/50',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-slate-800 rounded-2xl border shadow-xl p-7',
          glowStyles[glow],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
