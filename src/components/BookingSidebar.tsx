"use client"

import { Plus, Minus } from "lucide-react"
import { useRouter } from "next/navigation"

interface BookingSidebarProps {
  quantity: number
  setQuantity: (val: number) => void
  price: number
  experienceId: string
  slotId: string
  selectedDate: string
  selectedSlot: any
}

export default function BookingSidebar({
  quantity,
  setQuantity,
  price,
  experienceId,
  slotId,
  selectedDate,
  selectedSlot
}: BookingSidebarProps) {
  const router = useRouter()
  
  const subtotal = price * quantity
  const taxes = Math.round(subtotal * 0.06)
  const total = subtotal + taxes

  const handleQuantityChange = (delta: number) => {
    const newVal = quantity + delta
    if (newVal > 0) setQuantity(newVal)
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
      return timeString;
    }
  }

  const handleConfirm = () => {
    if (!slotId || !selectedSlot) {
      alert("Please select a date and time")
      return
    }
    // Navigate to checkout with data
    router.push(`/checkout?experienceId=${experienceId}&slotId=${slotId}&quantity=${quantity}`)
  }

  const isConfirmDisabled = !slotId || !selectedSlot

  return (
    <div className="w-80 bg-gray-50 rounded-lg p-6 h-fit sticky top-8">
      {/* Price */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-600 font-medium">Starts at</span>
        <span className="text-2xl font-bold">₹{price}</span>
      </div>

      {/* Quantity */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-600 font-medium">Quantity</span>
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-1">
          <button onClick={() => handleQuantityChange(-1)} className="text-gray-500 hover:text-gray-700">
            <Minus size={16} />
          </button>
          <span className="w-6 text-center font-medium">{quantity}</span>
          <button onClick={() => handleQuantityChange(1)} className="text-gray-500 hover:text-gray-700">
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Selected Date & Time */}
      {selectedDate && selectedSlot && (
        <div className="mb-4 p-3 bg-white rounded-lg border">
          <div className="text-sm text-gray-600 space-y-1">
            <div className="font-medium">📅 Date: {new Date(selectedDate).toLocaleDateString()}</div>
            <div className="font-medium">
              ⏰ Time: {formatTime(selectedSlot.startTime)} - {formatTime(selectedSlot.endTime)}
            </div>
            <div className="text-xs text-green-600">
              ✅ {selectedSlot.maxParticipants - selectedSlot.bookedCount} slots available
            </div>
          </div>
        </div>
      )}

      {/* Subtotal */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
        <span className="text-gray-600 font-medium">Subtotal</span>
        <span className="font-semibold">₹{subtotal}</span>
      </div>

      {/* Taxes */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-600 font-medium">Taxes</span>
        <span className="font-semibold">₹{taxes}</span>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
        <span className="text-lg font-bold">Total</span>
        <span className="text-lg font-bold">₹{total}</span>
      </div>

      {/* Confirm Button */}
      <button 
        onClick={handleConfirm}
        disabled={isConfirmDisabled}
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          isConfirmDisabled 
            ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
            : "bg-yellow-400 text-black hover:bg-yellow-500"
        }`}
      >
        {isConfirmDisabled ? "Select Date & Time" : "Confirm"}
      </button>
    </div>
  )
}