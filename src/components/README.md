# VR NextGEN Components

This directory contains all reusable UI components organized according to VR NextGEN best practices.

## Directory Structure

```
components/
├── common/          # Reusable UI components (Button, Input, Logo, etc.)
├── layout/          # Layout components (Header, Footer, Layout)
├── sections/        # Page sections organized by feature
│   ├── about/       # About page sections
│   ├── hero/        # Hero section components
│   ├── services/    # Services section components
│   ├── cta/         # Call-to-action components
│   └── why-choose-us/ # Why choose us section
└── widgets/         # Interactive widgets (Carousel, etc.)
```

## Component Guidelines

### Button Component
- Enhanced with micro-interactions (golden glow, ripple effects)
- Supports multiple variants: primary, secondary, outline
- Responsive design with mobile-first approach
- Accessibility features with ARIA attributes

### Design System
- Follows VR NextGEN black and gold color scheme
- Uses Tailwind CSS with custom design tokens
- Implements golden glow hover effects
- Supports reduced motion for accessibility

## Usage

```tsx
import { Button } from '@/components/common';
import { Hero } from '@/components/sections';

// Use enhanced button with micro-interactions
<Button variant="primary" size="md">
  Get Started
</Button>
```

## Best Practices

1. **Single Responsibility**: Each component has one clear purpose
2. **Reusability**: Components are designed to be reused across the application
3. **Accessibility**: All components include proper ARIA attributes
4. **Responsive**: Mobile-first design with breakpoint considerations
5. **Performance**: Optimized with proper memoization where needed
