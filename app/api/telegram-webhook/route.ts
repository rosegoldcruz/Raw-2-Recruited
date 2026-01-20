import { NextRequest, NextResponse } from 'next/server';
import { list, put, del } from '@vercel/blob';

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

async function loadReviews(): Promise<Review[]> {
  try {
    const { blobs } = await list({ prefix: 'reviews/' });
    const reviewsBlob = blobs.find(b => b.pathname === REVIEWS_BLOB_PATH);
    
    if (!reviewsBlob) {
      return [];
    }
    
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
    const { blobs } = await list({ prefix: 'reviews/' });
    const existingBlob = blobs.find(b => b.pathname === REVIEWS_BLOB_PATH);
    if (existingBlob) {
      await del(existingBlob.url);
    }
    
    await put(REVIEWS_BLOB_PATH, JSON.stringify(reviews, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });
  } catch (error) {
    console.error('Error saving reviews to Blob:', error);
    throw error;
  }
}

async function answerCallback(botToken: string, callbackQueryId: string, text: string): Promise<void> {
  await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text: text,
      show_alert: true,
    }),
  });
}

async function editMessage(botToken: string, chatId: number, messageId: number, newText: string): Promise<void> {
  await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text: newText,
      parse_mode: 'Markdown',
    }),
  });
}

// Telegram webhook handler
export async function POST(request: NextRequest) {
  try {
    const botToken = process.env.DYLAN_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
    
    if (!botToken) {
      return NextResponse.json({ error: 'Bot not configured' }, { status: 500 });
    }

    const update = await request.json();
    
    // Handle callback queries (button clicks)
    if (update.callback_query) {
      const callbackQuery = update.callback_query;
      const data = callbackQuery.data;
      const callbackQueryId = callbackQuery.id;
      const chatId = callbackQuery.message?.chat?.id;
      const messageId = callbackQuery.message?.message_id;
      
      if (data?.startsWith('delete_review:')) {
        const reviewId = data.replace('delete_review:', '');
        
        // Load reviews and find the one to delete
        const reviews = await loadReviews();
        const reviewIndex = reviews.findIndex(r => r.id === reviewId);
        
        if (reviewIndex === -1) {
          await answerCallback(botToken, callbackQueryId, '❌ Review not found (may already be deleted)');
          return NextResponse.json({ ok: true });
        }
        
        const deletedReview = reviews[reviewIndex];
        reviews.splice(reviewIndex, 1);
        await saveReviews(reviews);
        
        // Answer the callback
        await answerCallback(botToken, callbackQueryId, '✅ Review deleted successfully!');
        
        // Update the message to show it was deleted
        if (chatId && messageId) {
          await editMessage(
            botToken,
            chatId,
            messageId,
            `🗑 *REVIEW DELETED*\n\n` +
            `👤 From: ${deletedReview.parent_name}\n` +
            `⭐ Rating: ${deletedReview.rating}/5\n\n` +
            `_This review has been removed from the website._`
          );
        }
        
        return NextResponse.json({ ok: true });
      }
    }
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// GET endpoint to set up the webhook
export async function GET(request: NextRequest) {
  const botToken = process.env.DYLAN_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.raw2recruited.com';
  
  if (!botToken) {
    return NextResponse.json({ error: 'Bot token not configured' }, { status: 500 });
  }
  
  const webhookUrl = `${siteUrl}/api/telegram-webhook`;
  
  try {
    // Set the webhook
    const response = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ['callback_query'],
      }),
    });
    
    const result = await response.json();
    
    return NextResponse.json({
      success: true,
      webhook_url: webhookUrl,
      telegram_response: result,
    });
  } catch (error) {
    console.error('Error setting webhook:', error);
    return NextResponse.json({ error: 'Failed to set webhook' }, { status: 500 });
  }
}
