import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-card border-y border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
          READY TO <span className="text-primary">LEVEL UP</span>?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
          Whether you're looking for PE credits, private coaching, or team training — we have a program for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/programs">
            <Button
              size="lg"
              variant="outline"
              className="font-bold text-lg px-8 py-6 bg-transparent border-border hover:bg-accent text-foreground"
            >
              Explore Programs
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 group"
            >
              Secure Your Spot
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
