import { useState, useEffect } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

const states = [
  { value: 'Alabama', label: 'Alabama' },
  { value: 'Alaska', label: 'Alaska' },
  { value: 'Arizona', label: 'Arizona' },
  { value: 'Arkansas', label: 'Arkansas' },
  { value: 'California', label: 'California' },
  { value: 'Connecticut', label: 'Connecticut' },
  { value: 'Delaware', label: 'Delaware' },
  { value: 'District of Columbia', label: 'District of Columbia' },
  { value: 'Florida', label: 'Florida' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Hawaii', label: 'Hawaii' },
  { value: 'Idaho', label: 'Idaho' },
  { value: 'Illinois', label: 'Illinois' },
  { value: 'Indiana', label: 'Indiana' },
  { value: 'Iowa', label: 'Iowa' },
  { value: 'Kansas', label: 'Kansas' },
  { value: 'Kentucky', label: 'Kentucky' },
  { value: 'Louisiana', label: 'Louisiana' },
  { value: 'Maine', label: 'Maine' },
  { value: 'Maryland', label: 'Maryland' },
  { value: 'Massachusetts', label: 'Massachusetts' },
  { value: 'Michigan', label: 'Michigan' },
  { value: 'Minnesota', label: 'Minnesota' },
  { value: 'Mississippi', label: 'Mississippi' },
  { value: 'Missouri', label: 'Missouri' },
  { value: 'Montana', label: 'Montana' },
  { value: 'Nebraska', label: 'Nebraska' },
  { value: 'Nevada', label: 'Nevada' },
  { value: 'New Hampshire', label: 'New Hampshire' },
  { value: 'New Jersey', label: 'New Jersey' },
  { value: 'New Mexico', label: 'New Mexico' },
  { value: 'New York', label: 'New York' },
  { value: 'North Carolina', label: 'North Carolina' },
  { value: 'North Dakota', label: 'North Dakota' },
  { value: 'Ohio', label: 'Ohio' },
  { value: 'Oklahoma', label: 'Oklahoma' },
  { value: 'Oregon', label: 'Oregon' },
  { value: 'Pennsylvania', label: 'Pennsylvania' },
  { value: 'Rhode Island', label: 'Rhode Island' },
  { value: 'South Carolina', label: 'South Carolina' },
  { value: 'South Dakota', label: 'South Dakota' },
  { value: 'Tennessee', label: 'Tennessee' },
  { value: 'Texas', label: 'Texas' },
  { value: 'Utah', label: 'Utah' },
  { value: 'Vermont', label: 'Vermont' },
  { value: 'Virginia', label: 'Virginia' },
  { value: 'Washington', label: 'Washington' },
  { value: 'West Virginia', label: 'West Virginia' },
  { value: 'Wisconsin', label: 'Wisconsin' },
];

export function LocationStep({ data, updateData, onNext }: StepProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPhoneSection, setShowPhoneSection] = useState(false);

  useEffect(() => {
    if (data.stateselect === 'Ohio') {
      setShowPhoneSection(true);
    } else if (data.stateselect) {
      setShowPhoneSection(true);
    }
  }, [data.stateselect]);

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    updateData({ mobileNumber: formatted });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!data.stateselect) {
      newErrors.stateselect = 'Please select your state';
    }
    
    if (showPhoneSection) {
      // Check if at least one contact method is provided
      const hasEmail = data.email && data.email.trim() !== '';
      const hasPhone = data.mobileNumber && data.mobileNumber.replace(/[^\d]/g, '').length > 0;
      
      if (!hasEmail && !hasPhone) {
        newErrors.contact = 'Please provide either an email or phone number';
      } else {
        // Validate email only if provided
        if (hasEmail && !/\S+@\S+\.\S+/.test(data.email)) {
          newErrors.email = 'Email is invalid';
        }
        
        // Validate phone only if provided
        if (hasPhone && data.mobileNumber.replace(/[^\d]/g, '').length !== 10) {
          newErrors.mobileNumber = 'Phone number must be 10 digits';
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Where do you live?
        </h1>
        <p className="text-gray-600">
          This helps us pair you with a licensed clinician in your state.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary state of residence
        </label>
        <Select
          value={data.stateselect}
          onChange={(e) => updateData({ stateselect: e.target.value })}
          options={states}
          placeholder="Type to find your state..."
          error={errors.stateselect}
        />
        {data.stateselect && data.stateselect !== 'Ohio' && (
          <p className="mt-2 text-sm text-primary">
            We&apos;re not licensed in your state yet
          </p>
        )}
      </div>

      {showPhoneSection && (
        <>
          <hr className="my-8" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {data.stateselect === 'Ohio' 
                ? '🎉 We serve your state' 
                : `Get notified when we launch in ${data.stateselect}`}
            </h2>
            {data.stateselect === 'Ohio' && (
              <p className="text-gray-600 mb-6">
                Next, we need a way to contact you. Please provide either your email or phone number (or both).
                Don&apos;t have your own phone number? Email{' '}
                <a href="mailto:support@empower.com" className="text-primary hover:underline">
                  support@empower.com
                </a>
              </p>
            )}
          </div>

          <div className="space-y-4">
            {errors.contact && (
              <p className="text-sm text-red-600">{errors.contact}</p>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-gray-500 font-normal">(optional)</span>
              </label>
              <Input
                type="email"
                value={data.email}
                onChange={(e) => updateData({ email: e.target.value })}
                placeholder="company@company.com"
                error={errors.email}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone number <span className="text-gray-500 font-normal">(optional)</span>
              </label>
              <Input
                type="tel"
                value={data.mobileNumber}
                onChange={handlePhoneChange}
                placeholder="+1 (XXX) XXX - XXXX"
                error={errors.mobileNumber}
              />
              {data.mobileNumber && data.mobileNumber.replace(/[^\d]/g, '').length > 0 && (
                <p className="mt-2 text-sm text-gray-600 font-semibold">
                  By clicking Next, you consent for us to send you texts. Standard rates apply.
                </p>
              )}
            </div>
          </div>
        </>
      )}

      <div className="flex justify-end">
        <Button onClick={handleNext} disabled={!data.stateselect}>
          Next
        </Button>
      </div>
    </div>
  );
}