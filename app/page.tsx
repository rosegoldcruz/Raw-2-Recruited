import { HeroSection } from "@/components/hero-section"
import { ValueProps } from "@/components/value-props"
import { CoachesPreview } from "@/components/coaches-preview"
import { MediaPreview } from "@/components/media-preview"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ValueProps />
      <CoachesPreview />
      <MediaPreview />
      <CTASection />
      <Footer />
    </main>
  )
}
