export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Quiz {
  id: number
  title: string
  subject: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  timeLimit: number
  questionCount: number
  author: string
  rating: number
  attempts: number
  description: string
  image: string
  tags: string[]
  questions: QuizQuestion[]
}

