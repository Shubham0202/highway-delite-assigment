import { Suspense } from 'react'
import ResultContent from './ResultContent'

function ResultLoading() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 bg-white px-4">
      <div className="flex flex-col items-center gap-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-12 w-40 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={<ResultLoading />}>
      <ResultContent />
    </Suspense>
  )
}