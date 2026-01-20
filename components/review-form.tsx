"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Loader2, Star } from "lucide-react"

interface ReviewFormProps {
  onReviewSubmitted?: () => void
}

export function ReviewForm({ onReviewSubmitted }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    parent_name: "",
    rating: 0,
    review_text: "",
    display_public: true,
  })
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    // Validate required fields
    if (!formData.parent_name.trim()) {
      setError("Parent name is required")
      return
    }

    if (formData.rating === 0) {
      setError("Please select a star rating")
      return
    }

    if (!formData.review_text.trim()) {
      setError("Review text is required")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to submit review")
      }

      setSuccess(true)
      setFormData({
        title: "",
        parent_name: "",
        rating: 0,
        review_text: "",
        display_public: true,
      })

      // Notify parent component
      if (onReviewSubmitted) {
        onReviewSubmitted()
      }

      // Reset success state after 5 seconds
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (success) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          Your review has been submitted successfully. Thank you for sharing your experience!
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-2xl p-6 space-y-5"
    >
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}

      {/* Title (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-foreground">
          Review Title <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g., Amazing progress!"
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="bg-background border-border text-foreground"
          maxLength={100}
        />
      </div>

      {/* Parent Name */}
      <div className="space-y-2">
        <Label htmlFor="parent_name" className="text-foreground">
          Your Name <span className="text-primary">*</span>
        </Label>
        <Input
          id="parent_name"
          name="parent_name"
          placeholder="Parent/Guardian name"
          value={formData.parent_name}
          onChange={(e) => updateField("parent_name", e.target.value)}
          required
          className="bg-background border-border text-foreground"
          maxLength={50}
        />
        <p className="text-xs text-muted-foreground">
          Only your first name and last initial will be displayed
        </p>
      </div>

      {/* Star Rating */}
      <div className="space-y-2">
        <Label className="text-foreground">
          Rating <span className="text-primary">*</span>
        </Label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-1 transition-transform hover:scale-110"
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => updateField("rating", star)}
              aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
            >
              <Star
                size={28}
                className={
                  star <= (hoveredRating || formData.rating)
                    ? "text-yellow-400 fill-yellow-400 transition-colors"
                    : "text-muted-foreground transition-colors"
                }
              />
            </button>
          ))}
          {formData.rating > 0 && (
            <span className="ml-2 text-sm text-muted-foreground">
              {formData.rating} star{formData.rating !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Review Text */}
      <div className="space-y-2">
        <Label htmlFor="review_text" className="text-foreground">
          Your Experience <span className="text-primary">*</span>
        </Label>
        <Textarea
          id="review_text"
          name="review_text"
          placeholder="Share your honest experience with RAW2RECRUITED. What has your athlete's training been like? How have they grown?"
          value={formData.review_text}
          onChange={(e) => updateField("review_text", e.target.value)}
          required
          className="bg-background border-border text-foreground min-h-[120px] resize-y"
          maxLength={1000}
        />
        <p className="text-xs text-muted-foreground text-right">
          {formData.review_text.length}/1000 characters
        </p>
      </div>

      {/* Public Consent Checkbox */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="display_public"
          checked={formData.display_public}
          onChange={(e) => updateField("display_public", e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
          aria-label="Consent to public display"
          title="Allow this review to be displayed publicly"
        />
        <Label
          htmlFor="display_public"
          className="text-sm text-muted-foreground cursor-pointer"
        >
          I consent to having this review displayed publicly on the RAW2RECRUITED website
        </Label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </Button>
    </form>
  )
}
