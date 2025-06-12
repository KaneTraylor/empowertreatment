import { useState } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

export function ReasonStep({ data, updateData, onNext, onBack, isFirstStep }: StepProps) {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!data.reasonJoiningEmpower || data.reasonJoiningEmpower.trim() === '') {
      setError('Please tell us why you want to join Empower');
      return;
    }
    
    if (data.reasonJoiningEmpower.length < 10) {
      setError('Please provide a bit more detail (at least 10 characters)');
      return;
    }
    
    setError('');
    onNext();
  };

  const handleChange = (value: string) => {
    updateData({ reasonJoiningEmpower: value });
    setError('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Why do you want to join Empower?
        </h1>
        <p className="text-gray-600">
          Tell us a bit about what brings you here and what you hope to achieve.
        </p>
      </div>

      <Textarea
        value={data.reasonJoiningEmpower || ''}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Share your thoughts here..."
        rows={6}
        maxLength={500}
        error={error}
      />
      
      <p className="text-sm text-gray-500">
        {data.reasonJoiningEmpower?.length || 0} / 500 characters
      </p>

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