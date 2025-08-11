import React, { useState, useEffect } from 'react';

interface AnnouncementProps {
  message: string;
  type?: 'info' | 'warning' | 'success' | 'error';
  dismissible?: boolean;
  expiryDays?: number;
  id: string;
  link?: {
    text: string;
    href: string;
  };
}

/**
 * Announcement component for site-wide messages
 * Supports different message types, dismissal with local storage persistence,
 * and optional expiration
 */
const Announcement: React.FC<AnnouncementProps> = ({
  message,
  type = 'info',
  dismissible = true,
  expiryDays = 7,
  id,
  link
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  
  // Check if announcement was previously dismissed
  useEffect(() => {
    const checkDismissed = () => {
      if (typeof window === 'undefined') return true; // SSR check
      
      try {
        const dismissedAnnouncements = JSON.parse(
          localStorage.getItem('dismissedAnnouncements') || '{}'
        );
        
        if (dismissedAnnouncements[id]) {
          const dismissedDate = new Date(dismissedAnnouncements[id]);
          const expiryDate = new Date();
          expiryDate.setDate(dismissedDate.getDate() + expiryDays);
          
          // If the expiry date has passed, show the announcement again
          if (new Date() > expiryDate) {
            return true;
          }
          
          return false;
        }
        
        return true;
      } catch (error) {
        console.error('Error checking dismissed announcements:', error);
        return true;
      }
    };
    
    setIsVisible(checkDismissed());
  }, [id, expiryDays]);
  
  // Handle dismissal
  const handleDismiss = () => {
    if (typeof window === 'undefined') return; // SSR check
    
    try {
      const dismissedAnnouncements = JSON.parse(
        localStorage.getItem('dismissedAnnouncements') || '{}'
      );
      
      dismissedAnnouncements[id] = new Date().toISOString();
      
      localStorage.setItem(
        'dismissedAnnouncements',
        JSON.stringify(dismissedAnnouncements)
      );
      
      setIsVisible(false);
    } catch (error) {
      console.error('Error saving dismissed announcement:', error);
    }
  };
  
  // Background and text colors based on type
  const getStyles = () => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'success':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'info':
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`announcement-banner border-t border-b py-3 px-4 ${getStyles()}`}
      role="alert"
      aria-live="polite"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Icon based on type */}
          {type === 'info' && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          )}
          {type === 'warning' && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {type === 'success' && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {type === 'error' && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          
          <span className="font-medium">{message}</span>
          
          {link && (
            <a 
              href={link.href}
              className="underline font-medium hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-2"
            >
              {link.text}
            </a>
          )}
        </div>
        
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="ml-auto flex-shrink-0 p-1 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Dismiss announcement"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Announcement;
