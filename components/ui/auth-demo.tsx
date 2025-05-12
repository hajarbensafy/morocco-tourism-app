"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react"

export function AuthDemo() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-amber-100">
          <TabsTrigger value="login" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="p-6 bg-white rounded-b-lg shadow-md">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="email" type="email" placeholder="your@email.com" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
            <Button className="w-full bg-amber-600 hover:bg-amber-700">Login</Button>
            <div className="text-center text-sm text-gray-500">
              <a href="#" className="text-amber-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="signup" className="p-6 bg-white rounded-b-lg shadow-md">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="name" placeholder="John Doe" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="signup-email" type="email" placeholder="your@email.com" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
            <Button className="w-full bg-amber-600 hover:bg-amber-700">Create Account</Button>
            <div className="text-center text-sm text-gray-500">
              By signing up, you agree to our{" "}
              <a href="#" className="text-amber-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-amber-600 hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
