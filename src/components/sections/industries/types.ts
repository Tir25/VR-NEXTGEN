/**
 * Industries Section Types
 * Type definitions for the Industries section components
 */

export interface IndustryCard {
  id: string;
  category: string;
  title: string;
  icon: string;
  preview: string;
  description: string;
  location: string;
  timestamp: string;
}

export interface IndustryCardProps {
  industry: IndustryCard;
  isActive: boolean;
  index?: number;
}


export interface IndustriesSectionProps {
  className?: string;
  id?: string;
}
