"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { apiService, Experience } from "@/app/services/api"

export default function CheckoutContent() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [applyingPromo, setApplyingPromo] = useState(false)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const experienceId = searchParams.get('experienceId')
  const slotId = searchParams.get('slotId')
  const quantity = parseInt(searchParams.get('quantity') || '1')

  const subtotal = experience ? experience.price * quantity : 0
  const taxes = Math.round(subtotal * 0.06)
  const total = subtotal + taxes

  useEffect(() => {
    const fetchExperience = async () => {
      if (experienceId) {
        try {
          const data = await apiService.getExperienceById(experienceId)
          setExperience(data)
        } catch (error) {
          console.error("Failed to fetch experience:", error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchExperience()
  }, [experienceId])

  const handleApplyPromo = async () => {
    if (!promoCode) return
    
    setApplyingPromo(true)
    try {
      const result = await apiService.validatePromoCode(promoCode, total)
      if (result.valid) {
        alert(`Promo code applied! Discount: ₹${result.discount}`)
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert("Failed to validate promo code")
    } finally {
      setApplyingPromo(false)
    }
  }

  const handlePayment = async () => {
    if (!fullName || !email || !agreeToTerms) {
      alert("Please fill all required fields and agree to terms")
      return
    }

    if (!experienceId || !slotId) {
      alert("Missing booking information")
      return
    }

    try {
      const bookingData = {
        experienceId,
        slotId,
        participantCount: quantity,
        userInfo: {
          name: fullName,
          email: email,
          phone: ""
        },
        promoCode: promoCode || undefined
      }

      const booking = await apiService.createBooking(bookingData)
      router.push(`/result?reference=${booking.referenceId}&status=success`)
    } catch (error) {
      console.error("Booking failed:", error)
      router.push(`/result?status=failed`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    )
  }

  if (!experienceId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Booking</h2>
          <p className="text-gray-600 mb-6">Please select an experience first.</p>
          <Link href="/" className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
            Browse Experiences
          </Link>
        </div>
      </div>
    )
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience Not Found</h2>
          <p className="text-gray-600 mb-6">The selected experience could not be loaded.</p>
          <Link href="/" className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href={`/details/${experienceId}`} className="flex items-center gap-2 text-black font-medium mb-8 hover:opacity-70">
          <ChevronLeft size={20} />
          Checkout
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full name *</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={applyingPromo}
                    className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition disabled:opacity-50"
                  >
                    {applyingPromo ? "Applying..." : "Apply"}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-yellow-400 focus:ring-2 focus:ring-yellow-400"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the terms and safety policy *
                  </label>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-100 rounded-lg p-6 sticky top-8">
              <div className="space-y-4">
                <div className="space-y-3 pb-4 border-b border-gray-300">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium text-black">{experience.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-black">{experience.location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Qty</span>
                    <span className="font-medium text-black">{quantity}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-black">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes</span>
                    <span className="font-medium text-black">₹{taxes}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-300">
                  <div className="flex justify-between mb-6">
                    <span className="font-semibold text-black">Total</span>
                    <span className="font-bold text-lg text-black">₹{total}</span>
                  </div>

                  <button 
                    onClick={handlePayment}
                    className="w-full px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition"
                  >
                    Pay and Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}