'use client';

import React, { useState, useRef, useEffect } from 'react';
import KeyboardNavigation from './KeyboardNavigation';

interface TabProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className="tab-content">{children}</div>;
};

interface TabsProps {
  tabs: {
    id: string;
    label: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
  }[];
  defaultTabId?: string;
  ariaLabel?: string;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  tabContentClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  ariaLabel = 'Content Tabs',
  className = '',
  tabClassName = '',
  activeTabClassName = '',
  tabContentClassName = '',
}) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id || '');
  const tabsRef = useRef<HTMLDivElement>(null);

  // Generate unique IDs for accessibility
  const tabsId = useRef(`tabs-${Math.random().toString(36).substring(2, 9)}`);
  
  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTabId(tabId);
    }
  };

  // Focus management - focus the active tab when it changes
  useEffect(() => {
    if (tabsRef.current) {
      const activeTabButton = tabsRef.current.querySelector(`[id="${tabsId.current}-tab-${activeTabId}"]`) as HTMLElement;
      if (activeTabButton) {
        activeTabButton.focus();
      }
    }
  }, [activeTabId]);

  return (
    <div className={`tabs-container ${className}`}>
      <KeyboardNavigation selector="[role='tab']">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label={ariaLabel}
          className="flex border-b border-gray-200 mb-4 overflow-x-auto scrollbar-hide"
        >
          {tabs.map((tab) => {
            const isActive = activeTabId === tab.id;
            const tabId = `${tabsId.current}-tab-${tab.id}`;
            const panelId = `${tabsId.current}-panel-${tab.id}`;
            
            return (
              <button
                key={tab.id}
                id={tabId}
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabClick(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                className={`
                  px-5 py-3 font-medium text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 whitespace-nowrap
                  ${isActive 
                    ? `text-primary-600 border-b-2 border-primary-600 ${activeTabClassName}` 
                    : `text-gray-600 hover:text-primary-500 hover:border-gray-300 ${tabClassName}`
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  {tab.icon && <span className="tab-icon">{tab.icon}</span>}
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </KeyboardNavigation>

      <div className={`tab-panels ${tabContentClassName}`}>
        {tabs.map((tab) => {
          const isActive = activeTabId === tab.id;
          const tabId = `${tabsId.current}-tab-${tab.id}`;
          const panelId = `${tabsId.current}-panel-${tab.id}`;
          
          return (
            <div
              key={tab.id}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={!isActive}
              tabIndex={0}
              className={`focus:outline-none animate-fadeIn ${isActive ? 'block' : 'hidden'}`}
            >
              {tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};
