"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BookOpen,
  Brain,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  LineChart,
  ListChecks,
  Star,
  Trophy,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function StudyDashboard() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-[#0f0b25] text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(120,80,255,0.15),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(60,180,255,0.15),transparent_40%)]"></div>
      </div>

      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Study Dashboard</h1>
              <p className="text-gray-300">Track your progress and optimize your learning journey</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <Avatar className="border-2 border-gray-900 h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Study buddy" />
                  <AvatarFallback className="bg-purple-700">JD</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-gray-900 h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Study buddy" />
                  <AvatarFallback className="bg-blue-700">SK</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-gray-900 h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Study buddy" />
                  <AvatarFallback className="bg-green-700">LM</AvatarFallback>
                </Avatar>
              </div>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                <Users className="mr-2 h-4 w-4" />
                Study Group
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Session
              </Button>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-gray-800/50 p-1 rounded-lg w-full mb-6">
            <TabsTrigger
              value="overview"
              className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
            >
              <LineChart className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="notes"
              className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
            >
              <FileText className="mr-2 h-4 w-4" />
              My Notes
            </TabsTrigger>
            <TabsTrigger
              value="quizzes"
              className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
            >
              <ListChecks className="mr-2 h-4 w-4" />
              My Quizzes
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
            >
              <Trophy className="mr-2 h-4 w-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <motion.div variants={fadeIn}>
                <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-purple-400" />
                      Study Time
                    </CardTitle>
                    <CardDescription>Your study activity this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">14.5 hours</div>
                    <div className="text-sm text-green-400 mb-4">↑ 23% from last week</div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Monday</span>
                          <span>2.5h</span>
                        </div>
                        <Progress value={50} className="h-1.5 bg-gray-700" indicatorClassName="bg-purple-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Tuesday</span>
                          <span>3h</span>
                        </div>
                        <Progress value={60} className="h-1.5 bg-gray-700" indicatorClassName="bg-purple-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Wednesday</span>
                          <span>1h</span>
                        </div>
                        <Progress value={20} className="h-1.5 bg-gray-700" indicatorClassName="bg-purple-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Thursday</span>
                          <span>4h</span>
                        </div>
                        <Progress value={80} className="h-1.5 bg-gray-700" indicatorClassName="bg-purple-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Friday</span>
                          <span>2h</span>
                        </div>
                        <Progress value={40} className="h-1.5 bg-gray-700" indicatorClassName="bg-purple-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Saturday</span>
                          <span>1h</span>
                        </div>
                        <Progress value={20} className="h-1.5 bg-gray-700" indicatorClassName="bg-purple-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Sunday</span>
                          <span>1h</span>
                        </div>
                        <Progress value={20} className="h-1.5 bg-gray-700" indicatorClassName="bg-purple-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white flex items-center">
                      <Brain className="mr-2 h-5 w-5 text-blue-400" />
                      Learning Progress
                    </CardTitle>
                    <CardDescription>Your subject mastery</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-gray-300 mb-1">
                          <span>Computer Science</span>
                          <span>78%</span>
                        </div>
                        <Progress
                          value={78}
                          className="h-2 bg-gray-700"
                          indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-300 mb-1">
                          <span>Mathematics</span>
                          <span>65%</span>
                        </div>
                        <Progress
                          value={65}
                          className="h-2 bg-gray-700"
                          indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-300 mb-1">
                          <span>Physics</span>
                          <span>42%</span>
                        </div>
                        <Progress
                          value={42}
                          className="h-2 bg-gray-700"
                          indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-300 mb-1">
                          <span>Economics</span>
                          <span>91%</span>
                        </div>
                        <Progress
                          value={91}
                          className="h-2 bg-gray-700"
                          indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500"
                        />
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-400">Overall Progress</div>
                        <div className="text-lg font-bold text-white">69%</div>
                      </div>
                      <Progress
                        value={69}
                        className="h-2.5 mt-2 bg-gray-700"
                        indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-500"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white flex items-center">
                      <Star className="mr-2 h-5 w-5 text-yellow-400" />
                      Achievements
                    </CardTitle>
                    <CardDescription>Your learning milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">Study Streak Master</div>
                          <div className="text-xs text-gray-400">Maintained a 30-day study streak</div>
                        </div>
                        <Badge className="ml-auto bg-purple-500/20 text-purple-300 border-purple-500/30">Level 3</Badge>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">Knowledge Explorer</div>
                          <div className="text-xs text-gray-400">Studied 50+ different topics</div>
                        </div>
                        <Badge className="ml-auto bg-blue-500/20 text-blue-300 border-blue-500/30">Level 2</Badge>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">Quiz Champion</div>
                          <div className="text-xs text-gray-400">Scored 90%+ on 25 quizzes</div>
                        </div>
                        <Badge className="ml-auto bg-green-500/20 text-green-300 border-green-500/30">Level 4</Badge>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full mt-4 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <Trophy className="mr-2 h-4 w-4" />
                      View All Achievements
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Recent Activity Section */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 bg-gray-800/40 rounded-lg border border-gray-700">
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">Completed reading "Advanced Database Systems"</div>
                    <div className="text-xs text-gray-400">2 hours ago</div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    View
                  </Button>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-800/40 rounded-lg border border-gray-700">
                  <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">
                      Generated AI quiz on "Machine Learning Fundamentals"
                    </div>
                    <div className="text-xs text-gray-400">Yesterday</div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    View
                  </Button>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-800/40 rounded-lg border border-gray-700">
                  <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">Joined study group "Physics 101"</div>
                    <div className="text-xs text-gray-400">2 days ago</div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    View
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Recommended Content */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <h2 className="text-xl font-bold text-white mb-4">Recommended For You</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-base">Machine Learning: Neural Networks</CardTitle>
                    <CardDescription>Based on your recent activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                        <Brain className="mr-1 h-3 w-3" />
                        AI Enhanced
                      </Badge>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                        Advanced
                      </Badge>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600">
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-base">Economics: Market Structures</CardTitle>
                    <CardDescription>Recommended by your study group</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                        Popular
                      </Badge>
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
                        <Star className="mr-1 h-3 w-3" />
                        Top Rated
                      </Badge>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600">
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-base">Physics: Quantum Mechanics</CardTitle>
                    <CardDescription>Helps improve your weakest subject</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30">
                        Interactive
                      </Badge>
                      <Badge variant="outline" className="bg-teal-500/10 text-teal-400 border-teal-500/30">
                        Beginner Friendly
                      </Badge>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600">
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="notes" className="mt-0">
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">My Notes Content</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                This tab would display all your personal notes, organized by subject and date.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="quizzes" className="mt-0">
            <div className="text-center py-12">
              <ListChecks className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">My Quizzes Content</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                This tab would display all your completed and saved quizzes, with performance metrics.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-0">
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Achievements Content</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                This tab would display all your learning achievements and badges.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

