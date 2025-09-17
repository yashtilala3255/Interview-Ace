import { type NextRequest, NextResponse } from "next/server"

interface AnalysisRequest {
  transcript: string
  question: string
  questionType: string
  audioMetrics?: {
    duration: number
    pauseCount: number
    fillerWords: string[]
    speechRate: number
  }
}

interface AnalysisResponse {
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
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalysisRequest = await request.json()
    const { transcript, question, questionType, audioMetrics } = body

    // Simulate AI analysis processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Analyze filler words
    const fillerWords = ["um", "uh", "like", "you know", "so", "actually", "basically", "literally"]
    const foundFillers: string[] = []
    let fillerCount = 0

    fillerWords.forEach((filler) => {
      const regex = new RegExp(`\\b${filler}\\b`, "gi")
      const matches = transcript.match(regex)
      if (matches) {
        fillerCount += matches.length
        foundFillers.push(`${filler} (${matches.length})`)
      }
    })

    // Calculate speech metrics
    const wordCount = transcript.split(" ").length
    const duration = audioMetrics?.duration || 120 // Default 2 minutes
    const speechRate = (wordCount / duration) * 60 // Words per minute

    // Generate scores based on content analysis
    const contentScore = analyzeContent(transcript, question, questionType)
    const fluencyScore = analyzeFluency(transcript, fillerCount, speechRate)
    const confidenceScore = analyzeConfidence(transcript, fillerCount)
    const clarityScore = analyzeClarity(transcript, wordCount)
    const overallScore = contentScore * 0.4 + fluencyScore * 0.25 + confidenceScore * 0.2 + clarityScore * 0.15

    // Generate feedback
    const feedback = generateFeedback(transcript, questionType, {
      content: contentScore,
      fluency: fluencyScore,
      confidence: confidenceScore,
      clarity: clarityScore,
    })

    // Generate improved answer
    const improvedAnswer = generateImprovedAnswer(transcript, question, questionType)

