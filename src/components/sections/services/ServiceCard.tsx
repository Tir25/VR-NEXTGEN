/**
 * ServiceCard Component
 * Individual service card with enhanced visual hierarchy, 3D effects, and interactive engagement
 */

import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { use3DTilt } from '@/hooks/use3DTilt';
import { useInView } from '@/hooks/useInView';
import { Service } from './types';

interface ServiceCardProps {
  service: Service;
  index: number;
  isVisible: boolean;
}

export default function ServiceCard({ service, isVisible }: ServiceCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLElement>(null);
  const { cardRef: tiltRef, onMouseMove, onMouseLeave } = use3DTilt();
  const { ref: viewRef } = useInView({ threshold: 0.1 });

  const handleLearnMore = () => {
    router.push(`/services/${service.id}`);
  };

  // Combine refs for both hooks - Fixed ref assignment
  const combinedRef = (node: HTMLElement | null) => {
    if (node) {
      tiltRef.current = node as HTMLDivElement;
      viewRef.current = node;
      cardRef.current = node;
    }
  };

  return (
    <article
      ref={combinedRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`group relative border border-gray-700 rounded-xl p-6 overflow-hidden focus-within:ring-2 focus-within:ring-gold/50 focus-within:ring-offset-2 card-3d ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform, box-shadow',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        height: '100%'
      }}
      role="article"
      aria-labelledby={`service-title-${service.id}`}
      tabIndex={0}
    >
      {/* Background image layer */}
      {service.bgUrl && (
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
          style={{ backgroundImage: `url('${service.bgUrl}')` }}
        />
      )}
      {/* Readability overlay with hover easing */}
      <div className="absolute inset-0 -z-0 bg-black/60 transition-colors duration-300 group-hover:bg-black/40" />
      {/* Glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(255,215,0,0.35)]" />
      
      {/* Visual Hierarchy: Icon with enhanced styling */}
      <div className="flex justify-center mb-6">
        <div
          className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/30 text-gold transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:from-gold/30 group-hover:to-gold/40 shadow-[0_0_18px_rgba(255,215,0,0.45)] ring-2 ring-gold/30 md:ring-gold/20 animate-pulse md:animate-none"
          aria-hidden
        >
          {/* Subtle shimmer overlay for mobile visibility */}
          <span
            className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.35),transparent_60%)] opacity-80 md:opacity-0"
          />
          {service.icon}
        </div>
      </div>
      
      {/* Information Organization: Clear content structure */}
      <div className="space-y-4">
        <h3 
          id={`service-title-${service.id}`}
          className="text-xl font-semibold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] transition-colors duration-300 group-hover:text-gold"
        >
          {service.title}
        </h3>
        
        <p className="text-white/90 leading-relaxed text-sm md:text-base italic drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
          {service.description}
        </p>
        
        {/* Scannable Layout: Feature list with visual indicators */}
        <ul className="space-y-2">
          {service.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center gap-2 text-sm text-white/85 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              <span className="w-4 h-4 flex items-center justify-center rounded-full bg-gold/20 text-gold text-xs font-bold flex-shrink-0 transition-all duration-300 group-hover:scale-110">
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>
        
        {/* Call-to-Action Integration: Enhanced button with micro-interactions */}
            <button 
              onClick={handleLearnMore}
              className="w-full mt-6 px-4 py-2 text-sm font-medium bg-transparent border border-gold/50 text-gold rounded-lg transition-all duration-300 hover:bg-gold hover:text-black hover:border-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] focus:ring-2 focus:ring-gold/50 focus:outline-none group/btn relative overflow-hidden"
              aria-label={`Learn more about ${service.title}`}
            >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Learn More
            <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
          {/* Button background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
      
          {/* Premium Feel: Gradient overlays and shadows */}
          <div className="absolute inset-0 rounded-xl pointer-events-none bg-gold opacity-0 group-hover:opacity-5 active:opacity-5 transition-opacity duration-300" />
          <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-br from-gold/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
}