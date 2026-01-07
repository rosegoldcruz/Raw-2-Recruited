import Image from "next/image"
import { Play } from "lucide-react"

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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
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
  )
}
