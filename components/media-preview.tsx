import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
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
              className="relative aspect-[3/4] rounded-xl overflow-hidden border border-border"
            >
              {item.type === "image" ? (
                <Image
                  src={item.src || "/placeholder.svg"}
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
                />
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
