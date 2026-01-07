import Image from "next/image"
import { Instagram } from "lucide-react"
import Link from "next/link"

const coaches = [
  {
    name: "Daniel Cruz",
    role: "Offensive Line Specialist",
    bio: "Former college O-lineman specializing in technique, leverage, and the tricks of the trade. Teaches linemen how to outsmart bigger opponents through footwork and positioning.",
    specialties: ["O-Line Technique", "Leverage & Footwork", "Run Blocking", "Pass Protection"],
    image: "/football-coach-male-athletic-portrait.jpg",
  },
  {
    name: "Dylan",
    role: "Head Trainer - Speed & Skills",
    bio: "Speed and agility expert focusing on the nuances of skill positions. Develops explosive athletes with elite route-running, catching, and defensive back techniques.",
    specialties: ["Speed Training", "Agility Drills", "Route Running", "Position Work"],
    image: "/athletic-trainer-male-football-coach-portrait.jpg",
  },
]

export function CoachesSection() {
  return (
    <section id="coaches" className="py-20 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            MEET YOUR <span className="text-primary">COACHES</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Former College & Semi-Pro athletes who've been in the trenches and know what it takes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className="group bg-background border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                <Image
                  src={coach.image || "/placeholder.svg"}
                  alt={coach.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 -mt-20 relative z-20">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-foreground">{coach.name}</h3>
                      <p className="text-primary font-semibold">{coach.role}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">{coach.bio}</p>

                  <div className="flex flex-wrap gap-2">
                    {coach.specialties.map((specialty, specialtyIndex) => (
                      <span
                        key={specialtyIndex}
                        className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="https://www.instagram.com/raw2recruitedaz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            <Instagram className="w-5 h-5" />
            Follow us @raw2recruitedaz
          </Link>
        </div>
      </div>
    </section>
  )
}
