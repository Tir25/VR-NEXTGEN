/**
 * Auth Layout
 * 
 * Centered layout for authentication pages (login, signup).
 * No sidebar, focused on the auth form.
 */

import type { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4">
            {/* Logo */}
            <div className="mb-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        GearGuard
                    </h1>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    The Ultimate Maintenance Tracker
                </p>
            </div>

            {/* Auth Form Container */}
            <div className="w-full max-w-md">
                {children}
            </div>

            {/* Footer */}
            <p className="mt-8 text-xs text-gray-400 dark:text-gray-500">
                © {new Date().getFullYear()} GearGuard. All rights reserved.
            </p>
        </div>
    );
}

