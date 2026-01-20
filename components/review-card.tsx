
import { Star } from "lucide-react"

interface Review {
  id: string
  title: string
  parent_name: string
  rating: number
  review_text: string
  display_public: boolean
  status: "pending" | "approved" | "hidden"
  created_at: string
}

interface ReviewCardProps {
  review: Review
}

function formatDisplayName(name: string): string {
  const trimmed = name.trim()
  const parts = trimmed.split(/\s+/)
  
  if (parts.length === 1) {
    return parts[0]
  }
  
  const firstName = parts[0]
  const lastName = parts[parts.length - 1]
  return `${firstName} ${lastName.charAt(0)}.`
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 transition-shadow hover:shadow-lg">
      {/* Header: Rating and Date */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={18}
              className={
                star <= review.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-muted-foreground"
              }
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {formatDate(review.created_at)}
        </span>
      </div>

      {/* Title (if exists) */}
      {review.title && (
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {review.title}
        </h3>
      )}

      {/* Review Text */}
      <p className="text-foreground/90 leading-relaxed mb-4 whitespace-pre-wrap">
        {review.review_text}
      </p>

      {/* Author */}
      <div className="pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          — {formatDisplayName(review.parent_name)}
        </p>
      </div>
    </div>
  )
}
