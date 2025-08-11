'use client';

import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'xs' | 'sm' | 'md';
  rounded?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'sm',
  rounded = true,
  className = '',
  onClick,
}: BadgeProps) {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium';
  
  // Size classes
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-sm',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
    light: 'bg-gray-50 text-gray-600 border border-gray-200',
    dark: 'bg-gray-700 text-white',
  };
  
  // Rounded classes
  const roundedClasses = rounded ? 'rounded-full' : 'rounded';
  
  // Interactive classes
  const interactiveClasses = onClick 
    ? 'cursor-pointer hover:opacity-80 transition-opacity' 
    : '';
  
  // Combine all classes
  const badgeClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${roundedClasses}
    ${interactiveClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <span 
      className={badgeClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </span>
  );
}
