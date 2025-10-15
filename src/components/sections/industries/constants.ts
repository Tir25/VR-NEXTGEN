/**
 * Industries Section Constants
 * Data and configuration for the Industries section
 */

import { IndustryCard } from './types';

export const INDUSTRIES: IndustryCard[] = [
  {
    id: 'pharmaceutical-life-sciences',
    category: 'PHARMACEUTICAL & LIFE SCIENCES',
    title: 'Pharmaceutical & Life Sciences',
    icon: 'fas fa-pills',
    preview: 'Driving Compliance, Quality, and Agility',
    description: '• Lean Manufacturing & GMP Compliance Coaching\n• Batch Yield Optimization & Changeover Reduction (SMED)\n• Digital Documentation & Quality Dashboards\n• Expiry, Wastage, & Material Flow Optimization\n\nBetter productivity, reduced quality deviations, and data-backed decision-making across production and quality teams. 💊 Efficiency meets compliance — powered by data.',
    location: '',
    timestamp: ''
  },
  {
    id: 'manufacturing-engineering',
    category: 'MANUFACTURING & ENGINEERING',
    title: 'Manufacturing & Engineering',
    icon: 'fas fa-industry',
    preview: 'Building Smarter, Leaner, and Connected Operations',
    description: '• Inventory & Supply Chain Optimization\n• OEE Monitoring & Process Automation\n• ERP–Analytics Integration for Real-Time Reporting\n• Preventive Maintenance & Resource Allocation Analytics\n\nTurning traditional plants into data-smart factories with full visibility and optimized operations. 🏭',
    location: '',
    timestamp: ''
  },
  {
    id: 'retail-fmcg',
    category: 'RETAIL & FMCG',
    title: 'Retail & FMCG',
    icon: 'fas fa-shopping-cart',
    preview: 'Transforming Consumer Insights into Competitive Advantage',
    description: '• Demand Forecasting & Inventory Management\n• Sales Performance Dashboards & Price Analytics\n• Distribution Efficiency & Route Optimization\n• Customer Segmentation & Market Trend Analysis\n\nFrom shelf to strategy — every move informed by data. 🛒',
    location: '',
    timestamp: ''
  },
  {
    id: 'healthcare-hospitals',
    category: 'HEALTHCARE & HOSPITALS',
    title: 'Healthcare & Hospitals',
    icon: 'fas fa-hospital',
    preview: 'Enhancing Patient Outcomes Through Process and Data Excellence',
    description: '• Hospital Process Optimization (Admissions, Billing, Discharge)\n• Bed Utilization & Patient Flow Analytics\n• Resource Allocation & Staffing Dashboards\n• Quality, Compliance, & Accreditation Reporting\n\nBetter patient satisfaction, faster service delivery, and reduced administrative inefficiencies. 🏥',
    location: '',
    timestamp: ''
  },
  {
    id: 'education-edtech',
    category: 'EDUCATION & EDTECH',
    title: 'Education & EdTech',
    icon: 'fas fa-graduation-cap',
    preview: 'Building Smarter Institutions with Insightful Data',
    description: '• Student Performance & Placement Dashboards\n• Admission Forecasting & Resource Planning\n• ERP & LMS Integration for Centralized Data\n• Faculty Productivity & Operational Analytics\n\nFrom learning to leading — powered by analytics. 🎓',
    location: '',
    timestamp: ''
  },
  {
    id: 'financial-services-insurance',
    category: 'FINANCIAL SERVICES & INSURANCE',
    title: 'Financial Services & Insurance',
    icon: 'fas fa-chart-line',
    preview: 'Empowering Financial Clarity and Compliance',
    description: '• Risk Management & Compliance Analytics\n• Reporting & KPI Dashboards\n• Process Automation & Efficiency\n• Profitability & Performance Insights\n\nWhere precision meets performance. 💰',
    location: '',
    timestamp: ''
  },
  {
    id: 'industrial-infrastructure',
    category: 'INDUSTRIAL & INFRASTRUCTURE',
    title: 'Industrial & Infrastructure',
    icon: 'fas fa-hard-hat',
    preview: 'Building Efficiency from the Ground Up',
    description: '• Project Gantt Charts & Progress Dashboards\n• Material, Cost & Resource Utilization Analytics\n• Delay Prediction & Risk Mitigation\n• Contractor & Vendor Performance Monitoring\n\nEngineering excellence through intelligence. 🏗️',
    location: '',
    timestamp: ''
  },
  {
    id: 'it-professional-services',
    category: 'IT & PROFESSIONAL SERVICES',
    title: 'IT & Professional Services',
    icon: 'fas fa-laptop-code',
    preview: 'Optimizing Human Capital and Project Delivery',
    description: '• Resource Allocation & Time Utilization Dashboards\n• KPI & SLA Tracking\n• Automation for Report Generation & Task Monitoring\n• Workforce Productivity & Billing Analytics\n\nTurning human effort into measurable impact. 💼',
    location: '',
    timestamp: ''
  },
  {
    id: 'other-industries',
    category: 'OTHER INDUSTRIES',
    title: 'Other Industries',
    icon: 'fas fa-cogs',
    preview: 'Custom Solutions for Diverse Business Ecosystems',
    description: '• Logistics, Hospitality & Energy Solutions\n• Data-Driven Process Optimization\n• Analytics & Reporting Tailored to Needs\n• Scalable & Flexible Frameworks\n\nCustom analytics and process optimization designed for any business. Measurable, data-led improvement across sectors. 🔧',
    location: '',
    timestamp: ''
  }
];

// Import centralized configuration
import { CAROUSEL_CONSTANTS, RESPONSIVE_CAROUSEL_CONFIG } from '@/config';

export const CAROUSEL_CONFIG = {
  transitionDuration: CAROUSEL_CONSTANTS.TRANSITION_DURATION,
  rotationSpeed: CAROUSEL_CONSTANTS.ROTATION_SPEED,
  swipeThreshold: CAROUSEL_CONSTANTS.SWIPE_THRESHOLD,
  snapThreshold: CAROUSEL_CONSTANTS.SNAP_THRESHOLD,
} as const;

export const RESPONSIVE_RADIUS = RESPONSIVE_CAROUSEL_CONFIG.radius;

export const CARD_SIZES = RESPONSIVE_CAROUSEL_CONFIG.cardSizes;
