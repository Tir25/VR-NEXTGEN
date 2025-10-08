/**
 * VR NextGEN Design System - Centralized Theme Configuration
 * Future-proof theme system for easy redesigns and brand updates
 */

export const theme = {
  // Color Palette
  colors: {
    // Primary Colors
    black: '#000000',
    white: '#ffffff',
    gold: '#ffd700',
    goldDark: '#ad974f',
    goldDarker: '#8e793e',
    lightGrey: '#eaeaea',
    
    // Section-Specific Colors
    gloryWhite: '#E6E6E6',
    sandYellow: '#FFBB01',
    grayNightBlack: '#1A1A1A',
    deepCharcoal: '#231F20',
    
    // Semantic Colors
    background: 'var(--color-black)',
    foreground: 'var(--color-white)',
    accent: 'var(--color-gold)',
    textSecondary: 'var(--color-deep-charcoal)',
    borderLight: 'var(--color-light-grey)',
    
    // Section Backgrounds
    sectionBg: {
      hero: 'var(--color-black)',
      services: 'var(--glory-white)',
      whyChoose: 'var(--gray-night-black)',
      clients: 'var(--glory-white)',
    },
    
    // Section Text Colors
    text: {
      hero: 'var(--color-white)',
      services: 'var(--color-black)',
      whyChoose: 'var(--color-white)',
      clients: 'var(--color-black)',
    },
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: 'var(--font-geist-sans, ui-sans-serif, system-ui, sans-serif)',
      mono: 'var(--font-geist-mono, ui-monospace, SFMono-Regular, monospace)',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },
  
  // Spacing System
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  },
  
  // Breakpoints
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Animation Durations
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '1000ms',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      linear: 'linear',
    },
  },
  
  // Z-Index Scale
  zIndex: {
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
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
} as const;

export type Theme = typeof theme;
export type ColorKey = keyof typeof theme.colors;
export type SpacingKey = keyof typeof theme.spacing;
export type BreakpointKey = keyof typeof theme.breakpoints;
