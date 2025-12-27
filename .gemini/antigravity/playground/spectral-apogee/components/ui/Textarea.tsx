/**
 * Textarea Component
 * 
 * Multi-line text input with label and error support.
 */

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

// ============================================
// COMPONENT
// ============================================

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            className,
            label,
            error,
            helperText,
            id,
            disabled,
            rows = 4,
            ...props
        },
        ref
    ) => {
        const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
        const hasError = Boolean(error);

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={textareaId}
                        className={cn(
                            'block text-sm font-medium mb-1.5',
                            hasError ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'
                        )}
                    >
                        {label}
                    </label>
                )}

                <textarea
                    ref={ref}
                    id={textareaId}
                    rows={rows}
                    disabled={disabled}
                    className={cn(
                        // Base styles
                        'w-full rounded-lg border bg-white px-3 py-2.5',
                        'text-sm text-gray-900 placeholder:text-gray-400',
                        'transition-colors duration-200 resize-y min-h-[100px]',
                        'focus:outline-none focus:ring-2 focus:ring-offset-0',
                        'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
                        // Dark mode
                        'dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500',
                        // Error state
                        hasError
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600',
                        className
                    )}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${textareaId}-error` : undefined}
                    {...props}
                />

                {(error || helperText) && (
                    <p
                        id={error ? `${textareaId}-error` : undefined}
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

Textarea.displayName = 'Textarea';

