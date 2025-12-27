/**
 * Utility Functions
 * 
 * Common helper functions used across the application.
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ============================================
// CLASS UTILITIES
// ============================================

/**
 * Merge class names conditionally with Tailwind conflict resolution
 * Usage: cn('base-class', condition && 'conditional-class', 'always-class')
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

// ============================================
// DATE UTILITIES
// ============================================

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | { toDate: () => Date }): string {
    const d = 'toDate' in date ? date.toDate() : date;
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Format a date with time
 */
export function formatDateTime(date: Date | { toDate: () => Date }): string {
    const d = 'toDate' in date ? date.toDate() : date;
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Get relative time string (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date | { toDate: () => Date }): string {
    const d = 'toDate' in date ? date.toDate() : date;
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return formatDate(d);
}

// ============================================
// STATUS HELPERS
// ============================================

import type { EquipmentStatus, RequestStatus, RequestPriority } from './types';

/**
 * Get color class for equipment status
 */
export function getEquipmentStatusColor(status: EquipmentStatus): string {
    const colors: Record<EquipmentStatus, string> = {
        active: 'bg-emerald-100 text-emerald-800',
        maintenance: 'bg-amber-100 text-amber-800',
        scrap: 'bg-red-100 text-red-800',
    };
    return colors[status];
}

/**
 * Get color class for request status
 */
export function getRequestStatusColor(status: RequestStatus): string {
    const colors: Record<RequestStatus, string> = {
        new: 'bg-blue-100 text-blue-800',
        in_progress: 'bg-amber-100 text-amber-800',
        repaired: 'bg-emerald-100 text-emerald-800',
        scrap: 'bg-red-100 text-red-800',
    };
    return colors[status];
}

/**
 * Get color class for priority
 */
export function getPriorityColor(priority: RequestPriority): string {
    const colors: Record<RequestPriority, string> = {
        low: 'bg-gray-100 text-gray-800',
        medium: 'bg-blue-100 text-blue-800',
        high: 'bg-orange-100 text-orange-800',
        critical: 'bg-red-100 text-red-800',
    };
    return colors[priority];
}

/**
 * Human-readable status labels
 */
export function formatStatus(status: RequestStatus | EquipmentStatus): string {
    const labels: Record<string, string> = {
        new: 'New',
        in_progress: 'In Progress',
        repaired: 'Repaired',
        scrap: 'Scrap',
        active: 'Active',
        maintenance: 'Under Maintenance',
    };
    return labels[status] || status;
}

// ============================================
// STRING UTILITIES
// ============================================

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - 3) + '...';
}

/**
 * Generate initials from a name
 */
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}
