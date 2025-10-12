// Auto-generated image mapping
export const IMAGE_MAPPING = {
  "Hero.png": {
    "webp": "/images-optimized/Hero.webp",
    "avif": "/images-optimized/Hero.avif",
    "fallback": "/images-optimized/Hero.webp"
  },
  "Industries/Education.png": {
    "webp": "/images-optimized/Industries/Education.webp",
    "avif": "/images-optimized/Industries/Education.avif",
    "fallback": "/images-optimized/Industries/Education.webp"
  },
  "Industries/engineering.png": {
    "webp": "/images-optimized/Industries/engineering.webp",
    "avif": "/images-optimized/Industries/engineering.avif",
    "fallback": "/images-optimized/Industries/engineering.webp"
  },
  "Industries/Financial.png": {
    "webp": "/images-optimized/Industries/Financial.webp",
    "avif": "/images-optimized/Industries/Financial.avif",
    "fallback": "/images-optimized/Industries/Financial.webp"
  },
  "Industries/Fmcg.png": {
    "webp": "/images-optimized/Industries/Fmcg.webp",
    "avif": "/images-optimized/Industries/Fmcg.avif",
    "fallback": "/images-optimized/Industries/Fmcg.webp"
  },
  "Industries/Hospitals and healthcare.png": {
    "webp": "/images-optimized/Industries/Hospitals and healthcare.webp",
    "avif": "/images-optimized/Industries/Hospitals and healthcare.avif",
    "fallback": "/images-optimized/Industries/Hospitals and healthcare.webp"
  },
  "Industries/IT.png": {
    "webp": "/images-optimized/Industries/IT.webp",
    "avif": "/images-optimized/Industries/IT.avif",
    "fallback": "/images-optimized/Industries/IT.webp"
  },
  "Industries/Manufacturing_Engineering.png": {
    "webp": "/images-optimized/Industries/Manufacturing_Engineering.webp",
    "avif": "/images-optimized/Industries/Manufacturing_Engineering.avif",
    "fallback": "/images-optimized/Industries/Manufacturing_Engineering.webp"
  },
  "Industries/Other.png": {
    "webp": "/images-optimized/Industries/Other.webp",
    "avif": "/images-optimized/Industries/Other.avif",
    "fallback": "/images-optimized/Industries/Other.webp"
  },
  "Industries/Pharmaceutical & Life Sciences.png": {
    "webp": "/images-optimized/Industries/Pharmaceutical & Life Sciences.webp",
    "avif": "/images-optimized/Industries/Pharmaceutical & Life Sciences.avif",
    "fallback": "/images-optimized/Industries/Pharmaceutical & Life Sciences.webp"
  },
  "Our Services/Automation & Technology Solutions.png": {
    "webp": "/images-optimized/Our Services/Automation & Technology Solutions.webp",
    "avif": "/images-optimized/Our Services/Automation & Technology Solutions.avif",
    "fallback": "/images-optimized/Our Services/Automation & Technology Solutions.webp"
  },
  "Our Services/Business Consulting & Strategy.png": {
    "webp": "/images-optimized/Our Services/Business Consulting & Strategy.webp",
    "avif": "/images-optimized/Our Services/Business Consulting & Strategy.avif",
    "fallback": "/images-optimized/Our Services/Business Consulting & Strategy.webp"
  },
  "Our Services/Data Analytics & Insights.png": {
    "webp": "/images-optimized/Our Services/Data Analytics & Insights.webp",
    "avif": "/images-optimized/Our Services/Data Analytics & Insights.avif",
    "fallback": "/images-optimized/Our Services/Data Analytics & Insights.webp"
  },
  "Our Services/Data Visualization & Reporting.png": {
    "webp": "/images-optimized/Our Services/Data Visualization & Reporting.webp",
    "avif": "/images-optimized/Our Services/Data Visualization & Reporting.avif",
    "fallback": "/images-optimized/Our Services/Data Visualization & Reporting.webp"
  },
  "Our Services/End-to-End Business Solutions.png": {
    "webp": "/images-optimized/Our Services/End-to-End Business Solutions.webp",
    "avif": "/images-optimized/Our Services/End-to-End Business Solutions.avif",
    "fallback": "/images-optimized/Our Services/End-to-End Business Solutions.webp"
  },
  "Our Services/Process Optimization & Alignment.png": {
    "webp": "/images-optimized/Our Services/Process Optimization & Alignment.webp",
    "avif": "/images-optimized/Our Services/Process Optimization & Alignment.avif",
    "fallback": "/images-optimized/Our Services/Process Optimization & Alignment.webp"
  },
  "logo-Final-png.svg": {
    "webp": "/images-optimized/logo-Final-png.webp",
    "avif": "/images-optimized/logo-Final-png.avif",
    "fallback": "/icons-optimized/vr-logo-md.webp"
  }
};

// Helper function to get optimized image path
export function getOptimizedImage(originalPath: string, format: 'webp' | 'avif' = 'webp'): string {
  const mapping = IMAGE_MAPPING[originalPath as keyof typeof IMAGE_MAPPING];
  if (mapping) {
    return mapping[format] || mapping.fallback;
  }
  return originalPath;
}
