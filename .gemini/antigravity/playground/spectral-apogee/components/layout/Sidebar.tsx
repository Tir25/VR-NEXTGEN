'use client';

/**
 * Sidebar Component
 * 
 * Main navigation sidebar for the dashboard.
 * Supports collapsing for more screen space.
 */

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
    ChevronLeft,
    ChevronRight,
    Shield,
} from 'lucide-react';
import { navItems, isNavItemActive } from '@/lib/navigation';


// ============================================
// COMPONENT
// ============================================

interface SidebarProps {
    isCollapsed?: boolean;
    onToggle?: () => void;
}

export function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 h-screen bg-gray-900 dark:bg-gray-950 border-r border-gray-800',
                'transition-all duration-300 z-40',
                isCollapsed ? 'w-16' : 'w-64'
            )}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
                {!isCollapsed && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-white text-lg">GearGuard</span>
                    </div>
                )}
                {isCollapsed && (
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="p-3 space-y-1 flex-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isNavItemActive(pathname, item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                                'text-gray-400 hover:text-white hover:bg-gray-800',
                                isActive && 'bg-blue-600 text-white hover:bg-blue-700',
                                isCollapsed && 'justify-center'
                            )}
                            title={isCollapsed ? item.label : undefined}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            {!isCollapsed && (
                                <span className="text-sm font-medium">{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Collapse Toggle */}
            {onToggle && (
                <div className="absolute bottom-4 left-0 right-0 px-3">
                    <button
                        onClick={onToggle}
                        className={cn(
                            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg',
                            'text-gray-400 hover:text-white hover:bg-gray-800 transition-colors',
                            isCollapsed && 'justify-center'
                        )}
                    >
                        {isCollapsed ? (
                            <ChevronRight className="w-5 h-5" />
                        ) : (
                            <>
                                <ChevronLeft className="w-5 h-5" />
                                <span className="text-sm font-medium">Collapse</span>
                            </>
                        )}
                    </button>
                </div>
            )}
        </aside>
    );
}
