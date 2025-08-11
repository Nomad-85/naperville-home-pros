'use client';

import React from 'react';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

export default function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  animation = 'pulse',
}: SkeletonProps) {
  // Base classes
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  
  // Variant classes
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };
  
  // Animation classes
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    none: '',
  };
  
  // Default dimensions based on variant
  let defaultWidth;
  let defaultHeight;
  
  switch (variant) {
    case 'text':
      defaultWidth = '100%';
      defaultHeight = '1em';
      break;
    case 'circular':
      defaultWidth = '2.5rem';
      defaultHeight = '2.5rem';
      break;
    case 'rectangular':
      defaultWidth = '100%';
      defaultHeight = '100px';
      break;
  }
  
  // Combine all classes
  const skeletonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${animationClasses[animation]}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  const style = {
    width: width || defaultWidth,
    height: height || defaultHeight,
  };
  
  return (
    <div 
      className={skeletonClasses} 
      style={style}
      role="status"
      aria-label="Loading..."
      aria-busy="true"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Convenience component for skeleton text lines
export function SkeletonText({ 
  lines = 3, 
  className = '', 
  lastLineWidth = '70%',
  lineHeight = '1em',
  spacing = '0.5em',
}: { 
  lines?: number;
  className?: string;
  lastLineWidth?: string | number;
  lineHeight?: string | number;
  spacing?: string | number;
}) {
  return (
    <div className={`space-y-${typeof spacing === 'number' ? spacing : '2'} ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? lastLineWidth : '100%'}
          height={lineHeight}
        />
      ))}
    </div>
  );
}

// Add wave animation to global CSS
if (typeof document !== 'undefined') {
  // Only run in browser environment
  const style = document.createElement('style');
  style.textContent = `
    @keyframes skeletonWave {
      0% {
        background-position: -200px 0;
      }
      100% {
        background-position: calc(200px + 100%) 0;
      }
    }
    .skeleton-wave {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200px 100%;
      animation: skeletonWave 1.5s ease-in-out infinite;
    }
    .dark .skeleton-wave {
      background: linear-gradient(90deg, #374151 25%, #4B5563 50%, #374151 75%);
      background-size: 200px 100%;
      animation: skeletonWave 1.5s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
}
