import { useState } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';
import { RadioGroup } from '@/components/ui/RadioGroup';

const options = [
  {
    value: 'none',
    label: "I haven't used opioids (not including Suboxone)",
  },
  {
    value: 'less-week',
    label: 'Less than a week',
  },
  {
    value: 'week-month',
    label: 'More than a week but less than a month',
  },
  {
    value: 'month-more',
    label: 'More than a month',
  },
];

export function OpioidDurationStep({ data, updateData, onNext, onBack, isFirstStep }: StepProps) {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!data.notincludingSuboxone) {
      setError('Please select an option');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          How long have you been using opioids (not including Suboxone)?
        </h1>
      </div>

      <RadioGroup
        name="notincludingSuboxone"
        value={data.notincludingSuboxone || ''}
        onChange={(value) => {
          updateData({ notincludingSuboxone: value as 'none' | 'less-week' | 'week-month' | 'month-more' });
          setError('');
        }}
        options={options}
        error={error}
      />

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
          Next
        </Button>
      </div>
    </div>
  );
}