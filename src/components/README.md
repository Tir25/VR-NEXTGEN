# 🧩 VR NextGEN Solutions - Component Library

## 📋 **Overview**

This document provides comprehensive documentation for all React components in the VR NextGEN Solutions project. Each component is designed with reusability, accessibility, and performance in mind.

---

## 🏗️ **Component Architecture**

### **Component Hierarchy**

```
components/
├── common/              # Reusable UI components
│   ├── Button.tsx       # Enhanced button component
│   ├── ErrorBoundary.tsx # Error handling wrapper
│   ├── Input.tsx        # Form input component
│   ├── LazyWrapper.tsx  # Lazy loading wrapper
│   └── Logo.tsx         # Company logo component
├── layout/              # Layout components
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Site footer
│   └── Layout.tsx       # Main layout wrapper
├── sections/            # Page sections
│   ├── hero/            # Hero sections
│   ├── services/        # Services sections
│   ├── what-we-do/      # What we do sections
│   ├── who-we-are/      # Who we are sections
│   ├── why-choose-us/   # Why choose us sections
│   └── cta/             # Call-to-action sections
└── contact/             # Contact-specific components
    └── ContactForm.tsx  # Contact form component
```

---

## 🔧 **Common Components**

### **Button Component**

**File:** `src/components/common/Button.tsx`

**Purpose:** Enhanced button component with multiple variants, sizes, and interactive effects.

**Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disableRipple?: boolean;
}
```

**Features:**
- ✅ Multiple variants (primary, secondary, outline)
- ✅ Three sizes (sm, md, lg)
- ✅ Loading state with spinner
- ✅ Ripple effect on click
- ✅ Accessibility support
- ✅ TypeScript interfaces

**Usage Examples:**
```typescript
// Basic button
<Button>Click me</Button>

// Primary button with loading
<Button variant="primary" isLoading={isSubmitting}>
  Submit
</Button>

// Large outline button
<Button variant="outline" size="lg">
  Learn More
</Button>

// Button with custom styling
<Button className="custom-class" onClick={handleClick}>
  Custom Action
</Button>
```

**Styling:**
```css
.btn-primary {
  @apply bg-gold text-black hover:bg-gold/90 focus:ring-gold;
}

.btn-secondary {
  @apply bg-black text-gold border-gold hover:bg-gold hover:text-black;
}

.btn-outline {
  @apply border-gold text-gold hover:bg-gold hover:text-black;
}
```

### **ErrorBoundary Component**

**File:** `src/components/common/ErrorBoundary.tsx`

**Purpose:** Catches JavaScript errors anywhere in the component tree and displays a fallback UI.

**Props:**
```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: AppError, errorInfo: ErrorInfo) => void;
}
```

**Features:**
- ✅ Catches component errors
- ✅ User-friendly error messages
- ✅ Development error details
- ✅ Retry functionality
- ✅ Centralized error handling

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

**Purpose:** Lazy loads components when they enter the viewport for performance optimization.

**Props:**
```typescript
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  triggerOnce?: boolean;
  placeholder?: React.ReactNode;
  enablePerformanceMonitoring?: boolean;
}
```

**Features:**
- ✅ Intersection Observer API
- ✅ Configurable thresholds
- ✅ Performance monitoring
- ✅ Custom loading states
- ✅ Trigger once option

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

### **Logo Component**

**File:** `src/components/common/Logo.tsx`

**Purpose:** Displays the company logo with responsive sizing and optimization.

**Props:**
```typescript
interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  priority?: boolean;
}
```

**Features:**
- ✅ Responsive sizing
- ✅ WebP optimization
- ✅ Next.js Image optimization
- ✅ Priority loading option
- ✅ Accessibility support

**Usage:**
```typescript
<Logo size="lg" priority={true} />
<Logo size="sm" className="custom-logo" />
```

### **Input Component**

**File:** `src/components/common/Input.tsx`

**Purpose:** Form input component with validation and accessibility features.

**Props:**
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outlined';
}
```

**Features:**
- ✅ Label and helper text
- ✅ Error state handling
- ✅ Multiple variants
- ✅ Accessibility attributes
- ✅ Form validation support

**Usage:**
```typescript
<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  error={errors.email}
  helperText="We'll never share your email"
/>
```

---

## 🏗️ **Layout Components**

### **Header Component**

**File:** `src/components/layout/Header.tsx`

**Purpose:** Responsive navigation header with dropdown menus and section navigation.

**Features:**
- ✅ Responsive design (hamburger menu on mobile)
- ✅ Dropdown menus for page sections
- ✅ Smooth scrolling navigation
- ✅ Section highlighting
- ✅ Cross-page navigation
- ✅ Accessibility compliance

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
  // ... other pages
};
```

**Usage:**
```typescript
// Automatically used in Layout component
<Layout>
  <Header /> {/* Included automatically */}
  <main>{children}</main>
</Layout>
```

### **Footer Component**

**File:** `src/components/layout/Footer.tsx`

**Purpose:** Site footer with company information and links.

**Features:**
- ✅ Company information
- ✅ Social media links
- ✅ Copyright notice
- ✅ Responsive design
- ✅ Accessibility support

**Usage:**
```typescript
// Automatically used in Layout component
<Layout>
  <main>{children}</main>
  <Footer /> {/* Included automatically */}
