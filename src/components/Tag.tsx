'use client';

import React from 'react';

export interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export default function Tag({
  children,
  variant = 'default',
  size = 'md',
  removable = false,
  onRemove,
  className = '',
  icon,
  onClick,
}: TagProps) {
  // Base classes
  const baseClasses = 'inline-flex items-center font-medium';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs rounded',
    md: 'px-2.5 py-1 text-sm rounded-md',
    lg: 'px-3 py-1.5 text-base rounded-lg',
  };
  
  // Variant classes
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-gray-200 text-gray-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  };
  
  // Interactive classes
  const interactiveClasses = onClick 
    ? 'cursor-pointer hover:bg-opacity-80 transition-colors' 
    : '';
  
  // Combine all classes
  const tagClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${interactiveClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  // Handle remove click
  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };
  
  return (
    <span 
      className={tagClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && (
        <span className="mr-1.5 flex-shrink-0">
          {icon}
        </span>
      )}
      
      <span>{children}</span>
      
      {removable && (
        <button
          type="button"
          className="ml-1.5 flex-shrink-0 inline-flex items-center justify-center rounded-full hover:bg-gray-200 hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          onClick={handleRemoveClick}
          aria-label="Remove"
        >
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </span>
  );
}

export function TagGroup({
  children,
  spacing = 2,
  className = '',
}: {
  children: React.ReactNode;
  spacing?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-${spacing} ${className}`}>
      {children}
    </div>
  );
}
