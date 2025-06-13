'use client';

import { Header } from '@/components/Header';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import React from 'react';

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

      {/* Insurance Coverage by State Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Insurance Coverage by State
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We accept most major insurance plans. Select your state to see coverage options in your area.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Map Container */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-[4/3] bg-[#faf8f5] rounded-2xl overflow-hidden shadow-lg">
                {/* US Map Image */}
                <img 
                  src="/lander/us.png" 
                  alt="United States coverage map"
                  className="w-full h-full object-contain p-4"
                />
                
                {/* Map Legend Overlay */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#005c65] rounded"></div>
                      <span className="text-sm text-gray-700">Coverage Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-300 rounded"></div>
                      <span className="text-sm text-gray-700">Coming Soon</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating Badge */}
                <motion.div 
                  className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <p className="text-sm font-semibold text-[#005c65]">Currently serving Ohio</p>
                </motion.div>
              </div>
            </motion.div>

            {/* State Selection and Insurance Info */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* State Dropdown */}
              <div>
                <label htmlFor="state-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Select your state
                </label>
                <select 
                  id="state-select"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all"
                  defaultValue="OH"
                >
                  <option value="">Choose a state...</option>
                  <option value="OH">Ohio</option>
                  <option value="IN" disabled>Indiana (Coming Soon)</option>
                  <option value="KY" disabled>Kentucky (Coming Soon)</option>
                  <option value="MI" disabled>Michigan (Coming Soon)</option>
                  <option value="PA" disabled>Pennsylvania (Coming Soon)</option>
                  <option value="WV" disabled>West Virginia (Coming Soon)</option>
                </select>
              </div>

              {/* Ohio Insurance Providers */}
              <div className="bg-[#faf8f5] rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                  Insurance Providers in Ohio
                </h3>
                
                <div className="space-y-4">
                  {/* Major Insurers */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Major Insurance Plans</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        'Medicaid/CareSource', 
                        'Molina Healthcare',
                        'Paramount Advantage',
                        'Buckeye Health Plan',
                        'United Healthcare',
                        'Anthem Blue Cross',
                        'Aetna',
                        'Medical Mutual'
                      ].map((insurer) => (
                        <div key={insurer} className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-[#005c65] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm sm:text-base text-gray-700">{insurer}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">
                      Don&apos;t see your insurance listed? We work with many other providers and offer flexible payment options.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/welcome"
                        className="inline-flex items-center justify-center bg-[#005c65] text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-[#004a52] transition-colors"
                      >
                        Verify Coverage
                      </Link>
                      <a
                        href="tel:740-200-0016"
                        className="inline-flex items-center justify-center bg-transparent border-2 border-[#005c65] text-[#005c65] rounded-full px-6 py-3 text-sm font-medium hover:bg-[#005c65] hover:text-white transition-colors"
                      >
                        Call for Questions
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Card */}
              <div className="bg-gradient-to-br from-[#005c65] to-[#004a52] rounded-2xl p-6 sm:p-8 text-white">
                <h4 className="text-lg sm:text-xl font-semibold mb-4">Why Choose In-Network Care?</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Most patients pay $0 copay for treatment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Coverage for medication and therapy sessions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>We handle all insurance paperwork for you</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Adults Choose Empower Section */}
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
            <source src="/lander/An_adult_walking_202506131515 (1).mp4" type="video/mp4" />
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
                <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[2.75rem] font-normal text-[#005c65] mb-5 leading-[1.2] max-w-[280px] sm:max-w-[350px] text-center sm:text-left mx-auto sm:mx-0">
                  Why <span className="text-[#ef3d3d]">adults</span>{' '}
                  <span className="text-[#005c65]/70">are</span>{' '}
                  <span className="text-[#005c65]/80">choosing</span>{' '}
                  <span className="text-[#005c65]">Empower</span>
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-[35px_1fr] gap-y-[10px] sm:gap-y-[16px] md:gap-y-[20px] lg:gap-y-8 gap-x-4 text-center sm:text-left max-w-[320px] sm:max-w-none mx-auto sm:mx-0">
                  {[
                    'No scheduling or commuting to appointments',
                    'Licensed therapists who specialize in adult addiction',
                    'Message your therapist, schedule a video session, or both',
                    'Easy to switch therapists if your first one isn\'t the right fit'
                  ].map((benefit, index) => (
                    <React.Fragment key={index}>
                      <svg className="w-[35px] h-[35px] text-[#005c65] mx-auto sm:mx-0" fill="currentColor" viewBox="0 0 20 20">
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


      {/* Services Overview */}
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

      {/* Telehealth Comparison Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Telehealth?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the convenience and effectiveness of virtual care
            </p>
          </motion.div>

          {/* Comparison Table */}
          <motion.div 
            className="relative w-full md:max-w-[630px] lg:max-w-[765px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background Grid */}
            <div className="absolute inset-0 grid grid-cols-[2fr_75px_75px] sm:grid-cols-[2.75fr_0.75fr_1fr] md:grid-cols-[2fr_1fr_0.75fr] gap-0">
              <div></div>
              <div className="bg-[#005c65] rounded-2xl sm:rounded-lg"></div>
              <div></div>
            </div>

            {/* Table Content */}
            <div className="relative z-10">
              {/* Header Row */}
              <div className="grid grid-cols-[2fr_75px_75px] sm:grid-cols-[2.75fr_0.75fr_1fr] md:grid-cols-[2fr_1fr_0.75fr] gap-0 py-5 md:py-10 border-b border-[#005c65]">
                <div></div>
                <div className="flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-base md:text-lg hidden sm:inline">Telehealth</span>
                  <img src="/logo.png" alt="Empower" className="w-8 h-8 sm:hidden brightness-0 invert" />
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">In-person</span>
                </div>
              </div>

              {/* Comparison Rows */}
              {[
                { label: 'A therapist licensed in your state', telehealth: true, inPerson: true },
                { label: 'Receive therapy from anywhere', telehealth: true, inPerson: false },
                { label: 'Message your therapist any time', telehealth: true, inPerson: false },
                { label: 'Receive messages back', telehealth: true, inPerson: false },
                { label: 'Easy appointment scheduling', telehealth: true, inPerson: false },
                { label: 'Quickly switch therapists', telehealth: true, inPerson: false },
                { label: 'No parking fees or lost travel time', telehealth: true, inPerson: false },
              ].map((row, index) => (
                <motion.div 
                  key={index}
                  className="grid grid-cols-[2fr_75px_75px] sm:grid-cols-[2.75fr_0.75fr_1fr] md:grid-cols-[2fr_1fr_0.75fr] gap-0 py-4 md:py-5 border-b border-[#005c65]/30 items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="px-4 pr-2 sm:pr-4">
                    <p className="text-sm sm:text-base text-gray-900 font-medium">{row.label}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    {row.telehealth === true ? (
                      <img 
                        src="/lander/checkmark.svg" 
                        alt="checkmark" 
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                    ) : (
                      <span className="text-white font-medium text-sm">{row.telehealth}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    {row.inPerson === true ? (
                      <img 
                        src="/lander/orangecheck.svg" 
                        alt="checkmark" 
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                    ) : row.inPerson === false ? (
                      <img 
                        src="/lander/orangex.svg" 
                        alt="x mark" 
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                    ) : (
                      <span className="text-[#005c65] font-medium text-xs sm:text-sm">{row.inPerson}</span>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Empty Row for Spacing */}
              <div className="h-8"></div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/welcome"
              className="inline-flex items-center justify-center bg-[#005c65] text-white rounded-full px-10 py-4 text-lg font-medium hover:bg-[#004a52] transition-all duration-200 shadow-lg"
            >
              Start Telehealth Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mental Health Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div 
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Comprehensive Mental Health Care
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                We understand that addiction often goes hand-in-hand with mental health challenges. 
                Our integrated approach treats the whole person, addressing both substance use and 
                co-occurring mental health conditions.
              </p>
              
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-gray-900">Conditions We Treat:</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'Depression',
                    'Anxiety Disorders',
                    'PTSD & Trauma',
                    'Bipolar Disorder',
                    'ADHD',
                    'Personality Disorders'
                  ].map((condition) => (
                    <div key={condition} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-[#005c65] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{condition}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#faf8f5] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Our Approach:</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>• Evidence-based therapies including CBT, DBT, and EMDR</li>
                  <li>• Psychiatric evaluation and medication management</li>
                  <li>• Individual and group therapy sessions</li>
                  <li>• 24/7 crisis support</li>
                </ul>
              </div>
            </motion.div>

            {/* Video */}
            <motion.div 
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/lander/A_therapist_and_202506131601.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recovery Housing Section */}
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
              Safe, Supportive Recovery Housing
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              A stable living environment is crucial for lasting recovery. Our recovery houses provide 
              the structure and community support you need to rebuild your life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image/Video */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
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
            </motion.div>

            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8">
                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      icon: (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      ),
                      title: "Safe Environment",
                      description: "Drug-free living spaces with 24/7 support"
                    },
                    {
                      icon: (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      ),
                      title: "Community Support",
                      description: "Live with peers who understand your journey"
                    },
                    {
                      icon: (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                      title: "Accountability",
                      description: "Regular check-ins and house meetings"
                    },
                    {
                      icon: (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      ),
                      title: "Life Skills",
                      description: "Learn daily living and recovery skills"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="w-14 h-14 bg-[#005c65]/10 rounded-full flex items-center justify-center mb-4 text-[#005c65]">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="bg-gradient-to-br from-[#005c65] to-[#004a52] rounded-2xl p-8 text-white">
                  <h3 className="text-xl font-semibold mb-4">What&apos;s Included:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Furnished rooms in clean, comfortable homes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Transportation to treatment and meetings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>House manager support and guidance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Assistance with employment and education goals</span>
                    </li>
                  </ul>
                </div>
              </div>
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
            {/* Testimonial 1 - Jesse Moore */}
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
                &ldquo;Respectful and honest. Let you figure stuff out on your own but help when you need it. Great people and more personalized treatment for those who want and need a good start. I recommend this place and they do care and will help you get where you need to go quickly but efficiently. Problem solvers not problem creators. Great people.&rdquo;
              </blockquote>
              <cite className="text-sm text-gray-600">
                — Jesse Moore
              </cite>
            </motion.div>

            {/* Testimonial 2 - Jd Hilderbrand */}
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
                &ldquo;I came to this program roughly 3 months ago. In this three month span I have met some amazing individuals. I have personally been through at least five other Transitional Living programs in the Scioto County area and Empower has by far been the best program I have ever been through. The staff here has helped me in all aspects of my life. They believed in me at a time when I didn&apos;t believe in myself and in return helped build me back up to be a productive member of society.&rdquo;
              </blockquote>
              <cite className="text-sm text-gray-600">
                — Jd Hilderbrand
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
                  <li><Link href="/welcome" className="text-gray-400 hover:text-white transition-colors">Group Counseling</Link></li>
                  <li><Link href="/welcome" className="text-gray-400 hover:text-white transition-colors">Teen & Family Services</Link></li>
                  <li><Link href="/welcome" className="text-gray-400 hover:text-white transition-colors">Telehealth</Link></li>
                  <li><Link href="/welcome" className="text-gray-400 hover:text-white transition-colors">Medication Management</Link></li>
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
                    <svg className="w-5 h-5 text-[#005c65] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-white font-semibold">24/7 Support</p>
                      <p className="text-gray-400">(740) 200-0016</p>
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