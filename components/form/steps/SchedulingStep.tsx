'use client';

import { useState } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

export function SchedulingStep({ data, updateData, onNext, onBack, isFirstStep }: StepProps) {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [error, setError] = useState('');

  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
    setError('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setError('');
  };

  const handleNext = () => {
    if (!selectedDate || !selectedTime) {
      setError('Please select both a date and time for your assessment');
      return;
    }
    
    const appointmentDate = selectedDate as Date;
    const appointmentDateTime = `${appointmentDate.toLocaleDateString()} at ${selectedTime}`;
    
    updateData({ 
      appointmentDate: appointmentDate.toISOString(),
      appointmentTime: selectedTime,
      appointmentDateTime 
    });
    onNext();
  };

  // Disable past dates and weekends
  const tileDisabled = ({ date }: { date: Date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0 || date.getDay() === 6;
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
          Select a date and time that works best for you. Our team will call you at the scheduled time.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="font-semibold text-gray-900 mb-3">Select a Date</h2>
          <div className="calendar-wrapper">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileDisabled={tileDisabled}
              minDate={new Date()}
              className="react-calendar-custom border-2 border-gray-200 rounded-lg shadow-sm"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="font-semibold text-gray-900 mb-3">Select a Time</h2>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time, index) => (
              <motion.button
                key={time}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.3 + index * 0.05 }}
                onClick={() => handleTimeSelect(time)}
                className={`
                  p-3 rounded-lg border-2 transition-all duration-200
                  ${selectedTime === time 
                    ? 'border-primary bg-primary text-white shadow-lg' 
                    : 'border-gray-200 hover:border-primary hover:shadow-md bg-white'
                  }
                `}
              >
                {time}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 p-4 rounded-lg"
        >
          <p className="text-blue-900 font-medium">
            Your appointment: {(selectedDate as Date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} at {selectedTime}
          </p>
        </motion.div>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-600 text-sm"
        >
          {error}
        </motion.p>
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
          onClick={handleNext} 
          className={`w-full sm:w-auto ${isFirstStep ? 'sm:ml-auto' : ''}`}
        >
          Confirm Appointment
        </Button>
      </div>
    </div>
  );
}