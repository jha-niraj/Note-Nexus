"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload, Camera, X, Copy, Check, Download, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface HandwrittenScannerProps {
  onClose: () => void
}

export default function HandwrittenScanner({ onClose }: HandwrittenScannerProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "camera">("upload")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [progress, setProgress] = useState(0)
  const [scannedText, setScannedText] = useState("")
  const [copied, setCopied] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleScan = () => {
    if (!preview) return

    setScanning(true)
    setProgress(0)

    // Simulate scanning progress
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
      setScanning(false)
      setScanned(true)
      setScannedText(
        `Database Management Systems (DBMS)

1. Introduction to DBMS
   - A database is a collection of related data
   - DBMS is software that manages databases
   - Provides interface between data and applications

2. Relational Database Concepts
   - Tables (relations) store data in rows and columns
   - Primary keys uniquely identify records
   - Foreign keys establish relationships between tables

3. Normalization
   - 1NF: Eliminate repeating groups
   - 2NF: Remove partial dependencies
   - 3NF: Remove transitive dependencies
   - BCNF: More stringent form of 3NF

4. SQL Fundamentals
   - SELECT, INSERT, UPDATE, DELETE operations
   - JOIN operations for combining data from multiple tables
   - Aggregate functions: COUNT, SUM, AVG, MIN, MAX`,
      )
      setProgress(100)
    }, 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(scannedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setFile(null)
    setPreview(null)
    setScanned(false)
    setScannedText("")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-4xl bg-gray-800/90 border-gray-700 text-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-900/50 to-amber-900/50 pb-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Handwritten Notes Scanner</CardTitle>
                <CardDescription className="text-gray-300">
                  Convert handwritten notes to digital text with AI
                </CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-300 hover:text-white">
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs
            defaultValue="upload"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "upload" | "camera")}
            className="w-full"
          >
            <TabsList className="bg-gray-700/50 mb-6">
              <TabsTrigger value="upload" className="data-[state=active]:bg-orange-600">
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </TabsTrigger>
              <TabsTrigger value="camera" className="data-[state=active]:bg-orange-600">
                <Camera className="h-4 w-4 mr-2" />
                Use Camera
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-0">
              {!preview ? (
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Upload Handwritten Notes</h3>
                  <p className="text-gray-400 mb-4 max-w-md mx-auto">
                    Upload an image of your handwritten notes to convert them to digital text. Supported formats: JPG,
                    PNG, PDF
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/jpeg,image/png,application/pdf"
                    onChange={handleFileChange}
                  />
                  <Button
                    className="bg-orange-600 hover:bg-orange-700"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full object-contain max-h-[300px]"
                      />
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" className="border-gray-700 text-gray-300" onClick={handleReset}>
                        Reset
                      </Button>
                      <Button
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={handleScan}
                        disabled={scanning || scanned}
                      >
                        {scanning ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Scanning...
                          </>
                        ) : (
                          <>
                            <FileText className="h-4 w-4 mr-2" />
                            Scan Text
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div>
                    {scanning && (
                      <div className="bg-gray-700/50 rounded-lg p-4 h-full flex flex-col justify-center">
                        <div className="text-center mb-4">
                          <Loader2 className="h-8 w-8 text-orange-500 mx-auto mb-2 animate-spin" />
                          <p className="text-gray-300">Analyzing and extracting text...</p>
                        </div>
                        <Progress
                          value={progress}
                          className="h-2 bg-gray-600"
                          indicatorClassName="bg-gradient-to-r from-orange-500 to-amber-500"
                        />
                        <p className="text-center text-sm text-gray-400 mt-2">Processing image with AI</p>
                      </div>
                    )}

                    {scanned && (
                      <div className="bg-gray-700/50 rounded-lg p-4 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-white">Extracted Text</h3>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-gray-600 text-gray-300"
                              onClick={handleCopy}
                            >
                              {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                              {copied ? "Copied" : "Copy"}
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 border-gray-600 text-gray-300">
                              <Download className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                          </div>
                        </div>
                        <div className="bg-gray-800 rounded-md p-3 flex-1 overflow-y-auto text-sm text-gray-300 whitespace-pre-line">
                          {scannedText}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="camera" className="mt-0">
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                <Camera className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Use Camera</h3>
                <p className="text-gray-400 mb-4 max-w-md mx-auto">
                  Take a photo of your handwritten notes using your device's camera
                </p>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Camera className="h-4 w-4 mr-2" />
                  Open Camera
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t border-gray-700 bg-gray-800/50 flex justify-between p-6">
          <div className="text-xs text-gray-400">Powered by NoteNexus AI OCR Technology</div>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={onClose}>
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

