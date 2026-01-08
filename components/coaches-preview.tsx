import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const coaches = [
  {
    name: "Dylan Katzenburger",
    role: "Head Trainer - Speed & Skills",
    image: "/assests/coach.jpeg",
  },
  {
    name: "Daniel Cruz",
    role: "Offensive Line Specialist",
    image: "/images/daniel-cruz.jpg",
  },
  {
    name: "Carson Taylor",
    role: "Defensive Line Specialist",
    image: "/images/image.png",
  },
  {
    name: "Jon Brown",
    role: "Quarterback Coach",
    image: "/assests/Jon Brown.jpeg",
  },
]

export function CoachesPreview() {
  return (
    <section className="py-20 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            MEET YOUR <span className="text-primary">COACHES</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Former College & Semi-Pro athletes who've been in the trenches and know what it takes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
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
              <div className="p-6 -mt-16 relative z-20">
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <h3 className="text-xl font-black text-foreground">{coach.name}</h3>
                  <p className="text-primary font-semibold text-sm">{coach.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/coaches">
            <Button
              variant="outline"
              className="font-bold group bg-transparent border-border hover:bg-accent text-foreground"
            >
              View Full Profiles
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
