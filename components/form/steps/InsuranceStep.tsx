import { useState } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Select } from '@/components/ui/Select';

const insuranceOptions = [
  {
    value: 'yes',
    label: 'Yes',
  },
  {
    value: 'no',
    label: 'No',
  },
];

// Common insurance providers
const insuranceProviders = [
  { value: 'aetna', label: 'Aetna' },
  { value: 'anthem', label: 'Anthem' },
  { value: 'bcbs', label: 'Blue Cross Blue Shield' },
  { value: 'cigna', label: 'Cigna' },
  { value: 'humana', label: 'Humana' },
  { value: 'kaiser', label: 'Kaiser Permanente' },
  { value: 'medicaid', label: 'Medicaid' },
  { value: 'medicare', label: 'Medicare' },
  { value: 'united', label: 'UnitedHealthcare' },
  { value: 'other', label: 'Other' },
];

export function InsuranceStep({ data, updateData, onNext, onBack, isFirstStep }: StepProps) {
  const [errors, setErrors] = useState<{ youinsured?: string; insuranceselect?: string }>({});

  const handleNext = () => {
    const newErrors: typeof errors = {};
    
    if (!data.youinsured) {
      newErrors.youinsured = 'Please select an option';
    }
    
    if (data.youinsured === 'yes' && !data.insuranceselect) {
      newErrors.insuranceselect = 'Please select your insurance provider';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Are you insured?
        </h1>
      </div>

      <RadioGroup
        name="youinsured"
        value={data.youinsured || ''}
        onChange={(value) => {
          updateData({ youinsured: value as 'yes' | 'no' });
          // Clear insurance provider if "no" is selected
          if (value === 'no') {
            updateData({ insuranceselect: undefined });
          }
          setErrors({});
        }}
        options={insuranceOptions}
        error={errors.youinsured}
      />

      {data.youinsured === 'yes' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Insurance Provider
          </label>
          <Select
            value={data.insuranceselect || ''}
            onChange={(e) => {
              updateData({ insuranceselect: e.target.value });
              setErrors(prev => ({ ...prev, insuranceselect: undefined }));
            }}
            options={insuranceProviders}
            placeholder="Select your insurance provider"
            error={errors.insuranceselect}
          />
        </div>
      )}

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