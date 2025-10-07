/**
 * Common UI Components Export
 * Centralized export for all reusable UI components following VR NextGEN design system
 */

export { default as Button } from './Button';
export { default as ErrorBoundary } from './ErrorBoundary';
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
export { default as SafeWrapper, SafeSection, SafeAnimation } from './SafeWrapper';
export { default as BrowserCompatibility, IntersectionObserverCompatible, AnimationCompatible, StorageCompatible, ModernBrowserCompatible } from './BrowserCompatibility';
export { default as SafeAnimationComponent, SafeFadeIn, SafeSlideUp, SafeSlideDown, SafeScaleIn, SafeStaticAnimation } from './SafeAnimation';
export { default as InputValidator, EmailValidator, PhoneValidator, NameValidator, PasswordValidator, commonValidationRules } from './InputValidator';

// New modular and sustainable components
export { default as BackgroundEffects, GridLayer, AuroraLayer, ShineLayer, VignetteLayer, StarfieldLayer } from './BackgroundEffects';
export { default as Carousel, CarouselControls } from './Carousel';
export { default as AnimationSystem, StaggeredAnimation, AnimationPresets } from './AnimationSystem';
export { default as AnimatedBackground } from './AnimatedBackground';
export { default as SectionBoundary } from './SectionBoundary';
