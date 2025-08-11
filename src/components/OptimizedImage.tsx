'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type ObjectFitType = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  objectFit?: ObjectFitType;
  fallbackSrc?: string;
  aspectRatio?: string;
  rounded?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '100vw',
  fill = false,
  objectFit = 'cover',
  fallbackSrc = '/static/placeholders/listing.jpg',
  aspectRatio = '16/9',
  rounded = true,
}: OptimizedImageProps) {
  // Handle external URLs vs local images
  const isExternal = src && src.startsWith('http');
  
  // Default placeholder blur for better LCP
  const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdgJCIEHr+AAAAABJRU5ErkJggg==';
  
  // Handle missing or broken image URLs
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  
  // Handle image error
  const handleImageError = () => {
    setImgSrc(fallbackSrc);
  };
  
  // Explicitly handle the fill prop to avoid TypeScript errors
  const fillProp = fill === true ? true : undefined;
  
  // Handle object-fit style
  const imageStyle: React.CSSProperties = {
    maxWidth: '100%',
    height: fill ? '100%' : 'auto',
    objectFit: objectFit as any
  };
  
  return (
    <div 
      className={`relative ${className} ${rounded ? 'rounded-lg overflow-hidden' : ''}`}
      style={{ aspectRatio: fill ? undefined : aspectRatio }}
    >
      <Image
        src={imgSrc}
        alt={alt}
        width={fill ? undefined : (width || 800)}
        height={fill ? undefined : (height || 600)}
        className={`${fill ? 'object-' + objectFit : ''} ${rounded ? 'rounded-lg' : ''} transition-opacity duration-300`}
        priority={priority}
        sizes={sizes}
        fill={fillProp}
        placeholder="blur"
        blurDataURL={blurDataURL}
        loading={priority ? 'eager' : 'lazy'}
        style={imageStyle}
        unoptimized={isExternal}
        onError={handleImageError}
      />
    </div>
  );
}
