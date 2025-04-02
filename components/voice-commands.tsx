"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Loader2 } from "lucide-react"

interface VoiceCommandsProps {
  onSearch: (query: string) => void
}

export default function VoiceCommands({ onSearch }: VoiceCommandsProps) {
  const [isListening, setIsListening] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setSupported(false)
    }
  }, [])

  const toggleListening = () => {
    if (!supported) return

    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const startListening = () => {
    setIsListening(true)

    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false)
      setProcessing(true)

      // Simulate processing delay
      setTimeout(() => {
        setProcessing(false)

        // Sample queries to simulate voice recognition
        const sampleQueries = [
          "database management systems notes",
          "advanced algorithms study material",
          "marketing management lecture notes",
          "biotechnology research papers",
          "machine learning tutorials",
        ]

        const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)]
        onSearch(randomQuery)
      }, 1500)
    }, 2000)
  }

  const stopListening = () => {
    setIsListening(false)
  }

  if (!supported) {
    return null
  }

  return (
    <Button
      size="icon"
      className={`h-10 w-10 rounded-full transition-all duration-300 ${
        isListening
          ? "bg-red-600 hover:bg-red-700 animate-pulse"
          : processing
            ? "bg-amber-600 hover:bg-amber-700"
            : "bg-gray-700 hover:bg-gray-600"
      }`}
      onClick={toggleListening}
      disabled={processing}
    >
      {isListening ? (
        <MicOff className="h-5 w-5" />
      ) : processing ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </Button>
  )
}

