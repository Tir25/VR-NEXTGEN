import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "@/components/common/Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [whatWeDoDropdownOpen, setWhatWeDoDropdownOpen] = useState(false);
  const [whoWeAreDropdownOpen, setWhoWeAreDropdownOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [whatWeDoTimeout, setWhatWeDoTimeout] = useState<NodeJS.Timeout | null>(null);
  const [whoWeAreTimeout, setWhoWeAreTimeout] = useState<NodeJS.Timeout | null>(null);

  // Helper function to scroll to section on current page or navigate to page
  const scrollToSection = (sectionId: string, pagePath?: string) => {
    if (pagePath && window.location.pathname !== pagePath) {
      // Navigate to different page first, then scroll
      window.location.href = `${pagePath}#${sectionId}`;
    } else {
      // Scroll to section on current page
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Home dropdown handlers
  const handleHomeMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHomeDropdownOpen(true);
  };

  const handleHomeMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHomeDropdownOpen(false);
    }, 500); // 500ms delay before closing
    setHoverTimeout(timeout);
  };

  const handleHomeDropdownMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHomeDropdownOpen(true);
  };

  const handleHomeDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHomeDropdownOpen(false);
    }, 500); // 500ms delay before closing
    setHoverTimeout(timeout);
  };

  // What We Do dropdown handlers
  const handleWhatWeDoMouseEnter = () => {
    if (whatWeDoTimeout) {
      clearTimeout(whatWeDoTimeout);
      setWhatWeDoTimeout(null);
    }
    setWhatWeDoDropdownOpen(true);
  };

  const handleWhatWeDoMouseLeave = () => {
    const timeout = setTimeout(() => {
      setWhatWeDoDropdownOpen(false);
    }, 500); // 500ms delay before closing
    setWhatWeDoTimeout(timeout);
  };

  const handleWhatWeDoDropdownMouseEnter = () => {
    if (whatWeDoTimeout) {
      clearTimeout(whatWeDoTimeout);
      setWhatWeDoTimeout(null);
    }
    setWhatWeDoDropdownOpen(true);
  };

  const handleWhatWeDoDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setWhatWeDoDropdownOpen(false);
    }, 500); // 500ms delay before closing
    setWhatWeDoTimeout(timeout);
  };

  // Who We Are dropdown handlers
  const handleWhoWeAreMouseEnter = () => {
    if (whoWeAreTimeout) {
      clearTimeout(whoWeAreTimeout);
      setWhoWeAreTimeout(null);
    }
    setWhoWeAreDropdownOpen(true);
  };

  const handleWhoWeAreMouseLeave = () => {
    const timeout = setTimeout(() => {
      setWhoWeAreDropdownOpen(false);
    }, 500); // 500ms delay before closing
    setWhoWeAreTimeout(timeout);
  };

  const handleWhoWeAreDropdownMouseEnter = () => {
    if (whoWeAreTimeout) {
      clearTimeout(whoWeAreTimeout);
      setWhoWeAreTimeout(null);
    }
    setWhoWeAreDropdownOpen(true);
  };

  const handleWhoWeAreDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setWhoWeAreDropdownOpen(false);
    }, 500); // 500ms delay before closing
    setWhoWeAreTimeout(timeout);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
      if (whatWeDoTimeout) clearTimeout(whatWeDoTimeout);
      if (whoWeAreTimeout) clearTimeout(whoWeAreTimeout);
    };
  }, [hoverTimeout, whatWeDoTimeout, whoWeAreTimeout]);

  return (
    <header className="bg-black text-white border-b border-white/10 sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <nav
        className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between"
        aria-label="Primary"
      >
        {/* Logo (left corner) */}
        <Link href="/" aria-label="VR NextGEN Solutions Home" className="flex items-center gap-2">
          <Logo className="h-8 w-auto md:h-10" size="md" />
        </Link>

        {/* Centered navigation (desktop) */}
        <ul className="hidden md:flex items-center gap-6">
          {/* Home Dropdown */}
          <li className="relative">
            <Link
              href="/"
              onMouseEnter={handleHomeMouseEnter}
              onMouseLeave={handleHomeMouseLeave}
              className="px-2 py-1 rounded hover:text-gold hover:underline underline-offset-4 transition flex items-center gap-1"
              aria-label="Home page"
            >
              Home
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${homeDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            
            {/* Home Dropdown Menu */}
            {homeDropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-64 bg-black/95 border border-white/10 rounded-lg shadow-xl backdrop-blur-sm z-50"
                onMouseEnter={handleHomeDropdownMouseEnter}
                onMouseLeave={handleHomeDropdownMouseLeave}
              >
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gold/80 uppercase tracking-wider border-b border-white/10">
                    Quick Navigation
                  </div>
                  <button
                    onClick={() => {
                      scrollToSection('hero', '/');
                      setHomeDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gold/10 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span>Hero Section</span>
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('services', '/');
                      setHomeDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gold/10 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span>Our Services</span>
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('why', '/');
                      setHomeDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gold/10 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span>Why Choose Us</span>
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('cta', '/');
                      setHomeDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gold/10 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span>Get Started</span>
                  </button>
                </div>
              </div>
            )}
          </li>
          
          {/* What We Do Dropdown */}
          <li className="relative">
            <Link
              href="/what-we-do"
              onMouseEnter={handleWhatWeDoMouseEnter}
              onMouseLeave={handleWhatWeDoMouseLeave}
              className="px-2 py-1 rounded hover:text-gold hover:underline underline-offset-4 transition flex items-center gap-1"
              aria-label="What we do page"
            >
              What We Do
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${whatWeDoDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            
            {/* What We Do Dropdown Menu */}
            {whatWeDoDropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-64 bg-black/95 border border-white/10 rounded-lg shadow-xl backdrop-blur-sm z-50"
                onMouseEnter={handleWhatWeDoDropdownMouseEnter}
                onMouseLeave={handleWhatWeDoDropdownMouseLeave}
              >
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gold/80 uppercase tracking-wider border-b border-white/10">
                    Our Solutions
                  </div>
                  <button
                    onClick={() => {
                      scrollToSection('services', '/what-we-do');
                      setWhatWeDoDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gold/10 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span>Services</span>
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('industries', '/what-we-do');
                      setWhatWeDoDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gold/10 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span>Industries</span>
                  </button>
                </div>
              </div>
            )}
          </li>

          {/* Who We Are Dropdown */}
          <li className="relative">
            <Link
              href="/who-we-are"
              onMouseEnter={handleWhoWeAreMouseEnter}
              onMouseLeave={handleWhoWeAreMouseLeave}
              className="px-2 py-1 rounded hover:text-gold hover:underline underline-offset-4 transition flex items-center gap-1"
              aria-label="Who we are page"
            >
              Who We Are
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${whoWeAreDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            
            {/* Who We Are Dropdown Menu */}
            {whoWeAreDropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-64 bg-black/95 border border-white/10 rounded-lg shadow-xl backdrop-blur-sm z-50"
                onMouseEnter={handleWhoWeAreDropdownMouseEnter}
                onMouseLeave={handleWhoWeAreDropdownMouseLeave}
              >
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gold/80 uppercase tracking-wider border-b border-white/10">
                    Insights
                  </div>
                  <button
                    onClick={() => {
                      scrollToSection('customer-story', '/who-we-are');
                      setWhoWeAreDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gold/10 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span>Customer Story</span>
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('case-study', '/who-we-are');
                      setWhoWeAreDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gold/10 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span>Case Study</span>
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('events', '/who-we-are');
                      setWhoWeAreDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gold/10 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span>Events</span>
                  </button>
                </div>
              </div>
            )}
          </li>
          
          <li>
            <Link href="/nextgen-blog" aria-label="NextGen Blog" className="px-2 py-1 rounded hover:text-gold hover:underline underline-offset-4 transition">
              NextGen Blog
            </Link>
          </li>
          
          <li>
            <Link href="/contact" aria-label="Contact us" className="px-2 py-1 rounded hover:text-gold hover:underline underline-offset-4 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile menu toggle (right) */}
        <button
          className="btn-enhanced md:hidden p-2 rounded bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gold"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden>☰</span>
        </button>

        {/* Mobile dropdown menu */}
        {open && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-black border-t border-white/10">
            <ul className="flex flex-col py-2">
              <li>
                <Link
                  href="/"
                  className="w-full text-left px-4 py-3 hover:bg-white/5 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                  onClick={() => setOpen(false)}
                >
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <div className="px-4 py-2 text-xs font-semibold text-gold/80 uppercase tracking-wider border-b border-white/10">
                  Home Sections
                </div>
                <button
                  onClick={() => {
                    scrollToSection('hero', '/');
                    setOpen(false);
                  }}
                  className="w-full text-left px-6 py-3 hover:bg-white/5 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>Hero Section</span>
                </button>
                <button
                  onClick={() => {
                    scrollToSection('services', '/');
                    setOpen(false);
                  }}
                  className="w-full text-left px-6 py-3 hover:bg-white/5 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>Our Services</span>
                </button>
                <button
                  onClick={() => {
                    scrollToSection('why', '/');
                    setOpen(false);
                  }}
                  className="w-full text-left px-6 py-3 hover:bg-white/5 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>Why Choose Us</span>
                </button>
                <button
                  onClick={() => {
                    scrollToSection('cta', '/');
                    setOpen(false);
                  }}
                  className="w-full text-left px-6 py-3 hover:bg-white/5 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>Get Started</span>
                </button>
              </li>
              <li className="border-t border-white/10 mt-2 pt-2">
                <Link
                  href="/what-we-do"
                  className="w-full text-left px-4 py-3 hover:bg-white/5 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                  onClick={() => setOpen(false)}
                >
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>What We Do</span>
                </Link>
                <div className="px-4 py-2 text-xs font-semibold text-gold/80 uppercase tracking-wider">
                  What We Do Sections
                </div>
                <button
                  onClick={() => {
                    scrollToSection('services', '/what-we-do');
                    setOpen(false);
                  }}
                  className="w-full text-left px-6 py-3 hover:bg-white/5 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>Services</span>
                </button>
                <button
                  onClick={() => {
                    scrollToSection('industries', '/what-we-do');
                    setOpen(false);
                  }}
                  className="w-full text-left px-6 py-3 hover:bg-white/5 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>Industries</span>
                </button>
              </li>
              
              <li className="border-t border-white/10 mt-2 pt-2">
                <Link
                  href="/who-we-are"
                  className="w-full text-left px-4 py-3 hover:bg-white/5 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                  onClick={() => setOpen(false)}
                >
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>Who We Are</span>
                </Link>
                <div className="px-4 py-2 text-xs font-semibold text-gold/80 uppercase tracking-wider">
                  Who We Are Sections
                </div>
                <button
                  onClick={() => {
                    scrollToSection('customer-story', '/who-we-are');
                    setOpen(false);
                  }}
                  className="w-full text-left px-6 py-3 hover:bg-white/5 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>Customer Story</span>
                </button>
                <button
                  onClick={() => {
                    scrollToSection('case-study', '/who-we-are');
                    setOpen(false);
                  }}
                  className="w-full text-left px-6 py-3 hover:bg-white/5 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>Case Study</span>
                </button>
                <button
                  onClick={() => {
                    scrollToSection('events', '/who-we-are');
                    setOpen(false);
                  }}
                  className="w-full text-left px-6 py-3 hover:bg-white/5 hover:text-gold transition-colors duration-200 flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>Events</span>
                </button>
              </li>
              <li>
                <Link
                  href="/nextgen-blog"
                  className="block px-4 py-3 hover:bg-white/5 hover:text-gold"
                  onClick={() => setOpen(false)}
                >
                  NextGen Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block px-4 py-3 hover:bg-white/5 hover:text-gold"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}