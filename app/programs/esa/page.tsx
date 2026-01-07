"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { ArrowRight, Target, Zap, Eye, TrendingUp, X, Check, AlertTriangle } from "lucide-react"

const pathwaySteps = [
  {
    icon: Target,
    phase: "01",
    title: "Foundation",
    description:
      "Build the athletic base. Strength, speed, and movement fundamentals that create real football players.",
  },
  {
    icon: Zap,
    phase: "02",
    title: "Development",
    description: "Position-specific training. Route running, footwork, game IQ. We develop complete athletes.",
  },
  {
    icon: Eye,
    phase: "03",
    title: "Exposure",
    description: "Film sessions, scrimmages, and showcases. We create opportunities for coaches to see your work.",
  },
  {
    icon: TrendingUp,
    phase: "04",
    title: "Pipeline",
    description: "Direct pathway to High School programs, Women's Flag, and Tackle Football rosters.",
  },
]

const thisIsFor = [
  "Middle school athletes ready to train like competitors",
  "Early high school athletes building toward varsity",
  "Homeschool families who want elite development, not just PE checkboxes",
  "Athletes with real goals: make a roster, earn a jersey, compete",
]

const thisIsNotFor = [
  "Recreational athletes looking for casual activity",
  "Drop-in PE credit shoppers",
  "Families not committed to consistent training",
  "Athletes without competitive goals",
]

export default function ESAPage() {
  const [formData, setFormData] = useState({
    athleteName: "",
    age: "",
    grade: "",
    esaStatus: "",
    experience: "",
    goal: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("ESA Application:", formData)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
            <span className="text-primary text-sm font-bold tracking-wide">STATE-ACCREDITED PE + ELITE TRAINING</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
            ESA Athletes Don't Just Earn Credits.
            <span className="block text-primary">They Earn Their Spot.</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            State-accredited PE combined with elite football development for homeschool athletes who want to compete at
            the next level. This is the foundation for real roster spots.
          </p>

          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 h-auto group"
            onClick={() => document.getElementById("application")?.scrollIntoView({ behavior: "smooth" })}
          >
            Apply for the ESA Program
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-black text-foreground">The Reality Check</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background border border-border rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">The Homeschool Gap Is Real</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Schools evaluate talent. They don't develop it. When tryouts come, coaches already know who they want —
                it's the athletes they've been watching for years.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Homeschool athletes show up as unknowns. Raw talent without structure, without film, without a track
                record. And talent without structure gets passed over.
              </p>
            </div>

            <div className="bg-background border border-border rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">PE Credits Don't Win Roster Spots</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Basic PE programs check a box. They don't build athletes. They don't create game-ready competitors. They
                don't open doors.
              </p>
              <p className="text-primary font-bold text-lg">
                We don't just prepare athletes for PE — we prepare them to compete for a jersey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Athlete Pathway */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              The Athlete <span className="text-primary">Pathway</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A clear cradle-to-competition system. Every phase builds toward the next level — High School rosters,
              Women's Flag, and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pathwaySteps.map((step, index) => (
              <div
                key={step.phase}
                className="relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors group"
              >
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-black text-sm">{step.phase}</span>
                </div>

                <div className="pt-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>

                {index < pathwaySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-lg text-foreground font-medium">
              This pathway feeds directly into High School programs, the Women's Flag Football Pipeline, and Tackle
              Football opportunities. <span className="text-primary font-bold">Start here. End up recruited.</span>
            </p>
          </div>
        </div>
      </section>

      {/* The Filter Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              Is This <span className="text-primary">For You?</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              We're selective because our athletes are serious. This isn't recreational. This isn't casual. This isn't
              drop-in PE.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background border border-primary/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <Check className="w-6 h-6" />
                This Is For You If...
              </h3>
              <ul className="space-y-4">
                {thisIsFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background border border-border rounded-2xl p-8">
              <h3 className="text-xl font-bold text-muted-foreground mb-6 flex items-center gap-2">
                <X className="w-6 h-6" />
                This Is NOT For You If...
              </h3>
              <ul className="space-y-4">
                {thisIsNotFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              Apply for the <span className="text-primary">ESA Program</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Spots are limited. Complete the application below and we'll reach out to discuss your athlete's goals.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-8">
            {/* Athlete Information */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">
                Athlete Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="athleteName" className="text-foreground">
                    Athlete Name *
                  </Label>
                  <Input
                    id="athleteName"
                    value={formData.athleteName}
                    onChange={(e) => setFormData({ ...formData, athleteName: e.target.value })}
                    placeholder="Full name"
                    required
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-foreground">
                    Age *
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="Age"
                    min={8}
                    required
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade" className="text-foreground">
                    Current Grade *
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6th">6th Grade</SelectItem>
                      <SelectItem value="7th">7th Grade</SelectItem>
                      <SelectItem value="8th">8th Grade</SelectItem>
                      <SelectItem value="9th">9th Grade (Freshman)</SelectItem>
                      <SelectItem value="10th">10th Grade (Sophomore)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="esaStatus" className="text-foreground">
                    ESA Status *
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, esaStatus: value })}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active-esa">Active ESA Account</SelectItem>
                      <SelectItem value="pending-esa">ESA Application Pending</SelectItem>
                      <SelectItem value="homeschool-no-esa">Homeschool (No ESA)</SelectItem>
                      <SelectItem value="considering">Considering Homeschool</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Experience & Goals */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">Experience & Goals</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-foreground">
                    Athletic Experience
                  </Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Describe any previous football, sports, or athletic training experience..."
                    rows={3}
                    className="bg-background border-border resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal" className="text-foreground">
                    Primary Goal *
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, goal: value })}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="What's the athlete's main goal?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hs-roster">Make a High School Roster</SelectItem>
                      <SelectItem value="varsity">Earn Varsity Position</SelectItem>
                      <SelectItem value="college-prep">College Football Preparation</SelectItem>
                      <SelectItem value="womens-flag">Women's Flag Football Pipeline</SelectItem>
                      <SelectItem value="skill-development">Elite Skill Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Parent Contact */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">
                Parent/Guardian Contact
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="parentName" className="text-foreground">
                    Parent/Guardian Name *
                  </Label>
                  <Input
                    id="parentName"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Full name"
                    required
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentEmail" className="text-foreground">
                    Email *
                  </Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                    placeholder="email@example.com"
                    required
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentPhone" className="text-foreground">
                    Phone *
                  </Label>
                  <Input
                    id="parentPhone"
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    placeholder="(602) 555-0123"
                    required
                    className="bg-background border-border"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 h-auto"
            >
              Submit Application
              <ArrowRight className="ml-2" />
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Applications are reviewed within 48 hours. We'll contact you to discuss next steps.
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
