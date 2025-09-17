"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Target,
  ArrowLeft,
  Mic,
  Video,
  Play,
  Pause,
  Square,
  RotateCcw,
  Clock,
  HelpCircle,
  CheckCircle,
  SkipForward,
} from "lucide-react"

interface Question {
  id: number
  text: string
  type: "Behavioral" | "Technical" | "Situational" | "Company-Specific"
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  hint: string
}

export default function PracticePage() {
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode") || "audio"
  const questionId = searchParams.get("question")
  const setId = searchParams.get("set")

  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [hasRecorded, setHasRecorded] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Sample questions data
  const allQuestions: Question[] = [
    {
      id: 1,
      text: "Tell me about yourself.",
      type: "Behavioral",
      category: "Introduction",
      difficulty: "Easy",
      hint: "Structure your answer with: current role, relevant experience, key achievements, and why you're interested in this position. Keep it concise (2-3 minutes).",
    },
    {
      id: 2,
      text: "Describe a time when you had to work with a difficult team member.",
      type: "Behavioral",
      category: "Teamwork",
      difficulty: "Medium",
      hint: "Use the STAR method: Situation (context), Task (what needed to be done), Action (what you did), Result (outcome). Focus on your communication skills and conflict resolution approach.",
    },
    {
      id: 3,
      text: "Explain the difference between REST and GraphQL APIs.",
      type: "Technical",
      category: "Web Development",
      difficulty: "Medium",
      hint: "Cover key differences: data fetching (multiple requests vs single request), over/under-fetching, caching, learning curve, and use cases for each.",
    },
  ]

  // Get questions based on URL parameters
  const getQuestions = () => {
    if (questionId) {
      const question = allQuestions.find((q) => q.id === Number.parseInt(questionId))
      return question ? [question] : [allQuestions[0]]
    }

    if (setId) {
      switch (setId) {
        case "behavioral-basics":
          return allQuestions.filter((q) => q.type === "Behavioral")
        case "tech-prep":
          return allQuestions.filter((q) => q.type === "Technical")
        case "popular-mix":
          return allQuestions.slice(0, 3)
        default:
          return allQuestions.slice(0, 3)
      }
    }

    return [allQuestions[0]]
  }

  const questions = getQuestions()
  const currentQuestion = questions[currentQuestionIndex]

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const constraints = mode === "video" ? { video: true, audio: true } : { audio: true }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream

      if (mode === "video" && videoRef.current) {
        videoRef.current.srcObject = stream
      }

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.start()
      setIsRecording(true)
      setIsPaused(false)

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)

      // Simulate real-time transcription
      setTimeout(() => {
        setTranscript("Um, so...")
      }, 3000)
    } catch (error) {
      console.error("Error starting recording:", error)
    }
  }

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume()
        intervalRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1)
        }, 1000)
      } else {
        mediaRecorderRef.current.pause()
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
      setIsPaused(!isPaused)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsPaused(false)
      setHasRecorded(true)

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      // Simulate complete transcription based on question type
      if (currentQuestion.type === "Behavioral") {
        setTranscript(
          "Um, so there was this one time when I was working on a project with a team member who was consistently missing deadlines and not communicating effectively. The situation was affecting the entire team's morale and our project timeline. I decided to approach them privately first to understand if there were any underlying issues. It turned out they were overwhelmed with personal matters. I worked with them to create a more manageable schedule and offered to help redistribute some tasks. As a result, we were able to complete the project on time and the team member became more engaged and communicative.",
        )
      } else if (currentQuestion.type === "Technical") {
        setTranscript(
          "So REST and GraphQL are both API architectures but they work quite differently. REST uses multiple endpoints for different resources, like /users, /posts, /comments, and you might need to make several requests to get all the data you need. GraphQL, on the other hand, has a single endpoint and you can request exactly the data you need in one query. This helps avoid over-fetching or under-fetching data. REST is simpler to understand and implement, while GraphQL gives you more flexibility but has a steeper learning curve.",
        )
      } else {
        setTranscript(
          "Well, I'm really excited about this opportunity because I've been following your company's work in the industry and I'm impressed by your commitment to innovation and user experience. From my research, I can see that you're tackling some really interesting challenges, and I believe my background in software development and my passion for creating user-friendly solutions would be a great fit for your team.",
        )
      }
    }
  }

  const resetRecording = () => {
    setRecordingTime(0)
    setHasRecorded(false)
    setTranscript("")
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      resetRecording()
      setShowHint(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Practice Session</h1>
            </div>
          </div>
          <Badge variant="secondary" className="capitalize">
            {mode} Mode
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Question and Recording Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </CardTitle>
                    <CardDescription>
                      <Badge variant="outline" className="mr-2">
                        {currentQuestion.type}
                      </Badge>
                      <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                        {currentQuestion.difficulty}
                      </Badge>
                      <span className="ml-2">{currentQuestion.category}</span>
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowHint(!showHint)}>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    {showHint ? "Hide" : "Show"} Hint
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-foreground mb-4">{currentQuestion.text}</p>
                {showHint && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">{currentQuestion.hint}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recording Interface */}
            <Card>
              <CardHeader>
                <CardTitle>Recording</CardTitle>
                <CardDescription>{mode === "video" ? "Video and audio" : "Audio only"} recording</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Video Preview */}
                  {mode === "video" && (
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Recording Controls */}
                  <div className="flex items-center justify-center space-x-4">
                    {!isRecording && !hasRecorded && (
                      <Button onClick={startRecording} size="lg" className="px-8">
                        {mode === "video" ? <Video className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
                        Start Recording
                      </Button>
                    )}

                    {isRecording && (
                      <>
                        <Button onClick={pauseRecording} variant="outline" size="lg">
                          {isPaused ? <Play className="w-5 h-5 mr-2" /> : <Pause className="w-5 h-5 mr-2" />}
                          {isPaused ? "Resume" : "Pause"}
                        </Button>
                        <Button onClick={stopRecording} variant="destructive" size="lg">
                          <Square className="w-5 h-5 mr-2" />
                          Stop
                        </Button>
                      </>
                    )}

                    {hasRecorded && (
                      <>
                        <Button onClick={resetRecording} variant="outline" size="lg">
                          <RotateCcw className="w-5 h-5 mr-2" />
                          Record Again
                        </Button>
                        {currentQuestionIndex < questions.length - 1 ? (
                          <Button onClick={nextQuestion} size="lg">
                            <SkipForward className="w-5 h-5 mr-2" />
                            Next Question
                          </Button>
                        ) : (
                          <Button asChild size="lg">
                            <Link href="/analysis">
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Get Feedback
                            </Link>
                          </Button>
                        )}
                      </>
                    )}
                  </div>

                  {/* Recording Timer */}
                  {(isRecording || hasRecorded) && (
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 text-lg font-mono">
                        <Clock className="w-5 h-5" />
                        <span>{formatTime(recordingTime)}</span>
                      </div>
                      {isRecording && (
                        <div className="flex items-center justify-center mt-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2" />
                          <span className="text-sm text-muted-foreground">{isPaused ? "Paused" : "Recording"}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Transcript */}
            <Card>
              <CardHeader>
                <CardTitle>Live Transcript</CardTitle>
                <CardDescription>Real-time speech-to-text</CardDescription>
              </CardHeader>
              <CardContent>
                {transcript ? (
                  <div className="bg-muted/50 p-4 rounded-lg max-h-40 overflow-y-auto">
                    <p className="text-sm">{transcript}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Start recording to see your transcript appear here...</p>
                )}
              </CardContent>
            </Card>

            {/* Session Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Session Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Questions Completed</span>
                      <span>
                        {currentQuestionIndex + (hasRecorded ? 1 : 0)}/{questions.length}
                      </span>
                    </div>
                    <Progress value={((currentQuestionIndex + (hasRecorded ? 1 : 0)) / questions.length) * 100} />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentQuestionIndex < questions.length - 1
                      ? "Complete this question to continue"
                      : "Complete this question to finish your session"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Recording Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Speak clearly and at a moderate pace</li>
                  <li>• Maintain good posture and eye contact</li>
                  <li>• Take a moment to think before answering</li>
                  <li>• Use specific examples in your responses</li>
                  {currentQuestion.type === "Behavioral" && <li>• Structure answers using the STAR method</li>}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