</Layout>
```

### **Layout Component**

**File:** `src/components/layout/Layout.tsx`

**Purpose:** Main layout wrapper that includes header, footer, and animated background.

**Props:**
```typescript
interface LayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}
```

**Features:**
- ✅ SEO meta tags
- ✅ Animated background
- ✅ Error boundaries
- ✅ Skip navigation link
- ✅ Responsive design

**Usage:**
```typescript
<Layout title="Home" description="VR NextGEN Solutions homepage">
  <YourPageContent />
</Layout>
```

---

## 📄 **Section Components**

### **Hero Section**

**File:** `src/components/sections/hero/Hero.tsx`

**Purpose:** Main hero section with typewriter effect and call-to-action buttons.

**Features:**
- ✅ Typewriter animation
- ✅ Parallax scrolling
- ✅ Call-to-action buttons
- ✅ Responsive design
- ✅ Accessibility support

**Usage:**
```typescript
// Used on homepage
<Hero />
```

### **Services Section**

**File:** `src/components/sections/services/Services.tsx`

**Purpose:** Displays company services with interactive cards.

**Features:**
- ✅ Service cards with hover effects
- ✅ Interactive animations
- ✅ Responsive grid layout
- ✅ Accessibility support

**Usage:**
```typescript
// Used on homepage and what-we-do page
<Services />
```

### **Why Choose Us Section**

**File:** `src/components/sections/why-choose-us/WhyChooseUs.tsx`

**Purpose:** Highlights company advantages and benefits.

**Features:**
- ✅ Feature highlights
- ✅ Animated counters
- ✅ Interactive elements
- ✅ Responsive design

**Usage:**
```typescript
// Used on homepage
<WhyChooseUs />
```


### **What We Do Sections**

**File:** `src/components/sections/what-we-do/`

**Purpose:** Sections specific to the "What We Do" page.

**Components:**
- `ServicesSection.tsx` - Detailed services showcase
- `IndustriesSection.tsx` - Industries served

**Features:**
- ✅ Detailed service information
- ✅ Industry filtering
- ✅ Interactive elements
- ✅ Responsive design

### **Who We Are Sections**

**File:** `src/components/sections/who-we-are/`

**Purpose:** Sections specific to the "Who We Are" page.

**Components:**
- `CustomerStorySection.tsx` - Customer testimonials
- `CaseStudySection.tsx` - Project case studies
- `EventsSection.tsx` - Company events

**Features:**
- ✅ Customer testimonials
- ✅ Project showcases
- ✅ Event listings
- ✅ Interactive elements

---

## 📞 **Contact Components**

### **ContactForm Component**

**File:** `src/components/contact/ContactForm.tsx`

**Purpose:** Contact form with validation and submission handling.

**Features:**
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states
- ✅ Accessibility support
- ✅ GDPR compliance

**Usage:**
```typescript
// Used on contact page
<ContactForm />
```

---

## 🎨 **Styling Guidelines**

### **CSS Classes**

All components use Tailwind CSS with custom classes:

```css
/* Button variants */
.btn-primary { @apply bg-gold text-black hover:bg-gold/90; }
.btn-secondary { @apply bg-black text-gold border-gold; }
.btn-outline { @apply border-gold text-gold hover:bg-gold; }

/* Section backgrounds */
.section-hero { @apply bg-black text-white; }
.section-services { @apply bg-white text-black; }
.section-why-choose { @apply bg-gray-900 text-white; }
```

### **Responsive Design**

All components are built mobile-first:

```typescript
// Responsive classes
<div className="
  grid grid-cols-1           // Mobile: 1 column
  sm:grid-cols-2            // Small: 2 columns
  md:grid-cols-3            // Medium: 3 columns
  lg:grid-cols-4            // Large: 4 columns
">
```

---

## ♿ **Accessibility**

### **ARIA Attributes**

All components include proper ARIA attributes:

```typescript
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  aria-controls="dialog-content"
>
  ×
</button>
```

### **Keyboard Navigation**

Components support keyboard navigation:

```typescript
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    handleClick();
  }
};
```

---

## 🚀 **Performance**

### **Lazy Loading**

Heavy components use lazy loading:

```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});
```

### **Memoization**

Components use React.memo for performance:

```typescript
export default React.memo(ExpensiveComponent);
```

---

## 🧪 **Testing**

### **Component Testing**

Components can be tested using React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import Button from '@/components/common/Button';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

### **Accessibility Testing**

Test accessibility with jest-axe:

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

test('should not have accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 📚 **Best Practices**

### **Component Design**

1. **Single Responsibility** - Each component has one clear purpose
2. **Props Interface** - Define clear TypeScript interfaces
3. **Default Props** - Provide sensible defaults
4. **Accessibility** - Include ARIA attributes and keyboard support
5. **Responsive** - Design mobile-first
6. **Performance** - Use memoization and lazy loading

### **Code Organization**

1. **File Structure** - Organize by feature and type
2. **Import Order** - React, third-party, internal, relative
3. **Export Pattern** - Default exports for components
4. **Documentation** - JSDoc comments for complex logic

---

## 🔧 **Development**

### **Adding New Components**

1. **Create Component File** - Use PascalCase naming
2. **Define Props Interface** - TypeScript interface
3. **Implement Component** - Follow established patterns
4. **Add Tests** - Unit and accessibility tests
5. **Update Documentation** - Add to this README

### **Component Template**

```typescript
import React from 'react';

interface ComponentNameProps {
  // Define props here
}

export default function ComponentName({
  // Destructure props
}: ComponentNameProps) {
  // Component implementation
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

---

**This component library is continuously evolving. For the latest information, refer to the individual component files and their inline documentation.**