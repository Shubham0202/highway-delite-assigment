import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Experience from '@/app/models/Experience';

export async function GET() {
  try {
    await connectDB();
    const experiences = await Experience.find({});
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Failed to fetch experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' }, 
      { status: 500 }
    );
  }
}