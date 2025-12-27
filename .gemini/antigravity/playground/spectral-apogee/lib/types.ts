/**
 * GearGuard Type Definitions
 * 
 * Core TypeScript interfaces for the application.
 * Based on the data model from GEARGUARD_PROJECT_GUIDE.md
 */

import { Timestamp } from 'firebase/firestore';

// ============================================
// EQUIPMENT TYPES
// ============================================

export type EquipmentStatus = 'active' | 'maintenance' | 'scrap';

export interface Equipment {
    id: string;
    name: string;
    model?: string; // Added to fix type error
    serialNumber: string;
    category: string;
    department: string;
    employeeId?: string;
    location: string;
    purchaseDate: Timestamp;
    warrantyExpiration?: Timestamp;
    nextMaintenanceDate?: Timestamp; // Added to fix type error
    maintenanceTeamId: string;
    techId?: string;
    status: EquipmentStatus;
    notes?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Form input type (without server-generated fields)
export type EquipmentFormData = Omit<Equipment, 'id' | 'createdAt' | 'updatedAt'>;

// ============================================
// TEAM TYPES
// ============================================

export type TeamMemberRole = 'lead' | 'technician' | 'apprentice';

export interface TeamMember {
    userId: string;
    name: string;
    role: TeamMemberRole;
    email: string;
}

export interface Team {
    id: string;
    name: string;
    description?: string;
    members: TeamMember[];
    createdAt: Timestamp;
}

export type TeamFormData = Omit<Team, 'id' | 'createdAt'>;

// ============================================
// REQUEST TYPES
// ============================================

export type RequestType = 'corrective' | 'preventive';
export type RequestStatus = 'new' | 'in_progress' | 'repaired' | 'scrap';
export type RequestPriority = 'low' | 'medium' | 'high' | 'critical';

export interface MaintenanceRequest {
    id: string;
    subject: string;
    description?: string;
    equipmentId: string;
    equipmentName: string;
    teamId: string;
    teamName: string;
    technicianId?: string;
    technicianName?: string;
    type: RequestType;
    status: RequestStatus;
    priority: RequestPriority;
    scheduledDate?: Timestamp;
    completedDate?: Timestamp;
    duration?: number; // Hours spent
    requesterId: string;
    requesterName: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export type RequestFormData = Omit<
    MaintenanceRequest,
    'id' | 'createdAt' | 'updatedAt' | 'equipmentName' | 'teamName' | 'technicianName' | 'requesterName'
>;

// ============================================
// USER TYPES
// ============================================

export interface User {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
}

// Extended user profile (if stored in Firestore)
export interface UserProfile extends User {
    role?: 'admin' | 'manager' | 'technician' | 'viewer';
    teamId?: string;
    createdAt: Timestamp;
}

// ============================================
// UTILITY TYPES
// ============================================

// Generic loading/error state
export interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

// Firestore document with ID
export type WithId<T> = T & { id: string };

// ============================================
// EQUIPMENT CATEGORY TYPES
// ============================================

export interface EquipmentCategory {
    id: string;
    name: string;
    responsible?: string;
    company?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export type EquipmentCategoryFormData = Omit<EquipmentCategory, 'id' | 'createdAt' | 'updatedAt'>;

// ============================================
// WORK CENTER TYPES
// ============================================

export interface WorkCenter {
    id: string;
    name: string;
    code: string;
    tag?: string;
    alternativeWorkCenters?: string[];
    costPerHour: number;
    capacityTimeEfficiency: number;
    oeeTarget: number;
    company?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export type WorkCenterFormData = Omit<WorkCenter, 'id' | 'createdAt' | 'updatedAt'>;