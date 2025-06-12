import { useState } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';
import { RadioGroup } from '@/components/ui/RadioGroup';

const options = [
  {
    value: 'yes',
    label: 'Less than 3 months',
  },
  {
    value: 'no',
    label: 'More than 3 months',
  },
  {
    value: 'not-sure',
    label: "I'm not sure",
  },
];

export function SuboxoneDailyDoseStep({ data, updateData, onNext, onBack, isFirstStep }: StepProps) {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!data.takingdailySuboxone) {
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
          How long have you been taking your current daily dose of Suboxone?
        </h1>
      </div>

      <RadioGroup
        name="takingdailySuboxone"
        value={data.takingdailySuboxone || ''}
        onChange={(value) => {
          updateData({ takingdailySuboxone: value as 'yes' | 'no' | 'not-sure' });
          setError('');
        }}
        options={options}
        error={error}
      />

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