import Image from "next/image"
import Link from "next/link"
import { Play, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const mediaItems = [
  {
    type: "image",
    src: "/assests/star.jpeg",
    alt: "Training star athlete",
  },
  {
    type: "video",
    src: "/assests/raw.mp4",
    alt: "Raw training footage",
  },
  {
    type: "image",
    src: "/assests/wework.jpeg",
    alt: "We work together",
  },
  {
    type: "video",
    src: "/assests/huddle.mp4",
    alt: "Team huddle",
  },
]

export function MediaPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            PROOF OF <span className="text-primary">WORK</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            See our athletes in action. Real training, real results.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              {item.type === "image" ? (
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <video
                  src={item.src}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/gallery">
            <Button
              variant="outline"
              className="font-bold group bg-transparent border-border hover:bg-accent text-foreground"
            >
              View Full Gallery
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
