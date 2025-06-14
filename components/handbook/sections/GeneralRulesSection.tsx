'use client';

import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export default function GeneralRulesSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">General House Rules</h2>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="mb-6">
          These rules are designed to maintain a safe, respectful, and recovery-focused environment 
          for all residents. Violation of these rules may result in disciplinary action, including 
          possible discharge from the program.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Substance Use Policy</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-red-900 mb-2">Zero Tolerance</h4>
          <ul className="list-disc pl-6 space-y-2 text-red-800">
            <li>Absolutely no drugs or alcohol are permitted on the property</li>
            <li>No possession of drug paraphernalia</li>
            <li>No prescription medications not prescribed to you</li>
            <li>Random drug testing will be conducted</li>
            <li>Refusal to test is considered a positive result</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Curfew & Overnight Policies</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Sunday - Thursday:</strong> 10:00 PM curfew</li>
          <li><strong>Friday - Saturday:</strong> 11:00 PM curfew</li>
          <li>All overnight passes must be approved 24 hours in advance</li>
          <li>You must be in your assigned room by midnight</li>
          <li>No overnight guests without prior approval</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Respect & Behavior</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Treat all residents and staff with respect and dignity</li>
          <li>No violence, threats, or intimidation</li>
          <li>No romantic or sexual relationships between residents</li>
          <li>No discriminatory language or behavior</li>
          <li>Resolve conflicts peacefully through proper channels</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. House Maintenance</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Keep your room clean and organized daily</li>
          <li>Complete assigned chores on schedule</li>
          <li>Clean up after yourself in common areas</li>
          <li>Report maintenance issues immediately</li>
          <li>No smoking inside the house (designated areas only)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Privacy & Boundaries</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Knock before entering any room</li>
          <li>Respect others&apos; personal property</li>
          <li>No entering others&apos; rooms without permission</li>
          <li>Staff may conduct room searches at any time</li>
          <li>Maintain appropriate boundaries with all residents</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Communication & Technology</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Cell phones permitted but must be on silent in common areas</li>
          <li>No phone use during meetings or meals</li>
          <li>Inappropriate internet use is prohibited</li>
          <li>No sharing of other residents&apos; personal information</li>
          <li>Social media use must not compromise anonymity</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Financial Responsibilities</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Pay rent on time (due on the 1st of each month)</li>
          <li>Late fees apply after the 5th</li>
          <li>Maintain renter&apos;s insurance if required</li>
          <li>Pay for any damages you cause</li>
          <li>No lending or borrowing money between residents</li>
        </ul>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <h4 className="text-lg font-semibold text-yellow-900 mb-2">Remember</h4>
          <p className="text-yellow-800">
            These rules exist to create a safe and supportive environment for everyone&apos;s recovery. 
            If you&apos;re struggling with any rule or need clarification, please speak with staff 
            immediately. We&apos;re here to help you succeed.
          </p>
        </div>
      </div>

      {!isAcknowledged && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onAcknowledge}
          className="mt-8 w-full sm:w-auto px-6 py-3 bg-[#005c65] text-white rounded-lg hover:bg-[#004952] transition-colors font-medium"
        >
          I have read and understood this section
        </motion.button>
      )}

      {isAcknowledged && (
        <div className="mt-8 flex items-center text-green-600">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Section acknowledged</span>
        </div>
      )}
    </motion.div>
  );
}