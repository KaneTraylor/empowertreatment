import { useState } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function SuboxoneDaysStep({ data, updateData, onNext, onBack, isFirstStep }: StepProps) {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!data.days || data.days.trim() === '') {
      setError('Please enter the number of days');
      return;
    }
    
    const daysNum = parseInt(data.days);
    if (isNaN(daysNum) || daysNum < 0) {
      setError('Please enter a valid number');
      return;
    }
    
    setError('');
    onNext();
  };

  const handleChange = (value: string) => {
    // Only allow numbers
    const cleaned = value.replace(/[^0-9]/g, '');
    updateData({ days: cleaned });
    setError('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          How many days do you have left on your current prescription?
        </h1>
      </div>

      <div>
        <Input
          type="text"
          value={data.days || ''}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter number of days"
          error={error}
          inputMode="numeric"
          maxLength={3}
        />
      </div>

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
          onClick={handleNext} 
          className={isFirstStep ? 'ml-auto' : ''}
        >
          Next
        </Button>
      </div>
    </div>
  );
}