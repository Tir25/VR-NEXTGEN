/**
 * Section Configuration
 * Centralized configuration for all page sections
 */

export const SECTION_IDS = {
  HERO: 'hero',
  SERVICES: 'services', 
  INDUSTRIES: 'industries',
  CTA: 'cta',
  WHO_WE_ARE: 'who-we-are',
  WHAT_WE_DO: 'what-we-do',
  CONTACT: 'contact',
} as const;

export const SECTION_CLASSES = {
  HERO: 'section-hero',
  SERVICES: 'section-services',
  INDUSTRIES: 'section-industries', 
  CTA: 'section-cta',
  WHO_WE_ARE: 'section-who-we-are',
  WHAT_WE_DO: 'section-what-we-do',
  CONTACT: 'section-contact',
} as const;

export const SECTION_BACKGROUNDS = {
  [SECTION_CLASSES.HERO]: 'hero',
  [SECTION_CLASSES.SERVICES]: 'services',
  [SECTION_CLASSES.INDUSTRIES]: 'industries',
  [SECTION_CLASSES.CTA]: 'hero',
  [SECTION_CLASSES.WHO_WE_ARE]: 'hero',
  [SECTION_CLASSES.WHAT_WE_DO]: 'hero',
  [SECTION_CLASSES.CONTACT]: 'hero',
} as const;

export type SectionId = typeof SECTION_IDS[keyof typeof SECTION_IDS];
export type SectionClass = typeof SECTION_CLASSES[keyof typeof SECTION_CLASSES];
