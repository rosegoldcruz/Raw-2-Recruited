import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Film, Target, ShieldCheck, Sparkles, Send, ListChecks } from "lucide-react"

export const metadata: Metadata = {
  title: "Recruiting Services & Film Review | RAW2RECRUITED",
  description:
    "Hands-on recruiting services for football athletes: film breakdown, targeted outreach to NAIA, D3, D2, and D1 staffs, and clear guidance to get seen.",
  keywords: [
    "football recruiting services",
    "film review",
    "college coach outreach",
    "NAIA recruiting",
    "D3 recruiting",
    "D2 recruiting",
    "D1 recruiting",
    "RAW2RECRUITED recruiting",
  ],
}

const deliverables = [
  {
    title: "Film Audit & Rebuild",
    description: "We break down reps, reorder clips, and package a coach-ready highlight that shows intent and IQ.",
    icon: Film,
  },
  {
    title: "Targeted Outreach",
    description: "Direct, personalized outreach to NAIA, D3, D2, and D1 staffs mapped to your profile and academics.",
    icon: Mail,
  },
  {
    title: "Coach-Ready Profile",
    description: "Measurables, transcript prompts, schedule links, and verified contact info presented cleanly.",
    icon: ShieldCheck,
  },
  {
    title: "Next-Step Guidance",
    description: "Follow-up scripts, reply handling, and visit/interview prep so nothing stalls after first contact.",
    icon: ListChecks,
  },
]

const workflow = [
  {
    title: "Assess & Position",
    copy: "We learn your goals, level fit, and academic window. Then we position you with the right angle and data.",
    icon: Target,
  },
  {
    title: "Rebuild the Film",
    copy: "Clip selection, sequencing, captions, and context that make a coach watch the full reel.",
    icon: Film,
  },
  {
    title: "Outreach & Follow-Up",
    copy: "Multi-division reach-out with tailored notes; we manage replies and keep momentum moving.",
    icon: Send,
  },
  {
    title: "Close the Loop",
    copy: "Interview prep, visit planning, and decision support so offers are understood and acted on fast.",
    icon: Sparkles,
  },
]

export default function RecruitingServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
        <div className="absolute -top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/30 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide">
              Recruiting Services
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight">
              Film that clicks. Outreach that gets opened.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We blend sharp film edits with targeted outreach to NAIA, D3, D2, and D1 staffs. Every send feels personal,
              every follow-up is handled, and you get a clear read on real interest — not guesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 group">
                  Start My Recruiting Plan
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/programs/womens-flag-football">
                <Button variant="outline" className="border-border text-foreground font-semibold text-lg px-8 py-6">
                  See Training First
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Hands-on service. No generic blasts. Clear communication to coaches and to you.
            </p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl">
            <div className="grid sm:grid-cols-2 gap-6">
              {deliverables.map((item) => (
                <div key={item.title} className="bg-background border border-border rounded-2xl p-5 h-full">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-background border border-border px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">A precise, four-step pipeline.</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
            We cut the guesswork. You see the targets, messaging, and responses. Coaches see a clear, coach-ready athlete.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.map((step, index) => (
              <div key={step.title} className="relative bg-background border border-border rounded-2xl p-5 h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl font-black text-primary/20">0{index + 1}</span>
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide text-primary">
                Why Us
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground">Clarity for you, signal for coaches.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We keep you informed with every touchpoint while presenting coaches with exactly what they need: film,
                measurables, academics, and concise communication. You stay in the loop; they stay engaged.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary mt-1" />
                  <span>Personalized notes to staffs by level and scheme fit.</span>
                </li>
                <li className="flex gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary mt-1" />
                  <span>Fast iterations on film when new games or camps drop.</span>
                </li>
                <li className="flex gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary mt-1" />
                  <span>Transparent tracking so you see who opened and replied.</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-black text-foreground mb-3">What you get</h3>
              <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                <p>• Rebuilt highlight film with context captions and lead clip strategy</p>
                <p>• Curated college list by level, academic fit, geography, and scheme</p>
                <p>• Personalized outreach emails with your profile, schedule, and film</p>
                <p>• Reply handling support and follow-up cadence</p>
                <p>• Quarterly strategy check-ins to adjust targets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">Ready for real recruiting momentum?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Tell us your goals, level, and timeline. We will outline a film plan, target list, and outreach cadence tailored to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6">
                Talk to Recruiting
              </Button>
            </Link>
            <Link href="/programs">
              <Button variant="outline" className="border-border text-foreground font-semibold text-lg px-8 py-6">
                View All Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
