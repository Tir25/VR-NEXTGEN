# 📚 VR NextGEN Solutions - Development Guide

## 🎯 **Overview**

This guide provides comprehensive documentation for developing, maintaining, and extending the VR NextGEN Solutions website. It covers everything from project setup to advanced customization.

---

## 🏗️ **Architecture Overview**

### **Technology Stack**

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Framework** | Next.js | 15.5.4 | React framework with SSR/SSG |
| **Runtime** | React | 19.1.0 | UI library with hooks |
| **Language** | TypeScript | 5.x | Type-safe development |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS |
| **Icons** | Heroicons | Latest | SVG icon system |
| **Deployment** | Vercel | Latest | Hosting platform |

### **Project Structure**

```
src/
├── components/           # React components
│   ├── common/          # Reusable UI components
│   ├── layout/          # Layout components
│   ├── sections/        # Page sections
│   └── contact/         # Contact-specific components
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── design-system/       # Design tokens and system
├── config/              # Application configuration
├── contexts/            # React contexts
├── services/            # API services
├── styles/              # Global styles
└── pages/               # Next.js pages and API routes
```

---

## 🚀 **Getting Started**

### **Prerequisites**

- Node.js 18.x or higher
- npm, yarn, or pnpm
- Git
- Code editor (VS Code recommended)

### **Installation**

```bash
# Clone repository
git clone https://github.com/Tir25/VR-NEXTGEN.git
cd VR-NEXTGEN

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Development Commands**

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript type checking

# Optimization
npm run optimize:all     # Optimize all assets
npm run optimize:images  # Optimize images to WebP
npm run optimize:css     # Purge unused CSS
npm run build:optimized  # Build with full optimization

# Code Quality
npm run format           # Format with Prettier
npm run format:check     # Check formatting
```

---

## 🎨 **Design System**

### **Color Palette**

The design system uses a sophisticated black and gold color scheme:

```typescript
// src/design-system/tokens.ts
export const designTokens = {
  colors: {
    black: '#000000',           // Primary backgrounds
    deepCharcoal: '#231F20',    // Text and secondary backgrounds
    white: '#ffffff',           // Text on dark backgrounds
    gold: '#ffd700',            // Primary accent
    goldDark: '#ad974f',        // Hover states
    goldDarker: '#8e793e',      // Active states
    lightGrey: '#eaeaea',       // Section dividers
  }
}
```

### **Typography Scale**

```css
/* Responsive typography using Tailwind classes */
h1: text-3xl md:text-4xl lg:text-5xl    /* 48px - 80px */
h2: text-2xl md:text-3xl lg:text-4xl    /* 32px - 64px */
h3: text-xl md:text-2xl lg:text-3xl     /* 24px - 48px */
body: text-base md:text-lg               /* 16px - 18px */
small: text-sm md:text-base              /* 14px - 16px */
```

### **Spacing System**

```css
/* Consistent spacing using Tailwind scale */
xs: 0.5rem    /* 8px */
sm: 1rem      /* 16px */
md: 1.5rem    /* 24px */
lg: 2rem      /* 32px */
xl: 3rem      /* 48px */
2xl: 4rem     /* 64px */
```

---

## 🧩 **Component Development**

### **Component Structure**

All components follow a consistent structure:

```typescript
// Example: Button.tsx
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  // Component implementation
}
```

### **Component Guidelines**

1. **Use TypeScript interfaces** for all props
2. **Default props** for optional properties
3. **Forward refs** when needed for DOM access
4. **Error boundaries** for complex components
5. **Accessibility** attributes (aria-label, role, etc.)
6. **Responsive design** with Tailwind classes

### **Common Components**

#### **Button Component**

```typescript
// Enhanced button with multiple variants
<Button variant="primary" size="lg" isLoading={false}>
  Click Me
</Button>
```

**Variants:**
- `primary`: Gold background with black text
- `secondary`: Black background with gold text
- `outline`: Transparent with gold border

#### **ErrorBoundary Component**

```typescript
// Wraps components to catch and handle errors gracefully
<ErrorBoundary fallback={<ErrorFallback />}>
  <YourComponent />
</ErrorBoundary>
```

#### **LazyWrapper Component**

```typescript
// Lazy loads components when they enter viewport
<LazyWrapper rootMargin="400px">
  <HeavyComponent />
</LazyWrapper>
```

---

## 🪝 **Custom Hooks**

### **Navigation Hook**

```typescript
// src/hooks/useNavigation.ts
import { useNavigation } from '@/hooks/useNavigation';

function MyComponent() {
  const { navigateToSection, currentSection } = useNavigation();
  
  const handleClick = () => {
    navigateToSection('services');
  };
}
```

**Features:**
- Section detection and highlighting
- Smooth scrolling navigation
- Cross-page navigation
- Lazy loading support

### **Parallax Hook**

```typescript
// src/hooks/useParallax.ts
import { useParallax } from '@/hooks/useParallax';

function ParallaxSection() {
  const parallax = useParallax(0.25); // 25% parallax intensity
  
  return (
    <div style={{ transform: `translateY(${parallax}px)` }}>
      Content with parallax effect
    </div>
  );
}
```

### **Typewriter Hook**

