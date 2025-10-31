import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  experienceId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Experience', 
    required: true 
  },
  slotId: { type: String, required: true },
  participantCount: { type: Number, required: true, min: 1 },
  userInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
  },
  promoCode: { type: String },
  totalAmount: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  finalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['confirmed', 'pending', 'failed'], 
    default: 'confirmed' 
  },
  referenceId: { type: String, unique: true }
}, {
  timestamps: true
});

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);