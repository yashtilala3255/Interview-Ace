import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, Video, BarChart3, Target, Users, Zap, Star, CheckCircle, ArrowRight } from "lucide-react"
import { DemoVideoTrigger } from "@/components/demo-video-modal"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">InterviewAce</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/professional-interview-office-background-with-soft.jpg"
            alt="Professional interview background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background/80 to-background/90" />
        </div>

        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
            🚀 AI-Powered Interview Coaching Platform
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 text-balance leading-tight">
            Master Your Interview Skills with{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              AI Feedback
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty max-w-3xl mx-auto leading-relaxed">
            Practice interview questions, get instant AI analysis of your content and delivery, and track your progress
            with personalized coaching insights that help you land your dream job.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">10,000+ Practice Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">95% Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Real-time AI Analysis</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 h-auto" asChild>
              <Link href="/signup">
                Start Practicing Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <DemoVideoTrigger />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-muted/20 scroll-mt-20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trusted by Job Seekers Worldwide</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how InterviewAce has helped thousands land their dream jobs with confidence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed">
                  "InterviewAce helped me identify my weak points and gave me actionable feedback. I landed my dream job
                  at Google after just 2 weeks of practice! The AI analysis was spot-on."
                </CardDescription>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">Software Engineer at Google</p>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed">
                  "The AI feedback was incredibly detailed and helped me improve my confidence and delivery. I went from
                  nervous to confident in just a few sessions. Game changer!"
                </CardDescription>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">Michael Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Product Manager at Microsoft</p>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed">
                  "As a recent graduate, I was struggling with interviews. InterviewAce's personalized coaching helped
                  me understand what employers want to hear. Highly recommend!"
                </CardDescription>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">Emily Johnson</p>
                  <p className="text-sm text-muted-foreground">Data Analyst at Amazon</p>
                </div>
              </CardHeader>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed">
                  "The progress tracking feature helped me see my improvement over time. I could identify patterns in my
                  responses and work on specific areas."
                </CardDescription>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">David Kim</p>
                  <p className="text-sm text-muted-foreground">Marketing Director at Spotify</p>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed">
                  "The variety of questions and real-time feedback made all the difference. I felt prepared for any
                  question they could throw at me."
                </CardDescription>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">Lisa Thompson</p>
                  <p className="text-sm text-muted-foreground">UX Designer at Adobe</p>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Ace Your Interview
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI analyzes both what you say and how you say it, providing comprehensive feedback to help you improve
              every aspect of your interview performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Mic className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Voice & Video Recording</CardTitle>
                <CardDescription>
                  Practice with audio or video recording to simulate real interview conditions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Instant AI Analysis</CardTitle>
                <CardDescription>
                  Get immediate feedback on content quality, delivery, confidence, and fluency
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Monitor your improvement over time with detailed analytics and scoring
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Targeted Questions</CardTitle>
                <CardDescription>
                  Practice with behavioral, technical, and company-specific interview questions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Personalized Coaching</CardTitle>
                <CardDescription>
                  Receive actionable tips and suggested improvements tailored to your responses
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Playback Analysis</CardTitle>
                <CardDescription>
                  Review your responses with highlighted timestamps for fillers, pauses, and tone
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes and begin improving your interview skills immediately
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Choose Your Questions</h3>
              <p className="text-muted-foreground">
                Select from our curated library of behavioral, technical, and industry-specific interview questions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Record Your Answer</h3>
              <p className="text-muted-foreground">
                Practice your response using voice or video recording in a simulated interview environment
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Get AI Feedback</h3>
              <p className="text-muted-foreground">
                Receive instant, detailed analysis with scores and actionable tips to improve your performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have improved their interview skills with our AI-powered coaching
            platform.
          </p>
          <Button size="lg" className="text-lg px-8 py-4 h-auto" asChild>
            <Link href="/signup">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold text-foreground">InterviewAce</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                AI-powered interview coaching platform helping job seekers master their interview skills and land their
                dream jobs.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <div className="space-y-2 text-sm">
                <Link href="#features" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
                <Link href="/questions" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Question Library
                </Link>
                <Link href="/dashboard" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <div className="space-y-2 text-sm">
                <Link href="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-muted-foreground">© 2025 InterviewAce. All rights reserved.</div>
              <div className="text-sm text-muted-foreground">
                Powered by:{" "}
                <Link
                  href="https://scalexwebsolution.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Scale X Web Solution
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
