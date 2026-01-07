"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Lock, Target, Scan, Zap, TrendingUp, Check, X, Crown } from "lucide-react"

const developmentPath = [
  {
    step: "01",
    title: "Evaluation",
    subtitle: "No Fluff",
    description: "Honest assessment of where you are, where the gaps exist, and what it takes to close them.",
    icon: Scan,
  },
  {
    step: "02",
    title: "Customization",
    subtitle: "Your Blueprint",
    description: "A training plan built around YOUR position, YOUR weaknesses, and YOUR goals. No templates.",
    icon: Target,
  },
  {
    step: "03",
    title: "Execution",
    subtitle: "Precision Reps",
    description:
      "Every session is intentional. Film study, technique refinement, mental conditioning — all integrated.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Acceleration",
    subtitle: "Next Level",
    description: "Preparation for Varsity roles, combines, showcases, and college-level competition.",
    icon: TrendingUp,
  },
]

const thisIsFor = [
  "Varsity or college-bound athletes ready for serious development",
  "Families committed to long-term athletic investment",
  "Athletes seeking position-specific mastery and film study",
  "Competitors who want an unfair advantage — not just reps",
]

const thisIsNotFor = [
  "Casual athletes looking for general fitness",
  "Short-term fixes or quick confidence boosts",
  "Athletes not ready to commit to the process",
  "Families seeking the cheapest option",
]

