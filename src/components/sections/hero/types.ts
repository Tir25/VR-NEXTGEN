/**
 * Hero Section Types
 * Type definitions for the Hero section components
 */

export interface HeroProps {
  className?: string;
  id?: string;
}

export interface HeroImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  quality?: number;
}

export interface HeroButtonProps {
  onClick: () => void;
  variant: 'primary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  ariaLabel: string;
  children: React.ReactNode;
}
