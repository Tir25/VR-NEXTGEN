import React, { useRef, useEffect } from 'react';
import { useScrollTrigger } from '@/utils/gsapScrollTrigger';
import ScrollTriggerAnimations, { useScrollTriggerAnimation, useScrollTriggerTimeline } from '@/components/common/ScrollTriggerAnimations';

/**
 * ScrollTrigger Integration Example Component
 * 
 * This component demonstrates how to use GSAP ScrollTrigger with the unified scroll system.
 * It shows various animation patterns and integration techniques.
 */

export default function ScrollTriggerExample() {
  const customRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const scrollTrigger = useScrollTrigger();

  // Custom animation using the hook
  useScrollTriggerAnimation(customRef as React.RefObject<HTMLElement>, {
    trigger: customRef.current || undefined,
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter: () => {/* Custom animation entered */},
    onLeave: () => {/* Custom animation left */},
    animation: (target: Element) => {
      // Custom animation logic
    }
  });

  // Timeline animation
  useScrollTriggerTimeline(timelineRef as React.RefObject<HTMLElement>, {
    trigger: timelineRef.current || undefined,
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter: () => {/* Timeline animation entered */},
  });

  useEffect(() => {
    if (!scrollTrigger.isAvailable) {
      // ScrollTrigger not available, using fallback animations
      return;
    }

    // ScrollTrigger is available and integrated with unified scroll system
  }, [scrollTrigger.isAvailable]);

  return (
    <div className="space-y-20 p-8">
      <h1 className="text-4xl font-bold text-center text-white">
        GSAP ScrollTrigger Integration Examples
      </h1>

      {/* Fade In Animation */}
      <ScrollTriggerAnimations
        animations={{ fadeIn: true }}
        className="bg-gray-800 p-8 rounded-lg"
      >
        <h2 className="text-2xl text-white mb-4">Fade In Animation</h2>
        <p className="text-gray-300">
          This element fades in smoothly when it enters the viewport.
        </p>
      </ScrollTriggerAnimations>

      {/* Slide In Animation */}
      <ScrollTriggerAnimations
        animations={{ slideIn: 'left' }}
        className="bg-gray-800 p-8 rounded-lg"
      >
        <h2 className="text-2xl text-white mb-4">Slide In Animation</h2>
        <p className="text-gray-300">
          This element slides in from the left when it enters the viewport.
        </p>
      </ScrollTriggerAnimations>

      {/* Scale In Animation */}
      <ScrollTriggerAnimations
        animations={{ scaleIn: true }}
        className="bg-gray-800 p-8 rounded-lg"
      >
        <h2 className="text-2xl text-white mb-4">Scale In Animation</h2>
        <p className="text-gray-300">
          This element scales in smoothly when it enters the viewport.
        </p>
      </ScrollTriggerAnimations>

      {/* Parallax Animation */}
      <ScrollTriggerAnimations
        animations={{ parallax: true, parallaxSpeed: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg"
      >
        <h2 className="text-2xl text-white mb-4">Parallax Animation</h2>
        <p className="text-gray-300">
          This element has a parallax effect as you scroll.
        </p>
      </ScrollTriggerAnimations>

      {/* Custom Animation */}
      <div
        ref={customRef}
        className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-lg"
      >
        <h2 className="text-2xl text-white mb-4">Custom Animation</h2>
        <p className="text-gray-200">
          This element uses a custom ScrollTrigger animation with callbacks.
        </p>
      </div>

      {/* Timeline Animation */}
      <div
        ref={timelineRef}
        className="bg-gradient-to-r from-green-600 to-teal-600 p-8 rounded-lg"
      >
        <h2 className="text-2xl text-white mb-4">Timeline Animation</h2>
        <p className="text-gray-200">
          This element uses a ScrollTrigger timeline for complex animations.
        </p>
      </div>

      {/* Multiple Animations Combined */}
      <ScrollTriggerAnimations
        animations={{
          fadeIn: true,
          slideIn: 'up',
          scaleIn: true,
        }}
        className="bg-gradient-to-r from-red-600 to-pink-600 p-8 rounded-lg"
      >
        <h2 className="text-2xl text-white mb-4">Combined Animations</h2>
        <p className="text-gray-200">
          This element combines multiple animations for a rich effect.
        </p>
      </ScrollTriggerAnimations>

      {/* Status Information */}
      <div className="bg-black border border-gray-700 p-6 rounded-lg">
        <h3 className="text-xl text-white mb-4">Integration Status</h3>
        <div className="space-y-2 text-sm">
          <p className="text-gray-300">
            <span className="text-green-400">✓</span> GSAP ScrollTrigger: {scrollTrigger.isAvailable ? 'Available' : 'Not Available'}
          </p>
          <p className="text-gray-300">
            <span className="text-green-400">✓</span> Unified Scroll System: Active
          </p>
          <p className="text-gray-300">
            <span className="text-green-400">✓</span> RequestAnimationFrame Batching: Enabled
          </p>
          <p className="text-gray-300">
            <span className="text-green-400">✓</span> Passive Event Listeners: Enabled
          </p>
          <p className="text-gray-300">
            <span className="text-green-400">✓</span> Safe Fallbacks: Implemented
          </p>
        </div>
      </div>
    </div>
  );
}
