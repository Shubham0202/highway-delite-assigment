import Link from "next/link"

interface Experience {
  _id: string
  title: string
  location: string
  image: string
  description: string
  price: number
}

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden bg-gray-200">
        <img
          src={experience.image || "/placeholder.svg"}
          alt={experience.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 bg-card-bg">
        {/* Title and Location */}
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground">{experience.title}</h3>
          <span className="whitespace-nowrap rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-700">
            {experience.location}
          </span>
        </div>

        {/* Description */}
        <p className="mb-4 text-xs text-muted-foreground line-clamp-2">{experience.description}</p>

        {/* Price and Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-muted-foreground">From</span>
            <span className="text-lg font-bold text-foreground">₹{experience.price}</span>
          </div>
          {/* ✅ FIXED: Link to dynamic route */}
          <Link 
            href={`/details/${experience._id}`} 
            className="rounded-md bg-primary-yellow px-3 py-2 text-xs font-semibold text-black transition-colors hover:bg-yellow-500"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}