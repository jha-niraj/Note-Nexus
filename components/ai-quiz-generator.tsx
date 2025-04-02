"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Brain, ChevronRight, ChevronLeft, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface AIQuizGeneratorProps {
  onClose: () => void
}

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  userAnswer?: number
}

export default function AIQuizGenerator({ onClose }: AIQuizGeneratorProps) {
  const [step, setStep] = useState<"input" | "generating" | "quiz" | "results">("input")
  const [topic, setTopic] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [numQuestions, setNumQuestions] = useState("10")
  const [notes, setNotes] = useState("")
  const [generationProgress, setGenerationProgress] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const { toast } = useToast()

  // Sample generated questions with explanations
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: "What is normalization in database design?",
      options: [
        "A process to increase database size",
        "A process to organize data to minimize redundancy",
        "A process to convert data to normal forms",
        "A process to optimize query performance",
      ],
      correctAnswer: 1,
      explanation:
        "Normalization is a database design technique that organizes tables to minimize redundancy. It involves dividing large tables into smaller ones and defining relationships between them using foreign keys. This helps maintain data integrity and reduces data anomalies during insertions, updates, and deletions.",
    },
    {
      id: 2,
      question: "Which normal form deals with transitive dependencies?",
      options: [
        "First Normal Form (1NF)",
        "Second Normal Form (2NF)",
        "Third Normal Form (3NF)",
        "Boyce-Codd Normal Form (BCNF)",
      ],
      correctAnswer: 2,
      explanation:
        "Third Normal Form (3NF) specifically addresses transitive dependencies. A table is in 3NF if it is already in 2NF and all non-key attributes are functionally dependent only on the primary key, not on other non-key attributes. This eliminates transitive dependencies where a non-key attribute depends on another non-key attribute.",
    },
    {
      id: 3,
      question: "What is a foreign key in a relational database?",
      options: [
        "A key used for encryption",
        "A field that uniquely identifies each record in a table",
        "A field that links to the primary key of another table",
        "A key imported from another database system",
      ],
      correctAnswer: 2,
      explanation:
        "A foreign key is a field (or collection of fields) in one table that refers to the primary key in another table. It creates a link between the two tables, establishing a relationship. Foreign keys are used to enforce referential integrity, ensuring that relationships between tables remain consistent.",
    },
    {
      id: 4,
      question: "Which SQL statement is used to retrieve data from a database?",
      options: ["GET", "SELECT", "FETCH", "RETRIEVE"],
      correctAnswer: 1,
      explanation:
        "The SELECT statement is used to retrieve data from a database. It is one of the most fundamental SQL commands and allows you to specify which columns you want to retrieve, which tables to get data from, and conditions for filtering the data. The basic syntax is: SELECT column1, column2 FROM table_name WHERE condition;",
    },
    {
      id: 5,
      question: "What is a transaction in database systems?",
      options: [
        "A fee charged for database operations",
        "A unit of work performed against a database",
        "A transfer of data between tables",
        "A method to translate SQL to machine code",
      ],
      correctAnswer: 1,
      explanation:
        "A transaction is a logical unit of work that contains one or more SQL statements. A transaction is an atomic unit, which means either all of its operations are performed or none. Transactions follow ACID properties (Atomicity, Consistency, Isolation, Durability) to ensure reliable processing of database operations even in case of system failures.",
    },
  ])

  const handleStartGeneration = () => {
    if (!topic && !notes) {
      toast({
        title: "Input required",
        description: "Please enter a topic or upload notes to generate a quiz.",
        variant: "destructive",
      })
      return
    }

    setStep("generating")

    // Simulate generation progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setGenerationProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setStep("quiz")
      }
    }, 200)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const updatedQuestions = [...questions]
    updatedQuestions[currentQuestionIndex].userAnswer = answerIndex
    setQuestions(updatedQuestions)
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    setShowExplanation(false)
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setStep("results")
    }
  }

  const handlePrevQuestion = () => {
    setShowExplanation(false)
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateScore = () => {
    const correctAnswers = questions.filter((q) => q.userAnswer === q.correctAnswer).length
    return {
      score: correctAnswers,
      total: questions.length,
      percentage: Math.round((correctAnswers / questions.length) * 100),
    }
  }

  const handleRetakeQuiz = () => {
    // Reset user answers
    const resetQuestions = questions.map((q) => ({ ...q, userAnswer: undefined }))
    setQuestions(resetQuestions)
    setCurrentQuestionIndex(0)
    setShowExplanation(false)
    setStep("quiz")
  }

  const handleNewQuiz = () => {
    setTopic("")
    setNotes("")
    setDifficulty("medium")
    setNumQuestions("10")
    setCurrentQuestionIndex(0)
    setShowExplanation(false)
    setStep("input")
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-gray-900 rounded-xl border border-gray-800 shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <h2 className="text-lg font-semibold text-white">AI Quiz Generator</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {step === "input" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Generate a Quiz</h3>
                  <p className="text-gray-400">
                    Our AI will create a custom quiz based on your topic or notes. The more specific you are, the better
                    the quiz will be.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="topic">Topic</Label>
                    <Input
                      id="topic"
                      placeholder="E.g., Database Normalization, SQL Queries"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Or paste your notes (optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Paste your study notes here for a more personalized quiz..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 mt-1 min-h-[150px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <select
                        id="difficulty"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full h-10 px-3 rounded-md bg-gray-800/50 border border-gray-700 text-white mt-1"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="numQuestions">Number of Questions</Label>
                      <select
                        id="numQuestions"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(e.target.value)}
                        className="w-full h-10 px-3 rounded-md bg-gray-800/50 border border-gray-700 text-white mt-1"
                      >
                        <option value="5">5 questions</option>
                        <option value="10">10 questions</option>
                        <option value="15">15 questions</option>
                        <option value="20">20 questions</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Brain className="h-5 w-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-300 mb-1">AI-Generated Explanations</h4>
                      <p className="text-sm text-purple-200/70">
                        Each question will include a detailed explanation of the correct answer to help you understand
                        the concept better.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === "generating" && (
              <div className="flex flex-col items-center justify-center h-full py-10">
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="h-10 w-10 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Generating Your Quiz</h3>
                <p className="text-gray-400 mb-6 text-center max-w-md">
                  Our AI is creating personalized questions based on your input. This may take a moment...
                </p>
                <div className="w-full max-w-md mb-2">
                  <Progress value={generationProgress} className="h-2 bg-gray-700" />
                </div>
                <p className="text-sm text-gray-500">{generationProgress}% complete</p>
              </div>
            )}

            {step === "quiz" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="h-8 px-2 border-gray-700"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextQuestion}
                      className="h-8 px-2 border-gray-700"
                    >
                      {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">{questions[currentQuestionIndex].question}</h3>
                  <RadioGroup className="space-y-3">
                    {questions[currentQuestionIndex].options.map((option, index) => (
                      <div key={index} className="flex items-start">
                        <RadioGroupItem
                          value={index.toString()}
                          id={`option-${index}`}
                          checked={questions[currentQuestionIndex].userAnswer === index}
                          onClick={() => handleAnswerSelect(index)}
                          className="mt-1"
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className={`ml-2 cursor-pointer ${
                            showExplanation
                              ? questions[currentQuestionIndex].correctAnswer === index
                                ? "text-green-400"
                                : questions[currentQuestionIndex].userAnswer === index
                                  ? "text-red-400"
                                  : "text-white"
                              : "text-white"
                          }`}
                        >
                          {option}
                          {showExplanation && questions[currentQuestionIndex].correctAnswer === index && (
                            <CheckCircle className="inline-block ml-2 h-4 w-4 text-green-400" />
                          )}
                          {showExplanation &&
                            questions[currentQuestionIndex].userAnswer === index &&
                            questions[currentQuestionIndex].correctAnswer !== index && (
                              <XCircle className="inline-block ml-2 h-4 w-4 text-red-400" />
                            )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Explanation Section */}
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {questions[currentQuestionIndex].userAnswer ===
                        questions[currentQuestionIndex].correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">
                          {questions[currentQuestionIndex].userAnswer === questions[currentQuestionIndex].correctAnswer
                            ? "Correct!"
                            : "Incorrect"}
                        </h4>
                        <div className="text-sm text-gray-300 mb-2">
                          <span className="font-medium">Explanation: </span>
                          {questions[currentQuestionIndex].explanation}
                        </div>
                        <div className="text-sm text-gray-400">
                          <span className="font-medium">Correct answer: </span>
                          {questions[currentQuestionIndex].options[questions[currentQuestionIndex].correctAnswer]}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="mt-6">
                  <Progress
                    value={((currentQuestionIndex + 1) / questions.length) * 100}
                    className="h-1.5 bg-gray-700"
                  />
                </div>
              </div>
            )}

            {step === "results" && (
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Quiz Results</h3>
                  <p className="text-gray-400">You've completed the quiz on {topic || "Database Management"}</p>
                </div>

                <div className="flex justify-center mb-8">
                  <div className="relative w-40 h-40">
                    <div className="absolute inset-0 rounded-full border-8 border-gray-700"></div>
                    <div
                      className="absolute inset-0 rounded-full border-8 border-transparent border-t-purple-500"
                      style={{
                        transform: `rotate(${calculateScore().percentage * 3.6}deg)`,
                        transition: "transform 1s ease-out",
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold text-white">{calculateScore().percentage}%</span>
                      <span className="text-sm text-gray-400">
                        {calculateScore().score}/{calculateScore().total}
                      </span>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="review">Review Answers</TabsTrigger>
                  </TabsList>
                  <TabsContent value="summary">
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardHeader>
                        <CardTitle>Performance Summary</CardTitle>
                        <CardDescription>Here's how you did on this quiz</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Correct Answers</span>
                          <span className="text-green-400 font-medium">{calculateScore().score}</span>
                        </div>
                        <Separator className="bg-gray-700" />
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Incorrect Answers</span>
                          <span className="text-red-400 font-medium">
                            {calculateScore().total - calculateScore().score}
                          </span>
                        </div>
                        <Separator className="bg-gray-700" />
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Total Questions</span>
                          <span className="text-white font-medium">{calculateScore().total}</span>
                        </div>
                        <Separator className="bg-gray-700" />
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Score</span>
                          <span className="text-purple-400 font-medium">{calculateScore().percentage}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="review">
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                      {questions.map((q, index) => (
                        <Card key={q.id} className="bg-gray-800/50 border-gray-700">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-base">Question {index + 1}</CardTitle>
                              {q.userAnswer === q.correctAnswer ? (
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  Correct
                                </Badge>
                              ) : (
                                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                  <XCircle className="mr-1 h-3 w-3" />
                                  Incorrect
                                </Badge>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-white mb-2">{q.question}</p>
                            <div className="text-sm text-gray-300 mb-2">
                              <span className="font-medium">Your answer: </span>
                              {q.userAnswer !== undefined ? q.options[q.userAnswer] : "Not answered"}
                            </div>
                            <div className="text-sm text-green-400 mb-2">
                              <span className="font-medium">Correct answer: </span>
                              {q.options[q.correctAnswer]}
                            </div>
                            <div className="text-sm text-gray-400 mt-2 bg-gray-800 p-2 rounded-md">
                              <span className="font-medium">Explanation: </span>
                              {q.explanation}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-800 p-4">
            {step === "input" && (
              <div className="flex justify-end">
                <Button onClick={handleStartGeneration} className="button-gradient">
                  <Brain className="mr-2 h-4 w-4" />
                  Generate Quiz
                </Button>
              </div>
            )}

            {step === "generating" && (
              <div className="flex justify-end">
                <Button disabled className="bg-gray-700 text-gray-300 cursor-not-allowed">
                  Generating...
                </Button>
              </div>
            )}

            {step === "results" && (
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleNewQuiz} className="button-outline-purple">
                  Create New Quiz
                </Button>
                <Button onClick={handleRetakeQuiz} className="button-gradient">
                  Retake Quiz
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

