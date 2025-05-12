"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // This is a mock login - in a real app you'd integrate with a backend
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Logging in with:", email, password)

      // Redirect to dashboard after successful login
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 relative h-60 md:h-auto">
          <Image src="/mek.jpg?height=800&width=600" alt="Historical Morocco" fill className="object-cover" />
          <div className="absolute inset-0 bg-amber-900/60 flex flex-col justify-center p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>
            <p className="mb-4">
              Log in to access your account and continue your journey through Morocco's rich history.
            </p>
            <p className="text-amber-200">
              Don't have an account yet?{" "}
              <Link href="/signup" className="text-white underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-amber-900 mb-2">Log In</h1>
            <p className="text-gray-600">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-sm text-amber-600 hover:text-amber-800">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
              {!isLoading && <ArrowRight size={16} className="ml-2" />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
