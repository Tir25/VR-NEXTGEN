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
    hasDropdown: false,
    dropdownItems: []
  },
  {
    label: 'What We Do',
    href: '/what-we-do',
    hasDropdown: true,
    dropdownItems: [
      { 
        label: 'Overview', 
        href: '/what-we-do', 
        description: 'What we do overview',
        showOnHover: true,
        hoverContent: 'At VR NEXTGEN, we empower businesses to unlock their full potential through data, strategy, and intelligent transformation. We combine analytics, process excellence, and technology to help organizations make smarter decisions and achieve sustainable growth.'
      },
      { 
        label: 'Our Services', 
        href: '/what-we-do#services', 
        description: 'Comprehensive business solutions',
        showOnHover: true,
        hoverContent: 'From business consulting and strategic planning to process optimization, automation, and performance monitoring, we design solutions that are practical, data-backed, and impact-driven.'
      },
      { 
        label: 'Industries', 
        href: '/what-we-do#industries', 
        description: 'Industries we serve',
        showOnHover: true,
        hoverContent: 'Our team works closely with industries across pharmaceuticals, manufacturing, retail, healthcare, finance, education, and technology, helping them evolve into agile, insight-led enterprises.'
      },
    ]
  },
  {
    label: 'Who We Are',
    href: '/who-we-are',
    hasDropdown: true,
    dropdownItems: [
      { 
        label: 'About Us', 
        href: '/who-we-are', 
        description: 'Our story and mission',
        showOnHover: true,
        hoverContent: 'We deliver excellence and create value for customers and communities\n\nOur expert, committed team puts our shared values into action everyday. With the best talent and the latest technology we help customers turn complexity into opportunity and create meaningful change.'
      },
      { 
        label: 'Our Values', 
        href: '/who-we-are#our-values', 
        description: 'The foundation of every transformation',
        showOnHover: true,
        hoverContent: 'At VR NextGen Solutions, our values are more than words — they guide every project, every partnership, and every innovation we deliver. They define who we are and how we create impact — for our clients, our people, and the communities we serve.'
      },
      { 
        label: 'Our Vision', 
        href: '/who-we-are#our-vision', 
        description: 'Transforming data into actionable intelligence',
        showOnHover: true,
        hoverContent: 'To deliver end-to-end business solutions and strategic insights that transform data into actionable intelligence, enabling organizations to streamline processes, enhance efficiency, and maximize profitability.'
      },
      { 
        label: 'Our Mission', 
        href: '/who-we-are#our-mission', 
        description: 'Delivering end-to-end business solutions',
        showOnHover: true,
        hoverContent: 'To deliver end-to-end business solutions and strategic insights that transform data into actionable intelligence, enabling organizations to streamline processes, enhance efficiency, and maximize profitability. Our mission drives every project and partnership we undertake.'
      }
    ]
  },
  {
    label: 'Insights',
    href: '/insights',
    hasDropdown: false,
    dropdownItems: []
  },
  {
    label: 'Careers',
    href: '/careers',
    hasDropdown: false,
    dropdownItems: []
  }
];

