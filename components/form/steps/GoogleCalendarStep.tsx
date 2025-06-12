'use client';

import { useState } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion } from 'framer-motion';

export function GoogleCalendarStep({ data, updateData, onNext, onBack, isFirstStep }: StepProps) {
  const [hasScheduled, setHasScheduled] = useState(false);
  const [appointmentInput, setAppointmentInput] = useState('');
  const appointmentUrl = process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL || 
    'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1poUjTRWAGf1Md3gDKPh7_FI4xD8abtrN2_-b-kcKCx-W-yTYzOAsJ8VddgYydJQPbCEf6NPBz';

  const handleScheduleComplete = () => {
    if (hasScheduled && appointmentInput) {
      updateData({ 
        appointmentNotification: true,
        appointmentDateTime: appointmentInput 
      });
    } else {
      updateData({ appointmentNotification: true });
    }
    
    onNext();
  };

  // Prefill the appointment URL with user's name and email if available
  const getAppointmentUrl = () => {
    const params = new URLSearchParams();
    if (data.fname && data.lname) {
      params.append('name', `${data.fname} ${data.lname}`);
    }
    if (data.email) {
      params.append('email', data.email);
    }
    if (data.mobileNumber) {
      params.append('phone', data.mobileNumber);
    }
    
    const queryString = params.toString();
    return queryString ? `${appointmentUrl}?${queryString}` : appointmentUrl;
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Schedule Your Welcome Call
        </h1>
        <p className="text-gray-600">
          Select a time that works best for you. Our team will call you at your scheduled appointment time.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-gray-50 rounded-lg p-2 h-[700px] overflow-hidden"
      >
        <iframe
          src={getAppointmentUrl()}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="yes"
          title="Google Calendar Appointment Scheduling"
          className="rounded-lg"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-blue-50 p-4 rounded-lg"
      >
        <h3 className="font-semibold text-blue-900 mb-2">Quick scheduling tips:</h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Select your preferred date and time from the available slots</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Your information has been pre-filled for convenience</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>You&apos;ll receive a confirmation email with appointment details</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>After scheduling, click &quot;Continue&quot; below to complete your application</span>
          </li>
        </ul>
      </motion.div>

      {/* Appointment Confirmation Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="border-2 border-primary/20 rounded-lg p-4 bg-primary/5"
      >
        <label className="flex items-center mb-3">
          <input
            type="checkbox"
            checked={hasScheduled}
            onChange={(e) => setHasScheduled(e.target.checked)}
            className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary mr-3"
          />
          <span className="font-medium text-gray-900">
            I have scheduled my appointment
          </span>
        </label>
        
        {hasScheduled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Please confirm your appointment date and time:
            </label>
            <Input
              type="text"
              value={appointmentInput}
              onChange={(e) => setAppointmentInput(e.target.value)}
              placeholder="e.g., Monday, January 15 at 2:00 PM"
              className="w-full"
            />
          </motion.div>
        )}
      </motion.div>

      <div className="flex justify-between gap-4">
        {!isFirstStep && (
          <Button variant="outline" onClick={onBack} className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 12H5M12 19l-7-7 7-7"
              />
            </svg>
            Back
          </Button>
        )}
        <Button 
          onClick={handleScheduleComplete} 
          className={isFirstStep ? 'ml-auto' : ''}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}