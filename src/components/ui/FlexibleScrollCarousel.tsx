/**
 * FlexibleScrollCarousel Component
 * Enhanced mobile carousel with flexible positioning and movement options
 */

import React, { forwardRef, useRef, useState, useEffect, memo } from 'react';
import { Industry } from '@/types/components';
import { useInView } from '@/hooks/useInView';
import IndustryCard from '@/components/sections/industries/IndustryCard';

interface FlexibleScrollCarouselProps {
  industries: Industry[];
  className?: string;
  // Flexibility options
  allowFreeScrolling?: boolean;
  allowInfiniteScroll?: boolean;
  snapToCards?: boolean;
  scrollSpeed?: number;
  spacing?: 'tight' | 'normal' | 'loose';
  orientation?: 'vertical' | 'horizontal';
  containerStyle?: React.CSSProperties;
}

const FlexibleScrollCarousel = memo(forwardRef<HTMLDivElement, FlexibleScrollCarouselProps>(
  ({ 
    industries, 
    className = '',
    allowFreeScrolling = true,
    allowInfiniteScroll = true,
    snapToCards = true,
    scrollSpeed = 1,
    spacing = 'normal',
    orientation = 'vertical',
    containerStyle = {}
  }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Spacing configuration
    const spacingConfig = {
      tight: 'space-y-1',
      normal: 'space-y-4',
      loose: 'space-y-8'
    };

    // Orientation configuration
    const orientationConfig = {
      vertical: 'flex-col',
      horizontal: 'flex-row overflow-x-auto space-x-4'
    };

    // Intersection observer for fade-in animations
    const { ref: inViewRef, inView } = useInView<HTMLDivElement>({
      threshold: 0.1,
    });

    // Enhanced scroll handling
    useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container || !allowFreeScrolling) return;

      let isScrolling_ = false;
      let scrollTimeout: NodeJS.Timeout;

      const handleScroll = () => {
        if (!isScrolling_) {
          setIsScrolling(true);
          isScrolling_ = true;
        }

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsScrolling(false);
          isScrolling_ = false;
        }, 150);
      };

      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        container.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      };
    }, [allowFreeScrolling]);

    // Auto-scroll functionality
    useEffect(() => {
      if (!allowInfiniteScroll || !scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const scrollInterval = setInterval(() => {
        if (isScrolling) return; // Don't auto-scroll while user is scrolling

        const scrollAmount = orientation === 'vertical' ? 100 : 200;
        
        if (orientation === 'vertical') {
          container.scrollBy({
            top: scrollAmount * scrollSpeed,
            behavior: 'smooth'
          });
        } else {
          container.scrollBy({
            left: scrollAmount * scrollSpeed,
            behavior: 'smooth'
          });
        }
      }, 3000);

      return () => clearInterval(scrollInterval);
    }, [allowInfiniteScroll, isScrolling, scrollSpeed, orientation]);

    // Snap to cards functionality
    useEffect(() => {
      if (!snapToCards || !scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      
      const handleScrollEnd = () => {
        const containerRect = container.getBoundingClientRect();
        let closestCard = 0;
        let minDistance = Infinity;

        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          
          const cardRect = card.getBoundingClientRect();
          const distance = orientation === 'vertical' 
            ? Math.abs(cardRect.top - containerRect.top)
            : Math.abs(cardRect.left - containerRect.left);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestCard = index;
          }
        });

        setCurrentIndex(closestCard);
      };

      let scrollTimeout: NodeJS.Timeout;
      const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScrollEnd, 150);
      };

      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        container.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      };
    }, [snapToCards, orientation]);

    const cards = industries.map((industry, index) => (
      <div
        key={industry.id}
        ref={(el: HTMLDivElement | null) => {
          if (el) cardRefs.current[index] = el;
        }}
        className={`group relative transition-all duration-500 transform-gpu hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,215,0,0.25)] active:scale-[1.02] active:shadow-[0_0_20px_rgba(255,215,0,0.25)] opacity-0 translate-y-8 w-full cursor-pointer ${
          inView ? 'animate-fade-in-up' : ''
        }`}
        style={{
          width: orientation === 'horizontal' ? 'clamp(300px, 80vw, 400px)' : '100%',
          minHeight: 'clamp(400px, 85vh, 500px)',
          marginBottom: orientation === 'vertical' ? '0.5rem' : '0',
          marginRight: orientation === 'horizontal' ? '1rem' : '0',
          maxWidth: '100%',
          perspective: '1000px',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          flexShrink: 0
        }}
        onClick={() => {
          // Handle card interaction
          // Card clicked
        }}
      >
        <IndustryCard 
          industry={industry} 
          isActive={index === currentIndex}
          index={index}
        />
      </div>
    ));

    return (
      <section
        className={`bg-transparent text-white relative ${className}`}
        ref={ref}
        style={{
          width: '100%',
          minHeight: 'auto',
          padding: '0',
          marginTop: '0',
          marginBottom: '0',
          ...containerStyle
        }}
      >
        <div 
          ref={scrollContainerRef}
          className={`relative w-full max-w-full mx-auto px-4 sm:px-6 pb-8 ${
            orientation === 'horizontal' ? 'overflow-x-auto overflow-y-hidden' : 'overflow-y-auto overflow-x-hidden'
          }`}
          style={{
            height: orientation === 'vertical' ? '70vh' : 'auto',
            scrollBehavior: 'smooth'
          }}
        >
          <div 
            ref={inViewRef}
            className={`flex ${orientationConfig[orientation]} ${spacingConfig[spacing]} w-full`}
            style={{
              minHeight: orientation === 'vertical' ? 'auto' : '400px'
            }}
          >
            {cards}
          </div>
        </div>
        
        <style jsx>{`
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Custom scrollbar styling */
          div::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          div::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }

          div::-webkit-scrollbar-thumb {
            background: rgba(255, 215, 0, 0.3);
            border-radius: 4px;
          }

          div::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 215, 0, 0.5);
          }

          /* Smooth scrolling for Firefox */
          div {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 215, 0, 0.3) rgba(255, 255, 255, 0.1);
          }
        `}</style>
      </section>
    );
  }
));

FlexibleScrollCarousel.displayName = 'FlexibleScrollCarousel';

export default FlexibleScrollCarousel;
