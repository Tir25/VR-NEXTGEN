/**
 * Centralized map of industry ids to background image URLs
 * Keeps UI components lightweight and eliminates duplication
 */

export const INDUSTRY_BACKGROUND_IMAGE_MAP: Record<string, string> = {
  'pharmaceutical-life-sciences': '/images-optimized/Industries/Pharmaceutical & Life Sciences.webp',
  'manufacturing-engineering': '/images-optimized/Industries/Manufacturing_Engineering.webp',
  'retail-fmcg': '/images-optimized/Industries/Fmcg.webp',
  'healthcare-hospitals': '/images-optimized/Industries/Hospitals and healthcare.webp',
  'education-edtech': '/images-optimized/Industries/Education.webp',
  'financial-services-insurance': '/images-optimized/Industries/Financial.webp',
  'industrial-infrastructure': '/images-optimized/Industries/engineering.webp',
  'it-professional-services': '/images-optimized/Industries/IT.webp',
  'other-industries': '/images-optimized/Industries/Other.webp',
};

export const hasIndustryBackgroundImage = (id: string): boolean =>
  Object.prototype.hasOwnProperty.call(INDUSTRY_BACKGROUND_IMAGE_MAP, id);

export const getIndustryBackgroundImage = (id: string): string | null =>
  INDUSTRY_BACKGROUND_IMAGE_MAP[id] || null;


