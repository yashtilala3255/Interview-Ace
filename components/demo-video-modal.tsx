"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface DemoVideoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DemoVideoModal({ isOpen, onClose }: DemoVideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">InterviewAce Demo</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video bg-muted/20 m-6 rounded-lg overflow-hidden">
          {/* Demo Video Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Demo Video Coming Soon</h3>
              <p className="text-muted-foreground max-w-md">
                Watch how InterviewAce analyzes your responses and provides detailed feedback to help you improve your
                interview skills.
              </p>
            </div>
          </div>

          {/* Actual video would go here */}
          {/* 
          <video 
            controls 
            className="w-full h-full"
            poster="/demo-thumbnail.jpg"
          >
            <source src="/demo-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          */}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function DemoVideoTrigger() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        size="lg"
        variant="outline"
        className="text-lg px-8 py-4 h-auto bg-transparent"
        onClick={() => setIsOpen(true)}
      >
        <Play className="w-5 h-5 mr-2" />
        Watch Demo
      </Button>
      <DemoVideoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
