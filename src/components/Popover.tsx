'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end';
  showArrow?: boolean;
  className?: string;
  contentClassName?: string;
  triggerClassName?: string;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  disabled?: boolean;
}

export default function Popover({
  trigger,
  content,
  position = 'bottom',
  showArrow = true,
  className = '',
  contentClassName = '',
  triggerClassName = '',
  closeOnClickOutside = true,
  closeOnEscape = true,
  isOpen: controlledIsOpen,
  onOpenChange,
  disabled = false,
}: PopoverProps) {
  // State for uncontrolled component
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;
  
  // Refs for DOM elements
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  
  // Handle state changes
  const setOpen = (open: boolean) => {
    if (!isControlled) {
      setUncontrolledIsOpen(open);
    }
    if (onOpenChange) {
      onOpenChange(open);
    }
  };
  
  // Toggle popover
  const togglePopover = () => {
    if (disabled) return;
    setOpen(!isOpen);
  };
  
  // Close popover
  const closePopover = () => {
    setOpen(false);
  };
  
  // Position classes
  const getPositionClasses = () => {
    const positions = {
      'top': 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      'top-start': 'bottom-full left-0 mb-2',
      'top-end': 'bottom-full right-0 mb-2',
      'right': 'left-full top-1/2 transform -translate-y-1/2 ml-2',
      'right-start': 'left-full top-0 ml-2',
      'right-end': 'left-full bottom-0 ml-2',
      'bottom': 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      'bottom-start': 'top-full left-0 mt-2',
      'bottom-end': 'top-full right-0 mt-2',
      'left': 'right-full top-1/2 transform -translate-y-1/2 mr-2',
      'left-start': 'right-full top-0 mr-2',
      'left-end': 'right-full bottom-0 mr-2',
    };
    
    return positions[position];
  };
  
  // Arrow position classes
  const getArrowPositionClasses = () => {
    const arrowPositions = {
      'top': 'bottom-[-8px] left-1/2 transform -translate-x-1/2 rotate-45',
      'top-start': 'bottom-[-8px] left-4 rotate-45',
      'top-end': 'bottom-[-8px] right-4 rotate-45',
      'right': 'left-[-8px] top-1/2 transform -translate-y-1/2 rotate-45',
      'right-start': 'left-[-8px] top-4 rotate-45',
      'right-end': 'left-[-8px] bottom-4 rotate-45',
      'bottom': 'top-[-8px] left-1/2 transform -translate-x-1/2 rotate-45',
      'bottom-start': 'top-[-8px] left-4 rotate-45',
      'bottom-end': 'top-[-8px] right-4 rotate-45',
      'left': 'right-[-8px] top-1/2 transform -translate-y-1/2 rotate-45',
      'left-start': 'right-[-8px] top-4 rotate-45',
      'left-end': 'right-[-8px] bottom-4 rotate-45',
    };
    
    return arrowPositions[position];
  };
  
  // Handle click outside
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current && 
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current && 
        !triggerRef.current.contains(event.target as Node)
      ) {
        closePopover();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeOnClickOutside]);
  
  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopover();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, closeOnEscape]);
  
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={togglePopover}
        className={`${triggerClassName} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
      </div>
      
      {/* Content */}
      {isOpen && (
        <div
          ref={contentRef}
          className={`
            absolute z-50 min-w-[200px]
            bg-white rounded-lg shadow-lg border border-gray-200
            p-4 animate-fadeIn
            ${getPositionClasses()}
            ${contentClassName}
          `}
          role="tooltip"
        >
          {/* Arrow */}
          {showArrow && (
            <div
              ref={arrowRef}
              className={`
                absolute w-4 h-4 bg-white border border-gray-200
                transform rotate-45 -z-10
                ${getArrowPositionClasses()}
              `}
              aria-hidden="true"
            />
          )}
          
          {content}
        </div>
      )}
    </div>
  );
}
