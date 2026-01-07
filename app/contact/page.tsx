import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Phone, MapPin, Instagram, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
              SECURE YOUR <span className="text-primary">SPOT</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Ready to take your athlete's game to the next level? Fill out the form below and we'll be in touch.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <ContactForm />
            </div>

            <div className="space-y-8">
              <div className="bg-card border border-border rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-6">Contact Information</h3>

                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <p className="text-muted-foreground">(602) 577-0897</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Location</p>
                      <p className="text-muted-foreground">West Valley, Arizona</p>
                      <p className="text-muted-foreground text-sm">Training locations vary by program</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Social Media</p>
                      <a
                        href="https://www.instagram.com/raw2recruitedaz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        @raw2recruitedaz
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Training Hours</p>
                      <p className="text-muted-foreground">Flexible scheduling available</p>
                      <p className="text-muted-foreground text-sm">Mornings, afternoons & weekends</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Quick Response</h3>
                <p className="text-muted-foreground leading-relaxed">
                  For the fastest response, send us a DM on Instagram{" "}
                  <a
                    href="https://www.instagram.com/raw2recruitedaz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    @raw2recruitedaz
                  </a>
                  . We typically respond within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
