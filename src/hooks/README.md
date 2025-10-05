# 🪝 VR NextGEN Solutions - Custom Hooks Library

## 📋 **Overview**

This document provides comprehensive documentation for all custom React hooks in the VR NextGEN Solutions project. Each hook is designed for reusability, performance, and ease of use.

---

## 🏗️ **Hook Architecture**

### **Hook Categories**

```
hooks/
├── Navigation/           # Navigation-related hooks
│   ├── useNavigation.ts          # Basic navigation logic
│   └── useEnhancedNavigation.ts  # Enhanced navigation with lazy loading
├── Animation/            # Animation and visual effects
│   ├── useParallax.ts            # Parallax scrolling effects
│   ├── useTypewriter.ts          # Typewriter text animation
│   ├── use3DTilt.ts              # 3D tilt effects
│   └── useCountUp.ts             # Animated number counting
├── Utility/              # Utility and helper hooks
│   ├── useIntersectionObserver.ts # Viewport intersection detection
│   ├── useInView.ts              # Element visibility detection
│   ├── useScrollToTop.ts         # Scroll to top functionality
│   └── useOptimizedEffect.ts     # Performance-optimized effects
└── index.ts              # Hook exports
```

---

## 🧭 **Navigation Hooks**

### **useNavigation Hook**

**File:** `src/hooks/useNavigation.ts`

**Purpose:** Provides navigation state management and section navigation functionality.

**Returns:**
```typescript
interface NavigationHook {
  currentPath: string;
  currentSection: string;
  navigationData: typeof navigationData;
  navigateToSection: (sectionId: string, targetPath?: string) => Promise<void>;
  isCurrentPage: (path: string) => boolean;
}
```

**Features:**
- ✅ Section detection and highlighting
- ✅ Smooth scrolling navigation
- ✅ Cross-page navigation
- ✅ Current page detection
- ✅ Navigation data structure

**Usage:**
```typescript
import { useNavigation } from '@/hooks/useNavigation';

function MyComponent() {
  const { navigateToSection, currentSection, isCurrentPage } = useNavigation();
  
  const handleClick = () => {
    navigateToSection('services');
  };
  
  return (
    <div>
      <p>Current section: {currentSection}</p>
      <button onClick={handleClick}>Go to Services</button>
    </div>
  );
}
```

**Navigation Data Structure:**
```typescript
const navigationData = {
  home: {
    label: 'Home',
    href: '/',
    sections: ['hero', 'services', 'why', 'cta']
  },
  'what-we-do': {
    label: 'What We Do',
    href: '/what-we-do',
    sections: ['what-we-do-hero', 'services', 'industries']
  },
  // ... other pages
};
```

### **useEnhancedNavigation Hook**

**File:** `src/hooks/useEnhancedNavigation.ts`

**Purpose:** Enhanced navigation hook with lazy loading support and improved section detection.

**Returns:**
```typescript
interface EnhancedNavigationHook extends NavigationHook {
  isTriggeringLazyLoad: boolean;
  navigateToSection: (sectionId: string, targetPath?: string) => Promise<void>;
}
```

**Features:**
- ✅ All features from useNavigation
- ✅ Lazy loading trigger detection
- ✅ Enhanced section detection
- ✅ Approximate scrolling fallback
- ✅ Performance monitoring

**Usage:**
```typescript
import { useEnhancedNavigation } from '@/hooks/useEnhancedNavigation';

function MyComponent() {
  const { navigateToSection, isTriggeringLazyLoad } = useEnhancedNavigation();
  
  const handleClick = () => {
    navigateToSection('why'); // Will trigger lazy loading if needed
  };
  
  return (
    <button onClick={handleClick} disabled={isTriggeringLazyLoad}>
      {isTriggeringLazyLoad ? 'Loading...' : 'Go to Why Choose Us'}
    </button>
  );
}
```

---

## 🎨 **Animation Hooks**

### **useParallax Hook**

**File:** `src/hooks/useParallax.ts`

**Purpose:** Creates parallax scrolling effects based on scroll position.

**Parameters:**
```typescript
function useParallax(intensity: number): number
```

**Parameters:**
- `intensity` (number): Parallax intensity (0-1, where 0.25 = 25% movement)

**Returns:**
- `number`: Y-axis offset value for transform

**Usage:**
```typescript
import { useParallax } from '@/hooks/useParallax';

function ParallaxSection() {
  const parallax = useParallax(0.25); // 25% parallax intensity
  
  return (
    <div 
      style={{ 
        transform: `translateY(${parallax}px)` 
      }}
    >
      Parallax content
    </div>
  );
}
```

**Implementation Details:**
- Uses `useEffect` with scroll event listener
- Throttled for performance (60fps)
- Cleans up event listeners on unmount
- Returns smooth parallax values

### **useTypewriter Hook**

**File:** `src/hooks/useTypewriter.ts`

**Purpose:** Creates typewriter effect for text animation.

**Parameters:**
```typescript
function useTypewriter(text: string, speed?: number): {
  display: string;
  isComplete: boolean;
}
```

