"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  MapPin,
  Headphones,
  Mic,
  Check,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Navigation,
  MicOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function UserJourneyDemo() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loadedPOIs, setLoadedPOIs] = useState(false)
  const [selectedPOI, setSelectedPOI] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [voiceResponse, setVoiceResponse] = useState("")

  // Handle step transitions with loading states
  const goToNextStep = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setStep((prev) => prev + 1)

      // Initialize step-specific states
      if (step === 0) {
        // After login
      } else if (step === 1) {
        // After geolocation
        setUserLocation({ lat: 31.6295, lng: -7.9811 })
      } else if (step === 2) {
        // After loading POIs
        setLoadedPOIs(true)
      } else if (step === 3) {
        // After selecting POI
        setSelectedPOI(1)
      } else if (step === 4) {
        // After starting audio
        setIsPlaying(true)
      }
    }, 1500)
  }

  const goToPrevStep = () => {
    setStep((prev) => Math.max(0, prev - 1))

    // Reset states when going back
    if (step === 5) {
      setIsListening(false)
      setTranscript("")
      setVoiceResponse("")
    } else if (step === 4) {
      setIsPlaying(false)
    } else if (step === 3) {
      setSelectedPOI(null)
    }
  }

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && step === 4) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 100
          }
          return prev + 1
        })
      }, 100)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, step])

  // Simulate voice interaction
  const startVoiceInteraction = () => {
    setIsListening(true)
    setTranscript("")
    setVoiceResponse("")

    // Simulate speech recognition
    setTimeout(() => {
      setTranscript("When was this palace built?")
      setIsListening(false)

      // Simulate processing and response
      setTimeout(() => {
        setVoiceResponse(
          "The Bahia Palace was built in the late 19th century, between 1866 and 1867, by Si Moussa, grand vizier of Sultan Hassan I. It was later expanded by his son Bou Ahmed between 1894 and 1900.",
        )
      }, 1500)
    }, 2000)
  }

  // Reset the demo
  const resetDemo = () => {
    setStep(0)
    setLoading(false)
    setEmail("")
    setPassword("")
    setUserLocation(null)
    setLoadedPOIs(false)
    setSelectedPOI(null)
    setIsPlaying(false)
    setProgress(0)
    setIsListening(false)
    setTranscript("")
    setVoiceResponse("")
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-amber-900">Complete User Journey</h3>
          <Button variant="outline" onClick={resetDemo} className="border-amber-200 text-amber-800">
            Reset Demo
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`flex flex-col items-center ${i <= step ? "text-amber-900" : "text-gray-400"}`}
                style={{ width: `${100 / steps.length}%` }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    i < step
                      ? "bg-amber-600 text-white"
                      : i === step
                        ? "bg-amber-100 border-2 border-amber-600 text-amber-900"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {i < step ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span className="text-xs text-center">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-gray-100 rounded-full">
            <div
              className="absolute h-full bg-amber-600 rounded-full transition-all duration-500"
              style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Phone Preview */}
          <div className="flex justify-center">
            <div className="relative w-[300px] h-[600px] bg-black rounded-[2rem] border-[8px] border-gray-800 shadow-lg overflow-hidden">
              <div className="absolute top-0 w-1/3 h-[30px] left-1/2 transform -translate-x-1/2 bg-black rounded-b-xl z-10"></div>

              {/* Phone Screen Content */}
              <div className="h-full w-full bg-white relative">
                <AnimatePresence mode="wait">
                  {/* Step 0: Login */}
                  {step === 0 && (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col"
                    >
                      <div className="bg-amber-900 text-white p-4 text-center">
                        <h3 className="text-lg font-semibold">Moroccan Guide</h3>
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-center">
                        <h4 className="text-xl font-bold text-amber-900 mb-6 text-center">Welcome Back</h4>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <Button
                            className="w-full bg-amber-600 hover:bg-amber-700"
                            onClick={goToNextStep}
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                              </>
                            ) : (
                              "Login"
                            )}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 1: Geolocation */}
                  {step === 1 && (
                    <motion.div
                      key="geolocation"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col"
                    >
                      <div className="bg-amber-900 text-white p-4 text-center">
                        <h3 className="text-lg font-semibold">Moroccan Guide</h3>
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-center items-center">
                        <div className="text-center space-y-6">
                          <MapPin className="h-16 w-16 text-amber-600 mx-auto" />
                          <h4 className="text-xl font-bold text-amber-900">Location Access</h4>
                          <p className="text-gray-600 mb-6">
                            To show you nearby points of interest, we need access to your device's location.
                          </p>
                          <Button className="bg-amber-600 hover:bg-amber-700" onClick={goToNextStep} disabled={loading}>
                            {loading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Getting location...
                              </>
                            ) : (
                              "Allow Location Access"
                            )}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Loading POIs */}
                  {step === 2 && (
                    <motion.div
                      key="loading-pois"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col"
                    >
                      <div className="bg-amber-900 text-white p-4 text-center">
                        <h3 className="text-lg font-semibold">Moroccan Guide</h3>
                      </div>
                      <div className="flex-1 flex flex-col justify-center items-center p-6">
                        <div className="text-center space-y-4">
                          <Loader2 className="h-16 w-16 text-amber-600 animate-spin mx-auto" />
                          <h4 className="text-xl font-bold text-amber-900">Loading Nearby Attractions</h4>
                          <p className="text-gray-600 mb-2">
                            Discovering cultural points of interest around your location...
                          </p>
                          <div className="w-full space-y-1">
                            <Progress value={loading ? 65 : 100} className="h-2" />
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Finding POIs</span>
                              <span>{loading ? "65%" : "100%"}</span>
                            </div>
                          </div>
                          <Button
                            className="bg-amber-600 hover:bg-amber-700 mt-4"
                            onClick={goToNextStep}
                            disabled={loading}
                          >
                            {loading ? "Loading..." : "Continue"}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Map View */}
                  {step === 3 && (
                    <motion.div
                      key="map-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col"
                    >
                      <div className="bg-amber-900 text-white p-4 text-center">
                        <h3 className="text-lg font-semibold">Explore Nearby</h3>
                      </div>
                      <div className="flex-1 relative">
                        <div className="absolute inset-0 bg-gray-200">
                          <Image
                            src="/placeholder.svg?height=600&width=300"
                            alt="Map view"
                            fill
                            className="object-cover"
                          />

                          {/* User location */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white pulse-animation">
                              <Navigation className="w-4 h-4 text-white" />
                            </div>
                          </div>

                          {/* POI markers */}
                          <div
                            className="absolute top-[40%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={() => {
                              setSelectedPOI(1)
                              goToNextStep()
                            }}
                          >
                            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center animate-pulse">
                              <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap shadow-md">
                              Bahia Palace • 250m
                            </div>
                          </div>

                          <div className="absolute top-[35%] left-[70%] transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-white" />
                            </div>
                          </div>

                          <div className="absolute top-[65%] left-[55%] transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-white" />
                            </div>
                          </div>

                          {/* Instructions */}
                          <div className="absolute bottom-20 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                            <p className="text-sm text-amber-900 font-medium">
                              Tap on the Bahia Palace marker to select it
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: POI Details */}
                  {step === 4 && (
                    <motion.div
                      key="poi-details"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col"
                    >
                      <div className="bg-amber-900 text-white p-4">
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white mr-2"
                            onClick={goToPrevStep}
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </Button>
                          <h3 className="text-lg font-semibold">Bahia Palace</h3>
                        </div>
                      </div>
                      <div className="flex-1 overflow-auto">
                        <div className="relative h-40 w-full">
                          <Image
                            src="/placeholder.svg?height=200&width=400"
                            alt="Bahia Palace"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className="bg-amber-600">Historical</Badge>
                            <span className="text-sm text-gray-500">250m away</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-4">
                            A stunning example of Moroccan architecture from the late 19th century, featuring intricate
                            tilework and carved cedar. The palace was built for Ahmed ibn Moussa, a grand vizier of
                            Sultan Hassan I.
                          </p>

                          {/* Audio Player */}
                          <div className="bg-amber-50 p-3 rounded-lg mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-amber-800">Audio Guide</span>
                              <span className="text-xs text-gray-500">{Math.floor((progress / 100) * 30)}s / 30s</span>
                            </div>
                            <div className="space-y-2">
                              <Progress value={progress} className="h-2" />
                              <div className="flex justify-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-10 w-10 border-amber-200"
                                  onClick={() => setIsPlaying(!isPlaying)}
                                >
                                  {isPlaying ? (
                                    <VolumeX className="h-5 w-5 text-amber-600" />
                                  ) : (
                                    <Volume2 className="h-5 w-5 text-amber-600" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>

                          <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={goToNextStep}>
                            <Mic className="mr-2 h-4 w-4" /> Ask a Question
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Voice Interaction */}
                  {step === 5 && (
                    <motion.div
                      key="voice-interaction"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col"
                    >
                      <div className="bg-amber-900 text-white p-4">
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white mr-2"
                            onClick={goToPrevStep}
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </Button>
                          <h3 className="text-lg font-semibold">Voice Assistant</h3>
                        </div>
                      </div>
                      <div className="flex-1 p-4 flex flex-col">
                        <div className="flex-1 flex flex-col justify-center items-center space-y-6">
                          {isListening ? (
                            <>
                              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
                                <MicOff className="h-10 w-10 text-white" />
                              </div>
                              <p className="text-red-500 font-medium">Listening...</p>
                              <div className="flex justify-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="w-1 h-5 bg-red-400 rounded-full"
                                    animate={{
                                      height: [5, 15, 5],
                                    }}
                                    transition={{
                                      duration: 1,
                                      repeat: Number.POSITIVE_INFINITY,
                                      delay: i * 0.1,
                                    }}
                                  ></motion.div>
                                ))}
                              </div>
                            </>
                          ) : transcript ? (
                            <>
                              <div className="w-full bg-amber-50 p-3 rounded-lg mb-2">
                                <p className="text-sm font-medium text-amber-800 mb-1">You asked:</p>
                                <p className="text-gray-700">{transcript}</p>
                              </div>

                              {voiceResponse && (
                                <div className="w-full bg-white border border-amber-200 p-3 rounded-lg">
                                  <p className="text-sm font-medium text-amber-800 mb-1">Response:</p>
                                  <p className="text-gray-700 text-sm">{voiceResponse}</p>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center">
                                <Mic className="h-10 w-10 text-white" />
                              </div>
                              <p className="text-amber-800 font-medium">Tap the button below to ask a question</p>
                              <p className="text-gray-500 text-sm text-center">
                                Try asking: "When was this palace built?" or
                                <br />
                                "What is special about this place?"
                              </p>
                            </>
                          )}
                        </div>

                        <Button
                          className={`w-full ${isListening ? "bg-red-500 hover:bg-red-600" : "bg-amber-600 hover:bg-amber-700"}`}
                          onClick={startVoiceInteraction}
                          disabled={!!transcript && !voiceResponse}
                        >
                          {isListening ? (
                            <>
                              <MicOff className="mr-2 h-4 w-4" /> Stop Listening
                            </>
                          ) : transcript ? (
                            <>
                              <Mic className="mr-2 h-4 w-4" /> Ask Another Question
                            </>
                          ) : (
                            <>
                              <Mic className="mr-2 h-4 w-4" /> Start Voice Recognition
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column - Step Description */}
          <div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h4 className="text-xl font-bold text-amber-900 mb-4">{steps[step].title}</h4>
              <p className="text-gray-700 mb-6">{steps[step].description}</p>

              <div className="space-y-4">
                {steps[step].details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-gray-700">{detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-amber-200">
                <h5 className="font-semibold text-amber-900 mb-2">Technical Implementation:</h5>
                <div className="bg-gray-800 text-green-400 p-3 rounded-md text-xs font-mono overflow-x-auto">
                  <pre>{steps[step].code}</pre>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                className="border-amber-200 text-amber-800"
                onClick={goToPrevStep}
                disabled={step === 0 || loading}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous Step
              </Button>

              <Button
                className="bg-amber-600 hover:bg-amber-700"
                onClick={goToNextStep}
                disabled={step === steps.length - 1 || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    Next Step <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

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

const steps = [
  {
    label: "Login",
    icon: User,
    title: "User Authentication",
    description:
      "The journey begins with secure user authentication, allowing personalized experiences and saved preferences.",
    details: [
      "Users can create an account or log in with existing credentials",
      "Authentication enables saving favorite locations and personalized recommendations",
      "User preferences and history are securely stored in the cloud",
    ],
    code: `// Handle login form submission
const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    // Authenticate user
    const user = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    
    // Store user in state
    setCurrentUser(user);
    
    // Navigate to map view
    router.push('/map');
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};`,
  },
  {
    label: "Location",
    icon: MapPin,
    title: "Geolocation Services",
    description:
      "The app requests permission to access your device's GPS to provide location-based cultural information.",
    details: [
      "The app requests permission to access the device's location services",
      "GPS coordinates are obtained with high accuracy for precise positioning",
      "Location data is stored only in the device's memory for privacy",
    ],
    code: `// Request user's location
const getUserLocation = () => {
  setIsLoading(true);
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // Success: store coordinates in state
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy
      });
      
      // Proceed to loading POIs
      loadNearbyPOIs(position.coords);
    },
    (error) => {
      // Handle errors
      setLocationError(error.message);
    },
    { 
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  );
};`,
  },
  {
    label: "Load POIs",
    icon: Loader2,
    title: "Loading Points of Interest",
    description:
      "Based on your location, the app loads cultural and historical points of interest within a 1km radius.",
    details: [
      "The app queries the database for points of interest near your location",
      "Results are filtered based on distance, relevance, and user preferences",
      "POI data includes location coordinates, descriptions, and audio guide references",
    ],
    code: `// Load nearby points of interest
const loadNearbyPOIs = async (coordinates) => {
  setIsLoading(true);
  
  try {
    // Query database for nearby POIs
    const response = await fetch(
      '/api/points-of-interest',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: coordinates.latitude,
          lng: coordinates.longitude,
          radius: 1000, // 1km radius
          limit: 20 // max 20 results
        })
      }
    );
    
    const data = await response.json();
    setPOIs(data.results);
  } catch (error) {
    console.error('Error loading POIs:', error);
  } finally {
    setIsLoading(false);
  }
};`,
  },
  {
    label: "Map View",
    icon: MapPin,
    title: "Interactive Map Display",
    description: "The map centers on your location and displays nearby points of interest with interactive markers.",
    details: [
      "The map is centered on your current GPS position",
      "Points of interest are displayed as interactive markers",
      "Different marker colors indicate different types of cultural sites",
      "Tapping a marker selects the point of interest for more information",
    ],
    code: `// Initialize map centered on user location
const initMap = () => {
  const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets/style.json',
    center: [userLocation.lng, userLocation.lat],
    zoom: 15
  });
  
  // Add user location marker
  new maplibregl.Marker({
    color: '#3B82F6',
    scale: 0.8
  })
    .setLngLat([userLocation.lng, userLocation.lat])
    .addTo(map);
  
  // Add POI markers
  pois.forEach(poi => {
    const marker = new maplibregl.Marker({
      color: getCategoryColor(poi.category),
      scale: 0.7
    })
      .setLngLat([poi.coordinates.lng, poi.coordinates.lat])
      .addTo(map);
      
    // Add click handler
    marker.getElement().addEventListener('click', () => {
      setSelectedPOI(poi);
    });
  });
};`,
  },
  {
    label: "Audio Guide",
    icon: Headphones,
    title: "Audio Guide Playback",
    description: "Select a point of interest to view details and listen to a professionally narrated audio guide.",
    details: [
      "Detailed information about the selected cultural site is displayed",
      "High-quality audio narration provides historical and cultural context",
      "Audio guides are available in multiple languages",
      "Playback controls allow pausing, resuming, and seeking through the audio",
    ],
    code: `// Load and play audio guide
const playAudioGuide = async (poiId) => {
  setIsLoading(true);
  
  try {
    // Get audio guide URL
    const response = await fetch(
      \`/api/audio-guides/\${poiId}\`
    );
    const data = await response.json();
    
    // Configure audio player
    const audioElement = document.getElementById('audio-player');
    audioElement.src = data.audioUrl;
    audioElement.lang = userPreferences.language || 'en';
    
    // Set up event listeners
    audioElement.onloadedmetadata = () => {
      setAudioDuration(audioElement.duration);
      setIsLoading(false);
    };
    
    audioElement.ontimeupdate = () => {
      setCurrentTime(audioElement.currentTime);
      setProgress(
        (audioElement.currentTime / audioElement.duration) * 100
      );
    };
    
    // Start playback
    audioElement.play();
    setIsPlaying(true);
  } catch (error) {
    console.error('Error loading audio guide:', error);
    setIsLoading(false);
  }
};`,
  },
  {
    label: "Voice",
    icon: Mic,
    title: "Voice Interaction",
    description: "Ask questions about the cultural site using natural language and receive audio responses.",
    details: [
      "Voice recognition converts your spoken questions to text",
      "Natural language processing interprets your questions",
      "The app provides detailed answers about the cultural site",
      "Text-to-speech technology delivers audio responses for a hands-free experience",
    ],
    code: `// Handle voice interaction
const startVoiceRecognition = () => {
  setIsListening(true);
  
  // Initialize speech recognition
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = userPreferences.language || 'en-US';
  
  // Start listening
  recognition.start();
  
  // Process results
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setTranscript(transcript);
    processVoiceQuery(transcript);
  };
  
  recognition.onerror = (event) => {
    console.error('Speech recognition error', event.error);
    setIsListening(false);
  };
  
  recognition.onend = () => {
    setIsListening(false);
  };
};

// Process and respond to voice query
const processVoiceQuery = async (query) => {
  setIsProcessing(true);
  
  try {
    // Send query to NLP service
    const response = await fetch('/api/voice-query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        poiId: selectedPOI.id,
        language: userPreferences.language || 'en'
      })
    });
    
    const data = await response.json();
    setResponse(data.response);
    
    // Convert response to speech
    speakResponse(data.response);
  } catch (error) {
    console.error('Error processing query:', error);
  } finally {
    setIsProcessing(false);
  }
};`,
  },
]
