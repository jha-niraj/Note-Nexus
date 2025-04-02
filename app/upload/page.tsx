"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Upload, FileText, Clock, User, Building2, ArrowLeft, Plus } from "lucide-react"
import UploadNotesModal from "@/components/upload-notes-modal"

export default function UploadPage() {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [activeTab, setActiveTab] = useState("my-notes")

  // Sample user notes data
  const myNotes = [
    {
      id: 1,
      title: "Database Management Systems",
      subject: "Computer Science",
      university: "Punjab Technical University",
      uploadDate: "2 days ago",
      downloads: 45,
      isPrivate: false,
      coverImage: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Advanced Algorithms",
      subject: "Computer Science",
      university: "IIT Roorkee",
      uploadDate: "1 week ago",
      downloads: 128,
      isPrivate: false,
      coverImage: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Marketing Research Methods",
      subject: "Business Administration",
      university: "Himachal Pradesh University",
      uploadDate: "3 weeks ago",
      downloads: 0,
      isPrivate: true,
      coverImage: "/placeholder.svg?height=200&width=400",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-[#0f0b25] text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(120,80,255,0.15),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(60,180,255,0.15),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-24 pb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-2 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white">My Notes</h1>
            <p className="text-gray-300 mt-2">Upload, manage, and share your study materials</p>
          </div>
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            onClick={() => setShowUploadModal(true)}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload New Notes
          </Button>
        </div>

        <Tabs defaultValue="my-notes" value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="bg-gray-800/50 p-1 rounded-full w-fit mb-8">
            <TabsTrigger
              value="my-notes"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
            >
              <User className="mr-2 h-4 w-4" />
              My Notes
            </TabsTrigger>
            <TabsTrigger
              value="public"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Public Notes
            </TabsTrigger>
            <TabsTrigger
              value="private"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 transition-all duration-300"
            >
              <FileText className="mr-2 h-4 w-4" />
              Private Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-notes" className="mt-0">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Upload Card */}
              <motion.div variants={fadeIn}>
                <Card
                  className="bg-gray-800/40 backdrop-blur-sm border-gray-700 border-dashed hover:border-purple-500/50 transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] h-full cursor-pointer group"
                  onClick={() => setShowUploadModal(true)}
                >
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div className="h-16 w-16 rounded-full bg-purple-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Plus className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">Upload New Notes</h3>
                    <p className="text-gray-400 mb-4">Share your knowledge with the community</p>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Notes
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Notes Cards */}
              {myNotes.map((note) => (
                <motion.div key={note.id} variants={fadeIn}>
                  <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] group">
                    <div className="relative h-40 bg-gray-900">
                      <img
                        src={note.coverImage || "/placeholder.svg"}
                        alt={note.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                      {note.isPrivate && (
                        <Badge className="absolute top-2 right-2 bg-purple-600/90 text-white">Private</Badge>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                        {note.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {note.subject} • {note.university}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 mr-1" />
                          <span>Uploaded {note.uploadDate}</span>
                        </div>
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 text-gray-500 mr-1" />
                          <span>{note.downloads} downloads</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600">
                          View
                        </Button>
                        <Button variant="outline" className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700/50">
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="public" className="mt-0">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {myNotes
                .filter((note) => !note.isPrivate)
                .map((note) => (
                  <motion.div key={note.id} variants={fadeIn}>
                    <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] group">
                      <div className="relative h-40 bg-gray-900">
                        <img
                          src={note.coverImage || "/placeholder.svg"}
                          alt={note.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                          {note.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {note.subject} • {note.university}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-500 mr-1" />
                            <span>Uploaded {note.uploadDate}</span>
                          </div>
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{note.downloads} downloads</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600">
                            View
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700/50"
                          >
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="private" className="mt-0">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {myNotes
                .filter((note) => note.isPrivate)
                .map((note) => (
                  <motion.div key={note.id} variants={fadeIn}>
                    <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] group">
                      <div className="relative h-40 bg-gray-900">
                        <img
                          src={note.coverImage || "/placeholder.svg"}
                          alt={note.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <Badge className="absolute top-2 right-2 bg-purple-600/90 text-white">Private</Badge>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                          {note.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {note.subject} • {note.university}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-500 mr-1" />
                            <span>Uploaded {note.uploadDate}</span>
                          </div>
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{note.downloads} downloads</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600">
                            View
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700/50"
                          >
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Notes Modal */}
      <UploadNotesModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} />
    </div>
  )
}

