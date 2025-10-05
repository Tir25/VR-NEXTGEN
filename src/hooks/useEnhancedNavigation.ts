import { useRouter } from "next/router";
import { useState } from "react";
import { useNavigation } from "./useNavigation";

/**
 * Enhanced navigation hook that handles lazy-loaded sections
 * Triggers lazy loading when sections are not immediately available
 */
export function useEnhancedNavigation() {
  const router = useRouter();
  const { ...navigationProps } = useNavigation();
  const [isTriggeringLazyLoad, setIsTriggeringLazyLoad] = useState(false);

  const navigateToSection = async (sectionId: string, targetPath?: string) => {
    const targetPage = targetPath || router.asPath.split('#')[0];
    
    const scrollToSection = (retries = 0) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        setIsTriggeringLazyLoad(false);
        return true;
      } else if (retries < 10) {
        // Element doesn't exist yet (lazy loaded) - retry after delay
        setTimeout(() => scrollToSection(retries + 1), 200);
      } else {
        // If element still doesn't exist, try to trigger lazy loading
        if (retries === 10 && !isTriggeringLazyLoad) {
          setIsTriggeringLazyLoad(true);
          triggerLazyLoading(sectionId, targetPage);
          // Retry after triggering lazy loading
          setTimeout(() => scrollToSection(11), 500);
        } else if (retries >= 15) {
          // Final fallback - scroll to approximate position
          scrollToApproximatePosition(sectionId, targetPage);
          setIsTriggeringLazyLoad(false);
        } else {
          // Continue retrying
          setTimeout(() => scrollToSection(retries + 1), 200);
        }
        return false;
      }
    };
    
    if (targetPage === router.asPath.split('#')[0]) {
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

  const triggerLazyLoading = (sectionId: string, targetPage: string) => {
    // Scroll to approximate position to trigger intersection observer
    const approximatePosition = getApproximatePosition(sectionId, targetPage);
    
    // Scroll to trigger lazy loading
    window.scrollTo({
      top: approximatePosition,
      behavior: 'smooth'
    });
  };

  const scrollToApproximatePosition = (sectionId: string, targetPage: string) => {
    const position = getApproximatePosition(sectionId, targetPage);
    
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  };

  const getApproximatePosition = (sectionId: string, targetPage: string) => {
    if (targetPage === '/') {
      // Home page sections
      switch (sectionId) {
        case 'hero':
          return 0;
        case 'services':
          return window.innerHeight;
        case 'why':
          return window.innerHeight * 2;
        case 'cta':
          return window.innerHeight * 3;
        default:
          return window.innerHeight * 2;
      }
    } else if (targetPage === '/what-we-do') {
      switch (sectionId) {
        case 'what-we-do-hero':
          return 0;
        case 'services':
          return window.innerHeight;
        case 'industries':
          return window.innerHeight * 2;
        default:
          return window.innerHeight * 1.5;
      }
    } else if (targetPage === '/who-we-are') {
      switch (sectionId) {
        case 'who-we-are-hero':
          return 0;
        case 'customer-stories':
          return window.innerHeight;
        case 'case-studies':
          return window.innerHeight * 2;
        case 'events':
          return window.innerHeight * 3;
        default:
          return window.innerHeight * 2;
      }
    } else if (targetPage === '/contact') {
      switch (sectionId) {
        case 'contact-hero':
          return 0;
        case 'contact-form':
          return window.innerHeight;
        default:
          return window.innerHeight;
      }
    } else if (targetPage === '/nextgen-blog') {
      switch (sectionId) {
        case 'blog-header':
          return 0;
        case 'blog-feed':
          return window.innerHeight;
        default:
          return window.innerHeight;
      }
    }
    
    return window.innerHeight * 1.5; // Default fallback
  };

  return {
    ...navigationProps,
    navigateToSection,
    isTriggeringLazyLoad
  };
}
