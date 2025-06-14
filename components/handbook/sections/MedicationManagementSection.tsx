'use client';

import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export default function MedicationManagementSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Medication Management</h2>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="mb-6">
          Proper medication management is crucial for recovery and overall health. All medications 
          must be properly documented, stored, and administered according to house policies to 
          ensure the safety of all residents.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Medication Policies</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-red-900 mb-2">Mandatory Requirements</h4>
          <ul className="list-disc pl-6 space-y-2 text-red-800">
            <li>ALL medications must be disclosed upon admission</li>
            <li>Prescription medications must be in original containers</li>
            <li>Name on prescription must match resident</li>
            <li>No sharing of medications under any circumstances</li>
            <li>Controlled substances require special handling</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Medication Storage</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>All medications stored in locked medication room</li>
          <li>Residents do not have direct access to medication storage</li>
          <li>Medications requiring refrigeration properly stored</li>
          <li>Weekly medication counts conducted by staff</li>
          <li>Personal lock boxes available for non-controlled medications (Phase 2+)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Medication Administration</h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Daily Med Times</h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Morning meds:</strong> 7:00 AM - 7:30 AM</li>
            <li><strong>Noon meds:</strong> 12:00 PM - 12:30 PM</li>
            <li><strong>Evening meds:</strong> 5:00 PM - 5:30 PM</li>
            <li><strong>Bedtime meds:</strong> 9:00 PM - 9:30 PM</li>
            <li><strong>PRN medications:</strong> As needed with staff approval</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Medication-Assisted Treatment (MAT)</h3>
        <p className="mb-4">
          We support medication-assisted treatment for substance use disorders. MAT medications include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Suboxone/Subutex:</strong> Must follow prescriber's instructions</li>
          <li><strong>Methadone:</strong> Daily clinic attendance required</li>
          <li><strong>Vivitrol:</strong> Monthly injection appointments</li>
          <li><strong>Naltrexone:</strong> Daily administration monitored</li>
          <li>All MAT medications count toward recovery, not against it</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Over-the-Counter Medications</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Must be approved by staff before use</li>
          <li>Kept in original packaging with your name</li>
          <li>No medications containing alcohol or pseudoephedrine</li>
          <li>Basic OTC medications available from staff</li>
          <li>Document all OTC medication use</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Prescription Changes</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">Notify Staff Immediately</h4>
          <ul className="list-disc pl-6 space-y-2 text-blue-800">
            <li>Any new prescriptions</li>
            <li>Changes in dosage</li>
            <li>Discontinued medications</li>
            <li>Side effects or concerns</li>
            <li>Missed doses</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Refill Procedures</h3>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Notify staff when you have 7 days of medication remaining</li>
          <li>Provide prescription information to staff</li>
          <li>Staff will coordinate with pharmacy</li>
          <li>You may need to pick up medications with staff</li>
          <li>All new medications checked in immediately</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Prohibited Substances</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <p className="text-red-800 mb-2">The following are strictly prohibited:</p>
          <ul className="list-disc pl-6 space-y-2 text-red-800">
            <li>Any medication not prescribed to you</li>
            <li>Expired medications</li>
            <li>Medications containing alcohol</li>
            <li>CBD products (unless prescribed)</li>
            <li>Kratom or similar substances</li>
            <li>Energy drinks with high stimulant content</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Medical Appointments</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Inform staff of all medical appointments</li>
          <li>Bring back documentation from appointments</li>
          <li>Report any new prescriptions immediately</li>
          <li>Transportation assistance may be available</li>
          <li>Follow up appointments are your responsibility</li>
        </ul>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <h4 className="text-lg font-semibold text-yellow-900 mb-2">Remember</h4>
          <p className="text-yellow-800">
            Never stop taking prescribed medications without consulting your doctor. If you're 
            having issues with your medications, speak with staff immediately. We're here to 
            help you manage your health safely during recovery.
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