export interface Note {
  id: number
  title: string
  university: string
  downloads: number
  author: string
  rating: number
  image: string
  tags: string[]
  preview: string
  category: string
  subject: string
  pages: number
  fileSize: string
  fileType: string
  uploadDate: string
  lastUpdated: string
  language: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

