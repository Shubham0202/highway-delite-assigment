import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Experience from '@/app/models/Experience';
import PromoCode from '@/app/models/PromoCode';

export async function GET() {
  try {
    await connectDB();

    // Clear existing data
    await Experience.deleteMany({});
    await PromoCode.deleteMany({});

    // Seed experiences
    const experiences = await Experience.insertMany(
[
  {
    title: "Kayaking Adventure",
    location: "Udupi, Karnataka",
    image: "https://images.unsplash.com/photo-1626594995085-36b551227b9a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2F5YWtpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    description: "Paddle through serene mangrove forests with expert guides. Perfect for beginners and experienced kayakers alike.",
    price: 999,
    duration: "2 hours",
    category: "adventure",
    rating: 4.5,
    reviewCount: 128,
    includes: ["Kayak equipment", "Life jacket", "Expert guide", "Safety briefing", "Water bottle"],
    highlights: ["Mangrove exploration", "Bird watching", "Peaceful waterways", "Photo opportunities"],
    requirements: ["Minimum age 10", "Basic swimming skills", "Comfortable clothing"],
    slots: [
      { date: "2024-11-15", startTime: "06:00", endTime: "08:00", available: true, maxParticipants: 12, bookedCount: 3 },
      { date: "2024-11-15", startTime: "08:30", endTime: "10:30", available: true, maxParticipants: 12, bookedCount: 7 },
      { date: "2024-11-16", startTime: "06:00", endTime: "08:00", available: true, maxParticipants: 12, bookedCount: 2 }
    ]
  },
  {
    title: "Nandi Hills Sunrise Trek",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjBzdW5yaXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    description: "Witness breathtaking sunrise from the top of Nandi Hills with experienced trek leaders.",
    price: 799,
    duration: "4 hours",
    category: "trekking",
    rating: 4.7,
    reviewCount: 215,
    includes: ["Transportation", "Breakfast", "Trek guide", "First aid"],
    highlights: ["Panoramic views", "Historical sites", "Cool morning breeze", "Photography"],
    requirements: ["Comfortable shoes", "Water bottle", "Early wake-up"],
    slots: [
      { date: "2024-11-16", startTime: "04:30", endTime: "08:30", available: true, maxParticipants: 20, bookedCount: 12 },
      { date: "2024-11-17", startTime: "04:30", endTime: "08:30", available: true, maxParticipants: 20, bookedCount: 5 }
    ]
  },
  {
    title: "Coffee Plantation Tour",
    location: "Coorg, Karnataka",
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlJTIwcGxhbnRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    description: "Explore aromatic coffee estates and learn about coffee processing from bean to cup.",
    price: 1299,
    duration: "3 hours",
    category: "cultural",
    rating: 4.8,
    reviewCount: 89,
    includes: ["Plantation tour", "Coffee tasting", "Local snacks", "Expert guide"],
    highlights: ["Coffee processing demo", "Fresh coffee tasting", "Scenic plantation walks"],
    requirements: ["Comfortable walking shoes", "Camera for photos"],
    slots: [
      { date: "2024-11-15", startTime: "09:00", endTime: "12:00", available: true, maxParticipants: 15, bookedCount: 8 },
      { date: "2024-11-16", startTime: "09:00", endTime: "12:00", available: true, maxParticipants: 15, bookedCount: 3 }
    ]
  },
  {
    title: "Scuba Diving for Beginners",
    location: "Netrani Island",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2N1YmElMjBkaXZpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    description: "Discover underwater world with certified PADI instructors. No prior experience needed.",
    price: 3499,
    duration: "5 hours",
    category: "water-sports",
    rating: 4.9,
    reviewCount: 167,
    includes: ["Full equipment", "PADI certification", "Underwater photos", "Lunch", "Boat ride"],
    highlights: ["Colorful coral reefs", "Tropical fish", "Clear waters", "Professional instruction"],
    requirements: ["Basic swimming skills", "Medical fitness certificate"],
    slots: [
      { date: "2024-11-18", startTime: "07:00", endTime: "12:00", available: true, maxParticipants: 8, bookedCount: 6 },
      { date: "2024-11-19", startTime: "07:00", endTime: "12:00", available: true, maxParticipants: 8, bookedCount: 2 }
    ]
  },
  {
    title: "Wildlife Safari",
    location: "Bandipur National Park",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2lsZGxpZmUlMjBzYWZhcml8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    description: "Morning safari through one of India's most beautiful tiger reserves with naturalist guide.",
    price: 1599,
    duration: "3 hours",
    category: "wildlife",
    rating: 4.6,
    reviewCount: 304,
    includes: ["Safari jeep", "Expert naturalist", "Binoculars", "Refreshments"],
    highlights: ["Tiger spotting", "Bird watching", "Deer species", "Beautiful landscapes"],
    requirements: ["Neutral colored clothing", "No perfumes", "Camera with zoom"],
    slots: [
      { date: "2024-11-17", startTime: "06:00", endTime: "09:00", available: true, maxParticipants: 6, bookedCount: 4 },
      { date: "2024-11-18", startTime: "06:00", endTime: "09:00", available: true, maxParticipants: 6, bookedCount: 1 }
    ]
  },
  {
    title: "Yoga & Meditation Retreat",
    location: "Rishikesh, Uttarakhand",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW9nYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    description: "Rejuvenate your mind and body with traditional yoga sessions by the Ganges river.",
    price: 899,
    duration: "2 hours",
    category: "wellness",
    rating: 4.8,
    reviewCount: 192,
    includes: ["Yoga mats", "Meditation session", "Herbal tea", "Expert instructor"],
    highlights: ["Riverside location", "Traditional techniques", "Peaceful environment"],
    requirements: ["Comfortable clothing", "Empty stomach recommended"],
    slots: [
      { date: "2024-11-16", startTime: "06:30", endTime: "08:30", available: true, maxParticipants: 25, bookedCount: 18 },
      { date: "2024-11-17", startTime: "06:30", endTime: "08:30", available: true, maxParticipants: 25, bookedCount: 12 }
    ]
  },
  {
    title: "Street Food Tour",
    location: "Old Delhi",
    image: "https://images.unsplash.com/photo-1547219469-75c19c0bd220?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    description: "Explore Delhi's famous street food scene with a local food expert guide.",
    price: 699,
    duration: "3 hours",
    category: "food",
    rating: 4.7,
    reviewCount: 278,
    includes: ["Food tasting at 8 stops", "Bottled water", "Expert guide", "Food history insights"],
    highlights: ["Local delicacies", "Hidden food spots", "Cultural insights", "Vegetarian options"],
    requirements: ["Empty stomach", "Comfortable walking shoes"],
    slots: [
      { date: "2024-11-15", startTime: "18:00", endTime: "21:00", available: true, maxParticipants: 12, bookedCount: 9 },
      { date: "2024-11-16", startTime: "18:00", endTime: "21:00", available: true, maxParticipants: 12, bookedCount: 5 }
    ]
  },
  {
    title: "Paragliding Adventure",
    location: "Bir Billing, Himachal",
    image: "https://plus.unsplash.com/premium_photo-1675827055620-24d540e0892a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG5hdHVyZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    description: "Soar like a bird over the beautiful valleys of Bir Billing with certified instructors.",
    price: 2999,
    duration: "2 hours",
    category: "adventure",
    rating: 4.9,
    reviewCount: 143,
    includes: ["Full safety gear", "Certified instructor", "Video recording", "Transport to takeoff point"],
    highlights: ["Breathtaking views", "Professional pilots", "Safe equipment", "Unforgettable experience"],
    requirements: ["Weight 35-95 kg", "Comfortable clothing", "No heart conditions"],
    slots: [
      { date: "2024-11-18", startTime: "10:00", endTime: "12:00", available: true, maxParticipants: 10, bookedCount: 8 },
      { date: "2024-11-19", startTime: "10:00", endTime: "12:00", available: true, maxParticipants: 10, bookedCount: 3 }
    ]
  },
  {
    title: "Pottery Workshop",
    location: "Andretta, Himachal",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90dGVyeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    description: "Learn traditional pottery techniques from master artisans in a peaceful Himalayan village.",
    price: 1199,
    duration: "3 hours",
    category: "art",
    rating: 4.6,
    reviewCount: 76,
    includes: ["All materials", "Expert instruction", "Take home your creation", "Tea and snacks"],
    highlights: ["Hands-on experience", "Traditional techniques", "Creative expression", "Relaxing environment"],
    requirements: ["No prior experience needed", "Comfortable clothing"],
    slots: [
      { date: "2024-11-17", startTime: "14:00", endTime: "17:00", available: true, maxParticipants: 8, bookedCount: 5 },
      { date: "2024-11-18", startTime: "14:00", endTime: "17:00", available: true, maxParticipants: 8, bookedCount: 2 }
    ]
  },
  {
    title: "Stargazing Night",
    location: "Ladakh",
    image: "https://images.unsplash.com/photo-1629846735951-4d0512b27d77?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG5hdHVyZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    description: "Witness the magnificent Milky Way from one of the highest and clearest skies in the world.",
    price: 1499,
    duration: "3 hours",
    category: "astronomy",
    rating: 4.9,
    reviewCount: 94,
    includes: ["Telescope access", "Astronomy expert", "Hot beverages", "Warm blankets"],
    highlights: ["Milky Way visibility", "Planet spotting", "Constellation learning", "High altitude experience"],
    requirements: ["Warm clothing", "No light pollution sources"],
    slots: [
      { date: "2024-11-19", startTime: "20:00", endTime: "23:00", available: true, maxParticipants: 15, bookedCount: 11 },
      { date: "2024-11-20", startTime: "20:00", endTime: "23:00", available: true, maxParticipants: 15, bookedCount: 4 }
    ]
  }
]);

    // Seed promo codes
    const promoCodes = await PromoCode.insertMany([
      { code: 'SAVE10', discountType: 'percentage', discountValue: 10, minAmount: 500 },
      { code: 'FLAT100', discountType: 'fixed', discountValue: 100, minAmount: 1000 },
      { code: 'WELCOME20', discountType: 'percentage', discountValue: 20, minAmount: 800 }
    ]);

    return NextResponse.json({
      message: 'Database seeded successfully',
      experiences: experiences.length,
      promoCodes: promoCodes.length
    });
  } catch (error) {
    console.error('Failed to seed database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' }, 
      { status: 500 }
    );
  }
}