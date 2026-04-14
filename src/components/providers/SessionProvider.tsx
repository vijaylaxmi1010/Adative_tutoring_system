'use client';

/**
 * SessionProvider — mounted once in the root layout.
 *
 * Captures ?token, ?student_id, ?session_id from the Merge portal redirect URL
 * regardless of which route the portal lands on (/, /chapter, /map, etc.).
 * If Merge params are present the student is auto-logged-in and sent to /map.
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { extractSessionParams } from '@/lib/mergeApi';
import { getState, setStudent, clearState } from '@/lib/store';
import { StudentProfile } from '@/types';

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mergeStudentId = params.get('student_id');
    const mergeToken    = params.get('token');

    if (!mergeStudentId || !mergeToken) return; // not a Merge redirect, nothing to do

    // Save token / student_id / session_id to sessionStorage for later API calls
    extractSessionParams();

    // Decode JWT payload (read-only — no verification) to get the display name
    let studentName = mergeStudentId;
    try {
      const b64 = mergeToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(b64));
      if (decoded.username) studentName = decoded.username;
    } catch { /* fall back to student_id */ }

    // Start a fresh session for this Merge-authenticated student
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
}
