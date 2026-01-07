"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronRight, Home, Layers, Users, ImageIcon, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [programsExpanded, setProgramsExpanded] = useState(false)

  const closeNav = () => {
    setIsOpen(false)
    setProgramsExpanded(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Hamburger button */}
            <button
              className="text-foreground hover:text-primary transition-colors p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <Menu size={28} />
            </button>
            {/* Center logo */}
            <Link href="/" className="flex items-center absolute left-1/2 -translate-x-1/2">
              <Image
                src="/images/untitled-20-281024-20x-201128-20px-29.png"
                alt="RAW2RECRUITED Logo"
                width={80}
                height={88}
                className="h-16 md:h-[74px] w-auto"
              />
            </Link>
            {/* CTA button on right */}
            <Link href="/contact" className="hidden sm:block">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">Apply Now</Button>
            </Link>
            <div className="sm:hidden w-10" /> {/* Spacer for mobile */}
          </div>
        </div>
      </nav>

      {isOpen && <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={closeNav} />}

      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-background border-r border-border z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Image
            src="/images/untitled-20-281024-20x-201128-20px-29.png"
            alt="RAW2RECRUITED Logo"
            width={60}
            height={66}
            className="h-12 w-auto"
          />
          <button
            className="text-foreground hover:text-primary transition-colors p-2"
            onClick={closeNav}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation links */}
        <div className="flex flex-col py-4">
          <Link
            href="/"
            className="flex items-center gap-4 px-6 py-4 text-foreground hover:text-primary hover:bg-accent transition-colors font-medium text-lg"
            onClick={closeNav}
          >
            <Home size={22} />
            Home
          </Link>

          {/* Programs section with expandable sub-menu */}
          <div>
            <button
              className="flex items-center justify-between w-full px-6 py-4 text-foreground hover:text-primary hover:bg-accent transition-colors font-medium text-lg"
              onClick={() => setProgramsExpanded(!programsExpanded)}
            >
              <span className="flex items-center gap-4">
                <Layers size={22} />
                Programs
              </span>
              <ChevronRight
                size={20}
                className={`transition-transform duration-200 ${programsExpanded ? "rotate-90" : ""}`}
              />
            </button>

            {/* Sub-menu */}
            <div className={`overflow-hidden transition-all duration-300 ${programsExpanded ? "max-h-96" : "max-h-0"}`}>
              <Link
                href="/programs"
                className="block pl-16 pr-6 py-3 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                onClick={closeNav}
              >
                All Programs
              </Link>
              <Link
                href="/programs/esa"
                className="block pl-16 pr-6 py-3 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                onClick={closeNav}
              >
                ESA / Homeschool PE
              </Link>
              <Link
                href="/programs/private-training"
                className="block pl-16 pr-6 py-3 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                onClick={closeNav}
              >
                Private 1-on-1
              </Link>
              <Link
                href="/programs/clinics"
                className="block pl-16 pr-6 py-3 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                onClick={closeNav}
              >
                Team Clinics
              </Link>
              <Link
                href="/programs/womens-flag-football"
                className="block pl-16 pr-6 py-3 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                onClick={closeNav}
              >
                Women's Flag Football
              </Link>
            </div>
          </div>

          <Link
            href="/coaches"
            className="flex items-center gap-4 px-6 py-4 text-foreground hover:text-primary hover:bg-accent transition-colors font-medium text-lg"
            onClick={closeNav}
          >
            <Users size={22} />
            Coaches
          </Link>

          <Link
            href="/gallery"
            className="flex items-center gap-4 px-6 py-4 text-foreground hover:text-primary hover:bg-accent transition-colors font-medium text-lg"
            onClick={closeNav}
          >
            <ImageIcon size={22} />
            Gallery
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-4 px-6 py-4 text-foreground hover:text-primary hover:bg-accent transition-colors font-medium text-lg"
            onClick={closeNav}
          >
            <Phone size={22} />
            Contact
          </Link>
        </div>

        {/* Bottom CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <Link href="/contact" onClick={closeNav}>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-lg">
              Secure Your Spot
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
