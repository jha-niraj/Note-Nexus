"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, Search, Brain, BookOpen, Upload, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function TouchFriendlyControls() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { toast } = useToast()

  // Show controls after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleAction = (action: string) => {
    toast({
      title: `${action} activated`,
      description: `You clicked on the ${action.toLowerCase()} button`,
    })
    setIsOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3 mb-3"
              >
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg mobile-friendly-touch"
                  onClick={() => handleAction("Search")}
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg mobile-friendly-touch"
                  onClick={() => handleAction("AI Assistant")}
                >
                  <Brain className="h-5 w-5" />
                  <span className="sr-only">AI Assistant</span>
                </Button>
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full bg-green-600 hover:bg-green-700 shadow-lg mobile-friendly-touch"
                  onClick={() => handleAction("Notes")}
                >
                  <BookOpen className="h-5 w-5" />
                  <span className="sr-only">Notes</span>
                </Button>
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full bg-orange-600 hover:bg-orange-700 shadow-lg mobile-friendly-touch"
                  onClick={() => handleAction("Upload")}
                >
                  <Upload className="h-5 w-5" />
                  <span className="sr-only">Upload</span>
                </Button>
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full bg-gray-600 hover:bg-gray-700 shadow-lg mobile-friendly-touch"
                  onClick={scrollToTop}
                >
                  <ChevronUp className="h-5 w-5" />
                  <span className="sr-only">Scroll to top</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            size="icon"
            className={cn(
              "h-14 w-14 rounded-full shadow-lg transition-all duration-300 mobile-friendly-touch",
              isOpen
                ? "bg-gray-700 hover:bg-gray-800"
                : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
              {isOpen ? <ChevronUp className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
            </motion.div>
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

