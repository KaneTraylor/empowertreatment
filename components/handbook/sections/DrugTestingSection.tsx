'use client';

import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export default function DrugTestingSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Drug Testing Policy</h2>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="mb-6">
          Drug testing is an essential component of our recovery program. It provides accountability, 
          helps identify relapses early, and ensures the safety of our community. All residents 
          agree to comply with drug testing requirements as a condition of residency.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Testing Frequency</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">When You Will Be Tested:</h4>
          <ul className="list-disc pl-6 space-y-2 text-blue-800">
            <li>Upon admission (baseline test)</li>
            <li>Random testing (minimum 2x per month)</li>
            <li>For cause (suspicious behavior)</li>
            <li>After overnight passes</li>
            <li>Following home visits</li>
            <li>Return from hospitalization</li>
            <li>As directed by treatment team</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Testing Procedures</h3>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Staff will notify you when selected for testing</li>
          <li>You have 30 minutes to provide sample</li>
          <li>Testing conducted in designated bathroom</li>
          <li>Direct observation may be required</li>
          <li>Temperature strips verify sample validity</li>
          <li>Chain of custody form completed</li>
          <li>Results typically available within 5 minutes</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Substances Tested</h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <p className="text-gray-700 mb-2">Standard 12-panel test includes:</p>
          <div className="grid grid-cols-2 gap-2">
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Marijuana (THC)</li>
              <li>Cocaine</li>
              <li>Opiates</li>
              <li>Methamphetamine</li>
              <li>Amphetamines</li>
              <li>Benzodiazepines</li>
            </ul>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Barbiturates</li>
              <li>Methadone</li>
              <li>Propoxyphene</li>
              <li>Buprenorphine</li>
              <li>Oxycodone</li>
              <li>MDMA/Ecstasy</li>
            </ul>
          </div>
          <p className="text-gray-700 mt-3">Additional testing for alcohol, K2/Spice, Kratom as needed</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Valid Prescriptions</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Provide all prescription information at admission</li>
          <li>Update staff on any new prescriptions immediately</li>
          <li>Prescribed medications may show positive</li>
          <li>Levels tested must match prescribed use</li>
          <li>Taking more than prescribed = positive test</li>
          <li>Sharing prescriptions = immediate discharge</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Refusal to Test</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-red-900 mb-2">Refusal Equals Positive</h4>
          <p className="text-red-800 mb-2">The following are considered refusals:</p>
          <ul className="list-disc pl-6 space-y-2 text-red-800">
            <li>Declining to provide sample</li>
            <li>Unable to provide sample within 30 minutes</li>
            <li>Leaving property before testing</li>
            <li>Tampering with sample</li>
            <li>Substituting or diluting sample</li>
            <li>Refusing direct observation when required</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Positive Test Results</h3>
        <p className="mb-4">
          If you test positive:
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Immediate meeting with staff</li>
          <li>Honest disclosure expected</li>
          <li>Safety assessment conducted</li>
          <li>Treatment team notified</li>
          <li>Discharge process may begin</li>
          <li>Referral to appropriate level of care</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Diluted Samples</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-yellow-900 mb-2">Avoiding Dilution</h4>
          <ul className="list-disc pl-6 space-y-2 text-yellow-800">
            <li>First diluted sample = warning and retest</li>
            <li>Second diluted sample = considered positive</li>
            <li>No excessive fluids 2 hours before testing</li>
            <li>Normal hydration is fine</li>
            <li>Creatinine levels checked</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Breathalyzer Testing</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Random breath tests for alcohol</li>
          <li>Required after passes/outings</li>
          <li>Zero tolerance - 0.00 BAC required</li>
          <li>Mouthwash/cologne not valid excuses</li>
          <li>Wait 15 minutes after eating/drinking</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Confirmation Testing</h3>
        <p className="mb-4">
          You may request confirmation testing:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Must request within 1 hour of initial result</li>
          <li>Sample sent to certified lab</li>
          <li>You pay for confirmation test ($75-150)</li>
          <li>Refunded if initial result overturned</li>
          <li>Must remain in program pending results</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Support for Positive Tests</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-green-900 mb-2">We Want You to Succeed</h4>
          <p className="text-green-800 mb-2">If you&apos;re struggling with cravings or relapse:</p>
          <ul className="list-disc pl-6 space-y-2 text-green-800">
            <li>Talk to staff BEFORE using</li>
            <li>Increase meeting attendance</li>
            <li>Utilize your sponsor</li>
            <li>Request additional counseling</li>
            <li>Consider medication adjustments</li>
            <li>Honesty may allow you to stay</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">Remember</h4>
          <p className="text-blue-800">
            Drug testing protects everyone in the house and supports your recovery. Each clean 
            test is a victory worth celebrating. If you&apos;re tempted to use, reach out for help 
            immediately - that&apos;s what recovery is all about.
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