import type { Metadata } from 'next';
import './globals.css';
import SessionProvider from '@/components/providers/SessionProvider';

export const metadata: Metadata = {
  title: 'GeoLearn - Adaptive Geometry Tutor',
  description: 'An adaptive tutoring system for Grade 6 Geometry',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-900 text-white antialiased min-h-screen">
        {/* SessionProvider captures Merge ?token/student_id/session_id on any route */}
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
