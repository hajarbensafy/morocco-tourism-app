import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-amber-900  text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-amber-100">
            Discover stories, insights, and guides about Morocco's rich history and cultural heritage
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <Link href={`/blog/${post.id}`}>
                <div className="relative h-56">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <User size={16} className="mr-1" />
                    {post.author}
                  </div>
                </div>
                <Link href={`/blog/${post.id}`}>
                  <h2 className="text-xl font-bold mb-3 text-amber-900 hover:text-amber-700 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-amber-600 font-medium flex items-center hover:text-amber-800 transition-colors"
                >
                  Read More <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="inline-flex">
            <a
              href="#"
              className="px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-l-lg hover:bg-gray-50"
            >
              Previous
            </a>
            <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-amber-600 text-white">
              1
            </a>
            <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              2
            </a>
            <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              3
            </a>
            <a
              href="#"
              className="px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-r-lg hover:bg-gray-50"
            >
              Next
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Hidden History of Chefchaouen's Blue Streets",
    excerpt:
      "Discover why this mountain town's streets were painted blue and the historical significance behind it. The blue color has a fascinating story dating back centuries.",
    date: "June 12, 2023",
    author: "Ahmed Benali",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Architectural Evolution: From Berber to Moorish",
    excerpt:
      "Explore how Morocco's architecture evolved over centuries of diverse cultural influences, creating the unique style we recognize today.",
    date: "May 28, 2023",
    author: "Sophia El Mansouri",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Lost Trade Routes: Morocco's Role in Ancient Commerce",
    excerpt:
      "Learn about Morocco's pivotal position in historical trade networks connecting Africa, Europe, and the Middle East, and how it shaped the country.",
    date: "April 15, 2023",
    author: "Jamal Tahiri",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "The Legacy of Sultans: Morocco's Royal History",
    excerpt:
      "From the Idrisid dynasty to the Alaouite monarchy of today, discover the fascinating history of Morocco's royal lineages.",
    date: "March 22, 2023",
    author: "Leila Kadiri",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "Desert Fortresses: Exploring Ancient Kasbahs",
    excerpt:
      "Journey through time as we explore the mud-brick kasbahs that have stood as sentinels in Morocco's desert regions for centuries.",
    date: "February 18, 2023",
    author: "Omar Benchekroun",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "The Medina Experience: Navigating Morocco's Ancient City Centers",
    excerpt:
      "Tips and historical insights for exploring the walled medinas that form the historical heart of Morocco's imperial cities.",
    date: "January 05, 2023",
    author: "Yasmine Alami",
    image: "/placeholder.svg?height=400&width=600",
  },
]