**Parameters:**
- `text` (string): Text to animate
- `speed` (number, optional): Speed in milliseconds (default: 80ms)

**Returns:**
- `display` (string): Currently displayed text
- `isComplete` (boolean): Whether animation is complete

**Usage:**
```typescript
import { useTypewriter } from '@/hooks/useTypewriter';

function TypewriterText() {
  const { display, isComplete } = useTypewriter(
    "Your Partner in Data-Driven Business Growth",
    80 // Speed in milliseconds
  );
  
  return (
    <h1>
      {display}
      {!isComplete && <span className="animate-pulse">|</span>}
    </h1>
  );
}
```

**Features:**
- ✅ Configurable typing speed
- ✅ Completion state tracking
- ✅ Automatic cleanup
- ✅ Smooth animation

### **use3DTilt Hook**

**File:** `src/hooks/use3DTilt.ts`

**Purpose:** Creates 3D tilt effects on mouse movement.

**Parameters:**
```typescript
function use3DTilt(intensity?: number): {
  tiltX: number;
  tiltY: number;
  transform: string;
}
```

**Parameters:**
- `intensity` (number, optional): Tilt intensity (default: 10)

**Returns:**
- `tiltX` (number): X-axis tilt value
- `tiltY` (number): Y-axis tilt value
- `transform` (string): CSS transform string

**Usage:**
```typescript
import { use3DTilt } from '@/hooks/use3DTilt';

function TiltCard() {
  const { transform } = use3DTilt(15);
  
  return (
    <div 
      style={{ transform }}
      className="transition-transform duration-300"
    >
      Tilt me!
    </div>
  );
}
```

### **useCountUp Hook**

**File:** `src/hooks/useCountUp.ts`

**Purpose:** Animates numbers from 0 to target value.

**Parameters:**
```typescript
function useCountUp(
  target: number,
  duration?: number,
  startOnMount?: boolean
): {
  count: number;
  isAnimating: boolean;
  start: () => void;
  reset: () => void;
}
```

**Parameters:**
- `target` (number): Target number to count to
- `duration` (number, optional): Animation duration in ms (default: 2000)
- `startOnMount` (boolean, optional): Start animation on mount (default: true)

**Returns:**
- `count` (number): Current count value
- `isAnimating` (boolean): Whether animation is running
- `start` (function): Start animation function
- `reset` (function): Reset count function

**Usage:**
```typescript
import { useCountUp } from '@/hooks/useCountUp';

function AnimatedCounter() {
  const { count, isAnimating, start } = useCountUp(100, 3000);
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={start} disabled={isAnimating}>
        {isAnimating ? 'Animating...' : 'Start Count'}
      </button>
    </div>
  );
}
```

---

## 🛠️ **Utility Hooks**

### **useIntersectionObserver Hook**

**File:** `src/hooks/useIntersectionObserver.ts`

**Purpose:** Detects when elements enter or leave the viewport.

**Parameters:**
```typescript
interface IntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}
```

**Returns:**
```typescript
interface IntersectionObserverHook {
  elementRef: RefObject<HTMLDivElement>;
  hasIntersected: boolean;
  isIntersecting: boolean;
}
```

**Usage:**
```typescript
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

function LazyComponent() {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '400px',
    triggerOnce: true
  });
  
  return (
    <div ref={elementRef}>
      {hasIntersected ? <ExpensiveComponent /> : <LoadingSpinner />}
    </div>
  );
}
```

**Features:**
- ✅ Configurable thresholds
- ✅ Root margin support
- ✅ Trigger once option
- ✅ Performance optimized

### **useInView Hook**

**File:** `src/hooks/useInView.ts`

**Purpose:** Simplified hook for detecting element visibility.

**Parameters:**
```typescript
function useInView(options?: IntersectionObserverInit): {
  ref: RefObject<HTMLElement>;
  inView: boolean;
}
```

**Usage:**
```typescript
import { useInView } from '@/hooks/useInView';

function VisibilityComponent() {
  const { ref, inView } = useInView();
  
  return (
    <div ref={ref} className={inView ? 'animate-fade-in' : 'opacity-0'}>
      {inView ? 'I am visible!' : 'I am hidden'}
    </div>
  );
}
```

### **useScrollToTop Hook**

**File:** `src/hooks/useScrollToTop.ts`

**Purpose:** Provides scroll to top functionality.

**Parameters:**
```typescript
function useScrollToTop(): {
  scrollToTop: () => void;
  isVisible: boolean;
}
```

**Usage:**
```typescript
import { useScrollToTop } from '@/hooks/useScrollToTop';

function ScrollToTopButton() {
  const { scrollToTop, isVisible } = useScrollToTop();
  
  if (!isVisible) return null;
  
  return (
    <button 
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 bg-gold text-black p-2 rounded-full"
    >
      ↑
    </button>
  );
}
```

**Features:**
- ✅ Smooth scrolling
- ✅ Visibility detection
- ✅ Performance optimized
- ✅ Cleanup on unmount

