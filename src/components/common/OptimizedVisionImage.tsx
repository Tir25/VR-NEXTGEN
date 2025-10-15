import Image from 'next/image';
import { useState } from 'react';

interface OptimizedVisionImageProps {
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * Optimized Vision Image Component
 * Automatically serves the best format based on browser support
 */
export default function OptimizedVisionImage({
  alt = "VR NextGen Solutions Vision - Transforming Data into Actionable Intelligence",
  width = 600,
  height = 600,
  className = "w-full h-auto object-cover",
  priority = false
}: OptimizedVisionImageProps) {
  const [imageError, setImageError] = useState(false);
  
  if (imageError) {
    // Fallback to optimized PNG if modern formats fail
    return (
      <Image
        src="/images-optimized/Vision-optimized.png"
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
      />
    );
  }
  
  return (
    <picture>
      {/* AVIF format - best compression, modern browsers */}
      <source
        srcSet="/images-optimized/Vision.avif"
        type="image/avif"
        onError={() => setImageError(true)}
      />
      
      {/* WebP format - good compression, wide support */}
      <source
        srcSet="/images-optimized/Vision.webp"
        type="image/webp"
        onError={() => setImageError(true)}
      />
      
      {/* Fallback to optimized PNG */}
      <Image
        src="/images-optimized/Vision-optimized.png"
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        onError={() => setImageError(true)}
      />
    </picture>
  );
}
