'use client';

import React from 'react';

export interface Step {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  optional?: boolean;
}

export interface StepperProps {
  steps: Step[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'dots' | 'numbered' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onStepClick?: (stepIndex: number) => void;
  alternativeLabel?: boolean;
  showLabels?: boolean;
}

export default function Stepper({
  steps,
  activeStep,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  className = '',
  onStepClick,
  alternativeLabel = false,
  showLabels = true,
}: StepperProps) {
  // Size classes
  const sizeClasses = {
    sm: {
      icon: 'w-6 h-6',
      text: 'text-xs',
      connector: 'h-1',
      verticalConnector: 'w-1',
      verticalSpacing: 'ml-3 mt-1 mb-6',
    },
    md: {
      icon: 'w-8 h-8',
      text: 'text-sm',
      connector: 'h-1',
      verticalConnector: 'w-1',
      verticalSpacing: 'ml-4 mt-2 mb-8',
    },
    lg: {
      icon: 'w-10 h-10',
      text: 'text-base',
      connector: 'h-1.5',
      verticalConnector: 'w-1.5',
      verticalSpacing: 'ml-5 mt-3 mb-10',
    },
  };

  // Render step icon based on variant
  const renderStepIcon = (step: Step, index: number, isActive: boolean, isCompleted: boolean) => {
    const iconClasses = `
      flex items-center justify-center
      ${sizeClasses[size].icon}
      rounded-full
      ${isCompleted 
        ? 'bg-primary-600 text-white' 
        : isActive 
          ? 'bg-primary-100 text-primary-600 border-2 border-primary-600' 
          : 'bg-gray-100 text-gray-500 border border-gray-300'
      }
      transition-all duration-200
    `;

    switch (variant) {
      case 'dots':
        return (
          <div 
            className={`
              rounded-full
              ${sizeClasses[size].icon}
              ${isCompleted 
                ? 'bg-primary-600' 
                : isActive 
                  ? 'bg-primary-100 border-2 border-primary-600' 
                  : 'bg-gray-100 border border-gray-300'
              }
            `}
          />
        );
      case 'numbered':
        return (
          <div className={iconClasses}>
            {isCompleted ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
        );
      case 'icon':
        return (
          <div className={iconClasses}>
            {isCompleted ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : step.icon ? (
              step.icon
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
        );
      default:
        return (
          <div className={iconClasses}>
            {isCompleted ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
        );
    }
  };

  // Render horizontal stepper
  const renderHorizontalStepper = () => {
    return (
      <div className={`flex ${alternativeLabel ? 'flex-col' : 'items-center'} ${className}`}>
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step */}
              <div 
                className={`
                  flex ${alternativeLabel ? 'flex-col items-center' : 'items-center'} 
                  ${onStepClick ? 'cursor-pointer' : ''}
                `}
                onClick={() => onStepClick && onStepClick(index)}
                role={onStepClick ? 'button' : undefined}
                tabIndex={onStepClick ? 0 : undefined}
              >
                {/* Step Icon */}
                {renderStepIcon(step, index, isActive, isCompleted)}
                
                {/* Step Label */}
                {showLabels && (
                  <div className={`
                    ${alternativeLabel ? 'mt-2 text-center' : 'ml-2'} 
                    ${sizeClasses[size].text}
                    ${isActive ? 'font-medium text-gray-900' : 'text-gray-500'}
                  `}>
                    <div>{step.label}</div>
                    {step.description && (
                      <div className="text-xs text-gray-500">
                        {step.description}
                        {step.optional && <span className="ml-1">(Optional)</span>}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Connector */}
              {index < steps.length - 1 && !alternativeLabel && (
                <div 
                  className={`
                    flex-grow mx-4 ${sizeClasses[size].connector} 
                    ${isCompleted ? 'bg-primary-600' : 'bg-gray-200'}
                  `}
                />
              )}
              
              {/* Alternative Label Connector */}
              {index < steps.length - 1 && alternativeLabel && (
                <div className="w-full flex justify-center my-2">
                  <div 
                    className={`
                      w-16 ${sizeClasses[size].connector} 
                      ${index < activeStep ? 'bg-primary-600' : 'bg-gray-200'}
                    `}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  // Render vertical stepper
  const renderVerticalStepper = () => {
    return (
      <div className={`flex flex-col ${className}`}>
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          const isLast = index === steps.length - 1;
          
          return (
            <div key={step.id} className="flex">
              {/* Step and Connector Column */}
              <div className="flex flex-col items-center">
                {/* Step Icon */}
                <div
                  className={onStepClick ? 'cursor-pointer' : ''}
                  onClick={() => onStepClick && onStepClick(index)}
                  role={onStepClick ? 'button' : undefined}
                  tabIndex={onStepClick ? 0 : undefined}
                >
                  {renderStepIcon(step, index, isActive, isCompleted)}
                </div>
                
                {/* Vertical Connector */}
                {!isLast && (
                  <div 
                    className={`
                      ${sizeClasses[size].verticalConnector} 
                      flex-grow my-1
                      ${isCompleted ? 'bg-primary-600' : 'bg-gray-200'}
                    `}
                  />
                )}
              </div>
              
              {/* Step Content */}
              {showLabels && (
                <div className={sizeClasses[size].verticalSpacing}>
                  <div 
                    className={`
                      ${sizeClasses[size].text}
                      ${isActive ? 'font-medium text-gray-900' : 'text-gray-500'}
                    `}
                  >
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="text-xs text-gray-500 mt-1">
                      {step.description}
                      {step.optional && <span className="ml-1">(Optional)</span>}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return orientation === 'vertical' ? renderVerticalStepper() : renderHorizontalStepper();
}
