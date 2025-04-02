"use client"

import { motion } from "framer-motion"
import { BookOpen, Star, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Note {
  id: number
  title: string
  university: string
  downloads: number
  author: string
  rating: number
  image: string
  tags: string[]
  preview: string
}

interface NotesPreviewProps {
  note: Note
}

export default function NotesPreview({ note }: NotesPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute top-0 left-full ml-4 w-72 bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg z-50 p-4"
      style={{ maxWidth: "calc(100vw - 100px)" }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gray-700/50 flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-purple-400" />
        </div>
        <div>
          <h3 className="font-medium text-white">{note.title}</h3>
          <p className="text-xs text-gray-400">{note.university}</p>
        </div>
      </div>

      <div className="mb-3 text-sm text-gray-300 line-clamp-4">{note.preview}</div>

      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
        <div className="flex items-center">
          <Star className="h-3 w-3 text-yellow-400 mr-1" />
          <span>{note.rating}/5.0</span>
        </div>
        <div className="flex items-center">
          <Download className="h-3 w-3 text-blue-400 mr-1" />
          <span>{note.downloads.toLocaleString()}</span>
        </div>
      </div>

      <Button
        size="sm"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      >
        Quick View
      </Button>
    </motion.div>
  )
}

