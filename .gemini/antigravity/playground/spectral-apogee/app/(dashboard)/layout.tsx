'use client';

/**
 * Dashboard Layout
 * 
 * Protected layout wrapper for all dashboard pages.
 * Includes sidebar, header, and auth protection.
 */

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Sidebar, Header, MobileNav } from '@/components/layout';
import { FullPageSpinner } from '@/components/ui';
import { isFirebaseConfigured } from '@/lib/firebase';

// ============================================
// PAGE TITLES
// ============================================

const pageTitles: Record<string, string> = {
    '/': 'Dashboard',
    '/equipment': 'Equipment',
    '/teams': 'Teams',
    '/requests': 'Maintenance Requests',
    '/calendar': 'Maintenance Calendar',
    '/categories': 'Equipment Categories',
    '/work-centers': 'Work Centers',
    '/reporting': 'Reporting',
};

function getPageTitle(pathname: string): string {
    // Exact match first
    if (pageTitles[pathname]) return pageTitles[pathname];
    
    // Check for parent path match
    for (const [path, title] of Object.entries(pageTitles)) {
        if (pathname.startsWith(path) && path !== '/') {
            return title;
        }
    }
    
    return 'GearGuard';
}

// ============================================
// FIREBASE NOT CONFIGURED VIEW
// ============================================

function FirebaseNotConfigured() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        className="w-8 h-8 text-amber-600 dark:text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Firebase Not Configured
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    The application requires Firebase credentials to function. Please set up your environment variables.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-left mb-6">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Required setup:
                    </p>
                    <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
                        <li>Create a <code className="text-blue-600">.env.local</code> file</li>
                        <li>Add Firebase credentials</li>
                        <li>Restart the dev server</li>
                    </ol>
                </div>
                <a
                    href="https://console.firebase.google.com/project/gearguard-track-app/settings/general"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <span>Open Firebase Console</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
                <p className="mt-4 text-xs text-gray-400">
                    See <code>FIREBASE_ENV_SETUP.md</code> for detailed instructions.
                </p>
            </div>
        </div>
    );
}

// ============================================
// COMPONENT
// ============================================

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, loading, isConfigured } = useAuth();
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Redirect to login if not authenticated (only if Firebase is configured)
    useEffect(() => {
        if (!loading && isConfigured && !user) {
            router.push('/login');
        }
    }, [user, loading, isConfigured, router]);

    // Show Firebase not configured message
    if (!isFirebaseConfigured) {
        return <FirebaseNotConfigured />;
    }

    // Show loading while checking auth
    if (loading) {
        return <FullPageSpinner />;
    }

    // Don't render if not authenticated
    if (!user) {
        return null;
    }

    const pageTitle = getPageTitle(pathname);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Sidebar - Hidden on mobile */}
            <div className="hidden lg:block">
                <Sidebar
                    isCollapsed={isSidebarCollapsed}
                    onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />
            </div>

            {/* Mobile Navigation */}
            <MobileNav
                isOpen={isMobileNavOpen}
                onClose={() => setIsMobileNavOpen(false)}
            />

            {/* Main Content */}
            <div
                className={`transition-all duration-300 ${
                    isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
                }`}
            >
                {/* Header */}
                <Header
                    title={pageTitle}
                    onMenuClick={() => setIsMobileNavOpen(true)}
                />

                {/* Page Content */}
                <main className="p-4 sm:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
