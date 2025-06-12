import { useState } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';
import { RadioGroup } from '@/components/ui/RadioGroup';

const opioidUseOptions = [
  {
    value: 'no-control',
    label: "I don't have my opioid use under control",
  },
  {
    value: 'under-control',
    label: 'I do have my opioid use under control',
  },
  {
    value: 'never-used',
    label: "I've never used opioids",
  },
];

export function OpioidUseStep({ data, updateData, onNext, onBack, isFirstStep }: StepProps) {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!data.opioiduse) {
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
          How would you describe your opioid use?
        </h1>
        <p className="text-gray-600">
          This can include oxycodone (OxyContin), hydrocodone (Vicodin), morphine,
          methadone, kratom, fentanyl, and heroin.
        </p>
      </div>

      <RadioGroup
        name="opioiduse"
        value={data.opioiduse || ''}
        onChange={(value) => {
          updateData({ opioiduse: value as 'no-control' | 'under-control' | 'never-used' });
          setError('');
        }}
        options={opioidUseOptions}
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