'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronRight, AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface HintSystemProps {
  hints: [string, string, string, string];
  hintsUsed: number;
  onHintUsed: (level: number) => void;
  maxHints?: number;
  isOpen: boolean;
  onClose: () => void;
}

const hintLevels = [
  { label: 'Clue', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20', icon: '💡' },
  { label: 'Hint', color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20', icon: '🔍' },
  { label: 'Example', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20', icon: '📝' },
  { label: 'Solution', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20', icon: '🎯' },
];

export default function HintSystem({ hints, hintsUsed, onHintUsed, maxHints = 4, isOpen, onClose }: HintSystemProps) {
  const effectiveMaxHints = Math.max(1, Math.min(maxHints, hintLevels.length));
  const [confirmFull, setConfirmFull] = useState(false);
  const [revealedLevels, setRevealedLevels] = useState<number[]>(
    Array.from({ length: Math.min(hintsUsed, effectiveMaxHints) }, (_, i) => i)
  );

  const revealHint = (level: number) => {
    const isFullSolutionLevel = level === 3 && effectiveMaxHints === hintLevels.length;
    if (isFullSolutionLevel && !confirmFull) {
      setConfirmFull(true);
      return;
    }
    if (level >= effectiveMaxHints) return;
    setConfirmFull(false);
    if (!revealedLevels.includes(level)) {
      const newLevels = [...revealedLevels, level];
      setRevealedLevels(newLevels);
      onHintUsed(newLevels.length);
    }
  };

  const nextHintLevel = revealedLevels.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-16 bottom-0 w-80 bg-slate-800 border-l border-slate-700 shadow-2xl z-30 overflow-y-auto"
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb size={18} className="text-yellow-400" />
                <h3 className="font-bold text-white">Hints</h3>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1.5 rounded hover:bg-slate-700 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Cost warning */}
            <div className="mb-4 p-3 rounded-lg bg-slate-700/50 border border-slate-600/50">
              <p className="text-xs text-slate-400">
                Each hint reduces your knowledge score slightly. Use them wisely!
              </p>
            </div>

            {/* Hint levels */}
            <div className="space-y-3">
              {hintLevels.slice(0, effectiveMaxHints).map((level, i) => {
                const isRevealed = revealedLevels.includes(i);
                const isNext = i === nextHintLevel;
                const isLocked = i > nextHintLevel;

                return (
                  <div key={i}>
                    {/* Hint header */}
                    <div
                      className={cn(
                        'flex items-center justify-between p-3 rounded-lg border',
                        isRevealed ? level.bg : 'bg-slate-700/40 border-slate-600/40'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{level.icon}</span>
                        <div>
                          <span className={cn('text-sm font-semibold', isRevealed ? level.color : 'text-slate-400')}>
                            Level {i + 1}: {level.label}
                          </span>
                          {i === 3 && (
                            <span className="ml-1 text-xs text-red-400">(full solution)</span>
                          )}
                        </div>
                      </div>
                      {!isRevealed && isNext && (
                        <Button
                          size="sm"
                          variant={i === 3 ? 'danger' : 'secondary'}
                          onClick={() => revealHint(i)}
                          className="text-xs px-2 py-1"
                        >
                          Reveal
                          <ChevronRight size={12} />
                        </Button>
                      )}
                      {isLocked && (
                        <span className="text-xs text-slate-500">🔒</span>
                      )}
                    </div>

                    {/* Confirm for full solution */}
                    {confirmFull && i === 3 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-1 p-3 rounded-lg bg-red-900/30 border border-red-500/30"
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <AlertTriangle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-red-300">
                            This will show the complete solution. Are you sure?
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => revealHint(3)}
                            className="text-xs px-2 py-1 flex-1"
                          >
                            Yes, show it
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setConfirmFull(false)}
                            className="text-xs px-2 py-1 flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* Revealed hint content */}
                    {isRevealed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className={cn('mt-1 p-3 rounded-lg border text-sm text-slate-200', level.bg)}
                      >
                        {hints[i]}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {revealedLevels.length > 0 && (
              <p className="mt-4 text-xs text-slate-500 text-center">
                {revealedLevels.length} hint{revealedLevels.length > 1 ? 's' : ''} used
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
