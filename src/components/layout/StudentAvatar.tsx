'use client';

import { StudentProfile } from '@/types';

interface StudentAvatarProps {
  student: StudentProfile;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

export default function StudentAvatar({ student, size = 'md', showName = false }: StudentAvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-2xl',
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${sizes[size]} rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center font-bold text-white flex-shrink-0`}
      >
        {student.name.charAt(0).toUpperCase()}
      </div>
      {showName && (
        <div>
          <p className="font-semibold text-white text-sm">{student.name}</p>
          <p className="text-xs text-slate-400">Grade {student.grade}</p>
        </div>
      )}
    </div>
  );
}
