"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Brain, Star, Download, ChevronRight, ChevronLeft, Sparkles } from "lucide-react"

export default function CourseRecommendations() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const recommendations = [
    {
      id: 1,
      title: "Advanced Database Management",
      university: "Punjab Technical University",
      instructor: "Dr. Priya Sharma",
      rating: 4.8,
      students: 1245,
      image: "/placeholder.svg?height=80&width=80",
      match: 98,
      description:
        "Perfect for students who enjoyed Database Management Systems. This course covers advanced concepts including distributed databases, query optimization, and NoSQL systems.",
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      university: "IIT Roorkee",
      instructor: "Prof. Rahul Mehta",
      rating: 4.9,
      students: 2130,
      image: "/placeholder.svg?height=80&width=80",
      match: 95,
      description:
        "Based on your interest in Advanced Algorithms, this course provides a comprehensive study of fundamental data structures and algorithm design techniques.",
    },
    {
      id: 3,
      title: "Digital Marketing Strategies",
      university: "Himachal Pradesh University",
      instructor: "Dr. Ankit Kumar",
      rating: 4.7,
      students: 1876,
      image: "/placeholder.svg?height=80&width=80",
      match: 92,
      description:
        "Following your interest in Marketing Management, this course explores digital marketing channels, analytics, and campaign optimization strategies.",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === recommendations.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? recommendations.length - 1 : prev - 1))
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(120,80,255,0.4),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Courses For You</h2>
            <p className="text-gray-300">AI-powered recommendations based on your interests</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-700 text-gray-300 hover:bg-gray-700/50"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-700 text-gray-300 hover:bg-gray-700/50"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {recommendations.map((course) => (
              <div key={course.id} className="w-full flex-shrink-0 px-4">
                <motion.div initial="hidden" whileInView="visible" variants={fadeIn} viewport={{ once: true }}>
                  <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                              <Sparkles className="mr-1 h-3 w-3" />
                              {course.match}% Match
                            </Badge>
                          </div>
                          <CardTitle className="text-white text-xl">{course.title}</CardTitle>
                          <CardDescription className="text-gray-400">{course.university}</CardDescription>
                        </div>
                        <Avatar className="h-12 w-12 border-2 border-purple-500/50 ring-2 ring-purple-500/20">
                          <AvatarImage src={course.image} alt={course.instructor} />
                          <AvatarFallback className="bg-purple-900/50">
                            {course.instructor.split(" ")[0][0]}
                            {course.instructor.split(" ")[1][0]}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span>{course.rating}/5.0</span>
                        </div>
                        <div className="flex items-center">
                          <Download className="h-4 w-4 text-blue-400 mr-1" />
                          <span>{course.students.toLocaleString()} students</span>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm">{course.description}</p>

                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <Avatar key={i} className="h-6 w-6 border border-gray-800">
                              <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
                              <AvatarFallback className="bg-gray-700 text-[10px]">U{i}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          +{Math.floor(course.students / 10)} friends enrolled
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-2">
                      <Button variant="outline" className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700/50">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        <Brain className="mr-2 h-4 w-4" />
                        Enroll Now
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          {recommendations.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${currentSlide === index ? "bg-purple-500" : "bg-gray-700"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

