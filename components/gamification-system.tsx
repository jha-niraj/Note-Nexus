"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Trophy,
  Star,
  Zap,
  Award,
  Target,
  CheckCircle,
  Calendar,
  TrendingUp,
  BookOpen,
  Brain,
  Users,
  FileText,
  Sparkles,
} from "lucide-react"

export default function GamificationSystem() {
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

  // User stats
  const userStats = {
    level: 7,
    xp: 3450,
    xpToNextLevel: 5000,
    rank: "Knowledge Seeker",
    streak: 7,
    badges: 12,
    position: 34,
  }

  // Daily challenges
  const dailyChallenges = [
    {
      id: 1,
      title: "Study Session",
      description: "Complete a 30-minute study session",
      xp: 50,
      completed: true,
    },
    {
      id: 2,
      title: "Note Master",
      description: "Create or upload a new set of notes",
      xp: 75,
      completed: false,
    },
    {
      id: 3,
      title: "Quiz Champion",
      description: "Score 80% or higher on a practice quiz",
      xp: 100,
      completed: false,
    },
    {
      id: 4,
      title: "Collaboration",
      description: "Participate in a study group discussion",
      xp: 60,
      completed: false,
    },
  ]

  // Achievements
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first study session",
      icon: <BookOpen className="h-5 w-5 text-blue-400" />,
      completed: true,
      progress: 100,
    },
    {
      id: 2,
      title: "Note Taker",
      description: "Upload 10 sets of notes",
      icon: <FileText className="h-5 w-5 text-green-400" />,
      completed: false,
      progress: 70,
      current: 7,
      total: 10,
    },
    {
      id: 3,
      title: "AI Explorer",
      description: "Use 5 different AI features",
      icon: <Brain className="h-5 w-5 text-purple-400" />,
      completed: false,
      progress: 60,
      current: 3,
      total: 5,
    },
    {
      id: 4,
      title: "Social Learner",
      description: "Join 3 study groups",
      icon: <Users className="h-5 w-5 text-pink-400" />,
      completed: false,
      progress: 33,
      current: 1,
      total: 3,
    },
  ]

  // Leaderboard
  const leaderboard = [
    { id: 1, name: "Rahul M.", avatar: "/placeholder.svg?height=40&width=40", xp: 8750, university: "IIT Roorkee" },
    {
      id: 2,
      name: "Priya S.",
      avatar: "/placeholder.svg?height=40&width=40",
      xp: 7890,
      university: "Punjab Technical University",
    },
    {
      id: 3,
      name: "Ankit K.",
      avatar: "/placeholder.svg?height=40&width=40",
      xp: 7245,
      university: "Himachal Pradesh University",
    },
    { id: 4, name: "Neha G.", avatar: "/placeholder.svg?height=40&width=40", xp: 6980, university: "Delhi University" },
    { id: 5, name: "Vikram S.", avatar: "/placeholder.svg?height=40&width=40", xp: 6540, university: "IIT Bombay" },
  ]

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(120,80,255,0.4),transparent_40%)]"></div>
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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Learning Rewards</h2>
            <p className="text-gray-300">Earn XP, unlock achievements, and climb the ranks</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Sparkles className="mr-2 h-4 w-4" />
            View All Rewards
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                      <div className="h-20 w-20 rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">{userStats.level}</span>
                      </div>
                    </div>
                    <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-blue-600">
                      <Zap className="h-3 w-3 mr-1" />
                      {userStats.xp} XP
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-1">{userStats.rank}</h3>
                  <div className="w-full mt-2 mb-1">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Level {userStats.level}</span>
                      <span>Level {userStats.level + 1}</span>
                    </div>
                    <Progress
                      value={(userStats.xp / userStats.xpToNextLevel) * 100}
                      className="h-2 bg-gray-700"
                      indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{userStats.xp} XP</span>
                      <span>{userStats.xpToNextLevel} XP</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full mt-4">
                    <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Trophy className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="text-xl font-bold text-white">{userStats.badges}</div>
                      <div className="text-xs text-gray-400">Badges</div>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center mb-1">
                        <TrendingUp className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="text-xl font-bold text-white">#{userStats.position}</div>
                      <div className="text-xs text-gray-400">Ranking</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-3"
          >
            <Tabs defaultValue="challenges" className="h-full">
              <TabsList className="bg-gray-800/50 mb-4">
                <TabsTrigger value="challenges" className="data-[state=active]:bg-purple-600">
                  <Target className="h-4 w-4 mr-2" />
                  Daily Challenges
                </TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-600">
                  <Award className="h-4 w-4 mr-2" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-600">
                  <Trophy className="h-4 w-4 mr-2" />
                  Leaderboard
                </TabsTrigger>
              </TabsList>

              <TabsContent value="challenges" className="mt-0 h-full">
                <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white text-lg">Today's Challenges</CardTitle>
                      <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">
                        <Calendar className="h-3 w-3 mr-1" />
                        Resets in 8h 24m
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400">
                      Complete daily challenges to earn XP and rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dailyChallenges.map((challenge) => (
                        <div
                          key={challenge.id}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            challenge.completed
                              ? "bg-green-900/20 border border-green-500/30"
                              : "bg-gray-700/30 border border-gray-600/30"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`rounded-full p-2 ${
                                challenge.completed ? "bg-green-500/20 text-green-400" : "bg-gray-600/50 text-gray-300"
                              }`}
                            >
                              {challenge.completed ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : (
                                <Target className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{challenge.title}</h4>
                              <p className="text-sm text-gray-400">{challenge.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`${
                                challenge.completed
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : "bg-purple-500/20 text-purple-400 border-purple-500/30"
                              }`}
                            >
                              <Zap className="h-3 w-3 mr-1" />
                              {challenge.xp} XP
                            </Badge>
                            {!challenge.completed && (
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 h-8">
                                Start
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full flex justify-between items-center">
                      <div className="text-sm text-gray-400">
                        <span className="text-green-400 font-medium">1/4</span> challenges completed today
                      </div>
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        Claim Daily Bonus
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="mt-0 h-full">
                <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg">Your Achievements</CardTitle>
                    <CardDescription className="text-gray-400">
                      Track your progress and unlock special badges
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-3 rounded-lg border ${
                            achievement.completed
                              ? "bg-purple-900/20 border-purple-500/30"
                              : "bg-gray-700/30 border-gray-600/30"
                          }`}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div
                              className={`rounded-full p-2 ${
                                achievement.completed ? "bg-purple-500/20" : "bg-gray-600/50"
                              }`}
                            >
                              {achievement.icon}
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{achievement.title}</h4>
                              <p className="text-sm text-gray-400">{achievement.description}</p>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                              <span>
                                {achievement.completed ? "Completed" : `${achievement.current}/${achievement.total}`}
                              </span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <Progress
                              value={achievement.progress}
                              className="h-1.5 bg-gray-700"
                              indicatorClassName={`${
                                achievement.completed
                                  ? "bg-gradient-to-r from-purple-500 to-blue-500"
                                  : "bg-gradient-to-r from-gray-500 to-gray-400"
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-700/50">
                      View All Achievements
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="leaderboard" className="mt-0 h-full">
                <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white text-lg">Top Learners</CardTitle>
                      <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-500/30">
                        <Star className="h-3 w-3 mr-1" />
                        Weekly Ranking
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400">See how you compare to other students</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaderboard.map((user, index) => (
                        <div
                          key={user.id}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            index === 0
                              ? "bg-yellow-900/20 border border-yellow-500/30"
                              : index === 1
                                ? "bg-gray-500/20 border border-gray-400/30"
                                : index === 2
                                  ? "bg-amber-800/20 border border-amber-500/30"
                                  : "bg-gray-700/30 border border-gray-600/30"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <Avatar className="h-10 w-10 border border-gray-700">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="bg-purple-900/50 text-xs">
                                {user.name.split(" ")[0][0]}
                                {user.name.split(" ")[1][0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-white">{user.name}</h4>
                              <p className="text-xs text-gray-400">{user.university}</p>
                            </div>
                          </div>
                          <Badge
                            className={`${
                              index === 0
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-purple-500/20 text-purple-400 border-purple-500/30"
                            }`}
                          >
                            <Zap className="h-3 w-3 mr-1" />
                            {user.xp.toLocaleString()} XP
                          </Badge>
                        </div>
                      ))}

                      <div className="flex items-center justify-between p-3 rounded-lg bg-blue-900/20 border border-blue-500/30">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600/30 text-white font-bold text-sm">
                            {userStats.position}
                          </div>
                          <Avatar className="h-10 w-10 border-2 border-blue-500/50">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
                            <AvatarFallback className="bg-blue-900/50 text-xs">YOU</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-white">You</h4>
                            <p className="text-xs text-gray-400">Your University</p>
                          </div>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          <Zap className="h-3 w-3 mr-1" />
                          {userStats.xp.toLocaleString()} XP
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-700/50">
                      View Full Leaderboard
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

