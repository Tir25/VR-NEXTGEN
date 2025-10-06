import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Logo from "@/components/common/Logo";
import { useNavigation, navigationData } from "@/hooks/useNavigation";
import { useEnhancedNavigation } from "@/hooks/useEnhancedNavigation";

interface DropdownProps {
  page: typeof navigationData[keyof typeof navigationData];
  isActive: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

interface NavItemProps {
  pageKey: string;
  page: typeof navigationData[keyof typeof navigationData];
  isMobile?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
}

// Animated Hamburger Icon Component
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-6 h-6 flex flex-col justify-center items-center">
      <span
        className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
          isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1.5'
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
          isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1.5'
        }`}
      />
    </div>
  );
}

// Desktop Dropdown Component
function Dropdown({ page, isActive, onClose }: DropdownProps) {
  const { navigateToSection } = useEnhancedNavigation();

  const handleSectionClick = async (sectionId: string) => {
    onClose();
    await navigateToSection(sectionId, page.path);
  };

  return (
    <div className={`absolute top-full left-0 mt-2 w-72 bg-black/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl transition-all duration-300 ease-out ${
      isActive ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
    }`}>
      <div className="p-2">
        <div className="px-3 py-2 border-b border-white/10 mb-2">
          <span className="text-xs font-semibold text-gold uppercase tracking-wide">
            {page.label} Sections
          </span>
        </div>
        {page.sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className="w-full px-4 py-3 text-left text-white/80 hover:text-gold hover:bg-gold/10 transition-all duration-200 flex items-center gap-3 group rounded-lg"
          >
            <div className="w-2 h-2 rounded-full bg-gold/30 group-hover:bg-gold transition-colors duration-200 flex-shrink-0" />
            <span className="text-sm font-medium">{section.label}</span>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Desktop Navigation Item Component
function DesktopNavItem({ page }: NavItemProps) {
  const { isCurrentPage } = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMainLinkClick = () => {
    // Navigate to the main page
    // This will be handled by the Link component
    setIsDropdownOpen(false); // Close dropdown when navigating
  };

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Navigation Link */}
      <div className="flex items-center">
        <Link
          href={page.path}
          onClick={handleMainLinkClick}
          className={`flex items-center px-4 py-2.5 rounded-l-lg transition-all duration-200 font-medium ${
            isCurrentPage(page.path)
              ? 'text-gold bg-gold/10 border-l border-t border-b border-gold/20'
              : 'text-white/80 hover:text-gold hover:bg-white/5 hover:border-l hover:border-t hover:border-b hover:border-white/10'
          }`}
          aria-label={`Navigate to ${page.label}`}
        >
          {page.label}
        </Link>

        {/* Dropdown Toggle Button */}
        <button
          onClick={handleDropdownToggle}
          className={`flex items-center justify-center w-10 h-10 rounded-r-lg border-r border-t border-b transition-all duration-200 ${
            isCurrentPage(page.path)
              ? 'text-gold bg-gold/10 border-gold/20 hover:bg-gold/20'
              : 'text-white/60 hover:text-gold hover:bg-white/5 hover:border-white/10'
          } ${isDropdownOpen ? 'bg-gold/20 text-gold' : ''}`}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          aria-label={`Toggle ${page.label} sections menu`}
        >
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  </button>
                </div>
      
      {/* Dropdown Menu */}
      <Dropdown
        page={page}
        isActive={isDropdownOpen}
        onClose={handleDropdownClose}
      />
              </div>
  );
}

// Mobile Navigation Item Component
function MobileNavItem({ page, isExpanded, onToggle }: NavItemProps) {
  const { navigateToSection, currentPath, currentSection } = useEnhancedNavigation();

  const handleMainLinkClick = () => {
    // Navigate to the main page
    // This will be handled by the Link component
    onToggle?.(); // Close mobile menu when navigating
  };

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle?.();
  };

  const handleSectionClick = async (sectionId: string) => {
    await navigateToSection(sectionId, page.path);
  };

  return (
    <div className="space-y-1">
      {/* Main Navigation Link */}
      <div className="flex items-center">
                <Link
          href={page.path}
          onClick={handleMainLinkClick}
          className="flex-1 px-3 py-2 rounded-l-lg font-medium transition-all duration-200 text-white/90 hover:text-gold hover:bg-gold/10"
          aria-label={`Navigate to ${page.label}`}
        >
          {page.label}
            </Link>
            
        {/* Dropdown Toggle Button */}
                  <button
          onClick={handleDropdownToggle}
          className="flex items-center justify-center w-10 h-10 rounded-r-lg text-white/60 hover:text-gold hover:bg-gold/10 transition-all duration-200"
          aria-expanded={isExpanded}
          aria-haspopup="true"
          aria-label={`Toggle ${page.label} sections menu`}
        >
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
        </button>
      </div>
      
      {/* Mobile Section Links */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="ml-4 space-y-1 pb-2">
          {page.sections.map((section) => (
                  <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 ${
                currentSection === section.id && currentPath === page.path
                  ? 'text-gold bg-gold/10 border-l-2 border-gold'
                  : 'text-white/60 hover:text-white/90 hover:bg-white/5'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                currentSection === section.id && currentPath === page.path
                  ? 'bg-gold'
                  : 'bg-white/30'
              }`} />
              {section.label}
                  </button>
          ))}
        </div>
                </div>
              </div>
  );
}

