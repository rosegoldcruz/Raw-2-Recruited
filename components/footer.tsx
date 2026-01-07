import Image from "next/image"
import Link from "next/link"
import { Instagram, Phone, MapPin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Image
              src="/images/earn-20full-20pe-20credit-20while-20getting-20college-20ready-20-2811-20x-208-20in-29.png"
              alt="RAW2RECRUITED Logo"
              width={200}
              height={70}
              className="h-14 w-auto mb-4"
            />
            <p className="text-muted-foreground max-w-md leading-relaxed">
              A complete football development system. Coaching. Accreditation. Competitive advancement. No shortcuts.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com/raw2recruitedaz/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-accent hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-colors text-foreground"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/programs" className="text-muted-foreground hover:text-primary transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/coaches" className="text-muted-foreground hover:text-primary transition-colors">
                  Coaches
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>(602) 577-0897</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>West Valley, Arizona</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>Message on Instagram</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} RAW2RECRUITED. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">Youth Athletic Training • West Side of Arizona</p>
        </div>
      </div>
    </footer>
  )
}
