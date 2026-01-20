import { NextRequest, NextResponse } from 'next/server';
import { sanitizeInput } from '@/lib/analytics-utils';
import { put, list, del } from '@vercel/blob';

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

const REVIEWS_BLOB_PATH = 'reviews/reviews.json';

// Send review to Telegram so we never lose it
async function sendReviewToTelegram(review: Review): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  if (!botToken || !chatId) {
    console.warn('Telegram not configured, skipping notification');
    return;
  }

  const stars = '⭐'.repeat(review.rating);
  let message = `📝 *NEW REVIEW SUBMITTED*\n\n`;
  message += `${stars} (${review.rating}/5)\n\n`;
  message += `👤 *From:* ${review.parent_name}\n`;
  if (review.title) {
    message += `📌 *Title:* ${review.title}\n`;
  }
  message += `\n💬 *Review:*\n${review.review_text}\n\n`;
  message += `✅ *Public Display:* ${review.display_public ? 'Yes' : 'No'}\n`;
  message += `⏰ *Time:* ${new Date().toLocaleString()}`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
  } catch (error) {
    console.error('Failed to send review to Telegram:', error);
  }
}

async function loadReviews(): Promise<Review[]> {
  try {
    // List blobs to find our reviews file
    const { blobs } = await list({ prefix: 'reviews/' });
    const reviewsBlob = blobs.find(b => b.pathname === REVIEWS_BLOB_PATH);
    
    if (!reviewsBlob) {
      return [];
    }
    
    // Fetch the blob content
    const response = await fetch(reviewsBlob.url);
    if (!response.ok) {
      return [];
    }
    
    const reviews = await response.json();
    return reviews as Review[];
  } catch (error) {
    console.error('Error loading reviews from Blob:', error);
    return [];
  }
}

async function saveReviews(reviews: Review[]): Promise<void> {
  try {
    // Delete old blob if exists
    const { blobs } = await list({ prefix: 'reviews/' });
    const existingBlob = blobs.find(b => b.pathname === REVIEWS_BLOB_PATH);
    if (existingBlob) {
      await del(existingBlob.url);
    }
    
    // Save new blob
    await put(REVIEWS_BLOB_PATH, JSON.stringify(reviews, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });
  } catch (error) {
    console.error('Error saving reviews to Blob:', error);
    throw error;
  }
}

function generateId(): string {
  return `review_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// GET - Fetch all approved reviews
export async function GET() {
  try {
    const reviews = await loadReviews();
    
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
      status: 'approved',
      created_at: new Date().toISOString(),
    };

    // ALWAYS send to Telegram first so we never lose a review
    await sendReviewToTelegram(newReview);

    // Then save to Blob storage
    const reviews = await loadReviews();
    reviews.push(newReview);
    await saveReviews(reviews);

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

    const reviews = await loadReviews();
    const reviewIndex = reviews.findIndex(r => r.id === id);

    if (reviewIndex === -1) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    reviews[reviewIndex].status = status;
    await saveReviews(reviews);

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

// DELETE - Remove a review by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      );
    }

    const reviews = await loadReviews();
    const reviewIndex = reviews.findIndex(r => r.id === id);

    if (reviewIndex === -1) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    const deletedReview = reviews[reviewIndex];
    reviews.splice(reviewIndex, 1);
    await saveReviews(reviews);

    return NextResponse.json({
      success: true,
      deleted: deletedReview,
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
