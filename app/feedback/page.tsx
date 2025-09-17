"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  ArrowLeft,
  Play,
  Download,
  Share2,
  TrendingUp,
  Brain,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  RotateCcw,
  BookOpen,
} from "lucide-react"

interface FeedbackData {
  scores: {
    content: number
    fluency: number
    confidence: number
    clarity: number
    overall: number
  }
  feedback: {
    strengths: string[]
    improvements: string[]
    suggestions: string[]
  }
  detailedAnalysis: {
    contentAnalysis: string
    deliveryAnalysis: string
    structureAnalysis: string
  }
  improvedAnswer: string
  fillerWordAnalysis: {
    count: number
    words: string[]
    impact: string
  }
  question: {
    text: string
    type: string
    category: string
  }
  transcript: string
  duration: string
  recordingDate: string
}

export default function FeedbackPage() {
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading feedback data
    setTimeout(() => {
      setFeedbackData({
        scores: {
          content: 8.2,
          fluency: 7.5,
          confidence: 6.8,
          clarity: 8.0,
          overall: 7.6,
        },
        feedback: {
          strengths: [
            "Strong content with relevant details and examples",
            "Clear and well-structured response",
            "Good use of specific examples to illustrate points",
          ],
          improvements: [
            "Reduce filler words to improve professional delivery",
            "Use more definitive language to sound more confident",
            "Practice smoother transitions between ideas",
          ],
          suggestions: [
            "Practice the STAR method for behavioral questions",
            "Record yourself regularly to identify speech patterns",
            "Use strategic pauses instead of filler words",
            "Prepare 2-3 strong examples for common behavioral questions",
          ],
        },
        detailedAnalysis: {
          contentAnalysis:
            "Your response demonstrates comprehensive coverage of the behavioral scenario. You effectively concluded with results, which strengthens your answer. The specific details about working with the team member and the outcome show good storytelling ability.",
          deliveryAnalysis:
            "Moderate use of filler words detected - focus on pausing instead of using fillers. Your speaking pace is well-balanced and easy to follow. Consider practicing elimination of 'um' and 'uh' for more polished delivery.",
          structureAnalysis:
            "Good use of structural elements to organize your response. Strong conclusion with results and learnings. Your answer follows a logical progression that makes it easy for the interviewer to follow your thought process.",
        },
        improvedAnswer: `Here's an improved version of your response:

"I'd like to share a specific example from my previous role. When working on a critical project, I encountered a team member who was consistently missing deadlines, which was impacting our entire team's progress. As the project lead, I needed to address this issue while maintaining team morale and meeting our deadline.

I first approached the team member privately to understand the root cause. I discovered they were overwhelmed with multiple priorities. I worked with them to reorganize their workload, provided additional resources, and established daily check-ins to monitor progress. I also communicated with stakeholders about adjusted timelines where necessary.

As a result, we not only met our project deadline but the team member became one of our most reliable contributors. This experience taught me the importance of proactive communication and understanding individual challenges before making assumptions."`,
        fillerWordAnalysis: {
          count: 8,
          words: ["um (3)", "uh (2)", "like (2)", "so (1)"],
          impact: "Moderate impact - noticeable but manageable",
        },
        question: {
          text: "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
          type: "Behavioral",
          category: "Teamwork",
        },
        transcript:
          "Um, so there was this one time when I was working on a project with a team member who was consistently missing deadlines and not communicating effectively. The situation was affecting the entire team's morale and our project timeline. I decided to approach them privately first to understand if there were any underlying issues. It turned out they were overwhelmed with personal matters. I worked with them to create a more manageable schedule and offered to help redistribute some tasks. As a result, we were able to complete the project on time and the team member became more engaged and communicative.",
        duration: "2:45",
        recordingDate: "January 15, 2024",
      })
      setIsLoading(false)
    }, 1500)
  }, [])

  if (isLoading || !feedbackData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Loading Your Feedback</h2>
          <p className="text-muted-foreground">Analyzing your interview response...</p>
        </div>
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600"
    if (score >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 8.5) return "Excellent"
    if (score >= 7.5) return "Good"
    if (score >= 6.5) return "Fair"
    if (score >= 5.5) return "Needs Work"
    return "Poor"
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
              <h1 className="text-xl font-bold text-foreground">Interview Feedback</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button asChild>
              <Link href="/practice">
                <RotateCcw className="w-4 h-4 mr-2" />
                Practice Again
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overall Score Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    Overall Score: {feedbackData.scores.overall}/10
                  </h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    {getScoreLabel(feedbackData.scores.overall)} performance on this interview question
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Duration: {feedbackData.duration}</span>
                    <span>•</span>
                    <span>Recorded: {feedbackData.recordingDate}</span>
                    <span>•</span>
                    <Badge variant="outline">{feedbackData.question.type}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-24 h-24 rounded-full border-8 border-primary/20 flex items-center justify-center mb-4">
                    <span className={`text-2xl font-bold ${getScoreColor(feedbackData.scores.overall)}`}>
                      {feedbackData.scores.overall}
                    </span>
                  </div>
                  <Button asChild size="sm">
                    <Link href="/practice">Practice More</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Context */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Question Practiced</CardTitle>
            <CardDescription>
              {feedbackData.question.type} • {feedbackData.question.category}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-foreground">{feedbackData.question.text}</p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="scores" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="scores">Scores</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="improved">Improved</TabsTrigger>
              </TabsList>

              <TabsContent value="scores" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Scores</CardTitle>
                    <CardDescription>Breakdown of your performance across key areas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Content Quality</span>
                          <span className={`font-bold ${getScoreColor(feedbackData.scores.content)}`}>
                            {feedbackData.scores.content}/10
                          </span>
                        </div>
                        <Progress value={feedbackData.scores.content * 10} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-1">
                          Relevance, depth, and examples in your response
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Fluency</span>
                          <span className={`font-bold ${getScoreColor(feedbackData.scores.fluency)}`}>
                            {feedbackData.scores.fluency}/10
                          </span>
                        </div>
                        <Progress value={feedbackData.scores.fluency * 10} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-1">Speech flow and filler word usage</p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Confidence</span>
                          <span className={`font-bold ${getScoreColor(feedbackData.scores.confidence)}`}>
                            {feedbackData.scores.confidence}/10
                          </span>
                        </div>
                        <Progress value={feedbackData.scores.confidence * 10} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-1">Assertiveness and certainty in delivery</p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Clarity</span>
                          <span className={`font-bold ${getScoreColor(feedbackData.scores.clarity)}`}>
                            {feedbackData.scores.clarity}/10
                          </span>
                        </div>
                        <Progress value={feedbackData.scores.clarity * 10} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-1">Organization and structure of response</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Filler Word Analysis</CardTitle>
                    <CardDescription>Impact of filler words on your delivery</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold">{feedbackData.fillerWordAnalysis.count}</span>
                      <Badge variant="secondary">Filler Words Detected</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {feedbackData.fillerWordAnalysis.words.map((word, index) => (
                          <Badge key={index} variant="outline">
                            {word}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{feedbackData.fillerWordAnalysis.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feedback" className="space-y-6">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Strengths</span>
                      </CardTitle>
                      <CardDescription>What you did well in this response</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feedbackData.feedback.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        <span>Areas for Improvement</span>
                      </CardTitle>
                      <CardDescription>Specific areas to focus on for better performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feedbackData.feedback.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Lightbulb className="w-5 h-5 text-blue-600" />
                        <span>Actionable Suggestions</span>
                      </CardTitle>
                      <CardDescription>Specific steps to improve your interview skills</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feedbackData.feedback.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Analysis</CardTitle>
                    <CardDescription>Evaluation of your response content and relevance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{feedbackData.detailedAnalysis.contentAnalysis}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Analysis</CardTitle>
                    <CardDescription>Assessment of your speaking style and vocal delivery</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{feedbackData.detailedAnalysis.deliveryAnalysis}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Structure Analysis</CardTitle>
                    <CardDescription>Review of your response organization and flow</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{feedbackData.detailedAnalysis.structureAnalysis}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="improved" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Improved Answer Example</CardTitle>
                    <CardDescription>A refined version of your response incorporating best practices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                        {feedbackData.improvedAnswer}
                      </pre>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Key Improvements:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Clear STAR structure (Situation, Task, Action, Result)</li>
                        <li>• Eliminated filler words for smoother delivery</li>
                        <li>• Added specific details and quantifiable outcomes</li>
                        <li>• Concluded with lessons learned and personal growth</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Response</CardTitle>
                <CardDescription>Original transcript</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-lg max-h-40 overflow-y-auto">
                  <p className="text-sm leading-relaxed">{feedbackData.transcript}</p>
                </div>
                <Button variant="ghost" size="sm" className="mt-3 w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Play Recording
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/practice">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Practice This Question Again
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/questions">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Try Similar Questions
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/history">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Progress
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Based on your confidence score, try practicing power poses for 2 minutes before your next session to
                  boost your assertiveness and reduce uncertainty in your responses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
