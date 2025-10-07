/**
 * Services Section Types
 * Type definitions for the Services section components
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  category: 'strategy' | 'optimization' | 'analytics' | 'visualization' | 'automation' | 'solutions';
  bgUrl?: string;
}

export interface ServiceCardProps {
  service: Service;
  index: number;
  isVisible: boolean;
}

export interface ServiceCardWrapperProps {
  children: React.ReactNode;
  index: number;
}

export interface ServicesSectionProps {
  className?: string;
  id?: string;
}
