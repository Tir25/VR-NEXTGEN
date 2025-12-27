/**
 * Navigation Configuration
 * 
 * Centralized navigation items used by Sidebar and MobileNav.
 * Prevents duplication per CODING_STANDARDS.md Rule 2.
 */

import {
    LayoutDashboard,
    Wrench,
    Users,
    ClipboardList,
    Calendar,
    Tag,
    Factory,
    BarChart2,
    type LucideIcon,
} from 'lucide-react';

// ============================================
// TYPES
// ============================================

export interface NavItem {
    href: string;
    label: string;
    icon: LucideIcon;
}

// ============================================
// NAVIGATION ITEMS
// ============================================

export const navItems: NavItem[] = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/equipment', label: 'Equipment', icon: Wrench },
    { href: '/teams', label: 'Teams', icon: Users },
    { href: '/requests', label: 'Requests', icon: ClipboardList },
    { href: '/calendar', label: 'Calendar', icon: Calendar },
    { href: '/categories', label: 'Categories', icon: Tag },
    { href: '/work-centers', label: 'Work Centers', icon: Factory },
    { href: '/reporting', label: 'Reporting', icon: BarChart2 },
];

/**
 * Check if a path is active based on the current pathname
 */
export function isNavItemActive(pathname: string, href: string): boolean {
    return pathname === href || (href !== '/' && pathname.startsWith(href));
}
