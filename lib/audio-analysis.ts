export interface AudioMetrics {
  duration: number
  speechRate: number // words per minute
  pauseCount: number
  averagePauseLength: number
  fillerWords: string[]
  volumeVariation: number
  pitchVariation: number
}

export interface TranscriptWord {
  word: string
  start: number
  end: number
  confidence: number
}

export function analyzeAudioMetrics(transcript: string, timestamps: TranscriptWord[], duration: number): AudioMetrics {
  const words = transcript.split(" ")
  const speechRate = (words.length / duration) * 60

  // Detect pauses (gaps > 0.5 seconds between words)
  const pauses = []
  for (let i = 1; i < timestamps.length; i++) {
    const gap = timestamps[i].start - timestamps[i - 1].end
    if (gap > 0.5) {
      pauses.push(gap)
    }
  }

  // Detect filler words
  const fillerWords = ["um", "uh", "like", "you know", "so", "actually", "basically", "literally"]
  const foundFillers: string[] = []

  fillerWords.forEach((filler) => {
    const regex = new RegExp(`\\b${filler}\\b`, "gi")
    const matches = transcript.match(regex)
    if (matches) {
      foundFillers.push(...matches)
    }
  })

  // Calculate confidence-based metrics (simulated)
  const avgConfidence = timestamps.reduce((sum, word) => sum + word.confidence, 0) / timestamps.length
  const volumeVariation = Math.random() * 0.3 + 0.1 // Simulated
  const pitchVariation = Math.random() * 0.4 + 0.2 // Simulated

  return {
    duration,
    speechRate,
    pauseCount: pauses.length,
    averagePauseLength: pauses.length > 0 ? pauses.reduce((a, b) => a + b, 0) / pauses.length : 0,
    fillerWords: foundFillers,
    volumeVariation,
    pitchVariation,
  }
}

export function generateAudioFeedback(metrics: AudioMetrics): {
  strengths: string[]
  improvements: string[]
  suggestions: string[]
} {
  const strengths: string[] = []
  const improvements: string[] = []
  const suggestions: string[] = []

  // Speech rate analysis
  if (metrics.speechRate >= 140 && metrics.speechRate <= 180) {
    strengths.push("Optimal speaking pace that's easy to follow")
  } else if (metrics.speechRate < 120) {
    improvements.push("Speaking pace is quite slow - consider increasing tempo")
    suggestions.push("Practice with a metronome or timer to maintain consistent pace")
  } else if (metrics.speechRate > 200) {
    improvements.push("Speaking pace is very fast - slow down for better comprehension")
    suggestions.push("Take deliberate pauses between key points to improve clarity")
  }

  // Pause analysis
  if (metrics.pauseCount > 0 && metrics.averagePauseLength < 2.0) {
    strengths.push("Good use of strategic pauses for emphasis")
  } else if (metrics.pauseCount === 0) {
    suggestions.push("Use strategic pauses to emphasize key points and improve delivery")
  } else if (metrics.averagePauseLength > 3.0) {
    improvements.push("Some pauses are quite long - practice smoother transitions")
  }

  // Filler word analysis
  const fillerRatio = metrics.fillerWords.length / ((metrics.duration * metrics.speechRate) / 60)
  if (fillerRatio < 0.02) {
    strengths.push("Excellent control of filler words")
  } else if (fillerRatio > 0.1) {
    improvements.push("High frequency of filler words affects professional delivery")
    suggestions.push("Practice replacing filler words with brief pauses")
  }

  return { strengths, improvements, suggestions }
}
