import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Telegram Bot Configuration
  TELEGRAM_BOT_TOKEN: z.string().min(1, 'Telegram bot token is required').optional(),
  TELEGRAM_CHAT_ID: z.string().min(1, 'Telegram chat ID is required').optional(),
  
  // Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL').optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required').optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'Supabase service role key is required').optional(),
  
  // Analytics Configuration
  NEXT_PUBLIC_SITE_URL: z.string().url('Invalid site URL').optional(),
  ANALYTICS_ENABLED: z.enum(['true', 'false']).transform(Boolean).default('true'),
  
  // High-Value Pages
  HIGH_VALUE_PAGES: z.string().default('/contact,/programs,/coaches'),
});

function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join('\n');
      // In production, throw error for missing required vars
      if (process.env.NODE_ENV === 'production') {
        throw new Error(`Environment validation failed:\n${missingVars}`);
      }
      // In development, log warning and continue with optional values
      console.warn('Environment validation warnings (development mode):', missingVars);
    }
    return envSchema.parse(process.env);
  }
}

export const env = validateEnv();

export const config = {
  highValuePages: env.HIGH_VALUE_PAGES.split(',').map(page => page.trim()),
  isDev: env.NODE_ENV === 'development',
  isProd: env.NODE_ENV === 'production',
  analyticsEnabled: env.ANALYTICS_ENABLED,
};
