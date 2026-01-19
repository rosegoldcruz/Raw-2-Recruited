import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { 
  hashIP, 
  hashVisitorData, 
  parseUserAgent, 
  extractUTMParameters,
  isHighValuePage,
  generateSessionId,
  getLocationFromIP
} from '@/lib/analytics-utils';
import { sendHighValuePageNotificationAsync } from '@/lib/telegram';
import { config } from '@/lib/env';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      path,
      title,
      referrer,
      userAgent,
      sessionId,
    } = body;

    // Validate required fields
    if (!path) {
      return NextResponse.json(
        { error: 'Path is required' },
        { status: 400 }
      );
    }

    // Get client IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 
                request.headers.get('x-real-ip') || 
                request.ip || 
                'unknown';

    // Hash IP for privacy
    const ipHash = hashIP(ip);
    const visitorHash = hashVisitorData(ip, userAgent || '');

    // Parse user agent
    const parsedUA = userAgent ? parseUserAgent(userAgent) : {
      device_type: 'desktop',
      browser: 'Unknown',
      os: 'Unknown'
    };

    // Get location data (async, non-blocking)
    getLocationFromIP(ip).then(location => {
      // Update location data if needed (optional)
    }).catch(error => {
      console.error('Error getting location:', error);
    });

    // Extract UTM parameters
    const utmData = extractUTMParameters(request.url, referrer);

    // Create page view record
    const pageViewData = {
      visitor_hash: visitorHash,
      path,
      title: title || path,
      referrer: utmData.referrer,
      user_agent: userAgent,
      device_type: parsedUA.device_type,
      browser: parsedUA.browser,
      os: parsedUA.os,
      ip_hash: ipHash,
      session_id: sessionId || generateSessionId(),
    };

    // Insert page view into database
    const { error: dbError } = await supabase
      .from('page_views')
      .insert(pageViewData);

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to track page view' },
        { status: 500 }
      );
    }

    // Check if this is a high-value page and send notification
    if (isHighValuePage(path, config.highValuePages)) {
      const highValuePageData = {
        ...pageViewData,
        country: undefined, // Will be populated by location service
        city: undefined,
      };

      // Send notification asynchronously (non-blocking)
      sendHighValuePageNotificationAsync(highValuePageData);
    }

    return NextResponse.json({ 
      success: true, 
      tracked: true,
      visitorHash: visitorHash.substring(0, 8) + '...' // Return partial hash for client use
    });

  } catch (error) {
    console.error('Page tracking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('page_views')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (sessionId) {
      query = query.eq('session_id', sessionId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch page views' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: data || [],
      total: data?.length || 0
    });

  } catch (error) {
    console.error('Page views fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
