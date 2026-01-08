import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { Instagram } from "lucide-react"
import Link from "next/link"

const coaches = [
  {
    name: "Dylan Katzenburger",
    role: "Head Trainer - Speed & Skills",
    bio: "Speed and agility expert focusing on the nuances of skill positions. Dylan develops explosive athletes with elite route-running, catching, and defensive back techniques. His training philosophy centers on footwork, body control, and reading defenses to give athletes an edge on game day.",
    specialties: [
      "Wide Receiver Specialist",
      "Speed Training",
      "Agility Drills",
      "Route Running",
      "Position Work",
      "DB Techniques",
      "Catching Mechanics",
    ],
    image: "/assests/coach.jpeg",
  },
  {
    name: "Daniel Cruz",
    role: "Offensive Line Specialist",
    bio: "Former college O-lineman specializing in technique, leverage, and the tricks of the trade. Daniel teaches linemen how to outsmart bigger opponents through footwork, hand placement, and positioning. His approach focuses on the mental game — understanding blocking schemes and anticipating defensive moves.",
    specialties: [
      "O-Line Technique",
      "Leverage & Footwork",
      "Run Blocking",
      "Pass Protection",
      "Hand Fighting",
      "Mental Game",
    ],
    image: "/assests/Coach Cruz.jpeg",
  },
  {
    name: "Carson Taylor",
    role: "Defensive Line Specialist",
    bio: "Carson brings intensity and technical precision to defensive line training. His expertise in pass rush moves, gap discipline, and run stopping helps defensive players dominate at the line of scrimmage. Carson emphasizes the importance of first-step quickness and reading offensive linemen.",
    specialties: [
      "D-Line Technique",
      "Pass Rush Moves",
      "Gap Discipline",
      "Run Defense",
      "First Step Quickness",
      "Hand Combat",
    ],
    image: "/images/image.png",
  },
  {
    name: "Jon Brown",
    role: "Quarterback Coach",
    bio: "Specializing in quarterback mechanics, footwork, and reading defenses. Jon helps quarterbacks develop arm strength, accuracy, and the mental processing speed needed to lead an offense. From pocket presence to throwing on the run, he covers all aspects of the modern QB game.",
    specialties: [
      "QB Mechanics",
      "Footwork",
      "Reading Defenses",
      "Arm Strength",
      "Accuracy",
      "Pocket Presence",
    ],
    image: "/assests/Jon Brown.jpeg",
  },
]

export default function CoachesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <PageHero
        title="MEET YOUR"
        highlight="COACHES"
        description="Former NFL, UFL, IFL, and College athletes who've been in the trenches and know what it takes."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {coaches.map((coach, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="relative aspect-square md:aspect-auto">
                    <Image
                      src={coach.image || "/placeholder.svg"}
                      alt={coach.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="md:col-span-2 p-8">
                    <div className="mb-4">
                      <h2 className="text-3xl font-black text-foreground">{coach.name}</h2>
                      <p className="text-primary font-semibold text-lg">{coach.role}</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">{coach.bio}</p>
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-3">SPECIALTIES</h4>
                      <div className="flex flex-wrap gap-2">
                        {coach.specialties.map((specialty, specialtyIndex) => (
                          <span
                            key={specialtyIndex}
                            className="bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
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

      <Footer />
    </main>
  )
}
