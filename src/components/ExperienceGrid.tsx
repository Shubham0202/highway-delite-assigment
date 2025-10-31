"use client"

import { useEffect, useState } from "react"
import ExperienceCard from "./ExperienceCard"
import { apiService, Experience } from "@/app/services/api"
import { useSearchParams } from "next/navigation"

export default function ExperienceGrid() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await apiService.getExperiences()
        setExperiences(data)
      } catch (err) {
        setError("Failed to load experiences")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  // Filter experiences based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredExperiences(experiences)
      return
    }

    const query = searchQuery.toLowerCase().trim()
    const filtered = experiences.filter(experience =>
      experience.title.toLowerCase().includes(query) ||
      experience.location.toLowerCase().includes(query) ||
      experience.description.toLowerCase().includes(query) ||
      experience.category.toLowerCase().includes(query)
    )
    
    setFilteredExperiences(filtered)
  }, [searchQuery, experiences])

  if (loading) return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading experiences...</p>
      </div>
    </div>
  )
  
  if (error) return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center py-12 text-red-600">{error}</div>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Search Results Header */}
      {searchQuery && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {filteredExperiences.length > 0 
              ? `Search Results for "${searchQuery}"`
              : `No results found for "${searchQuery}"`
            }
          </h2>
          <p className="text-gray-600">
            {filteredExperiences.length} {filteredExperiences.length === 1 ? 'experience' : 'experiences'} found
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredExperiences.map((experience) => (
          <ExperienceCard key={experience._id} experience={experience} />
        ))}
      </div>

      {/* No results message */}
      {filteredExperiences.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-gray-600">Try searching with different keywords</p>
        </div>
      )}
    </div>
  )
}