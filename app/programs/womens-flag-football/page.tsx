"use client"

import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { ArrowRight, CheckCircle2, ChevronRight, DollarSign, Target, TrendingUp, Users } from "lucide-react"

const pipelineSteps = [
  { step: "01", title: "TRAIN", description: "Elite speed, agility, and position-specific coaching" },
  { step: "02", title: "DEVELOP", description: "Build football IQ and competitive instincts" },
  { step: "03", title: "FILM", description: "Professional highlight reels for recruiting" },
  { step: "04", title: "COMPETE", description: "Showcase events and competitive play" },
  { step: "05", title: "GET SEEN", description: "Direct exposure to college programs" },
]

const whyNowBullets = [
  "600+ colleges now offer women's flag football programs",
  "2028 Olympics debut — this sport is exploding",
  "NIL opportunities are opening for flag football athletes",
  "Scholarships are available NOW — but competition is growing",
  "Early training = early offers",
]

export default function WomensFlagFootballPage() {
  const router = useRouter()
  const [formStep, setFormStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    athleteName: "",
    age: "",
    school: "",
    gradeLevel: "",
    experience: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    goals: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "womens-flag-football",
          ...formData,
        }),
      })

      if (!res.ok) {
        throw new Error(`Lead submission failed: ${res.status}`)
      }

      router.push("/thank-you")
    } catch (err) {
      console.error("Lead submission failed", err)
      alert("Submission failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setFormStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setFormStep((prev) => Math.max(prev - 1, 1))

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-28 pb-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-5 py-2 mb-8">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-bold tracking-wide uppercase">
              Arizona's First NIL-Oriented Pipeline
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
            Women's Flag Football Is the Future.
            <br />
            <span className="text-primary">We Build the Athletes Colleges Recruit.</span>
          </h1>

          <p className="text-muted-foreground max-w-3xl mx-auto text-lg sm:text-xl mb-10 leading-relaxed">
            Elite speed. Explosive agility. Unmatched football IQ. This is not recreational play — this is a
            <span className="text-foreground font-semibold"> college-ready development program</span> designed to
            position Arizona athletes for{" "}
            <span className="text-primary font-semibold">scholarships and NIL opportunities</span>.
          </p>

          <a href="#apply">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg px-10 py-6 group"
            >
              APPLY FOR TRAINING
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </section>

      {/* THE "WHY" SECTION */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              The Scholarship Gap Is <span className="text-primary">Closing Fast</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every month, more colleges add women's flag football. Every month, more athletes compete for limited
              spots. The question isn't IF you should start — it's whether you'll start before it's too late.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              {whyNowBullets.map((bullet, index) => (
                <div key={index} className="flex items-start gap-4 bg-background border border-border rounded-lg p-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{bullet}</span>
                </div>
              ))}
            </div>

            <div className="bg-background border-2 border-primary/30 rounded-2xl p-8 text-center">
              <DollarSign className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-black text-foreground mb-2">NIL Is Here</h3>
              <p className="text-muted-foreground leading-relaxed">
                Name, Image, Likeness deals aren't just for traditional sports anymore. Flag football athletes are
                signing deals. Are you positioned to be next?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE PIPELINE SECTION */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">The Raw2Recruited Method</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2 mb-4">
              From Raw Talent to <span className="text-primary">Recruited Athlete</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              This isn't a "training program." This is a complete pipeline for preparation and positioning.
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {pipelineSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-black text-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-black text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                  {index < pipelineSteps.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-primary z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR (FILTER SECTION) */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              This Program Is <span className="text-primary">NOT</span> For Everyone
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're selective because we're serious. If you're looking for recreational play, this isn't for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* WHO IT'S FOR */}
            <div className="bg-background border-2 border-primary/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-black text-foreground">THIS IS FOR YOU IF:</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "You're 4th grade+ (ages 8+) and serious about development",
                  "You have college aspirations (scholarship or walk-on)",
                  "You want to compete, not just participate",
                  "You're willing to put in the work others won't",
                  "You understand this is an investment in your future",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WHO IT'S NOT FOR */}
            <div className="bg-background border border-border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-black text-foreground">THIS IS NOT FOR YOU IF:</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "You're looking for casual, recreational play",
                  "You're not committed to consistent training",
                  "You're not interested in college opportunities",
                  "You expect results without effort",
                  "You're not ready to be coached hard",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="py-20 bg-background scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">Limited Spots Available</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2 mb-4">
              Apply for <span className="text-primary">Training</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Complete your application below. We review every submission and reach out to qualified athletes.
            </p>
            <p className="text-muted-foreground text-sm mt-2">Eligibility: ages 8+ only (6th grade and above).</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      formStep >= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {formStep > step ? <CheckCircle2 className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 sm:w-24 h-1 mx-2 rounded ${formStep > step ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Athlete Info */}
            {formStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-foreground">Athlete Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="athleteName" className="text-foreground">
                      Athlete Name *
                    </Label>
                    <Input
                      id="athleteName"
                      value={formData.athleteName}
                      onChange={(e) => handleInputChange("athleteName", e.target.value)}
                      className="mt-1 bg-background border-border"
                      placeholder="Full name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age" className="text-foreground">
                        Age *
                      </Label>
                      <Select value={formData.age} onValueChange={(value) => handleInputChange("age", value)}>
                        <SelectTrigger className="mt-1 bg-background border-border">
                          <SelectValue placeholder="Select age" />
                        </SelectTrigger>
                        <SelectContent>
                          {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((age) => (
                            <SelectItem key={age} value={age.toString()}>
                              {age}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="gradeLevel" className="text-foreground">
                        Grade Level *
                      </Label>
                      <Select
                        value={formData.gradeLevel}
                        onValueChange={(value) => handleInputChange("gradeLevel", value)}
                      >
                        <SelectTrigger className="mt-1 bg-background border-border">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {["4th Grade", "5th Grade", "6th Grade", "7th Grade", "8th Grade", "Freshman", "Sophomore", "Junior", "Senior"].map(
                            (grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Eligibility: ages 8+ only (4th grade and above).</p>
                  <div>
                    <Label htmlFor="school" className="text-foreground">
                      School *
                    </Label>
                    <Input
                      id="school"
                      value={formData.school}
                      onChange={(e) => handleInputChange("school", e.target.value)}
                      className="mt-1 bg-background border-border"
                      placeholder="Current school"
                    />
                  </div>
                </div>
                <Button
                  onClick={nextStep}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                >
                  Continue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Step 2: Experience */}
            {formStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-foreground">Experience & Goals</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="experience" className="text-foreground">
                      Flag Football Experience *
                    </Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => handleInputChange("experience", value)}
                    >
                      <SelectTrigger className="mt-1 bg-background border-border">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No experience</SelectItem>
                        <SelectItem value="recreational">Recreational/Casual play</SelectItem>
                        <SelectItem value="organized">Organized league (1-2 years)</SelectItem>
                        <SelectItem value="competitive">Competitive/Travel (2+ years)</SelectItem>
                        <SelectItem value="varsity">High School Varsity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="goals" className="text-foreground">
                      Goals & Aspirations *
                    </Label>
                    <Textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) => handleInputChange("goals", e.target.value)}
                      className="mt-1 bg-background border-border min-h-[120px]"
                      placeholder="Tell us about your athletic goals. Are you pursuing college scholarships? What do you want to achieve?"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={prevStep} className="flex-1 border-border bg-transparent">
                    Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                  >
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Parent Contact */}
            {formStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-foreground">Parent/Guardian Contact</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="parentName" className="text-foreground">
                      Parent/Guardian Name *
                    </Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) => handleInputChange("parentName", e.target.value)}
                      className="mt-1 bg-background border-border"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentEmail" className="text-foreground">
                      Email Address *
                    </Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) => handleInputChange("parentEmail", e.target.value)}
                      className="mt-1 bg-background border-border"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentPhone" className="text-foreground">
                      Phone Number *
                    </Label>
                    <Input
                      id="parentPhone"
                      type="tel"
                      value={formData.parentPhone}
                      onChange={(e) => handleInputChange("parentPhone", e.target.value)}
                      className="mt-1 bg-background border-border"
                      placeholder="(602) 555-0000"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={prevStep} className="flex-1 border-border bg-transparent">
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    <CheckCircle2 className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-6">
            By submitting, you agree to be contacted by Raw2Recruited regarding training opportunities.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
