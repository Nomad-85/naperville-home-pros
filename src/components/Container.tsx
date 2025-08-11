'use client';

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  narrow?: boolean;
  noPadding?: boolean;
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '', 
  as: Component = 'div',
  narrow = false,
  noPadding = false,
  spacing = 'md',
  animate = false
}) => {
  // Define spacing classes based on the spacing prop
  const spacingClasses = {
    none: '',
    sm: 'py-4 md:py-6',
    md: 'py-6 md:py-8',
    lg: 'py-8 md:py-12',
    xl: 'py-12 md:py-16'
  };

  // Animation classes
  const animationClass = animate ? 'animate-fadeIn' : '';

  return (
    <Component 
      className={`
        mx-auto w-full 
        ${!noPadding ? 'px-4 sm:px-6 lg:px-8' : ''} 
        ${narrow ? 'max-w-5xl' : 'max-w-7xl'} 
        ${spacingClasses[spacing]}
        ${animationClass}
        ${className}
      `}
    >
      {children}
    </Component>
  );
};

export default Container;
