'use client';

import { Header } from '@/components/Header';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function AdultServices() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax transforms
  const heroParallax = useTransform(scrollY, [0, 500], [0, 150]);
  const textParallax = useTransform(scrollY, [0, 300], [0, -50]);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroParallax }}
        >
          <img 
            src="/lander/telehealth.jpg" 
            alt="Adult mental health services"
            className="w-full h-[110%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </motion.div>
        
        {/* Hero Content */}
        <motion.div 
          className="relative z-10 text-center px-5 md:px-8 lg:px-12 max-w-5xl mx-auto"
          style={{ y: textParallax }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Adult Behavioral Health Services
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Comprehensive, compassionate care designed for your unique recovery journey. 
            We&apos;re here to help you reclaim your life from addiction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/welcome"
              className="inline-flex items-center justify-center bg-white text-[#005c65] rounded-full px-8 py-4 text-lg font-medium hover:bg-gray-100 transition-all duration-200 shadow-xl"
            >
              Start Your Assessment
            </Link>
            <a
              href="tel:740-200-0016"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white rounded-full px-8 py-4 text-lg font-medium hover:bg-white hover:text-[#005c65] transition-all duration-200"
            >
              Call (740) 200-0016
            </a>
          </div>
        </motion.div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Tailored Treatment for Every Adult
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our evidence-based programs address the full spectrum of addiction and mental health challenges
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Service 1: MAT */}
            <motion.div 
              className="bg-[#faf8f5] rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-[#005c65]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#005c65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Medication-Assisted Treatment
              </h3>
              <p className="text-gray-600 mb-4">
                FDA-approved medications combined with counseling to treat opioid addiction safely and effectively.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Suboxone & Sublocade programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>24/7 provider access</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Same-day prescriptions</span>
                </li>
              </ul>
            </motion.div>

            {/* Service 2: Individual Therapy */}
            <motion.div 
              className="bg-[#faf8f5] rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-[#005c65]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#005c65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Individual Counseling
              </h3>
              <p className="text-gray-600 mb-4">
                One-on-one therapy sessions tailored to your specific needs and recovery goals.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Cognitive Behavioral Therapy</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Trauma-informed care</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Flexible scheduling</span>
                </li>
              </ul>
            </motion.div>

            {/* Service 3: Group Therapy */}
            <motion.div 
              className="bg-[#faf8f5] rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-[#005c65]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#005c65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Group Support Sessions
              </h3>
              <p className="text-gray-600 mb-4">
                Connect with peers who understand your journey in professionally facilitated groups.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Small, intimate groups</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Topic-focused sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Build lasting connections</span>
                </li>
              </ul>
            </motion.div>

            {/* Service 4: Mental Health */}
            <motion.div 
              className="bg-[#faf8f5] rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-[#005c65]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#005c65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Mental Health Services
              </h3>
              <p className="text-gray-600 mb-4">
                Comprehensive treatment for co-occurring mental health conditions.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Depression & anxiety treatment</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>PTSD & trauma therapy</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Psychiatric evaluations</span>
                </li>
              </ul>
            </motion.div>

            {/* Service 5: Telehealth */}
            <motion.div 
              className="bg-[#faf8f5] rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-[#005c65]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#005c65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Telehealth Options
              </h3>
              <p className="text-gray-600 mb-4">
                Access all our services from the comfort and privacy of your home.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure video sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Mobile app available</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Evening & weekend hours</span>
                </li>
              </ul>
            </motion.div>

            {/* Service 6: Aftercare */}
            <motion.div 
              className="bg-[#faf8f5] rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-[#005c65]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#005c65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Aftercare & Support
              </h3>
              <p className="text-gray-600 mb-4">
                Ongoing support to maintain your recovery and prevent relapse.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Alumni programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Relapse prevention planning</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005c65] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Community resources</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="py-16 md:py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Your Journey to Recovery
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              A personalized path designed around your unique needs and goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-20 h-20 bg-[#005c65] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Assessment</h3>
              <p className="text-gray-600">
                Comprehensive evaluation to understand your needs
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-20 h-20 bg-[#005c65] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Plan</h3>
              <p className="text-gray-600">
                Custom treatment strategy based on your goals
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-20 h-20 bg-[#005c65] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Active Treatment</h3>
              <p className="text-gray-600">
                Evidence-based therapies and ongoing support
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-20 h-20 bg-[#005c65] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustained Recovery</h3>
              <p className="text-gray-600">
                Aftercare and alumni support for lasting success
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Real People, Real Recovery
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from adults who have transformed their lives through our programs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <motion.div 
              className="bg-[#faf8f5] rounded-2xl p-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg text-gray-700 mb-4">
                &ldquo;The MAT program saved my life. After years of struggling with opioid addiction, I finally found a treatment that worked. The staff treated me with dignity and respect throughout my journey.&rdquo;
              </blockquote>
              <cite className="text-sm text-gray-600">
                — Michael R., 8 months in recovery
              </cite>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div 
              className="bg-[#faf8f5] rounded-2xl p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg text-gray-700 mb-4">
                &ldquo;I never thought I could feel normal again. The dual diagnosis treatment helped me address both my addiction and underlying depression. Today, I have my family back.&rdquo;
              </blockquote>
              <cite className="text-sm text-gray-600">
                — Jennifer S., 1 year in recovery
              </cite>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#005c65] to-[#004a52]">
        <div className="max-w-4xl mx-auto px-5 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Start Your Recovery?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
              Take the first step today. Our caring team is ready to help you reclaim your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/welcome"
                className="inline-flex items-center justify-center bg-white text-[#005c65] rounded-full h-[3.5rem] md:h-[4rem] px-10 md:px-12 text-lg md:text-xl font-light transition-all duration-200 hover:bg-gray-100 hover:scale-105 shadow-2xl"
              >
                Start Your Assessment
              </Link>
              <a
                href="tel:740-200-0016"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white rounded-full h-[3.5rem] md:h-[4rem] px-10 md:px-12 text-lg md:text-xl font-light transition-all duration-200 hover:bg-white hover:text-[#005c65]"
              >
                Call Now: (740) 200-0016
              </a>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Same-day appointments</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Insurance accepted</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>24/7 support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}