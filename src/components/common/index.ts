/**
 * Common UI Components Export
 * Centralized export for all reusable UI components following VR NextGEN design system
 */

export { default as Button } from './Button';
export { default as DropdownMenu } from './DropdownMenu';
export { default as ErrorBoundary } from './ErrorBoundary';
export { default as ImportErrorBoundary } from './ImportErrorBoundary';
export { default as Input } from './Input';
export { default as LazyWrapper } from './LazyWrapper';
export { default as Logo } from './Logo';

// New reusable layout components
export { default as Section, HeroSection, ServicesSection, IndustriesSection, WhyChooseSection, ClientsSection } from './Section';
export { default as Container, SmallContainer, MediumContainer, LargeContainer, ExtraLargeContainer, FullWidthContainer } from './Container';
export { default as SectionHeader, HeroHeader, ServicesHeader, IndustriesHeader, WhyChooseHeader } from './SectionHeader';
export { default as ButtonGroup, CTAButtonGroup, NavigationButtonGroup, ActionButtonGroup } from './ButtonGroup';
// AnimationWrapper removed as it was unused

// Error isolation and safety components
// SafeWrapper, BrowserCompatibility, and SafeAnimation components removed as they were unused
// InputValidator moved to utils/validation - import from there if needed

// New modular and sustainable components
export { BackgroundEffects } from './background';
export { default as Carousel, CarouselControls } from './Carousel';
// AnimationSystem removed as it was unused
export { default as AnimatedBackground } from './AnimatedBackground';
export { default as SectionBoundary } from './SectionBoundary';

// Skeleton loading components
export { default as SkeletonLoader, ServiceCardSkeleton, IndustryCardSkeleton, GridSkeleton, HeroSkeleton } from './SkeletonLoader';

// Optimized image components
export { default as OptimizedValuesImage } from './OptimizedValuesImage';
export { default as OptimizedVisionImage } from './OptimizedVisionImage';
export { default as OptimizedCareersImage } from './OptimizedCareersImage';
export { default as OptimizedMissionImage } from './OptimizedMissionImage';
export { default as OptimizedAboutImage } from './OptimizedAboutImage';
export { default as OptimizedWhatWeDoImage } from './OptimizedWhatWeDoImage';