    const response: AnalysisResponse = {
      scores: {
        content: Math.round(contentScore * 10) / 10,
        fluency: Math.round(fluencyScore * 10) / 10,
        confidence: Math.round(confidenceScore * 10) / 10,
        clarity: Math.round(clarityScore * 10) / 10,
        overall: Math.round(overallScore * 10) / 10,
      },
      feedback,
      detailedAnalysis: {
        contentAnalysis: generateContentAnalysis(transcript, questionType),
        deliveryAnalysis: generateDeliveryAnalysis(fillerCount, speechRate),
        structureAnalysis: generateStructureAnalysis(transcript, questionType),
      },
      improvedAnswer,
      fillerWordAnalysis: {
        count: fillerCount,
        words: foundFillers,
        impact: getFillerImpact(fillerCount, wordCount),
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze response" }, { status: 500 })
  }
}

function analyzeContent(transcript: string, question: string, questionType: string): number {
  const wordCount = transcript.split(" ").length
  let score = 5.0 // Base score

  // Length analysis
  if (wordCount < 50) score -= 1.5
  else if (wordCount > 200) score += 1.0
  else if (wordCount > 100) score += 0.5

  // Question type specific analysis
  if (questionType === "Behavioral") {
    if (transcript.toLowerCase().includes("situation") || transcript.toLowerCase().includes("example")) score += 0.5
    if (transcript.toLowerCase().includes("result") || transcript.toLowerCase().includes("outcome")) score += 0.5
    if (transcript.toLowerCase().includes("learned") || transcript.toLowerCase().includes("improved")) score += 0.3
  } else if (questionType === "Technical") {
    if (transcript.includes("API") || transcript.includes("database") || transcript.includes("framework")) score += 0.5
    if (transcript.includes("example") || transcript.includes("implementation")) score += 0.3
  }

  // Specificity bonus
  if (transcript.includes("specifically") || transcript.includes("for example") || transcript.includes("such as")) {
    score += 0.5
  }

  return Math.min(Math.max(score, 1.0), 10.0)
}

function analyzeFluency(transcript: string, fillerCount: number, speechRate: number): number {
  let score = 8.0 // Start high for fluency

  // Filler word penalty
  const fillerRatio = fillerCount / transcript.split(" ").length
  if (fillerRatio > 0.1) score -= 2.0
  else if (fillerRatio > 0.05) score -= 1.0
  else if (fillerRatio > 0.02) score -= 0.5

  // Speech rate analysis (optimal: 140-180 WPM)
  if (speechRate < 100 || speechRate > 200) score -= 1.0
  else if (speechRate < 120 || speechRate > 180) score -= 0.5

  return Math.min(Math.max(score, 1.0), 10.0)
}

function analyzeConfidence(transcript: string, fillerCount: number): number {
  let score = 7.0 // Base confidence score

  // Confidence indicators
  if (transcript.includes("I believe") || transcript.includes("I'm confident")) score += 0.5
  if (transcript.includes("definitely") || transcript.includes("certainly")) score += 0.3

  // Uncertainty indicators
  if (transcript.includes("I think maybe") || transcript.includes("I'm not sure")) score -= 1.0
  if (transcript.includes("probably") || transcript.includes("might")) score -= 0.3

  // Filler word impact on confidence
  if (fillerCount > 10) score -= 1.5
  else if (fillerCount > 5) score -= 0.8

  return Math.min(Math.max(score, 1.0), 10.0)
}

function analyzeClarity(transcript: string, wordCount: number): number {
  let score = 7.5 // Base clarity score

  // Sentence structure (approximate)
  const sentences = transcript.split(/[.!?]+/).length
  const avgWordsPerSentence = wordCount / sentences

  if (avgWordsPerSentence > 25)
    score -= 1.0 // Too long sentences
  else if (avgWordsPerSentence < 8) score -= 0.5 // Too short sentences

  // Clear transitions
  if (transcript.includes("first") || transcript.includes("then") || transcript.includes("finally")) score += 0.5
  if (transcript.includes("however") || transcript.includes("therefore") || transcript.includes("as a result")) {
    score += 0.3
  }

  return Math.min(Math.max(score, 1.0), 10.0)
}

function generateFeedback(
  transcript: string,
  questionType: string,
  scores: { content: number; fluency: number; confidence: number; clarity: number },
) {
  const strengths: string[] = []
  const improvements: string[] = []
  const suggestions: string[] = []

  // Content feedback
  if (scores.content >= 8) {
    strengths.push("Strong content with relevant details and examples")
  } else if (scores.content < 6) {
    improvements.push("Add more specific examples and details to support your points")
    suggestions.push("Use the STAR method (Situation, Task, Action, Result) for behavioral questions")
  }

  // Fluency feedback
  if (scores.fluency >= 8) {
    strengths.push("Smooth delivery with minimal hesitation")
  } else if (scores.fluency < 6) {
    improvements.push("Reduce filler words and practice smoother transitions")
    suggestions.push("Practice your answers out loud to improve flow and reduce hesitation")
  }

  // Confidence feedback
  if (scores.confidence >= 8) {
    strengths.push("Confident and assertive communication style")
  } else if (scores.confidence < 6) {
    improvements.push("Use more definitive language and avoid uncertain phrases")
    suggestions.push("Practice power poses before interviews to boost confidence")
  }

  // Clarity feedback
  if (scores.clarity >= 8) {
    strengths.push("Clear and well-structured response")
  } else if (scores.clarity < 6) {
    improvements.push("Organize your thoughts with clearer structure and transitions")
    suggestions.push("Outline your key points before speaking to improve organization")
  }

  // Question-specific suggestions
  if (questionType === "Behavioral") {
    suggestions.push("Focus on quantifiable results and lessons learned")
  } else if (questionType === "Technical") {
    suggestions.push("Include specific technologies and explain your reasoning")
  }

  return { strengths, improvements, suggestions }
}

function generateContentAnalysis(transcript: string, questionType: string): string {
  const wordCount = transcript.split(" ").length

  if (questionType === "Behavioral") {
    return `Your response demonstrates ${
      wordCount > 150 ? "comprehensive" : "adequate"
    } coverage of the behavioral scenario. ${
      transcript.toLowerCase().includes("result") || transcript.toLowerCase().includes("outcome")
        ? "You effectively concluded with results, which strengthens your answer."
        : "Consider adding more details about the outcome and what you learned from the experience."
    }`
  } else if (questionType === "Technical") {
    return `Your technical explanation shows ${
      transcript.includes("example") ? "good use of examples" : "room for more concrete examples"
    }. ${
      wordCount > 100
        ? "The depth of your response demonstrates solid understanding."
        : "Consider expanding with more technical details and use cases."
    }`
  }

  return `Your response provides ${
    wordCount > 100 ? "substantial" : "basic"
  } coverage of the topic. Focus on adding more specific examples and details to strengthen your answer.`
}

function generateDeliveryAnalysis(fillerCount: number, speechRate: number): string {
  let analysis = ""

  if (fillerCount <= 3) {
    analysis += "Excellent control of filler words, maintaining professional delivery. "
  } else if (fillerCount <= 8) {
    analysis += "Moderate use of filler words - focus on pausing instead of using fillers. "
  } else {
    analysis += "High frequency of filler words detected - practice eliminating these for more polished delivery. "
  }

  if (speechRate >= 140 && speechRate <= 180) {
    analysis += "Your speaking pace is well-balanced and easy to follow."
  } else if (speechRate < 140) {
    analysis += "Consider speaking slightly faster to maintain engagement."
  } else {
    analysis += "Try slowing down slightly to ensure clarity and comprehension."
  }

  return analysis
}

function generateStructureAnalysis(transcript: string, questionType: string): string {
  const hasTransitions = transcript.includes("first") || transcript.includes("then") || transcript.includes("finally")
  const hasConclusion =
    transcript.includes("result") || transcript.includes("conclusion") || transcript.includes("learned")

  let analysis = ""

  if (questionType === "Behavioral") {
    analysis = hasTransitions
      ? "Good use of structural elements to organize your response. "
      : "Consider using clearer transitions (first, then, finally) to improve structure. "

    analysis += hasConclusion
      ? "Strong conclusion with results and learnings."
      : "Add a clear conclusion highlighting the outcome and what you learned."
  } else {
    analysis = hasTransitions
      ? "Well-organized response with clear progression of ideas. "
      : "Improve structure by using transitional phrases to connect your points. "

    analysis += "Consider organizing technical responses with: definition, explanation, example, and application."
  }

  return analysis
}

function generateImprovedAnswer(transcript: string, question: string, questionType: string): string {
  if (questionType === "Behavioral") {
    return `Here's an improved version of your response:

"I'd like to share a specific example from my previous role. [Situation] When working on a critical project, I encountered a team member who was consistently missing deadlines, which was impacting our entire team's progress. [Task] As the project lead, I needed to address this issue while maintaining team morale and meeting our deadline.

[Action] I first approached the team member privately to understand the root cause. I discovered they were overwhelmed with multiple priorities. I worked with them to reorganize their workload, provided additional resources, and established daily check-ins to monitor progress. I also communicated with stakeholders about adjusted timelines where necessary.

[Result] As a result, we not only met our project deadline but the team member became one of our most reliable contributors. This experience taught me the importance of proactive communication and understanding individual challenges before making assumptions."`
  }

  return `Here's an enhanced version of your response:

Start with a clear definition or overview, then provide specific examples with concrete details. Structure your answer logically, use transitional phrases to connect ideas, and conclude with practical applications or implications. Remember to speak confidently and minimize filler words for maximum impact.`
}

function getFillerImpact(fillerCount: number, wordCount: number): string {
  const ratio = fillerCount / wordCount

  if (ratio < 0.02) return "Minimal impact - excellent control of speech patterns"
  if (ratio < 0.05) return "Low impact - minor distraction from your message"
  if (ratio < 0.1) return "Moderate impact - noticeable but manageable"
  return "High impact - significantly affects professional impression"
}
