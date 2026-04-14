'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Play, Lock, ExternalLink } from 'lucide-react';
import { getState, setStudent, clearState } from '@/lib/store';
import { StudentProfile } from '@/types';
import { extractSessionParams } from '@/lib/mergeApi';

export default function LandingPage() {
  const router = useRouter();
  const [returningStudent, setReturningStudent] = useState<StudentProfile | null>(null);

  useEffect(() => {
    extractSessionParams(); // saves token/student_id/session_id from Merge redirect URL

    // Coming from the Merge portal — auto-login, no form
    const params = new URLSearchParams(window.location.search);
    const mergeStudentId = params.get('student_id');
    const mergeToken = params.get('token');

    if (mergeStudentId && mergeToken) {
      // Decode JWT payload (read-only, no verification needed) for display name
      let studentName = mergeStudentId;
      try {
        const payloadB64 = mergeToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(atob(payloadB64));
        if (decoded.username) studentName = decoded.username;
      } catch { /* fallback to student_id */ }

      clearState();
      const student: StudentProfile = {
        id: mergeStudentId,
        name: studentName,
        age: 11,
        grade: '6',
        preference: 'video',
        createdAt: new Date().toISOString(),
      };
      setStudent(student);
      router.push('/map');
      return;
    }

    // No Merge params — check for an existing session (student returning mid-session)
    const state = getState();
    if (state.student) {
      setReturningStudent(state.student);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-600/30">
          <BookOpen size={28} className="text-white" />
        </div>

        <h1 className="text-4xl font-black text-white mb-2">GeoLearn</h1>
        <p className="text-slate-400 text-base mb-8">
          Grade 6 · Lines, Angles &amp; Constructions
        </p>

        {returningStudent ? (
          /* Returning student — continue their existing Merge session */
          <div className="space-y-4">
            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-6">
              <p className="text-slate-400 text-sm mb-1">Active session</p>
              <p className="text-xl font-bold text-white mb-5">{returningStudent.name}</p>
              <button
                onClick={() => router.push('/map')}
                className="inline-flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <Play size={16} />
                Continue Learning
                <ArrowRight size={16} />
              </button>
            </div>
            <p className="text-slate-500 text-xs">
              To start a new session, open this chapter from the{' '}
              <a
                href="https://kaushik-dev.online"
                className="text-indigo-400 underline hover:text-indigo-300 inline-flex items-center gap-0.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Merge Portal <ExternalLink size={10} />
              </a>
            </p>
          </div>
        ) : (
          /* No session — access must come through the Merge portal */
          <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-8">
            <div className="w-14 h-14 rounded-full bg-slate-700/80 border border-slate-600/50 flex items-center justify-center mx-auto mb-4">
              <Lock size={22} className="text-slate-400" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Authentication Required</h2>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              This chapter is part of the ET605 course. Please sign in through the Merge
              student portal to access it.
            </p>
            <a
              href="https://kaushik-dev.online"
              className="inline-flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to Merge Portal
              <ExternalLink size={16} />
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}
