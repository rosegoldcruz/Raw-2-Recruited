import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { ProgramCard } from "@/components/program-card"
import { GraduationCap, Crown, Users, Flag } from "lucide-react"

const programs = [
  {
    title: "Women's Flag Football",
    description:
      "Dedicated training for female athletes. Build elite skills for the growing competitive landscape and college pipeline opportunities.",
    href: "/programs/womens-flag-football",
    icon: Flag,
  },
  {
    title: "Private 1-on-1 Training",
    description:
      "Elite private sessions for athletes seeking a serious competitive edge. Position-specific training with personalized development plans.",
    href: "/programs/private-training",
    icon: Crown,
  },
  {
    title: "Team Clinics",
    description:
      "Professional training for Pop Warner & Youth teams. We coach the coaches AND the kids with real IQ and footwork drills.",
    href: "/programs/clinics",
    icon: Users,
  },
  {
    title: "ESA / Homeschool PE Credits",
    description:
      "Earn full PE credits through our state-accredited athletic training program. Perfect for Homeschool and ESA families looking for structured physical education.",
    href: "/programs/esa",
    icon: GraduationCap,
  },
]

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <PageHero
        title="TRAINING"
        highlight="PROGRAMS"
        description="Multiple training paths for every athlete. From PE credits to elite private coaching — choose the program that fits your goals."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <ProgramCard key={index} {...program} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
