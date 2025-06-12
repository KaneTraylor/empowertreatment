import React from 'react';
import { cn } from '@/lib/utils';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  name: string;
  options: CheckboxOption[];
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
  className?: string;
}

export function CheckboxGroup({
  name,
  options,
  values = [],
  onChange,
  error,
  className,
}: CheckboxGroupProps) {
  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...values, value]);
    } else {
      onChange(values.filter(v => v !== value));
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-start space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
        >
          <input
            type="checkbox"
            name={name}
            value={option.value}
            checked={values.includes(option.value)}
            onChange={(e) => handleChange(option.value, e.target.checked)}
            className="w-5 h-5 mt-0.5 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <span className="text-gray-700 select-none">{option.label}</span>
        </label>
      ))}
      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
}