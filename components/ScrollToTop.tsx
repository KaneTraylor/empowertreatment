'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // When the pathname changes, scroll to top
    // Using a small timeout to ensure the DOM has updated
    const timer = setTimeout(() => {
      // First try to use window.scrollTo
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Also set document scrolling elements to ensure it works
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // If Lenis is available, use it to scroll to top
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}