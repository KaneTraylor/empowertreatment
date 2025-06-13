'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  { name: 'Sarah', role: 'Patient', text: 'is finding hope again' },
  { name: 'Michael', role: 'Patient', text: 'is reclaiming his life' },
  { name: 'Jennifer', role: 'Patient', text: 'is healing with support' },
  { name: 'David', role: 'Patient', text: 'is on the path to recovery' },
  { name: 'Lisa', role: 'Patient', text: 'is rebuilding relationships' },
  { name: 'Robert', role: 'Patient', text: 'is discovering wellness' },
  { name: 'Maria', role: 'Patient', text: 'is embracing sobriety' },
];

export function HeroTextAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <div className="relative h-[2rem] md:h-[2.25rem] lg:h-[2.5rem] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: '1em', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-1em', opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center"
        >
          <span className="block text-[1.1rem] sm:text-[1.25rem] md:text-[1.5rem] lg:text-[1.625rem] font-light tracking-tight font-sans drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]">
            <span className="text-white font-normal">{current.name}</span>
            <span className="text-white/95"> {current.text}</span>
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}