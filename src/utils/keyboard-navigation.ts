/**
 * Keyboard navigation utilities
 * Enhances accessibility by providing keyboard navigation helpers
 */

/**
 * Initialize keyboard navigation detection
 * Adds/removes 'user-is-tabbing' class to body based on input method
 * @returns Cleanup function to remove event listeners
 */
export function initKeyboardNavigation(): () => void {
  if (typeof window === 'undefined') return () => {};
  
  // Add keyboard navigation detection
  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
    }
  };
  
  const handleMouseDown = () => {
    document.body.classList.remove('user-is-tabbing');
  };
  
  window.addEventListener('keydown', handleTabKey);
  window.addEventListener('mousedown', handleMouseDown);
  
  // Add cleanup function for component unmounting
  return () => {
    window.removeEventListener('keydown', handleTabKey);
    window.removeEventListener('mousedown', handleMouseDown);
  };
}

/**
 * Focus first element in container that matches selector
 * @param containerId - ID of the container element
 * @param selector - CSS selector for focusable elements
 */
export function focusFirstElement(containerId: string, selector = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])') {
  if (typeof window === 'undefined') return;
  
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const focusableElements = container.querySelectorAll<HTMLElement>(selector);
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
}

/**
 * Handle arrow key navigation for elements like menus
 * @param event - Keyboard event
 * @param elements - NodeList or array of HTMLElements to navigate between
 * @param currentIndex - Current focused element index
 * @param orientation - Navigation orientation ('horizontal' or 'vertical')
 * @returns - New index after navigation
 */
export function handleArrowKeyNavigation(
  event: KeyboardEvent,
  elements: NodeListOf<HTMLElement> | HTMLElement[],
  currentIndex: number,
  orientation: 'horizontal' | 'vertical' = 'vertical'
): number {
  const elementArray = Array.from(elements);
  const count = elementArray.length;
  if (count === 0) return currentIndex;
  
  let newIndex = currentIndex;
  
  // Handle arrow key navigation based on orientation
  if (orientation === 'horizontal') {
    if (event.key === 'ArrowRight') {
      newIndex = (currentIndex + 1) % count;
    } else if (event.key === 'ArrowLeft') {
      newIndex = (currentIndex - 1 + count) % count;
    }
  } else {
    if (event.key === 'ArrowDown') {
      newIndex = (currentIndex + 1) % count;
    } else if (event.key === 'ArrowUp') {
      newIndex = (currentIndex - 1 + count) % count;
    }
  }
  
  // Focus the new element
  if (newIndex !== currentIndex) {
    elementArray[newIndex].focus();
    event.preventDefault(); // Prevent page scrolling
  }
  
  return newIndex;
}

/**
 * Create an accessible announcement for screen readers
 * @param message - Message to announce
 * @param priority - Announcement priority ('polite' or 'assertive')
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  if (typeof window === 'undefined') return;
  
  // Create or get the announcement element
  let announcer = document.getElementById('sr-announcer');
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'sr-announcer';
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.classList.add('sr-only'); // Screen reader only
    document.body.appendChild(announcer);
  } else {
    announcer.setAttribute('aria-live', priority);
  }
  
  // Clear previous announcement and set new one
  announcer.textContent = '';
  setTimeout(() => {
    announcer.textContent = message;
  }, 50);
}
