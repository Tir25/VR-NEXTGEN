import React from 'react';

interface StructuredDataProps {
  data: object;
}

/**
 * Structured Data component for JSON-LD schema markup
 * Improves SEO by providing search engines with structured information
 */
export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Service schema for individual services
 */
export const createServiceSchema = (service: {
  name: string;
  description: string;
  provider: string;
  category: string;
  offers?: {
    name: string;
    description: string;
  }[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": service.provider
  },
  "serviceType": service.category,
  "offers": service.offers?.map(offer => ({
    "@type": "Offer",
    "name": offer.name,
    "description": offer.description
  }))
});

/**
 * Organization schema for VR NextGEN Solutions
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "VR NextGEN Solutions",
  "description": "Data-driven business consultancy providing strategic consulting, analytics, and digital transformation solutions",
  "url": "https://vrnextgen.com",
  "logo": "https://vrnextgen.com/icons-optimized/logo-Final-png.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-0123",
    "contactType": "customer service",
    "availableLanguage": "English"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://linkedin.com/company/vrnextgen",
    "https://twitter.com/VRNextGEN"
  ]
};

/**
 * Breadcrumb schema for navigation
 */
export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

/**
 * FAQ schema for service details
 */
export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
