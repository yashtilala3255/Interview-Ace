import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get("audio") as File

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 })
    }

    // Simulate transcription processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // In a real implementation, you would:
    // 1. Convert the audio file to the required format
    // 2. Send it to a speech-to-text service (Whisper, Google Speech-to-Text, etc.)
    // 3. Return the transcript with timestamps

    // For demo purposes, return a simulated transcript based on file size/duration
    const fileSize = audioFile.size
    let transcript = ""

    if (fileSize > 500000) {
      // Longer response
      transcript = `Um, so there was this one time when I was working on a project with a team member who was consistently missing deadlines and not communicating effectively. The situation was affecting the entire team's morale and our project timeline. I decided to approach them privately first to understand if there were any underlying issues. It turned out they were overwhelmed with personal matters. I worked with them to create a more manageable schedule and offered to help redistribute some tasks. As a result, we were able to complete the project on time and the team member became more engaged and communicative. This experience taught me the importance of proactive communication and understanding individual challenges before making assumptions about performance issues.`
    } else {
      // Shorter response
      transcript = `Well, I'm really excited about this opportunity because I've been following your company's work in the industry and I'm impressed by your commitment to innovation and user experience. From my research, I can see that you're tackling some really interesting challenges, and I believe my background in software development and my passion for creating user-friendly solutions would be a great fit for your team.`
    }

    // Simulate word-level timestamps (in a real implementation, these would come from the ASR service)
    const words = transcript.split(" ")
    const timestamps = words.map((word, index) => ({
      word,
      start: index * 0.5,
      end: (index + 1) * 0.5,
      confidence: 0.85 + Math.random() * 0.15,
    }))

    return NextResponse.json({
      transcript,
      timestamps,
      duration: words.length * 0.5,
      confidence: 0.92,
    })
  } catch (error) {
    console.error("Transcription error:", error)
    return NextResponse.json({ error: "Failed to transcribe audio" }, { status: 500 })
  }
}