---

## 🚀 **Performance Hooks**

### **useOptimizedEffect Hook**

**File:** `src/utils/performance.ts`

**Purpose:** Performance-optimized useEffect with deep comparison.

**Usage:**
```typescript
import { performanceUtils } from '@/utils/performance';

function MyComponent({ data }) {
  performanceUtils.useDeepEffect(() => {
    // Effect that only runs when data deeply changes
    processData(data);
  }, [data]);
  
  return <div>Content</div>;
}
```

**Features:**
- ✅ Deep dependency comparison
- ✅ Prevents unnecessary re-runs
- ✅ Performance optimized
- ✅ Memory efficient

---

## 🎯 **Hook Best Practices**

### **Hook Design Principles**

1. **Single Responsibility** - Each hook has one clear purpose
2. **Reusability** - Hooks should be reusable across components
3. **Performance** - Optimize for performance and memory usage
4. **Type Safety** - Provide clear TypeScript interfaces
5. **Cleanup** - Properly clean up side effects

### **Hook Naming Conventions**

```typescript
// ✅ Good: Use 'use' prefix
function useNavigation() {}
function useParallax() {}
function useTypewriter() {}

// ❌ Bad: Don't use 'use' prefix
function navigation() {}
function parallaxEffect() {}
```

### **Hook Structure**

```typescript
function useCustomHook(param1: string, param2?: number) {
  // 1. State declarations
  const [state, setState] = useState(initialValue);
  
  // 2. Computed values
  const computedValue = useMemo(() => {
    return expensiveCalculation(state);
  }, [state]);
  
  // 3. Effects
  useEffect(() => {
    // Side effects
    return () => {
      // Cleanup
    };
  }, [dependencies]);
  
  // 4. Event handlers
  const handleEvent = useCallback(() => {
    // Event handling logic
  }, [dependencies]);
  
  // 5. Return object
  return {
    state,
    computedValue,
    handleEvent,
  };
}
```

### **Dependency Management**

```typescript
// ✅ Good: Include all dependencies
useEffect(() => {
  fetchData(userId, filters);
}, [userId, filters]); // All dependencies included

// ✅ Good: Use useCallback for stable references
const handleClick = useCallback(() => {
  onItemClick(item.id);
}, [item.id, onItemClick]);

// ❌ Bad: Missing dependencies
useEffect(() => {
  fetchData(userId, filters);
}, [userId]); // Missing 'filters' dependency
```

---

## 🧪 **Testing Hooks**

### **Hook Testing with React Testing Library**

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '@/hooks/useCounter';

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter(0));
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});

test('should reset counter', () => {
  const { result } = renderHook(() => useCounter(10));
  
  act(() => {
    result.current.reset();
  });
  
  expect(result.current.count).toBe(0);
});
```

### **Testing Hook with Dependencies**

```typescript
import { renderHook } from '@testing-library/react';
import { useNavigation } from '@/hooks/useNavigation';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    asPath: '/',
  }),
}));

test('should navigate to section', async () => {
  const { result } = renderHook(() => useNavigation());
  
  await act(async () => {
    await result.current.navigateToSection('services');
  });
  
  expect(result.current.currentSection).toBe('services');
});
```

---

## 📚 **Hook Examples**

### **Complete Hook Example**

```typescript
import { useState, useEffect, useCallback, useMemo } from 'react';

interface UseTimerOptions {
  initialTime?: number;
  interval?: number;
  autoStart?: boolean;
}

interface UseTimerReturn {
  time: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  formattedTime: string;
}

function useTimer({
  initialTime = 0,
  interval = 1000,
  autoStart = false
}: UseTimerOptions = {}): UseTimerReturn {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [time]);
  
  const start = useCallback(() => {
    setIsRunning(true);
  }, []);
  
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);
  
  const reset = useCallback(() => {
    setTime(initialTime);
    setIsRunning(false);
  }, [initialTime]);
  
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, interval);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, interval]);
  
  return {
    time,
    isRunning,
    start,
    pause,
    reset,
    formattedTime,
  };
}

export default useTimer;
```

---

## 🔧 **Development**

### **Adding New Hooks**

1. **Create Hook File** - Use camelCase naming with 'use' prefix
2. **Define Interface** - TypeScript interface for parameters and return
3. **Implement Hook** - Follow established patterns
4. **Add Tests** - Unit tests for hook behavior
5. **Update Documentation** - Add to this README
6. **Export Hook** - Add to index.ts

### **Hook Template**

```typescript
import { useState, useEffect, useCallback } from 'react';

interface UseCustomHookOptions {
  // Define options here
}

interface UseCustomHookReturn {
  // Define return type here
}

function useCustomHook(options: UseCustomHookOptions = {}): UseCustomHookReturn {
  // Hook implementation
  
  return {
    // Return object
  };
}

export default useCustomHook;
```

---

**This hooks library is continuously evolving. For the latest information, refer to the individual hook files and their inline documentation.**