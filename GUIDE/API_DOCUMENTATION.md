# 📡 VR NextGEN Solutions - API Documentation

## 🎯 **Overview**

This document provides comprehensive documentation for all API endpoints, components, hooks, and utilities in the VR NextGEN Solutions website.

---

## 🚀 **API Endpoints**

### **Contact Form Submission**

**Endpoint:** `POST /api/contact`

**Description:** Handles contact form submissions and sends email notifications.

**Request Body:**
```typescript
interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  consent: boolean; // GDPR compliance
}
```

**Response:**
```typescript
interface ContactResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    timestamp: string;
  };
  error?: string;
}
```

**Example Usage:**
```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Project Inquiry',
    message: 'I would like to discuss a potential project.',
    consent: true
  })
});

const result = await response.json();
```

**Error Handling:**
```typescript
// HTTP Status Codes
200: Success
400: Bad Request (validation errors)
429: Rate Limited
500: Internal Server Error
```

---

## 🧩 **Component API**

### **Button Component**

**File:** `src/components/common/Button.tsx`

**Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant affecting color scheme */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Button size affecting padding and font size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is in loading state */
  isLoading?: boolean;
  /** Button content */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Disable ripple effect */
  disableRipple?: boolean;
}
```

**Usage Examples:**
```typescript
// Basic button
<Button>Click me</Button>

// Primary button with loading state
<Button variant="primary" isLoading={isSubmitting}>
  Submit
</Button>

// Large outline button
<Button variant="outline" size="lg">
  Learn More
</Button>

// Button with custom click handler
<Button onClick={() => console.log('Clicked')}>
  Custom Action
