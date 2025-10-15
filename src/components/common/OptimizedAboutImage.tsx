/**
 * OptimizedAboutImage Component
 * High-performance image component for the About Us section with advanced optimizations
 */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedAboutImageProps {
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

// Generate a more efficient blur placeholder
function generateOptimizedBlurDataURL(): string {
  return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTFhMWEiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzJhMmEyYSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzFhMWExYSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=";
}

export default function OptimizedAboutImage({
  alt,
  width = 600,
  height = 600,
  className = '',
  priority = false,
}: OptimizedAboutImageProps) {
  const [imageSrc, setImageSrc] = useState<string>('/images-optimized/About.png');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Progressive enhancement: try WebP first, fallback to PNG
  useEffect(() => {
    const checkWebPSupport = async () => {
      if (typeof window !== 'undefined') {
        try {
          // Check if WebP is supported
          const webpSupported = await new Promise<boolean>((resolve) => {
            const webP = new window.Image();
            webP.onload = webP.onerror = () => {
              resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
          });

          if (webpSupported) {
            // WebP is supported, use the optimized version
            setImageSrc('/images-optimized/About.webp');
          } else {
            // Fallback to PNG
            setImageSrc('/images-optimized/About.png');
          }
        } catch (error) {
          // Fallback to PNG if WebP check fails
          setImageSrc('/images-optimized/About.png');
        }
      }
    };

    checkWebPSupport();
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    // Fallback to original PNG
    setImageSrc('/About.png');
  };

  // If there's an error, show fallback
  if (hasError) {
    return (
      <Image
        src="/About.png"
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
        onLoad={handleLoad}
        onError={handleError}
      />
    );
  }

  return (
    <div className={`relative ${className || ''}`}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse rounded-lg" />
      )}
      
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-all duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
        placeholder="blur"
        blurDataURL={generateOptimizedBlurDataURL()}
        onLoad={handleLoad}
        onError={handleError}
        // Performance optimizations
        style={{
          willChange: isLoading ? 'opacity' : 'auto',
        }}
      />
    </div>
  );
}
