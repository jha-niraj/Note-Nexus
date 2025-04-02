"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  X,
  Upload,
  FileText,
  File,
  ImageIcon,
  CheckCircle2,
  AlertCircle,
  Tag,
  BookOpen,
  Sparkles,
  Lock,
  Clock,
  Loader2,
} from "lucide-react"

interface UploadNotesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UploadNotesModal({ isOpen, onClose }: UploadNotesModalProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "details" | "preview">("upload")
  const [files, setFiles] = useState<File[]>([])
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [university, setUniversity] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const coverImageInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFiles = (selectedFiles: File[]) => {
    // Filter for acceptable file types (PDF, DOCX, etc.)
    const acceptedFiles = selectedFiles.filter(
      (file) =>
        file.type === "application/pdf" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword" ||
        file.type === "application/vnd.ms-powerpoint" ||
        file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    )

    if (acceptedFiles.length !== selectedFiles.length) {
      toast({
        title: "Invalid file type",
        description: "Only PDF, Word, and PowerPoint files are accepted",
        variant: "destructive",
      })
    }

    setFiles((prev) => [...prev, ...acceptedFiles])
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleCoverImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file for the cover",
          variant: "destructive",
        })
        return
      }

      setCoverImage(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setCoverImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const removeCoverImage = () => {
    setCoverImage(null)
    setCoverImagePreview(null)
  }

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags((prev) => [...prev, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const handleNextStep = () => {
    if (activeTab === "upload") {
      if (files.length === 0) {
        toast({
          title: "No files selected",
          description: "Please upload at least one file to continue",
          variant: "destructive",
        })
        return
      }
      setActiveTab("details")
    } else if (activeTab === "details") {
      if (!title || !subject) {
        toast({
          title: "Missing information",
          description: "Please provide a title and subject to continue",
          variant: "destructive",
        })
        return
      }
      setActiveTab("preview")
    }
  }

  const handlePreviousStep = () => {
    if (activeTab === "details") {
      setActiveTab("upload")
    } else if (activeTab === "preview") {
      setActiveTab("details")
    }
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)
    setUploadError(null)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)
      setIsUploading(false)
      setUploadComplete(true)

      toast({
        title: "Upload successful!",
        description: "Your notes have been uploaded successfully",
      })
    }, 4000)
  }

  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf") {
      return <FileText className="h-5 w-5 text-red-400" />
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword"
    ) {
      return <FileText className="h-5 w-5 text-blue-400" />
    } else if (
      file.type === "application/vnd.ms-powerpoint" ||
      file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      return <FileText className="h-5 w-5 text-orange-400" />
    }
    return <File className="h-5 w-5 text-gray-400" />
  }

  const getFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl"
      >
        <Card className="bg-gray-800/90 border-gray-700 text-white overflow-hidden shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">Upload Notes</CardTitle>
                <CardDescription className="text-gray-300">Share your knowledge with the community</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-300 hover:text-white">
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
              <TabsList className="bg-gray-700/50 mb-6 grid grid-cols-3">
                <TabsTrigger
                  value="upload"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600"
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600"
                  disabled={isUploading}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Add Details
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600"
                  disabled={isUploading}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Preview & Submit
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-0 space-y-6">
                <div
                  className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-purple-500/50 transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Drag & Drop Your Files Here</h3>
                  <p className="text-gray-400 mb-4 max-w-md mx-auto">
                    Upload PDF, Word, or PowerPoint files containing your notes, study materials, or assignments
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={handleFileSelect}
                    multiple
                    ref={fileInputRef}
                  />
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Browse Files
                  </Button>
                </div>

                {files.length > 0 && (
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-3">Selected Files ({files.length})</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-800/70 rounded-md p-3">
                          <div className="flex items-center gap-3">
                            {getFileIcon(file)}
                            <div className="overflow-hidden">
                              <p className="text-sm font-medium text-white truncate">{file.name}</p>
                              <p className="text-xs text-gray-400">{getFileSize(file.size)}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-3">Cover Image (Optional)</h4>
                  {!coverImagePreview ? (
                    <div className="flex items-center justify-center border border-dashed border-gray-600 rounded-md h-40 bg-gray-800/50">
                      <div className="text-center">
                        <ImageIcon className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-400 mb-2">Add a cover image for your notes</p>
                        <input
                          type="file"
                          id="cover-image-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleCoverImageSelect}
                          ref={coverImageInputRef}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300"
                          onClick={() => coverImageInputRef.current?.click()}
                        >
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Select Image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={coverImagePreview || "/placeholder.svg"}
                        alt="Cover preview"
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={removeCoverImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-gray-300">
                        Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        placeholder="e.g., Database Management Systems Notes"
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-300">
                        Subject <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="subject"
                        placeholder="e.g., Computer Science"
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="university" className="text-gray-300">
                        University/College
                      </Label>
                      <Input
                        id="university"
                        placeholder="e.g., Punjab Technical University"
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-gray-300">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Provide a brief description of your notes..."
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500 min-h-[120px]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags" className="text-gray-300">
                        Tags
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="tags"
                          placeholder="Add tags (press Enter)"
                          className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          onKeyDown={handleTagKeyDown}
                        />
                        <Button
                          variant="outline"
                          className="border-gray-600 text-gray-300"
                          onClick={addTag}
                          disabled={!currentTag.trim()}
                        >
                          <Tag className="h-4 w-4" />
                        </Button>
                      </div>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="bg-purple-500/10 text-purple-400 border-purple-500/30 flex items-center gap-1"
                            >
                              {tag}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0 text-purple-400 hover:text-purple-300 hover:bg-transparent"
                                onClick={() => removeTag(tag)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="private"
                          checked={isPrivate}
                          onCheckedChange={setIsPrivate}
                          className="data-[state=checked]:bg-purple-600"
                        />
                        <Label htmlFor="private" className="text-gray-300 cursor-pointer">
                          Private Notes
                        </Label>
                      </div>
                      <div>
                        {isPrivate ? (
                          <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">
                            <Lock className="h-3 w-3 mr-1" />
                            Private
                          </Badge>
                        ) : (
                          <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                            <BookOpen className="h-3 w-3 mr-1" />
                            Public
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="mt-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-gray-700/30 rounded-lg overflow-hidden">
                      {coverImagePreview ? (
                        <img
                          src={coverImagePreview || "/placeholder.svg"}
                          alt="Cover preview"
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="h-48 bg-gray-800/70 flex items-center justify-center">
                          <BookOpen className="h-12 w-12 text-gray-600" />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-white mb-1">{title || "Untitled Notes"}</h3>
                        <p className="text-sm text-gray-400 mb-2">
                          {subject && university
                            ? `${subject} • ${university}`
                            : subject || university || "No subject specified"}
                        </p>
                        <p className="text-sm text-gray-300 mb-3 line-clamp-3">
                          {description || "No description provided"}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {tags.length > 0 ? (
                            tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="bg-purple-500/10 text-purple-400 border-purple-500/30"
                              >
                                {tag}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-xs text-gray-400">No tags added</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Just now</span>
                          </div>
                          <div>
                            {isPrivate ? (
                              <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">
                                <Lock className="h-3 w-3 mr-1" />
                                Private
                              </Badge>
                            ) : (
                              <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                                <BookOpen className="h-3 w-3 mr-1" />
                                Public
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-3">Files ({files.length})</h4>
                      <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-800/70 rounded-md p-3">
                            <div className="flex items-center gap-3">
                              {getFileIcon(file)}
                              <div className="overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">{file.name}</p>
                                <p className="text-xs text-gray-400">{getFileSize(file.size)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {uploadComplete ? (
                      <div className="mt-4 bg-green-900/20 border border-green-700/30 rounded-lg p-4 text-center">
                        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <h4 className="text-lg font-medium text-white mb-1">Upload Complete!</h4>
                        <p className="text-gray-300 mb-4">Your notes have been successfully uploaded</p>
                        <div className="flex justify-center gap-3">
                          <Button variant="outline" className="border-gray-600 text-gray-300" onClick={onClose}>
                            Close
                          </Button>
                          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                            <BookOpen className="h-4 w-4 mr-2" />
                            View My Notes
                          </Button>
                        </div>
                      </div>
                    ) : uploadError ? (
                      <div className="mt-4 bg-red-900/20 border border-red-700/30 rounded-lg p-4 text-center">
                        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
                        <h4 className="text-lg font-medium text-white mb-1">Upload Failed</h4>
                        <p className="text-gray-300 mb-4">{uploadError}</p>
                        <Button
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          onClick={simulateUpload}
                        >
                          Try Again
                        </Button>
                      </div>
                    ) : isUploading ? (
                      <div className="mt-4 bg-gray-800/50 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-3 text-center">Uploading Notes...</h4>
                        <Progress
                          value={uploadProgress}
                          className="h-2 mb-2 bg-gray-700"
                          indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500"
                        />
                        <p className="text-center text-sm text-gray-400">{uploadProgress}% Complete</p>
                      </div>
                    ) : (
                      <div className="mt-4 bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Sparkles className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-white mb-1">Ready to Share Your Knowledge?</h4>
                            <p className="text-sm text-gray-300">
                              Your notes will help fellow students excel in their studies. Click the button below to
                              upload.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="border-t border-gray-700 bg-gray-800/50 flex justify-between p-6">
            {activeTab !== "upload" && !uploadComplete ? (
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={handlePreviousStep}
                disabled={isUploading}
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}

            {activeTab !== "preview" ? (
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={handleNextStep}
                disabled={isUploading}
              >
                Continue
              </Button>
            ) : !uploadComplete && !isUploading ? (
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={simulateUpload}
              >
                Upload Notes
              </Button>
            ) : isUploading ? (
              <Button className="bg-gray-700 text-gray-300" disabled>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </Button>
            ) : null}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

