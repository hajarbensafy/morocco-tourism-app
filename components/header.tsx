"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-amber-800 font-bold text-xl">
              Morocco<span className="text-amber-600">Heritage</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors">
              Home
            </Link>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-gray-700 hover:text-amber-600 transition-colors focus:outline-none"
              >
                Tours <ChevronDown size={16} className="ml-1" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <Link
                    href="/trips"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    All Tours
                  </Link>
                  <Link
                    href="/trips?region=imperial"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Imperial Cities
                  </Link>
                  <Link
                    href="/trips?region=desert"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Desert Tours
                  </Link>
                </div>
              )}
            </div>
            <Link href="/blog" className="text-gray-700 hover:text-amber-600 transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-amber-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-amber-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-amber-600 hover:text-amber-800 transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md">
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white py-4 border-t">
          <div className="container mx-auto px-4 space-y-3">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-amber-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/trips"
              className="block py-2 text-gray-700 hover:text-amber-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Tours
            </Link>
            <Link
              href="/blog"
              className="block py-2 text-gray-700 hover:text-amber-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-700 hover:text-amber-600"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-gray-700 hover:text-amber-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-3 border-t border-gray-200 flex space-x-4">
              <Link href="/login" className="text-amber-600 hover:text-amber-800" onClick={() => setIsMenuOpen(false)}>
                Log in
              </Link>
              <Link
                href="/signup"
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
