'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white border-b border-gray-200 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Empower Treatment"
              width={150}
              height={50}
              className={`h-12 w-auto transition-all duration-300 ${
                !isScrolled ? 'brightness-0 invert' : ''
              }`}
              priority
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 text-sm">
            <Link href="/book-appointment" className={`transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-white/80'
            }`}>
              Book Appointment
            </Link>
            <span className={isScrolled ? 'text-gray-400' : 'text-white/50'}>|</span>
            <Link href="/insurance-verification" className={`transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-white/80'
            }`}>
              Verify Insurance
            </Link>
            <span className={isScrolled ? 'text-gray-400' : 'text-white/50'}>|</span>
            <Link href="tel:740-200-0277" className={`transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-white/80'
            }`}>
              (740) 200-0277
            </Link>
            <span className={isScrolled ? 'text-gray-400' : 'text-white/50'}>|</span>
            <Link href="mailto:support@empowertreatment.com" className={`transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-white/80'
            }`}>
              support@empowertreatment.com
            </Link>
          </nav>
          
          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-3">
            {/* Get Started Button */}
            <Link
              href="/welcome"
              className={`inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-light transition-all duration-300 ${
                isScrolled
                  ? 'bg-[#005c65] text-white hover:bg-[#004a52]'
                  : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'
              }`}
            >
              Get started
            </Link>
            
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`flex flex-col items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'bg-gray-100 hover:bg-gray-200'
                  : 'bg-white/20 backdrop-blur-md hover:bg-white/30'
              }`}
              aria-label="Toggle menu"
            >
              <span className={`block w-4 h-[1px] transition-all duration-300 ${
                isScrolled ? 'bg-gray-900' : 'bg-white'
              } ${isMobileMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
              <span className={`block w-4 h-[1px] my-[3px] transition-all duration-300 ${
                isScrolled ? 'bg-gray-900' : 'bg-white'
              } ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-4 h-[1px] transition-all duration-300 ${
                isScrolled ? 'bg-gray-900' : 'bg-white'
              } ${isMobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[80px] bg-white z-40">
          <nav className="flex flex-col p-6 space-y-4">
            <Link 
              href="/book-appointment" 
              className="text-lg text-gray-900 hover:text-[#005c65] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Appointment
            </Link>
            <Link 
              href="/insurance-verification" 
              className="text-lg text-gray-900 hover:text-[#005c65] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Verify Insurance
            </Link>
            <Link 
              href="tel:740-200-0277" 
              className="text-lg text-gray-900 hover:text-[#005c65] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              (740) 200-0277
            </Link>
            <Link 
              href="mailto:support@empowertreatment.com" 
              className="text-lg text-gray-900 hover:text-[#005c65] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              support@empowertreatment.com
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}