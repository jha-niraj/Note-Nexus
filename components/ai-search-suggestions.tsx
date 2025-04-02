"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, BookOpen, TrendingUp, History, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AISearchSuggestionsProps {
  query: string
  onSelectSuggestion: (suggestion: string) => void
}

export default function AISearchSuggestions({ query, onSelectSuggestion }: AISearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [trendingSearches, setTrendingSearches] = useState([
    "Database Management Systems",
    "Marketing Strategies",
    "Biotechnology Fundamentals",
    "Machine Learning Algorithms",
    "Financial Accounting",
  ])
  const [recentSearches, setRecentSearches] = useState([
    "Computer Networks",
    "Organic Chemistry",
    "Business Ethics",
    "Artificial Intelligence",
  ])

  // Generate AI suggestions based on query
  useEffect(() => {
    if (query.length > 1) {
      // Simulate AI-generated suggestions
      const generateSuggestions = () => {
        const queryLower = query.toLowerCase()

        // These would normally come from an API call to an AI service
        const possibleSuggestions = [
          `${query} notes for B.Tech`,
          `${query} study material`,
          `${query} exam preparation`,
          `${query} practical examples`,
          `${query} lecture notes`,
          `${query} question papers`,
          `${query} concepts explained`,
          `${query} for beginners`,
          `Advanced ${query} topics`,
          `${query} cheat sheet`,
        ]

        // Filter suggestions based on query
        const filtered = possibleSuggestions
          .filter((suggestion) => suggestion.toLowerCase().includes(queryLower))
          .slice(0, 5)

        setSuggestions(filtered)
      }

      const timer = setTimeout(generateSuggestions, 300)
      return () => clearTimeout(timer)
    } else {
      setSuggestions([])
    }
  }, [query])

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute top-full left-0 right-0 mt-2 bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden"
    >
      <div className="p-4">
        {/* AI-generated suggestions based on query */}
        {query.length > 1 && suggestions.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Search className="h-4 w-4 text-purple-400" />
              <h3 className="text-sm font-medium text-gray-300">Suggestions</h3>
            </div>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-gray-700/50"
                    onClick={() => onSelectSuggestion(suggestion)}
                  >
                    <span className="truncate">{suggestion}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Show trending and recent searches when query is empty or very short */}
        {query.length <= 1 && (
          <>
            {/* Trending searches */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                <h3 className="text-sm font-medium text-gray-300">Trending Searches</h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {trendingSearches.map((search, index) => (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-gray-700/50"
                      onClick={() => onSelectSuggestion(search)}
                    >
                      <TrendingUp className="mr-2 h-4 w-4 text-blue-400" />
                      <span className="truncate">{search}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-300">Recent Searches</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs text-gray-400 hover:text-white"
                    onClick={clearRecentSearches}
                  >
                    <X className="mr-1 h-3 w-3" />
                    Clear
                  </Button>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {recentSearches.map((search, index) => (
                    <li key={index}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-gray-700/50"
                        onClick={() => onSelectSuggestion(search)}
                      >
                        <History className="mr-2 h-4 w-4 text-gray-400" />
                        <span className="truncate">{search}</span>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* No results state */}
        {query.length > 1 && suggestions.length === 0 && (
          <div className="py-8 text-center">
            <BookOpen className="h-10 w-10 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">No suggestions found for "{query}"</p>
            <p className="text-gray-500 text-sm mt-1">Try a different search term</p>
          </div>
        )}
      </div>

      {/* Quick actions footer */}
      <div className="bg-gray-800/80 border-t border-gray-700 p-3">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Press Enter to search</span>
          <span>AI-powered suggestions</span>
        </div>
      </div>
    </motion.div>
  )
}

