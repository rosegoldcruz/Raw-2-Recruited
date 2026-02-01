"use client"

import React, { useState, useEffect, useRef } from "react"
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const itemCount = mediaItems.length
  const radius = 400
  const angleIncrement = 360 / itemCount

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  // Handle video playback when index changes
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.volume = 1.0
          video.play().catch(() => {
            // Autoplay might be blocked, ignore error
          })
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [currentIndex])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      setRotation((prev) => prev + angleIncrement)
      setCurrentIndex((prev) => (prev + 1) % itemCount)
    }
    if (isRightSwipe) {
      setRotation((prev) => prev - angleIncrement)
      setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount)
    }
  }

  const goToPrevious = () => {
    setRotation((prev) => prev - angleIncrement)
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount)
  }

  const goToNext = () => {
    setRotation((prev) => prev + angleIncrement)
    setCurrentIndex((prev) => (prev + 1) % itemCount)
  }

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

        {/* Desktop 3D Carousel */}
        <div className="hidden lg:block relative w-full h-[800px]">
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
                    className="absolute top-1/2 left-1/2 max-w-md cursor-pointer group"
                    style={{
                      transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${-angle}deg)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="relative rounded-2xl overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 shadow-2xl bg-card">
                      {item.type === "image" ? (
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={400}
                          height={400}
                          className="w-auto h-auto max-w-full group-hover:scale-105 transition-transform duration-500"
                          style={{ objectFit: 'contain' }}
                        />
                      ) : (
                        <div className="relative">
                          <video
                            src={item.src}
                            className="w-auto h-auto max-w-full max-h-[600px]"
                            style={{ objectFit: 'contain' }}
                            loop
                            muted
                            playsInline
                            autoPlay
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => {
                              e.currentTarget.pause()
                              e.currentTarget.currentTime = 0
                            }}
                          />
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
              onClick={goToPrevious}
              className="bg-card border-2 border-border hover:border-primary text-foreground px-6 py-3 rounded-full font-bold transition-all hover:scale-105"
            >
              ← Previous
            </button>
            <button
              onClick={goToNext}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-bold transition-all hover:scale-105"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Mobile Simple Carousel */}
        <div 
          className="lg:hidden relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative min-h-[400px] flex items-center justify-center touch-pan-y">
            {mediaItems.map((item, index) => (
              <div
                key={index}
                classNamref={(el) => (videoRefs.current[index] = el)}
                        src={item.src}
                        className="w-auto h-auto max-w-full"
                        loop
                        playsInline
                <div className="max-w-lg mx-auto px-4">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-border bg-card shadow-2xl">
                    {item.type === "image" ? (
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={800}
                        height={800}
                        className="w-auto h-auto max-w-full"
                      />
                    ) : (
                      <video
                        src={item.src}
                        className="w-auto h-auto max-w-full"
                        loop
                        muted
                        playsInline
                        autoPlay
                        controls
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                      <p className="text-foreground font-bold text-sm">{item.alt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={goToPrevious}
              className="bg-card border-2 border-border text-foreground px-6 py-3 rounded-full font-bold transition-all active:scale-95 touch-manipulation min-w-[44px] min-h-[44px]"
            >
              ← Prev
            </button>
            <div className="flex items-center gap-1">
              {mediaItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx)
                    setRotation(idx * angleIncrement)
                  }}
                  className={`w-2 h-2 rounded-full transition-all touch-manipulation ${
                    idx === currentIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold transition-all active:scale-95 touch-manipulation min-w-[44px] min-h-[44px]"
            >
              Next →
            </button>
          </div>

          <p className="text-center mt-4 text-sm text-muted-foreground">← Swipe to browse →</p>
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
