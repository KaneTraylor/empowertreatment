'use client';

import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export default function ResourcesSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Resources & Contact Information</h2>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="mb-6">
          Recovery is a journey that requires support from many sources. This section provides 
          important contact information and resources to support your recovery both during your 
          stay and after discharge.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">House Contacts</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">Empower Treatment Staff</h4>
          <ul className="space-y-2 text-blue-800">
            <li><strong>Main Office:</strong> (740) 200-0277</li>
            <li><strong>Emergency After Hours:</strong> (740) 200-0277</li>
            <li><strong>Fax:</strong> (740) 200-0278</li>
            <li><strong>Email:</strong> info@empowertreatment.net</li>
            <li><strong>Address:</strong> [House Address]</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Crisis Resources</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-red-900 mb-2">24/7 Crisis Lines</h4>
          <ul className="space-y-2 text-red-800">
            <li><strong>National Suicide & Crisis Lifeline:</strong> 988</li>
            <li><strong>SAMHSA National Helpline:</strong> 1-800-662-4357</li>
            <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
            <li><strong>LGBTQ National Hotline:</strong> 1-888-843-4564</li>
            <li><strong>Veterans Crisis Line:</strong> 1-800-273-8255</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Recovery Support</h3>
        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">12-Step Programs</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>AA Hotline:</strong> (740) 555-0123</li>
              <li><strong>NA Helpline:</strong> (740) 555-0456</li>
              <li><strong>Meeting Schedules:</strong> www.aa.org, www.na.org</li>
              <li><strong>Online Meetings:</strong> Available 24/7</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">Alternative Recovery Programs</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>SMART Recovery:</strong> www.smartrecovery.org</li>
              <li><strong>Celebrate Recovery:</strong> www.celebraterecovery.com</li>
              <li><strong>Refuge Recovery:</strong> www.refugerecovery.org</li>
              <li><strong>Recovery Dharma:</strong> www.recoverydharma.org</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Healthcare Resources</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-green-900 mb-2">Medical Services</h4>
          <ul className="space-y-2 text-green-800">
            <li><strong>Nearest Hospital:</strong> [Hospital Name] - (740) 555-0911</li>
            <li><strong>Urgent Care:</strong> [Clinic Name] - (740) 555-0789</li>
            <li><strong>Pharmacy:</strong> [Pharmacy Name] - (740) 555-0234</li>
            <li><strong>Dental Clinic:</strong> [Dental Name] - (740) 555-0567</li>
            <li><strong>Vision Care:</strong> [Vision Name] - (740) 555-0890</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Mental Health Services</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Community Mental Health:</strong> (740) 555-1234</li>
          <li><strong>Private Therapists:</strong> List available at front desk</li>
          <li><strong>Psychiatry Services:</strong> By referral</li>
          <li><strong>Trauma Specialists:</strong> Ask case manager</li>
          <li><strong>Group Therapy Options:</strong> Schedule posted weekly</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Community Resources</h3>
        <div className="space-y-4 mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-900 mb-2">Basic Needs</h4>
            <ul className="list-disc pl-6 space-y-2 text-yellow-800">
              <li><strong>Food Bank:</strong> Tuesdays & Thursdays, 9 AM - 2 PM</li>
              <li><strong>Clothing Bank:</strong> (740) 555-2345</li>
              <li><strong>Housing Assistance:</strong> (740) 555-3456</li>
              <li><strong>Utility Assistance:</strong> (740) 555-4567</li>
              <li><strong>Transportation:</strong> Bus passes available</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-900 mb-2">Employment Services</h4>
            <ul className="list-disc pl-6 space-y-2 text-yellow-800">
              <li><strong>Job Center:</strong> (740) 555-5678</li>
              <li><strong>Vocational Rehabilitation:</strong> (740) 555-6789</li>
              <li><strong>Resume Assistance:</strong> Wednesdays, 2 PM</li>
              <li><strong>Job Training Programs:</strong> Ask case manager</li>
              <li><strong>Work Clothing:</strong> Dress for Success program</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Legal Resources</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Legal Aid:</strong> (740) 555-7890</li>
          <li><strong>Public Defender:</strong> (740) 555-8901</li>
          <li><strong>Court Information:</strong> (740) 555-9012</li>
          <li><strong>Expungement Clinic:</strong> First Friday monthly</li>
          <li><strong>Child Support:</strong> (740) 555-0123</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Educational Resources</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">Continuing Education</h4>
          <ul className="list-disc pl-6 space-y-2 text-blue-800">
            <li><strong>GED Classes:</strong> Free at library</li>
            <li><strong>Community College:</strong> (740) 555-1111</li>
            <li><strong>Trade Schools:</strong> Financial aid available</li>
            <li><strong>Online Learning:</strong> Computer lab access</li>
            <li><strong>Literacy Program:</strong> (740) 555-2222</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Recovery Literature</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>AA Big Book - Available in library</li>
          <li>NA Basic Text - Available in library</li>
          <li>Daily meditation books</li>
          <li>Recovery workbooks</li>
          <li>Lending library in common area</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Online Recovery Resources</h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Helpful Websites</h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>In The Rooms:</strong> www.intherooms.com</li>
            <li><strong>Recovery.org:</strong> Information and support</li>
            <li><strong>Sober Grid:</strong> Recovery app</li>
            <li><strong>Meeting Guide:</strong> Find local meetings</li>
            <li><strong>YouTube:</strong> Recovery speakers and meditation</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Important Reminders</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <ul className="list-disc pl-6 space-y-2 text-green-800">
            <li>Keep this resource list for after discharge</li>
            <li>Update your support network contacts regularly</li>
            <li>Don&apos;t hesitate to ask for help</li>
            <li>Recovery is possible - you&apos;re proof!</li>
            <li>Give back when you&apos;re able</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">Final Thoughts</h4>
          <p className="text-blue-800">
            This handbook represents our commitment to your success. Recovery is a journey, not a 
            destination. Use these resources, follow the guidelines, and never forget that you&apos;re 
            part of a community that cares about your wellbeing. We believe in you!
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