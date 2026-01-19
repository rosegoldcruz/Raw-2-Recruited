import crypto from 'crypto';
import { UAParser } from 'ua-parser-js';

export function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip + process.env.HASH_SALT || 'default-salt').digest('hex');
}

export function hashVisitorData(ip: string, userAgent: string): string {
  const combined = ip + userAgent + process.env.VISITOR_HASH_SALT || 'visitor-salt';
  return crypto.createHash('sha256').update(combined).digest('hex');
}

export function parseUserAgent(userAgent: string) {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  
  return {
    device_type: result.device.type || 'desktop',
    browser: result.browser.name || 'Unknown',
    os: result.os.name || 'Unknown',
    device: {
      type: result.device.type || 'desktop',
      vendor: result.device.vendor,
      model: result.device.model,
    },
    browser: {
      name: result.browser.name,
      version: result.browser.version,
    },
    os: {
      name: result.os.name,
      version: result.os.version,
    },
  };
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

export function extractUTMParameters(url: string, referrer?: string) {
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined,
    referrer: referrer || 'direct',
  };
}

export function isHighValuePage(path: string, highValuePages: string[]): boolean {
  return highValuePages.some(page => path.startsWith(page));
}

export function generateSessionId(): string {
  return crypto.randomBytes(16).toString('hex');
}

export function getLocationFromIP(ip: string): Promise<{
  country?: string;
  city?: string;
  region?: string;
}> {
  // This is a placeholder implementation
  // In production, you'd use a service like ipapi.co, ipstack.com, or similar
  return new Promise((resolve) => {
    // For demo purposes, return empty data
    // In production, make API call to geolocation service
    resolve({});
  });
}

export function detectDeviceType(userAgent: string): 'mobile' | 'tablet' | 'desktop' {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const tabletRegex = /iPad|Android(?!.*Mobile)|Tablet/i;
  
  if (tabletRegex.test(userAgent)) {
    return 'tablet';
  } else if (mobileRegex.test(userAgent)) {
    return 'mobile';
  } else {
    return 'desktop';
  }
}

export function formatAnalyticsNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function calculateConversionRate(leads: number, visitors: number): number {
  if (visitors === 0) return 0;
  return Math.round((leads / visitors) * 100 * 100) / 100; // Round to 2 decimal places
}

export function getTimeRangeData(data: any[], range: '24h' | '7d' | '30d'): any[] {
  const now = new Date();
  const cutoffTime = new Date();
  
  switch (range) {
    case '24h':
      cutoffTime.setHours(now.getHours() - 24);
      break;
    case '7d':
      cutoffTime.setDate(now.getDate() - 7);
      break;
    case '30d':
      cutoffTime.setDate(now.getDate() - 30);
      break;
  }
  
  return data.filter(item => new Date(item.created_at) >= cutoffTime);
}

export function groupDataByDate(data: any[], dateField: string = 'created_at') {
  return data.reduce((acc, item) => {
    const date = new Date(item[dateField]).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
}

export function calculateGrowthRate(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100 * 100) / 100;
}
