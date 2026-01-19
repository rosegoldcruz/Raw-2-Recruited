import { NextRequest, NextResponse } from 'next/server';
import { 
  sanitizeInput, 
  validateEmail, 
  validatePhone,
  extractUTMParameters,
  hashIP,
  hashVisitorData
} from '@/lib/analytics-utils';
import { sendLeadNotificationAsync } from '@/lib/telegram';

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      service_requested,
      message,
      lead_type = 'general',
      source = 'Website Contact Form',
      visitor_hash,
    } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!phone && !email) {
      return NextResponse.json(
        { error: 'Either phone or email is required' },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (email && !validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format if provided
    if (phone && !validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone format' },
        { status: 400 }
      );
    }

    // Get client IP for visitor tracking
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 
                request.headers.get('x-real-ip') || 
                request.ip || 
                'unknown';

    // Extract UTM parameters
    const utmData = extractUTMParameters(request.url);

    // Get or generate visitor hash
    const userAgent = request.headers.get('user-agent') || '';
    const finalVisitorHash = visitor_hash || hashVisitorData(ip, userAgent);

    // Sanitize input data
    const leadData = {
      name: sanitizeInput(name),
      phone: phone ? sanitizeInput(phone) : undefined,
      email: email ? sanitizeInput(email.toLowerCase()) : undefined,
      service_requested: service_requested ? sanitizeInput(service_requested) : undefined,
      message: message ? sanitizeInput(message) : undefined,
      lead_type: lead_type as 'quote' | 'general' | 'inquiry',
      source: sanitizeInput(source),
      visitor_hash: finalVisitorHash,
      utm_source: utmData.utm_source,
      utm_medium: utmData.utm_medium,
      utm_campaign: utmData.utm_campaign,
      referrer: utmData.referrer,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    // Send Telegram notification asynchronously (non-blocking)
    sendLeadNotificationAsync(leadData);

    return NextResponse.json({ 
      success: true, 
      lead: {
        name: leadData.name,
        status: 'sent',
        created_at: leadData.created_at,
      }
    });

  } catch (error) {
    console.error('Lead creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const lead_type = searchParams.get('lead_type');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    if (lead_type) {
      query = query.eq('lead_type', lead_type);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: data || [],
      total: data?.length || 0
    });

  } catch (error) {
    console.error('Leads fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    const updateData: Partial<Lead> = {
      updated_at: new Date().toISOString(),
    };

    if (status) {
      updateData.status = status as 'new' | 'contacted' | 'converted' | 'closed';
    }

    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const { data: leadData, error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to update lead' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      lead: leadData
    });

  } catch (error) {
    console.error('Lead update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
