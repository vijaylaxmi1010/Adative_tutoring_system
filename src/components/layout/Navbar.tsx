'use client';

import { useRouter } from 'next/navigation';
import { BookOpen, Map, BarChart3, LogOut } from 'lucide-react';
import { getState, clearState } from '@/lib/store';
import { ProgressBar } from '@/components/ui/Progress';
import { getOverallProgress } from '@/lib/store';
import { useEffect, useState } from 'react';
import { AppState } from '@/types';

export default function Navbar() {
  const router = useRouter();
  const [state, setState] = useState<AppState | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const s = getState();
    setState(s);
    setProgress(getOverallProgress() * 100);
  }, []);

  const handleLogout = () => {
    clearState();
    router.push('/');
  };

  if (!state?.student) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-700/50">
      <div className="w-full px-8 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push('/map')}
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="font-bold text-white text-sm">GeoLearn</span>
          </div>

          {/* Progress */}
          <div className="hidden sm:flex items-center gap-3 flex-1 max-w-sm mx-10">
            <span className="text-xs text-slate-400 whitespace-nowrap">Overall</span>
            <ProgressBar value={progress} size="sm" color="indigo" />
            <span className="text-xs text-slate-300 font-medium whitespace-nowrap">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            <button
              onClick={() => router.push('/map')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors"
            >
              <Map size={15} />
              <span className="hidden sm:inline">Map</span>
            </button>
            <button
              onClick={() => router.push('/report')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors"
            >
              <BarChart3 size={15} />
              <span className="hidden sm:inline">Report</span>
            </button>

            <div className="w-px h-5 bg-slate-700 mx-1" />

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                {state.student.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block text-sm text-slate-300 font-medium">
                {state.student.name}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
              title="Logout"
            >
              <LogOut size={15} />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
