'use client';

import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export default function DischargeSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Discharge Planning & Transition</h2>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="mb-6">
          Planning for life after recovery housing begins from day one. Whether you&apos;re graduating 
          successfully or leaving for other reasons, we want to ensure you have the support and 
          resources needed for continued recovery.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Types of Discharge</h3>
        <div className="space-y-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-900 mb-2">Successful Completion</h4>
            <ul className="list-disc pl-6 space-y-2 text-green-800">
              <li>Completed all program phases</li>
              <li>Met treatment goals</li>
              <li>Stable in recovery</li>
              <li>Housing and support secured</li>
              <li>Eligible for alumni programs</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Planned Transition</h4>
            <ul className="list-disc pl-6 space-y-2 text-blue-800">
              <li>Moving to different level of care</li>
              <li>Relocating for work/family</li>
              <li>Transitioning to independent living</li>
              <li>30-day notice preferred</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-900 mb-2">Administrative Discharge</h4>
            <ul className="list-disc pl-6 space-y-2 text-yellow-800">
              <li>Rule violations</li>
              <li>Non-payment</li>
              <li>Lack of participation</li>
              <li>Safety concerns</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Discharge Planning Timeline</h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-4">30 Days Before Discharge:</h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Meet with case manager</li>
            <li>Complete housing applications</li>
            <li>Update resume</li>
            <li>Arrange transportation</li>
          </ul>

          <h4 className="font-semibold text-gray-900 mb-4">14 Days Before:</h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Finalize housing arrangements</li>
            <li>Transfer prescriptions</li>
            <li>Schedule follow-up appointments</li>
            <li>Connect with community resources</li>
          </ul>

          <h4 className="font-semibold text-gray-900 mb-4">7 Days Before:</h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Pack belongings</li>
            <li>Complete exit paperwork</li>
            <li>Return house property</li>
            <li>Clean room thoroughly</li>
          </ul>

          <h4 className="font-semibold text-gray-900 mb-4">Day of Discharge:</h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Final room inspection</li>
            <li>Return keys and access cards</li>
            <li>Collect security deposit (if applicable)</li>
            <li>Receive discharge packet</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Aftercare Planning</h3>
        <p className="mb-4">Your aftercare plan should include:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Housing:</strong> Safe, stable, substance-free environment</li>
          <li><strong>Treatment:</strong> Continued therapy or counseling</li>
          <li><strong>Recovery Support:</strong> Meeting schedule, sponsor contact</li>
          <li><strong>Medical Care:</strong> Primary doctor, psychiatrist if needed</li>
          <li><strong>Employment:</strong> Job or vocational planning</li>
          <li><strong>Social Support:</strong> Sober network and activities</li>
          <li><strong>Crisis Plan:</strong> What to do if struggling</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Alumni Benefits</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-green-900 mb-2">For Successful Graduates:</h4>
          <ul className="list-disc pl-6 space-y-2 text-green-800">
            <li>Monthly alumni meetings</li>
            <li>Continued case management (6 months)</li>
            <li>Emergency support line access</li>
            <li>Mentorship opportunities</li>
            <li>Special events and celebrations</li>
            <li>Job referral network</li>
            <li>Letters of recommendation</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Housing Options</h3>
        <p className="mb-4">Common next steps include:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Oxford House or other sober living</li>
          <li>Apartment with sober roommates</li>
          <li>Return to family (if supportive)</li>
          <li>Transitional housing programs</li>
          <li>Independent apartment (if ready)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Financial Considerations</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">Before You Leave:</h4>
          <ul className="list-disc pl-6 space-y-2 text-blue-800">
            <li>Settle all financial obligations</li>
            <li>Request refund of deposits</li>
            <li>Update address for mail</li>
            <li>Cancel automatic payments</li>
            <li>Budget for new expenses</li>
            <li>Save for security deposits</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Emergency Discharge</h3>
        <p className="mb-4">
          If discharge happens quickly:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>We still provide basic support</li>
          <li>Help finding emergency shelter</li>
          <li>Medication supply ensured</li>
          <li>Crisis resources provided</li>
          <li>Transportation to safe location</li>
          <li>Follow-up call within 48 hours</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Relapse Prevention</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-yellow-900 mb-2">High-Risk Times:</h4>
          <ul className="list-disc pl-6 space-y-2 text-yellow-800">
            <li>First week after discharge</li>
            <li>Living alone for first time</li>
            <li>Returning to old environment</li>
            <li>Major life changes</li>
            <li>Reduced structure</li>
          </ul>
          <p className="text-yellow-800 mt-3">Plan extra support during these times!</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Staying Connected</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Update contact information</li>
          <li>Join alumni Facebook group</li>
          <li>Attend alumni events</li>
          <li>Volunteer to help others</li>
          <li>Share your success story</li>
          <li>Be a mentor to newcomers</li>
        </ul>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
          <h4 className="text-lg font-semibold text-green-900 mb-2">You&apos;re Always Part of Our Community</h4>
          <p className="text-green-800">
            Graduation doesn&apos;t mean goodbye. We celebrate your success and remain here as a 
            resource. Many successful alumni stay connected for years, giving back and 
            supporting others in their recovery journey. Your story can inspire others!
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