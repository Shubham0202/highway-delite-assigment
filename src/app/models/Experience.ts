import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  available: { type: Boolean, default: true },
  maxParticipants: { type: Number, default: 10 },
  bookedCount: { type: Number, default: 0 }
});

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
  includes: [{ type: String }],
  highlights: [{ type: String }],
  requirements: [{ type: String }],
  slots: [slotSchema]
}, {
  timestamps: true
});

export default mongoose.models.Experience || mongoose.model('Experience', experienceSchema);