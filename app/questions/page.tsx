"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, ArrowLeft, Search, Filter, Play, BookOpen, Code, Users, Briefcase, Star } from "lucide-react"

interface Question {
  id: number
  text: string
  type: "Behavioral" | "Technical" | "Situational" | "Company-Specific"
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  tags: string[]
  popularity: number
}

export default function QuestionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")

  const questions: Question[] = [
    {
      id: 1,
      text: "Tell me about yourself.",
      type: "Behavioral",
      category: "Introduction",
      difficulty: "Easy",
      tags: ["common", "opening"],
      popularity: 95,
    },
    {
      id: 2,
      text: "Describe a time when you had to work with a difficult team member.",
      type: "Behavioral",
      category: "Teamwork",
      difficulty: "Medium",
      tags: ["conflict resolution", "teamwork"],
      popularity: 87,
    },
    {
      id: 3,
      text: "Explain the difference between REST and GraphQL APIs.",
      type: "Technical",
      category: "Web Development",
      difficulty: "Medium",
      tags: ["apis", "backend"],
      popularity: 78,
    },
    {
      id: 4,
      text: "How would you handle a situation where you disagree with your manager?",
      type: "Situational",
      category: "Leadership",
      difficulty: "Hard",
      tags: ["management", "conflict"],
      popularity: 72,
    },
    {
      id: 5,
      text: "What interests you about working at our company?",
      type: "Company-Specific",
      category: "Motivation",
      difficulty: "Easy",
      tags: ["research", "motivation"],
      popularity: 89,
    },
    {
      id: 6,
      text: "Describe your experience with React and state management.",
      type: "Technical",
      category: "Frontend Development",
      difficulty: "Medium",
      tags: ["react", "frontend"],
      popularity: 82,
    },
    {
      id: 7,
      text: "Tell me about a time you failed and what you learned from it.",
      type: "Behavioral",
      category: "Growth Mindset",
      difficulty: "Medium",
      tags: ["failure", "learning"],
      popularity: 85,
    },
    {
      id: 8,
      text: "How do you prioritize tasks when everything seems urgent?",
      type: "Situational",
      category: "Time Management",
      difficulty: "Medium",
      tags: ["prioritization", "productivity"],
      popularity: 79,
    },
  ]

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = selectedType === "all" || question.type === selectedType
    const matchesDifficulty = selectedDifficulty === "all" || question.difficulty === selectedDifficulty

    return matchesSearch && matchesType && matchesDifficulty
  })

  const questionsByType = {
    Behavioral: questions.filter((q) => q.type === "Behavioral"),
    Technical: questions.filter((q) => q.type === "Technical"),
    Situational: questions.filter((q) => q.type === "Situational"),
    "Company-Specific": questions.filter((q) => q.type === "Company-Specific"),
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Behavioral":
        return <Users className="w-4 h-4" />
      case "Technical":
        return <Code className="w-4 h-4" />
      case "Situational":
        return <Briefcase className="w-4 h-4" />
      case "Company-Specific":
        return <Star className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
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
              <h1 className="text-xl font-bold text-foreground">Question Library</h1>
            </div>
          </div>
          <Button asChild>
            <Link href="/practice">Start Practice</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search questions, categories, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Behavioral">Behavioral</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Situational">Situational</SelectItem>
                  <SelectItem value="Company-Specific">Company-Specific</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredQuestions.length} of {questions.length} questions
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Questions</TabsTrigger>
            <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="situational">Situational</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {filteredQuestions.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          {getTypeIcon(question.type)}
                          <Badge variant="outline">{question.type}</Badge>
                          <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{question.category}</span>
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-3">{question.text}</h3>
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-wrap gap-1">
                            {question.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">{question.popularity}% popularity</div>
                        </div>
                      </div>
                      <Button asChild className="ml-4">
                        <Link href={`/practice?question=${question.id}`}>
                          <Play className="w-4 h-4 mr-2" />
                          Practice
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="behavioral" className="space-y-4">
            <div className="grid gap-4">
              {questionsByType.Behavioral.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <Users className="w-4 h-4" />
                          <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{question.category}</span>
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-3">{question.text}</h3>
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-wrap gap-1">
                            {question.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">{question.popularity}% popularity</div>
                        </div>
                      </div>
                      <Button asChild className="ml-4">
                        <Link href={`/practice?question=${question.id}`}>
                          <Play className="w-4 h-4 mr-2" />
                          Practice
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="technical" className="space-y-4">
            <div className="grid gap-4">
              {questionsByType.Technical.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <Code className="w-4 h-4" />
                          <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{question.category}</span>
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-3">{question.text}</h3>
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-wrap gap-1">
                            {question.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">{question.popularity}% popularity</div>
                        </div>
                      </div>
                      <Button asChild className="ml-4">
                        <Link href={`/practice?question=${question.id}`}>
                          <Play className="w-4 h-4 mr-2" />
                          Practice
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="situational" className="space-y-4">
            <div className="grid gap-4">
              {questionsByType.Situational.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <Briefcase className="w-4 h-4" />
                          <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{question.category}</span>
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-3">{question.text}</h3>
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-wrap gap-1">
                            {question.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">{question.popularity}% popularity</div>
                        </div>
                      </div>
                      <Button asChild className="ml-4">
                        <Link href={`/practice?question=${question.id}`}>
                          <Play className="w-4 h-4 mr-2" />
                          Practice
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="company" className="space-y-4">
            <div className="grid gap-4">
              {questionsByType["Company-Specific"].map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <Star className="w-4 h-4" />
                          <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{question.category}</span>
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-3">{question.text}</h3>
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-wrap gap-1">
                            {question.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">{question.popularity}% popularity</div>
                        </div>
                      </div>
                      <Button asChild className="ml-4">
                        <Link href={`/practice?question=${question.id}`}>
                          <Play className="w-4 h-4 mr-2" />
                          Practice
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Start Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Quick Start Practice Sets</CardTitle>
              <CardDescription>Pre-curated question sets for focused practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium mb-1">Behavioral Basics</h4>
                    <p className="text-sm text-muted-foreground mb-3">5 essential behavioral questions</p>
                    <Button size="sm" asChild>
                      <Link href="/practice?set=behavioral-basics">Start Set</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 text-center">
                    <Code className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium mb-1">Tech Interview Prep</h4>
                    <p className="text-sm text-muted-foreground mb-3">7 technical questions</p>
                    <Button size="sm" asChild>
                      <Link href="/practice?set=tech-prep">Start Set</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 text-center">
                    <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium mb-1">Popular Mix</h4>
                    <p className="text-sm text-muted-foreground mb-3">Top 10 most asked questions</p>
                    <Button size="sm" asChild>
                      <Link href="/practice?set=popular-mix">Start Set</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
