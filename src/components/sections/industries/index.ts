/**
 * Industries Section Components Export
 * Centralized export for all Industries section components
 */

export { default as Industries } from './Industries';
export { default as IndustryCard } from './IndustryCard';
export { default as IndustriesHeader } from './IndustriesHeader';
export { default as IndustriesControls } from './IndustriesControls';

// Types
export type { 
  IndustryCard as IndustryCardType, 
  IndustryCardProps,
  IndustriesSectionProps 
} from './types';

// Constants
export { INDUSTRIES, CAROUSEL_CONFIG, RESPONSIVE_RADIUS, CARD_SIZES } from './constants';
