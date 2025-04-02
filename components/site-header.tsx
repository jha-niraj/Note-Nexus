"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Menu, X, User, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import PremiumFeatures from "@/components/premium-features"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const [showPremiumFeatures, setShowPremiumFeatures] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Notes", href: "/notes" },
    { name: "Quizzes", href: "/quizzes" },
    { name: "AI Tools", href: "/ai-tools" },
    { name: "Community", href: "/community" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-gray-900/90 backdrop-blur-md shadow-lg" : "bg-transparent",
      )}
    >
      <div className="container mx-auto py-4 px-4 md:px-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="h-8 w-8 text-purple-500" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl font-bold gradient-heading"
            >
              NoteNexus.ai
            </motion.span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-gray-300 hover:text-white transition-colors hover:scale-105 transform duration-200",
                  pathname === item.href && "text-white font-medium",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-yellow-600/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-600/30 hidden sm:flex"
              onClick={() => setShowPremiumFeatures(true)}
            >
              <Crown className="mr-2 h-4 w-4" />
              Go Premium
            </Button>

            <Button variant="outline" className="hidden sm:flex button-outline-purple">
              <User className="mr-2 h-4 w-4" />
              Sign In
            </Button>

            <Button className="button-gradient">Sign Up</Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white h-12 w-12 rounded-full mobile-friendly-touch"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-800 mt-4 space-y-3"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-gray-300 hover:text-white transition-colors py-2 mobile-friendly-touch",
                    pathname === item.href && "text-white font-medium",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                variant="outline"
                className="bg-yellow-600/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-600/30 w-full justify-start"
                onClick={() => setShowPremiumFeatures(true)}
              >
                <Crown className="mr-2 h-4 w-4" />
                Go Premium
              </Button>
              <Button variant="outline" className="button-outline-purple w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </div>
          </motion.div>
        )}
      </div>
      {showPremiumFeatures && <PremiumFeatures onClose={() => setShowPremiumFeatures(false)} />}
    </header>
  )
}

