'use client';

import React from 'react';
import Image from 'next/image';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  shape?: 'circle' | 'square' | 'rounded';
  fallback?: string | React.ReactNode;
  className?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  statusPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  bordered?: boolean;
  onClick?: () => void;
}

export default function Avatar({
  src,
  alt = 'Avatar',
  size = 'md',
  shape = 'circle',
  fallback,
  className = '',
  status,
  statusPosition = 'bottom-right',
  bordered = false,
  onClick,
}: AvatarProps) {
  // Size classes
  const sizeValue = typeof size === 'string' ? {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  }[size] : size;
  
  // Shape classes
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-md',
  };
  
  // Status classes
  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };
  
  // Status position classes
  const statusPositionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
  };
  
  // Generate initials from alt text for fallback
  const getInitials = () => {
    if (typeof fallback === 'string') return fallback;
    
    return alt
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Determine if we should show the image or fallback
  const [showFallback, setShowFallback] = React.useState(!src);
  
  // Handle image load error
  const handleError = () => {
    setShowFallback(true);
  };
  
  return (
    <div 
      className={`
        relative inline-flex flex-shrink-0 items-center justify-center
        ${shapeClasses[shape]}
        ${bordered ? 'ring-2 ring-white' : ''}
        ${onClick ? 'cursor-pointer hover:opacity-90' : ''}
        ${className}
      `}
      style={{ 
        width: sizeValue, 
        height: sizeValue,
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {!showFallback && src ? (
        <Image
          src={src}
          alt={alt}
          width={sizeValue}
          height={sizeValue}
          className={`${shapeClasses[shape]} object-cover w-full h-full`}
          onError={handleError}
        />
      ) : (
        <div 
          className={`
            flex items-center justify-center w-full h-full
            ${shapeClasses[shape]} bg-gray-200 text-gray-600
          `}
          style={{
            fontSize: `${Math.max(sizeValue / 2.5, 10)}px`,
          }}
        >
          {React.isValidElement(fallback) ? fallback : getInitials()}
        </div>
      )}
      
      {status && (
        <span 
          className={`
            absolute block rounded-full
            ${statusClasses[status]}
            ${statusPositionClasses[statusPosition]}
            border-2 border-white
          `}
          style={{
            width: Math.max(sizeValue / 4, 8),
            height: Math.max(sizeValue / 4, 8),
          }}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

export function AvatarGroup({
  children,
  max,
  spacing = -2,
  className = '',
}: {
  children: React.ReactNode;
  max?: number;
  spacing?: number;
  className?: string;
}) {
  const childrenArray = React.Children.toArray(children);
  const totalAvatars = childrenArray.length;
  const visibleAvatars = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingAvatars = max && totalAvatars > max ? totalAvatars - max : 0;
  
  return (
    <div 
      className={`flex items-center ${className}`}
      style={{ marginLeft: Math.abs(spacing) }}
    >
      {visibleAvatars.map((child, index) => (
        <div 
          key={index} 
          style={{ marginLeft: spacing }}
          className="relative"
        >
          {child}
        </div>
      ))}
      
      {remainingAvatars > 0 && (
        <div 
          style={{ marginLeft: spacing }}
          className="relative flex items-center justify-center bg-gray-200 text-gray-600 rounded-full"
        >
          <Avatar 
            fallback={`+${remainingAvatars}`}
            size={
              React.isValidElement(visibleAvatars[0]) && 
              visibleAvatars[0].props.size ? 
              visibleAvatars[0].props.size : 'md'
            }
          />
        </div>
      )}
    </div>
  );
}
