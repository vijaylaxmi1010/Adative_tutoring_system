'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Printer } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import FinalReport from '@/components/report/FinalReport';
import Button from '@/components/ui/Button';
import { getState } from '@/lib/store';
import { AppState } from '@/types';

export default function ReportPage() {
  const router = useRouter();
  const [state, setState] = useState<AppState | null>(null);

  useEffect(() => {
    const s = getState();
    if (!s.student) { router.push('/'); return; }
    setState(s);
  }, [router]);

  if (!state?.student) return null;

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6 flex-wrap gap-3"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/map')}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Map
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => window.print()}>
                <Printer size={14} />
                Print
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-black text-white mb-2">
              Learning Report — {state.student.name}
            </h1>
            <p className="text-slate-400">
              Grade {state.student.grade} · Geometry · Generated {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FinalReport state={state} />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
