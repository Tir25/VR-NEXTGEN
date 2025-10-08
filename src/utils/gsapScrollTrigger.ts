/**
 * GSAP ScrollTrigger Integration Utility
 * 
 * This module provides safe integration of GSAP ScrollTrigger with the unified scroll handler.
 * It ensures compatibility with both GSAP animations and the existing scroll system.
 */

// Dynamic imports for GSAP to avoid SSR issues
let gsap: any = null;
let ScrollTrigger: any = null;

// Type definitions for better type safety
interface ScrollTriggerInstance {
  progress: number;
  direction: number;
  isActive: boolean;
  trigger: Element;
  start: number;
  end: number;
}

interface TimelineInstance {
  to: (target: Element | string, vars: Record<string, unknown>) => TimelineInstance;
  from: (target: Element | string, vars: Record<string, unknown>) => TimelineInstance;
  fromTo: (target: Element | string, fromVars: Record<string, unknown>, toVars: Record<string, unknown>) => TimelineInstance;
  play: () => void;
  pause: () => void;
  reverse: () => void;
}

/**
 * Safely import GSAP and ScrollTrigger
 */
async function initializeGSAP() {
  if (typeof window === 'undefined') return false;
  
  try {
    // Dynamic import to avoid SSR issues
    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');
    
    gsap = gsapModule.default || gsapModule;
    ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    return true;
  } catch (error) {
    console.warn('GSAP ScrollTrigger not available:', error);
    return false;
  }
}

/**
 * GSAP ScrollTrigger Manager
 * Handles integration with the unified scroll system
 */
class ScrollTriggerManager {
  private isInitialized = false;
  private scrollTriggerAvailable = false;
  private refreshTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.initialize();
  }

  /**
   * Initialize GSAP ScrollTrigger
   */
  private async initialize() {
    if (typeof window === 'undefined') return;
    
    this.scrollTriggerAvailable = await initializeGSAP();
    
    if (this.scrollTriggerAvailable) {
      // Configure ScrollTrigger for optimal performance
      ScrollTrigger.config({
        ignoreMobileResize: true,
        syncInterval: 16, // ~60fps
      });
      
      this.isInitialized = true;
    }
  }

  /**
   * Check if ScrollTrigger is available
   */
  isAvailable(): boolean {
    return this.scrollTriggerAvailable && this.isInitialized;
  }

  /**
   * Update ScrollTrigger - call this in every rAF tick
   */
  update() {
    if (this.isAvailable()) {
      try {
        ScrollTrigger.update();
      } catch (error) {
        console.warn('ScrollTrigger update error:', error);
      }
    }
  }

  /**
   * Refresh ScrollTrigger - call this on resize or content changes
   */
  refresh() {
    if (this.isAvailable()) {
      // Debounce refresh calls to avoid excessive updates
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout);
      }
      
      this.refreshTimeout = setTimeout(() => {
        try {
          ScrollTrigger.refresh();
        } catch (error) {
          console.warn('ScrollTrigger refresh error:', error);
        }
      }, 100);
    }
  }

  /**
   * Create a ScrollTrigger animation with unified scroll integration
   */
  createAnimation(config: {
    trigger: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    onUpdate?: (self: ScrollTriggerInstance) => void;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
    animation?: (target: Element) => void;
  }) {
    if (!this.isAvailable()) {
      console.warn('ScrollTrigger not available, skipping animation creation');
      return null;
    }

    try {
      return ScrollTrigger.create({
        trigger: config.trigger,
        start: config.start || 'top center',
        end: config.end || 'bottom center',
        scrub: config.scrub || false,
        onUpdate: config.onUpdate,
        onEnter: config.onEnter,
        onLeave: config.onLeave,
        onEnterBack: config.onEnterBack,
        onLeaveBack: config.onLeaveBack,
        animation: config.animation,
      });
    } catch (error) {
      console.error('ScrollTrigger animation creation error:', error);
      return null;
    }
  }

  /**
   * Create a GSAP timeline with ScrollTrigger integration
   */
  createTimeline(config: {
    trigger: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    onUpdate?: (self: ScrollTriggerInstance) => void;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
    animation?: (tl: TimelineInstance) => void;
  }) {
    if (!this.isAvailable()) {
      console.warn('ScrollTrigger not available, skipping timeline creation');
      return null;
    }

    try {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: config.trigger,
          start: config.start || 'top center',
          end: config.end || 'bottom center',
          scrub: config.scrub || false,
          onUpdate: config.onUpdate,
          onEnter: config.onEnter,
          onLeave: config.onLeave,
          onEnterBack: config.onEnterBack,
          onLeaveBack: config.onLeaveBack,
        }
      });

      // Add animation if provided
      if (config.animation) {
        config.animation(tl);
      }

      return tl;
    } catch (error) {
      console.error('ScrollTrigger timeline creation error:', error);
      return null;
    }
  }

  /**
   * Kill all ScrollTrigger instances
   */
  killAll() {
    if (this.isAvailable()) {
      try {
        ScrollTrigger.killAll();
      } catch (error) {
        console.warn('ScrollTrigger killAll error:', error);
      }
    }
  }

  /**
   * Get ScrollTrigger instance by ID
   */
  getById(id: string) {
    if (!this.isAvailable()) return null;
    
    try {
      return ScrollTrigger.getById(id);
    } catch (error) {
      console.warn('ScrollTrigger getById error:', error);
      return null;
    }
  }
}

