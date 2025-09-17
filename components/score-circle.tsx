"use client"

interface ScoreCircleProps {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function ScoreCircle({ score, size = "md", showLabel = false }: ScoreCircleProps) {
  const getSize = () => {
    switch (size) {
      case "sm":
        return "w-16 h-16"
      case "md":
        return "w-20 h-20"
      case "lg":
        return "w-24 h-24"
    }
  }

  const getTextSize = () => {
    switch (size) {
      case "sm":
        return "text-lg"
      case "md":
        return "text-xl"
      case "lg":
        return "text-2xl"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 border-green-200"
    if (score >= 6) return "text-yellow-600 border-yellow-200"
    return "text-red-600 border-red-200"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 8.5) return "Excellent"
    if (score >= 7.5) return "Good"
    if (score >= 6.5) return "Fair"
    if (score >= 5.5) return "Needs Work"
    return "Poor"
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={`${getSize()} rounded-full border-4 flex items-center justify-center ${getScoreColor(score)}`}>
        <span className={`font-bold ${getTextSize()}`}>{score}</span>
      </div>
      {showLabel && <span className="text-sm text-muted-foreground">{getScoreLabel(score)}</span>}
    </div>
  )
}
