"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LineChartIcon as ChartLineUp,
  Trophy,
  Calendar,
  Clock,
  BookOpen,
  Target,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"

export default function ProgressDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

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
    <section className="py-16 bg-gray-900/50 backdrop-blur-sm relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(120,80,255,0.15),transparent_70%)]"></div>
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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Your Learning Progress</h2>
            <p className="text-gray-300">Track your study habits and achievements</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Sparkles className="mr-2 h-4 w-4" />
            Sign In to Track Progress
          </Button>
        </motion.div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="bg-gray-800/50 p-1 rounded-full w-fit mx-auto mb-8">
            <TabsTrigger
              value="overview"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
            >
              <ChartLineUp className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
            >
              <Trophy className="mr-2 h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Study Schedule
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div variants={fadeIn} className="md:col-span-2">
                <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 h-full">
                  <CardHeader>
                    <CardTitle className="text-white">Weekly Study Activity</CardTitle>
                    <CardDescription className="text-gray-400">Your study time and notes accessed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-end justify-between gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                        <div key={day} className="flex flex-col items-center gap-2">
                          <div
                            className="w-12 bg-gradient-to-t from-purple-600/80 to-blue-600/80 rounded-t-md"
                            style={{
                              height: `${[30, 45, 80, 60, 90, 50, 20][i]}%`,
                              opacity: day === "Sat" ? 1 : 0.7,
                            }}
                          ></div>
                          <span className="text-xs text-gray-400">{day}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-purple-600"></div>
                          <span className="text-xs text-gray-400">Study Time</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                          <span className="text-xs text-gray-400">Notes Accessed</span>
                        </div>
                      </div>
                      <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        12% increase
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 h-full">
                  <CardHeader>
                    <CardTitle className="text-white">Study Stats</CardTitle>
                    <CardDescription className="text-gray-400">Your learning metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-purple-400" />
                          <span className="text-sm text-gray-300">Study Time</span>
                        </div>
                        <span className="text-sm font-medium text-white">12.5 hrs</span>
                      </div>
                      <Progress value={62} className="h-2 bg-gray-700" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-400">Weekly Goal: 20 hrs</span>
                        <span className="text-xs text-gray-400">62%</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-400" />
                          <span className="text-sm text-gray-300">Notes Completed</span>
                        </div>
                        <span className="text-sm font-medium text-white">8/12</span>
                      </div>
                      <Progress value={66} className="h-2 bg-gray-700" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-400">This Week</span>
                        <span className="text-xs text-gray-400">66%</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">Focus Score</span>
                        </div>
                        <span className="text-sm font-medium text-white">85/100</span>
                      </div>
                      <Progress value={85} className="h-2 bg-gray-700" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-400">Excellent</span>
                        <span className="text-xs text-gray-400">85%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-0">
            <div className="flex flex-col items-center justify-center h-60 text-center">
              <Trophy className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Unlock Your Achievements</h3>
              <p className="text-gray-400 max-w-md mb-4">
                Sign in to track your learning milestones and earn badges for your accomplishments
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Sign In to View Achievements
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="mt-0">
            <div className="flex flex-col items-center justify-center h-60 text-center">
              <Calendar className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Personalized Study Schedule</h3>
              <p className="text-gray-400 max-w-md mb-4">
                Sign in to create an AI-powered study schedule optimized for your learning style and goals
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Sign In to Create Schedule
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

