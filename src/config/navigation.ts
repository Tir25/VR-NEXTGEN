/**
 * Navigation Configuration
 * Centralized navigation data with dropdown menus
 */

import { DropdownItem } from '@/components/common/DropdownMenu';

export interface NavigationItem {
  label: string;
  href: string;
  hasDropdown: boolean;
  dropdownItems?: DropdownItem[];
}

export const navigationConfig: NavigationItem[] = [
  {
    label: 'Home',
    href: '/',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Services Overview', href: '/#services', description: 'Our core services' },
      { label: 'Industries', href: '/#industries', description: 'Industries we serve' },
      // Keep only sections that exist on the page; remove hero and unused anchors
    ]
  },
  {
    label: 'What We Do',
    href: '/what-we-do',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Overview', href: '/what-we-do', description: 'What we do overview' },
      // Remove hero and sections not present
    ]
  },
  {
    label: 'Who We Are',
    href: '/who-we-are',
    hasDropdown: true,
    dropdownItems: [
      { label: 'About Us', href: '/who-we-are', description: 'Our story and mission' },
      // Trim to only existing sections; remove hero and unused anchors
    ]
  },
  {
    label: 'Blog',
    href: '/nextgen-blog',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Latest Posts', href: '/nextgen-blog', description: 'Recent articles' },
      // Keep page link only; remove internal anchors not present
    ]
  }
];

export const servicesDropdownItems: DropdownItem[] = [
  { label: 'Strategic Consulting', href: '/services/strategic-consulting', description: 'Business strategy and planning' },
  { label: 'Data Analytics', href: '/services/data-analytics', description: 'Advanced data insights' },
  { label: 'Digital Transformation', href: '/services/digital-transformation', description: 'Digital modernization' },
  { label: 'Business Consulting', href: '/services/business-consulting', description: 'Business optimization' },
  { label: 'Process Optimization', href: '/services/process-optimization', description: 'Workflow improvements' },
  { label: 'Change Management', href: '/services/change-management', description: 'Organizational change' },
  { label: 'Financial Advisory', href: '/services/financial-advisory', description: 'Financial guidance' },
  { label: 'Automation Solutions', href: '/services/automation-solutions', description: 'Process automation' },
  { label: 'Data Visualization', href: '/services/data-visualization', description: 'Visual data insights' },
  { label: 'End-to-End Solutions', href: '/services/end-to-end-solutions', description: 'Complete solutions' }
];

export const industriesDropdownItems: DropdownItem[] = [
  { label: 'Healthcare & Hospitals', href: '/industries/healthcare-hospitals', description: 'Medical industry solutions' },
  { label: 'Financial Services', href: '/industries/financial-services-insurance', description: 'Banking and insurance' },
  { label: 'Manufacturing', href: '/industries/manufacturing-engineering', description: 'Production optimization' },
  { label: 'IT Professional Services', href: '/industries/it-professional-services', description: 'Technology consulting' },
  { label: 'Education & EdTech', href: '/industries/education-edtech', description: 'Educational technology' },
  { label: 'Pharmaceutical', href: '/industries/pharmaceutical-life-sciences', description: 'Life sciences solutions' },
  { label: 'Retail & FMCG', href: '/industries/retail-fmcg', description: 'Retail optimization' },
  { label: 'Industrial Infrastructure', href: '/industries/industrial-infrastructure', description: 'Infrastructure solutions' },
  { label: 'Other Industries', href: '/industries/other-industries', description: 'Custom solutions' }
];
