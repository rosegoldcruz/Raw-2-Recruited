"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Loader2 } from "lucide-react"
import { useLeadForm } from "@/hooks/use-lead-form"

export function ContactForm() {
  const router = useRouter()
  const { formData, isSubmitting, error, success, updateField, submitLead } = useLeadForm({
    lead_type: 'quote',
    source: 'Contact Page Form'
  })
  const [program, setProgram] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    await submitLead()
    
    if (success) {
      router.push("/thank-you")
    }
  }

  if (success) {
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
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">
            Parent/Guardian Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
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
            placeholder="(602) 555-0123"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
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
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className="bg-background border-border text-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service_requested" className="text-foreground">
          Program Interest
        </Label>
        <Select value={program} onValueChange={(value) => {
          setProgram(value)
          updateField('service_requested', value)
        }}>
          <SelectTrigger className="bg-background border-border text-foreground">
            <SelectValue placeholder="Select a program" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Homeschool PE">Homeschool PE</SelectItem>
            <SelectItem value="ESA Training">ESA Training</SelectItem>
            <SelectItem value="1-on-1 Coaching">1-on-1 Coaching</SelectItem>
            <SelectItem value="Group Training">Group Training</SelectItem>
            <SelectItem value="Speed & Agility">Speed & Agility</SelectItem>
            <SelectItem value="Strength Training">Strength Training</SelectItem>
            <SelectItem value="Position Training">Position Training</SelectItem>
            <SelectItem value="Combine Prep">Combine Prep</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground">
          Additional Information
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your athlete's goals, experience level, and any questions you have..."
          rows={4}
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          className="bg-background border-border text-foreground resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Secure Your Spot"
        )}
      </Button>
    </form>
  )
}
