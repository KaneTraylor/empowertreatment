'use client';

import { Header } from '@/components/Header';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HousingPortal() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-5 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Recovery Housing Portal
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Resources and forms for current recovery housing residents
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portal Options */}
      <section className="pb-24 px-5 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Weekend Pass Request */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link href="/weekend-pass" className="block">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-8 h-full">
                  <div className="w-16 h-16 bg-[#005c65]/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-[#005c65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Weekend Pass Request</h3>
                  <p className="text-gray-600 mb-4">
                    Submit a request for weekend or overnight passes. Requires staff approval.
                  </p>
                  <span className="text-[#005c65] font-medium flex items-center">
                    Request Pass
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* House Rules */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-sm p-8 h-full opacity-75 cursor-not-allowed">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">House Rules & Guidelines</h3>
                <p className="text-gray-600 mb-4">
                  Review recovery house rules, curfews, and community guidelines.
                </p>
                <span className="text-gray-400 font-medium">
                  Coming Soon
                </span>
              </div>
            </motion.div>

            {/* Meeting Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-sm p-8 h-full opacity-75 cursor-not-allowed">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Meeting Schedule</h3>
                <p className="text-gray-600 mb-4">
                  View required house meetings and local recovery meeting schedules.
                </p>
                <span className="text-gray-400 font-medium">
                  Coming Soon
                </span>
              </div>
            </motion.div>

            {/* Contact Staff */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a href="tel:740-200-0277" className="block">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-8 h-full">
                  <div className="w-16 h-16 bg-[#005c65]/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-[#005c65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact House Staff</h3>
                  <p className="text-gray-600 mb-4">
                    Need immediate assistance? Call our 24/7 support line.
                  </p>
                  <span className="text-[#005c65] font-medium flex items-center">
                    Call (740) 200-0277
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Important Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Reminders</h3>
            <ul className="space-y-2 text-yellow-800">
              <li className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Weekend passes must be requested at least 24 hours in advance
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                All passes are subject to staff approval
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Random drug testing may be required upon return
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}