import { Layers, Target, Brain } from "lucide-react"

const props = [
  {
    icon: Layers,
    title: "Complete Player Development",
    description:
      "We don't train in isolation. We develop athletes through a structured system that builds technique, football IQ, physical readiness, and competitive confidence — from foundation to advanced pipelines.",
  },
  {
    icon: Target,
    title: "Pro-Level Technique",
    description:
      "Learn from former NFL, UFL, IFL, and college athletes who teach real fundamentals — footwork, leverage, positioning, and game-ready mechanics that translate under pressure.",
  },
  {
    icon: Brain,
    title: "Football IQ & Decision-Making",
    description:
      "We train the mental side of the game — reading leverage, understanding situations, and making faster decisions. Technique without intelligence breaks down. We build both.",
  },
]

export function ValueProps() {
  return (
    <section className="py-20 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            WHY <span className="text-primary">RAW2RECRUITED</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We don't just train athletes—we develop complete football players ready for the next level.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {props.map((prop, index) => (
            <div
              key={index}
              className="group relative bg-background border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  {prop.icon && <prop.icon className="w-7 h-7 text-primary" />}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{prop.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{prop.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
