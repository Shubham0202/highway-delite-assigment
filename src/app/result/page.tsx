"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function ResultContent() {
  const searchParams = useSearchParams()
  const referenceId = searchParams.get('reference')
  const status = searchParams.get('status')

  const isSuccess = status === 'success'

  return (
    <div className="flex flex-col items-center justify-center mt-10 bg-white px-4">
      <div className="flex flex-col items-center gap-6">
        {/* Success/Failure Icon */}
        {isSuccess ? (
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          {isSuccess ? 'Booking Confirmed' : 'Booking Failed'}
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 text-center">
          {isSuccess 
            ? 'Your booking has been successfully confirmed!' 
            : 'Sorry, there was an issue processing your booking. Please try again.'
          }
        </p>

        {/* Reference ID */}
        {isSuccess && referenceId && (
          <p className="text-lg text-gray-600">
            Ref ID: <span className="font-semibold">{referenceId}</span>
          </p>
        )}

        {/* Back to Home Button */}
        <Link href="/">
          <button className="mt-4 px-8 py-3 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition-colors font-medium">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center mt-10 bg-white px-4">
        <div className="text-center">Loading...</div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}

export const dynamic = 'force-dynamic'