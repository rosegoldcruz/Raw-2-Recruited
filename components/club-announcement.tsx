"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X, Megaphone, Flag, ArrowRight } from "lucide-react"

// Bump version to re-show for all visitors even if previously dismissed
const STORAGE_KEY = "r2r_club_announcement_v2"

export function ClubAnnouncement() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const seen = window.localStorage.getItem(STORAGE_KEY)
      if (!seen) setOpen(true)
    } catch (err) {
      console.error("announcement storage unavailable", err)
      setOpen(true)
    }
  }, [])

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true")
    } catch (err) {
      console.error("announcement storage unavailable", err)
    }
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />

      <div className="relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
        <button
          aria-label="Close announcement"
          onClick={dismiss}
          className="absolute top-3 right-3 text-muted-foreground hover:text-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
            <Megaphone className="w-4 h-4" />
            New: 2Raw West Valley Club
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
            Founding Roster Now Forming For Our Girls Flag Football Club.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Tolleson, Laveen, Avondale, Surprise, and Buckeye athletes get first-mover access. Limited spots, college-ready path, and a scholarship-focused build from day one.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/programs/womens-flag-football/west-valley" onClick={dismiss}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                <span className="flex items-center justify-center gap-2">
                  <Flag className="w-4 h-4" />
                  View the Club
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full border-border text-foreground font-semibold"
              onClick={dismiss}
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
