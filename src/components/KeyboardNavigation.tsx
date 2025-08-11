import React, { useEffect } from 'react';

interface KeyboardNavigationProps {
  selector: string;
  onEscape?: () => void;
  loop?: boolean;
  enabled?: boolean;
  children: React.ReactNode;
}

/**
 * KeyboardNavigation component to enhance keyboard accessibility
 * Manages focus navigation between elements matching the provided selector
 */
const KeyboardNavigation: React.FC<KeyboardNavigationProps> = ({
  selector,
  onEscape,
  loop = true,
  enabled = true,
  children
}) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard navigation when this component is in focus
      const container = document.activeElement?.closest('[data-keyboard-nav]');
      if (!container) return;

      const elements = Array.from(
        container.querySelectorAll(selector)
      ).filter(el => 
        // Filter for focusable elements that are visible
        el instanceof HTMLElement && 
        !el.disabled && 
        el.style.display !== 'none' && 
        el.style.visibility !== 'hidden'
      ) as HTMLElement[];

      if (elements.length === 0) return;

      const currentIndex = elements.findIndex(el => el === document.activeElement);

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          if (currentIndex === -1 || currentIndex === elements.length - 1) {
            // If at the end or not in the list, focus the first element
            if (loop || currentIndex === -1) {
              elements[0].focus();
            }
          } else {
            // Focus the next element
            elements[currentIndex + 1].focus();
          }
          break;

        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          if (currentIndex === -1 || currentIndex === 0) {
            // If at the beginning or not in the list, focus the last element
            if (loop) {
              elements[elements.length - 1].focus();
            }
          } else {
            // Focus the previous element
            elements[currentIndex - 1].focus();
          }
          break;

        case 'Home':
          e.preventDefault();
          // Focus the first element
          elements[0].focus();
          break;

        case 'End':
          e.preventDefault();
          // Focus the last element
          elements[elements.length - 1].focus();
          break;

        case 'Escape':
          if (onEscape) {
            e.preventDefault();
            onEscape();
          }
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selector, onEscape, loop, enabled]);

  return (
    <div data-keyboard-nav="true">
      {children}
    </div>
  );
};

export default KeyboardNavigation;
