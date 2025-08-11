'use client';

import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showBackground?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  items, 
  className = '',
  showBackground = false 
}) => {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`py-3 md:py-4 mb-2 ${showBackground ? 'bg-gray-50 px-4 rounded-lg' : ''} ${className} animate-fadeIn`}
    >
      <ol className="flex flex-wrap items-center space-x-1 md:space-x-2 text-sm md:text-base text-gray-600 overflow-x-auto scrollbar-hide">
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && (
              <li className="flex items-center">
                <svg
                  className="w-3 h-3 mx-1 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </li>
            )}
            <li>
              {item.isCurrent ? (
                <span className="font-medium text-gray-900 md:font-semibold truncate max-w-[200px] md:max-w-xs flex-shrink-0" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-primary-600 hover:text-primary-500 hover:underline transition-colors truncate max-w-[150px] md:max-w-xs inline-block flex-shrink-0"
                >
                  {item.label}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
