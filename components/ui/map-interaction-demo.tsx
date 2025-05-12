"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Navigation, Headphones, X, Loader2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function MapInteractionDemo() {
  const [isLoading, setIsLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [pointsOfInterest, setPointsOfInterest] = useState<PointOfInterest[]>([])
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showLocationPrompt, setShowLocationPrompt] = useState(true)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // Simulate loading the map and getting user location
  useEffect(() => {
    if (showLocationPrompt) return

    setIsLoading(true)
    setUserLocation(null)
    setPointsOfInterest([])

    // Simulate getting user location
    const locationTimeout = setTimeout(() => {
      setUserLocation({
        lat: 31.6295, // Example coordinates for Marrakech
        lng: -7.9811,
      })

      // Simulate loading POIs after getting location
      const poisTimeout = setTimeout(() => {
        setPointsOfInterest(samplePOIs)
        setIsLoading(false)
      }, 1500)

      return () => clearTimeout(poisTimeout)
    }, 2000)

    return () => clearTimeout(locationTimeout)
  }, [showLocationPrompt])

  // Handle audio playback simulation
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            stopPlayback()
            return 0
          }
          return prev + 1
        })
      }, 100)
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
        progressInterval.current = null
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [isPlaying])

  // Start audio playback
  const startPlayback = () => {
    setIsPlaying(true)
    setProgress(0)
  }

  // Stop audio playback
  const stopPlayback = () => {
    setIsPlaying(false)
  }

  // Toggle audio playback
  const togglePlayback = () => {
    if (isPlaying) {
      stopPlayback()
    } else {
      startPlayback()
    }
  }

  // Allow location access
  const allowLocationAccess = () => {
    setShowLocationPrompt(false)
  }

  // Reset the demo
  const resetDemo = () => {
    setShowLocationPrompt(true)
    setIsLoading(true)
    setUserLocation(null)
    setPointsOfInterest([])
    setSelectedPoi(null)
    setIsPlaying(false)
    setProgress(0)
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
      progressInterval.current = null
    }
  }

  return (
    <div className="relative w-full h-[600px] bg-gray-100 rounded-xl overflow-hidden shadow-inner">
      {/* Map background */}
      <div className="absolute inset-0" ref={mapRef}>
        <Image src="/placeholder.svg?height=600&width=1200" alt="Map of Morocco" fill className="object-cover" />
      </div>

      {/* Location Permission Prompt */}
      <AnimatePresence>
        {showLocationPrompt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-20"
          >
            <Card className="w-full max-w-md mx-4 shadow-xl border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">Location Access Required</CardTitle>
                <CardDescription>
                  To show you nearby points of interest, we need access to your device's location.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-amber-600" /> How it works
                    </h4>
                    <p className="text-gray-700 text-sm">
                      1. We request your GPS coordinates
                      <br />
                      2. Your location is used to center the map
                      <br />
                      3. We load points of interest within 1km of your position
                      <br />
                      4. Your location data is stored only in your device's memory
                    </p>
                  </div>

                  <div className="bg-gray-800 text-green-400 p-3 rounded-md text-xs font-mono overflow-x-auto">
                    <pre>
                      {`// Request user's location
navigator.geolocation.getCurrentPosition(
  (position) => {
    // Success: store coordinates in state
    setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
    
    // Load nearby points of interest
    loadNearbyPOIs(position.coords);
  },
  (error) => {
    // Handle errors
    console.error("Error getting location:", error);
    setLocationError(error.message);
  },
  { 
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
);`}
                    </pre>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button onClick={allowLocationAccess} className="w-full bg-amber-600 hover:bg-amber-700">
                  Allow Location Access
                </Button>
                <Button
                  onClick={resetDemo}
                  variant="outline"
                  className="w-full border-amber-200 text-amber-800 hover:bg-amber-50"
                >
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && !showLocationPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10"
          >
            <Loader2 className="h-12 w-12 text-amber-600 animate-spin mb-4" />
            <p className="text-amber-900 font-medium text-lg">
              {!userLocation ? "Getting your location..." : "Loading nearby points of interest..."}
            </p>
            <div className="mt-4 w-64">
              <Progress value={userLocation ? 75 : 30} className="h-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Location Marker */}
      <AnimatePresence>
        {userLocation && !isLoading && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg pulse-animation">
              <Navigation className="w-5 h-5 text-white" />
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded text-xs font-medium shadow-md">
              You are here
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* POI Markers */}
      <AnimatePresence>
        {!isLoading &&
          pointsOfInterest.map((poi, index) => (
            <motion.button
              key={poi.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
              style={{ top: `${poi.position.y}%`, left: `${poi.position.x}%` }}
              onClick={() => setSelectedPoi(poi)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${getCategoryColor(poi.category)}`}
              >
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                {poi.name} • {poi.distance}m
              </div>
            </motion.button>
          ))}
      </AnimatePresence>

      {/* Map Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-2 z-10">
        <Button className="bg-amber-600 hover:bg-amber-700 shadow-lg" disabled={isLoading || showLocationPrompt}>
          <Navigation className="w-4 h-4 mr-2" />
          Center Map
        </Button>
        <Button
          variant="outline"
          className="bg-white/90 backdrop-blur-sm shadow-lg"
          disabled={isLoading || showLocationPrompt}
        >
          <Info className="w-4 h-4 mr-2" />
          Nearby
        </Button>
      </div>

      {/* POI Info Card */}
      <AnimatePresence>
        {selectedPoi && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-4 right-4 w-full max-w-sm z-20"
          >
            <Card className="overflow-hidden shadow-xl border-amber-200">
              <CardHeader className="pb-2 bg-gradient-to-r from-amber-50 to-amber-100">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className={getCategoryColor(selectedPoi.category)}>{selectedPoi.category}</Badge>
                    <CardTitle className="text-amber-900 mt-2">{selectedPoi.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" /> {selectedPoi.distance}m away •{" "}
                      {Math.ceil(selectedPoi.distance / 80)} min walk
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setSelectedPoi(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-2 pt-4">
                <div className="relative h-40 w-full mb-4 rounded-md overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt={selectedPoi.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">{selectedPoi.description}</p>

                {isPlaying && (
                  <div className="space-y-2 bg-amber-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="font-medium text-amber-800">Playing audio guide...</span>
                      <span>{Math.floor((progress / 100) * 30)}s / 30s</span>
                    </div>
                    <Slider
                      value={[progress]}
                      max={100}
                      className="[&>span:first-child]:h-1.5 [&>span:first-child]:bg-amber-200 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-2 [&_[role=slider]]:border-amber-600 [&>span:first-child_span]:bg-amber-600"
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button
                  className={`w-full ${isPlaying ? "bg-amber-700 hover:bg-amber-800" : "bg-amber-600 hover:bg-amber-700"}`}
                  onClick={togglePlayback}
                >
                  <Headphones className="w-4 h-4 mr-2" />
                  {isPlaying ? "Pause Audio Guide" : "Start Audio Guide"}
                </Button>

                <div className="w-full pt-2">
                  <div className="text-xs text-amber-800 mb-1">Code implementation:</div>
                  <div className="bg-gray-800 text-green-400 p-2 rounded-md text-xs font-mono overflow-x-auto text-left">
                    <pre>
                      {`// When marker is clicked
const handleMarkerClick = (poi) => {
  setSelectedPoi(poi);
  
  // Center map on the POI
  map.panTo({
    lat: poi.coordinates.lat,
    lng: poi.coordinates.lng
  });
  
  // Load audio file for this POI
  loadAudioGuide(poi.id);
  
  // Track analytics
  trackPoiSelection(poi.id);
};

// Start audio playback
const startAudioGuide = (poiId) => {
  const audioElement = document.getElementById('audio-guide');
  audioElement.src = \`/audio-guides/\${poiId}.mp3\`;
  audioElement.play();
  setIsPlaying(true);
}
`}
                    </pre>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Button */}
      {!showLocationPrompt && (
        <div className="absolute top-4 left-4 z-10">
          <Button variant="outline" className="bg-white/90 backdrop-blur-sm shadow-lg" onClick={resetDemo}>
            Reset Demo
          </Button>
        </div>
      )}

      <style jsx global>{`
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
      `}</style>
    </div>
  )
}

function getCategoryColor(category: string): string {
  switch (category) {
    case "Historical":
      return "bg-amber-600"
    case "Cultural":
      return "bg-emerald-600"
    case "Religious":
      return "bg-blue-600"
    case "Market":
      return "bg-purple-600"
    default:
      return "bg-amber-600"
  }
}

interface PointOfInterest {
  id: number
  name: string
  category: string
  description: string
  distance: number
  position: {
    x: number
    y: number
  }
}

const samplePOIs: PointOfInterest[] = [
  {
    id: 1,
    name: "Bahia Palace",
    category: "Historical",
    description:
      "A stunning example of Moroccan architecture from the late 19th century, featuring intricate tilework and carved cedar. The palace was built for Ahmed ibn Moussa, a grand vizier of Sultan Hassan I.",
    distance: 250,
    position: { x: 30, y: 40 },
  },
  {
    id: 2,
    name: "Jemaa el-Fnaa",
    category: "Cultural",
    description:
      "The bustling heart of Marrakech, this square transforms throughout the day with storytellers, musicians, and food vendors. It's been the cultural center of Marrakech for centuries.",
    distance: 450,
    position: { x: 70, y: 35 },
  },
  {
    id: 3,
    name: "Koutoubia Mosque",
    category: "Religious",
    description:
      "The largest mosque in Marrakech, known for its impressive minaret that has inspired similar designs around the world. Built in the 12th century, it's a masterpiece of Almohad architecture.",
    distance: 320,
    position: { x: 55, y: 65 },
  },
  {
    id: 4,
    name: "Souk Semmarine",
    category: "Market",
    description:
      "One of the largest traditional markets in Morocco, offering everything from spices and textiles to jewelry and ceramics. A labyrinth of narrow alleys filled with the scents and sounds of Morocco.",
    distance: 380,
    position: { x: 65, y: 20 },
  },
]
