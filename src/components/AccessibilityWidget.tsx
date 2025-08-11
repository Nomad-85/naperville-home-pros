'use client';

import { useState } from 'react';

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [contrast, setContrast] = useState('default');

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const increaseFontSize = () => {
    if (fontSize < 1.5) {
      const newSize = fontSize + 0.1;
      setFontSize(newSize);
      document.documentElement.style.setProperty('--font-size-multiplier', newSize.toString());
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 0.8) {
      const newSize = fontSize - 0.1;
      setFontSize(newSize);
      document.documentElement.style.setProperty('--font-size-multiplier', newSize.toString());
    }
  };

  const resetFontSize = () => {
    setFontSize(1);
    document.documentElement.style.setProperty('--font-size-multiplier', '1');
  };

  const toggleHighContrast = () => {
    if (contrast === 'default') {
      setContrast('high');
      document.body.classList.add('high-contrast');
    } else {
      setContrast('default');
      document.body.classList.remove('high-contrast');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleWidget}
        aria-expanded={isOpen}
        aria-label="Accessibility options"
        className="bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white p-4 rounded-lg shadow-xl border border-gray-200 w-64">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Accessibility Options</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Text Size</h4>
              <div className="flex items-center space-x-2">
                <button
                  onClick={decreaseFontSize}
                  aria-label="Decrease font size"
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button
                  onClick={resetFontSize}
                  aria-label="Reset font size"
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs"
                >
                  Reset
                </button>
                <button
                  onClick={increaseFontSize}
                  aria-label="Increase font size"
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Display</h4>
              <button
                onClick={toggleHighContrast}
                className={`w-full py-2 px-3 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  contrast === 'high' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {contrast === 'high' ? 'Disable' : 'Enable'} High Contrast
              </button>
            </div>
          </div>
          
          <button
            onClick={toggleWidget}
            className="mt-4 w-full py-2 px-3 bg-gray-200 text-gray-800 rounded text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
