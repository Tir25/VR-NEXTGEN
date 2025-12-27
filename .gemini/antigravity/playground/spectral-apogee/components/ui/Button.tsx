/**
 * Button Component
 * 
 * Reusable button with multiple variants and sizes.
 * Supports loading state and icon placement.
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// ============================================
// TYPES
// ============================================

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

// ============================================
// STYLES
// ============================================

const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-lg transition-all duration-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.98]
`;

const variantStyles: Record<ButtonVariant, string> = {
    primary: `
        bg-blue-600 text-white
        hover:bg-blue-700
        focus-visible:ring-blue-500
    `,
    secondary: `
        bg-gray-100 text-gray-900
        hover:bg-gray-200
        focus-visible:ring-gray-500
        dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700
    `,
    ghost: `
        bg-transparent text-gray-700
        hover:bg-gray-100
        focus-visible:ring-gray-500
        dark:text-gray-300 dark:hover:bg-gray-800
    `,
    destructive: `
        bg-red-600 text-white
        hover:bg-red-700
        focus-visible:ring-red-500
    `,
    outline: `
        border border-gray-300 bg-transparent text-gray-700
        hover:bg-gray-50
        focus-visible:ring-gray-500
        dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800
    `,
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    icon: 'h-10 w-10',
};

// ============================================
// COMPONENT
// ============================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={cn(
                    baseStyles,
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    leftIcon
                )}
                {children}
                {!isLoading && rightIcon}
            </button>
        );
    }
);

Button.displayName = 'Button';

