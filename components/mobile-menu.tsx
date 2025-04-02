"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Compass, BookOpen, Users, Upload, Search, ScanLine, Calendar, Bot } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { Input } from "./ui/input"
import { useState } from "react"

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[85%] max-w-[300px] p-0 bg-[#121212] text-white border-r border-purple-900"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-900">
            <Link href="/" className="flex items-center gap-2 text-purple-400 font-bold text-xl">
              <BookOpen className="h-6 w-6" />
              <span>NoteNexus.ai</span>
            </Link>
            <Button variant="secondary" size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              Sign Up
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-auto py-2">
            <ul className="space-y-1 px-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-purple-900/30"
                  onClick={() => setIsOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-purple-900/30"
                  onClick={() => setIsOpen(false)}
                >
                  <Compass className="h-5 w-5" />
                  <span>Explore</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-tools"
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-purple-900/30"
                  onClick={() => setIsOpen(false)}
                >
                  <Bot className="h-5 w-5" />
                  <span>AI Tools</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-purple-900/30"
                  onClick={() => setIsOpen(false)}
                >
                  <Users className="h-5 w-5" />
                  <span>Community</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/upload"
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-purple-900/30"
                  onClick={() => setIsOpen(false)}
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload Notes</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Search */}
          <div className="p-4 border-t border-purple-900">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for notes, subjects, uni..."
                className="pl-9 pr-9 py-2 bg-gray-800 border-gray-700 text-white rounded-full"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 bg-purple-600 rounded-full p-1"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 space-y-3 border-t border-purple-900">
            <Button variant="outline" className="w-full border-purple-600 text-white" onClick={() => setIsOpen(false)}>
              Sign In
            </Button>

            <Button
              variant="default"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Search className="h-4 w-4" />
              Find Notes Now
            </Button>

            <Button
              variant="outline"
              className="w-full border-purple-600 text-white flex items-center justify-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <ScanLine className="h-4 w-4" />
              Scan Handwritten Notes
            </Button>

            <Button
              variant="outline"
              className="w-full border-purple-600 text-white flex items-center justify-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Calendar className="h-4 w-4" />
              AI Study Planner
            </Button>

            <Button
              variant="outline"
              className="w-full border-purple-600 text-white flex items-center justify-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Upload className="h-4 w-4" />
              Upload Notes
            </Button>
          </div>

          {/* AI Assistant */}
          <div className="p-4 border-t border-purple-900">
            <Button
              variant="ghost"
              className="w-full text-purple-400 flex items-center justify-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Bot className="h-5 w-5" />
              NoteNexus AI Assistant
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu

