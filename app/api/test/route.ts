import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
        message: success ? 'Telegram bot is working!' : 'Telegram bot test failed'
      });
    }

    if (action === 'test-database') {
      // Test database connection
      const { data, error } = await supabase
        .from('page_views')
        .select('count')
        .limit(1);

      if (error) {
        return NextResponse.json({
          success: false,
          test: 'database',
          error: error.message
        }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        test: 'database',
        result: true,
        message: 'Database connection is working!'
      });
    }

    if (action === 'test-analytics') {
      // Test analytics tracking
      const testPageView = {
        visitor_hash: 'test-hash-12345',
        path: '/test',
        title: 'Test Page',
        referrer: 'direct',
        user_agent: 'Test Agent',
        device_type: 'desktop',
        browser: 'Test Browser',
        os: 'Test OS',
        ip_hash: 'test-ip-hash',
        session_id: 'test-session',
      };

      const { error } = await supabase
        .from('page_views')
        .insert(testPageView);

      if (error) {
        return NextResponse.json({
          success: false,
          test: 'analytics',
          error: error.message
        }, { status: 500 });
      }

      // Clean up test data
      await supabase
        .from('page_views')
        .delete()
        .eq('visitor_hash', 'test-hash-12345');

      return NextResponse.json({
        success: true,
        test: 'analytics',
        result: true,
        message: 'Analytics tracking is working!'
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
