'use client';

import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export default function DailyScheduleSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Daily Schedule & Expectations</h2>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="mb-6">
          A structured daily routine is essential for recovery. This schedule provides the framework 
          for productive days while allowing flexibility for individual treatment and recovery activities.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Weekday Schedule (Monday - Friday)</h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">6:00 AM - 7:00 AM</p>
                <p className="text-gray-600">Wake up, personal hygiene, room maintenance</p>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">7:00 AM - 8:00 AM</p>
                <p className="text-gray-600">Breakfast and medication administration</p>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">8:00 AM - 8:30 AM</p>
                <p className="text-gray-600">Morning meeting / Daily reflection</p>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">8:30 AM - 12:00 PM</p>
                <p className="text-gray-600">Treatment activities, appointments, or work</p>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">12:00 PM - 1:00 PM</p>
                <p className="text-gray-600">Lunch</p>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">1:00 PM - 5:00 PM</p>
                <p className="text-gray-600">Continued treatment, work, or recovery activities</p>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">5:00 PM - 6:00 PM</p>
                <p className="text-gray-600">Dinner</p>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">6:00 PM - 7:00 PM</p>
                <p className="text-gray-600">Chores and house maintenance</p>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">7:00 PM - 9:00 PM</p>
                <p className="text-gray-600">Evening meetings (AA/NA) or group activities</p>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">9:00 PM - 10:00 PM</p>
                <p className="text-gray-600">Free time, prepare for bed</p>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">10:00 PM</p>
                <p className="text-gray-600">Curfew - must be in the house</p>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">11:00 PM</p>
                <p className="text-gray-600">Lights out</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Weekend Schedule</h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <p className="mb-4 text-gray-700">Weekends have a more relaxed schedule but maintain structure:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Wake up by 8:00 AM</li>
            <li>Breakfast by 9:00 AM</li>
            <li>Weekly deep cleaning on Saturday mornings</li>
            <li>Required attendance at one recovery meeting per day</li>
            <li>Curfew: 11:00 PM Friday and Saturday</li>
            <li>Sunday house meeting at 6:00 PM (mandatory)</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Daily Expectations</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Make your bed every morning</li>
          <li>Maintain personal hygiene</li>
          <li>Attend all scheduled meetings and appointments</li>
          <li>Complete assigned chores</li>
          <li>Take medications as prescribed</li>
          <li>Participate in at least one recovery activity daily</li>
          <li>Sign in/out when leaving the house</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Meeting Requirements</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">Minimum Requirements</h4>
          <ul className="list-disc pl-6 space-y-2 text-blue-800">
            <li>First 30 days: 7 meetings per week</li>
            <li>Days 31-90: 5 meetings per week</li>
            <li>After 90 days: 3 meetings per week</li>
            <li>Must obtain meeting signatures</li>
            <li>House meetings count toward weekly total</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Work and Education</h3>
        <p className="mb-4">
          We encourage residents to maintain employment or pursue education. Requirements include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Provide work/school schedule to staff</li>
          <li>Notify staff of any schedule changes</li>
          <li>Return home within 30 minutes of work/school ending</li>
          <li>Provide pay stubs or attendance records as requested</li>
          <li>Maintain recovery activities alongside work/school</li>
        </ul>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
          <h4 className="text-lg font-semibold text-green-900 mb-2">Success Tip</h4>
          <p className="text-green-800">
            Consistency is key! Following the daily schedule helps establish healthy routines 
            that support long-term recovery. If you&apos;re struggling with any aspect of the schedule, 
            talk to staff about adjustments that might help you succeed.
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