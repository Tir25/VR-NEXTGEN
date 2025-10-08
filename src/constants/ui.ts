/**
 * UI Constants
 * UI-specific constants and design tokens
 */

export const UI_CONSTANTS = {
  // Color values
  COLORS: {
    PRIMARY: '#ffd700',
    SECONDARY: '#ffbb01',
    ACCENT: '#ad974f',
    SUCCESS: '#10b981',
    WARNING: '#f59e0b',
    ERROR: '#ef4444',
    INFO: '#3b82f6',
    
    // Background colors
    BACKGROUND: {
      PRIMARY: '#000000',
      SECONDARY: '#1a1a1a',
      TERTIARY: '#231f20',
      SURFACE: '#ffffff',
      OVERLAY: 'rgba(0, 0, 0, 0.6)',
    },
    
    // Text colors
    TEXT: {
      PRIMARY: '#ffffff',
      SECONDARY: '#e6e6e6',
      TERTIARY: '#9ca3af',
      INVERSE: '#000000',
    },
  },
  
  // Border radius values
  BORDER_RADIUS: {
    SM: '0.125rem',
    MD: '0.375rem',
    LG: '0.5rem',
    XL: '0.75rem',
    '2XL': '1rem',
    FULL: '9999px',
  },
  
  // Shadow values
  SHADOWS: {
    SM: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    MD: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    LG: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    XL: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    INNER: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  
  // Spacing values
  SPACING: {
    XS: '0.25rem',
    SM: '0.5rem',
    MD: '1rem',
    LG: '1.5rem',
    XL: '2rem',
    '2XL': '3rem',
    '3XL': '4rem',
  },
  
  // Font sizes
  FONT_SIZES: {
    XS: '0.75rem',
    SM: '0.875rem',
    BASE: '1rem',
    LG: '1.125rem',
    XL: '1.25rem',
    '2XL': '1.5rem',
    '3XL': '1.875rem',
    '4XL': '2.25rem',
    '5XL': '3rem',
  },
  
  // Font weights
  FONT_WEIGHTS: {
    LIGHT: '300',
    NORMAL: '400',
    MEDIUM: '500',
    SEMIBOLD: '600',
    BOLD: '700',
    EXTRABOLD: '800',
  },
  
  // Line heights
  LINE_HEIGHTS: {
    TIGHT: '1.25',
    NORMAL: '1.5',
    RELAXED: '1.625',
    LOOSE: '2',
  },
  
  // Component-specific constants
  COMPONENTS: {
    BUTTON: {
      PADDING: {
        SM: '0.5rem 1rem',
        MD: '0.75rem 1.5rem',
        LG: '1rem 2rem',
      },
      BORDER_RADIUS: '0.5rem',
      FONT_SIZE: {
        SM: '0.875rem',
        MD: '1rem',
        LG: '1.125rem',
      },
    },
    
    CARD: {
      PADDING: '1.5rem',
      BORDER_RADIUS: '0.75rem',
      BOX_SHADOW: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      BACKGROUND_COLOR: 'rgba(255, 255, 255, 0.05)',
    },
    
    INPUT: {
      PADDING: '0.75rem 1rem',
      BORDER_RADIUS: '0.5rem',
      BORDER_WIDTH: '1px',
      FONT_SIZE: '1rem',
    },
    
    MODAL: {
      BACKDROP_OPACITY: 0.5,
      MAX_WIDTH: '32rem',
      PADDING: '1.5rem',
      BORDER_RADIUS: '0.75rem',
    },
    
    TOOLTIP: {
      MAX_WIDTH: '16rem',
      PADDING: '0.5rem 0.75rem',
      FONT_SIZE: '0.875rem',
      ARROW_SIZE: '0.375rem',
    },
  },
} as const;

// Animation constants
export const ANIMATION_CONSTANTS = {
  RIPPLE_DURATION: 600,
} as const;

// Helper functions for UI constants
export const UIUtils = {
  // Get color value
  getColor: (category: keyof typeof UI_CONSTANTS.COLORS, shade?: string): string => {
    const colorGroup = UI_CONSTANTS.COLORS[category];
    if (typeof colorGroup === 'string') {
      return colorGroup;
    }
    if (typeof colorGroup === 'object' && shade && shade in colorGroup) {
      return (colorGroup as any)[shade];
    }
    return UI_CONSTANTS.COLORS.PRIMARY;
  },
  
  // Get spacing value
  getSpacing: (size: keyof typeof UI_CONSTANTS.SPACING): string => {
    return UI_CONSTANTS.SPACING[size];
  },
  
  // Get font size
  getFontSize: (size: keyof typeof UI_CONSTANTS.FONT_SIZES): string => {
    return UI_CONSTANTS.FONT_SIZES[size];
  },
  
  // Get border radius
  getBorderRadius: (size: keyof typeof UI_CONSTANTS.BORDER_RADIUS): string => {
    return UI_CONSTANTS.BORDER_RADIUS[size];
  },
  
  // Get shadow
  getShadow: (size: keyof typeof UI_CONSTANTS.SHADOWS): string => {
    return UI_CONSTANTS.SHADOWS[size];
  },
  
  // Generate CSS custom properties
  generateCSSVariables: (): Record<string, string> => {
    const variables: Record<string, string> = {};
    
    // Color variables
    Object.entries(UI_CONSTANTS.COLORS).forEach(([category, value]) => {
      if (typeof value === 'string') {
        variables[`--color-${category.toLowerCase()}`] = value;
      } else if (typeof value === 'object') {
        Object.entries(value).forEach(([shade, colorValue]) => {
          variables[`--color-${category.toLowerCase()}-${shade.toLowerCase()}`] = colorValue;
        });
      }
    });
    
    // Spacing variables
    Object.entries(UI_CONSTANTS.SPACING).forEach(([key, value]) => {
      variables[`--spacing-${key.toLowerCase()}`] = value;
    });
    
    // Font size variables
    Object.entries(UI_CONSTANTS.FONT_SIZES).forEach(([key, value]) => {
      variables[`--font-size-${key.toLowerCase()}`] = value;
    });
    
    return variables;
  },
} as const;
