# 🏆 VR NextGEN Solutions - Best Practices Guide

## 📋 **Overview**

This guide outlines the coding standards, best practices, and conventions used in the VR NextGEN Solutions project. Following these practices ensures code quality, maintainability, and team consistency.

---

## 🎯 **Core Principles**

### **SOLID Principles**

1. **Single Responsibility Principle (SRP)**
   - Each component should have one reason to change
   - Keep components focused and cohesive

2. **Open/Closed Principle (OCP)**
   - Open for extension, closed for modification
   - Use composition over inheritance

3. **Liskov Substitution Principle (LSP)**
   - Derived components should be substitutable for base components
   - Maintain consistent interfaces

4. **Interface Segregation Principle (ISP)**
   - Create specific interfaces rather than general ones
   - Keep props interfaces focused

5. **Dependency Inversion Principle (DIP)**
   - Depend on abstractions, not concretions
   - Use dependency injection where appropriate

### **Additional Principles**

- **DRY (Don't Repeat Yourself)**: Avoid code duplication
- **KISS (Keep It Simple, Stupid)**: Prefer simple solutions
- **YAGNI (You Aren't Gonna Need It)**: Don't over-engineer

---

## 📁 **File Organization**

### **Naming Conventions**

```typescript
// Files and directories
components/           // kebab-case for directories
Button.tsx           // PascalCase for components
useNavigation.ts     // camelCase for hooks
constants.ts         // camelCase for utilities
globals.css          // kebab-case for CSS files

// Variables and functions
const userName = '';           // camelCase
const API_BASE_URL = '';       // SCREAMING_SNAKE_CASE for constants
function handleClick() {}      // camelCase for functions

// Components and types
interface UserProps {}         // PascalCase for interfaces
type UserRole = 'admin';       // PascalCase for types
function UserProfile() {}      // PascalCase for components
```

### **Import Organization**

```typescript
// 1. React and Next.js imports
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 2. Third-party libraries
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 3. Internal imports (absolute paths)
import Button from '@/components/common/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { COMPANY_INFO } from '@/utils/constants';

// 4. Relative imports
import './Component.module.css';
import { localFunction } from './utils';

// 5. Type-only imports
import type { UserProps } from '@/types/user';
```

---

## 🧩 **Component Development**

### **Component Structure**

```typescript
// 1. Imports
import React, { useState, useEffect } from 'react';
import type { ComponentProps } from './types';

// 2. Types and interfaces
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

// 3. Component definition
export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  ...props
}: ButtonProps) {
  // 4. Hooks (state, effects, custom hooks)
  const [isLoading, setIsLoading] = useState(false);
  
  // 5. Event handlers
  const handleClick = () => {
    setIsLoading(true);
    onClick?.();
    setTimeout(() => setIsLoading(false), 1000);
  };

  // 6. Render
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={handleClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
```

### **Props Interface Design**

```typescript
// ✅ Good: Specific, focused interface
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// ❌ Bad: Too generic, includes everything
interface ButtonProps extends HTMLButtonElement {
  // Too many inherited properties
}

// ✅ Good: Extend base HTML attributes when needed
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}
```

### **Default Props**

```typescript
// ✅ Good: Use default parameters
function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  // Component implementation
}

// ❌ Bad: Don't use defaultProps with TypeScript
Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  isLoading: false,
};
```

---

## 🎨 **Styling Guidelines**

### **Tailwind CSS Best Practices**

```typescript
// ✅ Good: Use semantic class grouping
<div className="
  flex flex-col items-center justify-center
  p-4 md:p-6 lg:p-8
  bg-white dark:bg-gray-900
  rounded-lg shadow-md
  hover:shadow-lg transition-shadow
">
  Content
</div>

// ❌ Bad: Random class order
<div className="shadow-md p-4 flex items-center bg-white rounded-lg justify-center">
  Content
</div>

// ✅ Good: Extract complex styles to CSS classes
<div className="card-container">
  Content
</div>

// CSS
.card-container {
  @apply flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow;
}
```

### **CSS Custom Properties**

```css
/* ✅ Good: Use CSS custom properties for theming */
:root {
  --color-primary: #ffd700;
  --color-secondary: #231f20;
  --spacing-unit: 1rem;
  --border-radius: 0.5rem;
}

.button {
  background-color: var(--color-primary);
  padding: var(--spacing-unit);
  border-radius: var(--border-radius);
}
```

### **Responsive Design**

```typescript
// ✅ Good: Mobile-first approach
<div className="
  grid grid-cols-1           // Mobile: 1 column
  sm:grid-cols-2            // Small: 2 columns
  md:grid-cols-3            // Medium: 3 columns
  lg:grid-cols-4            // Large: 4 columns
  gap-4 md:gap-6 lg:gap-8   // Responsive gaps
">

// ✅ Good: Consistent breakpoint usage
const breakpoints = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
};
```

---

## 🪝 **Custom Hooks**

### **Hook Naming**

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
// ✅ Good: Standard hook structure
function useCounter(initialValue = 0) {
  // 1. State declarations
  const [count, setCount] = useState(initialValue);
  
  // 2. Computed values
  const isEven = count % 2 === 0;
  
  // 3. Effects
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  // 4. Event handlers
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);
  
  // 5. Return object
  return {
    count,
    isEven,
    increment,
    decrement,
  };
}
```

### **Hook Dependencies**

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

## 📱 **Responsive Design**

### **Mobile-First Approach**

```typescript
// ✅ Good: Start with mobile, add larger breakpoints
<div className="
  text-sm                    // Mobile: 14px
  md:text-base              // Medium: 16px
  lg:text-lg                // Large: 18px
  xl:text-xl                // Extra large: 20px
">

// ❌ Bad: Desktop-first approach
<div className="
  text-xl                   // Desktop: 20px
  lg:text-lg               // Large: 18px (shrinking)
  md:text-base             // Medium: 16px
  sm:text-sm               // Small: 14px
">
```

### **Touch-Friendly Design**

```typescript
// ✅ Good: Touch-friendly sizing
<button className="
  min-h-[44px]              // Minimum touch target
  min-w-[44px]              // Minimum touch target
  px-4 py-2                 // Adequate padding
  active:scale-95           // Touch feedback
  transition-transform      // Smooth transitions
">

// ✅ Good: Touch-friendly spacing
<div className="
  space-y-4                 // Adequate spacing between touch targets
  touch-manipulation        // Enable touch manipulation
">
```

---

## ♿ **Accessibility**

### **Semantic HTML**

```typescript
// ✅ Good: Use semantic HTML elements
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

// ❌ Bad: Non-semantic HTML
<div>
  <div>
    <div>Home</div>
  </div>
</div>
```

### **ARIA Labels and Descriptions**

```typescript
// ✅ Good: Provide accessible labels
<button 
  aria-label="Close dialog"
  aria-expanded={isOpen}
  aria-controls="dialog-content"
  aria-describedby="dialog-description"
>
  ×
</button>

<div id="dialog-description" className="sr-only">
  This dialog contains important information
</div>

// ✅ Good: Form accessibility
<label htmlFor="email-input">Email Address</label>
<input 
  id="email-input"
  type="email"
  aria-describedby="email-help email-error"
  aria-required="true"
  aria-invalid={hasError}
/>
<div id="email-help">We'll never share your email</div>
{hasError && <div id="email-error" role="alert">Invalid email format</div>}
```

### **Keyboard Navigation**

```typescript
// ✅ Good: Keyboard event handling
function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      handleClick();
      break;
    case 'Escape':
      handleClose();
      break;
  }
}

