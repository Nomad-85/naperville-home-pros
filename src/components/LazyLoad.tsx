'use client';

import React, { useEffect, useState, useRef } from 'react';

interface LazyLoadProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  placeholder?: React.ReactNode;
  className?: string;
}

export default function LazyLoad({
  children,
  threshold = 0.1,
  rootMargin = '200px 0px',
  placeholder,
  className = '',
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === 'undefined') {
      // Fallback for browsers that don't support IntersectionObserver
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (isVisible) {
      // Add a small delay to ensure smooth transitions
      const timer = setTimeout(() => {
        setHasLoaded(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div 
      ref={containerRef} 
      className={`transition-opacity duration-500 ${className} ${
        hasLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      aria-busy={!hasLoaded}
    >
      {isVisible ? children : placeholder || <div className="animate-pulse bg-gray-200 h-full w-full min-h-[100px]" />}
    </div>
  );
}
