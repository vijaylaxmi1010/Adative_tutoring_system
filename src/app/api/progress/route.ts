import { NextRequest, NextResponse } from 'next/server';
import { TopicProgress } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: { studentId: string; topicProgress: TopicProgress } = await request.json();

    if (!body.studentId || !body.topicProgress) {
      return NextResponse.json(
        { error: 'studentId and topicProgress are required' },
        { status: 400 }
      );
    }

    // All persistence is handled client-side via localStorage
    return NextResponse.json({ success: true, saved: 'localStorage' });
  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId');

  if (!studentId) {
    return NextResponse.json({ error: 'studentId is required' }, { status: 400 });
  }

  // All data lives in localStorage on the client
  return NextResponse.json({ data: null, source: 'localStorage' });
}
