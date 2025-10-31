"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  return (
    <header className="sticky top-0 z-50 shadow bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href={'/'} className="logo">
            <img src="./logo.svg" alt="highway delite" />
          </Link>
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="flex flex-1 items-center gap-2 md:max-w-md">
              <input
                type="text"
                placeholder="Search experiences"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="sm:w-80 rounded-md bg-primary-gray px-4 py-3 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Search Button */}
            <button 
              onClick={handleSearch}
              className="hidden sm:block rounded-md bg-primary-yellow px-5 py-2.5 font-semibold text-black transition-colors hover:bg-yellow-500"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}