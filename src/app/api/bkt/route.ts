import { NextRequest, NextResponse } from 'next/server';
import { updateBKT, BKTUpdateInput } from '@/lib/bkt';

export async function POST(request: NextRequest) {
  try {
    const body: BKTUpdateInput = await request.json();

    if (!body.params || typeof body.isCorrect !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid input: params and isCorrect are required' },
        { status: 400 }
      );
    }

    const updatedParams = updateBKT(body);

    return NextResponse.json({
      success: true,
      params: updatedParams,
      delta: updatedParams.pL - body.params.pL,
    });
  } catch (error) {
    console.error('BKT API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
