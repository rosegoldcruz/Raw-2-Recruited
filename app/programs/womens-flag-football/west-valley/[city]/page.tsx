import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Flag as FlagIcon, MapPin, ShieldCheck, Sparkles, Target, Users } from "lucide-react"

const cityContent = {
  tolleson: {
    name: "Tolleson",
    intro: "West Valley roots with college-level expectations.",
    localNote: "Easy access for athletes across Tolleson and the I-10 corridor.",
  },
  laveen: {
    name: "Laveen",
    intro: "Southwest Phoenix athletes ready to compete beyond rec play.",
    localNote: "Close drive to our West Valley blocks and showcase prep days.",
  },
  avondale: {
    name: "Avondale",
    intro: "Sharpen footwork, speed, and IQ to separate on game day.",
    localNote: "Serving Avondale families looking for varsity and college pathways.",
  },
  surprise: {
    name: "Surprise",
    intro: "High-ceiling athletes training for showcases and scholarships.",
    localNote: "Northwest West Valley sessions with direct recruiting guidance.",
  },
  buckeye: {
    name: "Buckeye",
    intro: "Building varsity-ready playmakers with leadership at the core.",
    localNote: "Fast-growing talent base with direct access to 2Raw staff.",
  },
} satisfies Record<string, { name: string; intro: string; localNote: string }>

const differentiators = [
  {
    title: "Scholarship Focused",
    description: "Women&apos;s flag is now a scholarship sport. We train and showcase with that standard in mind.",
    icon: Sparkles,
  },
  {
    title: "Leadership & Culture",
    description: "We teach communication, accountability, and composure so athletes can lead on and off the field.",
    icon: ShieldCheck,
  },
  {
    title: "Game-Speed Training",
    description: "Footwork, reads, and decision-making at real tempo — not clinic-style walkthroughs.",
    icon: Target,
  },
  {
    title: "Tight Roster",
    description: "Limited spots keep reps high and feedback real. Quality over volume.",
    icon: Users,
  },
]

const scholarshipPoints = [
  "NAIA and emerging NCAA programs now recognize women&apos;s flag with real scholarship dollars.",
  "Over 600 schools sponsor women&apos;s flag; more add programs each term.",
  "College coaches expect film, IQ, and leadership — we build all three.",
]

type CityParam = keyof typeof cityContent

export function generateStaticParams() {
  return Object.keys(cityContent).map((city) => ({ city }))
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const city = cityContent[params.city as CityParam]
  if (!city) {
    return {
      title: "2Raw West Valley Girls Flag Football",
      description: "2Raw West Valley girls flag football club with scholarship-focused training and an inaugural roster forming now.",
    }
  }

  return {
    title: `${city.name} Girls Flag Football Club | 2Raw West Valley Inaugural Team`,
    description: `Train with 2Raw in ${city.name}. Inaugural, scholarship-focused women\'s flag football development for West Valley athletes ready to compete at the next level.`,
  }
}

export default function CityPage({ params }: { params: { city: CityParam } }) {
  const city = cityContent[params.city]
  if (!city) notFound()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 text-primary font-semibold mb-6">
            <FlagIcon className="w-4 h-4" />
            2Raw | Founding Season | {city.name}
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-black text-foreground leading-tight">
                {city.name} Girls Flag Football
                <span className="block text-primary">A 2Raw West Valley Team.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{city.intro}</p>
              <p className="text-muted-foreground">{city.localNote}</p>
              <p className="text-muted-foreground">
                This is our first season — no past highlights yet. You&apos;ll be the first athletes we develop and film in {city.name}.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6">
                    Apply to Founding Roster
                  </Button>
                </Link>
                <Link href="/programs/womens-flag-football/west-valley">
                  <Button variant="outline" className="border-border text-foreground font-semibold px-8 py-6">
                    West Valley Overview
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">West Valley Coverage</p>
                  <p className="text-lg font-bold text-foreground">Tolleson • Laveen • Avondale • Surprise • Buckeye</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {differentiators.map((item) => (
                  <div key={item.title} className="bg-background border border-border rounded-2xl p-4 h-full">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-background border border-border px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Scholarship Pathway
              </div>
              <h2 className="text-3xl font-black text-foreground">Women&apos;s Flag is Now a Scholarship Sport.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Colleges are adding flag football every semester. The athletes who earn those spots will have game-speed
                reps, clear film, and leadership to match. That is what 2Raw builds for {city.name}.
              </p>
            </div>
            <div className="grid gap-4">
              {scholarshipPoints.map((point) => (
                <div key={point} className="bg-background border border-border rounded-2xl p-4 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary mt-1" />
                  <p className="text-foreground leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold mb-6">
            Limited Spots
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">Join the 2Raw West Valley Roster.</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Tell us about your experience and goals. We respond with fit, timelines, and how to plug into the nearest
            West Valley training block.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6">
                Apply Now
              </Button>
            </Link>
            <Link href="/programs/womens-flag-football">
              <Button variant="outline" className="border-border text-foreground font-semibold px-8 py-6">
                View Training Path
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