export default function Header() {
  const router = useRouter();
  const { isCurrentPage } = useEnhancedNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileDropdowns, setExpandedMobileDropdowns] = useState<Set<string>>(new Set());
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setExpandedMobileDropdowns(new Set());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedMobileDropdowns(new Set());
  }, [router.asPath]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setExpandedMobileDropdowns(new Set());
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleMobileDropdownToggle = (pageKey: string) => {
    setExpandedMobileDropdowns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(pageKey)) {
        newSet.delete(pageKey);
      } else {
        newSet.add(pageKey);
      }
      return newSet;
    });
  };

  return (
    <header 
      ref={headerRef}
      className="bg-black/95 text-white border-b border-white/10 sticky top-0 z-50 backdrop-blur-md supports-[backdrop-filter]:bg-black/80 transition-all duration-300"
      aria-label="Primary navigation"
    >
      <nav className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo - positioned closer to top-left corner */}
                <Link
                  href="/"
            aria-label="VR NextGEN Solutions Home" 
            className="flex items-center gap-2 z-50 transition-transform duration-200 hover:scale-105 -ml-2 md:-ml-3 lg:-ml-4"
                >
            <Logo className="h-8 w-auto md:h-10" size="md" />
                </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {Object.entries(navigationData).map(([pageKey, page]) => (
              <DesktopNavItem
                key={pageKey}
                pageKey={pageKey}
                page={page}
              />
            ))}
                </div>

          {/* Mobile Menu Button */}
                <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-gold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-black rounded-lg"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <HamburgerIcon isOpen={isMobileMenuOpen} />
                </button>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" />
        )}

        {/* Mobile Navigation Menu */}
        <div 
          ref={mobileMenuRef}
          className={`lg:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-md border-b border-white/10 transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
          }`}
          style={{
            maxHeight: isMobileMenuOpen ? 'calc(100vh - 80px)' : '0',
            overflow: 'hidden'
          }}
        >
          <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
            {/* Mobile Navigation Items */}
            {Object.entries(navigationData).map(([pageKey, page]) => (
              <MobileNavItem
                key={pageKey}
                pageKey={pageKey}
                page={page}
                isExpanded={expandedMobileDropdowns.has(pageKey)}
                onToggle={() => {
                  handleMobileDropdownToggle(pageKey);
                  // Close mobile menu when navigating to a page
                  if (!expandedMobileDropdowns.has(pageKey)) {
                    // This will be handled by the Link click handler
                  }
                }}
              />
            ))}

            {/* Mobile Menu Footer */}
            <div className="pt-6 border-t border-white/10 mt-6">
              <div className="flex items-center justify-center gap-4">
                <div className="text-xs text-white/50 text-center">
                  <p>VR NextGEN Solutions</p>
                  <p>Data-Driven Business Growth</p>
                </div>
                  </div>
                  </div>
          </div>
        </div>
      </nav>
    </header>
  );
}