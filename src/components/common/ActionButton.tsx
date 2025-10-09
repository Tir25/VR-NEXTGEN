/**
 * ActionButton Component
 * A reusable button component with various styles and animations
 */

import React, { ReactNode } from 'react';

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  showArrow?: boolean;
  showGradient?: boolean;
}

export default function ActionButton({
  children,
  onClick,
  variant = 'outline',
  size = 'md',
  fullWidth = false,
  className = '',
  ariaLabel,
  disabled = false,
  type = 'button',
  showArrow = false,
  showGradient = true,
}: ActionButtonProps) {
  // Base classes
  const baseClasses = 'relative font-medium rounded-lg transition-all duration-300 focus:ring-2 focus:ring-gold/50 focus:outline-none overflow-hidden';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-gold text-black border border-gold hover:bg-gold/90',
    secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
    outline: 'bg-transparent border border-gold/50 text-gold hover:bg-gold hover:text-black hover:border-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]',
    text: 'bg-transparent text-gold hover:bg-gold/10',
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${disabledClasses} ${className} group/btn`}
      aria-label={ariaLabel}
      disabled={disabled}
      type={type}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {showArrow && (
          <svg 
            className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </span>
      
      {/* Button background effect */}
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
      )}
    </button>
  );
}
