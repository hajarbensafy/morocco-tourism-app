"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function VoiceDemo() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [progress, setProgress] = useState(0)
  const [processingState, setProcessingState] = useState<"idle" | "listening" | "processing" | "responding">("idle")

  // Simulate voice recognition
  useEffect(() => {
    if (isListening) {
      setProcessingState("listening")
      const timer = setTimeout(() => {
        setTranscript("Tell me about the history of Fes Medina")
        setIsListening(false)
        setProcessingState("processing")

        // Simulate processing
        setTimeout(() => {
          setProcessingState("responding")
          setResponse(
            "The Fes Medina, also known as Fes el-Bali, was founded in the 9th century and is home to the world's oldest university, Al-Qarawiyyin. It's a UNESCO World Heritage site and contains over 9,000 narrow streets and alleys filled with traditional workshops, mosques, and markets. The medina is famous for its leather tanneries, which still use medieval techniques to produce Morocco's renowned leather goods.",
          )
          setIsSpeaking(true)
        }, 1500)
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
            setProcessingState("idle")
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
    <div className="w-full max-w-md">
      <Card className="overflow-hidden shadow-lg border-amber-200">
        <CardContent className="p-6 space-y-6">
          <div className="flex justify-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${
                processingState === "listening"
                  ? "bg-red-500 hover:bg-red-600"
                  : processingState === "processing"
                    ? "bg-amber-500"
                    : "bg-amber-600 hover:bg-amber-700"
              }`}
              onClick={handleMicToggle}
              disabled={processingState === "processing" || processingState === "responding"}
            >
              {processingState === "listening" ? (
                <MicOff className="h-10 w-10 text-white" />
              ) : processingState === "processing" ? (
                <Loader2 className="h-10 w-10 text-white animate-spin" />
              ) : (
                <Mic className="h-10 w-10 text-white" />
              )}
            </motion.button>
          </div>

          <div className="text-center">
            {processingState === "idle" && <p className="text-amber-800">Tap the microphone and ask a question</p>}
            {processingState === "listening" && (
              <div className="space-y-2">
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
              </div>
            )}
            {processingState === "processing" && (
              <p className="text-amber-800 font-medium">Processing your question...</p>
            )}
          </div>

          <AnimatePresence>
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-amber-50 p-4 rounded-lg border border-amber-200"
              >
                <p className="text-sm text-amber-800 font-medium mb-1">You asked:</p>
                <p className="text-gray-700">{transcript}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div className="bg-white border border-amber-200 p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-amber-800 font-medium mb-2">Response:</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{response}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleSpeakToggle}
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 border-amber-200"
                  >
                    {isSpeaking ? (
                      <Pause className="h-5 w-5 text-amber-600" />
                    ) : (
                      <Play className="h-5 w-5 text-amber-600" />
                    )}
                  </Button>

                  <div className="flex-1 space-y-1">
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{Math.floor((progress / 100) * 45)}s</span>
                      <span>45s</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 border-amber-200"
                    onClick={() => setIsSpeaking(false)}
                  >
                    {isSpeaking ? (
                      <Volume2 className="h-5 w-5 text-amber-600" />
                    ) : (
                      <VolumeX className="h-5 w-5 text-gray-400" />
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
