'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, BookOpen, ArrowRight } from 'lucide-react';
import { getState, saveState } from '@/lib/store';
import { LearningPreference, StudentProfile } from '@/types';

export default function OnboardingPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [selected, setSelected] = useState<LearningPreference | null>(null);
  const [phase, setPhase] = useState<'welcome' | 'preference'>('welcome');

  useEffect(() => {
    const state = getState();
    if (!state.student) {
      router.push('/');
      return;
    }
    setStudent(state.student);
    // Auto advance to preference after welcome animation
    const timer = setTimeout(() => setPhase('preference'), 2200);
    return () => clearTimeout(timer);
  }, [router]);

  const handleSelect = (pref: LearningPreference) => {
    setSelected(pref);
    if (student) {
      const state = getState();
      if (state.student) {
        state.student.preference = pref;
        saveState(state);
      }
    }
    setTimeout(() => router.push('/map'), 600);
  };

  if (!student) return null;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Welcome phase */}
        {phase === 'welcome' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-indigo-500/30"
            >
              {student.name.charAt(0).toUpperCase()}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-black text-white mb-3"
            >
              Welcome, {student.name}! 🎉
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-slate-400 text-lg"
            >
              Get ready for an amazing geometry adventure!
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6 flex justify-center gap-2"
            >
              {['🔺', '⬡', '○', '◼'].map((shape, i) => (
                <motion.span
                  key={shape}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4 + i * 0.1, type: 'spring' }}
                  className="text-2xl"
                >
                  {shape}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Preference phase */}
        {phase === 'preference' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="text-center mb-8">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-black text-white mb-3"
              >
                How do you like to learn?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400"
              >
                Choose your preferred learning style. You can always switch later!
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Video card */}
              <motion.button
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect('video')}
                className={`relative p-8 rounded-2xl border-2 text-left transition-all duration-300 ${
                  selected === 'video'
                    ? 'border-indigo-500 bg-indigo-500/20 shadow-xl shadow-indigo-500/20'
                    : 'border-slate-700 bg-slate-800/60 hover:border-indigo-500/50 hover:bg-slate-800'
                }`}
              >
                {selected === 'video' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center"
                  >
                    <ArrowRight size={12} className="text-white" />
                  </motion.div>
                )}

                <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-4">
                  <Play size={28} className="text-indigo-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">I love watching videos</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Learn through engaging video tutorials. Watch expert explanations with clear visual
                  demonstrations.
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-full">
                    Visual learner
                  </span>
                  <span className="text-xs text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-full">
                    YouTube videos
                  </span>
                </div>
              </motion.button>

              {/* Text card */}
              <motion.button
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect('text')}
                className={`relative p-8 rounded-2xl border-2 text-left transition-all duration-300 ${
                  selected === 'text'
                    ? 'border-purple-500 bg-purple-500/20 shadow-xl shadow-purple-500/20'
                    : 'border-slate-700 bg-slate-800/60 hover:border-purple-500/50 hover:bg-slate-800'
                }`}
              >
                {selected === 'text' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center"
                  >
                    <ArrowRight size={12} className="text-white" />
                  </motion.div>
                )}

                <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-4">
                  <BookOpen size={28} className="text-purple-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">I prefer reading</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Learn through structured text content. Read at your own pace with detailed
                  explanations and examples.
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded-full">
                    Reading learner
                  </span>
                  <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded-full">
                    Detailed notes
                  </span>
                </div>
              </motion.button>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-slate-500 text-sm mt-6"
            >
              You can always switch between video and text on any topic page.
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
