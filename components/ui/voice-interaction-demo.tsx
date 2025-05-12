"use client"

import { useState, useEffect } from "react"
import { Mic, MicOff, Volume2, VolumeX, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function VoiceInteractionDemo() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [progress, setProgress] = useState(0)

  // Simulate voice recognition
  useEffect(() => {
    if (isListening) {
      const timer = setTimeout(() => {
        setTranscript("Tell me about the history of Fes Medina")
        setIsListening(false)

        // Simulate response after processing
        setTimeout(() => {
          setResponse(
            "The Fes Medina, also known as Fes el-Bali, was founded in the 9th century and is home to the world's oldest university. It's a UNESCO World Heritage site and contains over 9,000 narrow streets and alleys filled with traditional workshops, mosques, and markets.",
          )
          setIsSpeaking(true)
        }, 1000)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isListening])

  // Simulate text-to-speech progress
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isSpeaking) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsSpeaking(false)
            return 0
          }
          return prev + 1
        })
      }, 100)
    } else {
      setProgress(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isSpeaking])

  const handleMicToggle = () => {
    if (!isListening) {
      setTranscript("")
      setResponse("")
      setIsSpeaking(false)
    }
    setIsListening(!isListening)
  }

  const handleSpeakToggle = () => {
    setIsSpeaking(!isSpeaking)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-center">
            <Button
              onClick={handleMicToggle}
              className={`w-16 h-16 rounded-full ${
                isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-amber-600 hover:bg-amber-700"
              }`}
            >
              {isListening ? <MicOff className="h-8 w-8 text-white" /> : <Mic className="h-8 w-8 text-white" />}
              <span className="sr-only">{isListening ? "Stop listening" : "Start listening"}</span>
            </Button>
          </div>

          {transcript && (
            <div className="bg-amber-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">You said:</p>
              <p className="text-amber-900">{transcript}</p>
            </div>
          )}

          {response && (
            <div className="space-y-2">
              <div className="bg-white border border-amber-200 p-3 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Response:</p>
                <p className="text-gray-700">{response}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={handleSpeakToggle} variant="outline" size="icon" className="h-8 w-8">
                  {isSpeaking ? (
                    <Pause className="h-4 w-4 text-amber-600" />
                  ) : (
                    <Play className="h-4 w-4 text-amber-600" />
                  )}
                  <span className="sr-only">{isSpeaking ? "Pause" : "Play"}</span>
                </Button>

                <Progress value={progress} className="h-2 flex-1" />

                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setIsSpeaking(false)}>
                  {isSpeaking ? (
                    <Volume2 className="h-4 w-4 text-amber-600" />
                  ) : (
                    <VolumeX className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="sr-only">Toggle sound</span>
                </Button>
              </div>
            </div>
          )}

          <div className="text-center text-sm text-gray-500">
            {isListening ? (
              <p>Listening... Speak now</p>
            ) : (
              <p>Tap the microphone and ask about Moroccan cultural sites</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
