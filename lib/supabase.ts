import { createClient } from '@supabase/supabase-js';
import { env } from './env';

// Create Supabase client for server-side operations
export const supabase = env.NEXT_PUBLIC_SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY 
  ? createClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  : null;

// Create Supabase client for client-side operations
export const createClientSupabase = () => {
  if (typeof window !== 'undefined' && env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return createClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  return supabase;
};

// Database types
export interface PageView {
  id?: string;
  visitor_hash: string;
  path: string;
  title?: string;
  referrer?: string;
  user_agent?: string;
  device_type?: 'mobile' | 'tablet' | 'desktop';
  browser?: string;
  os?: string;
  country?: string;
  city?: string;
  ip_hash?: string;
  session_id?: string;
  created_at?: string;
}

export interface Lead {
  id?: string;
  name: string;
  phone?: string;
  email?: string;
  service_requested?: string;
  message?: string;
  lead_type?: 'quote' | 'general' | 'inquiry';
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  visitor_hash?: string;
  status?: 'new' | 'contacted' | 'converted' | 'closed';
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AnalyticsSummary {
  id?: string;
  date: string;
  total_page_views: number;
  unique_visitors: number;
  total_leads: number;
  converted_leads: number;
  mobile_views: number;
  tablet_views: number;
  desktop_views: number;
  top_pages?: Array<{ path: string; views: number }>;
  created_at?: string;
  updated_at?: string;
}

export interface AnalyticsDashboard {
  total_page_views: number;
  total_unique_visitors: number;
  total_leads: number;
  converted_leads: number;
  page_views_24h: number;
  page_views_7d: number;
  page_views_30d: number;
  visitors_24h: number;
  visitors_7d: number;
  visitors_30d: number;
}
