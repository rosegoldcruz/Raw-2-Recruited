'use client';

import { useEffect } from 'react';
import { usePageTracking } from '@/hooks/use-page-tracking';

interface PageTrackerProps {
  path?: string;
  title?: string;
}

export default function PageTracker({ path, title }: PageTrackerProps) {
  const { trackPageView } = usePageTracking();

  useEffect(() => {
    // Track page view on mount and when path/title changes
    if (typeof window !== 'undefined') {
      const currentPath = path || window.location.pathname;
      const currentTitle = title || document.title;
      const referrer = document.referrer || 'direct';

      trackPageView({
        path: currentPath,
        title: currentTitle,
        referrer,
      });

      // Store visitor hash for lead tracking
      const visitorHash = 'visitor_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('visitor_hash', visitorHash);
    }
  }, [path, title, trackPageView]);

  return null; // This component doesn't render anything
}
