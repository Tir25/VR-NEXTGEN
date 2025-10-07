/**
 * OptimizedImage Component
 * A wrapper around Next.js Image component with automatic optimization
 */

import Image from 'next/image';
import { useState, ReactNode } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  fill?: boolean;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  fallback?: ReactNode;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 85,
  className = '',
  style,
  placeholder = 'empty',
  blurDataURL,
  fill = false,
  sizes,
  loading = 'lazy',
  onLoad,
  onError,
  fallback,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // Generate a simple blur placeholder if not provided
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className={`relative ${className}`} style={style}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ width: width || '100%', height: height || '100%' }}
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        sizes={sizes}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          objectFit: 'cover',
          ...style,
        }}
      />
    </div>
  );
}

// Preset configurations for common use cases
export const HeroImage = ({ src, alt, ...props }: Omit<OptimizedImageProps, 'priority' | 'quality'>) => (
  <OptimizedImage
    src={src}
    alt={alt}
    priority
    quality={90}
    sizes="100vw"
    {...props}
  />
);

export const CardImage = ({ src, alt, ...props }: Omit<OptimizedImageProps, 'quality' | 'sizes'>) => (
  <OptimizedImage
    src={src}
    alt={alt}
    quality={80}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    {...props}
  />
);

export const IconImage = ({ src, alt, ...props }: Omit<OptimizedImageProps, 'quality' | 'sizes'>) => (
  <OptimizedImage
    src={src}
    alt={alt}
    quality={70}
    sizes="(max-width: 768px) 64px, 96px"
    {...props}
  />
);
