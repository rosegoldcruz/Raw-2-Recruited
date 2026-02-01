import Image from "next/image"
import { Play } from "lucide-react"

const mediaItems = [
  {
    type: "image",
    src: "/assests/star.jpeg",
    alt: "Raw2Recruited training",
  },
  {
    type: "video",
    src: "/assests/feet.mp4",
    alt: "Footwork drills",
  },
  {
    type: "image",
    src: "/assests/wrastle.jpeg",
    alt: "Wrestling technique training",
  },
  {
    type: "video",
    src: "/assests/huddle.mp4",
    alt: "Team huddle",
  },
  {
    type: "video",
    src: "/assests/raw.mp4",
    alt: "Raw training footage",
  },
  {
    type: "video",
    src: "/assests/raw2.mp4",
    alt: "Raw training session",
  },
  {
    type: "video",
    src: "/assests/WhatsApp Video 2026-01-07 at 4.06.58 PM.mp4",
    alt: "Training highlights",
  },
]

export function MediaGallery() {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer bg-card"
            >
              <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
                {item.type === "image" ? (
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    width={800}
                    height={800}
                    className="w-auto h-auto max-w-full group-hover:scale-105 transition-transform duration-500"
                    loading={index < 3 ? 'eager' : 'lazy'}
                  />
                ) : (
                  <video
                    src={item.src}
                    className="w-auto h-auto max-w-full"
                    controls
                    preload="metadata"
                    playsInline
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
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
  )
}
