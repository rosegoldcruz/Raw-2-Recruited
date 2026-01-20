"use client"

import { useState, useEffect, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { ReviewForm } from "@/components/review-form"
import { ReviewCard } from "@/components/review-card"
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

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [averageRating, setAverageRating] = useState<number>(0)

  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch("/api/reviews")
      if (response.ok) {
        const data = await response.json()
        setReviews(data.reviews || [])
        setAverageRating(data.averageRating || 0)
      }
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  const handleReviewSubmitted = () => {
    // Refresh reviews after submission
    fetchReviews()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <PageHero
        title="PARENT"
        highlight="REVIEWS"
        description="Real feedback from real families. See what parents are saying about their athlete's development at RAW2RECRUITED."
      />

      {/* Average Rating Section */}
      {reviews.length > 0 && (
        <section className="py-8 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-black text-foreground">
                  {averageRating.toFixed(1)}
                </span>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      className={
                        star <= Math.round(averageRating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-muted-foreground"
                      }
                    />
                  ))}
                </div>
              </div>
              <span className="text-muted-foreground">
                Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Review Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Share Your Experience
                </h2>
                <p className="text-muted-foreground mb-6">
                  Help other families by sharing your honest feedback about your athlete's training experience.
                </p>
                <ReviewForm onReviewSubmitted={handleReviewSubmitted} />
              </div>
            </div>

            {/* Reviews Display */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                What Parents Are Saying
              </h2>

              {isLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-card border border-border rounded-xl p-6 animate-pulse"
                    >
                      <div className="h-4 bg-muted rounded w-1/4 mb-4" />
                      <div className="h-3 bg-muted rounded w-full mb-2" />
                      <div className="h-3 bg-muted rounded w-3/4" />
                    </div>
                  ))}
                </div>
              ) : reviews.length === 0 ? (
                <div className="bg-card border border-border rounded-xl p-8 text-center">
                  <Star size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No Reviews Yet
                  </h3>
                  <p className="text-muted-foreground">
                    Be the first to share your family's experience with RAW2RECRUITED!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
