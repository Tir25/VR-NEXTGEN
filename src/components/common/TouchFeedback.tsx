/**
 * TouchFeedback Component
 * A reusable wrapper component that provides enhanced touch feedback for interactive elements
 */

import React, { ReactNode, useState } from 'react';

interface TouchFeedbackProps {
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent | React.TouchEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
  style?: React.CSSProperties;
  as?: React.ElementType;
  role?: string;
  tabIndex?: number;
  ariaLabel?: string;
}

export default function TouchFeedback({
  children,
  className = '',
  activeClassName = 'active-touch',
  disabled = false,
  onClick,
  onTouchStart,
  onTouchEnd,
  style,
  as: Component = 'div',
  role = 'button',
  tabIndex = 0,
  ariaLabel,
}: TouchFeedbackProps) {
  const [isActive, setIsActive] = useState(false);

  // Touch handlers with active state
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!disabled) {
      setIsActive(true);
      if (onTouchStart) onTouchStart(e);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!disabled) {
      setIsActive(false);
      if (onTouchEnd) onTouchEnd(e);
    }
  };

  const handleTouchCancel = () => {
    if (!disabled) {
      setIsActive(false);
    }
  };

  // Mouse handlers for desktop
  const handleMouseDown = () => {
    if (!disabled) {
      setIsActive(true);
    }
  };

  const handleMouseUp = () => {
    if (!disabled) {
      setIsActive(false);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setIsActive(false);
    }
  };

  // Click handler
  const handleClick = (e: React.MouseEvent) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <Component
      className={`${className} ${isActive ? activeClassName : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{
        WebkitTapHighlightColor: 'transparent', // Remove default mobile tap highlight
        touchAction: 'manipulation', // Optimize for touch
        userSelect: 'none', // Prevent text selection during tap
        ...style,
      }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      role={role}
      tabIndex={disabled ? -1 : tabIndex}
      aria-disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  );
}
