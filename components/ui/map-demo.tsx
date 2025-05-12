"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation, Info, Headphones, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export function MapDemo() {
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  // Simulate progress update when audio is playing
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && selectedPoi) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 300)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, selectedPoi])

  return (
    <div className="relative w-full h-[500px] bg-gray-200 rounded-lg overflow-hidden">
      {/* Map placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-gray-400">Interactive Map</span>
      </div>

      {/* POI markers */}
      {pointsOfInterest.map((poi) => (
        <button
          key={poi.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          style={{ top: `${poi.position.y}%`, left: `${poi.position.x}%` }}
          onClick={() => setSelectedPoi(poi)}
          aria-label={`Point of Interest: ${poi.name}`}
        >
          <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {poi.name}
          </div>
        </button>
      ))}

      {/* User location */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white">
          <Navigation className="w-5 h-5 text-white" />
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded text-xs font-medium">
          You are here
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
        <Button className="bg-amber-600 hover:bg-amber-700" aria-label="Center Map">
          <Navigation className="w-4 h-4 mr-2" />
          Center Map
        </Button>
        <Button variant="outline" className="bg-white" aria-label="Show Nearby Points of Interest">
          <Info className="w-4 h-4 mr-2" />
          Nearby
        </Button>
      </div>

      {/* POI Info Card */}
      {selectedPoi && (
        <div className="absolute top-4 right-4 w-full max-w-xs">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-amber-900">{selectedPoi.name}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setSelectedPoi(null)}
                  aria-label="Close Point of Interest Info"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{selectedPoi.type}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600 mb-2">{selectedPoi.description}</p>
              {isPlaying && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Playing audio guide...</span>
                    <span>{Math.floor(progress / 10)}:00 / 10:00</span>
                  </div>
                  <Slider
                    value={[progress]}
                    max={100}
                    className="[&>span:first-child]:h-1.5 [&>span:first-child]:bg-amber-200 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-2 [&_[role=slider]]:border-amber-600 [&>span:first-child_span]:bg-amber-600"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${isPlaying ? "bg-amber-700 hover:bg-amber-800" : "bg-amber-600 hover:bg-amber-700"}`}
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause Audio Guide" : "Start Audio Guide"}
              >
                <Headphones className="w-4 h-4 mr-2" />
                {isPlaying ? "Pause Audio Guide" : "Start Audio Guide"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

interface PointOfInterest {
  id: number
  name: string
  type: string
  description: string
  position: {
    x: number
    y: number
  }
}

const pointsOfInterest: PointOfInterest[] = [
  {
    id: 1,
    name: "Bahia Palace",
    type: "Historical Monument",
    description:
      "A stunning example of Moroccan architecture from the late 19th century, featuring intricate tilework and carved cedar.",
    position: { x: 30, y: 40 },
  },
  {
    id: 2,
    name: "Jemaa el-Fnaa",
    type: "Cultural Square",
    description:
      "The bustling heart of Marrakech, this square transforms throughout the day with storytellers, musicians, and food vendors.",
    position: { x: 70, y: 35 },
  },
  {
    id: 3,
    name: "Koutoubia Mosque",
    type: "Religious Site",
    description:
      "The largest mosque in Marrakech, known for its impressive minaret that has inspired similar designs around the world.",
    position: { x: 55, y: 65 },
  },
]
