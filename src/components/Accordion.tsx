'use client';

import React, { useState, useRef, useEffect } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  id: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ 
  title, 
  children, 
  defaultOpen = false,
  id 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>(defaultOpen ? 'auto' : 0);
  
  useEffect(() => {
    if (isOpen) {
      const contentEl = contentRef.current;
      if (contentEl) {
        // Set to actual height first for animation
        setHeight(contentEl.scrollHeight);
        // Then set to auto after animation completes to handle dynamic content
        setTimeout(() => {
          if (isOpen) {
            setHeight('auto');
          }
        }, 300);
      }
    } else {
      // Set to actual height first before animating to 0
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
        setTimeout(() => {
          setHeight(0);
        }, 0);
      } else {
        setHeight(0);
      }
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const headingId = `accordion-heading-${id}`;
  const contentId = `accordion-content-${id}`;

  return (
    <div className="border-b border-gray-200">
      <h3>
        <button
          id={headingId}
          aria-expanded={isOpen}
          aria-controls={contentId}
          className={`flex justify-between items-center w-full py-4 px-2 text-left text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${isOpen ? 'font-medium' : ''}`}
          onClick={toggleAccordion}
        >
          <span className="text-lg">{title}</span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={headingId}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: height === 'auto' ? 'auto' : `${height}px` }}
      >
        <div ref={contentRef} className="pb-4 px-2">
          {children}
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: {
    id: string;
    title: string;
    content: React.ReactNode;
    defaultOpen?: boolean;
  }[];
  allowMultiple?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState<string[]>(
    items.filter(item => item.defaultOpen).map(item => item.id)
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(id) 
          ? prev.filter(itemId => itemId !== id) 
          : [...prev, id]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(id) ? [] : [id]
      );
    }
  };

  return (
    <div className="border-t border-gray-200 rounded-md">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          defaultOpen={openItems.includes(item.id)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export { Accordion, AccordionItem };
