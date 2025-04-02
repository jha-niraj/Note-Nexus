"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, FileText, X, Brain, Copy, Check, Volume2, PauseCircle, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface AiNoteSummarizerProps {
  noteTitle: string
  noteContent: string
  onClose: () => void
}

export default function AiNoteSummarizer({ noteTitle, noteContent, onClose }: AiNoteSummarizerProps) {
  const [summarizing, setSummarizing] = useState(false)
  const [summary, setSummary] = useState("")
  const [keyPoints, setKeyPoints] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  // Simulate AI summarization
  const generateSummary = () => {
    setSummarizing(true)

    // Mock progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    // Simulate API call delay
    setTimeout(() => {
      setSummarizing(false)
      setSummary(
        "This comprehensive guide covers relational database concepts including normalization, SQL queries, transaction management, and database design principles. It explains the theoretical foundations of DBMS while providing practical examples of implementation. The notes include diagrams of entity-relationship models and detailed explanations of query optimization techniques.",
      )
      setKeyPoints([
        "Covers normalization forms (1NF, 2NF, 3NF, BCNF)",
        "Explains transaction ACID properties with examples",
        "Details SQL syntax for complex queries and joins",
        "Includes database security best practices",
        "Provides case studies of real-world database implementations",
      ])
      setProgress(100)
    }, 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-2xl bg-gray-800/90 border-gray-700 text-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 pb-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">AI Note Summarizer</CardTitle>
                <CardDescription className="text-gray-300">Powered by advanced AI</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-300 hover:text-white">
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-blue-400" />
              <h3 className="font-medium text-lg">{noteTitle}</h3>
            </div>

            {!summary && !summarizing && (
              <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                <p className="text-gray-300 mb-4">
                  Generate an AI-powered summary of this note to quickly understand the key concepts.
                </p>
                <Button
                  onClick={generateSummary}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Summary
                </Button>
              </div>
            )}

            {summarizing && (
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Loader2 className="h-5 w-5 text-purple-400 animate-spin" />
                  <p className="text-gray-300">Analyzing and summarizing content...</p>
                </div>
                <Progress
                  value={progress}
                  className="h-1.5 bg-gray-600"
                  indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500"
                />
              </div>
            )}

            {summary && !summarizing && (
              <div className="space-y-4">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-white">Summary</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="h-8 text-gray-300 hover:text-white"
                    >
                      {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <p className="text-gray-300">{summary}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">Key Points</h4>
                    <Badge className="bg-purple-600">AI Generated</Badge>
                  </div>
                  <ul className="space-y-2">
                    {keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 bg-gray-700/30 p-2 rounded-md">
                        <span className="flex h-5 w-5 rounded-full bg-blue-600/20 text-blue-400 items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white flex items-center">
                      <Volume2 className="h-4 w-4 mr-2 text-blue-400" />
                      Audio Summary
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={togglePlayback}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      {isPlaying ? (
                        <>
                          <PauseCircle className="h-4 w-4 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Volume2 className="h-4 w-4 mr-1" />
                          Listen
                        </>
                      )}
                    </Button>
                  </div>
                  {isPlaying && (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse"></div>
                      </div>
                      <span className="text-xs text-gray-400">0:42 / 2:15</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-700 bg-gray-800/50 flex justify-between">
          <div className="text-xs text-gray-400">Powered by NoteNexus AI</div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={onClose}
            >
              Close
            </Button>
            {summary && (
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Download Full Notes
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

