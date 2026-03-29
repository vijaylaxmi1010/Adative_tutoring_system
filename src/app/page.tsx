'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Star, Zap, Trophy, ArrowRight, Play } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { getState, setStudent, clearState } from '@/lib/store';
import { generateId } from '@/lib/utils';
import { StudentProfile } from '@/types';

// Animated geometric shapes
function FloatingShape({ className, delay = 0, style }: { className: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{
        y: [-15, 15, -15],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

export default function LandingPage() {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [returningStudent, setReturningStudent] = useState<StudentProfile | null>(null);
  const [form, setForm] = useState({ name: '', age: '11', grade: '6' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const state = getState();
    if (state.student) {
      setReturningStudent(state.student);
    }
  }, []);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Please enter your name');
      return;
    }
    setLoading(true);
    clearState(); // wipe all previous student data before creating a new session
    const student: StudentProfile = {
      id: generateId(),
      name: form.name.trim(),
      age: parseInt(form.age),
      grade: form.grade,
      preference: 'video',
      createdAt: new Date().toISOString(),
    };
    setStudent(student);
    setTimeout(() => {
      router.push('/onboarding');
    }, 500);
  };

  const handleContinue = () => {
    router.push('/map');
  };

  const features = [
    { icon: <Zap size={20} />, title: 'Adaptive Learning', desc: 'Content adjusts to your level using AI' },
    { icon: <Trophy size={20} />, title: 'Track Progress', desc: 'See how your knowledge grows over time' },
    { icon: <Star size={20} />, title: '10 Topics', desc: 'From basic shapes to advanced construction' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 geo-bg relative overflow-x-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/30 pointer-events-none" />

      {/* Floating geometric shapes */}
      <FloatingShape
        className="absolute top-20 left-12 w-16 h-16 border-2 border-indigo-500/30 rounded-lg rotate-12"
        delay={0}
      />
      <FloatingShape
        className="absolute top-40 right-24 w-12 h-12 border-2 border-purple-500/30 rounded-full"
        delay={1.5}
      />
      <FloatingShape
        className="absolute bottom-40 left-24 w-20 h-20 border-2 border-amber-500/20"
        style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
        delay={3}
      />
      <FloatingShape
        className="absolute bottom-32 right-16 w-14 h-14 border-2 border-emerald-500/25 rotate-45"
        delay={2}
      />
      <FloatingShape
        className="absolute top-1/2 left-8 w-8 h-8 bg-indigo-600/10 border border-indigo-500/20 rounded-full"
        delay={4}
      />

      {/* Hex pattern decorations */}
      <div className="absolute top-10 right-10 opacity-10">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <polygon
                key={`${row}-${col}`}
                points="30,0 60,17 60,51 30,68 0,51 0,17"
                fill="none"
                stroke="#6366f1"
                strokeWidth="0.5"
                transform={`translate(${col * 65 + (row % 2) * 32}, ${row * 55})`}
              />
            ))
          )}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Nav */}
        <nav className="px-10 py-7 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="font-bold text-white text-lg">GeoLearn</span>
          </div>
          <div className="flex items-center gap-2">
            {returningStudent && (
              <Button variant="ghost" size="sm" onClick={handleContinue}>
                Continue as {returningStudent.name}
              </Button>
            )}
            <Button variant="primary" size="sm" onClick={() => setIsLoginOpen(true)}>
              {returningStudent ? 'New Session' : 'Start Learning'}
            </Button>
          </div>
        </nav>

        {/* Hero */}
        <main className="flex-1 flex flex-col items-center justify-center px-10 text-center py-28">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              Grade 6 Geometry · Adaptive AI Tutor
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-10 leading-tight"
          >
            Learn Geometry
            <br />
            <span className="gradient-text">the Smart Way</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-xl max-w-2xl mb-16 leading-relaxed"
          >
            An adaptive tutoring system that learns how you learn. It gives you the perfect
            challenge — not too hard, not too easy — so you always keep improving!
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-5 mb-24"
          >
            {returningStudent ? (
              <>
                <Button variant="primary" size="lg" onClick={handleContinue}>
                  <Play size={18} />
                  Continue Learning
                  <ArrowRight size={18} />
                </Button>
                <Button variant="secondary" size="lg" onClick={() => setIsLoginOpen(true)}>
                  Start Fresh
                </Button>
              </>
            ) : (
              <Button variant="primary" size="lg" onClick={() => setIsLoginOpen(true)}>
                Start Your Journey
                <ArrowRight size={18} />
              </Button>
            )}
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl w-full"
          >
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-slate-800/60 backdrop-blur border border-slate-700/50 rounded-2xl p-10 text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
                  {f.icon}
                </div>
                <h3 className="font-bold text-white text-base mb-3">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Topic count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 flex items-center gap-20 text-center"
          >
            {[
              { num: '10', label: 'Topics' },
              { num: '100+', label: 'Questions' },
              { num: '4-Level', label: 'Hints' },
              { num: 'Smart', label: 'AI System' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-black text-white mb-2">{stat.num}</p>
                <p className="text-sm text-slate-500 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </main>
      </div>

      {/* Login Modal */}
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} title="Start Learning">
        <form onSubmit={handleStart} className="p-6 space-y-5">
          <p className="text-slate-400 text-sm">
            Enter your details to create your personalized learning profile.
          </p>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              placeholder="e.g., Priya Sharma"
              value={form.name}
              onChange={(e) => { setForm({ ...form, name: e.target.value }); setError(''); }}
              className="w-full bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              autoFocus
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Age</label>
              <select
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Class</label>
              <select
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value })}
                className="w-full bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="6">6th Grade</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full"
          >
            Let&apos;s Go!
            <ArrowRight size={18} />
          </Button>
        </form>
      </Modal>
    </div>
  );
}