export const servicesDropdownItems: DropdownItem[] = [
  { 
    label: 'Strategic Consulting', 
    href: '/services/strategic-consulting', 
    description: 'Business strategy and planning',
    showOnHover: true,
    hoverContent: 'Comprehensive business strategy development and implementation guidance to drive your organization\'s success and competitive advantage.'
  },
  { 
    label: 'Data Analytics', 
    href: '/services/data-analytics', 
    description: 'Advanced data insights',
    showOnHover: true,
    hoverContent: 'Transform scattered information into actionable insights with our unified analytics framework covering descriptive, diagnostic, and predictive analytics.'
  },
  { 
    label: 'Digital Transformation', 
    href: '/services/digital-transformation', 
    description: 'Digital modernization',
    showOnHover: true,
    hoverContent: 'Modernize your business operations with comprehensive digital transformation strategies that enhance efficiency and drive innovation.'
  },
  { 
    label: 'Business Consulting', 
    href: '/services/business-consulting', 
    description: 'Business optimization',
    showOnHover: true,
    hoverContent: 'Optimize your business operations with expert consulting services that improve performance, reduce costs, and enhance customer satisfaction.'
  },
  { 
    label: 'Process Optimization', 
    href: '/services/process-optimization', 
    description: 'Workflow improvements',
    showOnHover: true,
    hoverContent: 'Streamline and optimize your business processes to improve efficiency, reduce waste, and enhance overall organizational performance.'
  },
  { 
    label: 'Change Management', 
    href: '/services/change-management', 
    description: 'Organizational change',
    showOnHover: true,
    hoverContent: 'Navigate organizational change successfully with our proven change management methodologies that minimize disruption and maximize adoption.'
  },
  { 
    label: 'Financial Advisory', 
    href: '/services/financial-advisory', 
    description: 'Financial guidance',
    showOnHover: true,
    hoverContent: 'Expert financial guidance and advisory services to help optimize your financial performance and strategic investment decisions.'
  },
  { 
    label: 'Automation Solutions', 
    href: '/services/automation-solutions', 
    description: 'Process automation',
    showOnHover: true,
    hoverContent: 'Implement intelligent automation solutions that reduce manual work, improve accuracy, and accelerate business processes.'
  },
  { 
    label: 'Data Visualization', 
    href: '/services/data-visualization', 
    description: 'Visual data insights',
    showOnHover: true,
    hoverContent: 'Transform complex data into clear, actionable visual insights with interactive dashboards and reporting solutions.'
  },
  { 
    label: 'End-to-End Solutions', 
    href: '/services/end-to-end-solutions', 
    description: 'Complete solutions',
    showOnHover: true,
    hoverContent: 'Comprehensive end-to-end business solutions that integrate strategy, technology, and transformation for complete organizational success.'
  }
];

export const industriesDropdownItems: DropdownItem[] = [
  { 
    label: 'Healthcare & Hospitals', 
    href: '/industries/healthcare-hospitals', 
    description: 'Medical industry solutions',
    showOnHover: true,
    hoverContent: 'Specialized consulting for healthcare organizations and hospitals to improve patient care, operational efficiency, and regulatory compliance.'
  },
  { 
    label: 'Financial Services', 
    href: '/industries/financial-services-insurance', 
    description: 'Banking and insurance',
    showOnHover: true,
    hoverContent: 'Comprehensive solutions for banking, insurance, and financial services to enhance risk management, compliance, and customer experience.'
  },
  { 
    label: 'Manufacturing', 
    href: '/industries/manufacturing-engineering', 
    description: 'Production optimization',
    showOnHover: true,
    hoverContent: 'Optimize manufacturing operations with data-driven insights, process improvements, and automation solutions for enhanced productivity.'
  },
  { 
    label: 'IT Professional Services', 
    href: '/industries/it-professional-services', 
    description: 'Technology consulting',
    showOnHover: true,
    hoverContent: 'Advanced technology consulting and digital transformation services for IT companies and professional service organizations.'
  },
  { 
    label: 'Education & EdTech', 
    href: '/industries/education-edtech', 
    description: 'Educational technology',
    showOnHover: true,
    hoverContent: 'Transform education delivery with innovative EdTech solutions, data analytics, and digital learning platforms.'
  },
  { 
    label: 'Pharmaceutical', 
    href: '/industries/pharmaceutical-life-sciences', 
    description: 'Life sciences solutions',
    showOnHover: true,
    hoverContent: 'Specialized consulting for pharmaceutical and life sciences companies to optimize research, development, and regulatory processes.'
  },
  { 
    label: 'Retail & FMCG', 
    href: '/industries/retail-fmcg', 
    description: 'Retail optimization',
    showOnHover: true,
    hoverContent: 'Enhance retail operations and consumer goods distribution with data analytics, supply chain optimization, and customer insights.'
  },
  { 
    label: 'Industrial Infrastructure', 
    href: '/industries/industrial-infrastructure', 
    description: 'Infrastructure solutions',
    showOnHover: true,
    hoverContent: 'Comprehensive infrastructure consulting services for industrial organizations to improve efficiency and operational excellence.'
  },
  { 
    label: 'Other Industries', 
    href: '/industries/other-industries', 
    description: 'Custom solutions',
    showOnHover: true,
    hoverContent: 'Customized business solutions tailored to meet the unique challenges and opportunities of your specific industry and organization.'
  }
];
