import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import PromoCode from '@/app/models/PromoCode';

export async function POST(request: Request) {
  try {
    const { code, amount } = await request.json();
    
    await connectDB();

    const promo = await PromoCode.findOne({ 
      code: code.toUpperCase(), 
      isActive: true,
      validFrom: { $lte: new Date() },
      $or: [
        { validUntil: { $gte: new Date() } },
        { validUntil: null }
      ]
    });

    if (!promo) {
      return NextResponse.json({ 
        valid: false, 
        message: 'Invalid promo code' 
      });
    }

    if (amount < promo.minAmount) {
      return NextResponse.json({ 
        valid: false, 
        message: `Minimum amount of ₹${promo.minAmount} required` 
      });
    }

    let discount = 0;
    if (promo.discountType === 'percentage') {
      discount = (amount * promo.discountValue) / 100;
    } else {
      discount = promo.discountValue;
    }

    return NextResponse.json({
      valid: true,
      discount,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      finalAmount: amount - discount
    });
  } catch (error) {
    console.error('Failed to validate promo code:', error);
    return NextResponse.json(
      { error: 'Failed to validate promo code' }, 
      { status: 500 }
    );
  }
}