/**
 * Application Constants
 * 
 * Centralized configuration values and option arrays.
 */

// ============================================
// STATUS OPTIONS
// ============================================

export const EQUIPMENT_STATUS_OPTIONS = [
    { value: 'active', label: 'Active' },
    { value: 'maintenance', label: 'Under Maintenance' },
    { value: 'scrap', label: 'Scrap' },
] as const;

export const REQUEST_STATUS_OPTIONS = [
    { value: 'new', label: 'New' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'repaired', label: 'Repaired' },
    { value: 'scrap', label: 'Scrap' },
] as const;

export const PRIORITY_OPTIONS = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
] as const;

export const REQUEST_TYPE_OPTIONS = [
    { value: 'corrective', label: 'Corrective' },
    { value: 'preventive', label: 'Preventive' },
] as const;

export const TEAM_ROLE_OPTIONS = [
    { value: 'lead', label: 'Team Lead' },
    { value: 'technician', label: 'Technician' },
    { value: 'apprentice', label: 'Apprentice' },
] as const;

// ============================================
// CATEGORY OPTIONS
// ============================================

export const EQUIPMENT_CATEGORIES = [
    'CNC Machine',
    'Printer',
    'Computer',
    'Vehicle',
    'HVAC System',
    'Generator',
    'Pump',
    'Conveyor',
    'Forklift',
    'Other',
] as const;

export const DEPARTMENT_OPTIONS = [
    'Production',
    'IT',
    'Facilities',
    'Warehouse',
    'Quality Control',
    'Administration',
    'Research & Development',
    'Other',
] as const;

// ============================================
// KANBAN COLUMNS
// ============================================

export const KANBAN_COLUMNS = [
    { id: 'new', title: 'New', color: '#3b82f6' },
    { id: 'in_progress', title: 'In Progress', color: '#f59e0b' },
    { id: 'repaired', title: 'Repaired', color: '#10b981' },
    { id: 'scrap', title: 'Scrap', color: '#ef4444' },
] as const;

// ============================================
// NAVIGATION
// ============================================

export const NAV_ITEMS = [
    { href: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
    { href: '/equipment', label: 'Equipment', icon: 'Wrench' },
    { href: '/teams', label: 'Teams', icon: 'Users' },
    { href: '/requests', label: 'Requests', icon: 'ClipboardList' },
    { href: '/calendar', label: 'Calendar', icon: 'Calendar' },
] as const;

// ============================================
// FIRESTORE COLLECTIONS
// ============================================

export const COLLECTIONS = {
    EQUIPMENT: 'equipment',
    TEAMS: 'teams',
    REQUESTS: 'requests',
    USERS: 'users',
    CATEGORIES: 'categories',
    WORK_CENTERS: 'workCenters',
} as const;

// ============================================
// UI DEFAULTS
// ============================================

export const DEFAULT_PAGE_SIZE = 10;
export const DATE_FORMAT = 'MMM d, yyyy';
export const DATETIME_FORMAT = 'MMM d, yyyy h:mm a';
