"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Users, Send, X, ThumbsUp, Reply, FileText } from "lucide-react"

interface LiveDiscussionForumProps {
  noteTitle: string
  onClose: () => void
}

export default function LiveDiscussionForum({ noteTitle, onClose }: LiveDiscussionForumProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: {
        name: "Rahul Mehta",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "IIT Roorkee",
      },
      text: "Can someone explain the concept of normalization in DBMS? I'm struggling with understanding the difference between 2NF and 3NF.",
      time: "10:32 AM",
      likes: 3,
      replies: [],
    },
    {
      id: 2,
      user: {
        name: "Priya Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "Punjab Technical University",
      },
      text: "3NF builds on 2NF by removing transitive dependencies. In 2NF, non-key attributes depend on the whole primary key, while 3NF ensures they depend ONLY on the primary key and not on other non-key attributes.",
      time: "10:45 AM",
      likes: 5,
      replies: [],
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "Your University",
      },
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      likes: 0,
      replies: [],
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-3xl h-[80vh] bg-gray-800/90 border-gray-700 text-white overflow-hidden flex flex-col">
        <CardHeader className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 pb-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Live Discussion Forum</CardTitle>
                <CardDescription className="text-gray-300 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {noteTitle}
                </CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-300 hover:text-white">
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <div className="flex items-center justify-between px-6 py-2 border-b border-gray-700 bg-gray-800/70">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-gray-300">42 participants online</span>
          </div>
          <Badge className="bg-green-600/20 text-green-400 border-green-500/30">Live</Badge>
        </div>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.user.name === "You" ? "justify-end" : ""}`}>
              {msg.user.name !== "You" && (
                <Avatar className="h-8 w-8 border border-gray-700">
                  <AvatarImage src={msg.user.avatar} alt={msg.user.name} />
                  <AvatarFallback className="bg-blue-900/50 text-xs">
                    {msg.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-[80%] ${msg.user.name === "You" ? "order-first" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  {msg.user.name !== "You" && (
                    <>
                      <span className="text-sm font-medium text-white">{msg.user.name}</span>
                      <span className="text-xs text-gray-400">{msg.user.university}</span>
                    </>
                  )}
                  <span className="text-xs text-gray-500">{msg.time}</span>
                </div>
                <div
                  className={`rounded-lg p-3 ${
                    msg.user.name === "You" ? "bg-purple-600/20 text-purple-100" : "bg-gray-700/50 text-gray-200"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    {msg.likes > 0 && <span>{msg.likes}</span>}
                  </button>
                  <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                    <Reply className="h-3 w-3" />
                    Reply
                  </button>
                </div>
              </div>
              {msg.user.name === "You" && (
                <Avatar className="h-8 w-8 border border-gray-700">
                  <AvatarImage src={msg.user.avatar} alt={msg.user.name} />
                  <AvatarFallback className="bg-purple-900/50 text-xs">You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
        <CardFooter className="border-t border-gray-700 bg-gray-800/70 p-4">
          <div className="flex w-full gap-2">
            <Input
              placeholder="Type your message..."
              className="flex-1 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              size="icon"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

