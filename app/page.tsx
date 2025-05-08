import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/at.jpg?height=800&width=1600"
            alt="Morocco landscape"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Morocco's Rich History</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Experience centuries of culture, architecture, and traditions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trips"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              Explore Trips <ArrowRight size={18} />
            </Link>
            <Link href="/signup" className="bg-white hover:bg-gray-100 text-amber-800 px-6 py-3 rounded-lg font-medium">
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">Popular Historical Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-60">
                  <Image
                    src={destination.image || "/at.jpg"}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <MapPin size={18} className="text-amber-600 mr-2" />
                    <span className="text-gray-600">{destination.location}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-amber-900">{destination.name}</h3>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <Link href={`/trips/${destination.id}`} className="text-amber-600 font-medium flex items-center">
                    View Details <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">Our Popular Tour Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-amber-500 transition-colors"
              >
                <h3 className="text-xl font-bold mb-4 text-amber-800">{tour.name}</h3>
                <div className="flex items-center gap-4 mb-4 text-gray-600">
                  <div className="flex items-center">
                    <Calendar size={18} className="mr-2 text-amber-600" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center">
                    <Users size={18} className="mr-2 text-amber-600" />
                    Max {tour.maxPeople} people
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{tour.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-amber-900 font-bold text-xl">${tour.price}</span>
                  <Link
                    href={`/trips/${tour.id}`}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium text-sm"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 bg-amber-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">From Our Blog</h2>
            <Link
              href="/blog"
              className="mt-4 md:mt-0 flex items-center font-medium hover:text-amber-200 transition-colors"
            >
              View All Posts <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="group">
                <div className="bg-amber-800 rounded-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-amber-300 text-sm">{post.date}</span>
                    <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-amber-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-amber-100">{post.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-amber-900">Ready to Explore Morocco?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join us on a journey through time and discover the beauty of Moroccan heritage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Sign Up Now
            </Link>
            <Link
              href="/contact"
              className="border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// Data
const destinations = [
  {
    id: 1,
    name: "Fes Medina",
    location: "Fes",
    description: "Explore the ancient walled city with its labyrinthine streets and the world's oldest university.",
    image: "/fes1.jpg?height=600&width=800",
  },
  {
    id: 2,
    name: "Volubilis Roman Ruins",
    location: "Meknes",
    description: "Visit Morocco's best-preserved Roman ruins dating back to the 3rd century BC.",
    image: "/mek1.jpg?height=600&width=800",
  },
  {
    id: 3,
    name: "Bahia Palace",
    location: "Marrakech",
    description: "Marvel at the intricate Islamic and Moroccan architectural styles from the 19th century.",
    image: "/kech.jpg?height=600&width=800",
  },
]

const tours = [
  {
    id: 1,
    name: "Imperial Cities Heritage Tour",
    duration: "7 Days",
    maxPeople: 12,
    price: 1299,
    description: "Experience the historical wonders of Rabat, Fes, Meknes, and Marrakech with expert local guides.",
  },
  {
    id: 2,
    name: "Sahara Desert & Ancient Kasbahs",
    duration: "5 Days",
    maxPeople: 10,
    price: 999,
    description: "Journey through time as you visit ancient fortresses and spend nights under the stars in the Sahara.",
  },
  {
    id: 3,
    name: "Coastal Heritage Exploration",
    duration: "8 Days",
    maxPeople: 14,
    price: 1499,
    description: "Discover Morocco's rich maritime history from Tangier to Essaouira with stops at historical ports.",
  },
  {
    id: 4,
    name: "Atlas Mountains & Berber Villages",
    duration: "6 Days",
    maxPeople: 8,
    price: 1199,
    description:
      "Trek through the Atlas Mountains and learn about the history and culture of indigenous Berber communities.",
  },
]

const blogPosts = [
  {
    id: 1,
    title: "The Hidden History of Chefchaouen's Blue Streets",
    excerpt: "Discover why this mountain town's streets were painted blue and the historical significance behind it.",
    date: "June 12, 2023",
    image: "/blue.jpg?height=400&width=600",
  },
  {
    id: 2,
    title: "Architectural Evolution: From Berber to Moorish",
    excerpt: "Explore how Morocco's architecture evolved over centuries of diverse cultural influences.",
    date: "May 28, 2023",
    image: "/arch.jpg?height=400&width=600",
  },
  {
    id: 3,
    title: "Lost Trade Routes: Morocco's Role in Ancient Commerce",
    excerpt:
      "Learn about Morocco's pivotal position in historical trade networks connecting Africa, Europe, and the Middle East.",
    date: "April 15, 2023",
    image: "/trade.jpg?height=400&width=600",
  },
]
