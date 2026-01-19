import { env } from './env';
import type { Lead, PageView } from './supabase';

interface TelegramMessage {
  text: string;
  parse_mode?: 'HTML' | 'Markdown';
  disable_web_page_preview?: boolean;
}

class TelegramBot {
  private botToken: string | undefined;
  private chatId: string | undefined;

  constructor() {
    this.botToken = env.TELEGRAM_BOT_TOKEN;
    this.chatId = env.TELEGRAM_CHAT_ID;
  }

  private async sendMessage(message: TelegramMessage): Promise<boolean> {
    if (!this.botToken || !this.chatId) {
      console.warn('Telegram credentials not configured, skipping notification');
      return false;
    }

    try {
      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          ...message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Telegram API error:', errorData);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error sending Telegram message:', error);
      return false;
    }
  }

  async sendLeadNotification(lead: Lead): Promise<boolean> {
    const emoji = lead.lead_type === 'quote' ? '💰' : '📞';
    const typeLabel = lead.lead_type === 'quote' ? 'Quote Request' : 'General Inquiry';
    
    let message = `${emoji} *${typeLabel}*\n\n`;
    message += `👤 *Name:* ${lead.name}\n`;
    
    if (lead.phone) {
      message += `📱 *Phone:* ${lead.phone}\n`;
    }
    
    if (lead.email) {
      message += `✉️ *Email:* ${lead.email}\n`;
    }
    
    if (lead.service_requested) {
      message += `🎯 *Service:* ${lead.service_requested}\n`;
    }
    
    if (lead.message) {
      message += `💬 *Message:* ${lead.message}\n`;
    }
    
    message += `\n📊 *Source:* ${lead.source || 'Website'}\n`;
    message += `⏰ *Time:* ${new Date().toLocaleString()}\n`;
    
    if (lead.utm_source || lead.utm_medium || lead.utm_campaign) {
      message += `\n🎯 *UTM Data:*\n`;
      if (lead.utm_source) message += `• Source: ${lead.utm_source}\n`;
      if (lead.utm_medium) message += `• Medium: ${lead.utm_medium}\n`;
      if (lead.utm_campaign) message += `• Campaign: ${lead.utm_campaign}\n`;
    }

    return this.sendMessage({
      text: message,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    });
  }

  async sendHighValuePageNotification(pageView: PageView): Promise<boolean> {
    let message = `🚨 *High-Value Page Visit*\n\n`;
    message += `📄 *Page:* ${pageView.title || pageView.path}\n`;
    message += `🔗 *URL:* ${env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}${pageView.path}\n`;
    
    if (pageView.device_type) {
      const deviceEmoji = pageView.device_type === 'mobile' ? '📱' : 
                         pageView.device_type === 'tablet' ? '📋' : '💻';
      message += `${deviceEmoji} *Device:* ${pageView.device_type}\n`;
    }
    
    if (pageView.browser) {
      message += `🌐 *Browser:* ${pageView.browser}\n`;
    }
    
    if (pageView.country) {
      message += `🌍 *Location:* ${pageView.city ? `${pageView.city}, ` : ''}${pageView.country}\n`;
    }
    
    if (pageView.referrer && pageView.referrer !== 'direct') {
      message += `🔗 *Referrer:* ${pageView.referrer}\n`;
    }
    
    message += `⏰ *Time:* ${new Date().toLocaleString()}\n`;
    message += `🆔 *Visitor:* ${pageView.visitor_hash.substring(0, 8)}...`;

    return this.sendMessage({
      text: message,
      parse_mode: 'Markdown',
      disable_web_page_preview: false,
    });
  }

  async sendAnalyticsAlert(type: 'milestone' | 'anomaly', data: any): Promise<boolean> {
    let message = '';
    
    if (type === 'milestone') {
      message = `🎉 *Analytics Milestone*\n\n`;
      message += `📈 ${data.message}\n`;
      message += `⏰ *Time:* ${new Date().toLocaleString()}\n`;
    } else {
      message = `⚠️ *Traffic Anomaly Detected*\n\n`;
      message += `📊 ${data.message}\n`;
      message += `⏰ *Time:* ${new Date().toLocaleString()}\n`;
    }

    return this.sendMessage({
      text: message,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    });
  }

  async sendDailySummary(summary: {
    totalPageViews: number;
    uniqueVisitors: number;
    totalLeads: number;
    topPages: Array<{ path: string; views: number }>;
  }): Promise<boolean> {
    let message = `📊 *Daily Analytics Summary*\n\n`;
    message += `👀 *Page Views:* ${summary.totalPageViews}\n`;
    message += `👥 *Unique Visitors:* ${summary.uniqueVisitors}\n`;
    message += `🎯 *New Leads:* ${summary.totalLeads}\n`;
    
    if (summary.topPages.length > 0) {
      message += `\n🔥 *Top Pages:*\n`;
      summary.topPages.slice(0, 5).forEach((page, index) => {
        message += `${index + 1}. ${page.path} (${page.views} views)\n`;
      });
    }
    
    message += `\n📅 *Date:* ${new Date().toLocaleDateString()}`;

    return this.sendMessage({
      text: message,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    });
  }

  async testConnection(): Promise<boolean> {
    if (!this.botToken || !this.chatId) {
      console.warn('Telegram credentials not configured');
      return false;
    }

    return this.sendMessage({
      text: '🤖 *Bot Test*\n\nTelegram bot is successfully connected and ready to send notifications!',
      parse_mode: 'Markdown',
    });
  }
}

// Singleton instance
export const telegramBot = new TelegramBot();

// Utility functions for non-blocking notifications
export const sendLeadNotificationAsync = (lead: Lead) => {
  telegramBot.sendLeadNotification(lead).catch(error => {
    console.error('Failed to send lead notification:', error);
  });
};

export const sendHighValuePageNotificationAsync = (pageView: PageView) => {
  telegramBot.sendHighValuePageNotification(pageView).catch(error => {
    console.error('Failed to send high-value page notification:', error);
  });
};

export const sendAnalyticsAlertAsync = (type: 'milestone' | 'anomaly', data: any) => {
  telegramBot.sendAnalyticsAlert(type, data).catch(error => {
    console.error('Failed to send analytics alert:', error);
  });
};

export const sendDailySummaryAsync = (summary: any) => {
  telegramBot.sendDailySummary(summary).catch(error => {
    console.error('Failed to send daily summary:', error);
  });
};
