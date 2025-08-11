'use client';

import React from 'react';

export interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  valueFormat?: (value: number, max: number) => string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  animated?: boolean;
  striped?: boolean;
  className?: string;
  barClassName?: string;
}

export default function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  valueFormat,
  size = 'md',
  variant = 'primary',
  animated = false,
  striped = false,
  className = '',
  barClassName = '',
}: ProgressProps) {
  // Ensure value is between 0 and max
  const normalizedValue = Math.max(0, Math.min(value, max));
  
  // Calculate percentage
  const percentage = (normalizedValue / max) * 100;
  
  // Format value for display
  const formattedValue = valueFormat 
    ? valueFormat(normalizedValue, max) 
    : showValue 
      ? `${Math.round(percentage)}%` 
      : '';
  
  // Size classes
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-gray-600',
    success: 'bg-green-600',
    danger: 'bg-red-600',
    warning: 'bg-yellow-500',
    info: 'bg-blue-600',
  };
  
  // Animation classes
  const animationClass = animated ? 'animate-progress' : '';
  
  // Striped classes
  const stripedClass = striped 
    ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_20px]' 
    : '';
  
  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-medium text-gray-700">{formattedValue}</span>
          )}
        </div>
      )}
      
      <div 
        className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
        role="progressbar"
        aria-valuenow={normalizedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div 
          className={`
            ${variantClasses[variant]} 
            ${animationClass} 
            ${stripedClass} 
            ${barClassName}
            transition-all duration-300 ease-out
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Add animation to global CSS
if (typeof document !== 'undefined') {
  // Only run in browser environment
  const style = document.createElement('style');
  style.textContent = `
    @keyframes progress-stripes {
      from { background-position: 1rem 0 }
      to { background-position: 0 0 }
    }
    .animate-progress {
      animation: progress-stripes 1s linear infinite;
    }
  `;
  document.head.appendChild(style);
}
