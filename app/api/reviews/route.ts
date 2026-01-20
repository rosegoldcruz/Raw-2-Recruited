import { NextRequest, NextResponse } from 'next/server';
import { sanitizeInput } from '@/lib/analytics-utils';
import fs from 'fs';
import path from 'path';

export const runtime = "nodejs";

interface Review {
  id: string;
  title: string;
  parent_name: string;
  rating: number;
  review_text: string;
  display_public: boolean;
  status: 'pending' | 'approved' | 'hidden';
  created_at: string;
}

// File path for storing reviews (in production, use a database)
const REVIEWS_FILE = path.join(process.cwd(), 'data', 'reviews.json');

function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function loadReviews(): Review[] {
  try {
    ensureDataDirectory();
    if (fs.existsSync(REVIEWS_FILE)) {
      const data = fs.readFileSync(REVIEWS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading reviews:', error);
  }
  return [];
}

function saveReviews(reviews: Review[]): void {
  try {
    ensureDataDirectory();
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
  } catch (error) {
    console.error('Error saving reviews:', error);
  }
}

function generateId(): string {
  return `review_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// GET - Fetch all approved reviews
export async function GET() {
  try {
    const reviews = loadReviews();
    
    // Filter to only show approved reviews that consent to public display
    const approvedReviews = reviews
      .filter(review => review.status === 'approved' && review.display_public)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    // Calculate average rating
    const averageRating = approvedReviews.length > 0
      ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) / approvedReviews.length
      : 0;

    return NextResponse.json({
      success: true,
      reviews: approvedReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      totalCount: approvedReviews.length,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST - Submit a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      parent_name,
      rating,
      review_text,
      display_public = true,
    } = body;

    // Validate required fields
    if (!parent_name || !parent_name.trim()) {
      return NextResponse.json(
        { error: 'Parent name is required' },
        { status: 400 }
      );
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    if (!review_text || !review_text.trim()) {
      return NextResponse.json(
        { error: 'Review text is required' },
        { status: 400 }
      );
    }

    if (review_text.trim().length < 10) {
      return NextResponse.json(
        { error: 'Review must be at least 10 characters' },
        { status: 400 }
      );
    }

    if (review_text.trim().length > 1000) {
      return NextResponse.json(
        { error: 'Review must be less than 1000 characters' },
        { status: 400 }
      );
    }

    // Create new review
    const newReview: Review = {
      id: generateId(),
      title: title ? sanitizeInput(title.trim()).substring(0, 100) : '',
      parent_name: sanitizeInput(parent_name.trim()).substring(0, 50),
      rating: Math.min(5, Math.max(1, Math.round(rating))),
      review_text: sanitizeInput(review_text.trim()).substring(0, 1000),
      display_public: Boolean(display_public),
      // Auto-approve reviews for immediate display (can be changed to 'pending' for moderation)
      status: 'approved',
      created_at: new Date().toISOString(),
    };

    // Load existing reviews and add new one
    const reviews = loadReviews();
    reviews.push(newReview);
    saveReviews(reviews);

    return NextResponse.json({
      success: true,
      review: {
        id: newReview.id,
        status: newReview.status,
        created_at: newReview.created_at,
      }
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}

// PATCH - Update review status (for admin moderation)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      );
    }

    if (!['pending', 'approved', 'hidden'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    const reviews = loadReviews();
    const reviewIndex = reviews.findIndex(r => r.id === id);

    if (reviewIndex === -1) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    reviews[reviewIndex].status = status;
    saveReviews(reviews);

    return NextResponse.json({
      success: true,
      review: reviews[reviewIndex],
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}
