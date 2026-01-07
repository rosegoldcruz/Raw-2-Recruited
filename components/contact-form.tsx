"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Loader2 } from "lucide-react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          We've received your information and will be in touch soon. Get ready to train!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="parentName" className="text-foreground">
            Parent/Guardian Name
          </Label>
          <Input
            id="parentName"
            name="parentName"
            placeholder="Your name"
            required
            className="bg-background border-border text-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="athleteName" className="text-foreground">
            Athlete Name
          </Label>
          <Input
            id="athleteName"
            name="athleteName"
            placeholder="Athlete's name"
            required
            className="bg-background border-border text-foreground"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="athleteAge" className="text-foreground">
            Athlete Age
          </Label>
          <Input
            id="athleteAge"
            name="athleteAge"
            type="number"
            placeholder="Age"
            min="8"
            max="25"
            required
            className="bg-background border-border text-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            required
            className="bg-background border-border text-foreground"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          className="bg-background border-border text-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="program" className="text-foreground">
          Program Interest
        </Label>
        <Select name="program" required>
          <SelectTrigger className="bg-background border-border text-foreground">
            <SelectValue placeholder="Select a program" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pe-credits">The Credit Program (PE Credits)</SelectItem>
            <SelectItem value="team-clinics">Team Clinics</SelectItem>
            <SelectItem value="elite-1on1">Elite 1-on-1 Training</SelectItem>
            <SelectItem value="speed-agility">Speed & Agility Training</SelectItem>
            <SelectItem value="oline">Offensive Line Training</SelectItem>
            <SelectItem value="other">Other / Not Sure</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground">
          Additional Information (Optional)
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your athlete's experience, goals, or any questions you have..."
          rows={4}
          className="bg-background border-border text-foreground resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Enrollment Request"
        )}
      </Button>
    </form>
  )
}
