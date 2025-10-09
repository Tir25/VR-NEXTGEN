/**
 * LazyImage Component
 * A reusable component for lazy-loading and optimizing images with Next.js
 */

import React, { useState, useCallback } from 'react';
import Image, { ImageProps } from 'next/image';
import { useInView } from '@/hooks/useInView';

interface LazyImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  fallbackSrc?: string;
  loadingClassName?: string;
  containerClassName?: string;
  showLoadingIndicator?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  loadingClassName = 'animate-pulse bg-gray-300',
  containerClassName = '',
  showLoadingIndicator = false,
  onLoad,
  onError,
  className = '',
  priority = false,
  ...rest
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>({ 
    threshold: 0.1,
    rootMargin: '200px' // Start loading 200px before the image is visible
  });
  
  // Use a callback ref to handle the ref assignment
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (node !== null && inViewRef.current !== node) {
      inViewRef.current = node;
    }
  }, [inViewRef]);

  // Handle image load completion
  const handleLoadingComplete = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // Handle image load error
  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden ${containerClassName}`}
      style={{ width: typeof width === 'number' ? `${width}px` : width, height: typeof height === 'number' ? `${height}px` : height }}
    >
      {/* Loading placeholder */}
      {!isLoaded && showLoadingIndicator && (
        <div 
          className={`absolute inset-0 ${loadingClassName}`} 
          aria-hidden="true"
        />
      )}
      
      {/* Image */}
      {(inView || priority) && (
        <Image
          src={hasError && fallbackSrc ? fallbackSrc : src}
          alt={alt}
          width={typeof width === 'number' ? width : undefined}
          height={typeof height === 'number' ? height : undefined}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          onLoadingComplete={handleLoadingComplete}
          onError={handleError}
          priority={priority}
          {...rest}
        />
      )}
    </div>
  );
}
