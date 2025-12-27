/**
 * EmptyState Component
 * 
 * "No data" placeholder with icon, message, and optional action.
 */

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { FileQuestion, Package, Users, ClipboardList, Calendar } from 'lucide-react';
import { Button, type ButtonProps } from './Button';

// ============================================
// TYPES
// ============================================

export type EmptyStateIcon = 'default' | 'equipment' | 'teams' | 'requests' | 'calendar';

export interface EmptyStateProps {
    icon?: EmptyStateIcon | ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
        variant?: ButtonProps['variant'];
    };
    className?: string;
}

// ============================================
// ICON MAP
// ============================================

const iconMap: Record<EmptyStateIcon, typeof FileQuestion> = {
    default: FileQuestion,
    equipment: Package,
    teams: Users,
    requests: ClipboardList,
    calendar: Calendar,
};

// ============================================
// COMPONENT
// ============================================

export function EmptyState({
    icon = 'default',
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    const IconComponent = typeof icon === 'string'
        ? (iconMap[icon as EmptyStateIcon] ?? iconMap.default)
        : null;

    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center py-12 px-4 text-center',
                className
            )}
        >
            {/* Icon */}
            <div className="mb-4 rounded-full bg-gray-100 dark:bg-gray-800 p-4">
                {IconComponent ? (
                    <IconComponent className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                ) : (
                    icon
                )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
            </h3>

            {/* Description */}
            {description && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                    {description}
                </p>
            )}

            {/* Action */}
            {action && (
                <Button
                    onClick={action.onClick}
                    variant={action.variant || 'primary'}
                    className="mt-6"
                >
                    {action.label}
                </Button>
            )}
        </div>
    );
}

// ============================================
// PRESET EMPTY STATES
// ============================================

export function NoEquipment({ onAdd }: { onAdd?: () => void }) {
    return (
        <EmptyState
            icon="equipment"
            title="No equipment found"
            description="Get started by adding your first piece of equipment to track maintenance."
            action={onAdd ? { label: 'Add Equipment', onClick: onAdd } : undefined}
        />
    );
}

export function NoTeams({ onAdd }: { onAdd?: () => void }) {
    return (
        <EmptyState
            icon="teams"
            title="No teams created"
            description="Create maintenance teams to assign work and track technician workload."
            action={onAdd ? { label: 'Create Team', onClick: onAdd } : undefined}
        />
    );
}

export function NoRequests({ onAdd }: { onAdd?: () => void }) {
    return (
        <EmptyState
            icon="requests"
            title="No maintenance requests"
            description="All caught up! Create a new request when equipment needs attention."
            action={onAdd ? { label: 'New Request', onClick: onAdd } : undefined}
        />
    );
}

export function NoSearchResults({ query }: { query: string }) {
    return (
        <EmptyState
            icon="default"
            title="No results found"
            description={`We couldn't find anything matching "${query}". Try adjusting your search or filters.`}
        />
    );
}

