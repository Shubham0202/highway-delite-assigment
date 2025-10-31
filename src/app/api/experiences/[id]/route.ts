import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Experience from '@/app/models/Experience';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    // ✅ FIX: Await the params
    const { id } = await params;
    
    const experience = await Experience.findById(id);

    if (!experience) {
      return NextResponse.json(
        { error: 'Experience not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json(experience);
  } catch (error) {
    console.error('Failed to fetch experience:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experience' }, 
      { status: 500 }
    );
  }
}