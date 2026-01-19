import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getTimeRangeData, groupDataByDate } from '@/lib/analytics-utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') as '24h' | '7d' | '30d' || '7d';

    // Get dashboard overview
    const { data: dashboard, error: dashboardError } = await supabase
      .from('analytics_dashboard')
      .select('*')
      .single();

    if (dashboardError && dashboardError.code !== 'PGRST116') {
      console.error('Dashboard query error:', dashboardError);
    }

    // Get page views data
    const { data: pageViews, error: pageViewsError } = await supabase
      .from('page_views')
      .select('*')
      .order('created_at', { ascending: false });

    if (pageViewsError) {
      console.error('Page views query error:', pageViewsError);
      return NextResponse.json(
        { error: 'Failed to fetch analytics data' },
        { status: 500 }
      );
    }

    // Get leads data
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (leadsError) {
      console.error('Leads query error:', leadsError);
      return NextResponse.json(
        { error: 'Failed to fetch leads data' },
        { status: 500 }
      );
    }

    // Filter data by time range
    const filteredPageViews = getTimeRangeData(pageViews || [], range);
    const filteredLeads = getTimeRangeData(leads || [], range);

    // Calculate metrics
    const totalPageViews = filteredPageViews.length;
    const uniqueVisitors = new Set(filteredPageViews.map(pv => pv.visitor_hash)).size;
    const totalLeads = filteredLeads.length;
    const convertedLeads = filteredLeads.filter(lead => lead.status === 'converted').length;

    // Device breakdown
    const deviceBreakdown = filteredPageViews.reduce((acc, pv) => {
      const device = pv.device_type || 'desktop';
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Top pages
    const pageStats = filteredPageViews.reduce((acc, pv) => {
      const path = pv.path;
      if (!acc[path]) {
        acc[path] = { path, views: 0, uniqueVisitors: new Set() };
      }
      acc[path].views++;
      acc[path].uniqueVisitors.add(pv.visitor_hash);
      return acc;
    }, {} as Record<string, { path: string; views: number; uniqueVisitors: Set<string> }>);

    const topPages = Object.values(pageStats)
      .map(stat => ({
        path: stat.path,
        views: stat.views,
        uniqueVisitors: stat.uniqueVisitors.size
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Daily breakdown
    const dailyPageViews = groupDataByDate(filteredPageViews);
    const dailyLeads = groupDataByDate(filteredLeads);

    const dailyStats = Object.keys(dailyPageViews).map(date => ({
      date,
      pageViews: dailyPageViews[date].length,
      uniqueVisitors: new Set(dailyPageViews[date].map(pv => pv.visitor_hash)).size,
      leads: dailyLeads[date]?.length || 0,
    })).sort((a, b) => a.date.localeCompare(b.date));

    // Lead status breakdown
    const leadStatusBreakdown = filteredLeads.reduce((acc, lead) => {
      const status = lead.status || 'new';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Lead type breakdown
    const leadTypeBreakdown = filteredLeads.reduce((acc, lead) => {
      const type = lead.lead_type || 'general';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalPageViews,
          uniqueVisitors,
          totalLeads,
          convertedLeads,
          conversionRate: uniqueVisitors > 0 ? Math.round((convertedLeads / uniqueVisitors) * 100 * 100) / 100 : 0,
        },
        deviceBreakdown,
        topPages,
        dailyStats,
        leadStatusBreakdown,
        leadTypeBreakdown,
        range,
      }
    });

  } catch (error) {
    console.error('Analytics dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
