"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, X, Send, Maximize2, Minimize2 } from "lucide-react"

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi there! I'm your NoteNexus AI assistant. How can I help you today?",
    },
  ])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: message }])

    // Clear input
    setMessage("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      let botResponse = ""

      if (message.toLowerCase().includes("dbms") || message.toLowerCase().includes("database")) {
        botResponse =
          "I found several DBMS notes from top universities. Would you like me to show you the most popular ones or help you with a specific DBMS concept?"
      } else if (message.toLowerCase().includes("summarize")) {
        botResponse =
          "I can summarize your notes using AI. Just upload the document or paste the text you want to summarize."
      } else if (message.toLowerCase().includes("exam") || message.toLowerCase().includes("test")) {
        botResponse =
          "I can help you prepare for exams by creating practice questions or a study schedule. What subject are you studying for?"
      } else {
        botResponse =
          "I can help you find notes, summarize content, create study plans, or answer questions about your courses. What would you like to know more about?"
      }

      setMessages((prev) => [...prev, { role: "bot", content: botResponse }])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg z-50"
          onClick={toggleChat}
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-80 rounded-xl bg-gray-800/95 border border-gray-700 shadow-xl transition-all duration-300 ${
            isMinimized ? "h-14" : "h-[450px]"
          }`}
        >
          <CardHeader className="p-3 border-b border-gray-700 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-gradient-to-r from-purple-600 to-blue-600">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-medium">NoteNexus AI</h3>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleMinimize}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleChat}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-3 overflow-y-auto h-[330px] space-y-3">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-start gap-2`}
                  >
                    {msg.role === "bot" && (
                      <Avatar className="h-7 w-7 bg-gradient-to-r from-purple-600 to-blue-600 mt-0.5">
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg p-2 max-w-[85%] text-sm ${
                        msg.role === "user" ? "bg-purple-600/20 text-purple-100" : "bg-gray-700/70 text-gray-200"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === "user" && (
                      <Avatar className="h-7 w-7 bg-gray-700 mt-0.5">
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </CardContent>

              <CardFooter className="p-3 border-t border-gray-700">
                <div className="flex w-full gap-2">
                  <Input
                    placeholder="Ask me anything..."
                    className="flex-1 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 h-9 w-9 p-0"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </div>
      )}
    </>
  )
}

