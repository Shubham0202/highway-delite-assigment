const API_BASE = '/api';

export interface Experience {
  _id: string;
  title: string;
  location: string;
  image: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  rating: number;
  reviewCount: number;
  includes: string[];
  highlights: string[];
  requirements: string[];
  slots: Array<{
    _id: string;
    date: string;
    startTime: string;
    endTime: string;
    available: boolean;
    maxParticipants: number;
    bookedCount: number;
  }>;
}

export interface BookingData {
  experienceId: string;
  slotId: string;
  participantCount: number;
  userInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  promoCode?: string;
}

export interface BookingResponse {
  _id: string;
  experienceId: Experience;
  slotId: string;
  participantCount: number;
  userInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: string;
  referenceId: string;
  bookingDate: string;
}

export const apiService = {
  async getExperiences(): Promise<Experience[]> {
    const response = await fetch(`${API_BASE}/experiences`);
    if (!response.ok) throw new Error('Failed to fetch experiences');
    return response.json();
  },

  async getExperienceById(id: string): Promise<Experience> {
    const response = await fetch(`${API_BASE}/experiences/${id}`);
    if (!response.ok) throw new Error('Failed to fetch experience');
    return response.json();
  },

  async createBooking(bookingData: BookingData): Promise<BookingResponse> {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) throw new Error('Failed to create booking');
    return response.json();
  },

  async validatePromoCode(code: string, amount: number) {
    const response = await fetch(`${API_BASE}/promo/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, amount }),
    });
    return response.json();
  }
};