"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, Mic, Brain, BarChart3 } from "lucide-react"
import { useState, useEffect } from "react"

interface AnalysisLoadingProps {
  stage: "transcribing" | "analyzing" | "generating"
}

export function AnalysisLoading({ stage }: AnalysisLoadingProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (stage === "transcribing" && prev < 40) return prev + 2
        if (stage === "analyzing" && prev < 80) return prev + 1.5
        if (stage === "generating" && prev < 100) return prev + 3
        return prev
      })
    }, 100)

    return () => clearInterval(interval)
  }, [stage])

  const getStageInfo = () => {
    switch (stage) {
      case "transcribing":
        return {
          title: "Transcribing Audio",
          description: "Converting your speech to text...",
          icon: <Mic className="w-6 h-6" />,
        }
      case "analyzing":
        return {
          title: "Analyzing Response",
          description: "AI is evaluating your content and delivery...",
          icon: <Brain className="w-6 h-6" />,
        }
      case "generating":
        return {
          title: "Generating Feedback",
          description: "Creating personalized insights and suggestions...",
          icon: <BarChart3 className="w-6 h-6" />,
        }
    }
  }

  const stageInfo = getStageInfo()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <div className="animate-spin">
                <Loader2 className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>
          <CardTitle className="flex items-center justify-center space-x-2">
            {stageInfo.icon}
            <span>{stageInfo.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">{stageInfo.description}</p>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center space-x-3">
              <div
                className={`w-2 h-2 rounded-full ${stage === "transcribing" ? "bg-primary animate-pulse" : progress > 30 ? "bg-green-500" : "bg-muted"}`}
              />
              <span>Speech-to-text conversion</span>
            </div>
            <div className="flex items-center space-x-3">
              <div
                className={`w-2 h-2 rounded-full ${stage === "analyzing" ? "bg-primary animate-pulse" : progress > 60 ? "bg-green-500" : "bg-muted"}`}
              />
              <span>Content and delivery analysis</span>
            </div>
            <div className="flex items-center space-x-3">
              <div
                className={`w-2 h-2 rounded-full ${stage === "generating" ? "bg-primary animate-pulse" : progress > 90 ? "bg-green-500" : "bg-muted"}`}
              />
              <span>Personalized feedback generation</span>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              Our AI analyzes your response across multiple dimensions including content quality, delivery, confidence,
              and structure to provide comprehensive feedback.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
