"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

interface MediaItem {
  type: "image" | "video"
  src: string
  alt: string
}

const mediaItems: MediaItem[] = [
  { type: "image", src: "/assests/star.jpeg", alt: "Training star athlete" },
  { type: "video", src: "/assests/feet.mp4", alt: "Footwork drills" },
  { type: "video", src: "/assests/holly.mp4", alt: "Holly training session" },
  { type: "video", src: "/assests/huddle.mp4", alt: "Team huddle" },
  { type: "video", src: "/assests/kick.mp4", alt: "Kicking technique" },
  { type: "video", src: "/assests/line.mp4", alt: "Line drills" },
  { type: "video", src: "/assests/raw.mp4", alt: "Raw training footage" },
  { type: "video", src: "/assests/raw2.mp4", alt: "Raw training session 2" },
  { type: "video", src: "/assests/snap.mp4", alt: "Snap technique" },
  { type: "video", src: "/assests/snap2.mp4", alt: "Snap drill 2" },
  { type: "image", src: "/assests/wework.jpeg", alt: "We work together" },
  { type: "video", src: "/assests/work.mp4", alt: "Work ethic" },
  { type: "image", src: "/assests/wrastle.jpeg", alt: "Wrestling technique" },
]

export function CircularGallery() {
  const [rotation, setRotation] = useState(0)

  const itemCount = mediaItems.length
  const radius = 400
  const angleIncrement = 360 / itemCount

  return (
    <section id="gallery" className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            PROOF OF <span className="text-primary">WORK</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            See our athletes in action. Real training, real results.
          </p>
        </div>

        <div className="relative w-full h-[800px] flex items-center justify-center">
          <div
            className="relative w-full h-full"
            style={{
              perspective: "1200px",
            }}
          >
            <div
              className="relative w-full h-full transition-transform duration-1000 ease-out"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${rotation}deg)`,
              }}
            >
              {mediaItems.map((item, index) => {
                const angle = angleIncrement * index
                const x = Math.sin((angle * Math.PI) / 180) * radius
                const z = Math.cos((angle * Math.PI) / 180) * radius

                return (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2 w-64 h-80 cursor-pointer group"
                    style={{
                      transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${-angle}deg)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 shadow-2xl bg-card">
                      {item.type === "image" ? (
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="relative w-full h-full">
                          <video
                            src={item.src}
                            className="w-full h-full object-cover"
                            loop
                            muted
                            playsInline
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                              <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <p className="text-foreground font-bold text-sm">{item.alt}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
            <button
              onClick={() => setRotation((prev) => prev - angleIncrement)}
              className="bg-card border-2 border-border hover:border-primary text-foreground px-6 py-3 rounded-full font-bold transition-all hover:scale-105"
            >
              ← Previous
            </button>
            <button
              onClick={() => setRotation((prev) => prev + angleIncrement)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-bold transition-all hover:scale-105"
            >
              Next →
            </button>
          </div>
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
  )
}