export default function PrivateTrainingPage() {
  const [formStep, setFormStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    athleteName: "",
    athleteAge: "",
    position: "",
    currentLevel: "",
    goals: "",
    whyPrivateTraining: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "private-training",
          ...formData,
        }),
      })

      if (!res.ok) {
        throw new Error(`Lead submission failed: ${res.status}`)
      }

      alert("Application submitted. We will review and contact qualified candidates.")
    } catch (err) {
      console.error("Lead submission failed", err)
      alert("Submission failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <Lock className="w-4 h-4" />
            Application Required
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight">
            Elite Athletes Don't Train More.
            <span className="block text-primary">They Train Smarter — One-on-One.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Position-specific training for athletes with real potential and families ready to invest in
            <span className="text-foreground font-semibold"> performance, exposure, and competitive advantage.</span>
          </p>

          <Button
            size="lg"
            onClick={() => document.getElementById("application")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-6 group"
          >
            Apply for Private Training
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* The Filter Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Private Training Is Not for Everyone
            </h2>
            <p className="text-xl text-primary font-semibold">And That's Intentional.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* This Is For */}
            <div className="bg-background border border-primary/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">This Is For</h3>
              </div>
              <ul className="space-y-4">
                {thisIsFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* This Is NOT For */}
            <div className="bg-background border border-border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <X className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">This Is NOT For</h3>
              </div>
              <ul className="space-y-4">
                {thisIsNotFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Precision Difference Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">This Is Not Group Training.</h2>
            <p className="text-3xl md:text-4xl font-black text-primary">This Is Precision.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Individual Plans</h3>
              <p className="text-muted-foreground text-sm">Every session built around YOUR specific needs and goals.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Scan className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Film Study</h3>
              <p className="text-muted-foreground text-sm">Break down your game and opponents with expert analysis.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Mental Approach</h3>
              <p className="text-muted-foreground text-sm">Train the mind. Read defenses. Anticipate plays.</p>
            </div>
          </div>

          <p className="text-center text-xl text-foreground font-semibold mt-12">
            Zero Templates. Zero Rotation. Zero Shortcuts.
          </p>
        </div>
      </section>

      {/* Private Development Path */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              The Private <span className="text-primary">Development Path</span>
            </h2>
            <p className="text-muted-foreground text-lg">From assessment to acceleration — a clear path forward.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developmentPath.map((phase, index) => (
              <div key={index} className="relative">
                <div className="bg-background border border-border rounded-2xl p-6 h-full hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-black text-primary/20">{phase.step}</span>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <phase.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{phase.title}</h3>
                  <p className="text-sm text-primary font-semibold mb-3">{phase.subtitle}</p>
                  <p className="text-muted-foreground text-sm">{phase.description}</p>
                </div>
                {index < developmentPath.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coach Access Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-8">
            <Crown className="w-10 h-10 text-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">Direct Access to Elite Minds</h2>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Private training means exactly that — <span className="text-foreground font-semibold">private.</span> No
            rotating trainers. No assistants. No diluted attention. You work directly with our top-level coaches who
            have developed athletes at the highest levels of competition.
          </p>

          <div className="bg-card border border-border rounded-2xl p-8">
            <p className="text-lg text-foreground font-semibold mb-2">Investment Signaling</p>
            <p className="text-muted-foreground">
              Availability is limited. Athletes are accepted based on fit and commitment —
              <span className="text-primary font-semibold"> not first come, first served.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application" className="py-20 bg-card border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Lock className="w-4 h-4" />
              Application Required
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Apply for Private Training</h2>
            <p className="text-muted-foreground text-lg">
              Complete the application below. We review each submission and contact qualified candidates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-background border border-border rounded-2xl p-8">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      formStep >= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && <div className={`w-12 h-1 rounded ${formStep > step ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>

            {formStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Athlete Information</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Athlete Name *</label>
                    <Input
                      value={formData.athleteName}
                      onChange={(e) => handleInputChange("athleteName", e.target.value)}
                      placeholder="Full name"
                      required
                      className="bg-card border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Age *</label>
                    <Input
                      type="number"
                      value={formData.athleteAge}
                      onChange={(e) => handleInputChange("athleteAge", e.target.value)}
                      placeholder="Age"
                      min={8}
                      required
                      className="bg-card border-border"
                    />
                    <p className="mt-2 text-xs text-muted-foreground">Eligibility: ages 8+ only (6th grade and above).</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Primary Position *</label>
                    <Select onValueChange={(value) => handleInputChange("position", value)}>
                      <SelectTrigger className="bg-card border-border">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="qb">Quarterback (QB)</SelectItem>
                        <SelectItem value="rb">Running Back (RB)</SelectItem>
                        <SelectItem value="wr">Wide Receiver (WR)</SelectItem>
                        <SelectItem value="te">Tight End (TE)</SelectItem>
                        <SelectItem value="ol">Offensive Line (OL)</SelectItem>
                        <SelectItem value="dl">Defensive Line (DL)</SelectItem>
                        <SelectItem value="lb">Linebacker (LB)</SelectItem>
                        <SelectItem value="db">Defensive Back (DB)</SelectItem>
                        <SelectItem value="k">Kicker/Punter (K/P)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Current Level *</label>
                    <Select onValueChange={(value) => handleInputChange("currentLevel", value)}>
                      <SelectTrigger className="bg-card border-border">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="middle-school">Middle School</SelectItem>
                        <SelectItem value="freshman">Freshman (9th)</SelectItem>
                        <SelectItem value="jv">JV</SelectItem>
                        <SelectItem value="varsity">Varsity</SelectItem>
                        <SelectItem value="college-bound">College-Bound</SelectItem>
                        <SelectItem value="college">College</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => setFormStep(2)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                >
                  Continue
                  <ArrowRight className="ml-2" />
                </Button>
              </div>
            )}

            {formStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Goals & Intent</h3>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    What are your athletic goals? *
                  </label>
                  <Textarea
                    value={formData.goals}
                    onChange={(e) => handleInputChange("goals", e.target.value)}
                    placeholder="Varsity starter, college scholarship, combine preparation, etc."
                    required
                    className="bg-card border-border min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Why are you seeking private training? *
                  </label>
                  <Textarea
                    value={formData.whyPrivateTraining}
                    onChange={(e) => handleInputChange("whyPrivateTraining", e.target.value)}
                    placeholder="What makes you believe private training is the right investment for your development?"
                    required
                    className="bg-card border-border min-h-[120px]"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    This helps us understand your commitment level and whether we're a good fit.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormStep(1)}
                    className="flex-1 border-border"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setFormStep(3)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                  >
                    Continue
                    <ArrowRight className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {formStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Parent/Guardian Contact</h3>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Parent/Guardian Name *</label>
                  <Input
                    value={formData.parentName}
                    onChange={(e) => handleInputChange("parentName", e.target.value)}
                    placeholder="Full name"
                    required
                    className="bg-card border-border"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                    <Input
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) => handleInputChange("parentEmail", e.target.value)}
                      placeholder="email@example.com"
                      required
                      className="bg-card border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Phone *</label>
                    <Input
                      type="tel"
                      value={formData.parentPhone}
                      onChange={(e) => handleInputChange("parentPhone", e.target.value)}
                      placeholder="(602) 555-0000"
                      required
                      className="bg-card border-border"
                    />
                  </div>
                </div>

                <div className="bg-card border border-primary/30 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-semibold">What happens next:</span> We review every
                    application personally. If your athlete is a good fit, we'll reach out within 48 hours to schedule
                    an evaluation session.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormStep(2)}
                    className="flex-1 border-border"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