// Create singleton instance
const scrollTriggerManager = new ScrollTriggerManager();

/**
 * Hook for using GSAP ScrollTrigger with the unified scroll system
 */
export function useScrollTrigger() {
  return {
    isAvailable: scrollTriggerManager.isAvailable(),
    createAnimation: scrollTriggerManager.createAnimation.bind(scrollTriggerManager),
    createTimeline: scrollTriggerManager.createTimeline.bind(scrollTriggerManager),
    update: scrollTriggerManager.update.bind(scrollTriggerManager),
    refresh: scrollTriggerManager.refresh.bind(scrollTriggerManager),
    killAll: scrollTriggerManager.killAll.bind(scrollTriggerManager),
    getById: scrollTriggerManager.getById.bind(scrollTriggerManager),
  };
}

/**
 * Utility functions for common ScrollTrigger patterns
 */
export const ScrollTriggerUtils = {
  /**
   * Create a fade-in animation
   */
  fadeIn: (element: string | Element, options: {
    duration?: number;
    delay?: number;
    ease?: string;
    trigger?: string | Element;
    start?: string;
    end?: string;
  } = {}) => {
    const {
      duration = 1,
      delay = 0,
      ease = 'power2.out',
      trigger = element,
      start = 'top 80%',
      end = 'bottom 20%',
    } = options;

    return scrollTriggerManager.createTimeline({
      trigger,
      start,
      end,
      animation: (tl: TimelineInstance) => {
        tl.fromTo(element, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration, delay, ease }
        );
      }
    });
  },

  /**
   * Create a slide-in animation
   */
  slideIn: (element: string | Element, direction: 'left' | 'right' | 'up' | 'down' = 'left', options: {
    duration?: number;
    distance?: number;
    ease?: string;
    trigger?: string | Element;
    start?: string;
    end?: string;
  } = {}) => {
    const {
      duration = 1,
      distance = 100,
      ease = 'power2.out',
      trigger = element,
      start = 'top 80%',
      end = 'bottom 20%',
    } = options;

    const transforms = {
      left: { x: -distance, y: 0 },
      right: { x: distance, y: 0 },
      up: { x: 0, y: -distance },
      down: { x: 0, y: distance },
    };

    const transform = transforms[direction];

    return scrollTriggerManager.createTimeline({
      trigger,
      start,
      end,
      animation: (tl: TimelineInstance) => {
        tl.fromTo(element,
          { opacity: 0, ...transform },
          { opacity: 1, x: 0, y: 0, duration, ease }
        );
      }
    });
  },

  /**
   * Create a scale animation
   */
  scaleIn: (element: string | Element, options: {
    duration?: number;
    scale?: number;
    ease?: string;
    trigger?: string | Element;
    start?: string;
    end?: string;
  } = {}) => {
    const {
      duration = 1,
      scale = 0.8,
      ease = 'power2.out',
      trigger = element,
      start = 'top 80%',
      end = 'bottom 20%',
    } = options;

    return scrollTriggerManager.createTimeline({
      trigger,
      start,
      end,
      animation: (tl: TimelineInstance) => {
        tl.fromTo(element,
          { opacity: 0, scale },
          { opacity: 1, scale: 1, duration, ease }
        );
      }
    });
  },

  /**
   * Create a parallax effect
   */
  parallax: (element: string | Element, speed: number = 0.5, options: {
    trigger?: string | Element;
    start?: string;
    end?: string;
  } = {}) => {
    const {
      trigger = element,
      start = 'top bottom',
      end = 'bottom top',
    } = options;

    return scrollTriggerManager.createAnimation({
      trigger,
      start,
      end,
      scrub: true,
      onUpdate: (self: ScrollTriggerInstance) => {
        if (gsap) {
          gsap.set(element, {
            y: self.progress * 100 * speed,
          });
        }
      }
    });
  },
};

/**
 * Initialize ScrollTrigger manager
 */
export function initializeScrollTrigger() {
  return scrollTriggerManager;
}

/**
 * Get the ScrollTrigger manager instance
 */
export function getScrollTriggerManager() {
  return scrollTriggerManager;
}

export default scrollTriggerManager;
