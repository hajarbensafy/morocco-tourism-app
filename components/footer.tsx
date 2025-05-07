import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Morocco<span className="text-amber-400">Heritage</span>
            </h3>
            <p className="text-amber-100 mb-4">
              Discover Morocco's rich history and cultural heritage with our expertly crafted tour programs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-amber-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-amber-300 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-amber-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-amber-300 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-amber-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/trips" className="text-amber-100 hover:text-white transition-colors">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-amber-100 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-amber-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-amber-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Tours */}
          <div>
            <h3 className="text-lg font-bold mb-4">Popular Tours</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/trips/1" className="text-amber-100 hover:text-white transition-colors">
                  Imperial Cities Heritage
                </Link>
              </li>
              <li>
                <Link href="/trips/2" className="text-amber-100 hover:text-white transition-colors">
                  Sahara Desert & Kasbahs
                </Link>
              </li>
              <li>
                <Link href="/trips/3" className="text-amber-100 hover:text-white transition-colors">
                  Coastal Heritage
                </Link>
              </li>
              <li>
                <Link href="/trips/4" className="text-amber-100 hover:text-white transition-colors">
                  Atlas Mountains
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-amber-400 flex-shrink-0 mt-1" />
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

        <div className="mt-12 pt-8 border-t border-amber-800 text-center text-amber-200 text-sm">
          <p>&copy; {new Date().getFullYear()} MoroccoHeritage. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
