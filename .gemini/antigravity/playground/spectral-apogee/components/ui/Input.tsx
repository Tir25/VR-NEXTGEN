/**
 * Input Component
 * 
 * Form input with label, error state, and helper text support.
 */

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

// ============================================
// COMPONENT
// ============================================

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            type = 'text',
            id,
            disabled,
            ...props
        },
        ref
    ) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
        const hasError = Boolean(error);

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn(
                            'block text-sm font-medium mb-1.5',
                            hasError ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'
                        )}
                    >
                        {label}
                    </label>
                )}

                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        type={type}
                        id={inputId}
                        disabled={disabled}
                        className={cn(
                            // Base styles
                            'w-full rounded-lg border bg-white px-3 py-2.5',
                            'text-sm text-gray-900 placeholder:text-gray-400',
                            'transition-colors duration-200',
                            'focus:outline-none focus:ring-2 focus:ring-offset-0',
                            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
                            // Dark mode
                            'dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500',
                            // Error state
                            hasError
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600',
                            // Icon padding
                            leftIcon && 'pl-10',
                            rightIcon && 'pr-10',
                            className
                        )}
                        aria-invalid={hasError}
                        aria-describedby={hasError ? `${inputId}-error` : undefined}
                        {...props}
                    />

                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {rightIcon}
                        </div>
                    )}
                </div>

                {(error || helperText) && (
                    <p
                        id={error ? `${inputId}-error` : undefined}
                        className={cn(
                            'mt-1.5 text-sm',
                            hasError ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'
                        )}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

