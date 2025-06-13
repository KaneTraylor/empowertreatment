'use client';

import { useState } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export function GoogleCalendarExternalStep({ data, updateData, onNext, onBack, isFirstStep }: StepProps) {
  const [hasScheduled, setHasScheduled] = useState(false);
  const appointmentUrl = process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL || 
    'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1poUjTRWAGf1Md3gDKPh7_FI4xD8abtrN2_-b-kcKCx-W-yTYzOAsJ8VddgYydJQPbCEf6NPBz';

  const handleScheduleClick = () => {
    // Prefill the appointment URL with user's data
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
    const fullUrl = queryString ? `${appointmentUrl}?${queryString}` : appointmentUrl;
    
    // Open in new window
    window.open(fullUrl, '_blank', 'width=800,height=600');
    setHasScheduled(true);
  };

  const handleContinue = () => {
    updateData({ appointmentNotification: true });
    onNext();
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
          Click the button below to open our scheduling calendar in a new window.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 text-center"
      >
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-primary mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to schedule?
          </h2>
          <p className="text-gray-600 mb-6">
            Your information will be pre-filled for a quick and easy booking experience.
          </p>
        </div>

        <Button
          onClick={handleScheduleClick}
          size="lg"
          className="mb-4"
        >
          Open Scheduling Calendar
        </Button>

        {hasScheduled && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-600"
          >
            Calendar opened in a new window
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-blue-50 p-4 rounded-lg"
      >
        <h3 className="font-semibold text-blue-900 mb-2">Scheduling steps:</h3>
        <ol className="text-blue-800 text-sm space-y-2 list-decimal list-inside">
          <li>Click &quot;Open Scheduling Calendar&quot; above</li>
          <li>Select your preferred date and time from available slots</li>
          <li>Confirm your appointment in the calendar</li>
          <li>Close the calendar window and click &quot;Continue&quot; below</li>
        </ol>
      </motion.div>

      {hasScheduled && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 p-4 rounded-lg"
        >
          <p className="text-green-800 text-sm flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Great! Once you&apos;ve completed scheduling, click Continue below.
          </p>
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        {!isFirstStep && (
          <Button variant="outline" onClick={onBack} className="flex items-center justify-center w-full sm:w-auto">
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
          onClick={handleContinue} 
          className={`w-full sm:w-auto ${isFirstStep ? 'sm:ml-auto' : ''}`}
          disabled={!hasScheduled}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}