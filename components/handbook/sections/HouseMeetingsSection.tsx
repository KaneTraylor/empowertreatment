'use client';

import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export default function HouseMeetingsSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">House Meetings & Recovery Programming</h2>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="mb-6">
          Participation in house meetings and recovery programming is mandatory for all residents. 
          These activities are essential components of your recovery journey and help build a 
          supportive community within the house.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Weekly House Meetings</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">Sunday Community Meeting</h4>
          <ul className="list-disc pl-6 space-y-2 text-blue-800">
            <li><strong>Time:</strong> Every Sunday at 6:00 PM</li>
            <li><strong>Duration:</strong> 60-90 minutes</li>
            <li><strong>Attendance:</strong> Mandatory for all residents</li>
            <li><strong>Purpose:</strong> Review house issues, celebrate successes, address concerns</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Meeting Format</h3>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Opening and serenity prayer</li>
          <li>Review of previous week&apos;s goals</li>
          <li>House business and announcements</li>
          <li>Resident check-ins and shares</li>
          <li>Address any house concerns or conflicts</li>
          <li>Set goals for the upcoming week</li>
          <li>Closing and unity prayer</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Recovery Programming</h3>
        <p className="mb-4">In addition to house meetings, residents must participate in:</p>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">12-Step Meetings (AA/NA)</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Required attendance based on phase of recovery</li>
              <li>Get meeting slips signed by chairperson</li>
              <li>Find a sponsor within first 30 days</li>
              <li>Work the steps with your sponsor</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Group Therapy Sessions</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Wednesday evenings: Process group (7:00 PM)</li>
              <li>Friday afternoons: Life skills group (3:00 PM)</li>
              <li>Participation is mandatory unless excused</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Educational Workshops</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Monthly workshops on recovery topics</li>
              <li>Guest speakers and specialists</li>
              <li>Topics include: relapse prevention, coping skills, trauma, nutrition</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Meeting Expectations</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Arrive on time and stay for the entire meeting</li>
          <li>Turn off cell phones or put on silent</li>
          <li>Actively participate and share when comfortable</li>
          <li>Respect confidentiality - what&apos;s shared stays here</li>
          <li>No side conversations during meetings</li>
          <li>Dress appropriately</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Accountability Partners</h3>
        <p className="mb-4">
          Each resident will be assigned an accountability partner to:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Check in with daily</li>
          <li>Attend meetings together when possible</li>
          <li>Provide peer support and encouragement</li>
          <li>Alert staff if partner needs help</li>
          <li>Celebrate recovery milestones together</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Recovery Milestones</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-green-900 mb-2">We Celebrate Your Progress!</h4>
          <p className="text-green-800 mb-4">Recovery milestones are recognized during house meetings:</p>
          <ul className="list-disc pl-6 space-y-1 text-green-800">
            <li>30 days clean</li>
            <li>60 days clean</li>
            <li>90 days clean</li>
            <li>6 months clean</li>
            <li>1 year clean</li>
            <li>Completion of step work</li>
            <li>Employment achievements</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Excused Absences</h3>
        <p className="mb-4">
          You may be excused from meetings only for:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Work schedule conflicts (with documentation)</li>
          <li>Medical appointments (with documentation)</li>
          <li>Court appearances</li>
          <li>Family emergencies (approved by staff)</li>
          <li>Illness (verified by staff)</li>
        </ul>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <h4 className="text-lg font-semibold text-yellow-900 mb-2">Important Note</h4>
          <p className="text-yellow-800">
            Missing meetings without an approved excuse may result in consequences including 
            loss of privileges, additional assignments, or potential discharge. If you cannot 
            attend a meeting, notify staff as soon as possible.
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