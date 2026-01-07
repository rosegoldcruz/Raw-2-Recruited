import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckCircle2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
            Thank You for Your Submission!
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            We've received your application and are excited to learn more about your athlete. We look forward to speaking with you and your child soon.
          </p>

          <div className="bg-card border border-border rounded-2xl p-8 max-w-xl mx-auto mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4">What Happens Next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="text-foreground font-semibold">Review</p>
                  <p className="text-muted-foreground text-sm">We'll review your application within 48 hours.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="text-foreground font-semibold">Contact</p>
                  <p className="text-muted-foreground text-sm">We'll reach out to discuss your athlete's goals and program fit.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="text-foreground font-semibold">Get Started</p>
                  <p className="text-muted-foreground text-sm">Once accepted, we'll schedule your first session and get to work.</p>
                </div>
              </div>
            </div>
          </div>

          <Link href="/">
            <Button
              size="lg"
              variant="outline"
              className="font-bold text-lg px-8 py-6 h-auto"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Return to Home
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
