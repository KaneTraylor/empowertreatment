import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ name, options, value, onChange, error, className }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)}>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 hover:bg-gray-100 transition-colors"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="h-5 w-5 text-primary focus:ring-primary"
            />
            <div className="ml-3">
              <span className="block text-sm font-medium text-gray-900">
                {option.label}
              </span>
              {option.description && (
                <span className="block text-sm text-gray-500">
                  {option.description}
                </span>
              )}
            </div>
          </label>
        ))}
        {error && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };