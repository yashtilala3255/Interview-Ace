"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AnalysisLoading } from "@/components/analysis-loading"

export default function AnalysisPage() {
  const searchParams = useSearchParams()
  const [stage, setStage] = useState<"transcribing" | "analyzing" | "generating">("transcribing")

  useEffect(() => {
    // Simulate the analysis pipeline stages
    const timer1 = setTimeout(() => setStage("analyzing"), 3000)
    const timer2 = setTimeout(() => setStage("generating"), 6000)
    const timer3 = setTimeout(() => {
      // Redirect to feedback page after analysis is complete
      window.location.href = "/feedback"
    }, 9000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return <AnalysisLoading stage={stage} />
}
