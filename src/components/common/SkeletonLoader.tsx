import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
  animation?: 'pulse' | 'wave' | 'none';
}

/**
 * SkeletonLoader Component
 * Provides loading placeholders for better user experience
 */
export default function SkeletonLoader({ 
  className = '', 
  width, 
  height, 
  variant = 'rectangular',
  animation = 'pulse'
}: SkeletonLoaderProps) {
  const baseClasses = 'bg-gray-200 animate-pulse';
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse',
    none: ''
  };

  const variantClasses = {
    text: 'rounded',
    rectangular: 'rounded',
    circular: 'rounded-full',
    card: 'rounded-lg'
  };

  const style = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height })
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

/**
 * Service Card Skeleton
 */
export function ServiceCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-white/90 to-gray-50 border border-gray-200 rounded-2xl p-8">
      <div className="space-y-6">
        {/* Icon */}
        <SkeletonLoader variant="circular" width={64} height={64} />
        
        {/* Title */}
        <div className="space-y-2">
          <SkeletonLoader variant="text" height={24} width="80%" />
          <SkeletonLoader variant="text" height={16} width="60%" />
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <SkeletonLoader variant="text" height={16} width="100%" />
          <SkeletonLoader variant="text" height={16} width="90%" />
          <SkeletonLoader variant="text" height={16} width="70%" />
        </div>
        
        {/* Features */}
        <div className="space-y-3">
          <SkeletonLoader variant="text" height={14} width="30%" />
          <div className="space-y-2">
            <SkeletonLoader variant="text" height={14} width="85%" />
            <SkeletonLoader variant="text" height={14} width="75%" />
            <SkeletonLoader variant="text" height={14} width="90%" />
            <SkeletonLoader variant="text" height={14} width="65%" />
          </div>
        </div>
        
        {/* CTA */}
        <div className="pt-4 border-t border-gray-200">
          <SkeletonLoader variant="text" height={20} width="40%" />
        </div>
      </div>
    </div>
  );
}

/**
 * Industry Card Skeleton
 */
export function IndustryCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-white/90 to-gray-50 border border-gray-200 rounded-2xl p-8">
      <div className="space-y-6">
        {/* Icon */}
        <SkeletonLoader variant="circular" width={64} height={64} />
        
        {/* Title */}
        <div className="space-y-2">
          <SkeletonLoader variant="text" height={24} width="85%" />
          <SkeletonLoader variant="text" height={16} width="55%" />
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <SkeletonLoader variant="text" height={16} width="100%" />
          <SkeletonLoader variant="text" height={16} width="95%" />
          <SkeletonLoader variant="text" height={16} width="80%" />
        </div>
        
        {/* Focus Areas */}
        <div className="space-y-3">
          <SkeletonLoader variant="text" height={14} width="25%" />
          <div className="space-y-2">
            <SkeletonLoader variant="text" height={14} width="80%" />
            <SkeletonLoader variant="text" height={14} width="70%" />
            <SkeletonLoader variant="text" height={14} width="85%" />
            <SkeletonLoader variant="text" height={14} width="60%" />
          </div>
        </div>
        
        {/* CTA */}
        <div className="pt-4 border-t border-gray-200">
          <SkeletonLoader variant="text" height={20} width="45%" />
        </div>
      </div>
    </div>
  );
}

/**
 * Grid Skeleton for multiple cards
 */
export function GridSkeleton({ 
  count = 6, 
  variant = 'service' 
}: { 
  count?: number; 
  variant?: 'service' | 'industry';
}) {
  const SkeletonComponent = variant === 'service' ? ServiceCardSkeleton : IndustryCardSkeleton;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </div>
  );
}

/**
 * Hero Section Skeleton
 */
export function HeroSkeleton() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-20 relative z-10">
        <div className="flex items-center justify-center">
          <div className="space-y-8 text-center max-w-4xl">
            {/* Badge */}
            <SkeletonLoader variant="rectangular" height={40} width={200} className="mx-auto rounded-full" />
            
            {/* Title */}
            <div className="space-y-6">
              <SkeletonLoader variant="text" height={60} width="300px" className="mx-auto" />
              <SkeletonLoader variant="text" height={24} width="600px" className="mx-auto" />
            </div>
            
            {/* Key Solutions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3 p-3">
                  <SkeletonLoader variant="circular" width={32} height={32} />
                  <SkeletonLoader variant="text" height={16} width="80%" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
