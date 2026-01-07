import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProgramCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export function ProgramCard({ title, description, href, icon: Icon }: ProgramCardProps) {
  return (
    <div className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
        <Link href={href}>
          <Button
            variant="outline"
            className="font-semibold group/btn bg-transparent border-border hover:bg-accent text-foreground"
          >
            Learn More
            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
