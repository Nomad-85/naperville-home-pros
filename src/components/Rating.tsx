'use client';

import React from 'react';

export interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  precision?: 0.5 | 1;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  disabled?: boolean;
  emptyIcon?: React.ReactNode;
  filledIcon?: React.ReactNode;
  halfFilledIcon?: React.ReactNode;
  name?: string;
  className?: string;
  label?: string;
  showValue?: boolean;
  highlightSelectedOnly?: boolean;
  color?: 'primary' | 'secondary' | 'warning' | 'success' | 'danger';
}

export default function Rating({
  value,
  onChange,
  max = 5,
  precision = 1,
  size = 'md',
  readOnly = false,
  disabled = false,
  emptyIcon,
  filledIcon,
  halfFilledIcon,
  name,
  className = '',
  label,
  showValue = false,
  highlightSelectedOnly = false,
  color = 'warning',
}: RatingProps) {
  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };
  
  // Color classes
  const colorClasses = {
    primary: 'text-primary-500',
    secondary: 'text-gray-500',
    warning: 'text-yellow-400',
    success: 'text-green-500',
    danger: 'text-red-500',
  };
  
  // Generate array of possible values based on precision
  const possibleValues = Array.from(
    { length: max * (precision === 0.5 ? 2 : 1) },
    (_, i) => (i + 1) * (precision === 0.5 ? 0.5 : 1)
  );
  
  // Handle hover state
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);
  
  // Handle rating change
  const handleChange = (newValue: number) => {
    if (readOnly || disabled) return;
    
    if (onChange) {
      // If clicking on the current value, clear it (unless it's the minimum value)
      if (newValue === value && newValue > precision) {
        onChange(0);
      } else {
        onChange(newValue);
      }
    }
  };
  
  // Get the appropriate icon for a given value
  const getIcon = (itemValue: number) => {
    const displayValue = hoverValue !== null ? hoverValue : value;
    const isActive = highlightSelectedOnly 
      ? itemValue === Math.ceil(displayValue) 
      : itemValue <= displayValue;
    const isHalf = !highlightSelectedOnly && 
      precision === 0.5 && 
      Math.ceil(displayValue) === itemValue && 
      displayValue % 1 !== 0;
    
    if (isHalf && halfFilledIcon) {
      return halfFilledIcon;
    }
    
    if (isActive && filledIcon) {
      return filledIcon;
    }
    
    if (emptyIcon) {
      return emptyIcon;
    }
    
    // Default icons
    if (isHalf) {
      return (
        <svg className={`${sizeClasses[size]} ${colorClasses[color]}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26L12 2Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.5"
          />
        </svg>
      );
    }
    
    if (isActive) {
      return (
        <svg className={`${sizeClasses[size]} ${colorClasses[color]}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26L12 2Z" />
        </svg>
      );
    }
    
    return (
      <svg className={`${sizeClasses[size]} text-gray-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26L12 2Z" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    );
  };
  
  // Generate unique ID for accessibility
  const id = React.useId();
  
  return (
    <div className={`inline-flex items-center ${className}`}>
      {label && (
        <label htmlFor={id} className="mr-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div 
        className={`inline-flex items-center ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onMouseLeave={() => !readOnly && !disabled && setHoverValue(null)}
        role={readOnly ? 'img' : 'radiogroup'}
        aria-label={`Rating: ${value} out of ${max}`}
      >
        {Array.from({ length: max }).map((_, index) => {
          const itemValue = index + 1;
          
          return (
            <span
              key={itemValue}
              className={`
                inline-flex items-center justify-center
                ${!readOnly && !disabled ? 'cursor-pointer' : ''}
                ${precision === 0.5 ? '-ml-1 first:ml-0' : 'mx-0.5 first:ml-0 last:mr-0'}
              `}
              onClick={() => handleChange(itemValue)}
              onMouseEnter={() => !readOnly && !disabled && setHoverValue(itemValue)}
              role={readOnly ? undefined : 'radio'}
              aria-checked={value === itemValue}
              tabIndex={readOnly ? -1 : 0}
            >
              {getIcon(itemValue)}
            </span>
          );
        })}
      </div>
      
      {showValue && (
        <span className="ml-2 text-sm font-medium text-gray-700">
          {value} / {max}
        </span>
      )}
      
      {/* Hidden input for form submission */}
      {name && (
        <input 
          type="hidden" 
          name={name} 
          value={value} 
          id={id}
        />
      )}
    </div>
  );
}
