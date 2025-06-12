import { useState } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';
import { RadioGroup } from '@/components/ui/RadioGroup';

const suboxoneOptions = [
  {
    value: 'currently-taking',
    label: "I'm currently taking Suboxone",
  },
  {
    value: 'taken-past',
    label: "I've taken Suboxone in the past, but I'm not currently taking it",
  },
  {
    value: 'never-taken',
    label: "I've never taken Suboxone",
  },
];

export function SuboxoneStep({ data, updateData, onNext, onBack, isFirstStep }: StepProps) {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!data.relationshipwithSuboxone) {
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
          How would you describe your relationship with Suboxone?
        </h1>
      </div>

      <RadioGroup
        name="relationshipwithSuboxone"
        value={data.relationshipwithSuboxone || ''}
        onChange={(value) => {
          updateData({ relationshipwithSuboxone: value as 'currently-taking' | 'taken-past' | 'never-taken' });
          setError('');
        }}
        options={suboxoneOptions}
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