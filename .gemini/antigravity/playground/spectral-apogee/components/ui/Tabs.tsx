/**
 * Tabs Component
 * 
 * Tab navigation with keyboard accessibility.
 * Supports Compound Component pattern.
 */

'use client';

import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ============================================
// CONTEXT
// ============================================

interface TabsContextValue {
    activeTab: string;
    setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

function useTabsContext() {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('Tab components must be used within a Tabs provider');
    }
    return context;
}

// ============================================
// TABS ROOT
// ============================================

export interface TabsProps {
    defaultValue: string;
    children: React.ReactNode;
    onValueChange?: (value: string) => void;
    className?: string;
}

export function Tabs({ defaultValue, children, onValueChange, className }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultValue);

    const handleSetActiveTab = (id: string) => {
        setActiveTab(id);
        onValueChange?.(id);
    };

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab: handleSetActiveTab }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
}

// ============================================
// TABS LIST
// ============================================

export interface TabsListProps {
    children: React.ReactNode;
    className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
    return (
        <div className={cn(
            'inline-flex h-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 p-1 text-gray-500 dark:text-gray-400',
            className
        )}>
            {children}
        </div>
    );
}

// ============================================
// TABS TRIGGER
// ============================================

export interface TabsTriggerProps {
    value: string;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export function TabsTrigger({ value, children, className, disabled }: TabsTriggerProps) {
    const { activeTab, setActiveTab } = useTabsContext();
    const isActive = activeTab === value;

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => setActiveTab(value)}
            className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                isActive
                    ? 'bg-white text-gray-950 shadow-sm dark:bg-gray-950 dark:text-gray-50'
                    : 'hover:text-gray-900 dark:hover:text-gray-100',
                className
            )}
        >
            {children}
        </button>
    );
}

// ============================================
// TABS CONTENT
// ============================================

export interface TabsContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
    const { activeTab } = useTabsContext();
    const isActive = activeTab === value;

    if (!isActive) return null;

    return (
        <div
            role="tabpanel"
            tabIndex={0}
            className={cn(
                'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300',
                className
            )}
        >
            {children}
        </div>
    );
}
