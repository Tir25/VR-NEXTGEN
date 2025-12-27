'use client';

/**
 * Header Component
 * 
 * Top header bar with page title, search, and user menu.
 */

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Menu, Bell, Search, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================
// COMPONENT
// ============================================

interface HeaderProps {
    title?: string;
    onMenuClick?: () => void;
}

export function Header({ title = 'Dashboard', onMenuClick }: HeaderProps) {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                {/* Left: Menu button (mobile) and Title */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h1>
                </div>

                {/* Right: Search, Notifications, User */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Search */}
                    <div className="hidden sm:flex items-center">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className={cn(
                                    'w-64 pl-9 pr-4 py-2 text-sm rounded-lg',
                                    'bg-gray-100 dark:bg-gray-800',
                                    'border border-transparent',
                                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                                    'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                                    'text-gray-900 dark:text-white'
                                )}
                            />
                        </div>
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    {/* User Menu */}
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className={cn(
                                'flex items-center gap-2 p-1.5 rounded-lg transition-colors',
                                'hover:bg-gray-100 dark:hover:bg-gray-800',
                                isUserMenuOpen && 'bg-gray-100 dark:bg-gray-800'
                            )}
                        >
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                    {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                </span>
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user?.displayName || 'User'}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {user?.email}
                                </p>
                            </div>
                            <ChevronDown className={cn(
                                'hidden sm:block w-4 h-4 text-gray-500 transition-transform',
                                isUserMenuOpen && 'rotate-180'
                            )} />
                        </button>

                        {/* Dropdown Menu */}
                        {isUserMenuOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 sm:hidden">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {user?.displayName || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {user?.email}
                                    </p>
                                </div>
                                <button
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <User className="w-4 h-4" />
                                    <span>Profile</span>
                                </button>
                                <button
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <Settings className="w-4 h-4" />
                                    <span>Settings</span>
                                </button>
                                <div className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-1">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
