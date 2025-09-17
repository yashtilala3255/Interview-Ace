"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, TrendingUp, Calendar, Clock, Award, BarChart3, Play, Download, ArrowLeft } from "lucide-react"

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const progressData = {
    overall: {
      totalSessions: 45,
      averageScore: 7.8,
      improvementRate: 23,
      streakDays: 12,
      totalHours: 18.5,
    },
    trends: [
      { date: "2024-01-01", score: 6.2, sessions: 2 },
      { date: "2024-01-08", score: 6.8, sessions: 3 },
      { date: "2024-01-15", score: 7.2, sessions: 4 },
      { date: "2024-01-22", score: 7.6, sessions: 3 },
      { date: "2024-01-29", score: 7.8, sessions: 5 },
    ],
    skillBreakdown: {
      content: { current: 8.2, previous: 7.5, trend: "up" },
      fluency: { current: 7.5, previous: 7.1, trend: "up" },
      confidence: { current: 6.8, previous: 6.2, trend: "up" },
      clarity: { current: 8.0, previous: 7.8, trend: "up" },
    },
    categoryPerformance: [
      { category: "Behavioral", sessions: 18, avgScore: 8.1, improvement: 15 },
      { category: "Technical", sessions: 15, avgScore: 7.2, improvement: 28 },
      { category: "Situational", sessions: 8, avgScore: 7.9, improvement: 12 },
      { category: "Company-Specific", sessions: 4, avgScore: 8.3, improvement: 8 },
    ],
  }

  const recentSessions = [
    {
      id: 1,
      question: "Tell me about a time you had to work with a difficult team member",
      category: "Behavioral",
      score: 8.5,
      date: "2024-01-20",
      duration: "3:45",
      improvements: ["Structure", "Examples"],
    },
    {
      id: 2,
      question: "Explain the difference between REST and GraphQL",
      category: "Technical",
      score: 7.2,
      date: "2024-01-19",
      duration: "4:20",
      improvements: ["Clarity", "Depth"],
    },
    {
      id: 3,
      question: "How would you handle a project with tight deadlines?",
      category: "Situational",
      score: 8.0,
      date: "2024-01-18",
      duration: "2:55",
      improvements: ["Confidence"],
    },
    {
      id: 4,
      question: "Why do you want to work at our company?",
      category: "Company-Specific",
      score: 8.8,
      date: "2024-01-17",
      duration: "3:10",
      improvements: ["Delivery"],
    },
    {
      id: 5,
      question: "Describe your experience with agile methodologies",
      category: "Technical",
      score: 6.9,
      date: "2024-01-16",
      duration: "4:05",
      improvements: ["Content", "Examples"],
    },
  ]

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
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Progress Analytics</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressData.overall.totalSessions}</div>
              <p className="text-xs text-muted-foreground">+8 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressData.overall.averageScore}/10</div>
              <p className="text-xs text-emerald-600">+0.8 improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Improvement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{progressData.overall.improvementRate}%</div>
              <p className="text-xs text-muted-foreground">Overall growth</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Practice Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressData.overall.totalHours}h</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressData.overall.streakDays} days</div>
              <p className="text-xs text-emerald-600">Personal best!</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Performance Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trend</CardTitle>
                  <CardDescription>Your score progression over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {progressData.trends.map((point, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{point.date}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium">{point.score}/10</span>
                          <Badge variant="secondary">{point.sessions} sessions</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>Practice sessions this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                      <div key={day} className="text-center">
                        <div className="text-xs text-muted-foreground mb-2">{day}</div>
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                            index < 5 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {index < 5 ? index + 1 : 0}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Great consistency! You've practiced 5 out of 7 days this week.
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Breakdown</CardTitle>
                <CardDescription>Your performance across different evaluation criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(progressData.skillBreakdown).map(([skill, data]) => (
                    <div key={skill} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium capitalize">{skill}</span>
                          <Badge variant={data.trend === "up" ? "default" : "secondary"} className="text-xs">
                            {data.trend === "up" ? "↗" : "→"}{" "}
                            {(((data.current - data.previous) / data.previous) * 100).toFixed(1)}%
                          </Badge>
                        </div>
                        <span className="text-sm font-medium">{data.current}/10</span>
                      </div>
                      <Progress value={data.current * 10} className="h-2" />
                      <div className="text-xs text-muted-foreground">Previous: {data.previous}/10</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance by Category</CardTitle>
                <CardDescription>How you're performing across different question types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.categoryPerformance.map((category) => (
                    <div key={category.category} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{category.category}</h4>
                        <Badge variant="outline">{category.sessions} sessions</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Average Score</div>
                          <div className="text-lg font-semibold">{category.avgScore}/10</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Improvement</div>
                          <div className="text-lg font-semibold text-emerald-600">+{category.improvement}%</div>
                        </div>
                      </div>
                      <Progress value={category.avgScore * 10} className="h-2 mt-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Session History</CardTitle>
                    <CardDescription>Detailed view of all your practice sessions</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="behavioral">Behavioral</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="situational">Situational</SelectItem>
                        <SelectItem value="company">Company-Specific</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground mb-2">{session.question}</h4>
                          <div className="flex items-center space-x-4">
                            <Badge variant="secondary">{session.category}</Badge>
                            <span className="text-sm text-muted-foreground flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {session.duration}
                            </span>
                            <span className="text-sm text-muted-foreground">{session.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-lg font-semibold">{session.score}/10</div>
                            <div className="text-xs text-muted-foreground">Score</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Focus areas:</span>
                        {session.improvements.map((improvement) => (
                          <Badge key={improvement} variant="outline" className="text-xs">
                            {improvement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Load More Sessions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
