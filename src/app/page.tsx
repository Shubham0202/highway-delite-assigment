import { Suspense } from 'react'
import ExperienceGrid from '@/components/ExperienceGrid'

// Loading component for home page
function HomeLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="h-40 w-full bg-gray-200 animate-pulse"></div>
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="flex items-baseline gap-1">
                  <div className="h-3 w-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={<HomeLoading />}>
        <ExperienceGrid />
      </Suspense>
    </main>
  )
}