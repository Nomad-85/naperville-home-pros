'use client';

import React, { useEffect, useRef } from 'react';

interface FocusTrapProps {
  children: React.ReactNode;
  isActive: boolean;
  focusFirst?: boolean;
  returnFocusRef?: React.RefObject<HTMLElement>;
  onEscape?: () => void;
}

export default function FocusTrap({
  children,
  isActive,
  focusFirst = true,
  returnFocusRef,
  onEscape,
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive) {
      // Store the element that had focus before the trap was activated
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus the first focusable element if focusFirst is true
      if (focusFirst) {
        setTimeout(() => {
          focusFirstElement();
        }, 50);
      }
    } else if (previousFocusRef.current || returnFocusRef?.current) {
      // Return focus to the element that had focus before the trap was activated
      // or to the specified returnFocusRef element
      const elementToFocus = returnFocusRef?.current || previousFocusRef.current;
      elementToFocus?.focus();
    }
  }, [isActive, focusFirst, returnFocusRef]);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onEscape) {
        onEscape();
        return;
      }

      if (event.key === 'Tab') {
        // Get all focusable elements within the container
        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        // If shift + tab is pressed and the active element is the first focusable element,
        // focus the last focusable element
        if (event.shiftKey && document.activeElement === focusableElements[0]) {
          event.preventDefault();
          focusableElements[focusableElements.length - 1].focus();
          return;
        }

        // If tab is pressed and the active element is the last focusable element,
        // focus the first focusable element
        if (
          !event.shiftKey &&
          document.activeElement === focusableElements[focusableElements.length - 1]
        ) {
          event.preventDefault();
          focusableElements[0].focus();
          return;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, onEscape]);

  const getFocusableElements = () => {
    if (!containerRef.current) return [];

    // Get all focusable elements within the container
    const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    // Filter out elements that are not visible or disabled
    return Array.from(focusableElements).filter(
      (element) =>
        !element.hasAttribute('disabled') &&
        element.getAttribute('tabindex') !== '-1' &&
        element.offsetWidth > 0 &&
        element.offsetHeight > 0
    );
  };

  const focusFirstElement = () => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else if (containerRef.current) {
      // If there are no focusable elements, focus the container itself
      containerRef.current.setAttribute('tabindex', '-1');
      containerRef.current.focus();
    }
  };

  return (
    <div ref={containerRef} style={{ outline: 'none' }}>
      {children}
    </div>
  );
}
