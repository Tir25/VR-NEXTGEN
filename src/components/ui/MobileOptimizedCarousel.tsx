/**
 * MobileOptimizedCarousel Component
 * A mobile-first carousel implementation optimized for touch devices
 * with improved performance and battery life considerations.
 */

import React, { useMemo, useCallback, useEffect, useState } from 'react';
import UnifiedCarousel from './UnifiedCarousel';
import type { CarouselItem, CarouselConfig } from '@/types/carousel';
import { debounce } from '@/utils/debounce';
import { DELAYS, ANIMATION_DURATIONS } from '@/utils/performanceConstants';

interface MobileOptimizedCarouselProps {
  items: CarouselItem[];
  className?: string;
  onItemSelect?: (item: CarouselItem, index: number) => void;
  onIndexChange?: (index: number) => void;
}

const MobileOptimizedCarousel: React.FC<MobileOptimizedCarouselProps> = ({
  items,
  className = '',
  onItemSelect,
  onIndexChange,
}) => {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  // Get viewport dimensions
  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    const debouncedUpdateViewport = debounce(updateViewport, DELAYS.DEBOUNCE_RESIZE);
    window.addEventListener('resize', debouncedUpdateViewport, { passive: true });
    return () => window.removeEventListener('resize', debouncedUpdateViewport);
  }, []);

  const { width } = viewport;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  // Detect low-end devices
  useEffect(() => {
    const checkDeviceCapabilities = () => {
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;
      const connection = (navigator as unknown as { connection?: { effectiveType?: string } }).connection;
      
      const isLowEnd = 
        hardwareConcurrency < 4 || 
        memory < 4 || 
        (connection && connection.effectiveType === '2g') ||
        width < 480;
      
      setIsLowEndDevice(isLowEnd);
    };

    checkDeviceCapabilities();
    const debouncedCheckDevice = debounce(checkDeviceCapabilities, DELAYS.DEBOUNCE_RESIZE);
    window.addEventListener('resize', debouncedCheckDevice, { passive: true });
    
    return () => window.removeEventListener('resize', debouncedCheckDevice);
  }, [width]);

  // Mobile-optimized configuration
  const carouselConfig: CarouselConfig = useMemo(() => {
    const baseConfig: CarouselConfig = {
      autoRotate: false, // Disabled on mobile for better UX
      autoRotateInterval: 6000,
      pauseOnHover: false, // Not applicable on mobile
      pauseOnFocus: true,
      enableKeyboard: !isMobile, // Disable on mobile
      enableTouch: true,
      enableMouse: false, // Disable on mobile
      swipeThreshold: isLowEndDevice ? 30 : 50,
      animationDuration: isLowEndDevice ? ANIMATION_DURATIONS.NORMAL : ANIMATION_DURATIONS.SLOW,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      enableSmoothScrolling: !isLowEndDevice,
      itemsPerView: 1,
      spacing: isMobile ? 16 : 24,
      centerMode: true,
      announceChanges: true,
      ariaLabel: 'Mobile carousel',
      ariaLive: 'polite',
    };

    // Adjust for different screen sizes
    if (width < 480) {
      baseConfig.spacing = 12;
      baseConfig.animationDuration = 150;
    } else if (width < 768) {
      baseConfig.spacing = 16;
        baseConfig.animationDuration = ANIMATION_DURATIONS.NORMAL;
    }

    return baseConfig;
  }, [isMobile, isLowEndDevice, width]);

  // Optimize items for mobile
  const optimizedItems = useMemo(() => {
    return items.map(item => ({
      ...item,
      content: React.isValidElement(item.content) 
        ? React.cloneElement(item.content, {
            // Add mobile-specific props if needed
            'data-mobile-optimized': true,
          } as any)
        : item.content,
    }));
  }, [items]);

  // Handle item selection with mobile optimizations
  const handleItemSelect = useCallback((item: CarouselItem, index: number) => {
    // Add haptic feedback on supported devices
    if ('vibrate' in navigator && navigator.vibrate) {
      navigator.vibrate(10);
    }
    
    onItemSelect?.(item, index);
  }, [onItemSelect]);

  // Handle index changes with performance tracking
  const handleIndexChange = useCallback((index: number) => {
    // Track carousel usage for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'carousel_navigation', {
        event_category: 'mobile_interaction',
        event_label: `item_${index}`,
        value: index,
      });
    }
    
    onIndexChange?.(index);
  }, [onIndexChange]);

  // Add mobile-specific CSS classes
  const mobileClasses = useMemo(() => {
    const classes = ['mobile-optimized-carousel'];
    
    if (isMobile) classes.push('mobile-device');
    if (isTablet) classes.push('tablet-device');
    if (isLowEndDevice) classes.push('low-end-device');
    if (width < 480) classes.push('small-screen');
    
    return classes.join(' ');
  }, [isMobile, isTablet, isLowEndDevice, width]);

  return (
    <div className={`${mobileClasses} ${className}`}>
      <UnifiedCarousel
        items={optimizedItems}
        config={carouselConfig}
        onItemSelect={handleItemSelect}
        onIndexChange={handleIndexChange}
        className="mobile-carousel"
      />
    </div>
  );
};

export default MobileOptimizedCarousel;
