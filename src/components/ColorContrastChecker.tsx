'use client';

import React, { useState, useEffect } from 'react';

interface ColorContrastCheckerProps {
  foregroundColor: string;
  backgroundColor: string;
  fontSize?: number;
  isBold?: boolean;
}

/**
 * Component to check and display color contrast ratio for accessibility
 * Based on WCAG 2.1 guidelines
 */
const ColorContrastChecker: React.FC<ColorContrastCheckerProps> = ({
  foregroundColor,
  backgroundColor,
  fontSize = 16,
  isBold = false
}) => {
  const [contrastRatio, setContrastRatio] = useState<number>(0);
  const [wcagAA, setWcagAA] = useState<boolean>(false);
  const [wcagAAA, setWcagAAA] = useState<boolean>(false);
  
  useEffect(() => {
    // Calculate contrast ratio when colors change
    const ratio = calculateContrastRatio(foregroundColor, backgroundColor);
    setContrastRatio(ratio);
    
    // Determine if the contrast meets WCAG standards
    const isLargeText = fontSize >= 18 || (fontSize >= 14 && isBold);
    
    // WCAG 2.1 AA requires 4.5:1 for normal text and 3:1 for large text
    setWcagAA(isLargeText ? ratio >= 3 : ratio >= 4.5);
    
    // WCAG 2.1 AAA requires 7:1 for normal text and 4.5:1 for large text
    setWcagAAA(isLargeText ? ratio >= 4.5 : ratio >= 7);
  }, [foregroundColor, backgroundColor, fontSize, isBold]);
  
  /**
   * Convert hex color to RGB
   */
  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    // Remove # if present
    hex = hex.replace(/^#/, '');
    
    // Parse hex values
    if (hex.length === 3) {
      // Convert 3-digit hex to 6-digit
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  };
  
  /**
   * Calculate relative luminance of a color
   * Formula from WCAG 2.1: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
   */
  const calculateLuminance = (color: string): number => {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;
    
    // Convert RGB to sRGB
    const sRGB = {
      r: rgb.r / 255,
      g: rgb.g / 255,
      b: rgb.b / 255
    };
    
    // Calculate luminance
    const luminance = {
      r: sRGB.r <= 0.03928 ? sRGB.r / 12.92 : Math.pow((sRGB.r + 0.055) / 1.055, 2.4),
      g: sRGB.g <= 0.03928 ? sRGB.g / 12.92 : Math.pow((sRGB.g + 0.055) / 1.055, 2.4),
      b: sRGB.b <= 0.03928 ? sRGB.b / 12.92 : Math.pow((sRGB.b + 0.055) / 1.055, 2.4)
    };
    
    return 0.2126 * luminance.r + 0.7152 * luminance.g + 0.0722 * luminance.b;
  };
  
  /**
   * Calculate contrast ratio between two colors
   * Formula from WCAG 2.1: https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
   */
  const calculateContrastRatio = (foreground: string, background: string): number => {
    const foregroundLuminance = calculateLuminance(foreground);
    const backgroundLuminance = calculateLuminance(background);
    
    // Calculate contrast ratio
    const lighter = Math.max(foregroundLuminance, backgroundLuminance);
    const darker = Math.min(foregroundLuminance, backgroundLuminance);
    
    return (lighter + 0.05) / (darker + 0.05);
  };
  
  return (
    <div className="color-contrast-checker p-4 border rounded-md">
      <div 
        className="preview-box p-3 mb-3 text-center rounded"
        style={{ 
          backgroundColor: backgroundColor, 
          color: foregroundColor,
          fontSize: `${fontSize}px`,
          fontWeight: isBold ? 'bold' : 'normal'
        }}
      >
        Sample Text
      </div>
      
      <div className="results">
        <p className="font-medium">Contrast Ratio: {contrastRatio.toFixed(2)}:1</p>
        
        <div className="wcag-results mt-2">
          <div className="flex items-center">
            <span className={`inline-block w-4 h-4 rounded-full mr-2 ${wcagAA ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>WCAG AA: {wcagAA ? 'Pass' : 'Fail'}</span>
          </div>
          
          <div className="flex items-center mt-1">
            <span className={`inline-block w-4 h-4 rounded-full mr-2 ${wcagAAA ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>WCAG AAA: {wcagAAA ? 'Pass' : 'Fail'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorContrastChecker;
