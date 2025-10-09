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
export { default as SocialIcons } from './SocialIcons';

// New reusable layout components
export { default as Section, HeroSection, ServicesSection, IndustriesSection, WhyChooseSection, ClientsSection } from './Section';
export { default as Container, SmallContainer, MediumContainer, LargeContainer, ExtraLargeContainer, FullWidthContainer } from './Container';
export { default as SectionHeader, HeroHeader, ServicesHeader, IndustriesHeader, WhyChooseHeader } from './SectionHeader';
export { default as ButtonGroup, CTAButtonGroup, NavigationButtonGroup, ActionButtonGroup } from './ButtonGroup';
export { default as AnimationWrapper, FadeInWrapper, SlideUpWrapper, SlideDownWrapper, ScaleInWrapper, StaggeredWrapper } from './AnimationWrapper';

// Error isolation and safety components
export { default as SafeWrapper, SafeSection } from './SafeWrapper';
export { default as BrowserCompatibility, IntersectionObserverCompatible, AnimationCompatible, StorageCompatible, ModernBrowserCompatible } from './BrowserCompatibility';
export { default as SafeAnimation, SafeFadeIn, SafeSlideUp, SafeSlideDown, SafeScaleIn, SafeStaticAnimation } from './SafeAnimation';
export { default as InputValidator, EmailValidator, PhoneValidator, NameValidator, PasswordValidator, commonValidationRules } from './InputValidator';

// New modular and sustainable components
export { BackgroundEffects } from './background';
export { default as Carousel, CarouselControls } from './Carousel';
export { default as AnimationSystem, StaggeredAnimation, AnimationPresets } from './AnimationSystem';
export { default as AnimatedBackground } from './AnimatedBackground';
export { default as SectionBoundary } from './SectionBoundary';
export { default as FlatContainer } from './FlatContainer';
