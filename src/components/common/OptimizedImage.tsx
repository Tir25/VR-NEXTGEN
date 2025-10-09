/**
 * OptimizedImage Component
 * Automatically serves the best image format (AVIF > WebP > fallback)
 * with responsive sizing and lazy loading
 */

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Get optimized image path based on browser support
 */
function getOptimizedImagePath(originalPath: string): string {
  // If it's already an optimized path, return as is
  if (originalPath.includes('images-optimized') || originalPath.includes('icons-optimized')) {
    return originalPath;
  }
  
  // Convert original path to optimized path
  const pathParts = originalPath.split('/');
  const filename = pathParts[pathParts.length - 1];
  const dir = pathParts.slice(0, -1).join('/');
  
  const basename = filename.replace(/\.[^/.]+$/, '');
  
  if (dir === '/images') {
    return `/images-optimized/${basename}.webp`;
  } else if (dir === '/images/Industries') {
    return `/images-optimized/Industries/${basename}.webp`;
  } else if (dir === '/images/Our Services') {
    return `/images-optimized/Our Services/${basename}.webp`;
  } else if (dir === '/images/logo-Final-png.svg') {
    return '/icons-optimized/vr-logo-md.webp';
  }
  
  return originalPath;
}

/**
 * Get AVIF version of image path
 */
function getAvifImagePath(originalPath: string): string {
  const webpPath = getOptimizedImagePath(originalPath);
  return webpPath.replace('.webp', '.avif');
}

/**
 * OptimizedImage Component
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  quality = 85,
  fill = false,
  style,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Get optimized image paths
  const webpSrc = getOptimizedImagePath(src);
  const avifSrc = getAvifImagePath(src);

  // Check for AVIF support
  useEffect(() => {
    const checkAvifSupport = async () => {
      if (typeof window === 'undefined') return;
      
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          const avifDataURL = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEAwgMgkfAAAADHEAAAAA';
          
          const img = new window.Image();
          img.onload = () => {
            setImageSrc(avifSrc);
          };
          img.onerror = () => {
            setImageSrc(webpSrc);
          };
          img.src = avifDataURL;
        } else {
          setImageSrc(webpSrc);
        }
      } catch (error) {
        setImageSrc(webpSrc);
      }
    };

    checkAvifSupport();
  }, [avifSrc, webpSrc]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    // Fallback to original image
    setImageSrc(src);
    onError?.();
  };

  // If there's an error, show fallback
  if (hasError) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
        quality={quality}
        fill={fill}
        style={style}
        onLoad={handleLoad}
        onError={handleError}
      />
    );
  }

  return (
    <div className={`relative ${className || ''}`} style={style}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      
      <Image
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        quality={quality}
        fill={fill}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
}

/**
 * Background Image Component with optimization
 */
interface OptimizedBackgroundImageProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function OptimizedBackgroundImage({
  src,
  className = '',
  style = {},
  children,
}: OptimizedBackgroundImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src);

  useEffect(() => {
    const webpSrc = getOptimizedImagePath(src);
    const avifSrc = getAvifImagePath(src);

    // Check for AVIF support
    const checkAvifSupport = async () => {
      if (typeof window === 'undefined') {
        setImageSrc(webpSrc);
        return;
      }
      
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          const avifDataURL = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEAwgMgkfAAAADHEAAAAA';
          
          const img = new window.Image();
          img.onload = () => setImageSrc(avifSrc);
          img.onerror = () => setImageSrc(webpSrc);
          img.src = avifDataURL;
        } else {
          setImageSrc(webpSrc);
        }
      } catch (error) {
        setImageSrc(webpSrc);
      }
    };

    checkAvifSupport();
  }, [src]);

  return (
    <div
      className={`bg-cover bg-center bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url('${imageSrc}')`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}