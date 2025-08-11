'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  infiniteLoop?: boolean;
  className?: string;
  slideClassName?: string;
  dotClassName?: string;
  arrowClassName?: string;
  responsive?: {
    breakpoint: number;
    slidesToShow: number;
    slidesToScroll?: number;
  }[];
  slidesToShow?: number;
  slidesToScroll?: number;
  onSlideChange?: (index: number) => void;
  centerMode?: boolean;
  centerPadding?: string;
  swipeable?: boolean;
  draggable?: boolean;
  pauseOnHover?: boolean;
  arrowPrevIcon?: React.ReactNode;
  arrowNextIcon?: React.ReactNode;
}

export default function Carousel({
  children,
  autoPlay = false,
  interval = 3000,
  showDots = true,
  showArrows = true,
  infiniteLoop = true,
  className = '',
  slideClassName = '',
  dotClassName = '',
  arrowClassName = '',
  responsive = [],
  slidesToShow = 1,
  slidesToScroll = 1,
  onSlideChange,
  centerMode = false,
  centerPadding = '50px',
  swipeable = true,
  draggable = true,
  pauseOnHover = true,
  arrowPrevIcon,
  arrowNextIcon,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(slidesToShow);
  const [slidesToMove, setSlidesToMove] = useState(slidesToScroll);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const totalSlides = children.length;
  
  // Calculate the number of visible slides based on responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      
      // Sort responsive breakpoints in descending order
      const sortedBreakpoints = [...responsive].sort((a, b) => b.breakpoint - a.breakpoint);
      
      // Find the first breakpoint that matches the current window width
      const activeBreakpoint = sortedBreakpoints.find(item => windowWidth <= item.breakpoint);
      
      if (activeBreakpoint) {
        setVisibleSlides(activeBreakpoint.slidesToShow);
        setSlidesToMove(activeBreakpoint.slidesToScroll || activeBreakpoint.slidesToShow);
      } else {
        setVisibleSlides(slidesToShow);
        setSlidesToMove(slidesToScroll);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [responsive, slidesToShow, slidesToScroll]);
  
  // Handle auto play
  useEffect(() => {
    if (autoPlay && !isPaused) {
      autoPlayTimerRef.current = setInterval(() => {
        goToNextSlide();
      }, interval);
    }
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [autoPlay, isPaused, currentSlide, interval, totalSlides, visibleSlides, slidesToMove]);
  
  // Handle slide change callback
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentSlide);
    }
  }, [currentSlide, onSlideChange]);
  
  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    let slideIndex = index;
    
    if (infiniteLoop) {
      if (index < 0) {
        slideIndex = totalSlides - visibleSlides;
      } else if (index > totalSlides - visibleSlides) {
        slideIndex = 0;
      }
    } else {
      slideIndex = Math.max(0, Math.min(index, totalSlides - visibleSlides));
    }
    
    setCurrentSlide(slideIndex);
  }, [infiniteLoop, totalSlides, visibleSlides]);
  
  // Go to next slide
  const goToNextSlide = useCallback(() => {
    goToSlide(currentSlide + slidesToMove);
  }, [currentSlide, slidesToMove, goToSlide]);
  
  // Go to previous slide
  const goToPrevSlide = useCallback(() => {
    goToSlide(currentSlide - slidesToMove);
  }, [currentSlide, slidesToMove, goToSlide]);
  
  // Handle mouse enter/leave for pause on hover
  const handleMouseEnter = () => {
    if (pauseOnHover && autoPlay) {
      setIsPaused(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (pauseOnHover && autoPlay) {
      setIsPaused(false);
    }
  };
  
  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!swipeable) return;
    
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swipeable) return;
    
    setTouchEndX(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!swipeable) return;
    
    const diff = touchStartX - touchEndX;
    const threshold = 50; // Minimum distance to be considered a swipe
    
    if (diff > threshold) {
      goToNextSlide();
    } else if (diff < -threshold) {
      goToPrevSlide();
    }
  };
  
  // Handle mouse drag events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return;
    
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
    
    // Prevent text selection during drag
    e.preventDefault();
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggable || !isDragging) return;
    
    const diff = dragStartX - e.clientX;
    setDragOffset(diff);
  };
  
  const handleMouseUp = () => {
    if (!draggable || !isDragging) return;
    
    setIsDragging(false);
    
    const threshold = 50; // Minimum distance to be considered a drag
    
    if (dragOffset > threshold) {
      goToNextSlide();
    } else if (dragOffset < -threshold) {
      goToPrevSlide();
    }
  };
  
  // Handle mouse leave during drag
  const handleDragMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };
  
  // Calculate the transform style for the carousel
  const getTransformStyle = () => {
    if (isDragging) {
      const baseTransform = -(currentSlide * 100) / visibleSlides;
      const dragTransform = (dragOffset / (carouselRef.current?.offsetWidth || 1)) * 100;
      return `translateX(${baseTransform - dragTransform}%)`;
    }
    
    return `translateX(${-(currentSlide * 100) / visibleSlides}%)`;
  };
  
  // Render dots
  const renderDots = () => {
    if (!showDots) return null;
    
    const dots = [];
    const numDots = Math.ceil((totalSlides - visibleSlides + 1) / slidesToMove);
    
    for (let i = 0; i < numDots; i++) {
      const isActive = i * slidesToMove === currentSlide;
      
      dots.push(
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          className={`
            w-2 h-2 rounded-full mx-1 focus:outline-none
            ${isActive ? 'bg-primary-600' : 'bg-gray-300'}
            ${dotClassName}
          `}
          onClick={() => goToSlide(i * slidesToMove)}
        />
      );
    }
    
    return (
      <div className="flex justify-center mt-4">
        {dots}
      </div>
    );
  };
  
  // Render arrows
  const renderArrows = () => {
    if (!showArrows) return null;
    
    const prevDisabled = !infiniteLoop && currentSlide === 0;
    const nextDisabled = !infiniteLoop && currentSlide >= totalSlides - visibleSlides;
    
    return (
      <>
        <button
          type="button"
          className={`
            absolute top-1/2 left-2 -translate-y-1/2 z-10
            p-2 rounded-full bg-white/80 shadow-md
            text-gray-800 hover:bg-white focus:outline-none
            ${prevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary-600'}
            ${arrowClassName}
          `}
          onClick={goToPrevSlide}
          disabled={prevDisabled}
          aria-label="Previous slide"
        >
          {arrowPrevIcon || (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
        <button
          type="button"
          className={`
            absolute top-1/2 right-2 -translate-y-1/2 z-10
            p-2 rounded-full bg-white/80 shadow-md
            text-gray-800 hover:bg-white focus:outline-none
            ${nextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary-600'}
            ${arrowClassName}
          `}
          onClick={goToNextSlide}
          disabled={nextDisabled}
          aria-label="Next slide"
        >
          {arrowNextIcon || (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </>
    );
  };
  
  // Calculate slide width based on visible slides
  const slideWidth = 100 / visibleSlides;
  
  // Calculate center mode padding
  const centerModeStyles = centerMode
    ? {
        paddingLeft: centerPadding,
        paddingRight: centerPadding,
      }
    : {};
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={carouselRef}
        className="relative w-full h-full"
        style={centerModeStyles}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: getTransformStyle(),
            cursor: isDragging ? 'grabbing' : draggable ? 'grab' : 'default',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleDragMouseLeave}
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className={`flex-shrink-0 ${slideClassName}`}
              style={{ width: `${slideWidth}%` }}
              aria-hidden={index < currentSlide || index >= currentSlide + visibleSlides}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      
      {renderArrows()}
      {renderDots()}
    </div>
  );
}
