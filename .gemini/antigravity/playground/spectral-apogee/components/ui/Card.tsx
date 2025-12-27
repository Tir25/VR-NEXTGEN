/**
 * Card Component
 * 
 * Composable card with header, content, and footer sections.
 * Uses composition pattern for flexibility.
 */

import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// CARD ROOT
// ============================================

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'bordered' | 'elevated';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', ...props }, ref) => {
        const variantStyles = {
            default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800',
            bordered: 'bg-transparent border-2 border-gray-200 dark:border-gray-700',
            elevated: 'bg-white dark:bg-gray-900 shadow-lg shadow-gray-200/50 dark:shadow-gray-950/50',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-xl overflow-hidden',
                    variantStyles[variant],
                    className
                )}
                {...props}
            />
        );
    }
);

Card.displayName = 'Card';

// ============================================
// CARD HEADER
// ============================================

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    action?: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, title, description, action, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'flex items-start justify-between gap-4 p-5 border-b border-gray-100 dark:border-gray-800',
                    className
                )}
                {...props}
            >
                {children || (
                    <>
                        <div className="space-y-1">
                            {title && (
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {title}
                                </h3>
                            )}
                            {description && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {description}
                                </p>
                            )}
                        </div>
                        {action && <div className="flex-shrink-0">{action}</div>}
                    </>
                )}
            </div>
        );
    }
);

CardHeader.displayName = 'CardHeader';

// ============================================
// CARD CONTENT
// ============================================

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
    noPadding?: boolean;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, noPadding = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(!noPadding && 'p-5', className)}
                {...props}
            />
        );
    }
);

CardContent.displayName = 'CardContent';

// ============================================
// CARD FOOTER
// ============================================

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
    justify?: 'start' | 'end' | 'between' | 'center';
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, justify = 'end', ...props }, ref) => {
        const justifyStyles = {
            start: 'justify-start',
            end: 'justify-end',
            between: 'justify-between',
            center: 'justify-center',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'flex items-center gap-3 p-5 pt-0',
                    justifyStyles[justify],
                    className
                )}
                {...props}
            />
        );
    }
);

CardFooter.displayName = 'CardFooter';

