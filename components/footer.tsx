import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative text-black h-auto min-h-[200px]">
      <div className="absolute inset-0 z-0">
        <img
          src="/foot.jpg?height=800&width=1600"
          alt="Footer background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-3 min-h-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-2">
              Morocco<span className="text-amber-400">Heritage</span>
            </h3>
            <p className="text-amber-100 mb-2 text-sm">
              Discover Morocco's rich history and cultural heritage with our expertly crafted tour programs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-black hover:text-amber-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-black hover:text-amber-300 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-black hover:text-amber-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-black hover:text-amber-300 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/" className="text-amber-100 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/trips" className="text-amber-100 hover:text-white transition-colors">Tours</Link></li>
              <li><Link href="/blog" className="text-amber-100 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-amber-100 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-amber-100 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Tours */}
          <div>
            <h3 className="text-lg font-bold mb-2">Popular Tours</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/trips/1" className="text-amber-100 hover:text-white transition-colors">Imperial Cities Heritage</Link></li>
              <li><Link href="/trips/2" className="text-amber-100 hover:text-white transition-colors">Sahara Desert & Kasbahs</Link></li>
              <li><Link href="/trips/3" className="text-amber-100 hover:text-white transition-colors">Coastal Heritage</Link></li>
              <li><Link href="/trips/4" className="text-amber-100 hover:text-white transition-colors">Atlas Mountains</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-2">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-amber-400 mt-1" />
                <span className="text-amber-100">123 History Lane, Marrakech, Morocco</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-amber-400" />
                <span className="text-amber-100">+212 5XX-XXXXXX</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-amber-400" />
                <span className="text-amber-100">info@moroccoheritage.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-amber-800 text-center text-amber-200 text-xs">
          <p>&copy; {new Date().getFullYear()} MoroccoHeritage. All rights reserved.</p>
          <div className="mt-1 space-x-4">
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
