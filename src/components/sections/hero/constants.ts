/**
 * Hero Section Constants
 * Data and configuration for the Hero section
 */

import { HeroImageProps } from './types';
import { LAYOUT_CONSTANTS, ANIMATION_CONSTANTS } from '@/config';

// Banner image removed - using animated text content instead
export const HERO_IMAGE_CONFIG: HeroImageProps = {
  src: "/images/Hero.png",
  alt: "VR NextGEN Solutions - Modern business consultancy and data analytics platform",
  priority: true,
  quality: 85,
};

export const HERO_BUTTONS = {
  primary: {
    text: "Get Started",
    action: "scrollToServices",
    variant: "primary" as const,
  },
  secondary: {
    text: "Learn More", 
    action: "scrollToIndustries",
    variant: "outline" as const,
  },
} as const;

export const HERO_CONFIG = {
  minHeight: LAYOUT_CONSTANTS.HERO_MIN_HEIGHT,
  parallaxSpeed: ANIMATION_CONSTANTS.PARALLAX_SPEED,
  fadeSpeed: ANIMATION_CONSTANTS.NORMAL,
} as const;
