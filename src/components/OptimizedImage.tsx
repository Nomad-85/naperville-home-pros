'use client';

import React from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
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
}: OptimizedImageProps) {
  // Handle external URLs vs local images
  const isExternal = src.startsWith('http');
  
  // Default placeholder blur for better LCP
  const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdgJCIEHr+AAAAABJRU5ErkJggg==';
  
  return (
    <div className={`relative ${className}`} style={{ overflow: 'hidden' }}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : (width || 800)}
        height={fill ? undefined : (height || 600)}
        className={`${fill ? 'object-' + objectFit : ''}`}
        priority={priority}
        sizes={sizes}
        fill={fill}
        placeholder="blur"
        blurDataURL={blurDataURL}
        loading={priority ? 'eager' : 'lazy'}
        style={{ 
          maxWidth: '100%',
          height: fill ? '100%' : 'auto',
          objectFit: objectFit
        }}
        unoptimized={isExternal}
      />
    </div>
  );
}
