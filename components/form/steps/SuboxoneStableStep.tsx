import { useState } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';
import { RadioGroup } from '@/components/ui/RadioGroup';

const options = [
  {
    value: 'yes',
    label: 'Yes',
  },
  {
    value: 'no',
    label: 'No',
  },
];

export function SuboxoneStableStep({ data, updateData, onNext, onBack, isFirstStep }: StepProps) {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!data.feelstable) {
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
          Do you feel stable on your current daily dose?
        </h1>
      </div>

      <RadioGroup
        name="feelstable"
        value={data.feelstable || ''}
        onChange={(value) => {
          updateData({ feelstable: value as 'yes' | 'no' });
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