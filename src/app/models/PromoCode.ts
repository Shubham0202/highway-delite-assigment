import mongoose from 'mongoose';

const promoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { 
    type: String, 
    enum: ['percentage', 'fixed'], 
    required: true 
  },
  discountValue: { type: Number, required: true },
  minAmount: { type: Number, default: 0 },
  validFrom: { type: Date, default: Date.now },
  validUntil: { type: Date },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.models.PromoCode || mongoose.model('PromoCode', promoSchema);