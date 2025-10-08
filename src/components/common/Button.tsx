import { ButtonHTMLAttributes, ReactNode, useRef } from "react";
import { ANIMATION_CONSTANTS } from '@/constants';

/**
 * Button component interface following VR NextGEN design system
 * Supports multiple variants, sizes, and states with micro-interactions
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: ReactNode;
  /** Visual style variant */
  variant?: "primary" | "secondary" | "outline";
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** Loading state indicator */
  isLoading?: boolean;
  /** Custom className for additional styling */
  className?: string;
  /** Disable ripple effect */
  disableRipple?: boolean;
}

/**
 * Enhanced Button component with micro-interactions and VR NextGEN styling
 * Features golden glow hover effects, ripple animations, and responsive design
 */
export default function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  isLoading = false,
  className = "",
  disableRipple = false,
  onClick,
  ...props 
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Base classes following VR NextGEN design system
  const baseClasses = "btn-enhanced font-semibold rounded focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200";
  
  // Variant-specific styling with golden glow effects using design tokens
  const variantClasses = {
    primary: "bg-gold text-black hover:bg-gold/90 hover:scale-[1.02] btn-primary shadow-sm hover:shadow-gold",
    secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-gold btn-secondary",
    outline: "border border-gold text-gold hover:bg-gold hover:text-black btn-outline hover:shadow-gold"
  };
  
  // Responsive size classes following mobile-first approach
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  /**
   * Enhanced click handler with ripple effect animation
   * Creates a golden ripple animation from the exact click position
   */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;
    
    // Create ripple effect animation (if not disabled)
    if (!disableRipple) {
      const button = buttonRef.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Remove existing ripple to prevent overlap
        const existingRipple = button.querySelector('.ripple-effect');
        if (existingRipple) {
          existingRipple.remove();
        }
        
        // Create new ripple element with golden color
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${x - radius}px`;
        ripple.style.top = `${y - radius}px`;
        ripple.className = 'ripple-effect';
        
        button.appendChild(ripple);
        
        // Clean up ripple after animation completes
        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        }, ANIMATION_CONSTANTS.RIPPLE_DURATION);
      }
    }
    
    // Execute original onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };
  
  return (
    <button
      ref={buttonRef}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={isLoading}
      onClick={handleClick}
      aria-disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2" role="status" aria-live="polite">
          <div 
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" 
            aria-hidden="true"
          />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
