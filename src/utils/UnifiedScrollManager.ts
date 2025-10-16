/**
 * Optimized Scroll Manager
 * Lightweight, high-performance scroll management system
 * - Single scroll event listener with RAF throttling
 * - Minimal memory footprint
 * - Simplified API for common use cases
 */

export interface ScrollEvent {
  scrollY: number;
  scrollX: number;
  deltaY: number;
  deltaX: number;
  direction: 'up' | 'down' | 'left' | 'right' | null;
  velocity: number;
  timestamp: number;
  viewportHeight: number;
  viewportWidth: number;
}

interface ScrollHandler {
  id: string;
  handler: (event: ScrollEvent) => void;
  throttle?: number;
  active: boolean;
}

class OptimizedScrollManager {
  private handlers: Map<string, ScrollHandler> = new Map();
  private isActive: boolean = false;
  private rafId: number | null = null;
  private lastScrollY: number = 0;
  private lastScrollX: number = 0;
  private lastTimestamp: number = 0;
  private pendingEvent: ScrollEvent | null = null;

  constructor() {
    this.handleScroll = this.handleScroll.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.processScroll = this.processScroll.bind(this);
  }

  register(
    id: string,
    handler: (event: ScrollEvent) => void,
    throttle: number = 16
  ): () => void {
    if (this.handlers.has(id)) {
      this.unregister(id);
    }

    const scrollHandler: ScrollHandler = {
      id,
      handler: this.throttle(handler, throttle),
      throttle,
      active: true,
    };

    this.handlers.set(id, scrollHandler);
    this.startIfNeeded();

    return () => this.unregister(id);
  }

  unregister(id: string): void {
    this.handlers.delete(id);
    this.stopIfNeeded();
  }

  private startIfNeeded(): void {
    if (!this.isActive && this.handlers.size > 0) {
      this.start();
    }
  }

  private stopIfNeeded(): void {
    if (this.isActive && this.handlers.size === 0) {
      this.stop();
    }
  }

  private start(): void {
    if (this.isActive) return;

    this.isActive = true;
    this.lastScrollY = window.scrollY;
    this.lastScrollX = window.scrollX;
    this.lastTimestamp = performance.now();

    // Use passive listeners for better scroll performance
    window.addEventListener('scroll', this.handleScroll, { 
      passive: true, 
      capture: false 
    });
    
    // Add wheel event listener for better performance on desktop
    window.addEventListener('wheel', this.handleWheel, { 
      passive: true, 
      capture: false 
    });
    
    this.startRafLoop();
  }

  private stop(): void {
    if (!this.isActive) return;

    this.isActive = false;
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('wheel', this.handleWheel);

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private handleScroll(): void {
    if (!this.isActive) return;

    const currentScrollY = window.scrollY;
    const currentScrollX = window.scrollX;
    const currentTimestamp = performance.now();

    const deltaY = currentScrollY - this.lastScrollY;
    const deltaX = currentScrollX - this.lastScrollX;
    const deltaTime = currentTimestamp - this.lastTimestamp;

    // Skip processing if scroll delta is too small (micro-scrolls)
    if (Math.abs(deltaY) < 1 && Math.abs(deltaX) < 1) {
      return;
    }

    let direction: ScrollEvent['direction'] = null;
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      direction = deltaY > 0 ? 'down' : 'up';
    } else if (Math.abs(deltaX) > 0) {
      direction = deltaX > 0 ? 'right' : 'left';
    }

    const velocity = deltaTime > 0 ? Math.abs(deltaY) / (deltaTime / 1000) : 0;

    const scrollEvent: ScrollEvent = {
      scrollY: currentScrollY,
      scrollX: currentScrollX,
      deltaY,
      deltaX,
      direction,
      velocity,
      timestamp: currentTimestamp,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
    };

    this.pendingEvent = scrollEvent;
    this.lastScrollY = currentScrollY;
    this.lastScrollX = currentScrollX;
    this.lastTimestamp = currentTimestamp;
  }

  private handleWheel(): void {
    if (!this.isActive) return;
    
    // Wheel events are handled by the scroll event, this is just for optimization
    // The wheel event helps with smoother scrolling on desktop
  }

  private startRafLoop(): void {
    if (!this.isActive) return;

    const rafLoop = () => {
      if (!this.isActive) return;

      if (this.pendingEvent) {
        this.processScroll(this.pendingEvent);
        this.pendingEvent = null;
      }

      this.rafId = requestAnimationFrame(rafLoop);
    };

    this.rafId = requestAnimationFrame(rafLoop);
  }

  private processScroll(event: ScrollEvent): void {
    const activeHandlers = Array.from(this.handlers.values()).filter(h => h.active);
    
    activeHandlers.forEach(({ handler, id }) => {
      try {
        handler(event);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`Scroll handler ${id} error:`, error);
        }
      }
    });
  }

  private throttle<T extends (...args: any[]) => any>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout | null = null;
    let previous = 0;
    
    return ((...args: any[]) => {
      const now = Date.now();
      const remaining = wait - (now - previous);
      
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        return func(...args);
      } else if (!timeout) {
        timeout = setTimeout(() => {
          previous = Date.now();
          timeout = null;
          func(...args);
        }, remaining);
      }
    }) as T;
  }

  destroy(): void {
    this.stop();
    this.handlers.clear();
  }
}

// Create global optimized scroll manager instance
const optimizedScrollManager = new OptimizedScrollManager();

/**
 * Get the optimized scroll manager instance
 */
export function getOptimizedScrollManager(): OptimizedScrollManager {
  return optimizedScrollManager;
}

/**
 * React hook for using the optimized scroll manager
 */
export function useOptimizedScroll(
  handler: (event: ScrollEvent) => void,
  options: {
    id?: string;
    throttle?: number;
    deps?: any[];
  } = {}
) {
  const { deps = [], id, throttle = 16 } = options;
  
  const handlerId = id || `scroll-handler-${Math.random().toString(36).substr(2, 9)}`;
  const unregister = optimizedScrollManager.register(handlerId, handler, throttle);
  
  return unregister;
}

export default optimizedScrollManager;
