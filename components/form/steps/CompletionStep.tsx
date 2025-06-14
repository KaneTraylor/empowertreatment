'use client';

import { useState, useEffect } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export function CompletionStep({ data, onBack, isFirstStep }: StepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Submit form data when component mounts
  useEffect(() => {
    if (!isSubmitted) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit form');
      }

      setIsSubmitted(true);
      console.log('Form submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-center">
      {isSubmitting ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Submitting your application...</p>
        </motion.div>
      ) : submitError ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-8"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Submission Error</h2>
          <p className="text-red-600 mb-4">{submitError}</p>
          <Button onClick={handleSubmit} variant="primary">
            Try Again
          </Button>
        </motion.div>
      ) : (
        <>
          <div className="flex justify-center mb-6">
            <motion.div 
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              🎉 You&apos;re all set!
            </h1>
            <p className="text-gray-600 mb-4">
              Thank you for taking the time to complete this assessment.
            </p>
            <p className="text-gray-600">
              {data.interestedintreatment === 'asap' 
                ? "Since you're interested in starting as soon as possible, we'll prioritize reaching out to you within the next 24 hours."
                : "We'll be in touch within the next few days to schedule your welcome call."
              }
            </p>
          </motion.div>

          {data.appointmentDateTime && (
            <motion.div 
              className="bg-green-50 p-4 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-semibold text-green-900 mb-1">Your appointment is confirmed!</h2>
              <p className="text-green-800">
                {data.appointmentDateTime}
              </p>
            </motion.div>
          )}

          <motion.div 
            className="bg-blue-50 p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-semibold text-blue-900 mb-2">What happens next?</h2>
            <ul className="text-left text-blue-800 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  {data.appointmentDateTime 
                    ? `We'll call you at your scheduled time: ${data.appointmentDateTime}`
                    : "A member of our care team will call you at the number you provided"
                  }
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>The welcome call will last about 15 minutes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>During the call, we&apos;ll discuss your treatment goals and next steps</span>
              </li>
            </ul>
          </motion.div>

          {isSubmitted && data.email && (
            <motion.div 
              className="text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p>✅ A confirmation email has been sent to {data.email}</p>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}