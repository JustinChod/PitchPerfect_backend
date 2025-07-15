import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  maxLength,
  rows = 4,
  required = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          className={`form-textarea ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
          required={required}
        />
      ) : (
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`form-input ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
          required={required}
        />
      )}
      
      <div className="flex justify-between items-center">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {maxLength && (
          <p className="text-gray-400 text-xs ml-auto">
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};