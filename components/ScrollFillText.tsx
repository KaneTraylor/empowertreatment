'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollFillTextProps {
  text: string;
  className?: string;
}

export function ScrollFillText({ text, className = '' }: ScrollFillTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fillPercentage, setFillPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is in the viewport
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      const elementHeight = rect.height;
      
      // Start animation when element enters viewport
      const triggerPoint = windowHeight * 0.9;
      
      if (elementTop < triggerPoint && elementBottom > 0) {
        // Calculate progress from 0 to 1 over a longer scroll distance
        const scrolledPastTrigger = triggerPoint - elementTop;
        const totalScrollDistance = windowHeight * 0.8; // Requires scrolling 80% of viewport height for full effect
        const progress = Math.max(0, Math.min(1, scrolledPastTrigger / totalScrollDistance));
        setFillPercentage(progress * 100);
      } else if (elementTop >= triggerPoint) {
        setFillPercentage(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Split text into words for animation
  const words = text.split(' ');

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Background text (gray) */}
      <h2 className="text-2xl md:text-3xl lg:text-5xl font-medium leading-tight text-gray-300 font-sans">
        {text}
      </h2>
      
      {/* Foreground text (colored) - clips based on scroll */}
      <h2 
        className="absolute inset-0 text-2xl md:text-3xl lg:text-5xl font-medium leading-tight text-[#005c65] font-sans transition-all duration-150 ease-out"
        style={{
          clipPath: `polygon(0 0, ${fillPercentage}% 0, ${fillPercentage}% 100%, 0 100%)`,
          WebkitClipPath: `polygon(0 0, ${fillPercentage}% 0, ${fillPercentage}% 100%, 0 100%)`,
        }}
      >
        {text}
      </h2>
    </div>
  );
}