/**
 * Responsive Configuration
 * Centralized responsive breakpoints and calculations
 */

// import { breakpoints } from '@/design-system/tokens';

// Responsive breakpoints (matching Tailwind defaults)
export const RESPONSIVE_BREAKPOINTS = {
  xs: 360,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Responsive utilities
export const getResponsiveValue = <T>(
  values: Partial<Record<keyof typeof RESPONSIVE_BREAKPOINTS, T>>,
  fallback: T
): T => {
  if (typeof window === 'undefined') return fallback;
  
  const width = window.innerWidth;
  
  if (width >= RESPONSIVE_BREAKPOINTS['2xl']) return values['2xl'] ?? fallback;
  if (width >= RESPONSIVE_BREAKPOINTS.xl) return values.xl ?? fallback;
  if (width >= RESPONSIVE_BREAKPOINTS.lg) return values.lg ?? fallback;
  if (width >= RESPONSIVE_BREAKPOINTS.md) return values.md ?? fallback;
  if (width >= RESPONSIVE_BREAKPOINTS.sm) return values.sm ?? fallback;
  
  return values.xs ?? fallback;
};

// Responsive radius configuration for carousels
export const RESPONSIVE_CAROUSEL_CONFIG = {
  radius: {
    xs: 120,    // Mobile: Smaller radius for better fit
    sm: 160,    // Small mobile: Slightly larger
    md: 220,    // Tablet: Medium radius
    lg: 380,    // Desktop: Increased for larger cards
    xl: 460,    // Large desktop: Increased spacing
    '2xl': 520, // XL desktop: Increased spacing
  },
  cardSizes: {
    xs: { width: 'clamp(100px, 20vw, 140px)', height: 'clamp(140px, 25vh, 180px)' },      // Mobile: Smaller cards
    sm: { width: 'clamp(120px, 18vw, 160px)', height: 'clamp(160px, 23vh, 200px)' },     // Small mobile: Slightly larger
    md: { width: 'clamp(140px, 16vw, 180px)', height: 'clamp(180px, 21vh, 220px)' },     // Tablet: Medium cards
    lg: { width: 'clamp(200px, 18vw, 280px)', height: 'clamp(300px, 28vh, 360px)' },     // Desktop: Larger cards
    xl: { width: 'clamp(220px, 20vw, 320px)', height: 'clamp(340px, 32vh, 400px)' },     // Large desktop: Larger cards
    '2xl': { width: 'clamp(240px, 22vw, 360px)', height: 'clamp(380px, 36vh, 440px)' }, // XL desktop: Larger cards
  },
  containerHeights: {
    xs: 'clamp(280px, 45vh, 360px)',  // Mobile: Smaller container
    sm: 'clamp(320px, 50vh, 420px)',  // Small mobile: Slightly larger
    md: 'clamp(400px, 55vh, 500px)',  // Tablet: Medium container
    lg: 'clamp(400px, 40vh, 500px)',  // Desktop: Minimal height for tight spacing
    xl: 'clamp(420px, 42vh, 520px)',  // Large desktop: Minimal height
    '2xl': 'clamp(440px, 44vh, 540px)', // XL desktop: Minimal height
  },
  textScaling: {
    xs: { category: '0.7rem', title: '0.9rem', icon: '1.2rem', description: '0.75rem' }, // Mobile: Smaller text
    sm: { category: '0.75rem', title: '1rem', icon: '1.4rem', description: '0.8rem' },   // Small mobile: Slightly larger
    md: { category: '0.8rem', title: '1.1rem', icon: '1.6rem', description: '0.85rem' }, // Tablet: Medium text
    lg: { category: '0.85rem', title: '1.15rem', icon: '1.7rem', description: '0.9rem' },  // Desktop: Larger text
    xl: { category: '0.9rem', title: '1.25rem', icon: '1.8rem', description: '0.95rem' },  // Large desktop: Larger text
    '2xl': { category: '0.95rem', title: '1.35rem', icon: '1.9rem', description: '1rem' }, // XL desktop: Larger text
  },
  mobilePadding: {
    xs: '0.75rem',  // Mobile: Tighter padding
    sm: '0.875rem', // Small mobile: Slightly more padding
    md: '1rem',     // Tablet: Standard padding
    lg: '0.75rem',  // Desktop: Original padding
    xl: '0.75rem',  // Large desktop: Original padding
    '2xl': '0.75rem', // XL desktop: Original padding
  }
} as const;

// Animation timing configuration
export const ANIMATION_TIMING = {
  fast: 150,
  normal: 300,
  slow: 500,
  carousel: 1000,
  ripple: 600,
  fadeIn: 800,
  slideIn: 700,
} as const;

// Easing functions
export const EASING_FUNCTIONS = {
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

// Z-index scale for consistent layering
export const Z_INDEX_SCALE = {
  background: -10,
  content: 0,
  header: 100,
  dropdown: 1000,
  modal: 2000,
  toast: 3000,
  tooltip: 4000,
} as const;

// Grid and layout configuration
export const LAYOUT_CONFIG = {
  containerMaxWidth: {
    xs: '100%',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  padding: {
    xs: '1rem',
    sm: '1.5rem',
    md: '2rem',
    lg: '2.5rem',
    xl: '3rem',
    '2xl': '4rem',
  },
  sectionSpacing: {
    xs: '2rem',
    sm: '3rem',
    md: '4rem',
    lg: '5rem',
    xl: '6rem',
    '2xl': '8rem',
  }
} as const;
