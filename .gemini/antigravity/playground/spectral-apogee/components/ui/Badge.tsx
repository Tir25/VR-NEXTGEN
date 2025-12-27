/**
 * Badge Component
 * 
 * Status and priority indicators with multiple variants.
 */

import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { EquipmentStatus, RequestStatus, RequestPriority } from '@/lib/types';

// ============================================
// TYPES
// ============================================

export type BadgeVariant =
    | 'default'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'gray'
    | 'secondary'
    | 'outline'
    | 'destructive';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: BadgeSize;
    dot?: boolean;
}

// ============================================
// STYLES
// ============================================

const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200', // Mapped to default/gray
    outline: 'border border-gray-200 text-gray-800 dark:border-gray-700 dark:text-gray-200 bg-transparent',
    destructive: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', // Mapped to error
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    gray: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

const dotStyles: Record<BadgeVariant, string> = {
    default: 'bg-gray-500',
    secondary: 'bg-gray-500',
    outline: 'bg-gray-500',
    destructive: 'bg-red-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    gray: 'bg-gray-400',
};

const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
};

// ============================================
// COMPONENT
// ============================================

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'default', size = 'md', dot = false, children, ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={cn(
                    'inline-flex items-center gap-1.5 font-medium rounded-full',
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                {...props}
            >
                {dot && (
                    <span
                        className={cn('w-1.5 h-1.5 rounded-full', dotStyles[variant])}
                        aria-hidden="true"
                    />
                )}
                {children}
            </span>
        );
    }
);

Badge.displayName = 'Badge';

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get badge variant for equipment status
 */
export function getEquipmentStatusBadgeVariant(status: EquipmentStatus): BadgeVariant {
    const map: Record<EquipmentStatus, BadgeVariant> = {
        active: 'success',
        maintenance: 'warning',
        scrap: 'error',
    };
    return map[status];
}

/**
 * Get badge variant for request status
 */
export function getRequestStatusBadgeVariant(status: RequestStatus): BadgeVariant {
    const map: Record<RequestStatus, BadgeVariant> = {
        new: 'info',
        in_progress: 'warning',
        repaired: 'success',
        scrap: 'error',
    };
    return map[status];
}

/**
 * Get badge variant for priority
 */
export function getPriorityBadgeVariant(priority: RequestPriority): BadgeVariant {
    const map: Record<RequestPriority, BadgeVariant> = {
        low: 'gray',
        medium: 'info',
        high: 'warning',
        critical: 'error',
    };
    return map[priority];
}

