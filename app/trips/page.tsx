import Image from "next/image"
import Link from "next/link"
import { Calendar, Users, Star, Clock, MapPin } from "lucide-react"

export default function TripsPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-amber-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Historical Tours</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-amber-100">
            Experience Morocco's rich heritage with our carefully crafted historical tour programs
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-full md:w-auto">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <select
                id="duration"
                className="w-full md:w-48 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              >
                <option value="">Any Duration</option>
                <option value="short">1-3 Days</option>
                <option value="medium">4-7 Days</option>
                <option value="long">8+ Days</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <select
                id="region"
                className="w-full md:w-48 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              >
                <option value="">All Regions</option>
                <option value="north">Northern Morocco</option>
                <option value="central">Central Morocco</option>
                <option value="south">Southern Morocco</option>
                <option value="coastal">Coastal Cities</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select
                id="price"
                className="w-full md:w-48 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              >
                <option value="">Any Price</option>
                <option value="budget">Budget ($500-$999)</option>
                <option value="standard">Standard ($1000-$1499)</option>
                <option value="luxury">Luxury ($1500+)</option>
              </select>
            </div>
            <div className="w-full md:w-auto mt-4 md:mt-6">
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tours List */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
              <div className="md:w-1/3 relative h-64 md:h-auto">
                <Image src={tour.image || "/placeholder.svg"} alt={tour.name} fill className="object-cover" />
                {tour.featured && (
                  <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex flex-wrap justify-between items-start mb-3">
                  <h2 className="text-2xl font-bold text-amber-900 mb-2 md:mb-0">{tour.name}</h2>
                  <div className="flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                    <Star size={16} className="mr-1 text-amber-500 fill-amber-500" />
                    <span>{tour.rating}/5</span>
                    <span className="text-gray-500 ml-1">({tour.reviews} reviews)</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-gray-600 text-sm">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1 text-amber-600" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1 text-amber-600" />
                    Max {tour.maxPeople} people
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1 text-amber-600" />
                    {tour.season}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1 text-amber-600" />
                    {tour.destinations.join(", ")}
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{tour.description}</p>

                <div className="flex flex-wrap items-center justify-between mt-auto">
                  <div>
                    <span className="text-3xl font-bold text-amber-900">${tour.price}</span>
                    <span className="text-gray-500 text-sm ml-1">per person</span>
                  </div>
                  <Link
                    href={`/trips/${tour.id}`}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Sample tours data
const tours = [
  {
    id: 1,
    name: "Imperial Cities Heritage Tour",
    duration: "7 Days",
    season: "Year-round",
    maxPeople: 12,
    price: 1299,
    rating: 4.8,
    reviews: 124,
    featured: true,
    destinations: ["Rabat", "Fes", "Meknes", "Marrakech"],
    description:
      "Experience the historical wonders of Morocco's four imperial cities. This tour takes you through centuries of Moroccan royal history, exploring ancient medinas, magnificent palaces, and bustling souks with expert local guides.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 2,
    name: "Sahara Desert & Ancient Kasbahs",
    duration: "5 Days",
    season: "Sep-May",
    maxPeople: 10,
    price: 999,
    rating: 4.7,
    reviews: 98,
    featured: false,
    destinations: ["Ouarzazate", "Ait Ben Haddou", "Merzouga"],
    description:
      "Journey through time as you visit ancient fortresses and spend nights under the stars in the Sahara. Explore UNESCO-listed kasbahs, traverse dramatic mountain passes, and experience traditional Berber hospitality.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 3,
    name: "Coastal Heritage Exploration",
    duration: "8 Days",
    season: "Year-round",
    maxPeople: 14,
    price: 1499,
    rating: 4.6,
    reviews: 87,
    featured: true,
    destinations: ["Tangier", "Asilah", "Rabat", "Essaouira"],
    description:
      "Discover Morocco's rich maritime history from Tangier to Essaouira with stops at historical ports. This tour explores Portuguese fortresses, ancient Roman ruins, and the fusion of European and African influences in coastal Morocco.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 4,
    name: "Atlas Mountains & Berber Villages",
    duration: "6 Days",
    season: "Mar-Nov",
    maxPeople: 8,
    price: 1199,
    rating: 4.9,
    reviews: 76,
    featured: false,
    destinations: ["High Atlas", "Imlil", "Ourika Valley"],
    description:
      "Trek through the Atlas Mountains and learn about the history and culture of indigenous Berber communities. Visit traditional villages perched on mountainsides, explore ancient irrigation systems, and enjoy stunning natural landscapes.",
    image: "/placeholder.svg?height=600&width=800",
  },
]
