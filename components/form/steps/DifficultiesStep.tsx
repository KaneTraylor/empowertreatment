import { useState } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';

const difficulties = [
  {
    value: 'housing',
    label: 'Difficulty accessing stable housing',
  },
  {
    value: 'utilities',
    label: 'Difficulty paying utility bills',
  },
  {
    value: 'transportation',
    label: 'Difficulty accessing reliable transportation (including gas costs)',
  },
  {
    value: 'relationships',
    label: 'Difficulty with abusive or violent relationships with family or friends',
  },
  {
    value: 'criminal-justice',
    label: 'Difficulty with criminal justice involvement (such as incarceration or probation)',
  },
  {
    value: 'safety',
    label: 'Concerns about safety in your neighborhood',
  },
  {
    value: 'none',
    label: 'None of the above',
  },
];

export function DifficultiesStep({ data, updateData, onNext, onBack, isFirstStep }: StepProps) {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!data.difficultyfollowing || data.difficultyfollowing.length === 0) {
      setError('Please select at least one option');
      return;
    }
    setError('');
    onNext();
  };

  const handleChange = (values: string[]) => {
    // If "none" is selected, clear all other selections
    if (values.includes('none') && values.length > 1) {
      updateData({ difficultyfollowing: ['none'] });
    }
    // If another option is selected when "none" is already selected, remove "none"
    else if (data.difficultyfollowing?.includes('none') && values.length > 1) {
      updateData({ difficultyfollowing: values.filter(v => v !== 'none') });
    }
    else {
      updateData({ difficultyfollowing: values });
    }
    setError('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          In the past two months, have you had difficulty with any of the following?
        </h1>
        <p className="text-gray-600">
          We want to help you with whatever difficulties you&apos;re facing. Select all that apply.
        </p>
      </div>

      <CheckboxGroup
        name="difficultyfollowing"
        values={data.difficultyfollowing || []}
        onChange={handleChange}
        options={difficulties}
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