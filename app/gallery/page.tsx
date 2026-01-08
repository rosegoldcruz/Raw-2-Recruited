"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FlatGallery } from "@/components/flat-gallery"
import { PageHero } from "@/components/page-hero"

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="PROOF OF"
        highlight="WORK"
        description="See our athletes in action. Real training, real results."
      />
      <FlatGallery />
      <Footer />
    </main>
  )
}
