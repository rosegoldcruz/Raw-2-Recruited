"use client"

import Image from "next/image"
import { Instagram } from "lucide-react"
import Link from "next/link"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"

const coaches = [
  {
    name: "Daniel Cruz",
    role: "Offensive Line Specialist",
    bio: "Former college O-lineman specializing in technique, leverage, and the tricks of the trade. Teaches linemen how to outsmart bigger opponents through footwork and positioning.",
    specialties: ["O-Line Technique", "Leverage & Footwork", "Run Blocking", "Pass Protection"],
    image: "/football-coach-male-athletic-portrait.jpg",
  },
  {
    name: "Dylan",
    role: "Head Trainer - Speed & Skills",
    bio: "Speed and agility expert focusing on the nuances of skill positions. Develops explosive athletes with elite route-running, catching, and defensive back techniques.",
    specialties: ["Speed Training", "Agility Drills", "Route Running", "Position Work"],
    image: "/assests/coach.jpeg",
  },
]

export function CoachesSection() {
  return (
    <section id="coaches" className="py-20 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            MEET YOUR <span className="text-primary">COACHES</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Former College & Semi-Pro athletes who've been in the trenches and know what it takes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {coaches.map((coach, index) => (
            <CardContainer key={index} className="inter-var">
              <CardBody className="bg-background relative group/card dark:hover:shadow-2xl dark:hover:shadow-primary/[0.1] border-border w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-2xl font-black text-foreground"
                >
                  {coach.name}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-primary font-semibold text-sm mt-2"
                >
                  {coach.role}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image
                      src={coach.image || "/placeholder.svg"}
                      alt={coach.name}
                      fill
                      className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />
                  </div>
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-muted-foreground text-sm mt-4 leading-relaxed"
                >
                  {coach.bio}
                </CardItem>
                <div className="flex flex-wrap gap-2 mt-4">
                  {coach.specialties.map((specialty, specialtyIndex) => (
                    <CardItem
                      key={specialtyIndex}
                      translateZ={20}
                      className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {specialty}
                    </CardItem>
                  ))}
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="https://www.instagram.com/raw2recruitedaz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            <Instagram className="w-5 h-5" />
            Follow us @raw2recruitedaz
          </Link>
        </div>
      </div>
    </section>
  )
}
