"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Search,
  BookOpen,
  Upload,
  Brain,
  TrendingUp,
  Users,
  MessageSquare,
  ChevronRight,
  Star,
  Download,
  Share2,
  Sparkles,
  Zap,
  Bell,
  ArrowRight,
  Volume2,
  Bot,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import AISearchSuggestions from "@/components/ai-search-suggestions"
import NotesPreview from "@/components/notes-preview"
// Import modal components
import AiNoteSummarizer from "@/components/ai-note-summarizer"
import LiveDiscussionForum from "@/components/live-discussion-forum"
import PremiumFeatures from "@/components/premium-features"
import HandwrittenScanner from "@/components/handwritten-scanner"
import ChatbotButton from "@/components/chatbot-button"
// Import new enhancement components
import AuthModal from "@/components/auth-modal"
import CourseRecommendations from "@/components/course-recommendations"
import VoiceCommands from "@/components/voice-commands"
import ProgressDashboard from "@/components/progress-dashboard"
import SocialLearning from "@/components/social-learning"
// Import the new components
import GamificationSystem from "@/components/gamification-system"
import AIQuizGenerator from "@/components/ai-quiz-generator"
// Import the TouchFriendlyControls component
import TouchFriendlyControls from "@/components/touch-friendly-controls"
// Import our new site components
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [previewNote, setPreviewNote] = useState<number | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  // Modal states
  const [showAiSummarizer, setShowAiSummarizer] = useState(false)
  const [showDiscussionForum, setShowDiscussionForum] = useState(false)
  const [showPremiumFeatures, setShowPremiumFeatures] = useState(false)
  const [showHandwrittenScanner, setShowHandwrittenScanner] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">("signin")
  const { toast } = useToast()
  const isMobile = useMobile()
  const [showQuizGenerator, setShowQuizGenerator] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle search input
  const handleSearchFocus = () => {
    setShowSearchSuggestions(true)
  }

  const handleSearchBlur = () => {
    setTimeout(() => {
      setShowSearchSuggestions(false)
    }, 200)
  }

  // Handle voice search
  const handleVoiceSearch = (query: string) => {
    setSearchQuery(query)
    toast({
      title: "Voice command recognized",
      description: `Searching for: "${query}"`,
    })
  }

  // Handle copy referral link
  const handleCopyReferral = () => {
    navigator.clipboard.writeText("https://notenexus.ai/ref/user123")
    toast({
      title: "Referral link copied!",
      description: "Share with friends to earn rewards",
      variant: "default",
    })
  }

  // Handle auth modal functions
  const openSignIn = () => {
    setAuthModalTab("signin")
    setShowAuthModal(true)
  }

  const openSignUp = () => {
    setAuthModalTab("signup")
    setShowAuthModal(true)
  }

  // Sample notes data
  const trendingNotes = [
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
    },
  ]

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-[#0f0b25] text-white overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(120,80,255,0.15),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(60,180,255,0.15),transparent_40%)]"></div>
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-600/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Site Header */}
      <SiteHeader />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="container mx-auto px-4 md:px-6 relative z-10"
          >
            <div className="container mx-auto p-4">
              {/* Rest of the page content */}
              <div className="max-w-3xl mx-auto text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
                    Plan Smart, Study Smarter
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-gray-300 mb-8"
                >
                  AI-powered notes platform for B.Tech, MBA, BBA, Biotechnology, and Agriculture students
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative max-w-2xl mx-auto mb-8"
                >
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search for notes, subjects, universities..."
                      className="w-full h-14 pl-12 pr-16 rounded-full bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />

                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                      <VoiceCommands onSearch={handleVoiceSearch} />
                      <Button
                        size="icon"
                        className="h-10 w-10 rounded-full bg-purple-600 hover:bg-purple-700 transition-all duration-300"
                      >
                        <Search className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* AI Search Suggestions */}
                  {showSearchSuggestions && (
                    <AISearchSuggestions
                      query={searchQuery}
                      onSelectSuggestion={(suggestion) => setSearchQuery(suggestion)}
                    />
                  )}
                </motion.div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap justify-center gap-4"
                >
                  <motion.div variants={fadeIn}>
                    <Button className="button-gradient h-12 px-6 rounded-full transform hover:scale-105">
                      <Search className="mr-2 h-5 w-5" />
                      Find Notes Now
                    </Button>
                  </motion.div>

                  <motion.div variants={fadeIn}>
                    <Button
                      variant="outline"
                      className="button-outline-orange h-12 px-6 rounded-full transform hover:scale-105"
                      onClick={() => setShowHandwrittenScanner(true)}
                    >
                      <FileText className="mr-2 h-5 w-5" />
                      Scan Handwritten Notes
                    </Button>
                  </motion.div>

                  <motion.div variants={fadeIn}>
                    <Button
                      variant="outline"
                      className="button-outline-blue h-12 px-6 rounded-full transform hover:scale-105"
                    >
                      <Brain className="mr-2 h-5 w-5" />
                      AI Study Planner
                    </Button>
                  </motion.div>
                  <motion.div variants={fadeIn}>
                    <Button
                      variant="outline"
                      className="button-outline-purple h-12 px-6 rounded-full transform hover:scale-105"
                      onClick={() => (window.location.href = "/upload")}
                    >
                      <Upload className="mr-2 h-5 w-5" />
                      Upload Notes
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              {/* AI Chatbot Preview */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="max-w-md mx-auto glass-effect rounded-xl border border-gray-700 p-4 shadow-[0_0_25px_rgba(168,85,247,0.15)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-600 text-white">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-300">NoteNexus AI Assistant</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-700/50 rounded-lg p-3 text-sm text-gray-300">
                    Hi there! I can help you find notes, summarize content, or create a study plan. What would you like
                    to do today?
                  </div>
                  <div className="bg-purple-600/20 rounded-lg p-3 text-sm text-purple-300 ml-auto max-w-[80%]">
                    I need notes on Database Management Systems
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3 text-sm text-gray-300">
                    <p className="mb-2">I found 5 highly-rated DBMS notes. Here's the top result:</p>
                    <div className="flex items-center gap-2 bg-gray-800/70 rounded-lg p-2">
                      <BookOpen className="h-5 w-5 text-purple-400 flex-shrink-0" />
                      <div className="overflow-hidden">
                        <p className="font-medium text-white truncate">Database Management Systems</p>
                        <p className="text-xs text-gray-400">Punjab Technical University • 4.8 ⭐</p>
                      </div>
                      <Button
                        size="sm"
                        className="ml-auto bg-purple-600 hover:bg-purple-700 h-8 px-3 rounded-full text-xs"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    className="bg-gray-700 hover:bg-gray-600 text-xs rounded-full"
                    onClick={() => setShowAiSummarizer(true)}
                  >
                    Try AI Summarization
                  </Button>
                  <Button size="sm" className="bg-gray-700 hover:bg-gray-600 text-xs rounded-full">
                    Create Study Plan
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Smart Course Recommendations */}
        <CourseRecommendations />

        {/* Smart Notes Discovery Section */}
        <section className="section-padding bg-gray-900/50 backdrop-blur-sm relative">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(120,80,255,0.15),transparent_70%)]"></div>
          </div>

          <div className="container mx-auto container-padding relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
            >
              <h2 className="text-2xl md:text-3xl font-bold">
                <span className="text-white">Smart Notes Discovery</span>
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-800/70 rounded-full px-4 py-2">
                  <Badge className="bg-purple-600 text-white">New</Badge>
                  <span className="text-sm text-gray-300">AI-powered recommendations</span>
                </div>
                <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            <Tabs defaultValue="trending" className="mb-12">
              <TabsList className="bg-gray-800/50 p-1 rounded-full w-fit mx-auto mb-8">
                <TabsTrigger
                  value="trending"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Trending
                </TabsTrigger>
                <TabsTrigger
                  value="recommended"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  For You
                </TabsTrigger>
                <TabsTrigger
                  value="recent"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  New
                </TabsTrigger>
              </TabsList>

              <TabsContent value="trending" className="mt-0">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {trendingNotes.map((note) => (
                    <motion.div key={note.id} variants={fadeIn}>
                      <Card
                        className="glass-effect card-hover overflow-hidden group relative"
                        onMouseEnter={() => setPreviewNote(note.id)}
                        onMouseLeave={() => setPreviewNote(null)}
                      >
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
                                {tag === "Popular" && <TrendingUp className="mr-1 h-3 w-3" />}
                                {tag}
                              </Badge>
                            ))}
                          </div>
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

                          {/* Progress bar showing popularity */}
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                              <span>Popularity</span>
                              <span>{Math.round((note.downloads / 3000) * 100)}%</span>
                            </div>
                            <Progress value={Math.round((note.downloads / 3000) * 100)} className="h-1.5 bg-gray-700" />
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
                                      <Share2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Share with friends</p>
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
                                      onClick={() => setShowAiSummarizer(true)}
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
                                      <Volume2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Listen to notes</p>
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
                                      onClick={() => setShowDiscussionForum(true)}
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

                        {/* Notes Preview on Hover */}
                        {previewNote === note.id && !isMobile && <NotesPreview note={note} />}
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="recommended" className="mt-0">
                <div className="flex flex-col items-center justify-center h-60 text-center">
                  <Sparkles className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Personalized Recommendations</h3>
                  <p className="text-gray-400 max-w-md mb-4">
                    Sign in to get AI-powered note recommendations based on your courses
                  </p>
                  <Button className="button-gradient" onClick={openSignIn}>
                    Sign In for Recommendations
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="recent" className="mt-0">
                <div className="flex flex-col items-center justify-center h-60 text-center">
                  <Zap className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Fresh Content Daily</h3>
                  <p className="text-gray-400 max-w-md mb-4">
                    Sign in to discover newly uploaded notes from top contributors
                  </p>
                  <Button className="button-gradient" onClick={openSignIn}>
                    Sign In to Explore
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Progress Dashboard */}
        <ProgressDashboard />

        {/* Social Learning */}
        <SocialLearning />

        {/* Gamification System */}
        <GamificationSystem />

        {/* AI Quiz Generator */}
        {showQuizGenerator && <AIQuizGenerator onClose={() => setShowQuizGenerator(false)} />}

        {/* Features Showcase */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(120,80,255,0.4),transparent_40%)]"></div>
          </div>

          <div className="container mx-auto container-padding relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-white">Why Choose NoteNexus.ai?</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Our AI-powered platform revolutionizes how students access, create, and share academic notes
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "Smart Notes Finder",
                  description: "AI-powered search finds exactly what you need across thousands of notes",
                  icon: <Search className="h-10 w-10 text-purple-500" />,
                  gradient: "from-purple-500/20 to-purple-700/20",
                },
                {
                  title: "AI-Powered Summarization",
                  description: "Get instant summaries of lengthy notes to save study time",
                  icon: <Brain className="h-10 w-10 text-blue-500" />,
                  gradient: "from-blue-500/20 to-blue-700/20",
                },
                {
                  title: "Handwritten Notes Scanner",
                  description: "Upload handwritten notes and convert them to searchable text",
                  icon: <Upload className="h-10 w-10 text-purple-500" />,
                  gradient: "from-purple-500/20 to-purple-700/20",
                },
                {
                  title: "Study Groups & Collaboration",
                  description: "Form study groups and collaborate with peers in real-time",
                  icon: <Users className="h-10 w-10 text-blue-500" />,
                  gradient: "from-blue-500/20 to-blue-700/20",
                },
                {
                  title: "Doubt Solver AI Chatbot",
                  description: "Get instant answers to your academic questions 24/7",
                  icon: <MessageSquare className="h-10 w-10 text-purple-500" />,
                  gradient: "from-purple-500/20 to-purple-700/20",
                },
                {
                  title: "Earn While You Learn",
                  description: "Upload your notes and earn rewards when others download them",
                  icon: <TrendingUp className="h-10 w-10 text-blue-500" />,
                  gradient: "from-blue-500/20 to-blue-700/20",
                },
              ].map((feature, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="glass-effect card-hover overflow-hidden group cursor-pointer">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>
                    <CardHeader className="relative">
                      <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                      <p className="text-gray-300 group-hover:text-white transition-colors">{feature.description}</p>
                    </CardContent>
                    <CardFooter className="relative pt-0">
                      <Button
                        variant="ghost"
                        className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 p-0 group-hover:translate-x-2 transition-transform duration-300"
                      >
                        Learn more <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_70%,rgba(120,80,255,0.4),transparent_40%)]"></div>
          </div>

          <div className="container mx-auto container-padding relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-white">Stay Updated</span>
              </h2>
              <p className="text-gray-300 mb-8">
                Subscribe to our newsletter for exam alerts, study tips, and exclusive content
              </p>

              <div className="glass-effect rounded-xl p-6 shadow-[0_0_25px_rgba(168,85,247,0.15)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-600 text-white">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-white">Never Miss Important Updates</h3>
                    <p className="text-sm text-gray-400">Get notified about new notes, exam tips, and more</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Input type="email" placeholder="Enter your email" className="bg-gray-800/60 border-gray-700 h-12" />
                  <Button className="button-gradient h-12 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                    Subscribe
                  </Button>
                </div>

                <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Badge className="bg-purple-600 text-white h-5 w-5 flex items-center justify-center p-0 text-xs">
                      ✓
                    </Badge>
                    <span>Exam Alerts</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge className="bg-blue-600 text-white h-5 w-5 flex items-center justify-center p-0 text-xs">
                      ✓
                    </Badge>
                    <span>Study Tips</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge className="bg-green-600 text-white h-5 w-5 flex items-center justify-center p-0 text-xs">
                      ✓
                    </Badge>
                    <span>Free Resources</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Site Footer */}
      <SiteFooter />

      {/* Modal Components */}
      {showAiSummarizer && (
        <AiNoteSummarizer
          noteTitle="Database Management Systems"
          noteContent="This comprehensive guide covers relational database concepts including normalization, SQL queries, transaction management, and database design principles."
          onClose={() => setShowAiSummarizer(false)}
        />
      )}

      {showDiscussionForum && (
        <LiveDiscussionForum noteTitle="Database Management Systems" onClose={() => setShowDiscussionForum(false)} />
      )}

      {showPremiumFeatures && <PremiumFeatures onClose={() => setShowPremiumFeatures(false)} />}

      {showHandwrittenScanner && <HandwrittenScanner onClose={() => setShowHandwrittenScanner(false)} />}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} defaultTab={authModalTab} />
      )}

      {/* Floating Chatbot Button */}
      <ChatbotButton />

      {/* Touch-friendly mobile controls */}
      <TouchFriendlyControls />
    </div>
  )
}

