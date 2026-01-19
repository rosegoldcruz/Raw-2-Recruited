import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'test-telegram') {
      // Test Telegram bot connection
      const { telegramBot } = await import('@/lib/telegram');
      const success = await telegramBot.testConnection();
      
      return NextResponse.json({
        success: true,
        test: 'telegram',
        result: success,
        message: success ? 'Telegram bot is working!' : 'Telegram bot test failed - configure credentials'
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Unknown test action'
    }, { status: 400 });

  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
