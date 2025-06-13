import { useState, useRef, useEffect } from 'react';
import { StepProps } from '@/types/form';
import { Button } from '@/components/ui/Button';

export function OTPStep({ data, updateData, onNext, onBack }: StepProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleSubmit = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpString }),
      });

      const result = await response.json();

      if (result.success) {
        onNext();
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Determine which contact method was used
  const maskedPhone = data.mobileNumber ? data.mobileNumber.slice(-4) : '';
  const maskedEmail = data.email ? 
    data.email.replace(/^(.{2})(.*)(@.*)$/, '$1***$3') : '';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          🔓 For your security
        </h1>
        <p className="text-gray-600">
          Please confirm your identity by entering the OTP sent to{' '}
          {data.mobileNumber && `(***) *** - ${maskedPhone}`}
          {data.mobileNumber && data.email && ' and '}
          {data.email && maskedEmail}
        </p>
      </div>

      <div className="flex justify-center space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className="w-12 h-12 text-center text-2xl font-semibold border-2 border-gray-300 rounded-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            maxLength={1}
          />
        ))}
      </div>

      {error && (
        <p className="text-center text-sm text-red-600">{error}</p>
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
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={() => {/* Implement resend logic */}}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Send code again
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || otp.some(d => !d)}
            className="w-full sm:w-auto"
          >
            {isLoading ? 'Verifying...' : 'Submit'}
          </Button>
        </div>
      </div>
    </div>
  );
}