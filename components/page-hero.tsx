interface PageHeroProps {
  title: string
  highlight: string
  description: string
}

export function PageHero({ title, highlight, description }: PageHeroProps) {
  return (
    <section className="pt-32 pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
          {title} <span className="text-primary">{highlight}</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{description}</p>
      </div>
    </section>
  )
}
