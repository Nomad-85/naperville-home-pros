'use client';

import React from 'react';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  className?: string;
  labelClassName?: string;
  srText?: string;
}

export default function Switch({
  checked,
  onChange,
  id,
  name,
  label,
  disabled = false,
  size = 'md',
  color = 'primary',
  className = '',
  labelClassName = '',
  srText,
}: SwitchProps) {
  // Generate unique ID if not provided
  const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;
  
  // Size classes
  const sizeClasses = {
    sm: {
      switch: 'w-8 h-4',
      dot: 'h-3 w-3',
      translate: 'translate-x-4',
      label: 'text-sm',
    },
    md: {
      switch: 'w-11 h-6',
      dot: 'h-5 w-5',
      translate: 'translate-x-5',
      label: 'text-base',
    },
    lg: {
      switch: 'w-14 h-7',
      dot: 'h-6 w-6',
      translate: 'translate-x-7',
      label: 'text-lg',
    },
  };
  
  // Color classes
  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-gray-600',
    success: 'bg-green-600',
    danger: 'bg-red-600',
    warning: 'bg-yellow-500',
    info: 'bg-blue-600',
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked);
    }
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative inline-block">
        <input
          type="checkbox"
          id={switchId}
          name={name}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          aria-checked={checked}
          aria-label={srText || label}
        />
        <div
          className={`
            ${sizeClasses[size].switch}
            ${checked ? colorClasses[color] : 'bg-gray-200'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            relative inline-flex flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color === 'primary' ? 'primary' : color}-500
          `}
          onClick={() => !disabled && onChange(!checked)}
          role="presentation"
        >
          <span
            className={`
              ${sizeClasses[size].dot}
              ${checked ? sizeClasses[size].translate : 'translate-x-0'}
              pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
            `}
            aria-hidden="true"
          />
        </div>
      </div>
      
      {label && (
        <label
          htmlFor={switchId}
          className={`ml-2 ${sizeClasses[size].label} ${disabled ? 'text-gray-400' : 'text-gray-900'} ${labelClassName}`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
