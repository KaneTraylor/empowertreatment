'use client';

import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export default function VisitationSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Visitation & Guest Policies</h2>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="mb-6">
          Maintaining healthy relationships is important for recovery. Our visitation policies 
          balance the need for family and friend connections with maintaining a safe, 
          recovery-focused environment for all residents.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Visitation Phases</h3>
        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">Phase 1 (Days 1-30)</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>No visitors except case managers and treatment providers</li>
              <li>Focus on settling in and establishing recovery routine</li>
              <li>Phone calls permitted during designated hours</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">Phase 2 (Days 31-60)</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Immediate family only</li>
              <li>Saturdays and Sundays: 1:00 PM - 4:00 PM</li>
              <li>Maximum 2 visitors at a time</li>
              <li>Common areas only</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">Phase 3 (Days 61+)</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Family and approved friends</li>
              <li>Saturdays and Sundays: 12:00 PM - 5:00 PM</li>
              <li>Wednesday evenings: 6:00 PM - 8:00 PM</li>
              <li>Maximum 3 visitors at a time</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Visitor Approval Process</h3>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Submit visitor request form 48 hours in advance</li>
          <li>Provide visitor's full name and relationship</li>
          <li>Visitors must be 18+ or accompanied by approved adult</li>
          <li>Staff will conduct background screening</li>
          <li>Approval/denial communicated within 24 hours</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Visitor Rules</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">All Visitors Must:</h4>
          <ul className="list-disc pl-6 space-y-2 text-blue-800">
            <li>Sign in at the front desk with valid ID</li>
            <li>Submit to bag/pocket search</li>
            <li>Remain in designated visiting areas</li>
            <li>Follow all house rules during visit</li>
            <li>Leave by designated end time</li>
            <li>Park in designated visitor parking only</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Prohibited During Visits</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <ul className="list-disc pl-6 space-y-2 text-red-800">
            <li>No physical contact beyond brief hugs</li>
            <li>No exchange of money or gifts without approval</li>
            <li>No food or drinks brought in without permission</li>
            <li>No photographs without staff approval</li>
            <li>No visitors in resident rooms</li>
            <li>No leaving property with visitors</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Children Visitors</h3>
        <p className="mb-4">
          Special considerations for visits with children:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Must be supervised by approved adult at all times</li>
          <li>Limited to 2-hour visits</li>
          <li>Must remain in designated family visiting area</li>
          <li>Resident responsible for child's behavior</li>
          <li>Quiet activities only (bring books, coloring, quiet games)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Virtual Visits</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-green-900 mb-2">Video Calls Available</h4>
          <ul className="list-disc pl-6 space-y-2 text-green-800">
            <li>Daily video calls permitted: 6:00 PM - 8:00 PM</li>
            <li>Must use house computer in designated area</li>
            <li>30-minute time slots (sign up required)</li>
            <li>Great option for long-distance family</li>
            <li>Counts as positive family engagement</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Overnight Passes</h3>
        <p className="mb-4">
          After 90 days, residents may request overnight passes for family visits:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Submit request through weekend pass system</li>
          <li>Must have sponsor approval</li>
          <li>Clean drug tests for past 30 days required</li>
          <li>Limited to one weekend per month initially</li>
          <li>Must provide address and contact information</li>
          <li>Subject to drug test upon return</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Restricted Visitors</h3>
        <p className="mb-4">
          The following individuals may not visit:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Anyone under the influence of drugs or alcohol</li>
          <li>Former residents discharged for rule violations</li>
          <li>Individuals with active warrants</li>
          <li>Anyone who provides drugs/alcohol to residents</li>
          <li>Individuals displaying aggressive or inappropriate behavior</li>
          <li>Active drug dealers or users</li>
        </ul>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <h4 className="text-lg font-semibold text-yellow-900 mb-2">Family Support</h4>
          <p className="text-yellow-800">
            We encourage healthy family involvement in recovery. Family therapy sessions and 
            educational programs are available. Ask staff about family programming opportunities 
            to strengthen your support system.
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