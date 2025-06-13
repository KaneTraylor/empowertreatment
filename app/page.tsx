'use client';

import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { HeroTextAnimation } from '@/components/HeroTextAnimation';
import { ScrollFillText } from '@/components/ScrollFillText';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [step1Progress, setStep1Progress] = useState(0);
  const [step2Progress, setStep2Progress] = useState(0);
  const [step3Progress, setStep3Progress] = useState(0);
  
  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Calculate progress for each step based on scroll position
      const howItWorksSection = document.getElementById('how-it-works');
      if (howItWorksSection) {
        const rect = howItWorksSection.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Start animation when section is 20% visible (80% up the screen)
        const triggerPoint = windowHeight * 0.2;
        
        if (sectionTop < triggerPoint) {
          const scrollProgress = (triggerPoint - sectionTop) / (sectionHeight * 0.3);
          
          // Animate each step sequentially
          setStep1Progress(Math.min(Math.max(scrollProgress * 3, 0), 1));
          setStep2Progress(Math.min(Math.max((scrollProgress * 3) - 0.5, 0), 1));
          setStep3Progress(Math.min(Math.max((scrollProgress * 3) - 1, 0), 1));
        } else {
          setStep1Progress(0);
          setStep2Progress(0);
          setStep3Progress(0);
        }
      }
    };
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate padding based on scroll position
  const maxScroll = 400; // Max scroll distance for effect
  const scrollProgress = Math.min(scrollY / maxScroll, 1);
  // Different padding for mobile vs desktop
  const isMobile = windowWidth < 768;
  const horizontalPadding = scrollProgress * (isMobile ? 12 : 60); // 12px on mobile, 60px on desktop
  const borderRadius = scrollProgress * (isMobile ? 10 : 20); // Smaller radius on mobile too

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section Container */}
        <div 
          className="relative -mt-[80px] pt-[80px] transition-all duration-300 ease-out"
          style={{
            paddingLeft: `${horizontalPadding}px`,
            paddingRight: `${horizontalPadding}px`,
          }}
        >
          {/* Hero Section with border radius effect */}
          <section 
            className="relative min-h-screen flex items-end lg:items-center pb-[4.5rem] lg:pb-0 overflow-hidden transition-all duration-300 ease-out"
            style={{
              borderRadius: `${borderRadius}px`,
            }}
          >
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/lander/hero.mp4" type="video/mp4" />
            </video>
          </div>
          {/* Content Container */}
          <div className="relative z-10 w-full px-5 md:px-8 lg:px-12 max-w-[93.75rem] mx-auto">
            <div className="flex flex-col lg:flex-row items-start">
              {/* Left Content */}
              <div className="flex-1 lg:pr-12">
                <div className="w-full lg:max-w-[39em] flex flex-col gap-5 lg:gap-[1.875rem]">
                  {/* Hero Heading */}
                  <h1 className="text-[2.25rem] md:text-[3.5rem] lg:text-[4.5rem] font-normal leading-[0.85] text-white m-0 tracking-tight font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    <div className="block">No more stress,</div>
                    <div className="block">just progress</div>
                  </h1>
                  
                  {/* Animated Subheading */}
                  <HeroTextAnimation />

                  {/* CTA Button */}
                  <div className="relative z-10">
                    <Link
                      href="/welcome"
                      className="hero-button relative inline-flex items-center justify-center bg-white text-[#005c65] rounded-full h-[3.375rem] text-[1.125rem] font-light tracking-tight transition-all duration-200 w-full md:w-[14em]"
                    >
                      <span>Get started</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </section>
        </div>

        {/* Take Control Section */}
        <section className="py-24 md:py-32 lg:py-40 px-5 md:px-8 lg:px-12 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollFillText 
              text="Take control of your recovery with 1-on-1 care and a personalized treatment plan that gets you organized, supported, and on track in 30 days."
            />
          </div>
        </section>

        {/* Adults and Youth Section */}
        <section className="relative py-16 md:py-24 px-5 md:px-8 lg:px-12 bg-[#faf8f5]">
          {/* Arch transition */}
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute -top-1 left-0 w-full h-16 md:h-24 fill-[#faf8f5]"
          >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Adults Card */}
              <div className="bg-white rounded-[2rem] p-8 md:p-10 min-h-[32rem] md:min-h-[38rem] flex flex-col justify-between">
                <div className="flex flex-col gap-8">
                  {/* Pill Badge */}
                  <div className="inline-flex items-center gap-2 bg-[#faf8f5] rounded-full px-6 py-3 self-start">
                    <svg className="w-5 h-5 text-[#005c65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-wide">Adults</span>
                  </div>
                  
                  {/* Heading */}
                  <h3 className="text-2xl md:text-3xl font-semibold leading-tight text-gray-900 font-sans">
                    Comprehensive care designed for adult recovery journeys
                  </h3>
                </div>
                
                {/* Image */}
                <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden my-8">
                  <img 
                    src="/lander/telehealth.jpg" 
                    alt="Adult treatment services"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* CTA Button */}
                <Link
                  href="/welcome"
                  className="inline-flex items-center justify-center bg-[#005c65] text-white rounded-full px-8 py-3 text-base font-light hover:bg-[#004a52] transition-colors w-full md:w-auto"
                >
                  Learn about adult services →
                </Link>
              </div>

              {/* Youth Card */}
              <div className="bg-white rounded-[2rem] p-8 md:p-10 min-h-[32rem] md:min-h-[38rem] flex flex-col justify-between">
                <div className="flex flex-col gap-8">
                  {/* Pill Badge */}
                  <div className="inline-flex items-center gap-2 bg-[#faf8f5] rounded-full px-6 py-3 self-start">
                    <svg className="w-5 h-5 text-[#005c65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-wide">Youth</span>
                  </div>
                  
                  {/* Heading */}
                  <h3 className="text-2xl md:text-3xl font-semibold leading-tight text-gray-900 font-sans">
                    Specialized programs tailored for adolescents and young adults
                  </h3>
                </div>
                
                {/* Image */}
                <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden my-8 bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
                  <img 
                    src="/lander/teens.webp" 
                    alt="Youth treatment services"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* CTA Button */}
                <Link
                  href="/welcome"
                  className="inline-flex items-center justify-center bg-white text-[#005c65] border-2 border-[#005c65] rounded-full px-8 py-3 text-base font-light hover:bg-gray-50 transition-colors w-full md:w-auto"
                >
                  Explore youth programs →
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* Insurance Section */}
        <section className="py-12 md:py-16 px-5 md:px-8 lg:px-12 bg-[#faf8f5]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
              Most insured members have a $0 copay
            </h2>
            <p className="text-lg mb-10 text-gray-700">
              Choose your insurer to learn more:
            </p>
            
            {/* Insurance Logos Grid */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 max-w-5xl mx-auto">
              {/* Medicaid */}
              <a 
                href="/welcome" 
                className="group flex items-center justify-center bg-white border-2 border-[#ef3d3d] hover:bg-[#ef3d3d] hover:text-white rounded-lg p-6 w-40 h-20 transition-all duration-200"
              >
                <span className="font-medium text-gray-900 group-hover:text-white">Medicaid</span>
              </a>
              
              {/* Aetna */}
              <a 
                href="/welcome" 
                className="group flex items-center justify-center bg-white border-2 border-[#ef3d3d] hover:bg-[#ef3d3d] hover:text-white rounded-lg p-6 w-40 h-20 transition-all duration-200"
              >
                <span className="font-medium text-gray-900 group-hover:text-white">Aetna</span>
              </a>
              
              {/* United Healthcare */}
              <a 
                href="/welcome" 
                className="group flex items-center justify-center bg-white border-2 border-[#ef3d3d] hover:bg-[#ef3d3d] hover:text-white rounded-lg p-6 w-40 h-20 transition-all duration-200"
              >
                <span className="font-medium text-gray-900 group-hover:text-white text-center text-sm">United Healthcare</span>
              </a>
              
              {/* Anthem */}
              <a 
                href="/welcome" 
                className="group flex items-center justify-center bg-white border-2 border-[#ef3d3d] hover:bg-[#ef3d3d] hover:text-white rounded-lg p-6 w-40 h-20 transition-all duration-200"
              >
                <span className="font-medium text-gray-900 group-hover:text-white">Anthem</span>
              </a>
              
              {/* Medicare */}
              <a 
                href="/welcome" 
                className="group flex items-center justify-center bg-white border-2 border-[#ef3d3d] hover:bg-[#ef3d3d] hover:text-white rounded-lg p-6 w-40 h-20 transition-all duration-200"
              >
                <span className="font-medium text-gray-900 group-hover:text-white">Medicare</span>
              </a>
              
              {/* And more... */}
              <a 
                href="/welcome" 
                className="group flex items-center justify-center bg-white border-2 border-[#ef3d3d] hover:bg-[#ef3d3d] hover:text-white rounded-lg p-6 w-40 h-20 transition-all duration-200"
              >
                <span className="font-medium text-gray-900 group-hover:text-white">And more...</span>
              </a>
            </div>
            
            {/* Bottom CTA */}
            <div className="mt-12">
              <p className="text-sm mb-4 text-gray-600">Don&apos;t see your insurance?</p>
              <Link
                href="/welcome"
                className="inline-flex items-center justify-center bg-[#ef3d3d] text-white rounded-full px-8 py-3 text-base font-light hover:bg-[#d63333] transition-colors"
              >
                Check your coverage →
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-8 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="mb-12 lg:mb-16 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
                <span className="lg:hidden">Getting started is easy</span>
                <span className="hidden lg:inline">How it works</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 lg:px-0">
                <span className="lg:hidden">We&apos;ve made recovery accessible with our simple intake process</span>
                <span className="hidden lg:inline">Getting started with treatment is simple. Our streamlined process gets you connected with care quickly.</span>
              </p>
              
              {/* Mobile trust indicators */}
              <div className="lg:hidden flex justify-center gap-8 mt-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>5 min intake</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>48hr response</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              {/* Left side - Steps */}
              <div className="flex-1">
                <div className="space-y-12 lg:space-y-16">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4 lg:gap-6 relative group">
                    <div className="relative flex-shrink-0">
                      {/* Circle with fill animation */}
                      <div className="relative w-14 h-14 md:w-16 md:h-16">
                        {/* Background circle */}
                        <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                        {/* Animated fill circle */}
                        <div 
                          className="absolute inset-0 bg-[#005c65] rounded-full transition-all duration-700 ease-out"
                          style={{
                            clipPath: `circle(${step1Progress * 50}% at center)`,
                            WebkitClipPath: `circle(${step1Progress * 50}% at center)`,
                          }}
                        ></div>
                        {/* Number */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-2xl md:text-3xl font-bold transition-colors duration-700 ${step1Progress > 0.5 ? 'text-white' : 'text-gray-600'}`}>1</span>
                        </div>
                      </div>
                      {/* Connecting line */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-12 lg:h-16 bg-gray-200 overflow-hidden">
                        <div 
                          className="absolute inset-x-0 top-0 bg-[#005c65] transition-all duration-700 ease-out"
                          style={{ height: `${step1Progress * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h2 className="text-xl lg:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 lg:mb-3 text-gray-900">
                        Complete intake form
                      </h2>
                      <p className="text-sm lg:text-base md:text-lg text-gray-600">
                        Answer a few questions about your needs and insurance coverage. It takes less than 5 minutes.
                      </p>
                      {/* Mobile-only quick stat */}
                      <div className="lg:hidden mt-3 inline-flex items-center gap-2 text-xs text-[#005c65] font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Average time: 4 minutes</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4 lg:gap-6 relative group">
                    <div className="relative flex-shrink-0">
                      {/* Circle with fill animation */}
                      <div className="relative w-14 h-14 md:w-16 md:h-16">
                        {/* Background circle */}
                        <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                        {/* Animated fill circle */}
                        <div 
                          className="absolute inset-0 bg-[#005c65] rounded-full transition-all duration-700 ease-out"
                          style={{
                            clipPath: `circle(${step2Progress * 50}% at center)`,
                            WebkitClipPath: `circle(${step2Progress * 50}% at center)`,
                          }}
                        ></div>
                        {/* Number */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-2xl md:text-3xl font-bold transition-colors duration-700 ${step2Progress > 0.5 ? 'text-white' : 'text-gray-600'}`}>2</span>
                        </div>
                      </div>
                      {/* Connecting line */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-12 lg:h-16 bg-gray-200 overflow-hidden">
                        <div 
                          className="absolute inset-x-0 top-0 bg-[#005c65] transition-all duration-700 ease-out"
                          style={{ height: `${step2Progress * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h2 className="text-xl lg:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 lg:mb-3 text-gray-900">
                        Get matched with care
                      </h2>
                      <p className="text-sm lg:text-base md:text-lg text-gray-600">
                        We&apos;ll connect you with the right specialist for your needs within 48 hours.
                      </p>
                      {/* Mobile-only quick stat */}
                      <div className="lg:hidden mt-3 inline-flex items-center gap-2 text-xs text-[#005c65] font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Licensed specialists</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4 lg:gap-6 relative group">
                    <div className="relative flex-shrink-0">
                      {/* Circle with fill animation */}
                      <div className="relative w-14 h-14 md:w-16 md:h-16">
                        {/* Background circle */}
                        <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                        {/* Animated fill circle */}
                        <div 
                          className="absolute inset-0 bg-[#005c65] rounded-full transition-all duration-700 ease-out"
                          style={{
                            clipPath: `circle(${step3Progress * 50}% at center)`,
                            WebkitClipPath: `circle(${step3Progress * 50}% at center)`,
                          }}
                        ></div>
                        {/* Number */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-2xl md:text-3xl font-bold transition-colors duration-700 ${step3Progress > 0.5 ? 'text-white' : 'text-gray-600'}`}>3</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h2 className="text-xl lg:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 lg:mb-3 text-gray-900">
                        Start your treatment
                      </h2>
                      <p className="text-sm lg:text-base md:text-lg text-gray-600">
                        Begin your journey to recovery with personalized support from our experienced team.
                      </p>
                      {/* Mobile-only quick stat */}
                      <div className="lg:hidden mt-3 inline-flex items-center gap-2 text-xs text-[#005c65] font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>Compassionate care</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-16 text-center lg:text-left">
                  <Link href="/welcome">
                    <button className="bg-[#005c65] text-white px-10 py-4 rounded-lg font-light text-lg hover:bg-[#004a52] transition-colors shadow-lg">
                      Start Your Assessment
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right side - Telehealth Image */}
              <div className="hidden lg:block flex-1 relative">
                <div className="sticky top-1/4">
                  <div className="relative w-full h-[500px] bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8 shadow-xl">
                    {/* Video Container */}
                    <div className="relative h-full w-full rounded-xl overflow-hidden">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src="/lander/talking.mp4" type="video/mp4" />
                      </video>
                      {/* Overlay gradient for better text visibility if needed */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-200/30 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-200/30 rounded-full blur-2xl"></div>
                    
                    {/* Badge */}
                    <div className="absolute bottom-12 right-12 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                      <p className="text-sm font-semibold text-[#005c65]">100% Confidential</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Section */}
        <section className="bg-gray-900 py-16 overflow-hidden">
          <div className="relative">
            {/* Top marquee */}
            <div className="transform -rotate-3 mb-4">
              <div className="flex animate-marquee whitespace-nowrap">
                <div className="flex items-center">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase mx-8 text-transparent stroke-2 stroke-teal-400 hover:text-teal-400 transition-all duration-300 cursor-default marquee-text">
                    Opioid addiction is treatable
                  </span>
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase mx-8 text-transparent stroke-2 stroke-teal-400 hover:text-teal-400 transition-all duration-300 cursor-default marquee-text">
                    Opioid addiction is treatable
                  </span>
                </div>
                <div className="flex items-center" aria-hidden="true">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase mx-8 text-transparent stroke-2 stroke-teal-400 hover:text-teal-400 transition-all duration-300 cursor-default marquee-text">
                    Opioid addiction is treatable
                  </span>
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase mx-8 text-transparent stroke-2 stroke-teal-400 hover:text-teal-400 transition-all duration-300 cursor-default marquee-text">
                    Opioid addiction is treatable
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom marquee - opposite direction */}
            <div className="transform -rotate-3">
              <div className="flex animate-marquee-reverse whitespace-nowrap">
                <div className="flex items-center">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase mx-8 text-transparent stroke-2 stroke-emerald-400 hover:text-emerald-400 transition-all duration-300 cursor-default marquee-text">
                    Recovery is possible
                  </span>
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase mx-8 text-transparent stroke-2 stroke-emerald-400 hover:text-emerald-400 transition-all duration-300 cursor-default marquee-text">
                    Recovery is possible
                  </span>
                </div>
                <div className="flex items-center" aria-hidden="true">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase mx-8 text-transparent stroke-2 stroke-emerald-400 hover:text-emerald-400 transition-all duration-300 cursor-default marquee-text">
                    Recovery is possible
                  </span>
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase mx-8 text-transparent stroke-2 stroke-emerald-400 hover:text-emerald-400 transition-all duration-300 cursor-default marquee-text">
                    Recovery is possible
                  </span>
                </div>
              </div>
            </div>
          </div>
          
        </section>

        {/* Services Showcase Section */}
        <section className="py-16 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Your recovery, your way
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Choose the support format that works best for you
              </p>
            </div>
            
            {/* Service 1: Individual Counseling */}
            <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
              {/* Text Content - Left */}
              <div className="flex-1 lg:pr-12">
                <div className="inline-flex items-center gap-2 bg-[#005c65]/10 text-[#005c65] rounded-full px-4 py-2 mb-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm font-semibold uppercase tracking-wide">Individual Care</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  One-on-One Counseling
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Experience personalized care with dedicated therapists who understand your unique journey. Our individual counseling sessions provide a safe, confidential space for you to heal at your own pace.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Customized treatment plans tailored to your needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Flexible scheduling including evenings and weekends</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Evidence-based therapeutic approaches</span>
                  </li>
                </ul>
                <Link
                  href="/welcome"
                  className="inline-flex items-center justify-center bg-[#005c65] text-white rounded-full px-6 py-3 text-base font-light hover:bg-[#004a52] transition-colors"
                >
                  Schedule a session →
                </Link>
              </div>
              
              {/* Image - Right */}
              <div className="flex-1 relative">
                <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/lander/individual.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
            
            {/* Service 2: Group Counseling */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-24">
              {/* Text Content - Right (appears left on desktop due to flex-row-reverse) */}
              <div className="flex-1 lg:pl-12">
                <div className="inline-flex items-center gap-2 bg-[#ef3d3d]/10 text-[#ef3d3d] rounded-full px-4 py-2 mb-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm font-semibold uppercase tracking-wide">Community Support</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Group Counseling
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Find strength in shared experiences. Our group sessions connect you with others on similar journeys, creating a supportive community where healing happens together.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#ef3d3d] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Small groups for meaningful connections</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#ef3d3d] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Learn from peers with similar experiences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#ef3d3d] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Build lasting support networks</span>
                  </li>
                </ul>
                <Link
                  href="/welcome"
                  className="inline-flex items-center justify-center bg-[#ef3d3d] text-white rounded-full px-6 py-3 text-base font-light hover:bg-[#d63333] transition-colors"
                >
                  Join a group →
                </Link>
              </div>
              
              {/* Image - Left */}
              <div className="flex-1 relative">
                <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/lander/group.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
            
            {/* Service 3: Telehealth */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Text Content - Left */}
              <div className="flex-1 lg:pr-12">
                <div className="inline-flex items-center gap-2 bg-[#8B4513]/10 text-[#8B4513] rounded-full px-4 py-2 mb-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-semibold uppercase tracking-wide">Remote Care</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  All Services From Your Phone
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Access all our services right from your phone. Whether it&apos;s individual counseling, group sessions, or medication management - quality care is just a tap away, wherever you are.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#8B4513] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Access all services from your smartphone</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#8B4513] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Schedule appointments with just a few taps</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#8B4513] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Get care anywhere - home, work, or on-the-go</span>
                  </li>
                </ul>
                <Link
                  href="/welcome"
                  className="inline-flex items-center justify-center bg-[#8B4513] text-white rounded-full px-6 py-3 text-base font-light hover:bg-[#6b3410] transition-colors"
                >
                  Start virtual care →
                </Link>
              </div>
              
              {/* Image - Right */}
              <div className="flex-1 relative">
                <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/lander/Telehealth.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Craig Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Meet Craig
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Real stories of recovery and resilience
              </p>
            </div>
            
            {/* Craig's Story Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Background Image */}
              <div className="relative h-[600px] md:h-[700px] lg:h-[800px]">
                <img 
                  src="/lander/Craig.jpg" 
                  alt="Craig - Truck driver recovery story"
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Story Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
                  <div className="max-w-4xl">
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <svg className="w-12 h-12 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    
                    {/* Story Text */}
                    <blockquote className="text-white text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8">
                      &ldquo;After my accident, I was terrified to get behind the wheel. The thought of driving my truck again seemed impossible. But after just 6 weeks with Empower, I&apos;m back on the road doing what I love. They helped me face my fears and gave me the tools to overcome them.&rdquo;
                    </blockquote>
                    
                    {/* Craig's Info */}
                    <div className="flex items-center gap-4 mb-8">
                      <div>
                        <p className="text-white text-lg font-semibold">Craig M.</p>
                        <p className="text-white/80">Professional Truck Driver</p>
                      </div>
                    </div>
                    
                    {/* Stats/Achievement Badge */}
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white font-medium">Back on the road in 6 weeks</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating Mental Health Badge */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl max-w-[200px] md:max-w-xs">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#005c65]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 md:w-6 md:h-6 text-[#005c65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xs md:text-sm font-semibold text-gray-900">Mental Health Support</h3>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600">
                    Specialized therapy for trauma, anxiety, and fear recovery
                  </p>
                </div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="text-center mt-12">
              <p className="text-lg text-gray-600 mb-6">
                Your recovery story starts here
              </p>
              <Link
                href="/welcome"
                className="inline-flex items-center justify-center bg-[#005c65] text-white rounded-full px-8 py-4 text-lg font-light hover:bg-[#004a52] transition-colors shadow-lg"
              >
                Begin Your Journey →
              </Link>
            </div>
          </div>
        </section>

        {/* Teen & Family Therapy Section */}
        <section className="py-16 md:py-24 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Therapeutic Behavioral Services for Teens
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Specialized support for adolescents and families navigating mental health challenges and substance use
              </p>
            </div>
            
            {/* TBS Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
              <div className="flex flex-col">
                {/* Video Side */}
                <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/lander/Teen-therapist.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Content Side */}
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="max-w-3xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#ef3d3d]/10 rounded-full px-4 py-2 mb-6">
                      <svg className="w-5 h-5 text-[#ef3d3d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-sm font-semibold uppercase tracking-wide text-[#ef3d3d]">Youth & Family Services</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                      Comprehensive Care for Troubled Teens
                    </h3>
                    
                    <p className="text-lg text-gray-600 mb-8">
                      Our Therapeutic Behavioral Services (TBS) groups provide a safe, supportive environment where teens can address mental health challenges, substance use issues, and behavioral concerns while building healthy coping skills and peer connections.
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#005c65]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-[#005c65]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">TBS Group Therapy</h4>
                          <p className="text-sm text-gray-600">Age-appropriate groups that address trauma, anxiety, depression, and substance use</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#005c65]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-[#005c65]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Family Therapy Sessions</h4>
                          <p className="text-sm text-gray-600">Strengthen family bonds and improve communication through guided sessions</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#005c65]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-[#005c65]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Crisis Intervention</h4>
                          <p className="text-sm text-gray-600">24/7 support for teens and families during mental health emergencies</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#005c65]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-[#005c65]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">School Integration Support</h4>
                          <p className="text-sm text-gray-600">Work with schools to ensure academic success alongside treatment</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-[#faf8f5] rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-[#005c65]">89%</p>
                        <p className="text-sm text-gray-600">Improvement in family relationships</p>
                      </div>
                      <div className="bg-[#faf8f5] rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-[#005c65]">3-6</p>
                        <p className="text-sm text-gray-600">Months average treatment duration</p>
                      </div>
                    </div>
                    
                    {/* CTA */}
                    <Link
                      href="/welcome"
                      className="inline-flex items-center justify-center bg-[#ef3d3d] text-white rounded-full px-8 py-4 text-base font-light hover:bg-[#d63333] transition-colors w-full md:w-auto"
                    >
                      Get Help for Your Teen →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our licensed therapists specialize in adolescent mental health and substance use disorders, 
                providing evidence-based treatment that addresses the unique challenges teens face today.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-[#005c65] to-[#004a52]">
          <div className="max-w-4xl mx-auto px-5 md:px-8 lg:px-12 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Take the first step today
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
              Recovery starts with a single step. Our team is ready to support you on your journey.
            </p>
            <Link
              href="/welcome"
              className="inline-flex items-center justify-center bg-white text-[#005c65] rounded-full h-[3.5rem] md:h-[4rem] px-10 md:px-12 text-lg md:text-xl font-light transition-all duration-200 hover:bg-gray-100 hover:scale-105 shadow-2xl"
            >
              Start Your Assessment
            </Link>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>5 minute intake</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>100% confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          {/* Main Footer Content */}
          <div className="py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Company Info */}
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold mb-4">Empower Treatment</h3>
                <p className="text-gray-400 mb-6">
                  Your journey to recovery starts here. Professional, compassionate care available 24/7.
                </p>
                <div className="flex gap-4">
                  <a href="/" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="/" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="/" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                    </svg>
                  </a>
                  <a href="/" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-3">
                  <li><a href="/welcome" className="text-gray-400 hover:text-white transition-colors">Individual Therapy</a></li>
                  <li><a href="/welcome" className="text-gray-400 hover:text-white transition-colors">Group Counseling</a></li>
                  <li><a href="/welcome" className="text-gray-400 hover:text-white transition-colors">Teen & Family Services</a></li>
                  <li><a href="/welcome" className="text-gray-400 hover:text-white transition-colors">Telehealth</a></li>
                  <li><a href="/welcome" className="text-gray-400 hover:text-white transition-colors">Medication Management</a></li>
                </ul>
              </div>
              
              {/* Resources */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-3">
                  <li><a href="/welcome" className="text-gray-400 hover:text-white transition-colors">Insurance Coverage</a></li>
                  <li><a href="/welcome" className="text-gray-400 hover:text-white transition-colors">Start Assessment</a></li>
                  <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="/" className="text-gray-400 hover:text-white transition-colors">HIPAA Compliance</a></li>
                </ul>
              </div>
              
              {/* Contact */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Get Help Now</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#005c65] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-white font-semibold">24/7 Crisis Line</p>
                      <p className="text-gray-400">1-800-XXX-XXXX</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#005c65] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-white font-semibold">Email Support</p>
                      <p className="text-gray-400">support@empowertreatment.com</p>
                    </div>
                  </div>
                  
                  <Link
                    href="/welcome"
                    className="inline-flex items-center justify-center bg-[#005c65] text-white rounded-full px-6 py-3 text-sm font-light hover:bg-[#004a52] transition-colors w-full mt-4"
                  >
                    Start Your Assessment
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-800 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2024 Empower Treatment. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <a href="/" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}