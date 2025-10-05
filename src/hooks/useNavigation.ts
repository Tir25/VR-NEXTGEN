import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface Section {
  id: string;
  label: string;
}

export interface NavigationPage {
  path: string;
  label: string;
  sections: Section[];
}

export const navigationData: Record<string, NavigationPage> = {
  home: {
    path: "/",
    label: "Home",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "services", label: "Services" },
      { id: "why", label: "Why Choose Us" },
      { id: "cta", label: "CTA Banner" }
    ]
  },
  whatWeDo: {
    path: "/what-we-do",
    label: "What We Do",
    sections: [
      { id: "what-we-do-hero", label: "Hero" },
      { id: "services", label: "Services Section" },
      { id: "industries", label: "Industries Section" }
    ]
  },
  whoWeAre: {
    path: "/who-we-are",
    label: "Who We Are",
    sections: [
      { id: "who-we-are-hero", label: "Hero" },
      { id: "customer-stories", label: "Customer Stories" },
      { id: "case-studies", label: "Case Studies" },
      { id: "events", label: "Events & Workshops" }
    ]
  },
  contact: {
    path: "/contact",
    label: "Contact",
    sections: [
      { id: "contact-hero", label: "Hero Header" },
      { id: "contact-form", label: "Contact Form" }
    ]
  },
  blog: {
    path: "/nextgen-blog",
    label: "Blog",
    sections: [
      { id: "blog-header", label: "Instagram-Style Header" },
      { id: "blog-feed", label: "Blog Feed" }
    ]
  }
};

export function useNavigation() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  // Get current page path without hash
  const currentPath = router.asPath.split('#')[0];

  // Find current page data
  const currentPage = Object.values(navigationData).find(page => page.path === currentPath);

  // Section highlighting effect
  useEffect(() => {
    const handleScroll = () => {
      if (!currentPage) return;

      const windowHeight = window.innerHeight;
      let mostVisibleSection = null;
      let maxVisibility = 0;

      for (const section of currentPage.sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          
          const visibleTop = Math.max(0, sectionTop);
          const visibleBottom = Math.min(windowHeight, sectionBottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibilityRatio = visibleHeight / windowHeight;
          
          if (visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            mostVisibleSection = section.id;
          }
        }
      }
      
      setCurrentSection(mostVisibleSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Navigate to section with smooth scrolling and lazy loading support
  const navigateToSection = async (sectionId: string, targetPath?: string) => {
    const targetPage = targetPath || currentPath;
    
    const scrollToSection = (retries = 0) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        return true;
      } else if (retries < 10) {
        // Element doesn't exist yet (lazy loaded) - retry after delay
        // Increased retry count for lazy-loaded sections
        setTimeout(() => scrollToSection(retries + 1), 200);
      } else {
        // If element still doesn't exist after max retries, scroll to approximate position
        console.warn(`Section ${sectionId} not found after ${retries} retries. Scrolling to approximate position.`);
        
        // For home page sections, scroll to approximate positions
        if (targetPage === '/') {
          let approximateScrollPosition = 0;
          switch (sectionId) {
            case 'hero':
              approximateScrollPosition = 0;
              break;
            case 'services':
              approximateScrollPosition = window.innerHeight;
              break;
            case 'why':
              approximateScrollPosition = window.innerHeight * 2;
              break;
            case 'cta':
              approximateScrollPosition = window.innerHeight * 3;
              break;
            default:
              approximateScrollPosition = window.innerHeight * 2;
          }
          
          window.scrollTo({
            top: approximateScrollPosition,
            behavior: 'smooth'
          });
        }
        return false;
      }
    };
    
    if (targetPage === currentPath) {
      // Same page - scroll to section
      scrollToSection();
    } else {
      // Different page - navigate then scroll
      await router.push(`${targetPage}#${sectionId}`);
      
      // Wait for page to load, then scroll to section
      setTimeout(() => {
        scrollToSection();
      }, 100);
    }
  };

  return {
    navigationData,
    currentPage,
    currentPath,
    currentSection,
    navigateToSection,
    isCurrentPage: (path: string) => currentPath === path
  };
}
