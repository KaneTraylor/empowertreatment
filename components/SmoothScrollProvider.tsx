'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check if mobile
    const isMobile = window.innerWidth <= 768;
    
    const lenis = new Lenis({
      duration: isMobile ? 1.5 : 1.2, // Even slower on mobile
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for smoother feel
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.6 : 0.8, // Much slower on mobile
      touchMultiplier: 1.2, // Slower touch scrolling
      infinite: false,
    });

    // Make lenis globally available for other components
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up
    return () => {
      delete (window as any).lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}