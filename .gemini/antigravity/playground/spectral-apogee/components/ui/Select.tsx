/**
 * Select Component
 * 
 * Native select dropdown with label and error support.
 */

import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

// ============================================
// TYPES
// ============================================

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
    label?: string;
    error?: string;
    helperText?: string;
    placeholder?: string;
    options: SelectOption[];
    leftIcon?: ReactNode;
}

// ============================================
// COMPONENT
// ============================================

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            className,
            label,
            error,
            helperText,
            placeholder,
            options,
            leftIcon,
            id,
            disabled,
            ...props
        },
        ref
    ) => {
        const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
        const hasError = Boolean(error);

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={selectId}
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
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            {leftIcon}
                        </div>
                    )}

                    <select
                        ref={ref}
                        id={selectId}
                        disabled={disabled}
                        className={cn(
                            // Base styles
                            'w-full appearance-none rounded-lg border bg-white px-3 py-2.5 pr-10',
                            'text-sm text-gray-900',
                            'transition-colors duration-200 cursor-pointer',
                            'focus:outline-none focus:ring-2 focus:ring-offset-0',
                            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
                            // Dark mode
                            'dark:bg-gray-900 dark:text-gray-100',
                            // Error state
                            hasError
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600',
                            // Icon padding
                            leftIcon && 'pl-10',
                            className
                        )}
                        aria-invalid={hasError}
                        aria-describedby={hasError ? `${selectId}-error` : undefined}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                {(error || helperText) && (
                    <p
                        id={error ? `${selectId}-error` : undefined}
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

Select.displayName = 'Select';

