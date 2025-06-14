'use client';

import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export default function ConsequencesSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Consequences & Disciplinary Actions</h2>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="mb-6">
          Our goal is to help you succeed in recovery. When rules are violated, consequences 
          are designed to be therapeutic and help you learn from mistakes. We use a progressive 
          discipline approach whenever possible.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Levels of Violations</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-900 mb-2">Level 1: Minor Violations</h4>
            <p className="text-yellow-800 mb-2">Examples:</p>
            <ul className="list-disc pl-6 space-y-1 text-yellow-800">
              <li>Late for curfew (under 30 minutes)</li>
              <li>Missed chores</li>
              <li>Minor disrespect to peers</li>
              <li>First-time meeting absence</li>
              <li>Messy room</li>
            </ul>
            <p className="text-yellow-800 mt-3"><strong>Consequences:</strong> Verbal warning, extra chores, written assignment</p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-orange-900 mb-2">Level 2: Moderate Violations</h4>
            <p className="text-orange-800 mb-2">Examples:</p>
            <ul className="list-disc pl-6 space-y-1 text-orange-800">
              <li>Repeated minor violations</li>
              <li>Missing multiple meetings</li>
              <li>Disrespect to staff</li>
              <li>Borrowing without permission</li>
              <li>Late curfew (over 30 minutes)</li>
            </ul>
            <p className="text-orange-800 mt-3"><strong>Consequences:</strong> Written warning, loss of privileges, behavior contract</p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-red-900 mb-2">Level 3: Major Violations</h4>
            <p className="text-red-800 mb-2">Examples:</p>
            <ul className="list-disc pl-6 space-y-1 text-red-800">
              <li>Violence or threats</li>
              <li>Theft</li>
              <li>Sexual contact with residents</li>
              <li>Bringing non-residents without permission</li>
              <li>Repeated moderate violations</li>
            </ul>
            <p className="text-red-800 mt-3"><strong>Consequences:</strong> Suspension, probation, possible discharge</p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-2">Zero Tolerance Violations</h4>
            <p className="text-gray-300 mb-2">Immediate discharge:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-300">
              <li>Drug or alcohol use/possession</li>
              <li>Dealing drugs</li>
              <li>Weapons possession</li>
              <li>Serious violence</li>
              <li>Refusing drug test</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Progressive Discipline Process</h3>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Verbal Warning:</strong> Discussion with staff, documented in file</li>
          <li><strong>Written Warning:</strong> Formal documentation, action plan created</li>
          <li><strong>Behavior Contract:</strong> Specific goals and timelines established</li>
          <li><strong>Probation:</strong> Intensive monitoring, daily check-ins</li>
          <li><strong>Discharge:</strong> Removal from program with transition planning</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Loss of Privileges</h3>
        <p className="mb-4">Privileges that may be suspended include:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Weekend passes</li>
          <li>Extended curfew</li>
          <li>Visitor privileges</li>
          <li>Phone/internet use</li>
          <li>Community outings</li>
          <li>Television/recreation time</li>
          <li>Private room (if applicable)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Therapeutic Assignments</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">Learning Opportunities</h4>
          <p className="text-blue-800 mb-2">Assignments may include:</p>
          <ul className="list-disc pl-6 space-y-2 text-blue-800">
            <li>Written essays on rule importance</li>
            <li>Research projects on recovery topics</li>
            <li>Apology letters</li>
            <li>Extra meeting attendance</li>
            <li>Community service</li>
            <li>Facilitated conflict resolution</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Appeal Process</h3>
        <p className="mb-4">
          You have the right to appeal disciplinary actions:
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Submit written appeal within 24 hours</li>
          <li>State your case clearly and honestly</li>
          <li>Provide any supporting evidence</li>
          <li>Meeting scheduled within 48 hours</li>
          <li>Decision provided in writing</li>
          <li>Director&apos;s decision is final</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Behavior Contracts</h3>
        <p className="mb-4">
          Behavior contracts include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Specific behaviors to change</li>
          <li>Clear expectations and goals</li>
          <li>Timeline for improvement</li>
          <li>Support resources available</li>
          <li>Consequences for non-compliance</li>
          <li>Regular review meetings</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Discharge Process</h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">If Discharge Becomes Necessary:</h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>24-hour notice given when possible</li>
            <li>Assistance with alternative housing</li>
            <li>Referrals to other programs</li>
            <li>Medication and belongings returned</li>
            <li>Transportation to safe location</li>
            <li>Follow-up contact offered</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Positive Behavior Support</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-green-900 mb-2">We Recognize Success!</h4>
          <p className="text-green-800 mb-2">Positive behaviors earn:</p>
          <ul className="list-disc pl-6 space-y-2 text-green-800">
            <li>Extended privileges</li>
            <li>Leadership roles</li>
            <li>Recognition in meetings</li>
            <li>Certificates of achievement</li>
            <li>Recommendation letters</li>
            <li>Phase advancement</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <h4 className="text-lg font-semibold text-yellow-900 mb-2">Remember</h4>
          <p className="text-yellow-800">
            Mistakes are opportunities for growth. If you receive a consequence, use it as a 
            chance to strengthen your recovery. Staff are here to support you, not punish you. 
            Be honest about struggles before they become violations.
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