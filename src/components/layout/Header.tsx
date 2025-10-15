/**
 * Header Component
 * Main navigation header for the application with dropdown menus
 */

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Container } from '@/components/common';
import { navigationConfig } from '@/config';

// Dynamic import for heavy DropdownMenu component with optimized loading
const DropdownMenu = dynamic(() => import('@/components/common/DropdownMenu'), {
  ssr: false,
  loading: () => <span className="text-white animate-pulse">...</span>
});

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Positioned at very left */}
          <Link href="/" className="flex items-center">
            <Image
              src="/icons-optimized/logo-Final-png.png"
              alt="VR NextGEN Solutions"
              width={120}
              height={40}
              className="h-8 w-auto md:h-10"
              priority
            />
          </Link>

          {/* Desktop Navigation - Positioned in center */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationConfig.map((item, index) => (
              item.hasDropdown ? (
                <DropdownMenu
                  key={index}
                  label={item.label}
                  href={item.href}
                  items={item.dropdownItems || []}
                />
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className="text-white hover:text-gold transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Contact Button - Positioned at right */}
          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className="bg-gold text-black px-4 py-2 rounded-lg font-medium hover:bg-gold/90 transition-colors"
            >
              Contact
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-sm">
            <nav className="py-4 space-y-2 max-h-screen overflow-y-auto">
              {/* Main Navigation Items */}
              {navigationConfig.map((item, index) => (
                <div key={index} className="space-y-1">
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-white hover:text-gold hover:bg-white/5 transition-colors rounded-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="ml-4 space-y-1">
                      {item.dropdownItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block px-4 py-2 text-white/70 hover:text-gold text-sm transition-colors rounded"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Contact Button */}
              <div className="px-4 py-4 border-t border-white/10 mt-4">
                <Link
                  href="/contact"
                  className="block w-full bg-gold text-black px-6 py-3 rounded-lg font-medium text-center hover:bg-gold/90 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
