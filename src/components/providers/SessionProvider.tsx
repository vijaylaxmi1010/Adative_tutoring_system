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
import { jwtDecode } from 'jwt-decode';
import { extractSessionParams, retryPendingRecommendation } from '@/lib/mergeApi';
import { setStudent, clearState } from '@/lib/store';
import { StudentProfile } from '@/types';

interface MergeJwtPayload {
  user_id?: number;
  username?: string;
  name?: string;
  full_name?: string;
  display_name?: string;
  first_name?: string;
  student_id?: string;
  exp?: number;
}

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mergeStudentId = params.get('student_id');
    const mergeToken    = params.get('token');

    if (!mergeStudentId || !mergeToken) return; // not a Merge redirect, nothing to do

    // Save token / student_id / session_id to sessionStorage for later API calls
    extractSessionParams();

    // Retry any recommendation that failed to send in a previous session
    retryPendingRecommendation();

    // Decode JWT payload to get the display name — try common field names
    let studentName = mergeStudentId;
    try {
      const decoded = jwtDecode<MergeJwtPayload>(mergeToken);
      studentName =
        decoded.username ||
        decoded.name ||
        decoded.full_name ||
        decoded.display_name ||
        decoded.first_name ||
        mergeStudentId;
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