// ✅ Good: Focus management
function focusFirstElement(container: HTMLElement) {
  const firstFocusable = container.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as HTMLElement;
  firstFocusable?.focus();
}
```

---

## 🚀 **Performance**

### **React Performance**

```typescript
// ✅ Good: Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Expensive rendering */}</div>;
});

// ✅ Good: Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// ✅ Good: Use useCallback for stable references
const handleClick = useCallback(() => {
  onItemClick(item.id);
}, [item.id, onItemClick]);

// ❌ Bad: Creating new objects/functions on every render
function Component({ items }) {
  return (
    <div>
      {items.map(item => (
        <ChildComponent 
          key={item.id}
          onClick={() => handleClick(item.id)} // New function every render
          style={{ color: 'red' }}            // New object every render
        />
      ))}
    </div>
  );
}
```

### **Bundle Optimization**

```typescript
// ✅ Good: Dynamic imports for code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

// ✅ Good: Tree shaking friendly imports
import { debounce } from 'lodash/debounce';        // Import specific function
import { Button } from '@/components/common';       // Import specific component

// ❌ Bad: Import entire libraries
import * as _ from 'lodash';                       // Imports entire library
import * as Components from '@/components';        // Imports all components
```

### **Image Optimization**

```typescript
// ✅ Good: Use Next.js Image component
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  priority={true}              // Above-the-fold images
  placeholder="blur"           // Blur placeholder
  blurDataURL="data:image/jpeg;base64,..."
  sizes="(max-width: 768px) 100vw, 50vw"  // Responsive sizing
