"use client"

import { useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { Play, X } from "lucide-react"

const mediaItems = [
  {
    type: "image",
    src: "/football-training-youth-athlete-running-drills-fie.jpg",
    alt: "Athlete training on field",
  },
  {
    type: "video",
    src: "/football-player-catching-ball-action-shot.jpg",
    alt: "Catching drills",
  },
  {
    type: "image",
    src: "/youth-football-team-training-session-night-lights.jpg",
    alt: "Team training session",
  },
  {
    type: "video",
    src: "/football-speed-agility-cone-drills-athlete.jpg",
    alt: "Speed and agility training",
  },
  {
    type: "image",
    src: "/offensive-lineman-football-blocking-technique-trai.jpg",
    alt: "O-line technique training",
  },
  {
    type: "video",
    src: "/wide-receiver-route-running-football-training.jpg",
    alt: "Route running drills",
  },
  {
    type: "image",
    src: "/football-defensive-back-coverage-drill-training.jpg",
    alt: "DB coverage drills",
  },
  {
    type: "image",
    src: "/youth-football-player-athlete-portrait-field.jpg",
    alt: "Athlete portrait",
  },
  {
    type: "video",
    src: "/football-quarterback-throwing-mechanics-training.jpg",
    alt: "QB mechanics",
  },
  {
    type: "image",
    src: "/football-team-huddle-youth-sports-night-game.jpg",
    alt: "Team huddle",
  },
  {
    type: "image",
    src: "/football-player-sprinting-speed-training-field.jpg",
    alt: "Speed training",
  },
  {
    type: "video",
    src: "/football-linebacker-tackling-drill-training.jpg",
    alt: "Tackling drills",
  },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <PageHero
        title="PROOF OF"
        highlight="WORK"
        description="See our athletes in action. Real training, real results."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaItems.map((item, index) => (
              <div
                key={index}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(item.src)}
              >
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://www.instagram.com/raw2recruitedaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/80 text-foreground font-bold px-6 py-3 rounded-lg transition-colors"
            >
              View More on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center text-foreground hover:bg-accent transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative max-w-4xl max-h-[80vh] w-full h-full">
            <Image src={selectedImage || "/placeholder.svg"} alt="Gallery image" fill className="object-contain" />
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
