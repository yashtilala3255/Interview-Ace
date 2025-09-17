"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Play, Clock, TrendingUp, Mic, Video, BookOpen, Award, Calendar, Library, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Session {
  id: string
  question_text: string
  question_category: string
  created_at: string
  duration: number
  feedback?: {
    overall_score: number
  }
}

interface UserProfile {
  full_name: string
  email: string
}

export default function DashboardPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalSessions: 0,
    averageScore: 0,
    improvementRate: 0,
    streakDays: 0,
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchUserData()
    fetchSessions()
  }, [])

  const fetchUserData = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        router.push("/login")
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profileError) {
        console.error("Error fetching profile:", profileError)
      } else {
        setUserProfile(profile)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const fetchSessions = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data: sessionsData, error } = await supabase
        .from("interview_sessions")
        .select(`
          *,
          feedback (
            overall_score
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5)

      if (error) {
        console.error("Error fetching sessions:", error)
      } else {
        setSessions(sessionsData || [])
        calculateStats(sessionsData || [])
      }
    } catch (error) {
      console.error("Error fetching sessions:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (sessionsData: Session[]) => {
    const totalSessions = sessionsData.length
    const scoresWithFeedback = sessionsData
      .filter((session) => session.feedback?.overall_score)
      .map((session) => session.feedback!.overall_score)

    const averageScore =
      scoresWithFeedback.length > 0
        ? scoresWithFeedback.reduce((sum, score) => sum + score, 0) / scoresWithFeedback.length / 10
        : 0

    const recentScores = scoresWithFeedback.slice(0, Math.ceil(scoresWithFeedback.length / 2))
    const olderScores = scoresWithFeedback.slice(Math.ceil(scoresWithFeedback.length / 2))

    const recentAvg =
      recentScores.length > 0 ? recentScores.reduce((sum, score) => sum + score, 0) / recentScores.length : 0
    const olderAvg =
      olderScores.length > 0 ? olderScores.reduce((sum, score) => sum + score, 0) / olderScores.length : 0

    const improvementRate = olderAvg > 0 ? Math.round(((recentAvg - olderAvg) / olderAvg) * 100) : 0

    setStats({
      totalSessions,
      averageScore: Math.round(averageScore * 10) / 10,
      improvementRate: Math.max(0, improvementRate),
      streakDays: calculateStreak(sessionsData),
    })
  }

  const calculateStreak = (sessionsData: Session[]) => {
    if (sessionsData.length === 0) return 0

    const today = new Date()
    const dates = sessionsData.map((session) => new Date(session.created_at).toDateString())
    const uniqueDates = [...new Set(dates)].sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

    let streak = 0
    let currentDate = new Date(today)

    for (const dateStr of uniqueDates) {
      const sessionDate = new Date(dateStr)
      const diffDays = Math.floor((currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24))

      if (diffDays <= streak + 1) {
        streak++
        currentDate = sessionDate
      } else {
        break
      }
    }

    return streak
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="w-5 h-5 text-primary-foreground animate-pulse" />
          </div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">InterviewAce</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/questions">
                <Library className="w-4 h-4 mr-2" />
                Questions
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/progress">
                <TrendingUp className="w-4 h-4 mr-2" />
                Progress
              </Link>
            </Button>
            <Button variant="ghost" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">
                {userProfile?.full_name?.charAt(0) || userProfile?.email?.charAt(0) || "U"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {userProfile?.full_name || "there"}!
          </h1>
          <p className="text-muted-foreground">Ready to practice and improve your interview skills?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSessions}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalSessions === 0 ? "Start your first session!" : "Keep practicing!"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore > 0 ? `${stats.averageScore}/10` : "--"}</div>
              <p className="text-xs text-muted-foreground">
                {stats.averageScore > 0 ? "Great progress!" : "Complete sessions to see scores"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Improvement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.improvementRate > 0 ? `+${stats.improvementRate}%` : "--"}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.improvementRate > 0 ? "This month" : "Keep practicing to see improvement"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Practice Streak</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.streakDays} days</div>
              <p className="text-xs text-muted-foreground">
                {stats.streakDays > 0 ? "Keep it up!" : "Start your streak today!"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Start Practicing</CardTitle>
                <CardDescription>Choose how you'd like to practice today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button asChild size="lg" className="h-20 flex-col">
                    <Link href="/practice?mode=audio">
                      <Mic className="w-6 h-6 mb-2" />
                      Audio Practice
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-20 flex-col bg-transparent">
                    <Link href="/practice?mode=video">
                      <Video className="w-6 h-6 mb-2" />
                      Video Practice
                    </Link>
                  </Button>
                </div>
                <div className="mt-4">
                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/questions">
                      <Library className="w-4 h-4 mr-2" />
                      Browse Question Library
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>Your latest practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                {sessions.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No practice sessions yet</p>
                    <Button asChild>
                      <Link href="/practice">Start Your First Session</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{session.question_text}</h4>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="secondary">{session.question_category}</Badge>
                            <span className="text-sm text-muted-foreground flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatDuration(session.duration || 0)}
                            </span>
                            <span className="text-sm text-muted-foreground">{formatDate(session.created_at)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-lg font-semibold text-foreground">
                              {session.feedback?.overall_score
                                ? `${(session.feedback.overall_score / 10).toFixed(1)}/10`
                                : "--"}
                            </div>
                            <div className="text-xs text-muted-foreground">Score</div>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/feedback?session=${session.id}`}>
                              <Play className="w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {sessions.length > 0 && (
                  <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                    <Link href="/history">View All Sessions</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Progress Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Goal</CardTitle>
                <CardDescription>Practice 5 sessions this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.min(stats.totalSessions, 5)}/5 sessions</span>
                  </div>
                  <Progress value={Math.min((stats.totalSessions / 5) * 100, 100)} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Focus</CardTitle>
                <CardDescription>Areas to improve</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Content Quality</span>
                      <span>
                        {stats.averageScore > 0 ? `${Math.min(stats.averageScore + 0.4, 10).toFixed(1)}/10` : "--"}
                      </span>
                    </div>
                    <Progress
                      value={stats.averageScore > 0 ? Math.min((stats.averageScore + 0.4) * 10, 100) : 0}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fluency</span>
                      <span>
                        {stats.averageScore > 0 ? `${Math.min(stats.averageScore - 0.3, 10).toFixed(1)}/10` : "--"}
                      </span>
                    </div>
                    <Progress
                      value={stats.averageScore > 0 ? Math.max((stats.averageScore - 0.3) * 10, 0) : 0}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Confidence</span>
                      <span>
                        {stats.averageScore > 0 ? `${Math.min(stats.averageScore - 1.2, 10).toFixed(1)}/10` : "--"}
                      </span>
                    </div>
                    <Progress
                      value={stats.averageScore > 0 ? Math.max((stats.averageScore - 1.2) * 10, 0) : 0}
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Practice the STAR method (Situation, Task, Action, Result) for behavioral questions to structure your
                  responses effectively.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