/>

// ✅ Good: Optimize images to WebP format
// Use the provided optimization scripts
npm run optimize:images
```

---

## 🔧 **Error Handling**

### **Error Boundaries**

```typescript
// ✅ Good: Implement error boundaries
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
```

### **Async Error Handling**

```typescript
// ✅ Good: Handle async errors properly
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw for component handling
  }
}

// ✅ Good: Component error handling
function DataComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  return <DataDisplay data={data} />;
}
```

---

## 🧪 **Testing**

### **Component Testing**

```typescript
// ✅ Good: Test component behavior
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/common/Button';

test('button calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('button shows loading state', () => {
  render(<Button isLoading>Loading</Button>);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeDisabled();
});
```

### **Accessibility Testing**

```typescript
// ✅ Good: Test accessibility
import { axe, toHaveNoViolations } from 'jest-axe';

test('should not have accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('button has accessible name', () => {
  render(<Button aria-label="Close dialog">×</Button>);
  expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
});
```

---

## 📝 **Documentation**

### **Component Documentation**

```typescript
/**
 * A versatile button component with multiple variants and sizes.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
interface ButtonProps {
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
}

export default function Button({ ... }: ButtonProps) {
  // Component implementation
}
```

### **Hook Documentation**

```typescript
/**
 * Custom hook for managing navigation state and actions.
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { navigateToSection, currentSection } = useNavigation();
 *   
 *   const handleClick = () => {
 *     navigateToSection('services');
 *   };
 * }
 * ```
 * 
 * @returns Navigation state and actions
 */
function useNavigation() {
  // Hook implementation
}
```

---

## 🔍 **Code Review Checklist**

### **Before Submitting PR**

- [ ] **Functionality**: Component works as expected
- [ ] **TypeScript**: No type errors, proper interfaces
- [ ] **Accessibility**: ARIA labels, keyboard navigation
- [ ] **Responsive**: Works on all breakpoints
- [ ] **Performance**: No unnecessary re-renders
- [ ] **Testing**: Unit tests for new functionality
- [ ] **Documentation**: JSDoc comments for complex logic
- [ ] **Styling**: Follows design system
- [ ] **Error Handling**: Graceful error states
- [ ] **Security**: No XSS vulnerabilities

### **Review Questions**

1. Is the code readable and maintainable?
2. Are there any performance implications?
3. Is accessibility properly implemented?
4. Are error cases handled gracefully?
5. Is the component reusable and flexible?
6. Does it follow the established patterns?

---

## 📚 **Resources**

### **Tools and Extensions**

- **VS Code Extensions**:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Importer
  - Auto Rename Tag
  - Bracket Pair Colorizer

- **Browser Extensions**:
  - React Developer Tools
  - Lighthouse (Performance testing)
  - axe DevTools (Accessibility testing)

### **Useful Links**

- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Next.js Best Practices](https://nextjs.org/docs/advanced-features/performance)

---

**Remember: Good code is not just working code, but code that is maintainable, readable, and follows established patterns. 🚀**