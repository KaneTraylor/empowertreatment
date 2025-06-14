import React from 'react';
import { cn } from '@/lib/utils';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  name?: string;
  label?: string;
  options: CheckboxOption[];
  value?: string[];
  values?: string[];
  onChange: (values: string[]) => void;
  error?: string;
  className?: string;
  required?: boolean;
}

export function CheckboxGroup({
  name,
  label,
  options,
  value = [],
  values,
  onChange,
  error,
  className,
  required,
}: CheckboxGroupProps) {
  // Support both 'value' and 'values' props
  const selectedValues = value || values || [];
  
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, optionValue]);
    } else {
      onChange(selectedValues.filter(v => v !== optionValue));
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-start space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
        >
          <input
            type="checkbox"
            name={name}
            value={option.value}
            checked={selectedValues.includes(option.value)}
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