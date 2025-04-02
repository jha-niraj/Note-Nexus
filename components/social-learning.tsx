"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, ChevronRight, UserPlus, BookOpen } from "lucide-react"

export default function SocialLearning() {
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
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(120,80,255,0.4),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="text-white">Learn Together, Achieve More</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Join study groups, participate in discussions, and collaborate with peers to enhance your learning
            experience
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Study Groups */}
          <motion.div variants={fadeIn}>
            <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className="h-5 w-5 text-purple-400" />
                  Popular Study Groups
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Join groups of students with similar interests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "DBMS Mastery",
                    members: 42,
                    university: "Punjab Technical University",
                    active: true,
                  },
                  {
                    name: "Algorithm Wizards",
                    members: 38,
                    university: "IIT Roorkee",
                    active: true,
                  },
                  {
                    name: "Marketing Minds",
                    members: 29,
                    university: "Himachal Pradesh University",
                    active: false,
                  },
                ].map((group, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-purple-500/30">
                        <AvatarFallback className="bg-purple-900/50 text-xs">
                          {group.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white">{group.name}</p>
                          {group.active && (
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{group.members} members</span>
                          </div>
                          <span>{group.university}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
                  View All Study Groups <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Discussion Forums */}
          <motion.div variants={fadeIn}>
            <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  Active Discussions
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Join conversations and get your questions answered
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Understanding Normalization in DBMS",
                    replies: 24,
                    lastActive: "10 min ago",
                    tags: ["DBMS", "Database"],
                  },
                  {
                    title: "Dynamic Programming Approach for Knapsack Problem",
                    replies: 18,
                    lastActive: "1 hour ago",
                    tags: ["Algorithms", "DP"],
                  },
                  {
                    title: "Digital Marketing Strategies for 2023",
                    replies: 32,
                    lastActive: "3 hours ago",
                    tags: ["Marketing", "Digital"],
                  },
                ].map((discussion, index) => (
                  <div key={index} className="bg-gray-700/30 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white">{discussion.title}</h4>
                      <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">
                        {discussion.replies} replies
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {discussion.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className="bg-gray-800/50 text-gray-300 border-gray-600 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{discussion.lastActive}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                  Browse All Discussions <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>

        {/* Collaborative Learning CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Create Your Own Study Group</h3>
                <p className="text-gray-300">
                  Form a study group with classmates, share notes, and prepare for exams together. Collaborative
                  learning improves retention and understanding.
                </p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 whitespace-nowrap">
              <Users className="mr-2 h-4 w-4" />
              Start a Group
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

