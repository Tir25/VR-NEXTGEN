/**
 * HeroImage Component
 * Optimized hero image with scroll fade effects
 */

import React from 'react';
import Image from 'next/image';
import { useScrollFade } from '@/hooks/useScrollFade';
import { HERO_IMAGE_CONFIG } from './constants';

export default function HeroImage() {
  const { opacity, isVisible } = useScrollFade();

  return (
    <div 
      className="absolute inset-x-0 w-full h-full flex items-center justify-center z-10 transition-opacity duration-500 ease-out"
      style={{ 
        opacity: opacity,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
        <div className="w-full h-full relative max-w-full">
        <Image
          src={HERO_IMAGE_CONFIG.src}
          alt={HERO_IMAGE_CONFIG.alt}
          fill
          className="object-cover object-top"
          priority={HERO_IMAGE_CONFIG.priority}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 100vw"
          quality={HERO_IMAGE_CONFIG.quality}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          style={{
            filter: 'brightness(0.85) contrast(1.15) saturate(1.1)',
            mixBlendMode: 'normal'
          }}
        />
      </div>
    </div>
  );
}
