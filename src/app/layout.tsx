import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GeoLearn - Adaptive Geometry Tutor',
  description: 'An adaptive tutoring system for Grade 6 Geometry using Bayesian Knowledge Tracing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-900 text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
