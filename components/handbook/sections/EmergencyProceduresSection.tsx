'use client';

import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export default function EmergencyProceduresSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Emergency Procedures</h2>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="mb-6">
          Your safety and the safety of all residents is our top priority. Familiarize yourself 
          with these emergency procedures and know how to respond quickly and appropriately in 
          any emergency situation.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Emergency Contact Numbers</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-red-900 mb-2">Important Numbers</h4>
          <ul className="space-y-2 text-red-800">
            <li><strong>Emergency (Police/Fire/Medical):</strong> 911</li>
            <li><strong>House Emergency Line:</strong> (740) 200-0277</li>
            <li><strong>Poison Control:</strong> 1-800-222-1222</li>
            <li><strong>Crisis Hotline:</strong> 988</li>
            <li><strong>House Manager Cell:</strong> Posted in common area</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Medical Emergencies</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">Signs Requiring 911:</h4>
          <ul className="list-disc pl-6 space-y-2 text-blue-800">
            <li>Unconsciousness or unresponsiveness</li>
            <li>Difficulty breathing or choking</li>
            <li>Chest pain or pressure</li>
            <li>Severe bleeding</li>
            <li>Seizures</li>
            <li>Overdose symptoms</li>
            <li>Severe allergic reactions</li>
            <li>Stroke symptoms (F.A.S.T.)</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Overdose Response</h3>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Call 911 immediately</strong></li>
          <li>Alert staff if available</li>
          <li>Administer Narcan if trained (located in med room)</li>
          <li>Begin rescue breathing if needed</li>
          <li>Place person in recovery position</li>
          <li>Stay with person until help arrives</li>
          <li>Provide information to responders</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Fire Emergency</h3>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-orange-900 mb-2">R.A.C.E. Protocol</h4>
          <ul className="list-none space-y-2 text-orange-800">
            <li><strong>R</strong> - Rescue anyone in immediate danger</li>
            <li><strong>A</strong> - Activate fire alarm and call 911</li>
            <li><strong>C</strong> - Contain fire by closing doors</li>
            <li><strong>E</strong> - Evacuate using nearest exit</li>
          </ul>
          <p className="text-orange-800 mt-3"><strong>Meeting Point:</strong> Front parking lot by the flag pole</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Evacuation Procedures</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Know location of all exits</li>
          <li>Exit maps posted throughout building</li>
          <li>Do not use elevators during fire</li>
          <li>Assist those needing help</li>
          <li>Close doors behind you</li>
          <li>Meet at designated assembly point</li>
          <li>Do not re-enter until cleared</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Severe Weather</h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Tornado Warning:</h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Move to designated shelter area (basement)</li>
            <li>Stay away from windows</li>
            <li>Get under sturdy table/desk if possible</li>
            <li>Cover head and neck</li>
            <li>Remain until all-clear given</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Mental Health Crisis</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Contact staff immediately</li>
          <li>Call 988 for crisis support</li>
          <li>Stay with person if safe to do so</li>
          <li>Listen without judgment</li>
          <li>Remove any means of self-harm</li>
          <li>Professional help available 24/7</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Security Threats</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-yellow-900 mb-2">If You Feel Unsafe:</h4>
          <ul className="list-disc pl-6 space-y-2 text-yellow-800">
            <li>Trust your instincts</li>
            <li>Alert staff immediately</li>
            <li>Lock doors if necessary</li>
            <li>Call 911 for immediate threats</li>
            <li>Document incidents</li>
            <li>Cooperate with investigations</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Facility Safety Features</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Smoke detectors in all rooms</li>
          <li>Fire extinguishers on each floor</li>
          <li>Emergency lighting system</li>
          <li>First aid kits in common areas</li>
          <li>AED device in main office</li>
          <li>Security cameras in common areas</li>
          <li>Emergency supply kit maintained</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Your Responsibilities</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Know evacuation routes</li>
          <li>Participate in fire drills</li>
          <li>Report safety hazards</li>
          <li>Keep exits clear</li>
          <li>Learn location of safety equipment</li>
          <li>Update emergency contacts</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">After an Emergency</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-green-900 mb-2">Recovery Support</h4>
          <ul className="list-disc pl-6 space-y-2 text-green-800">
            <li>Debriefing sessions available</li>
            <li>Additional counseling provided</li>
            <li>Contact your sponsor</li>
            <li>Attend extra meetings</li>
            <li>Process emotions safely</li>
            <li>Maintain routine when possible</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">Remember</h4>
          <p className="text-blue-800">
            In any emergency, your safety comes first. Don't hesitate to call 911 or alert staff 
            if you're unsure. It's better to err on the side of caution. Regular drills help 
            ensure everyone knows what to do - take them seriously.
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