"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  BookOpen,
  Brain,
  ChevronDown,
  ChevronRight,
  Clock,
  Award,
  CheckCircle,
  HelpCircle,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function QuizzesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])

  // Sample quizzes data
  const quizzes = [
    {
      id: 1,
      title: "Database Management Systems Quiz",
      subject: "Computer Science",
      difficulty: "Medium",
      questions: 20,
      timeEstimate: "15 min",
      completionRate: 78,
      description:
        "Test your knowledge of relational database concepts, SQL queries, normalization, and transaction management.",
      tags: ["Popular", "AI Generated"],
    },
    {
      id: 2,
      title: "Advanced Algorithms Challenge",
      subject: "Computer Science",
      difficulty: "Hard",
      questions: 15,
      timeEstimate: "25 min",
      completionRate: 62,
      description:
        "Challenge yourself with complex algorithmic problems including dynamic programming, graph algorithms, and computational complexity.",
      tags: ["AI Generated", "Expert"],
    },
    {
      id: 3,
      title: "Marketing Fundamentals",
      subject: "Business",
      difficulty: "Easy",
      questions: 25,
      timeEstimate: "20 min",
      completionRate: 85,
      description:
        "Test your understanding of key marketing concepts including market segmentation, consumer behavior, and product positioning.",
      tags: ["Beginner Friendly", "Popular"],
    },
    {
      id: 4,
      title: "Organic Chemistry Reactions",
      subject: "Chemistry",
      difficulty: "Medium",
      questions: 30,
      timeEstimate: "30 min",
      completionRate: 70,
      description:
        "Test your knowledge of organic reactions, mechanisms, stereochemistry, and spectroscopic analysis techniques.",
      tags: ["Comprehensive", "AI Generated"],
    },
    {
      id: 5,
      title: "Microeconomics Principles",
      subject: "Economics",
      difficulty: "Easy",
      questions: 20,
      timeEstimate: "15 min",
      completionRate: 88,
      description:
        "Test your understanding of supply and demand, market structures, consumer theory, and producer theory.",
      tags: ["Beginner Friendly"],
    },
    {
      id: 6,
      title: "Digital Signal Processing Mastery",
      subject: "Electrical Engineering",
      difficulty: "Hard",
      questions: 25,
      timeEstimate: "35 min",
      completionRate: 58,
      description:
        "Challenge your understanding of discrete-time signals, Z-transforms, FFT algorithms, and filter design.",
      tags: ["Expert", "Comprehensive"],
    },
  ]

  // Filter subjects and difficulty levels for the filter panel
  const subjects = Array.from(new Set(quizzes.map((quiz) => quiz.subject)))
  const difficultyLevels = ["Easy", "Medium", "Hard"]

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

  // Filter quizzes based on search query and filters
  const filteredQuizzes = quizzes.filter((quiz) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Subject filter
    const matchesSubject = selectedSubjects.length === 0 || selectedSubjects.includes(quiz.subject)

    // Difficulty filter
    const matchesDifficulty = selectedDifficulty.length === 0 || selectedDifficulty.includes(quiz.difficulty)

    return matchesSearch && matchesSubject && matchesDifficulty
  })

  // Helper function to get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-400 border-green-500/30"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
      case "Hard":
        return "bg-red-500/10 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30"
    }
  }

  // Helper function to get tag color
  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Popular":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30"
      case "AI Generated":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30"
      case "Expert":
        return "bg-red-500/10 text-red-400 border-red-500/30"
      case "Beginner Friendly":
        return "bg-green-500/10 text-green-400 border-green-500/30"
      case "Comprehensive":
        return "bg-orange-500/10 text-orange-400 border-orange-500/30"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30"
    }
  }

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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-Generated Quizzes</h1>
            <p className="text-gray-300 max-w-3xl">
              Test your knowledge with our AI-generated quizzes. Each quiz is tailored to help you master key concepts
              and prepare for exams with detailed explanations for each answer.
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search quizzes by title, subject, or description..."
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

                  {/* Difficulty Filter */}
                  <div>
                    <h3 className="font-medium text-white mb-3">Difficulty</h3>
                    <div className="space-y-2">
                      {difficultyLevels.map((difficulty) => (
                        <div key={difficulty} className="flex items-center space-x-2">
                          <Checkbox
                            id={`difficulty-${difficulty}`}
                            checked={selectedDifficulty.includes(difficulty)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedDifficulty([...selectedDifficulty, difficulty])
                              } else {
                                setSelectedDifficulty(selectedDifficulty.filter((d) => d !== difficulty))
                              }
                            }}
                          />
                          <label
                            htmlFor={`difficulty-${difficulty}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {difficulty}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quiz Length Filter */}
                  <div>
                    <h3 className="font-medium text-white mb-3">Quiz Length</h3>
                    <Select defaultValue="any">
                      <SelectTrigger className="w-full bg-gray-800/50 border-gray-700">
                        <SelectValue placeholder="Any length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any length</SelectItem>
                        <SelectItem value="short">Short ({"<"} 15 questions)</SelectItem>
                        <SelectItem value="medium">Medium (15-25 questions)</SelectItem>
                        <SelectItem value="long">Long ({">"} 25 questions)</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="mt-6">
                      <h3 className="font-medium text-white mb-3">Sort By</h3>
                      <Select defaultValue="popular">
                        <SelectTrigger className="w-full bg-gray-800/50 border-gray-700">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popular">Most Popular</SelectItem>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="easiest">Easiest First</SelectItem>
                          <SelectItem value="hardest">Hardest First</SelectItem>
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
                      setSelectedDifficulty([])
                    }}
                  >
                    Reset Filters
                  </Button>
                  <Button className="button-gradient">Apply Filters</Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Tabs for Quiz Categories */}
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="bg-gray-800/50 p-1 rounded-full w-fit mx-auto mb-8">
              <TabsTrigger
                value="all"
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
              >
                All Quizzes
              </TabsTrigger>
              <TabsTrigger
                value="popular"
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
              >
                Popular
              </TabsTrigger>
              <TabsTrigger
                value="ai"
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
              >
                <Brain className="mr-2 h-4 w-4" />
                AI Generated
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              {/* Quiz Results */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    {filteredQuizzes.length} {filteredQuizzes.length === 1 ? "Quiz" : "Quizzes"}
                  </h2>
                  <Select defaultValue="popular">
                    <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="easiest">Easiest First</SelectItem>
                      <SelectItem value="hardest">Hardest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredQuizzes.length > 0 ? (
                    filteredQuizzes.map((quiz) => (
                      <motion.div key={quiz.id} variants={fadeIn}>
                        <Card className="glass-effect card-hover overflow-hidden group relative h-full flex flex-col">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                                  {quiz.title}
                                </CardTitle>
                                <CardDescription className="text-gray-400">{quiz.subject}</CardDescription>
                              </div>
                              <Badge variant="outline" className={getDifficultyColor(quiz.difficulty)}>
                                {quiz.difficulty}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                              {quiz.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="outline" className={getTagColor(tag)}>
                                  {tag === "AI Generated" && <Brain className="mr-1 h-3 w-3" />}
                                  {tag === "Popular" && <Zap className="mr-1 h-3 w-3" />}
                                  {tag === "Expert" && <Award className="mr-1 h-3 w-3" />}
                                  {tag === "Beginner Friendly" && <CheckCircle className="mr-1 h-3 w-3" />}
                                  {tag === "Comprehensive" && <HelpCircle className="mr-1 h-3 w-3" />}
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-sm text-gray-300 mb-3 line-clamp-2">{quiz.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                              <div className="flex items-center">
                                <HelpCircle className="h-4 w-4 text-purple-400 mr-1" />
                                <span>{quiz.questions} Questions</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-blue-400 mr-1" />
                                <span>{quiz.timeEstimate}</span>
                              </div>
                            </div>
                            <div className="mb-1">
                              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                                <span>Completion Rate</span>
                                <span>{quiz.completionRate}%</span>
                              </div>
                              <Progress
                                value={quiz.completionRate}
                                className="h-1.5 bg-gray-700"
                                indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500"
                              />
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button className="w-full button-gradient group-hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                              Start Quiz
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                      <BookOpen className="h-16 w-16 text-gray-500 mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">No Quizzes Found</h3>
                      <p className="text-gray-400 max-w-md mb-6">
                        We couldn't find any quizzes matching your search criteria. Try adjusting your filters or search
                        query.
                      </p>
                      <Button
                        variant="outline"
                        className="button-outline-purple"
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedSubjects([])
                          setSelectedDifficulty([])
                        }}
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  )}
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="popular" className="mt-0">
              <div className="flex flex-col items-center justify-center h-60 text-center">
                <Zap className="h-12 w-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Popular Quizzes</h3>
                <p className="text-gray-400 max-w-md mb-4">
                  Sign in to access our most popular quizzes taken by thousands of students
                </p>
                <Button className="button-gradient">Sign In to Access</Button>
              </div>
            </TabsContent>

            <TabsContent value="ai" className="mt-0">
              <div className="flex flex-col items-center justify-center h-60 text-center">
                <Brain className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">AI-Generated Quizzes</h3>
                <p className="text-gray-400 max-w-md mb-4">
                  Our AI creates personalized quizzes based on your learning needs and study materials
                </p>
                <Button className="button-gradient">Generate Custom Quiz</Button>
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <div className="flex flex-col items-center justify-center h-60 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Completed Quizzes</h3>
                <p className="text-gray-400 max-w-md mb-4">
                  Sign in to view your quiz history and track your progress over time
                </p>
                <Button className="button-gradient">Sign In to View History</Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Create Your Own Quiz Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 glass-effect rounded-xl p-8 border border-purple-500/20"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Create Your Own Quiz</h2>
                <p className="text-gray-300 mb-6">
                  Our AI can generate custom quizzes from your notes or any study material. Simply upload your content
                  and let our AI create personalized questions with detailed explanations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="button-gradient">
                    <Brain className="mr-2 h-5 w-5" />
                    Generate from Notes
                  </Button>
                  <Button variant="outline" className="button-outline-purple">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full animate-float"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="h-24 w-24 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Site Footer */}
      <SiteFooter />
    </div>
  )
}

