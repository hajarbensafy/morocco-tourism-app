"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Mic,
  Headphones,
  Navigation,
  Info,
  X,
  AlertTriangle,
  ChevronDown,
  Search,
  Menu,
  Volume2,
  VolumeX,
  Layers,
  List,
  Compass,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AudioGuidePage() {
  // State for location
  const [locationPermission, setLocationPermission] = useState<"prompt" | "granted" | "denied">("prompt")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  // State for POIs
  const [pointsOfInterest, setPointsOfInterest] = useState<PointOfInterest[]>([])
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest | null>(null)
  const [nearbyPois, setNearbyPois] = useState<PointOfInterest[]>([])
  const [isLoadingPois, setIsLoadingPois] = useState(false)

  // State for audio
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [audioTime, setAudioTime] = useState({ current: 0, total: 30 })

  // State for UI
  const [showLocationAlert, setShowLocationAlert] = useState(true)
  const [mapView, setMapView] = useState<"map" | "list">("map")
  const [searchQuery, setSearchQuery] = useState("")
  const [isVoiceListening, setIsVoiceListening] = useState(false)

  // Refs
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // Request location permission
  const requestLocationPermission = () => {
    setIsLoadingLocation(true)
    setLocationError(null)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success
          setLocationPermission("granted")
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setIsLoadingLocation(false)
          setShowLocationAlert(false)

          // Load POIs after getting location
          loadPointsOfInterest()
        },
        (error) => {
          // Error
          setLocationPermission("denied")
          setLocationError(
            error.code === 1
              ? "Location access was denied. Please enable location services to use this feature."
              : "Could not get your location. Please try again.",
          )
          setIsLoadingLocation(false)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      )
    } else {
      setLocationError("Geolocation is not supported by your browser")
      setIsLoadingLocation(false)
    }
  }

  // Load points of interest
  const loadPointsOfInterest = () => {
    setIsLoadingPois(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setPointsOfInterest(samplePOIs)
      setNearbyPois(samplePOIs.filter((poi) => poi.distance < 500))
      setIsLoadingPois(false)
    }, 1500)
  }

  // Find nearby POIs
  const findNearbyPois = () => {
    setIsLoadingPois(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Filter POIs by distance (in a real app, this would be a new API call)
      const nearby = samplePOIs.filter((poi) => poi.distance < 300)
      setNearbyPois(nearby)

      // Show notification
      const notification = document.getElementById("notification")
      if (notification) {
        notification.classList.remove("translate-y-full")
        setTimeout(() => {
          notification.classList.add("translate-y-full")
        }, 3000)
      }

      setIsLoadingPois(false)
    }, 1000)
  }

  // Handle audio playback
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            stopPlayback()
            return 0
          }
          const newProgress = prev + 0.5
          setAudioTime((current) => ({
            ...current,
            current: (newProgress / 100) * current.total,
          }))
          return newProgress
        })
      }, 150)
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
    setAudioTime((current) => ({
      ...current,
      current: 0,
    }))
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

  // Format time for audio player
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Filter POIs by search query
  const filteredPois = searchQuery
    ? pointsOfInterest.filter(
        (poi) =>
          poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          poi.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : pointsOfInterest

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Morocco Audio Guide</SheetTitle>
                  <SheetDescription>
                    Discover Morocco's rich cultural heritage through immersive audio guides
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    <Button variant="ghost" className="w-full justify-start">
                      <MapPin className="mr-2 h-4 w-4" /> Explore Map
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Headphones className="mr-2 h-4 w-4" /> My Audio Guides
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Info className="mr-2 h-4 w-4" /> About
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold text-amber-900">Morocco Audio Guide</h1>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-amber-600"
                    onClick={() => setMapView(mapView === "map" ? "list" : "map")}
                  >
                    {mapView === "map" ? <List className="h-5 w-5" /> : <Layers className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{mapView === "map" ? "Switch to List View" : "Switch to Map View"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-amber-600"
                    onClick={() => setIsVoiceListening(true)}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Voice Search</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-20">
        {/* Search Bar */}
        <div className="sticky top-16 z-20 bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for cultural sites..."
                className="pl-10 pr-4 py-2 w-full border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Location Permission Alert */}
        <AnimatePresence>
          {showLocationAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-4 py-3"
            >
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-amber-800">Location access required</h3>
                    <div className="mt-2 text-sm text-amber-700">
                      <p>
                        To show you nearby cultural sites and provide accurate directions, we need access to your
                        location.
                      </p>
                    </div>
                    <div className="mt-4">
                      <div className="flex space-x-3">
                        <Button
                          onClick={requestLocationPermission}
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                          disabled={isLoadingLocation}
                        >
                          {isLoadingLocation ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Getting location...
                            </>
                          ) : (
                            "Allow location access"
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          className="border-amber-200 text-amber-800 hover:bg-amber-50"
                          onClick={() => setShowLocationAlert(false)}
                        >
                          Not now
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto pl-3 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setShowLocationAlert(false)}
                    >
                      <X className="h-4 w-4 text-amber-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Location Error Message */}
        <AnimatePresence>
          {locationError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-4 py-3"
            >
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Location error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{locationError}</p>
                    </div>
                    <div className="mt-4">
                      <Button onClick={requestLocationPermission} className="bg-red-600 hover:bg-red-700 text-white">
                        Try again
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map View */}
        {mapView === "map" && (
          <div className="container mx-auto px-4 py-3">
            <div className="relative w-full h-[500px] bg-gray-200 rounded-lg overflow-hidden shadow-md">
              {/* Map background */}
              <div className="absolute inset-0" ref={mapRef}>
                <Image
                  src="/mek.jpg?height=600&width=1200"
                  alt="Map of Morocco"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Loading overlay */}
              <AnimatePresence>
                {isLoadingPois && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10"
                  >
                    <div className="text-center">
                      <svg
                        className="animate-spin h-10 w-10 text-amber-600 mx-auto mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <p className="text-amber-900 font-medium">Loading points of interest...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* User location marker */}
              <AnimatePresence>
                {userLocation && (
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

              {/* POI markers */}
              <AnimatePresence>
                {filteredPois.map((poi, index) => (
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

              {/* Nearby POIs notification */}
              <div
                id="notification"
                className="absolute bottom-20 left-1/2 transform -translate-x-1/2 translate-y-full transition-transform duration-300 ease-in-out z-20"
              >
                <div className="bg-white rounded-lg shadow-lg p-3 flex items-center">
                  <div className="bg-amber-100 rounded-full p-2 mr-3">
                    <MapPin className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{nearbyPois.length} cultural sites nearby</p>
                    <p className="text-sm text-gray-500">Within 300 meters of your location</p>
                  </div>
                </div>
              </div>

              {/* Map controls */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 z-10">
                <Button
                  className="bg-amber-600 hover:bg-amber-700 shadow-lg flex-1"
                  onClick={findNearbyPois}
                  disabled={!userLocation || isLoadingPois}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Nearby
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-white shadow-lg">
                      <Layers className="w-4 h-4 mr-2" />
                      Layers
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Badge className="bg-amber-600 mr-2">Historical</Badge>
                      <span>Historical Sites</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Badge className="bg-emerald-600 mr-2">Cultural</Badge>
                      <span>Cultural Attractions</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Badge className="bg-blue-600 mr-2">Religious</Badge>
                      <span>Religious Sites</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Badge className="bg-purple-600 mr-2">Market</Badge>
                      <span>Traditional Markets</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Compass button */}
              <div className="absolute top-4 right-4 z-10">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white shadow-lg"
                        onClick={() => {
                          if (userLocation) {
                            // In a real app, this would center the map on the user's location
                            console.log("Centering map on user location")
                          }
                        }}
                        disabled={!userLocation}
                      >
                        <Compass className="h-5 w-5 text-amber-600" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Center on my location</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {mapView === "list" && (
          <div className="container mx-auto px-4 py-3">
            <div className="space-y-4">
              {isLoadingPois ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                    <div className="flex items-start">
                      <div className="w-16 h-16 bg-gray-200 rounded-md mr-4"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : filteredPois.length > 0 ? (
                // POI list
                filteredPois.map((poi) => (
                  <div
                    key={poi.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedPoi(poi)}
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-32 h-32 sm:h-auto">
                        <Image
                          src="/mek.jpg?height=200&width=200"
                          alt={poi.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <Badge className={getCategoryColor(poi.category)}>{poi.category}</Badge>
                            <h3 className="text-lg font-semibold text-gray-900 mt-1">{poi.name}</h3>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            {poi.distance}m
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{poi.description}</p>
                        <div className="mt-3 flex items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-amber-600 border-amber-200 hover:bg-amber-50"
                          >
                            <Headphones className="h-4 w-4 mr-1" />
                            Audio Guide
                          </Button>
                          <div className="ml-auto flex items-center text-sm text-gray-500">
                            <Headphones className="h-4 w-4 mr-1" />
                            10 min
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // No results
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try adjusting your search or explore different categories</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* POI Detail Sheet */}
      <AnimatePresence>
        {selectedPoi && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 flex items-end sm:items-center justify-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedPoi(null)
                setIsPlaying(false)
              }
            }}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-t-xl sm:rounded-xl w-full sm:w-[600px] max-h-[90vh] overflow-auto"
            >
              <div className="relative h-56 w-full">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt={selectedPoi.name}
                  fill
                  className="object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
                  onClick={() => {
                    setSelectedPoi(null)
                    setIsPlaying(false)
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <Badge className={getCategoryColor(selectedPoi.category)}>{selectedPoi.category}</Badge>
                  <h2 className="text-2xl font-bold text-white mt-1">{selectedPoi.name}</h2>
                  <div className="flex items-center text-white/80 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedPoi.distance}m away • {Math.ceil(selectedPoi.distance / 80)} min walk
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="prose prose-sm max-w-none text-gray-700 mb-6">
                  <p className="text-base">{selectedPoi.description}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia,
                    nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies
                    lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                  </p>
                </div>

                {/* Audio Player */}
                <div className="bg-amber-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-amber-900">Audio Guide</h3>
                    <div className="text-sm text-amber-700">
                      {formatTime(audioTime.current)} / {formatTime(audioTime.total)}
                    </div>
                  </div>

                  <Slider
                    value={[progress]}
                    max={100}
                    step={0.1}
                    className="mb-4"
                    onValueChange={(value) => {
                      setProgress(value[0])
                      setAudioTime((current) => ({
                        ...current,
                        current: (value[0] / 100) * current.total,
                      }))
                    }}
                  />

                  <div className="flex items-center justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full border-amber-300 mr-2"
                      onClick={() => {
                        // Rewind 10 seconds
                        const newProgress = Math.max(0, progress - (10 / audioTime.total) * 100)
                        setProgress(newProgress)
                        setAudioTime((current) => ({
                          ...current,
                          current: (newProgress / 100) * current.total,
                        }))
                      }}
                    >
                      <ChevronDown className="h-5 w-5 text-amber-700 rotate-90" />
                    </Button>

                    <Button
                      className={`h-14 w-14 rounded-full ${isPlaying ? "bg-amber-700 hover:bg-amber-800" : "bg-amber-600 hover:bg-amber-700"}`}
                      onClick={togglePlayback}
                    >
                      {isPlaying ? (
                        <VolumeX className="h-6 w-6 text-white" />
                      ) : (
                        <Volume2 className="h-6 w-6 text-white" />
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full border-amber-300 ml-2"
                      onClick={() => {
                        // Forward 10 seconds
                        const newProgress = Math.min(100, progress + (10 / audioTime.total) * 100)
                        setProgress(newProgress)
                        setAudioTime((current) => ({
                          ...current,
                          current: (newProgress / 100) * current.total,
                        }))
                      }}
                    >
                      <ChevronDown className="h-5 w-5 text-amber-700 -rotate-90" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-amber-600 hover:bg-amber-700 flex-1">
                    <Navigation className="mr-2 h-4 w-4" />
                    Directions
                  </Button>
                  <Button variant="outline" className="border-amber-200 text-amber-800 hover:bg-amber-50 flex-1">
                    <Mic className="mr-2 h-4 w-4" />
                    Ask a Question
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Search Modal */}
      <AnimatePresence>
        {isVoiceListening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={() => setIsVoiceListening(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Mic className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Listening...</h3>
                <p className="text-gray-600 mb-6">Speak now to search for cultural sites or categories</p>
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-8 bg-red-400 rounded-full"
                      animate={{
                        height: [20, 40, 20],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                      }}
                    ></motion.div>
                  ))}
                </div>
                <Button className="bg-red-500 hover:bg-red-600" onClick={() => setIsVoiceListening(false)}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
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
    name: "Majorelle Garden",
    category: "Cultural",
    description:
      "A botanical garden created by French painter Jacques Majorelle and later owned by Yves Saint Laurent. Features vibrant blue buildings and an impressive collection of cacti and exotic plants.",
    distance: 580,
    position: { x: 25, y: 70 },
  },
  {
    id: 5,
    name: "Souk Semmarine",
    category: "Market",
    description:
      "One of the largest traditional markets in Morocco, offering everything from spices and textiles to jewelry and ceramics. A labyrinth of narrow alleys filled with the scents and sounds of Morocco.",
    distance: 380,
    position: { x: 65, y: 20 },
  },
  {
    id: 6,
    name: "Saadian Tombs",
    category: "Historical",
    description:
      "A historic royal necropolis dating back to the time of the Saadian dynasty in the late 16th century. The tombs were rediscovered in 1917 and are known for their beautiful decoration and architecture.",
    distance: 620,
    position: { x: 40, y: 25 },
  },
  {
    id: 7,
    name: "Ben Youssef Madrasa",
    category: "Religious",
    description:
      "An Islamic college founded in the 14th century and rebuilt in the 16th century. It's one of the largest madrasas in North Africa and is renowned for its stunning Islamic architecture and decoration.",
    distance: 280,
    position: { x: 45, y: 50 },
  },
]
