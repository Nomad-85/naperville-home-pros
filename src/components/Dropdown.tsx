'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface DropdownItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  divider?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  width?: string;
  className?: string;
  menuClassName?: string;
  itemClassName?: string;
  closeOnClick?: boolean;
}

export default function Dropdown({
  trigger,
  items,
  align = 'left',
  width = '200px',
  className = '',
  menuClassName = '',
  itemClassName = '',
  closeOnClick = true,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuId = useRef(`dropdown-menu-${Math.random().toString(36).substring(2, 9)}`);
  const triggerId = useRef(`dropdown-trigger-${Math.random().toString(36).substring(2, 9)}`);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown when pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      
      const menuElement = document.getElementById(menuId.current);
      if (!menuElement) return;
      
      const focusableElements = Array.from(
        menuElement.querySelectorAll('a, button:not([disabled])')
      ) as HTMLElement[];
      
      if (focusableElements.length === 0) return;
      
      const currentIndex = focusableElements.findIndex(el => el === document.activeElement);
      let nextIndex;
      
      if (event.key === 'ArrowDown') {
        nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
      }
      
      focusableElements[nextIndex].focus();
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle item click
  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;
    
    if (item.onClick) {
      item.onClick();
    }
    
    if (closeOnClick) {
      setIsOpen(false);
    }
  };

  // Alignment classes
  const alignmentClasses = {
    left: 'left-0',
    right: 'right-0',
  };

  return (
    <div 
      className={`relative inline-block text-left ${className}`}
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger */}
      <div>
        {React.isValidElement(trigger) ? (
          React.cloneElement(trigger as React.ReactElement, {
            onClick: toggleDropdown,
            'aria-expanded': isOpen,
            'aria-haspopup': true,
            'aria-controls': menuId.current,
            id: triggerId.current,
            ...((trigger as React.ReactElement).props || {}),
          })
        ) : (
          <button
            type="button"
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-controls={menuId.current}
            id={triggerId.current}
            className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {trigger}
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id={menuId.current}
          className={`origin-top-right absolute z-50 mt-2 ${alignmentClasses[align]} rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${menuClassName}`}
          style={{ width }}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={triggerId.current}
        >
          <div className="py-1" role="none">
            {items.map((item, index) => {
              if (item.divider) {
                return <div key={`divider-${index}`} className="border-t border-gray-100 my-1" role="separator" />;
              }

              const itemContent = (
                <div className="flex items-center">
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  <span>{item.label}</span>
                </div>
              );

              const baseItemClasses = `
                block w-full text-left px-4 py-2 text-sm
                ${item.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                ${itemClassName}
              `;

              if (item.href && !item.disabled) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={baseItemClasses}
                    role="menuitem"
                    onClick={() => closeOnClick && setIsOpen(false)}
                  >
                    {itemContent}
                  </a>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  className={baseItemClasses}
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  role="menuitem"
                >
                  {itemContent}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
