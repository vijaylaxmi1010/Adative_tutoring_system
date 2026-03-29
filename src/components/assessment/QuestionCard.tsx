'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { Question } from '@/types';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string | string[], isCorrect: boolean) => void;
  showResult?: boolean;
  isCorrect?: boolean | null;
}

export default function QuestionCard({ question, onAnswer, showResult, isCorrect }: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [arrangeOrder, setArrangeOrder] = useState<string[]>(question.options || []);
  const [matchState, setMatchState] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [shuffledRights, setShuffledRights] = useState<string[]>(() => {
    if (question.type === 'match' && question.options) {
      return [...question.options.map((o) => o.split('|')[1])].sort(() => Math.random() - 0.5);
    }
    return [];
  });

  useEffect(() => {
    setSelected(null);
    setArrangeOrder(question.options ? [...question.options].sort(() => Math.random() - 0.5) : []);
    setMatchState({});
    setSelectedLeft(null);
    if (question.type === 'match' && question.options) {
      setShuffledRights([...question.options.map((o) => o.split('|')[1])].sort(() => Math.random() - 0.5));
    }
  }, [question.id]);

  const handleMCQ = (option: string) => {
    if (showResult) return;
    setSelected(option);
  };

  const handleMCQSubmit = () => {
    if (!selected) return;
    const correct = selected === question.correctAnswer;
    onAnswer(selected, correct);
  };

  const handleArrangeMove = (from: number, to: number) => {
    if (showResult) return;
    const newOrder = [...arrangeOrder];
    const [item] = newOrder.splice(from, 1);
    newOrder.splice(to, 0, item);
    setArrangeOrder(newOrder);
  };

  const handleArrangeSubmit = () => {
    const correct = JSON.stringify(arrangeOrder) === JSON.stringify(question.correctAnswer);
    onAnswer(arrangeOrder, correct);
  };

  const handleMatchClick = (item: string, side: 'left' | 'right') => {
    if (showResult) return;
    if (side === 'left') {
      setSelectedLeft(item === selectedLeft ? null : item);
    } else if (selectedLeft) {
      const newMatch = { ...matchState, [selectedLeft]: item };
      setMatchState(newMatch);
      setSelectedLeft(null);
    }
  };

  const handleMatchSubmit = () => {
    if (!question.options) return;
    const pairs = question.options.map((opt) => {
      const [left] = opt.split('|');
      return `${left}|${matchState[left] || ''}`;
    });
    const correct = JSON.stringify(pairs.sort()) === JSON.stringify((question.correctAnswer as string[]).sort());
    onAnswer(pairs, correct);
  };

  const handleTrueFalse = (answer: string) => {
    if (showResult) return;
    setSelected(answer);
    const correct = answer === question.correctAnswer;
    onAnswer(answer, correct);
  };

  if (question.type === 'mcq' || question.type === 'true-false') {
    const options = question.type === 'true-false' ? ['True', 'False'] : (question.options || []);
    return (
      <div>
        <div className="space-y-4 mb-8">
          {options.map((option) => {
            const isSelected = selected === option;
            const isCorrectOption = showResult && option === question.correctAnswer;
            const isWrongSelected = showResult && isSelected && !isCorrectOption;

            return (
              <motion.button
                key={option}
                whileHover={!showResult ? { x: 4 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                onClick={() =>
                  question.type === 'true-false' ? handleTrueFalse(option) : handleMCQ(option)
                }
                className={cn(
                  'w-full text-left p-5 rounded-xl border-2 transition-all duration-200 text-base leading-snug',
                  !showResult && !isSelected && 'bg-slate-700/50 border-slate-600/50 hover:bg-slate-700 hover:border-slate-500 text-slate-200',
                  !showResult && isSelected && 'bg-indigo-600/30 border-indigo-500 text-white font-medium',
                  isCorrectOption && 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-medium',
                  isWrongSelected && 'bg-red-500/20 border-red-500 text-red-300 font-medium'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center',
                      !showResult && !isSelected && 'border-slate-500',
                      !showResult && isSelected && 'border-indigo-400 bg-indigo-500',
                      isCorrectOption && 'border-emerald-400',
                      isWrongSelected && 'border-red-400'
                    )}
                  >
                    {showResult && isCorrectOption && <CheckCircle size={12} className="text-emerald-400" />}
                    {showResult && isWrongSelected && <XCircle size={12} className="text-red-400" />}
                    {!showResult && isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  {option}
                </div>
              </motion.button>
            );
          })}
        </div>

        {question.type === 'mcq' && !showResult && (
          <Button
            variant="primary"
            onClick={handleMCQSubmit}
            disabled={!selected}
            className="w-full"
          >
            Submit Answer
          </Button>
        )}
      </div>
    );
  }

  if (question.type === 'arrange') {
    return (
      <div>
        <p className="text-sm text-slate-400 mb-3">Drag items to arrange in the correct order:</p>
        <div className="space-y-2 mb-6">
          {arrangeOrder.map((item, index) => (
            <div
              key={item}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg border transition-all',
                showResult
                  ? (question.correctAnswer as string[])[index] === item
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : 'bg-red-500/20 border-red-500/50 text-red-300'
                  : 'bg-slate-700/50 border-slate-600/50 text-slate-200'
              )}
            >
              <span className="text-xs text-slate-500 font-mono w-4">{index + 1}.</span>
              <span className="flex-1 text-sm">{item}</span>
              {!showResult && (
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleArrangeMove(index, Math.max(0, index - 1))}
                    disabled={index === 0}
                    className="text-slate-500 hover:text-slate-200 disabled:opacity-30 leading-none text-xs"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => handleArrangeMove(index, Math.min(arrangeOrder.length - 1, index + 1))}
                    disabled={index === arrangeOrder.length - 1}
                    className="text-slate-500 hover:text-slate-200 disabled:opacity-30 leading-none text-xs"
                  >
                    ▼
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {!showResult && (
          <Button variant="primary" onClick={handleArrangeSubmit} className="w-full">
            Submit Order
          </Button>
        )}
      </div>
    );
  }

  if (question.type === 'match') {
    const pairs = (question.options || []).map((opt) => {
      const [left, right] = opt.split('|');
      return { left, right };
    });
    const correctPairs = Object.fromEntries(pairs.map((p) => [p.left, p.right]));

    return (
      <div>
        <p className="text-sm text-slate-400 mb-3">Match the items: Click a left item, then the matching right item.</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">Item</p>
            {pairs.map(({ left }) => (
              <button
                key={left}
                onClick={() => handleMatchClick(left, 'left')}
                disabled={showResult}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-lg border text-sm transition-all',
                  showResult
                    ? matchState[left] === correctPairs[left]
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                      : 'bg-red-500/20 border-red-500/50 text-red-300'
                    : selectedLeft === left
                    ? 'bg-indigo-500/30 border-indigo-400 text-white'
                    : matchState[left]
                    ? 'bg-slate-700 border-slate-500 text-slate-200'
                    : 'bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-700'
                )}
              >
                {left}
                {matchState[left] && !showResult && (
                  <span className="ml-1 text-xs text-indigo-400">→ {matchState[left]}</span>
                )}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">Match</p>
            {shuffledRights.map((right) => {
              const isMatched = Object.values(matchState).includes(right);
              return (
                <button
                  key={right}
                  onClick={() => handleMatchClick(right, 'right')}
                  disabled={showResult || isMatched}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-lg border text-sm transition-all',
                    isMatched ? 'bg-slate-800 border-slate-700 text-slate-500 opacity-50' : 'bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-700 hover:border-slate-500',
                    selectedLeft && !isMatched ? 'border-yellow-500/50 bg-yellow-500/10' : ''
                  )}
                >
                  {right}
                </button>
              );
            })}
          </div>
        </div>
        {!showResult && (
          <Button
            variant="primary"
            onClick={handleMatchSubmit}
            disabled={Object.keys(matchState).length < pairs.length}
            className="w-full"
          >
            Submit Matches
          </Button>
        )}
      </div>
    );
  }

  return null;
}
