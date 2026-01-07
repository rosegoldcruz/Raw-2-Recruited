import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Star, Crown, Users } from "lucide-react"

const tiers = [
  {
    name: "The Credit Program",
    icon: Star,
    price: "Contact",
    period: "for pricing",
    description: "Full PE credit for Homeschool & ESA students through structured athletic education.",
    features: [
      "State-accredited PE credits",
      "Structured curriculum",
      "Progress tracking & reports",
      "Flexible scheduling",
      "Certified training program",
    ],
    popular: false,
  },
  {
    name: "Team Clinics",
    icon: Users,
    price: "Book",
    period: "your team",
    description: "Professional training for Pop Warner & Youth teams. We coach the coaches AND the kids.",
    features: [
      "Full team training sessions",
      "Coach education included",
      "Real IQ & footwork drills",
      "Position-specific technique",
      "Game-day preparation",
    ],
    popular: true,
  },
  {
    name: "Elite 1-on-1",
    icon: Crown,
    price: "Premium",
    period: "sessions",
    description: "High-ticket private sessions for athletes seeking a serious competitive edge.",
    features: [
      "Personalized training plan",
      "Film study & analysis",
      "Position mastery focus",
      "Mental game coaching",
      "College recruitment prep",
    ],
    popular: false,
  },
]

export function ServiceTiers() {
  return (
    <section id="programs" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            TRAINING <span className="text-primary">PROGRAMS</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From PE credits to elite private coaching—choose the path that fits your athlete's goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-card border rounded-2xl p-8 flex flex-col ${
                tier.popular ? "border-primary shadow-lg shadow-primary/10 scale-105" : "border-border"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    tier.popular ? "bg-primary text-primary-foreground" : "bg-accent text-foreground"
                  }`}
                >
                  <tier.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-black text-foreground">{tier.price}</span>
                <span className="text-muted-foreground ml-2">{tier.period}</span>
              </div>

              <p className="text-muted-foreground mb-6">{tier.description}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/contact">
                <Button
                  className={`w-full font-bold ${
                    tier.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-accent hover:bg-accent/80 text-foreground"
                  }`}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
