'use client';

import { useEffect } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

// Replace this with your actual Calendly URL
const CALENDLY_URL = 'https://calendly.com/your-organization/welcome-call';

export function CalendlyStep({ data, updateData, onNext, onBack, isFirstStep }: StepProps) {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleScheduleComplete = () => {
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
          Choose a time that works best for you. Our team will call you at the scheduled time.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-gray-50 rounded-lg p-4"
      >
        {/* Calendly inline widget */}
        <div 
          className="calendly-inline-widget" 
          data-url={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=3b82f6`}
          style={{ minWidth: '320px', height: '630px' }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-blue-50 p-4 rounded-lg"
      >
        <p className="text-blue-900 text-sm">
          Once you&apos;ve scheduled your appointment, click &quot;Continue&quot; below to complete your application.
        </p>
      </motion.div>

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
          onClick={handleScheduleComplete} 
          className={`w-full sm:w-auto ${isFirstStep ? 'sm:ml-auto' : ''}`}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}