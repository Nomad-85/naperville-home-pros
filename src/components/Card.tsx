'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  elevation = 'md',
  rounded = 'md',
  padding = 'md',
  border = false,
  hoverEffect = false,
  onClick,
}: CardProps) {
  // Base classes
  const baseClasses = 'bg-white transition-all duration-200';
  
  // Elevation classes
  const elevationClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
  };
  
  // Rounded corner classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-xl',
  };
  
  // Padding classes
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };
  
  // Border classes
  const borderClasses = border ? 'border border-gray-200' : '';
  
  // Hover effect classes
  const hoverClasses = hoverEffect 
    ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' 
    : '';
  
  // Combine all classes
  const cardClasses = `
    ${baseClasses}
    ${elevationClasses[elevation]}
    ${roundedClasses[rounded]}
    ${paddingClasses[padding]}
    ${borderClasses}
    ${hoverClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <div 
      className={cardClasses} 
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
