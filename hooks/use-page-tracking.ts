'use client';

import { useEffect, useState } from 'react';

interface PageViewData {
  path: string;
  title?: string;
  referrer?: string;
}

export function usePageTracking() {
  const [sessionId, setSessionId] = useState<string>('');
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    // Generate or retrieve session ID
    let storedSessionId = sessionStorage.getItem('analytics_session_id');
    if (!storedSessionId) {
      storedSessionId = generateSessionId();
      sessionStorage.setItem('analytics_session_id', storedSessionId);
    }
    setSessionId(storedSessionId);
    setIsTracking(true);
  }, []);

  const trackPageView = (data: PageViewData) => {
    if (!isTracking || !sessionId) return;

    // Send page view data to analytics API
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        sessionId,
        timestamp: new Date().toISOString(),
      }),
    }).catch(error => {
      console.error('Failed to track page view:', error);
    });
  };

  return { trackPageView, sessionId };
}

function generateSessionId(): string {
  return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}
