import { NextRequest, NextResponse } from 'next/server';
import { 
  sanitizeInput, 
  validateEmail, 
  validatePhone,
  extractUTMParameters,
  hashVisitorData
} from '@/lib/analytics-utils';
import { sendLeadNotificationAsync } from '@/lib/telegram';

export const runtime = "nodejs"

// Lead type definition
interface Lead {
  name: string;
  phone?: string;
  email?: string;
  service_requested?: string;
  message?: string;
  lead_type: 'quote' | 'general' | 'inquiry';
  source: string;
  visitor_hash?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

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
    // Note: Database integration not configured
    // In production, connect to your database (Supabase, etc.) to fetch leads
    return NextResponse.json({ 
      success: true, 
      data: [],
      total: 0,
      message: 'Database not configured. Leads are sent via Telegram notifications.'
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
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // Note: Database integration not configured
    // In production, connect to your database (Supabase, etc.) to update leads
    return NextResponse.json({ 
      success: false, 
      message: 'Database not configured. Lead updates require database integration.'
    });

  } catch (error) {
    console.error('Lead update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
