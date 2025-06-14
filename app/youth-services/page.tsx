'use client';

import { Header } from '@/components/Header';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import React from 'react';
import { YouthServicesForms } from '@/components/form/YouthServicesForms';

export default function YouthServices() {
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
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroParallax }}
        >
          <img 
            src="/lander/teens.webp" 
            alt="Youth mental health services"
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
            Teen & Youth Services
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Specialized care for teens and young adults. We understand the unique challenges 
            you face and we&apos;re here to help you navigate them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/welcome"
              className="inline-flex items-center justify-center bg-white text-[#ef3d3d] rounded-full px-8 py-4 text-lg font-medium hover:bg-gray-100 transition-all duration-200 shadow-xl"
            >
              Start Your Assessment
            </Link>
            <a
              href="tel:740-200-0016"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white rounded-full px-8 py-4 text-lg font-medium hover:bg-white hover:text-[#ef3d3d] transition-all duration-200"
            >
              Call (740) 200-0016
            </a>
          </div>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
        <div className="relative">
          {/* Top marquee */}
          <div className="transform -rotate-2 mb-8">
            <div className="flex animate-marquee whitespace-nowrap">
              <div className="flex items-center">
                <span className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase mx-8 text-red-400/30 hover:text-red-400 transition-all duration-300 cursor-default marquee-text">
                  You are not alone
                </span>
                <span className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase mx-8 text-red-400/30 hover:text-red-400 transition-all duration-300 cursor-default marquee-text">
                  You are not alone
                </span>
              </div>
              <div className="flex items-center" aria-hidden="true">
                <span className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase mx-8 text-red-400/30 hover:text-red-400 transition-all duration-300 cursor-default marquee-text">
                  You are not alone
                </span>
                <span className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase mx-8 text-red-400/30 hover:text-red-400 transition-all duration-300 cursor-default marquee-text">
                  You are not alone
                </span>
              </div>
            </div>
          </div>

          {/* Bottom marquee - opposite direction */}
          <div className="transform rotate-2">
            <div className="flex animate-marquee-reverse whitespace-nowrap">
              <div className="flex items-center">
                <span className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase mx-8 text-teal-400/30 hover:text-teal-400 transition-all duration-300 cursor-default marquee-text">
                  Help is here
                </span>
                <span className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase mx-8 text-teal-400/30 hover:text-teal-400 transition-all duration-300 cursor-default marquee-text">
                  Help is here
                </span>
              </div>
              <div className="flex items-center" aria-hidden="true">
                <span className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase mx-8 text-teal-400/30 hover:text-teal-400 transition-all duration-300 cursor-default marquee-text">
                  Help is here
                </span>
                <span className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase mx-8 text-teal-400/30 hover:text-teal-400 transition-all duration-300 cursor-default marquee-text">
                  Help is here
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Teens Choose Empower Section */}
      <section className="relative py-10 md:py-12 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/lander/Teenager_having_a_202506131504.mp4" type="video/mp4" />
          </video>
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center lg:justify-end">
            {/* Content Card */}
            <motion.div 
              className="relative w-full sm:w-[67%] md:w-[55%] min-w-[320px] sm:min-w-[420px] md:min-w-[440px] lg:min-w-[560px] max-w-[550px] lg:max-w-none bg-white rounded shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                backgroundImage: `linear-gradient(180deg, white 80%, transparent 89%), url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 Q 50 80 100 100' fill='%23f5f5f5'/%3E%3C/svg%3E")`,
                backgroundPosition: '0 0, 50% 100%',
                backgroundRepeat: 'repeat, no-repeat',
                backgroundSize: 'auto, 100%',
              }}
            >
              <div className="px-[30px] sm:px-[25px] md:px-[4%] lg:px-[5.5%] py-[30px] sm:py-[25px] md:py-[4%] lg:py-[4.5%]">
                <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[2.75rem] font-normal text-[#ef3d3d] mb-5 leading-[1.2] max-w-[280px] sm:max-w-[350px] text-center sm:text-left mx-auto sm:mx-0">
                  Why <span className="text-[#005c65]">teens</span>{' '}
                  <span className="text-[#ef3d3d]/70">are</span>{' '}
                  <span className="text-[#ef3d3d]/80">choosing</span>{' '}
                  <span className="text-[#ef3d3d]">Empower</span>
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-[35px_1fr] gap-y-[10px] sm:gap-y-[16px] md:gap-y-[20px] lg:gap-y-8 gap-x-4 text-center sm:text-left max-w-[320px] sm:max-w-none mx-auto sm:mx-0">
                  {[
                    'Connect from the comfort of your own space',
                    'Therapists who actually understand teen struggles',
                    'Text, video chat, or both - whatever works for you',
                    'No awkward waiting rooms or transportation needed'
                  ].map((benefit, index) => (
                    <React.Fragment key={index}>
                      <svg className="w-[35px] h-[35px] text-[#ef3d3d] mx-auto sm:mx-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div className="self-center sm:col-start-2">
                        <p className="text-base text-gray-700">{benefit}</p>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comprehensive Services Section */}
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
              Comprehensive Youth Mental Health Services
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              From counseling to crisis intervention, we offer a full spectrum of services designed specifically for teens and young adults.
            </p>
          </motion.div>

          {/* Service Categories */}
          <div className="space-y-16">
            {/* Counseling & Therapy Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <div className="w-12 h-12 bg-[#ef3d3d]/10 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-[#ef3d3d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                Counseling & Therapy Services
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Individual Therapy",
                    description: "One-on-one sessions tailored to your teen's specific needs and goals"
                  },
                  {
                    title: "Group Therapy",
                    description: "Connect with peers facing similar challenges in a supportive environment"
                  },
                  {
                    title: "Family Therapy",
                    description: "Strengthen family bonds and improve communication together"
                  },
                  {
                    title: "Home-Based Counseling",
                    description: "Receive therapy in the comfort and privacy of your own home"
                  },
                  {
                    title: "School-Based Services",
                    description: "On-site counseling and support within your teen's school"
                  },
                  {
                    title: "Intensive Home-Based Treatment",
                    description: "Comprehensive care for teens needing more frequent support"
                  }
                ].map((service, index) => (
                  <div key={index} className="bg-[#faf8f5] rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h4>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Specialized Programs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <div className="w-12 h-12 bg-[#005c65]/10 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-[#005c65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                Specialized Treatment Programs
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-[#005c65]/20 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-[#005c65] mb-3">Psychiatric Services</h4>
                  <p className="text-gray-600 mb-4">
                    Comprehensive psychiatric evaluation and medication management by specialized child and adolescent psychiatrists.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[#005c65] mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Initial psychiatric evaluation
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[#005c65] mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Medication management
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[#005c65] mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Regular monitoring and adjustments
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white border-2 border-[#ef3d3d]/20 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-[#ef3d3d] mb-3">Crisis Intervention Services</h4>
                  <p className="text-gray-600 mb-4">
                    24/7 support for teens and families experiencing mental health emergencies or crisis situations.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[#ef3d3d] mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      24/7 crisis hotline
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[#ef3d3d] mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Emergency assessment
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[#ef3d3d] mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Safety planning
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Treatment Focus Areas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                What We Help With
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "Anxiety & Panic Disorders",
                  "Depression & Mood Disorders",
                  "ADHD & Behavioral Issues",
                  "Trauma & PTSD",
                  "Substance Use & Addiction",
                  "Self-Harm & Suicidal Ideation",
                  "Eating Disorders",
                  "School Refusal & Academic Issues",
                  "Social Skills & Peer Relationships",
                  "Anger Management",
                  "Family Conflicts",
                  "Identity & Self-Esteem Issues"
                ].map((issue, index) => (
                  <div key={index} className="bg-amber-50 rounded-lg p-4 text-center">
                    <p className="text-gray-800 font-medium">{issue}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Additional Support Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#005c65] to-[#004a52] rounded-2xl p-8 md:p-12 text-white"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-8">Comprehensive Support Services</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Case Management & Coordination
                  </h4>
                  <ul className="space-y-2 text-white/90">
                    <li>• Individualized treatment planning</li>
                    <li>• School collaboration and advocacy</li>
                    <li>• Community resource connections</li>
                    <li>• Insurance navigation assistance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Educational Support
                  </h4>
                  <ul className="space-y-2 text-white/90">
                    <li>• Parenting education and guidance</li>
                    <li>• Coping skills workshops</li>
                    <li>• Mental health education for teens</li>
                    <li>• Conflict resolution training</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialized Youth Programs Section */}
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
              Specialized Programs for Every Need
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Evidence-based programs designed to address specific challenges teens face today.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* TBS Program */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#ef3d3d] to-[#dc2626] p-6">
                <h3 className="text-2xl font-bold text-white">Therapeutic Behavioral Services (TBS)</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Intensive support for teens with significant behavioral challenges who need more than traditional therapy.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#ef3d3d] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">One-on-one behavioral coaching</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#ef3d3d] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">In-home and community-based support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#ef3d3d] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Skill-building for daily life challenges</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#ef3d3d] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">24/7 crisis support access</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Substance Use Program */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#005c65] to-[#004a52] p-6">
                <h3 className="text-2xl font-bold text-white">Substance Use Recovery Program</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Specialized treatment for teens struggling with substance use, combining therapy with peer support.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#005c65] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Individual and group counseling</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#005c65] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Family involvement and education</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#005c65] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Relapse prevention planning</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#005c65] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Peer recovery support groups</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* School Partnership Program */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6">
                <h3 className="text-2xl font-bold text-white">School-Based Mental Health</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Bringing mental health services directly to schools, making support accessible where teens spend their time.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">On-site counseling during school hours</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Teacher and staff consultation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Academic support coordination</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Crisis response team availability</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Functional Family Therapy */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6">
                <h3 className="text-2xl font-bold text-white">Functional Family Therapy (FFT)</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Evidence-based program that works with the whole family to create lasting positive change.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Short-term, high-impact therapy</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Focus on family strengths</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Improve family communication</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Reduce youth problem behaviors</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works for Teens */}
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
              Getting Started is Easy
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              No complicated process. Just real help when you need it.
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
              <div className="w-20 h-20 bg-[#ef3d3d] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Check-In</h3>
              <p className="text-gray-600">
                Answer a few questions about what you&apos;re going through
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
              <div className="w-20 h-20 bg-[#ef3d3d] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Matched</h3>
              <p className="text-gray-600">
                We&apos;ll connect you with a therapist who gets teens
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
              <div className="w-20 h-20 bg-[#ef3d3d] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Talking</h3>
              <p className="text-gray-600">
                Chat, video call, or message - whatever feels right
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
              <div className="w-20 h-20 bg-[#ef3d3d] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Feel Better</h3>
              <p className="text-gray-600">
                Get tools and support to handle life&apos;s challenges
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Parent/Guardian Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Information for Parents & Guardians
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                We partner with families to support your teen&apos;s mental health journey. 
                Our approach respects both teen autonomy and parental involvement.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#005c65]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#005c65]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Confidential & Safe</h3>
                    <p className="text-gray-600">We maintain appropriate confidentiality while keeping parents informed about their teen&apos;s progress and safety.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#005c65]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#005c65]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Insurance Coverage</h3>
                    <p className="text-gray-600">We accept most major insurance plans and can help verify your coverage for teen mental health services.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#005c65]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#005c65]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Family Support Available</h3>
                    <p className="text-gray-600">We offer family therapy sessions and parent guidance to help the whole family heal and grow together.</p>
                  </div>
                </div>
              </div>

              <Link
                href="/welcome"
                className="inline-flex items-center justify-center bg-[#005c65] text-white rounded-full px-8 py-4 text-lg font-medium hover:bg-[#004a52] transition-all duration-200 shadow-lg mt-8"
              >
                Learn More About Our Approach
              </Link>
            </motion.div>

            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/lander/teens.webp" 
                  alt="Family support"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              Real Stories from Real Teens
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from young people who found support through Empower
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-lg"
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
                &ldquo;I was really nervous about therapy, but my therapist made me feel comfortable from day one. It&apos;s nice to talk to someone who actually gets what it&apos;s like being a teenager today.&rdquo;
              </blockquote>
              <cite className="text-sm text-gray-600">
                — Sarah, 16
              </cite>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-lg"
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
                &ldquo;Being able to text my therapist when I&apos;m having a rough day has been a game changer. I don&apos;t have to wait for my next appointment to get help.&rdquo;
              </blockquote>
              <cite className="text-sm text-gray-600">
                — Michael, 17
              </cite>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#ef3d3d] to-[#d63333]">
        <div className="max-w-4xl mx-auto px-5 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              You Don&apos;t Have to Do This Alone
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
              Take the first step. We&apos;re here to help you feel better and live better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/welcome"
                className="inline-flex items-center justify-center bg-white text-[#ef3d3d] rounded-full h-[3.5rem] md:h-[4rem] px-10 md:px-12 text-lg md:text-xl font-light transition-all duration-200 hover:bg-gray-100 hover:scale-105 shadow-2xl"
              >
                Start Your Assessment
              </Link>
              <a
                href="tel:740-200-0016"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white rounded-full h-[3.5rem] md:h-[4rem] px-10 md:px-12 text-lg md:text-xl font-light transition-all duration-200 hover:bg-white hover:text-[#ef3d3d]"
              >
                Call Now: (740) 200-0016
              </a>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Available evenings & weekends</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Confidential & safe</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Text or video chat</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Forms Section */}
      <YouthServicesForms />

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
                  <li><Link href="/adult-services" className="text-gray-400 hover:text-white transition-colors">Adult Services</Link></li>
                  <li><Link href="/youth-services" className="text-gray-400 hover:text-white transition-colors">Teen & Youth Services</Link></li>
                  <li><Link href="/welcome" className="text-gray-400 hover:text-white transition-colors">Group Counseling</Link></li>
                  <li><Link href="/welcome" className="text-gray-400 hover:text-white transition-colors">Telehealth</Link></li>
                  <li><Link href="/welcome" className="text-gray-400 hover:text-white transition-colors">Family Therapy</Link></li>
                </ul>
              </div>
              
              {/* Resources */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-3">
                  <li><Link href="/welcome" className="text-gray-400 hover:text-white transition-colors">Insurance Coverage</Link></li>
                  <li><Link href="/welcome" className="text-gray-400 hover:text-white transition-colors">Start Assessment</Link></li>
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
                    <svg className="w-5 h-5 text-[#ef3d3d] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-white font-semibold">24/7 Support</p>
                      <p className="text-gray-400">(740) 200-0016</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#ef3d3d] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-white font-semibold">Email Support</p>
                      <p className="text-gray-400">support@empowertreatment.com</p>
                    </div>
                  </div>
                  
                  <Link
                    href="/welcome"
                    className="inline-flex items-center justify-center bg-[#ef3d3d] text-white rounded-full px-6 py-3 text-sm font-light hover:bg-[#d63333] transition-colors w-full mt-4"
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