"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, BookOpen, Download, Star, Brain, MessageSquare, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([])
  const [ratingFilter, setRatingFilter] = useState([0])

  // Sample notes data
  const notes = [
    {
      id: 1,
      title: "Database Management Systems",
      university: "Punjab Technical University",
      downloads: 2345,
      author: "Priya S.",
      rating: 4.8,
      image: "/placeholder.svg?height=80&width=80",
      tags: ["AI Summarized", "Verified"],
      preview:
        "This comprehensive guide covers relational database concepts, SQL queries, normalization, and transaction management...",
      subject: "Computer Science",
    },
    {
      id: 2,
      title: "Advanced Algorithms",
      university: "IIT Roorkee",
      downloads: 1987,
      author: "Rahul M.",
      rating: 4.9,
      image: "/placeholder.svg?height=80&width=80",
      tags: ["AI Summarized", "Top Rated"],
      preview:
        "Detailed explanations of complex algorithms including dynamic programming, graph algorithms, and computational complexity...",
      subject: "Computer Science",
    },
    {
      id: 3,
      title: "Marketing Management",
      university: "Himachal Pradesh University",
      downloads: 1756,
      author: "Ankit K.",
      rating: 4.7,
      image: "/placeholder.svg?height=80&width=80",
      tags: ["Verified", "Popular"],
      preview:
        "Covers key marketing concepts including market segmentation, consumer behavior, product positioning, and digital marketing strategies...",
      subject: "Business",
    },
    {
      id: 4,
      title: "Organic Chemistry",
      university: "Delhi University",
      downloads: 2100,
      author: "Neha R.",
      rating: 4.6,
      image: "/placeholder.svg?height=80&width=80",
      tags: ["Verified", "Popular"],
      preview:
        "Comprehensive notes on organic reactions, mechanisms, stereochemistry, and spectroscopic analysis techniques...",
      subject: "Chemistry",
    },
    {
      id: 5,
      title: "Microeconomics",
      university: "Mumbai University",
      downloads: 1850,
      author: "Vikram S.",
      rating: 4.5,
      image: "/placeholder.svg?height=80&width=80",
      tags: ["AI Summarized"],
      preview:
        "Detailed explanations of supply and demand, market structures, consumer theory, and producer theory with practical examples...",
      subject: "Economics",
    },
    {
      id: 6,
      title: "Digital Signal Processing",
      university: "IIT Madras",
      downloads: 1650,
      author: "Karthik P.",
      rating: 4.9,
      image: "/placeholder.svg?height=80&width=80",
      tags: ["Top Rated", "Verified"],
      preview:
        "Comprehensive coverage of discrete-time signals, Z-transforms, FFT algorithms, filter design, and practical applications...",
      subject: "Electrical Engineering",
    },
  ]

  // Filter subjects and universities for the filter panel
  const subjects = Array.from(new Set(notes.map((note) => note.subject)))
  const universities = Array.from(new Set(notes.map((note) => note.university)))

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Filter notes based on search query and filters
  const filteredNotes = notes.filter((note) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase())

    // Subject filter
    const matchesSubject = selectedSubjects.length === 0 || selectedSubjects.includes(note.subject)

    // University filter
    const matchesUniversity = selectedUniversities.length === 0 || selectedUniversities.includes(note.university)

    // Rating filter
    const matchesRating = note.rating >= ratingFilter[0]

    return matchesSearch && matchesSubject && matchesUniversity && matchesRating
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-[#0f0b25] text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(120,80,255,0.15),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(60,180,255,0.15),transparent_40%)]"></div>
      </div>

      {/* Site Header */}
      <SiteHeader />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Notes</h1>
            <p className="text-gray-300 max-w-3xl">
              Discover high-quality academic notes from top universities. Use our advanced filters to find exactly what
              you need.
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search by title, university, or subject..."
                  className="w-full h-12 pl-12 rounded-lg bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <Button
                variant="outline"
                className="button-outline-purple h-12 md:w-auto"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-5 w-5" />
                Filters
                {showFilters ? <ChevronDown className="ml-2 h-4 w-4" /> : <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="glass-effect rounded-lg p-6 mb-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Subject Filter */}
                  <div>
                    <h3 className="font-medium text-white mb-3">Subject</h3>
                    <ScrollArea className="h-48 rounded-md border border-gray-700 p-4">
                      <div className="space-y-2">
                        {subjects.map((subject) => (
                          <div key={subject} className="flex items-center space-x-2">
                            <Checkbox
                              id={`subject-${subject}`}
                              checked={selectedSubjects.includes(subject)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedSubjects([...selectedSubjects, subject])
                                } else {
                                  setSelectedSubjects(selectedSubjects.filter((s) => s !== subject))
                                }
                              }}
                            />
                            <label
                              htmlFor={`subject-${subject}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {subject}
                            </label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* University Filter */}
                  <div>
                    <h3 className="font-medium text-white mb-3">University</h3>
                    <ScrollArea className="h-48 rounded-md border border-gray-700 p-4">
                      <div className="space-y-2">
                        {universities.map((university) => (
                          <div key={university} className="flex items-center space-x-2">
                            <Checkbox
                              id={`university-${university}`}
                              checked={selectedUniversities.includes(university)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedUniversities([...selectedUniversities, university])
                                } else {
                                  setSelectedUniversities(selectedUniversities.filter((u) => u !== university))
                                }
                              }}
                            />
                            <label
                              htmlFor={`university-${university}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {university}
                            </label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <h3 className="font-medium text-white mb-3">Minimum Rating</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0]}
                        max={5}
                        step={0.1}
                        value={ratingFilter}
                        onValueChange={setRatingFilter}
                        className="mb-6"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Min: {ratingFilter[0].toFixed(1)}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-400">out of 5.0</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium text-white mb-3">Sort By</h3>
                      <Select defaultValue="rating">
                        <SelectTrigger className="w-full bg-gray-800/50 border-gray-700">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rating">Highest Rated</SelectItem>
                          <SelectItem value="downloads">Most Downloaded</SelectItem>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedSubjects([])
                      setSelectedUniversities([])
                      setRatingFilter([0])
                    }}
                  >
                    Reset Filters
                  </Button>
                  <Button className="button-gradient">Apply Filters</Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Notes Results */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {filteredNotes.length} {filteredNotes.length === 1 ? "Result" : "Results"}
              </h2>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="downloads">Most Downloaded</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <motion.div key={note.id} variants={fadeIn}>
                    <Card className="glass-effect card-hover overflow-hidden group relative">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                              {note.title}
                            </CardTitle>
                            <CardDescription className="text-gray-400">{note.university}</CardDescription>
                          </div>
                          <Avatar className="h-10 w-10 border-2 border-purple-500/50 ring-2 ring-purple-500/20 transition-all duration-300 group-hover:ring-purple-500/40">
                            <AvatarImage src={note.image} alt={note.author} />
                            <AvatarFallback className="bg-purple-900/50">
                              {note.author.split(" ")[0][0]}
                              {note.author.split(" ")[1][0]}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <Badge variant="outline" className="bg-gray-700/30 text-gray-300 border-gray-600">
                            {note.subject}
                          </Badge>
                          {note.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant="outline"
                              className={`
                                ${
                                  tag === "AI Summarized"
                                    ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                                    : tag === "Verified"
                                      ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                      : tag === "Top Rated"
                                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                                        : tag === "Popular"
                                          ? "bg-green-500/10 text-green-400 border-green-500/30"
                                          : "bg-gray-500/10 text-gray-400 border-gray-500/30"
                                }
                              `}
                            >
                              {tag === "AI Summarized" && <Brain className="mr-1 h-3 w-3" />}
                              {tag === "Verified" && <Badge className="mr-1 h-3 w-3" />}
                              {tag === "Top Rated" && <Star className="mr-1 h-3 w-3" />}
                              {tag === "Popular" && <Download className="mr-1 h-3 w-3" />}
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-300 mb-3 line-clamp-2">{note.preview}</p>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span>{note.rating}/5.0</span>
                          </div>
                          <div className="flex items-center">
                            <Download className="h-4 w-4 text-blue-400 mr-1" />
                            <span>{note.downloads.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <div className="w-full space-y-2">
                          <Button className="w-full button-gradient group-hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                            Download Notes
                          </Button>
                          <div className="flex gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="flex-1 border-gray-700 hover:bg-gray-700/50 text-gray-400 hover:text-white"
                                  >
                                    <Brain className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>AI Summarize</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="flex-1 border-gray-700 hover:bg-gray-700/50 text-gray-400 hover:text-white"
                                  >
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Join Discussion</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <BookOpen className="h-16 w-16 text-gray-500 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Notes Found</h3>
                  <p className="text-gray-400 max-w-md mb-6">
                    We couldn't find any notes matching your search criteria. Try adjusting your filters or search
                    query.
                  </p>
                  <Button
                    variant="outline"
                    className="button-outline-purple"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedSubjects([])
                      setSelectedUniversities([])
                      setRatingFilter([0])
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Pagination */}
          {filteredNotes.length > 0 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8 p-0">
                  <span className="sr-only">Go to previous page</span>
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 min-w-8 rounded-md bg-purple-600 text-white border-purple-600"
                >
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 min-w-8 rounded-md">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 min-w-8 rounded-md">
                  3
                </Button>
                <span className="text-sm text-gray-400">...</span>
                <Button variant="outline" size="sm" className="h-8 min-w-8 rounded-md">
                  12
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 p-0">
                  <span className="sr-only">Go to next page</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Site Footer */}
      <SiteFooter />
    </div>
  )
}

