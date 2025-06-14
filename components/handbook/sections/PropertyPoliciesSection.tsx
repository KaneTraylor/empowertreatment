'use client';

import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export default function PropertyPoliciesSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Property & Personal Belongings</h2>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="mb-6">
          Respecting property - both the house&apos;s and other residents&apos; - is essential for 
          maintaining a harmonious living environment. These policies ensure everyone&apos;s 
          belongings are secure and the facility remains in good condition.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Personal Property Guidelines</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Label all personal items with your name</li>
          <li>Keep valuables locked in your assigned storage</li>
          <li>Limit belongings to what fits in your designated space</li>
          <li>No storage in common areas</li>
          <li>Report missing items to staff immediately</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Room Assignments</h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Your Living Space Includes:</h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Assigned bed and mattress</li>
            <li>Dresser or closet space</li>
            <li>Nightstand or shelf</li>
            <li>Under-bed storage container</li>
            <li>Shared bathroom facilities</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Prohibited Items</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-red-900 mb-2">Not Allowed on Property:</h4>
          <ul className="list-disc pl-6 space-y-2 text-red-800">
            <li>Weapons of any kind</li>
            <li>Candles, incense, or open flames</li>
            <li>Hot plates, space heaters, or cooking appliances</li>
            <li>Alcohol-containing products (mouthwash, cologne, etc.)</li>
            <li>Pornographic materials</li>
            <li>Drug paraphernalia</li>
            <li>Pets (except approved service animals)</li>
            <li>Excessive cash (over $100)</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Room Inspections</h3>
        <p className="mb-4">
          To maintain safety and compliance, room inspections are conducted:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Weekly scheduled inspections</li>
          <li>Random unannounced searches may occur</li>
          <li>Residents do not need to be present</li>
          <li>Contraband will be confiscated and documented</li>
          <li>Illegal items reported to authorities</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Property Damage</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-yellow-900 mb-2">Your Responsibility</h4>
          <ul className="list-disc pl-6 space-y-2 text-yellow-800">
            <li>You are financially responsible for any damage you cause</li>
            <li>Report damages immediately - accidents happen</li>
            <li>Intentional damage may result in immediate discharge</li>
            <li>Normal wear and tear is not charged</li>
            <li>Damage costs deducted from deposit or billed</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Electronic Devices</h3>
        <p className="mb-4">
          Personal electronics are permitted with restrictions:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Cell phones allowed (see communication policy)</li>
          <li>Laptops/tablets permitted for work/education</li>
          <li>No Wi-Fi routers or hotspots</li>
          <li>Headphones required for all audio</li>
          <li>No recording devices in common areas</li>
          <li>Gaming systems in Phase 3 only</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Laundry & Linens</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">Laundry Schedule</h4>
          <ul className="list-disc pl-6 space-y-2 text-blue-800">
            <li>Assigned laundry days based on room</li>
            <li>Two loads per week included</li>
            <li>Provide your own detergent</li>
            <li>Remove laundry promptly</li>
            <li>Clean lint traps after each use</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Common Area Usage</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Clean up immediately after use</li>
          <li>No personal items left in common areas</li>
          <li>TV/entertainment on first-come basis</li>
          <li>Quiet hours: 10 PM - 7 AM</li>
          <li>No reserving spaces with belongings</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Kitchen & Food Storage</h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Food Storage Rules:</h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Label all food with name and date</li>
            <li>Use only your designated shelf/drawer</li>
            <li>No expired food - weekly cleanouts</li>
            <li>Clean dishes immediately after use</li>
            <li>No cooking after 9:00 PM</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Lost & Stolen Property</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>The house is not responsible for lost/stolen items</li>
          <li>Report thefts to staff immediately</li>
          <li>File police reports for significant thefts</li>
          <li>Consider renter&apos;s insurance for valuables</li>
          <li>Use provided locks and storage</li>
        </ul>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
          <h4 className="text-lg font-semibold text-green-900 mb-2">Tip for Success</h4>
          <p className="text-green-800">
            Keep your living space organized and respect others&apos; property. A clean, orderly 
            environment supports clear thinking and positive recovery. If you need additional 
            storage solutions or have concerns about property security, talk to staff.
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