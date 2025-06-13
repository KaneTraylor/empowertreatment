import { useState } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';

export function ReferralStep({ data, updateData, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!data.offer) {
      newErrors.offer = 'Please select an option';
    }
    
    if (data.offer === 'yes' && !data.providerName) {
      newErrors.providerName = 'Please enter the healthcare provider or hospital name';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  const referralOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Were you referred by another healthcare provider?
        </h1>
        <p className="text-gray-600">
          We offer the same evidence-based treatment to all patients.
        </p>
      </div>

      <div>
        <RadioGroup
          name="offer"
          options={referralOptions}
          value={data.offer}
          onChange={(value) => updateData({ offer: value as 'yes' | 'no' })}
          error={errors.offer}
        />
      </div>

      {data.offer === 'yes' && (
        <div className="animate-fadeIn">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Which healthcare provider or hospital referred you?
          </label>
          <Input
            type="text"
            value={data.providerName || ''}
            onChange={(e) => updateData({ providerName: e.target.value })}
            placeholder="E.g. Dr. John Doe or Example Medical Center"
            error={errors.providerName}
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center justify-center w-full sm:w-auto"
        >
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
        
        <Button onClick={handleNext} className="w-full sm:w-auto">
          Next
        </Button>
      </div>
    </div>
  );
}