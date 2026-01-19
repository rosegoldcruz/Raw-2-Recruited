-- Create analytics and leads tables for Telegram notification system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Page views table for visitor tracking
CREATE TABLE page_views (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  visitor_hash VARCHAR(64) NOT NULL, -- Hashed IP for privacy
  path VARCHAR(500) NOT NULL,
  title VARCHAR(200),
  referrer VARCHAR(500),
  user_agent TEXT,
  device_type VARCHAR(50), -- mobile, tablet, desktop
  browser VARCHAR(100),
  os VARCHAR(100),
  country VARCHAR(100),
  city VARCHAR(100),
  ip_hash VARCHAR(64), -- Additional privacy hash
  session_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  INDEX idx_visitor_hash (visitor_hash),
  INDEX idx_path (path),
  INDEX idx_created_at (created_at),
  INDEX idx_device_type (device_type)
);

-- Leads table for customer inquiries
CREATE TABLE leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(200),
  service_requested VARCHAR(200),
  message TEXT,
  lead_type VARCHAR(50) DEFAULT 'general', -- quote, general, inquiry
  source VARCHAR(100), -- contact form, phone call, etc.
  utm_source VARCHAR(200),
  utm_medium VARCHAR(200),
  utm_campaign VARCHAR(200),
  referrer VARCHAR(500),
  visitor_hash VARCHAR(64),
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, converted, closed
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  INDEX idx_status (status),
  INDEX idx_lead_type (lead_type),
  INDEX idx_created_at (created_at),
  INDEX idx_visitor_hash (visitor_hash)
);

-- Analytics summary table for dashboard performance
CREATE TABLE analytics_summary (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  date DATE NOT NULL,
  total_page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  total_leads INTEGER DEFAULT 0,
  converted_leads INTEGER DEFAULT 0,
  mobile_views INTEGER DEFAULT 0,
  tablet_views INTEGER DEFAULT 0,
  desktop_views INTEGER DEFAULT 0,
  top_pages JSONB, -- Array of {path: string, views: number}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date),
  INDEX idx_date (date)
);

-- Function to update analytics summary
CREATE OR REPLACE FUNCTION update_analytics_summary()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO analytics_summary (
    date,
    total_page_views,
    unique_visitors,
    mobile_views,
    tablet_views,
    desktop_views
  )
  SELECT 
    CURRENT_DATE,
    COUNT(*) as total_page_views,
    COUNT(DISTINCT visitor_hash) as unique_visitors,
    COUNT(CASE WHEN device_type = 'mobile' THEN 1 END) as mobile_views,
    COUNT(CASE WHEN device_type = 'tablet' THEN 1 END) as tablet_views,
    COUNT(CASE WHEN device_type = 'desktop' THEN 1 END) as desktop_views
  FROM page_views 
  WHERE DATE(created_at) = CURRENT_DATE
  ON CONFLICT (date) 
  DO UPDATE SET
    total_page_views = EXCLUDED.total_page_views,
    unique_visitors = EXCLUDED.unique_visitors,
    mobile_views = EXCLUDED.mobile_views,
    tablet_views = EXCLUDED.tablet_views,
    desktop_views = EXCLUDED.desktop_views,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update analytics summary
CREATE TRIGGER trigger_update_analytics_summary
  AFTER INSERT ON page_views
  FOR EACH ROW
  EXECUTE FUNCTION update_analytics_summary();

-- Row Level Security (RLS) policies
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_summary ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert page views (for tracking)
CREATE POLICY "Allow anonymous page view inserts" ON page_views
  FOR INSERT WITH CHECK (true);

-- Allow service role to read all data
CREATE POLICY "Allow service role full access" ON page_views
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access leads" ON leads
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access analytics" ON analytics_summary
  FOR ALL USING (auth.role() = 'service_role');

-- Create view for analytics dashboard
CREATE VIEW analytics_dashboard AS
SELECT 
  (SELECT COUNT(*) FROM page_views) as total_page_views,
  (SELECT COUNT(DISTINCT visitor_hash) FROM page_views) as total_unique_visitors,
  (SELECT COUNT(*) FROM leads) as total_leads,
  (SELECT COUNT(*) FROM leads WHERE status = 'converted') as converted_leads,
  (SELECT COUNT(*) FROM page_views WHERE created_at >= NOW() - INTERVAL '24 hours') as page_views_24h,
  (SELECT COUNT(*) FROM page_views WHERE created_at >= NOW() - INTERVAL '7 days') as page_views_7d,
  (SELECT COUNT(*) FROM page_views WHERE created_at >= NOW() - INTERVAL '30 days') as page_views_30d,
  (SELECT COUNT(DISTINCT visitor_hash) FROM page_views WHERE created_at >= NOW() - INTERVAL '24 hours') as visitors_24h,
  (SELECT COUNT(DISTINCT visitor_hash) FROM page_views WHERE created_at >= NOW() - INTERVAL '7 days') as visitors_7d,
  (SELECT COUNT(DISTINCT visitor_hash) FROM page_views WHERE created_at >= NOW() - INTERVAL '30 days') as visitors_30d;

-- Create function to get top pages
CREATE OR REPLACE FUNCTION get_top_pages(days_back INTEGER DEFAULT 7)
RETURNS TABLE(path VARCHAR, views BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pv.path,
    COUNT(*) as views
  FROM page_views pv
  WHERE pv.created_at >= NOW() - INTERVAL '1 day' * days_back
  GROUP BY pv.path
  ORDER BY views DESC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql;
