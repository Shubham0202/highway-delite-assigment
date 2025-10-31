import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Experience from '@/app/models/Experience';
import Booking from '@/app/models/Booking';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { experienceId, slotId, participantCount, userInfo, promoCode } = body;

    await connectDB();

    // Find experience
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return NextResponse.json(
        { error: 'Experience not found' }, 
        { status: 404 }
      );
    }

    // Calculate pricing
    const subtotal = experience.price * participantCount;
    const taxes = Math.round(subtotal * 0.06);
    const totalAmount = subtotal + taxes;
    const discountAmount = 0;
    const finalAmount = totalAmount - discountAmount;

    // Generate reference ID
    const referenceId = 'HD' + Math.random().toString(36).substr(2, 6).toUpperCase();

    const booking = new Booking({
      experienceId,
      slotId,
      participantCount,
      userInfo,
      promoCode,
      totalAmount,
      discountAmount,
      finalAmount,
      referenceId
    });

    await booking.save();
    
    // Populate experience details
    await booking.populate('experienceId');

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Failed to create booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' }, 
      { status: 500 }
    );
  }
}