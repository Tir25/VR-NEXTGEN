/**
 * Animation Configuration
 * Centralized animation settings and constants
 */

export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
} as const;

export const ANIMATION_EASINGS = {
  EASE_IN_OUT: 'ease-in-out',
  EASE_OUT: 'ease-out',
  EASE_IN: 'ease-in',
  BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  SMOOTH: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
} as const;

export const TRANSITION_CONFIGS = {
  FAST: `${ANIMATION_DURATIONS.FAST}ms ${ANIMATION_EASINGS.EASE_IN_OUT}`,
  NORMAL: `${ANIMATION_DURATIONS.NORMAL}ms ${ANIMATION_EASINGS.EASE_IN_OUT}`,
  SLOW: `${ANIMATION_DURATIONS.SLOW}ms ${ANIMATION_EASINGS.EASE_IN_OUT}`,
  BOUNCE: `${ANIMATION_DURATIONS.NORMAL}ms ${ANIMATION_EASINGS.BOUNCE}`,
  SMOOTH: `${ANIMATION_DURATIONS.VERY_SLOW}ms ${ANIMATION_EASINGS.SMOOTH}`,
} as const;

export const SCROLL_CONFIGS = {
  THRESHOLD: 0.1,
  ROOT_MARGIN: '50px 0px',
  TRIGGER_ONCE: true,
} as const;

export const STAGGER_DELAYS = {
  SERVICE_CARDS: 100,
  INDUSTRY_CARDS: 150,
  NAVIGATION_ITEMS: 50,
} as const;
