"use client"

import React from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  { type: "video", src: "/assests/linefoot.mp4", alt: "Line footwork training" },
  { type: "video", src: "/assests/raw.mp4", alt: "Raw training footage" },
  { type: "video", src: "/assests/raw2.mp4", alt: "Raw training session 2" },
  { type: "video", src: "/assests/snap.mp4", alt: "Snap technique" },
  { type: "video", src: "/assests/snap2.mp4", alt: "Snap drill 2" },
  { type: "image", src: "/assests/wework.jpeg", alt: "We work together" },
  { type: "video", src: "/assests/work.mp4", alt: "Work ethic" },
  { type: "image", src: "/assests/wrastle.jpeg", alt: "Wrestling technique" },
  { type: "video", src: "/assests/zander.mp4", alt: "Zander training session" },
  { type: "video", src: "/assests/zander holyfield.mp4", alt: "Zander Holyfield highlights" },
]

export function FlatGallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            PROOF OF <span className="text-primary">WORK</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            See our athletes in action. Real training, real results.
          </p>
        </div>

        <div className="relative group">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {mediaItems.map((item, index) => (
                <div
                  key={index}
                  className="pl-4 flex-[0_0_100%] min-w-0"
                >
                  <div className="max-w-sm mx-auto relative aspect-[9/16] rounded-2xl overflow-hidden border border-border bg-card">
                    {item.type === "image" ? (
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        loop
                        muted
                        playsInline
                        autoPlay
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-border hover:bg-background text-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-border hover:bg-background text-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