</Button>
```

**Styling Classes:**
```css
.btn {
  /* Base button styles */
  @apply inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-primary {
  @apply bg-gold text-black hover:bg-gold/90 focus:ring-gold;
}

.btn-secondary {
  @apply bg-black text-gold border-gold hover:bg-gold hover:text-black focus:ring-gold;
}

.btn-outline {
  @apply border-gold text-gold hover:bg-gold hover:text-black focus:ring-gold;
}
```

### **ErrorBoundary Component**

**File:** `src/components/common/ErrorBoundary.tsx`

**Props:**
```typescript
interface ErrorBoundaryProps {
  /** Child components to wrap */
  children: React.ReactNode;
  /** Custom fallback component */
  fallback?: React.ReactNode;
  /** Error handler callback */
  onError?: (error: AppError, errorInfo: ErrorInfo) => void;
}
```

**Usage:**
```typescript
<ErrorBoundary onError={(error, errorInfo) => console.error(error)}>
  <RiskyComponent />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary fallback={<CustomErrorFallback />}>
  <RiskyComponent />
</ErrorBoundary>
```

### **LazyWrapper Component**

**File:** `src/components/common/LazyWrapper.tsx`

**Props:**
```typescript
interface LazyWrapperProps {
  /** Child components to lazy load */
  children: React.ReactNode;
  /** Loading fallback component */
  fallback?: React.ReactNode;
  /** Intersection observer threshold */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to trigger only once */
  triggerOnce?: boolean;
  /** Custom placeholder */
  placeholder?: React.ReactNode;
  /** Enable performance monitoring */
  enablePerformanceMonitoring?: boolean;
}
```

**Usage:**
```typescript
<LazyWrapper rootMargin="400px" threshold={0.1}>
  <HeavyComponent />
</LazyWrapper>

// With custom fallback
<LazyWrapper fallback={<CustomLoadingSpinner />}>
  <ExpensiveChart />
</LazyWrapper>
```

### **Header Component**

**File:** `src/components/layout/Header.tsx`

**Features:**
- Responsive navigation with hamburger menu
- Dropdown menus for page sections
- Smooth scrolling navigation
- Section highlighting
- Cross-page navigation

**Navigation Structure:**
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
  'who-we-are': {
    label: 'Who We Are',
    href: '/who-we-are',
    sections: ['who-we-are-hero', 'customer-stories', 'case-studies', 'events']
  },
  contact: {
    label: 'Contact',
    href: '/contact',
    sections: ['contact-hero', 'contact-form']
  }
};
```

---

## 🪝 **Custom Hooks API**

### **useNavigation Hook**

**File:** `src/hooks/useNavigation.ts`

**Returns:**
```typescript
interface NavigationHook {
  /** Current page path */
  currentPath: string;
  /** Current section ID */
  currentSection: string;
  /** Navigation data structure */
  navigationData: typeof navigationData;
  /** Navigate to a specific section */
  navigateToSection: (sectionId: string, targetPath?: string) => Promise<void>;
  /** Check if path is current page */
  isCurrentPage: (path: string) => boolean;
}
```

**Usage:**
```typescript
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

### **useEnhancedNavigation Hook**

**File:** `src/hooks/useEnhancedNavigation.ts`

**Returns:**
```typescript
interface EnhancedNavigationHook extends NavigationHook {
  /** Whether lazy loading is being triggered */
  isTriggeringLazyLoad: boolean;
  /** Enhanced navigate function with lazy loading support */
  navigateToSection: (sectionId: string, targetPath?: string) => Promise<void>;
}
```

**Usage:**
```typescript
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

### **useParallax Hook**

**File:** `src/hooks/useParallax.ts`

**Parameters:**
```typescript
function useParallax(intensity: number): number
```

**Usage:**
```typescript
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

### **useTypewriter Hook**

**File:** `src/hooks/useTypewriter.ts`

**Parameters:**
```typescript
function useTypewriter(text: string, speed?: number): {
  display: string;
  isComplete: boolean;
}
```

**Usage:**
```typescript
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

### **useIntersectionObserver Hook**

**File:** `src/hooks/useIntersectionObserver.ts`

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

---

## 🛠️ **Utility Functions**

### **Error Handling Utilities**

**File:** `src/utils/errorHandling.ts`

**ErrorHandler Class:**
```typescript
class ErrorHandler {
  /** Create a standardized error object */
  createError(
    message: string,
    code: ErrorCode,
    statusCode: number,
    context?: Record<string, any>
  ): AppError;
  
  /** Handle and log errors */
  handleError(error: AppError | Error, errorInfo?: ErrorInfo): void;
  
  /** Check if error is AppError type */
  isAppError(error: Error): error is AppError;
}

// Usage
const errorHandler = new ErrorHandler();
const error = errorHandler.createError(
  'Failed to fetch data',
  'API_ERROR',
  500,
  { endpoint: '/api/data' }
);
```

**AppError Interface:**
```typescript
interface AppError extends Error {
  code: ErrorCode;
  statusCode?: number;
  context?: Record<string, any>;
  timestamp: Date;
  isHandled?: boolean;
}

type ErrorCode = 
  | 'UNKNOWN_ERROR'
  | 'NETWORK_ERROR'
  | 'API_ERROR'
  | 'VALIDATION_ERROR'
  | 'AUTH_ERROR'
  | 'COMPONENT_ERROR'
  | 'LAZY_LOAD_TIMEOUT';
```

### **Performance Utilities**

**File:** `src/utils/performance.ts`

**Debounce Function:**
```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void;

// Usage
const debouncedSearch = debounce((query: string) => {
  performSearch(query);
}, 300);
```

**Throttle Function:**
```typescript
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void;

// Usage
const throttledScroll = throttle((event: Event) => {
  handleScroll(event);
}, 100);
```

**Performance Utils Object:**
```typescript
const performanceUtils = {
  debounce,
  throttle,
  memo: React.memo,
  useDeepEffect: (effect: React.EffectCallback, deps: React.DependencyList) => void,
  useDeepCallback: <T>(callback: T, deps: React.DependencyList) => T,
  useDeepMemo: <T>(factory: () => T, deps: React.DependencyList) => T,
  lazyLoadComponent: <T>(importFunc: () => Promise<{ default: T }>) => React.LazyExoticComponent<T>,
  createLoadingComponent: (message?: string) => React.ComponentType
};
```

### **Component Factory**

**File:** `src/utils/component-factory-simple.tsx`

**Create Component Function:**
```typescript
function createComponent<T extends BaseComponentProps>(
  baseComponent: ComponentType<T>,
  defaultProps?: Partial<T>,
  displayName?: string
): ComponentType<T>;

// Usage
const CustomButton = createComponent(Button, {
  variant: 'primary',
  size: 'lg'
}, 'CustomButton');
```

**Create Variant Component:**
```typescript
function createVariantComponent<T extends BaseComponentProps & VariantProps>(
  baseComponent: ComponentType<T>,
  variants: Record<string, Record<string, string>>,
  defaultVariant?: keyof typeof variants,
  displayName?: string
): ComponentType<T>;

// Usage
const ThemedButton = createVariantComponent(Button, {
  primary: { base: 'bg-gold text-black' },
  secondary: { base: 'bg-black text-gold border-gold' }
}, 'primary', 'ThemedButton');
```

---

## 🎨 **Design System API**

### **Design Tokens**

**File:** `src/design-system/tokens.ts`

**Color Palette:**
```typescript
export const designTokens = {
  colors: {
    black: '#000000',
    deepCharcoal: '#231F20',
    white: '#ffffff',
    gold: '#ffd700',
    goldDark: '#ad974f',
    goldDarker: '#8e793e',
    lightGrey: '#eaeaea',
    gloryWhite: '#E6E6E6',
    sandYellow: '#FFBB01',
    grayNightBlack: '#1A1A1A',
  }
};
```

**Typography:**
```typescript
export const designTokens = {
  typography: {
    fontSans: 'var(--font-geist-sans, ui-sans-serif, system-ui, sans-serif)',
    fontMono: 'var(--font-geist-mono, ui-monospace, SFMono-Regular, monospace)',
    headingSizes: {
      h1: '3rem',
      h2: '2.25rem',
      h3: '1.75rem',
    },
    bodySize: '1rem',
  }
};
```

**Breakpoints:**
```typescript
export const designTokens = {
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
};
```

---

## ⚙️ **Configuration API**

### **App Configuration**

**File:** `src/config/app-config.ts`

**Main Config Object:**
```typescript
export const appConfig = {
  appName: "VR NextGEN Solutions",
  appVersion: "1.2.0",
  environment: process.env.NODE_ENV || "development",
  
  features: {
    darkMode: true,
    animations: true,
    lazyLoading: true,
    performanceMonitoring: process.env.NODE_ENV === "development",
    enhancedNavigation: true,
    contactFormCaptcha: false,
    blogComments: false,
  },
  
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
    contact: "/api/contact",
  },
  
  navigation: {
    stickyHeader: true,
    smoothScrollOffset: 0,
    mobileMenuBreakpoint: 768,
  },
  
  animations: {
    defaultDuration: 0.3,
    parallaxIntensity: 0.25,
    typewriterSpeed: 80,
  },
  
  performance: {
    lazyLoadRootMargin: "400px",
    intersectionObserverThreshold: 0.1,
    debounceDelay: 300,
    throttleLimit: 100,
  }
};
```

**Exported Configurations:**
```typescript
export const featureFlags = appConfig.features;
export const apiConfig = appConfig.api;
export const navigationConfig = appConfig.navigation;
export const animationConfig = appConfig.animations;
export const performanceConfig = appConfig.performance;
```

---

## 🔧 **Build Scripts**

### **Optimization Scripts**

**Image Optimization:**
```bash
npm run optimize:images
# Optimizes all images in public/images/ to WebP format
# Creates multiple sizes: sm, md, lg, xl
```

**Logo Optimization:**
```bash
npm run optimize:logos
# Optimizes logo variants in public/icons/ to WebP format
# Creates multiple sizes for responsive usage
```

**CSS Optimization:**
```bash
npm run optimize:css
# Purges unused CSS classes
# Analyzes CSS usage across the project
```

**Bundle Optimization:**
```bash
npm run optimize:bundle
# Analyzes bundle size
# Provides optimization recommendations
```

**Full Optimization:**
```bash
npm run optimize:all
# Runs all optimization scripts
# Optimizes images, logos, and CSS
```

---

## 🧪 **Testing API**

### **Component Testing**

**Test Utilities:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

// Basic component test
test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});

// Accessibility test
test('should not have accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### **Hook Testing**

**Custom Hook Test:**
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
```

---

## 📚 **Examples**

### **Complete Component Example**

```typescript
import React, { useState } from 'react';
import Button from '@/components/common/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { designTokens } from '@/design-system/tokens';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onLearnMore?: () => void;
}

export default function FeatureCard({
  title,
  description,
  icon,
  onLearnMore
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { navigateToSection } = useNavigation();
  
  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore();
    } else {
      navigateToSection('services');
    }
  };
  
  return (
    <div 
      className="
        bg-white/5 backdrop-blur-sm border border-gold/20 rounded-lg p-6
        hover:bg-white/10 hover:border-gold/40 transition-all duration-300
        hover:scale-105 hover:shadow-lg hover:shadow-gold/20
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`
          w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center
          transition-all duration-300
          ${isHovered ? 'bg-gold/30 scale-110' : ''}
        `}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">
          {title}
        </h3>
      </div>
      
      <p className="text-white/70 mb-6 leading-relaxed">
        {description}
      </p>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleLearnMore}
        className="w-full"
      >
        Learn More
      </Button>
    </div>
  );
}
```

---

**This API documentation is continuously updated. For the latest information, refer to the source code and inline documentation.**
