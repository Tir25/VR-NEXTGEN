/**
 * DropdownMenu Component
 * Reusable dropdown menu component for navigation with click-based dropdowns
 */

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

export interface DropdownMenuProps {
  label: string;
  href?: string;
  items: DropdownItem[];
  className?: string;
}

export default function DropdownMenu({ 
  label, 
  href, 
  items, 
  className = '' 
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  const handleTabClick = (e: React.MouseEvent) => {
    // If clicking on the tab text (not the arrow), navigate directly
    const target = e.target as HTMLElement;
    if (!target.closest('.dropdown-arrow')) {
      // Let the link handle navigation naturally
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Dropdown Trigger */}
      <div className="relative flex items-center">
        {href ? (
          <div className="flex items-center">
            <Link
              href={href}
              className="text-white hover:text-gold transition-colors duration-200"
              onClick={handleTabClick}
            >
              {label}
            </Link>
            <button
              onClick={toggleDropdown}
              className="dropdown-arrow text-white hover:text-gold transition-colors duration-200 ml-1 p-1"
              aria-expanded={isOpen}
              aria-haspopup="true"
              aria-label={`Toggle ${label} dropdown`}
            >
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={toggleDropdown}
            className="text-white hover:text-gold transition-colors duration-200 flex items-center gap-1"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            {label}
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl z-50">
          <div className="py-2 max-h-80 overflow-y-auto">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-4 py-3 text-white hover:bg-gold/10 hover:text-gold transition-colors duration-200 group border-b border-white/5 last:border-b-0"
                onClick={handleItemClick}
              >
                <div className="flex flex-col">
                  <span className="font-medium group-hover:text-gold transition-colors">
                    {item.label}
                  </span>
                  {item.description && (
                    <span className="text-xs text-white/60 group-hover:text-gold/70 transition-colors mt-1">
                      {item.description}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
