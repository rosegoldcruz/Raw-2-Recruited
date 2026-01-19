# Telegram Analytics & Notification System

A comprehensive Telegram notification and analytics system for your website that tracks visitors, captures leads, and sends real-time notifications to your Telegram channel.

## Features

### 🤖 Telegram Bot Integration
- **Real-time lead notifications** with structured formatting and emojis
- **High-value page alerts** for important page visits
- **Daily analytics summaries** sent automatically
- **Professional formatting** with actionable information

### 📊 Real-time Analytics
- **Visitor tracking** with device detection and location data
- **Page view monitoring** with referrer tracking
- **Lead conversion tracking** with status management
- **Device breakdown** (mobile, tablet, desktop)
- **Time-based analytics** (24h, 7d, 30d views)

### 🎯 Lead Management
- **Structured lead capture** with validation
- **UTM parameter tracking** for campaign attribution
- **Lead status management** (new, contacted, converted, closed)
- **Source attribution** for conversion tracking

### 🛡️ Privacy & Security
- **IP hashing** for visitor privacy protection
- **Data sanitization** and input validation
- **Non-blocking notifications** for optimal performance
- **Environment variable validation** for secure configuration

## Quick Setup

### 1. Environment Configuration

Copy the environment template:
```bash
cp env.example .env.local
```

Configure your environment variables:
```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHAT_ID=your_telegram_chat_id_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Analytics Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
ANALYTICS_ENABLED=true

# High-Value Pages (comma-separated paths)
HIGH_VALUE_PAGES=/contact,/programs,/coaches

# Environment
NODE_ENV=production
```

### 2. Telegram Bot Setup

1. Create a Telegram bot by messaging [@BotFather](https://t.me/botfather)
2. Get your bot token and add it to `TELEGRAM_BOT_TOKEN`
3. Get your chat ID and add it to `TELEGRAM_CHAT_ID`
4. Test the connection:
   ```bash
   curl -X POST http://localhost:3000/api/test \
     -H "Content-Type: application/json" \
     -d '{"action": "test-telegram"}'
   ```

### 3. Supabase Database Setup

1. Create a new Supabase project
2. Run the SQL schema from `supabase/schema.sql`
3. Configure your Supabase keys in the environment
4. Test the database connection:
   ```bash
   curl -X POST http://localhost:3000/api/test \
     -H "Content-Type: application/json" \
     -d '{"action": "test-database"}'
   ```

### 4. Install Dependencies

```bash
pnpm install
```

## Usage

### Analytics Dashboard

Visit `/analytics` to view your comprehensive analytics dashboard with:
- Page views and unique visitors
- Lead conversion rates
- Device breakdown
- Top performing pages
- Daily activity trends

### Lead Tracking

The system automatically tracks:
- **Page views** on all pages
- **High-value page visits** with Telegram notifications
- **Form submissions** with lead data capture
- **UTM parameters** for campaign tracking

### Telegram Notifications

You'll receive instant notifications for:
- **New leads** with customer details and service requests
- **High-value page visits** from potential customers
- **Daily summaries** of website performance

## API Endpoints

### Analytics Tracking
```http
POST /api/analytics/track
Content-Type: application/json

{
  "path": "/contact",
  "title": "Contact Page",
  "referrer": "https://google.com",
  "userAgent": "Mozilla/5.0...",
  "sessionId": "session_123"
}
```

### Lead Management
```http
POST /api/leads
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "(555) 123-4567",
  "email": "john@example.com",
  "service_requested": "Homeschool PE",
  "message": "Interested in training program",
  "lead_type": "quote"
}
```

### Analytics Dashboard
```http
GET /api/analytics/dashboard?range=7d
```

### Daily Summary
```http
POST /api/analytics/summary
Content-Type: application/json

{
  "sendToTelegram": true
}
```

## Components

### PageTracker Component
Automatically tracks page views when included in your layout:

```tsx
import PageTracker from '@/components/page-tracker';

// In your layout.tsx
<PageTracker />
```

### Lead Form Hook
Use the custom hook for form handling:

```tsx
import { useLeadForm } from '@/hooks/use-lead-form';

const { formData, isSubmitting, error, success, updateField, submitLead } = useLeadForm({
  lead_type: 'quote',
  source: 'Contact Page'
});
```

### Analytics Dashboard Component
Full-featured dashboard component:

```tsx
import AnalyticsDashboard from '@/components/analytics-dashboard';

// In your page
<AnalyticsDashboard />
```

## Data Structure

### Page Views
```typescript
interface PageView {
  visitor_hash: string;
  path: string;
  title?: string;
  referrer?: string;
  device_type: 'mobile' | 'tablet' | 'desktop';
  browser?: string;
  os?: string;
  country?: string;
  city?: string;
  created_at: string;
}
```

### Leads
```typescript
interface Lead {
  name: string;
  phone?: string;
  email?: string;
  service_requested?: string;
  message?: string;
  lead_type: 'quote' | 'general' | 'inquiry';
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  created_at: string;
}
```

## Privacy Features

- **IP Hashing**: All IP addresses are hashed for privacy
- **Visitor Anonymization**: Visitors are identified by hashed IDs
- **Data Minimization**: Only necessary data is collected
- **Secure Storage**: All data stored securely in Supabase

## Performance Optimization

- **Non-blocking Notifications**: Telegram notifications are sent asynchronously
- **Database Indexing**: Optimized queries for fast analytics
- **Caching**: Dashboard data cached for better performance
- **Error Handling**: Graceful degradation if services are unavailable

## Monitoring & Testing

### Test Endpoints
```bash
# Test Telegram connection
curl -X POST http://localhost:3000/api/test \
  -H "Content-Type: application/json" \
  -d '{"action": "test-telegram"}'

# Test database connection
curl -X POST http://localhost:3000/api/test \
  -H "Content-Type: application/json" \
  -d '{"action": "test-database"}'

# Test analytics tracking
curl -X POST http://localhost:3000/api/test \
  -H "Content-Type: application/json" \
  -d '{"action": "test-analytics"}'
```

### Error Monitoring
All API errors are logged with context and timestamps for debugging.

## Deployment

1. Set all environment variables in production
2. Run the database schema in your Supabase project
3. Test all endpoints before going live
4. Monitor Telegram notifications for proper setup

## Support

This system is designed to be production-ready with comprehensive error handling, logging, and monitoring. All components are modular and can be customized to fit your specific needs.
