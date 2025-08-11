'use client';

import React, { useState } from 'react';

export interface FormFieldProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio';
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  className?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  autoComplete?: string;
}

export function FormField({
  id,
  label,
  type,
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  error,
  helpText,
  className = '',
  options = [],
  rows = 3,
  min,
  max,
  step,
  autoComplete,
}: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (type === 'checkbox') {
      onChange((e.target as HTMLInputElement).checked);
    } else if (type === 'number') {
      onChange(e.target.value === '' ? '' : Number(e.target.value));
    } else {
      onChange(e.target.value);
    }
  };

  const inputClasses = `
    block w-full rounded-md border-gray-300 shadow-sm
    focus:border-primary-500 focus:ring-primary-500
    disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
    ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : ''}
    ${className}
  `;

  const labelClasses = `block text-sm font-medium text-gray-700 mb-1 ${required ? 'required' : ''}`;
  
  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={id}
            name={id}
            value={value || ''}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={rows}
            className={inputClasses}
            aria-describedby={error ? `${id}-error` : helpText ? `${id}-description` : undefined}
            aria-invalid={!!error}
          />
        );
        
      case 'select':
        return (
          <select
            id={id}
            name={id}
            value={value || ''}
            onChange={handleChange}
            required={required}
            disabled={disabled}
            className={inputClasses}
            aria-describedby={error ? `${id}-error` : helpText ? `${id}-description` : undefined}
            aria-invalid={!!error}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'checkbox':
        return (
          <div className="flex items-center h-5">
            <input
              id={id}
              name={id}
              type="checkbox"
              checked={!!value}
              onChange={handleChange}
              required={required}
              disabled={disabled}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              aria-describedby={error ? `${id}-error` : helpText ? `${id}-description` : undefined}
              aria-invalid={!!error}
            />
          </div>
        );
        
      case 'radio':
        return (
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={`${id}-${option.value}`}
                  name={id}
                  type="radio"
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  required={required}
                  disabled={disabled}
                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                  aria-describedby={error ? `${id}-error` : helpText ? `${id}-description` : undefined}
                  aria-invalid={!!error}
                />
                <label htmlFor={`${id}-${option.value}`} className="ml-2 block text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
        
      default:
        return (
          <input
            id={id}
            name={id}
            type={type}
            value={value || ''}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            autoComplete={autoComplete}
            className={inputClasses}
            aria-describedby={error ? `${id}-error` : helpText ? `${id}-description` : undefined}
            aria-invalid={!!error}
          />
        );
    }
  };

  return (
    <div className={`mb-4 ${type === 'checkbox' ? 'flex items-start' : ''}`}>
      {type === 'checkbox' ? (
        <>
          {renderField()}
          <div className="ml-3 text-sm">
            <label htmlFor={id} className={`font-medium text-gray-700 ${disabled ? 'text-gray-500' : ''}`}>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {helpText && (
              <p id={`${id}-description`} className="text-gray-500 mt-1">
                {helpText}
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <label htmlFor={id} className={labelClasses}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {renderField()}
          {helpText && !error && (
            <p id={`${id}-description`} className="mt-1 text-sm text-gray-500">
              {helpText}
            </p>
          )}
        </>
      )}
      
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function Form({
  onSubmit,
  children,
  className = '',
  disabled = false,
}: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled) {
      onSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`space-y-4 ${className}`}
      noValidate
    >
      {children}
    </form>
  );
}

export function FormActions({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-end space-x-3 pt-4 ${className}`}>
      {children}
    </div>
  );
}
