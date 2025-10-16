/**
 * OptimizedWhatWeDoImage Component
 * Optimized image component for the "What We Do" section
 */

import React from 'react';
import Image from 'next/image';

interface OptimizedWhatWeDoImageProps {
  alt?: string;
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
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export default function OptimizedWhatWeDoImage({
  alt = "VR NextGEN Solutions - What We Do - Data-Driven Business Transformation",
  width = 600,
  height = 600,
  className = "",
  priority = false,
  sizes,
  quality = 85,
  fill = false,
  style,
  onLoad,
  onError,
  placeholder = 'blur',
  blurDataURL,
}: OptimizedWhatWeDoImageProps) {
  // Generate a simple blur placeholder
  const defaultBlurDataURL = blurDataURL || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

  return (
    <div className={`relative ${className}`} style={style}>
      <Image
        src="/images-optimized/What-we-do.webp"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes || (fill ? '100vw' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw')}
        quality={quality}
        fill={fill}
        placeholder={placeholder}
        blurDataURL={placeholder === 'blur' ? defaultBlurDataURL : undefined}
        onLoad={onLoad}
        onError={onError}
        className="transition-opacity duration-300"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </div>
  );
}
