import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Users, Lightbulb, Flame, Trophy, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Full Team Training",
    description: "Complete training sessions for your entire team, from fundamentals to advanced techniques.",
  },
  {
    icon: Lightbulb,
    title: "Coach Education",
    description: "We coach the coaches too — equipping your staff with drills and techniques to continue development.",
  },
  {
    icon: Flame,
    title: "Drill Intensity",
    description: "High-energy, game-speed drills that prepare your team for real competition.",
  },
  {
    icon: Trophy,
    title: "Game Prep",
    description: "Strategic preparation and mental readiness training for upcoming games and seasons.",
  },
]

const includes = [
  "Position-specific technique training",
  "Speed and agility development",
  "Football IQ and situational awareness",
  "Team chemistry building exercises",
  "Coach education and drill breakdowns",
  "Progress assessment and recommendations",
]

export default function ClinicsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <PageHero
        title="TEAM"
        highlight="CLINICS"
        description="Professional training for Pop Warner & Youth teams. We coach the coaches AND the kids."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Elevate your entire team's performance with our professional clinic sessions. Our coaches bring real IQ,
              footwork drills, and game-ready techniques that transform how your team practices and plays.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-foreground text-center mb-6">What's Included</h2>
            <ul className="space-y-3">
              {includes.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold group">
                Book a Team Clinic
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