```typescript
// src/hooks/useTypewriter.ts
import { useTypewriter } from '@/hooks/useTypewriter';

function TypewriterText() {
  const { display, isComplete } = useTypewriter(
    "Your text here", 
    80 // Speed in ms
  );
  
  return (
    <h1>
      {display}
      {!isComplete && <span className="animate-pulse">|</span>}
    </h1>
  );
}
```

---

## 📱 **Responsive Design**

### **Breakpoint Strategy**

```typescript
// Mobile-first approach
const breakpoints = {
  xs: '320px',   // Mobile phones
  sm: '640px',   // Large phones
  md: '768px',   // Tablets
  lg: '1024px',  // Small laptops
  xl: '1280px',  // Desktops
};
```

### **Responsive Components**

```typescript
// Example responsive component
function ResponsiveCard() {
  return (
    <div className="
      grid grid-cols-1           // Mobile: 1 column
      sm:grid-cols-2             // Small: 2 columns
      md:grid-cols-3             // Medium: 3 columns
      lg:grid-cols-4             // Large: 4 columns
      gap-4 md:gap-6 lg:gap-8    // Responsive gaps
    ">
      {/* Card content */}
    </div>
  );
}
```

### **Touch Optimization**

```typescript
// Touch-friendly interactions
<div className="
  touch-manipulation           // Enable touch manipulation
  select-none                 // Prevent text selection
  active:scale-95            // Touch feedback
  transition-transform       // Smooth transitions
">
  Touch-friendly button
</div>
```

---

## ♿ **Accessibility**

### **Semantic HTML**

```typescript
// Use semantic HTML elements
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <ul>
      <li><a href="/" aria-current="page">Home</a></li>
    </ul>
  </nav>
</header>

<main role="main">
  <section aria-labelledby="services-heading">
    <h2 id="services-heading">Our Services</h2>
  </section>
</main>

<footer role="contentinfo">
  Footer content
</footer>
```

### **ARIA Labels**

```typescript
// Provide accessible labels
<button 
  aria-label="Close dialog"
  aria-expanded={isOpen}
  aria-controls="dialog-content"
>
  ×
</button>

// Form accessibility
<label htmlFor="email-input">Email Address</label>
<input 
  id="email-input"
  type="email"
  aria-describedby="email-help"
  aria-required="true"
/>
<div id="email-help">We'll never share your email</div>
```

### **Keyboard Navigation**

```typescript
// Keyboard event handling
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleClick();
  }
}

// Focus management
function focusFirstElement() {
  const firstFocusable = document.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as HTMLElement;
  firstFocusable?.focus();
}
```

---

## 🚀 **Performance Optimization**

### **Lazy Loading**

```typescript
// Dynamic imports for code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

// LazyWrapper for viewport-based loading
<LazyWrapper rootMargin="400px">
  <ExpensiveComponent />
</LazyWrapper>
```

### **Image Optimization**

```typescript
// Next.js Image component
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  priority={true}        // Above-the-fold images
  placeholder="blur"     // Blur placeholder
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### **Bundle Optimization**

```typescript
// Tree shaking unused code
import { specificFunction } from 'large-library';

// Avoid importing entire libraries
// ❌ Bad
import * as _ from 'lodash';

// ✅ Good
import { debounce } from 'lodash/debounce';
```

---

## 🔧 **Configuration**

### **App Configuration**

```typescript
// src/config/app-config.ts
export const appConfig = {
  appName: "VR NextGEN Solutions",
  features: {
    darkMode: true,
    animations: true,
    lazyLoading: true,
    performanceMonitoring: process.env.NODE_ENV === "development",
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
    contact: "/api/contact",
  },
  performance: {
    lazyLoadRootMargin: "400px",
    intersectionObserverThreshold: 0.1,
  }
};
```

### **Environment Variables**

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NODE_ENV=development
```

---

## 🧪 **Testing**

### **Component Testing**

```typescript
// Example component test
import { render, screen } from '@testing-library/react';
import Button from '@/components/common/Button';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

### **Accessibility Testing**

```typescript
// Test accessibility
import { axe, toHaveNoViolations } from 'jest-axe';

test('should not have accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 🚀 **Deployment**

### **Vercel Deployment**

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

2. **Environment Variables**
   - Set in Vercel dashboard
   - No sensitive data in client-side code

3. **Build Settings**
   ```json
   // vercel.json
   {
     "buildCommand": "npm run build:optimized",
     "outputDirectory": ".next",
     "framework": "nextjs"
   }
   ```

### **Performance Monitoring**

```typescript
// Performance monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to analytics service
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    event_label: metric.id,
    non_interaction: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

---

## 🐛 **Debugging**

### **Development Tools**

```typescript
// React Developer Tools
// Install browser extension for component inspection

// Performance profiling
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log('Component:', id, 'Phase:', phase, 'Duration:', actualDuration);
}

<Profiler id="MyComponent" onRender={onRenderCallback}>
  <MyComponent />
</Profiler>
```

### **Error Handling**

```typescript
// Global error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Send to error reporting service
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Send to error reporting service
});
```

---

## 📚 **Resources**

### **Documentation Links**

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### **Best Practices**

- Follow the [Best Practices Guide](./VR-nextgen-bestpractices.md)
- Use TypeScript for all new code
- Write meaningful commit messages
- Test components thoroughly
- Maintain responsive design
- Ensure accessibility compliance

---

**Happy coding! 🚀**