"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, AlertTriangle, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function GeoLocationDemo() {
  const [permissionState, setPermissionState] = useState<"idle" | "requesting" | "granted" | "denied">("idle")
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Function to request location permission
  const requestLocationPermission = () => {
    setPermissionState("requesting")
    setLoading(true)
    setError(null)

    // Simulate the permission request process
    setTimeout(() => {
      // Simulate successful permission (in a real app, this would use the Geolocation API)
      setPermissionState("granted")

      // Simulate getting coordinates
      setTimeout(() => {
        setCoordinates({
          lat: 31.6295, // Example coordinates for Marrakech
          lng: -7.9811,
        })
        setAccuracy(15) // 15 meters accuracy
        setLoading(false)
      }, 1500)
    }, 2000)
  }

  // Function to simulate permission denial
  const simulateDeniedPermission = () => {
    setPermissionState("requesting")
    setLoading(true)
    setError(null)

    // Simulate the permission request process
    setTimeout(() => {
      setPermissionState("denied")
      setError("Location permission was denied. Please enable location services to use this feature.")
      setLoading(false)
    }, 2000)
  }

  // Reset the demo
  const resetDemo = () => {
    setPermissionState("idle")
    setCoordinates(null)
    setAccuracy(null)
    setLoading(false)
    setError(null)
  }

  return (
    <Card className="w-full max-w-md shadow-lg border-amber-200 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100">
        <CardTitle className="text-amber-900">GPS Location Services</CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Permission State Display */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Permission Status:</span>
            <span
              className={`text-sm font-semibold px-2 py-1 rounded-full ${
                permissionState === "granted"
                  ? "bg-green-100 text-green-800"
                  : permissionState === "denied"
                    ? "bg-red-100 text-red-800"
                    : permissionState === "requesting"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-gray-100 text-gray-800"
              }`}
            >
              {permissionState === "granted"
                ? "Granted"
                : permissionState === "denied"
                  ? "Denied"
                  : permissionState === "requesting"
                    ? "Requesting..."
                    : "Not Requested"}
            </span>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="text-center py-4">
              <Loader2 className="h-8 w-8 text-amber-600 animate-spin mx-auto mb-2" />
              <p className="text-amber-800">
                {permissionState === "requesting" ? "Requesting permission..." : "Getting your location..."}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Location Data Display */}
          <AnimatePresence>
            {coordinates && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-amber-800">Latitude:</span>
                    <span className="font-mono bg-white px-2 py-1 rounded text-sm">{coordinates.lat.toFixed(6)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-amber-800">Longitude:</span>
                    <span className="font-mono bg-white px-2 py-1 rounded text-sm">{coordinates.lng.toFixed(6)}</span>
                  </div>
                  {accuracy && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-amber-800">Accuracy:</span>
                        <span className="font-mono bg-white px-2 py-1 rounded text-sm">{accuracy} meters</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Low</span>
                          <span>High</span>
                        </div>
                        <Progress value={100 - Math.min(accuracy, 50) * 2} className="h-2" />
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <div className="text-sm font-medium text-amber-800 mb-2">Location stored in state:</div>
                    <div className="bg-gray-800 text-green-400 p-3 rounded-md text-xs font-mono overflow-x-auto">
                      <pre>
                        {`const [location, setLocation] = useState({
  lat: ${coordinates.lat.toFixed(6)},
  lng: ${coordinates.lng.toFixed(6)},
  accuracy: ${accuracy} // meters
});`}
                      </pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          {permissionState === "granted" && coordinates && !loading && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-700 text-sm font-medium">Location successfully obtained!</p>
                <p className="text-green-600 text-xs mt-1">
                  Your coordinates are stored and ready to use for finding nearby points of interest.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 p-6 pt-0">
        {permissionState === "idle" && (
          <>
            <Button onClick={requestLocationPermission} className="w-full bg-amber-600 hover:bg-amber-700">
              <MapPin className="mr-2 h-4 w-4" /> Request GPS Permission
            </Button>
            <Button
              onClick={simulateDeniedPermission}
              variant="outline"
              className="w-full border-amber-200 text-amber-800 hover:bg-amber-50"
            >
              Simulate Permission Denied
            </Button>
          </>
        )}

        {(permissionState === "granted" || permissionState === "denied") && (
          <Button
            onClick={resetDemo}
            variant="outline"
            className="w-full border-amber-200 text-amber-800 hover:bg-amber-50"
          >
            Reset Demo
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
