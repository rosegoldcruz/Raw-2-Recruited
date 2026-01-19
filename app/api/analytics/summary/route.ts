import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendDailySummaryAsync } from '@/lib/telegram';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');

    // Get page views for the specified period
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: pageViews, error: pageViewsError } = await supabase
      .from('page_views')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    if (pageViewsError) {
      console.error('Page views query error:', pageViewsError);
      return NextResponse.json(
        { error: 'Failed to fetch page views' },
        { status: 500 }
      );
    }

    // Get leads for the specified period
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    if (leadsError) {
      console.error('Leads query error:', leadsError);
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    // Calculate summary metrics
    const totalPageViews = pageViews?.length || 0;
    const uniqueVisitors = new Set(pageViews?.map(pv => pv.visitor_hash) || []).size;
    const totalLeads = leads?.length || 0;

    // Top pages
    const pageStats = (pageViews || []).reduce((acc, pv) => {
      const path = pv.path;
      acc[path] = (acc[path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topPages = Object.entries(pageStats)
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    return NextResponse.json({
      success: true,
      data: {
        period: `${days} days`,
        totalPageViews,
        uniqueVisitors,
        totalLeads,
        topPages,
        startDate: startDate.toISOString(),
        endDate: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('Summary report error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sendToTelegram = false } = body;

    // Get today's data
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: pageViews, error: pageViewsError } = await supabase
      .from('page_views')
      .select('*')
      .gte('created_at', today.toISOString());

    if (pageViewsError) {
      console.error('Page views query error:', pageViewsError);
      return NextResponse.json(
        { error: 'Failed to fetch page views' },
        { status: 500 }
      );
    }

    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('*')
      .gte('created_at', today.toISOString());

    if (leadsError) {
      console.error('Leads query error:', leadsError);
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    // Calculate today's metrics
    const totalPageViews = pageViews?.length || 0;
    const uniqueVisitors = new Set(pageViews?.map(pv => pv.visitor_hash) || []).size;
    const totalLeads = leads?.length || 0;

    // Top pages today
    const pageStats = (pageViews || []).reduce((acc, pv) => {
      const path = pv.path;
      acc[path] = (acc[path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topPages = Object.entries(pageStats)
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    const summary = {
      totalPageViews,
      uniqueVisitors,
      totalLeads,
      topPages,
    };

    // Send to Telegram if requested
    if (sendToTelegram) {
      sendDailySummaryAsync(summary);
    }

    return NextResponse.json({
      success: true,
      data: summary,
      sentToTelegram: sendToTelegram,
    });

  } catch (error) {
    console.error('Daily summary error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
