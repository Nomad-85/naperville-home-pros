/**
 * Client-side providers wrapper component
 * Used to initialize client-side only features like accessibility testing
 */

'use client';

import { useEffect } from 'react';
import { initAxe } from '@/utils/axe-helper';
import { initKeyboardNavigation } from '@/utils/keyboard-navigation';

// Define props interface with proper React types
type ProvidersProps = {
  children: React.ReactNode;
};

/**
 * Providers component that initializes accessibility testing and keyboard navigation
 * This component should wrap the entire application in layout.tsx
 */
export function Providers({ children }: ProvidersProps) {
  // Initialize accessibility features on client-side only
  useEffect(() => {
    // Initialize axe-core for accessibility testing in development
    initAxe();
    
    // Initialize keyboard navigation detection
    const cleanupKeyboardNavigation = initKeyboardNavigation();
    
    // Create screen reader announcer element for accessibility announcements
    if (typeof document !== 'undefined') {
      const srAnnouncer = document.createElement('div');
      srAnnouncer.id = 'sr-announcer';
      srAnnouncer.setAttribute('aria-live', 'polite');
      srAnnouncer.setAttribute('aria-atomic', 'true');
      srAnnouncer.classList.add('sr-only');
      
      // Hide visually but keep available to screen readers
      Object.assign(srAnnouncer.style, {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0'
      });
      
      document.body.appendChild(srAnnouncer);
      
      // Return cleanup function
      return () => {
        // Clean up keyboard navigation
        if (typeof cleanupKeyboardNavigation === 'function') {
          cleanupKeyboardNavigation();
        }
        
        // Remove screen reader announcer
        if (srAnnouncer.parentNode) {
          srAnnouncer.parentNode.removeChild(srAnnouncer);
        }
      };
    }
    
    // Fallback cleanup function if document is not available
    return () => {
      if (typeof cleanupKeyboardNavigation === 'function') {
        cleanupKeyboardNavigation();
      }
    };
  }, []);
  
  // Simply render children without additional wrapper elements
  return <>{children}</>;
}
