'use client';

/**
 * Mobile Navigation Component
 * 
 * Slide-out navigation drawer for mobile devices.
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
    X,
    Shield,
} from 'lucide-react';
import { navItems, isNavItemActive } from '@/lib/navigation';



// ============================================
// COMPONENT
// ============================================

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const pathname = usePathname();

    // Close on route change
    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    'fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300',
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
                onClick={onClose}
            />

            {/* Drawer */}
            <aside
                className={cn(
                    'fixed left-0 top-0 h-screen w-72 bg-gray-900 dark:bg-gray-950 z-50 lg:hidden',
                    'transform transition-transform duration-300 ease-in-out',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-white text-lg">GearGuard</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-3 space-y-1">
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
                                    isActive && 'bg-blue-600 text-white hover:bg-blue-700'
                                )}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
