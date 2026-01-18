import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, ShieldCheck, Sparkles, Trophy, Users, Flag as FlagIcon } from "lucide-react"

const pillars = [
  {
    title: "College-Ready Development",
    description: "Position-specific flag IQ, speed, and film prep built to translate to the college game.",
    icon: Trophy,
  },
  {
    title: "Culture of Leadership",
    description: "2Raw athletes learn to lead on and off the field with accountability, academics, and service.",
    icon: ShieldCheck,
  },
  {
    title: "West Valley Roots",
    description: "Tolleson, Laveen, Avondale, Surprise, and Buckeye athletes train together — one club, one standard.",
    icon: MapPin,
  },
  {
    title: "Recruiting Pipeline",
    description: "Highlight film, showcase prep, and direct guidance on schools actively offering flag scholarships.",
    icon: Sparkles,
  },
]

const scholarshipHighlights = [
  "Women's flag football is now scholarship-eligible across NAIA and growing NCAA programs.",
  "Over 600 schools sponsor women's flag — with more being added every semester.",
  "Early recruiting positioning matters; we build film and exposure that coaches expect.",
]

const cityPages = [
  { name: "Tolleson", slug: "tolleson", blurb: "Home-town grit with college-level standards." },
  { name: "Laveen", slug: "laveen", blurb: "Southwest Phoenix talent ready to be seen." },
  { name: "Avondale", slug: "avondale", blurb: "Lock in fundamentals and game speed." },
  { name: "Surprise", slug: "surprise", blurb: "High-ceiling athletes aiming for showcases." },
  { name: "Buckeye", slug: "buckeye", blurb: "Building varsity-ready playmakers." },
]

export const metadata: Metadata = {
  title: "2Raw West Valley Club | Inaugural Girls Flag Football in Arizona",
  description:
    "2Raw is the inaugural West Valley girls flag football club serving Tolleson, Laveen, Avondale, Surprise, and Buckeye. Founding roster now forming with college-ready, scholarship-focused development.",
  keywords: [
    "2Raw flag football",
    "West Valley girls flag",
    "Tolleson flag football",
    "Laveen flag football",
    "Avondale flag football",
    "Surprise flag football",
    "Buckeye flag football",
    "Arizona women's flag scholarships",
  ],
}

export default function WestValleyClubPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 text-primary font-semibold">
              <FlagIcon className="w-4 h-4" />
              2Raw | Founding Season | West Valley
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-foreground">
              2RAW
              <span className="block text-primary">Located in the West Valley.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              2Raw is the brand-new girls flag football club for Tolleson, Laveen, Avondale, Surprise, and Buckeye. We
              are forming our first roster now — no past season, no old highlight reel. You&apos;ll be the first athletes we
              build film, IQ, and leadership with to chase the scholarships now available for women&apos;s flag football.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#apply">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 group">
                  Join the Founding Roster
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#mission">
                <Button variant="outline" className="border-border text-foreground font-bold text-lg px-8 py-6">
                  Our Mission
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="px-3 py-1 rounded-full bg-card border border-border">Tolleson</span>
              <span className="px-3 py-1 rounded-full bg-card border border-border">Laveen</span>
              <span className="px-3 py-1 rounded-full bg-card border border-border">Avondale</span>
              <span className="px-3 py-1 rounded-full bg-card border border-border">Surprise</span>
              <span className="px-3 py-1 rounded-full bg-card border border-border">Buckeye</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-primary/5 rounded-3xl rotate-3" />
            <div className="relative bg-card border border-border rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-background border border-border rounded-2xl p-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Club Size</p>
                  <p className="text-2xl font-black text-foreground">Limited Roster</p>
                </div>
                <div className="bg-background border border-border rounded-2xl p-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Pipeline</p>
                  <p className="text-2xl font-black text-foreground">Scholarship Ready</p>
                </div>
                <div className="bg-background border border-border rounded-2xl p-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Competition</p>
                  <p className="text-2xl font-black text-foreground">Showcase Focused</p>
                </div>
                <div className="bg-background border border-border rounded-2xl p-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Coverage</p>
                  <p className="text-2xl font-black text-foreground">West Valley</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="py-16 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-background border border-border px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Mission First
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground">
                Developing women who compete, lead, and earn their opportunities.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                2Raw is more than a team. It is a standard. We instill discipline, leadership, and competitive edge while
                respecting academics and character. Our coaches come from college and pro backgrounds and know what it
                takes to get noticed — and prepared — for the next level.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="bg-background border border-border rounded-2xl p-5 h-full">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <pillar.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{pillar.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 rounded-full text-primary font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            College Scholarships Are Real
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            Women&apos;s Flag Football is a Scholarship Sport.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
            National governing bodies and college conferences have made it official: women&apos;s flag football now unlocks
            true scholarship paths. This is our first season — we are building the film, reps, and exposure from day one
            to keep West Valley athletes ahead of the curve.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {scholarshipHighlights.map((item) => (
              <div key={item} className="bg-card border border-border rounded-2xl p-5 text-left">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground font-semibold leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black text-foreground">Serve the West Valley</h2>
              <p className="text-muted-foreground">Find your city page for schedules, training windows, and sign-up.</p>
            </div>
            <Link href="#apply">
              <Button variant="outline" className="border-border font-semibold">
                Apply to 2Raw
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cityPages.map((city) => (
              <Link
                key={city.slug}
                href={`/programs/womens-flag-football/west-valley/${city.slug}`}
                className="group bg-background border border-border rounded-2xl p-5 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{city.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{city.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-3xl p-10 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold mb-6">
              Founding Roster — Year One
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">Ready to Represent 2Raw?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Founding season: no prior stats or highlight reels to compete with — just your work ethic and goals. Tell
              us where you train and what you&apos;re chasing. We review every athlete and respond with next steps.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
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
        </div>
      </section>

      <Footer />
    </main>
  )
}
