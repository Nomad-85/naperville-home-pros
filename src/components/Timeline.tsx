'use client';

import React from 'react';

export interface TimelineItem {
  id: string;
  title: string;
  content: React.ReactNode;
  date?: string;
  icon?: React.ReactNode;
  status?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export interface TimelineProps {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
  alternating?: boolean;
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  lineColor?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  iconPosition?: 'start' | 'center' | 'end';
}

export default function Timeline({
  items,
  orientation = 'vertical',
  alternating = false,
  className = '',
  iconSize = 'md',
  lineStyle = 'solid',
  lineColor = 'default',
  iconPosition = 'start',
}: TimelineProps) {
  // Icon size classes
  const iconSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };
  
  // Line style classes
  const lineStyleClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };
  
  // Line color classes
  const lineColorClasses = {
    default: 'border-gray-200',
    primary: 'border-primary-500',
    secondary: 'border-gray-500',
    success: 'border-green-500',
    warning: 'border-yellow-500',
    error: 'border-red-500',
    info: 'border-blue-500',
  };
  
  // Status color classes
  const statusColorClasses = {
    default: 'bg-gray-200 text-gray-600',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };
  
  // Default icon based on status
  const getDefaultIcon = (status: TimelineItem['status'] = 'default') => {
    switch (status) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
    }
  };
  
  // Render vertical timeline
  const renderVerticalTimeline = () => {
    return (
      <div className={`relative ${className}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isAlternate = alternating && index % 2 === 1;
          const status = item.status || 'default';
          
          return (
            <div 
              key={item.id}
              className={`relative ${isAlternate ? 'flex flex-row-reverse' : 'flex'}`}
            >
              {/* Line */}
              {!isLast && (
                <div 
                  className={`absolute ${iconPosition === 'center' ? 'top-10' : 'top-0'} bottom-0 ${isAlternate ? 'right-4' : 'left-4'} w-0.5 ${lineStyleClasses[lineStyle]} ${lineColorClasses[lineColor]}`}
                  style={{ marginLeft: iconSize === 'sm' ? '10px' : iconSize === 'md' ? '14px' : '18px' }}
                  aria-hidden="true"
                />
              )}
              
              {/* Icon */}
              <div className={`relative flex items-center justify-center flex-shrink-0 ${isAlternate ? 'ml-6' : 'mr-6'}`}>
                <div className={`
                  ${iconSizeClasses[iconSize]} 
                  rounded-full flex items-center justify-center
                  ${statusColorClasses[status]}
                  border-2 border-white shadow
                `}>
                  {item.icon || getDefaultIcon(status)}
                </div>
              </div>
              
              {/* Content */}
              <div className={`flex-1 ${isAlternate ? 'text-right mr-6' : 'ml-6'} pb-8`}>
                <div className="flex items-center mb-1">
                  <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                  {item.date && (
                    <time className={`text-sm text-gray-500 ${isAlternate ? 'mr-2' : 'ml-2'}`}>
                      {item.date}
                    </time>
                  )}
                </div>
                <div className="text-base text-gray-600">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render horizontal timeline
  const renderHorizontalTimeline = () => {
    return (
      <div className={`relative ${className}`}>
        {/* Line */}
        <div 
          className={`absolute left-0 right-0 top-4 h-0.5 ${lineStyleClasses[lineStyle]} ${lineColorClasses[lineColor]}`}
          style={{ top: iconSize === 'sm' ? '12px' : iconSize === 'md' ? '16px' : '20px' }}
          aria-hidden="true"
        />
        
        {/* Items */}
        <div className="relative flex justify-between">
          {items.map((item, index) => {
            const status = item.status || 'default';
            
            return (
              <div 
                key={item.id}
                className="flex flex-col items-center"
                style={{ width: `${100 / items.length}%` }}
              >
                {/* Icon */}
                <div className={`
                  ${iconSizeClasses[iconSize]} 
                  rounded-full flex items-center justify-center
                  ${statusColorClasses[status]}
                  border-2 border-white shadow z-10
                `}>
                  {item.icon || getDefaultIcon(status)}
                </div>
                
                {/* Content */}
                <div className="mt-3 text-center px-2">
                  <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                  {item.date && (
                    <time className="text-xs text-gray-500 block mt-0.5">
                      {item.date}
                    </time>
                  )}
                  <div className="text-xs text-gray-600 mt-1">
                    {item.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return orientation === 'horizontal' ? renderHorizontalTimeline() : renderVerticalTimeline();
}
