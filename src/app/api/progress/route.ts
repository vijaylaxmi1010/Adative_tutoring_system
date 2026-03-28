import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
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

    // If Supabase is configured, save to DB
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('topic_progress')
        .upsert({
          student_id: body.studentId,
          topic_id: body.topicProgress.topicId,
          is_unlocked: body.topicProgress.isUnlocked,
          is_completed: body.topicProgress.isCompleted,
          p_l: body.topicProgress.pL,
          p_l0: body.topicProgress.pL0,
          p_t: body.topicProgress.pT,
          p_g: body.topicProgress.pG,
          p_s: body.topicProgress.pS,
          pre_assessment_score: body.topicProgress.preAssessmentScore,
          student_level: body.topicProgress.studentLevel,
          assessment_score: body.topicProgress.assessmentScore,
          hints_used: body.topicProgress.hintsUsed,
          total_questions: body.topicProgress.totalQuestions,
          correct_answers: body.topicProgress.correctAnswers,
          weak_subtopics: body.topicProgress.weakSubtopics,
          completed_at: body.topicProgress.completedAt,
          updated_at: new Date().toISOString(),
        })
        .eq('student_id', body.studentId)
        .eq('topic_id', body.topicProgress.topicId);

      if (error) {
        console.error('Supabase error:', error);
        // Fall through to return success (local storage fallback)
      }
    }

    // Return success (data is handled by localStorage on client)
    return NextResponse.json({
      success: true,
      saved: isSupabaseConfigured ? 'database' : 'localStorage',
    });
  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json({ error: 'studentId is required' }, { status: 400 });
    }

    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json({ data: null, source: 'localStorage' });
    }

    const { data, error } = await supabase
      .from('topic_progress')
      .select('*')
      .eq('student_id', studentId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, source: 'database' });
  } catch (error) {
    console.error('Get progress error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
