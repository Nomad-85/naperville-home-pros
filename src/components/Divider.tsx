'use client';

import React from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: 'default' | 'primary' | 'secondary' | 'light';
  thickness?: 'thin' | 'medium' | 'thick';
  className?: string;
  label?: React.ReactNode;
  labelPosition?: 'center' | 'start' | 'end';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  color = 'default',
  thickness = 'thin',
  className = '',
  label,
  labelPosition = 'center',
  spacing = 'md',
}: DividerProps) {
  // Orientation classes
  const orientationClasses = {
    horizontal: 'w-full',
    vertical: 'h-full',
  };
  
  // Variant classes
  const variantClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };
  
  // Color classes
  const colorClasses = {
    default: 'border-gray-200',
    primary: 'border-primary-200',
    secondary: 'border-gray-300',
    light: 'border-gray-100',
  };
  
  // Thickness classes
  const thicknessClasses = {
    thin: orientation === 'horizontal' ? 'border-t' : 'border-l',
    medium: orientation === 'horizontal' ? 'border-t-2' : 'border-l-2',
    thick: orientation === 'horizontal' ? 'border-t-4' : 'border-l-4',
  };
  
  // Spacing classes
  const spacingClasses = {
    sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
    md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    xl: orientation === 'horizontal' ? 'my-8' : 'mx-8',
  };
  
  // Label position classes
  const labelPositionClasses = {
    center: 'justify-center',
    start: 'justify-start',
    end: 'justify-end',
  };
  
  // If there's a label and orientation is horizontal, render with label
  if (label && orientation === 'horizontal') {
    return (
      <div className={`flex items-center ${spacingClasses[spacing]} ${className}`}>
        <div className={`flex-grow ${thicknessClasses[thickness]} ${variantClasses[variant]} ${colorClasses[color]}`}></div>
        <div className={`px-3 text-sm text-gray-500 whitespace-nowrap ${labelPositionClasses[labelPosition]}`}>
          {label}
        </div>
        <div className={`flex-grow ${thicknessClasses[thickness]} ${variantClasses[variant]} ${colorClasses[color]}`}></div>
      </div>
    );
  }
  
  // Otherwise render simple divider
  return (
    <hr 
      className={`
        ${orientationClasses[orientation]}
        ${variantClasses[variant]}
        ${colorClasses[color]}
        ${thicknessClasses[thickness]}
        ${spacingClasses[spacing]}
        ${className}
      `}
      role="separator"
      aria-orientation={orientation}
    />
  );
}
