/**
 * VR NextGEN Design System - Design Tokens
 * Centralized design tokens for consistent theming and easy updates
 */

// Color Palette
export const colors = {
  // Core Brand Colors
  black: '#000000',
  white: '#ffffff',
  gold: '#ffd700',
  goldDark: '#ad974f',
  goldDarker: '#8e793e',
  deepCharcoal: '#231F20',
  lightGrey: '#eaeaea',
  
  // Section-Specific Colors
  gloryWhite: '#E6E6E6',
  sandYellow: '#FFBB01',
  grayNightBlack: '#1A1A1A',
  
  // Semantic Colors
  background: '#000000',
  foreground: '#ffffff',
  accent: '#ffd700',
  textSecondary: '#231F20',
  borderLight: '#eaeaea',
  
  // Section Backgrounds
  sectionBg: {
    hero: '#000000',
    services: '#E6E6E6',
    whyChoose: '#1A1A1A',
    clients: '#E6E6E6',
  },
  
  // Section Text Colors
  sectionText: {
    hero: '#ffffff',
    services: '#000000',
    whyChoose: '#ffffff',
    clients: '#000000',
  }
} as const;

// Typography
export const typography = {
  fontFamily: {
    sans: 'var(--font-geist-sans, ui-sans-serif, system-ui, sans-serif)',
    mono: 'var(--font-geist-mono, ui-monospace, SFMono-Regular, monospace)',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  }
} as const;

// Spacing
export const spacing = {
  px: '1px',
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const;

// Breakpoints
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Border Radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
} as const;

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  gold: '0 0 20px rgba(255, 215, 0, 0.3)',
  goldStrong: '0 0 30px rgba(255, 215, 0, 0.5)',
} as const;

// Transitions
export const transitions = {
  fast: '150ms ease-in-out',
  base: '300ms ease-in-out',
  slow: '500ms ease-in-out',
  bounce: '300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// Z-Index Scale
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Component Variants
export const buttonVariants = {
  primary: {
    bg: colors.gold,
    color: colors.black,
    hover: {
      bg: `${colors.gold}90`,
      scale: '1.02',
    }
  },
  secondary: {
    bg: `${colors.white}10`,
    color: colors.white,
    border: `${colors.white}20`,
    hover: {
      bg: `${colors.white}20`,
      border: colors.gold,
    }
  },
  outline: {
    border: colors.gold,
    color: colors.gold,
    hover: {
      bg: colors.gold,
      color: colors.black,
    }
  }
} as const;

// Animation Keyframes
export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  slideUp: {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 }
  },
  slideDown: {
    from: { transform: 'translateY(-20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 }
  },
  scaleIn: {
    from: { transform: 'scale(0.95)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 }
  },
  glow: {
    '0%, 100%': { boxShadow: shadows.gold },
    '50%': { boxShadow: shadows.goldStrong }
  }
} as const;

// Export all tokens as a single object for easy access
export const designTokens = {
  colors,
  typography,
  spacing,
  breakpoints,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  buttonVariants,
  animations,
} as const;

export type DesignTokens = typeof designTokens;
