/**
 * Centralized map of industry ids to background image URLs
 * Keeps UI components lightweight and eliminates duplication
 */

export const INDUSTRY_BACKGROUND_IMAGE_MAP: Record<string, string> = {
  'pharmaceutical-life-sciences': '/images/Industries/Pharmaceutical & Life Sciences.png',
  'manufacturing-engineering': '/images/Industries/Manufacturing_Engineering.png',
  'retail-fmcg': '/images/Industries/Fmcg.png',
  'healthcare-hospitals': '/images/Industries/Hospitals and healthcare.png',
  'education-edtech': '/images/Industries/Education.png',
  'financial-services-insurance': '/images/Industries/Financial.png',
  'industrial-infrastructure': '/images/Industries/engineering.png',
  'it-professional-services': '/images/Industries/IT.png',
  'other-industries': '/images/Industries/Other.png',
};

export const hasIndustryBackgroundImage = (id: string): boolean =>
  Object.prototype.hasOwnProperty.call(INDUSTRY_BACKGROUND_IMAGE_MAP, id);

export const getIndustryBackgroundImage = (id: string): string | null =>
  INDUSTRY_BACKGROUND_IMAGE_MAP[id] || null;


