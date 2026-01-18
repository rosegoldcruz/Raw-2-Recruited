"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronRight, ChevronDown, Home, Layers, Users, ImageIcon, Phone, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClubAnnouncement } from "@/components/club-announcement"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [programsExpanded, setProgramsExpanded] = useState(false)
  const [desktopProgramsOpen, setDesktopProgramsOpen] = useState(false)
  const desktopProgramsRef = useRef<HTMLDivElement | null>(null)

  const closeNav = () => {
    setIsOpen(false)
    setProgramsExpanded(false)
    setDesktopProgramsOpen(false)
  }

  useEffect(() => {
    if (!desktopProgramsOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDesktopProgramsOpen(false)
    }

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const container = desktopProgramsRef.current
      if (!container) return
      const target = event.target as Node | null
      if (target && !container.contains(target)) setDesktopProgramsOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("touchstart", onPointerDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("touchstart", onPointerDown)
    }
  }, [desktopProgramsOpen])

  return (
    <>
      <ClubAnnouncement />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: logo + mobile hamburger */}
            <div className="flex items-center gap-2">
              <button
                className="md:hidden text-foreground hover:text-primary transition-colors p-2 -ml-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                <Menu size={28} />
              </button>

              <Link href="/" className="flex items-center gap-3" aria-label="Go to home">
                <Image
                  src="/images/untitled-20-281024-20x-201128-20px-29.png"
                  alt="RAW2RECRUITED Logo"
                  width={56}
                  height={62}
                  className="h-12 md:h-14 w-auto"
                  priority
                />
                <span className="hidden sm:block font-extrabold tracking-wide text-foreground">
                  RAW2RECRUITED
                </span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/programs/womens-flag-football/west-valley"
                className="text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
              >
                Club Team
              </Link>
              <div className="relative" ref={desktopProgramsRef}>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
                  aria-haspopup="menu"
                  aria-expanded={desktopProgramsOpen}
                  onClick={() => setDesktopProgramsOpen((v) => !v)}
                >
                  Programs
                  <ChevronDown size={16} className={`transition-transform ${desktopProgramsOpen ? "rotate-180" : ""}`} />
                </button>

                {desktopProgramsOpen && (
                  <div
                    role="menu"
                    aria-label="Programs"
                    className="absolute left-0 top-full mt-2 w-64 rounded-md border border-border bg-background shadow-lg overflow-hidden"
                  >
                    <Link
                      href="/programs"
                      role="menuitem"
                      className="block px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors"
                      onClick={() => setDesktopProgramsOpen(false)}
                    >
                      All Programs
                    </Link>
                    <div className="h-px bg-border" />
                    <Link
                      href="/programs/womens-flag-football/west-valley"
                      role="menuitem"
                      className="block px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors"
                      onClick={() => setDesktopProgramsOpen(false)}
                    >
                      2Raw West Valley Club
                    </Link>
                    <Link
                      href="/programs/womens-flag-football"
                      role="menuitem"
                      className="block px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors"
                      onClick={() => setDesktopProgramsOpen(false)}
                    >
                      Women&apos;s Flag Football
                    </Link>
                    <Link
                      href="/programs/private-training"
                      role="menuitem"
                      className="block px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors"
                      onClick={() => setDesktopProgramsOpen(false)}
                    >
                      Private 1-on-1
                    </Link>
                    <Link
                      href="/programs/clinics"
                      role="menuitem"
                      className="block px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors"
                      onClick={() => setDesktopProgramsOpen(false)}
                    >
                      Team Clinics
                    </Link>
                    <Link
                      href="/programs/recruiting-services"
                      role="menuitem"
                      className="block px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors"
                      onClick={() => setDesktopProgramsOpen(false)}
                    >
                      Recruiting Services
                    </Link>
                    <Link
                      href="/programs/esa"
                      role="menuitem"
                      className="block px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors"
                      onClick={() => setDesktopProgramsOpen(false)}
                    >
                      ESA / Homeschool PE
                    </Link>
                  </div>
                )}
              </div>
              <Link href="/coaches" className="text-sm font-semibold text-foreground/90 hover:text-primary transition-colors">
                Coaches
              </Link>
              <Link href="/gallery" className="text-sm font-semibold text-foreground/90 hover:text-primary transition-colors">
                Gallery
              </Link>
              <Link href="/contact" className="text-sm font-semibold text-foreground/90 hover:text-primary transition-colors">
                Contact
              </Link>
            </div>

            {/* Right: CTA */}
            <div className="flex items-center gap-2">
              <Link href="/contact" className="hidden sm:block">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">Apply Now</Button>
              </Link>

              <button
                className="hidden sm:inline-flex md:hidden text-foreground hover:text-primary transition-colors p-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open menu"
              >
                <Menu size={26} />
              </button>

              <div className="sm:hidden w-10" />
            </div>
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
              <Link
                href="/programs/womens-flag-football/west-valley"
                className="flex items-center gap-4 px-6 py-4 text-foreground hover:text-primary hover:bg-accent transition-colors font-medium text-lg"
                onClick={closeNav}
              >
                <Flag size={22} />
                Club Team
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
                href="/programs/womens-flag-football/west-valley"
                className="block pl-16 pr-6 py-3 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                onClick={closeNav}
              >
                2Raw West Valley Club
              </Link>
              <Link
                href="/programs/womens-flag-football"
                className="block pl-16 pr-6 py-3 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                onClick={closeNav}
              >
                Women&apos;s Flag Football
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
                href="/programs/recruiting-services"
                className="block pl-16 pr-6 py-3 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                onClick={closeNav}
              >
                Recruiting Services
              </Link>
              <Link
                href="/programs/esa"
                className="block pl-16 pr-6 py-3 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                onClick={closeNav}
              >
                ESA / Homeschool PE
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
