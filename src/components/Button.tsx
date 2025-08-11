'use client';

import React from 'react';
import Link from 'next/link';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  animate?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  ariaLabel?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  className = '',
  fullWidth = false,
  disabled = false,
  animate = false,
  icon,
  iconPosition = 'right',
  onClick,
  ariaLabel,
}: ButtonProps) {
  // Base classes that apply to all variants
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg focus:ring-primary-500 active:scale-95',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-md hover:shadow-lg focus:ring-gray-500 active:scale-95',
    outline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-primary-600 focus:ring-primary-500',
    text: 'bg-transparent text-primary-600 hover:text-primary-700 hover:bg-primary-50 focus:ring-primary-500',
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : '';
  
  // Animation classes
  const animateClasses = animate ? 'animate-fadeIn' : '';
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${disabledClasses} ${animateClasses} ${className}`;
  
  // Icon spacing based on position
  const iconSpacingLeft = icon && iconPosition === 'left' ? 'mr-2' : '';
  const iconSpacingRight = icon && iconPosition === 'right' ? 'ml-2' : '';

  // If href is provided, render as a Link
  if (href) {
    return (
      <Link 
        href={href}
        className={buttonClasses}
        onClick={onClick as any}
        aria-label={ariaLabel}
        aria-disabled={disabled}
      >
        {icon && iconPosition === 'left' && <span className={iconSpacingLeft}>{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className={iconSpacingRight}>{icon}</span>}
      </Link>
    );
  }
  
  // Otherwise render as a button
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon && iconPosition === 'left' && <span className={iconSpacingLeft}>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className={iconSpacingRight}>{icon}</span>}
    </button>
  );
}
