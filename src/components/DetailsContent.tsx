"use client"

import { useState, useEffect } from "react"
import { ChevronLeft } from "lucide-react"
import BookingSidebar from "./BookingSidebar"
import Link from "next/link"
import { apiService, Experience } from "@/app/services/api"

interface DetailsContentProps {
  id: string;
}

export default function DetailsContent({ id }: DetailsContentProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedSlot, setSelectedSlot] = useState<any>(null)
  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        if (!id) {
          setError("No experience ID provided")
          return
        }
        
        const data = await apiService.getExperienceById(id)
        setExperience(data)
        
        // Set first available date and slot by default
        if (data.slots && data.slots.length > 0) {
          setSelectedDate(data.slots[0].date)
          setSelectedSlot(data.slots[0])
        }
      } catch (err) {
        console.error("Failed to fetch experience:", err)
        setError("Failed to load experience details")
      } finally {
        setLoading(false)
      }
    }

    fetchExperience()
  }, [id])

  // Get unique dates from slots
  const availableDates = experience?.slots 
    ? [...new Set(experience.slots.map(slot => slot.date))]
    : []

  // Get available slots for selected date
  const availableSlots = experience?.slots 
    ? experience.slots.filter(slot => slot.date === selectedDate && slot.available)
    : []

  // Handle slot selection
  const handleSlotSelect = (slot: any) => {
    setSelectedSlot(slot)
  }

  // Format time for display
  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'pm' : 'am';
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    } catch (error) {
      return timeString; // Fallback to original string if parsing fails
    }
  }

  if (loading) return (
    <div className="flex gap-8 px-8 py-8 max-w-7xl mx-auto">
      <div className="flex-1">
        <div className="text-center py-12">Loading experience details...</div>
      </div>
    </div>
  )
  
  if (error) return (
    <div className="flex gap-8 px-8 py-8 max-w-7xl mx-auto">
      <div className="flex-1">
        <div className="text-center py-12 text-red-600">{error}</div>
      </div>
    </div>
  )
  
  if (!experience) return (
    <div className="flex gap-8 px-8 py-8 max-w-7xl mx-auto">
      <div className="flex-1">
        <div className="text-center py-12">Experience not found</div>
      </div>
    </div>
  )

  return (
    <div className="flex gap-8 px-8 py-8 max-w-7xl mx-auto">
      {/* Main Content */}
      <div className="flex-1">
        <Link href='/' className="flex items-center gap-2 mb-8 cursor-pointer hover:opacity-70">
          <ChevronLeft size={20} />
          <span className="text-base font-medium">Back to Home</span>
        </Link>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden mb-8 h-96">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title and Location */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
          <p className="text-gray-600 flex items-center gap-1">
            <span>📍</span>
            <span>{experience.location}</span>
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
            ⭐ {experience.rating} ({experience.reviewCount} reviews)
          </span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-600">{experience.duration}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-8 text-base leading-relaxed">
          {experience.description}
        </p>

        {/* Choose Date */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Choose date</h2>
          <div className="flex gap-3 flex-wrap">
            {availableDates.map((date, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedDate(date)
                  setSelectedSlot(null) // Reset slot when date changes
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  date === selectedDate ? "bg-yellow-400 text-black" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </button>
            ))}
          </div>
        </div>

        {/* Choose Time */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Choose time</h2>
          {availableSlots.length === 0 ? (
            <p className="text-gray-500">No available slots for this date</p>
          ) : (
            <>
              <div className="flex gap-3 flex-wrap">
                {availableSlots.map((slot) => (
                  <button
                    key={slot._id}
                    onClick={() => handleSlotSelect(slot)}
                    disabled={!slot.available || slot.bookedCount >= slot.maxParticipants}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex flex-col items-center gap-1 ${
                      selectedSlot?._id === slot._id 
                        ? "bg-yellow-400 text-black" 
                        : slot.available && slot.bookedCount < slot.maxParticipants
                        ? "border border-gray-300 text-gray-700 hover:border-yellow-400"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <span className="text-sm">
                      {formatTime(slot.startTime)}
                    </span>
                    {slot.available && slot.bookedCount < slot.maxParticipants ? (
                      <span className="text-xs text-orange-500 font-semibold">
                        {slot.maxParticipants - slot.bookedCount} left
                      </span>
                    ) : (
                      <span className="text-xs">Sold out</span>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">All times are in IST (GMT +5:30)</p>
            </>
          )}
        </div>

        {/* Selected Time Display */}
        {selectedSlot && (
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Selected Time Slot</h3>
            <p className="text-blue-700">
              📅 {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-blue-700">
              ⏰ {formatTime(selectedSlot.startTime)} - {formatTime(selectedSlot.endTime)}
            </p>
          </div>
        )}

        {/* About */}
        <div>
          <h2 className="text-lg font-bold mb-4">About this experience</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2">Highlights:</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                {experience.highlights?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2">What's included:</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                {experience.includes?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            {experience.requirements && experience.requirements.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Requirements:</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {experience.requirements?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Sidebar */}
      <BookingSidebar 
        quantity={quantity} 
        setQuantity={setQuantity}
        price={experience.price}
        experienceId={experience._id}
        slotId={selectedSlot?._id || ""}
        selectedDate={selectedDate}
        selectedSlot={selectedSlot}
      />
    </div>
  )
}