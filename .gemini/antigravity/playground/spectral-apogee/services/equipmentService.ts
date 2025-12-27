/**
 * Equipment Service
 * 
 * Firestore operations for equipment collection.
 */

import {
    fetchCollection,
    fetchDocument,
    createDocument,
    updateDocument,
    deleteDocument,
    subscribeToCollection,
    subscribeToDocument,
    type QueryOptions,
} from '@/lib/firestore-utils';
import { COLLECTIONS } from '@/lib/constants';
import type { Equipment, EquipmentFormData, EquipmentStatus } from '@/lib/types';
import type { Unsubscribe } from 'firebase/firestore';

// ============================================
// FETCH OPERATIONS
// ============================================

/**
 * Get all equipment
 */
export async function getEquipment(options?: QueryOptions): Promise<Equipment[]> {
    return fetchCollection<Equipment>(COLLECTIONS.EQUIPMENT, {
        orderByField: 'name',
        orderDirection: 'asc',
        ...options,
    });
}

/**
 * Get equipment by ID
 */
export async function getEquipmentById(id: string): Promise<Equipment | null> {
    return fetchDocument<Equipment>(COLLECTIONS.EQUIPMENT, id);
}

/**
 * Get equipment by status
 */
export async function getEquipmentByStatus(status: EquipmentStatus): Promise<Equipment[]> {
    return fetchCollection<Equipment>(COLLECTIONS.EQUIPMENT, {
        filters: [{ field: 'status', operator: '==', value: status }],
        orderByField: 'name',
    });
}

/**
 * Get equipment by team
 */
export async function getEquipmentByTeam(teamId: string): Promise<Equipment[]> {
    return fetchCollection<Equipment>(COLLECTIONS.EQUIPMENT, {
        filters: [{ field: 'maintenanceTeamId', operator: '==', value: teamId }],
        orderByField: 'name',
    });
}

/**
 * Get equipment by category
 */
export async function getEquipmentByCategory(category: string): Promise<Equipment[]> {
    return fetchCollection<Equipment>(COLLECTIONS.EQUIPMENT, {
        filters: [{ field: 'category', operator: '==', value: category }],
        orderByField: 'name',
    });
}

// ============================================
// WRITE OPERATIONS
// ============================================

/**
 * Create new equipment
 */
export async function addEquipment(data: EquipmentFormData): Promise<string> {
    return createDocument(COLLECTIONS.EQUIPMENT, data);
}

/**
 * Update equipment
 */
export async function updateEquipment(id: string, data: Partial<EquipmentFormData>): Promise<void> {
    return updateDocument(COLLECTIONS.EQUIPMENT, id, data);
}

/**
 * Delete equipment
 */
export async function deleteEquipment(id: string): Promise<void> {
    return deleteDocument(COLLECTIONS.EQUIPMENT, id);
}

/**
 * Update equipment status
 */
export async function updateEquipmentStatus(id: string, status: EquipmentStatus): Promise<void> {
    return updateDocument(COLLECTIONS.EQUIPMENT, id, { status });
}

// ============================================
// REAL-TIME SUBSCRIPTIONS
// ============================================

/**
 * Subscribe to all equipment changes
 */
export function subscribeToEquipment(
    callback: (equipment: Equipment[]) => void,
    options?: QueryOptions
): Unsubscribe {
    return subscribeToCollection<Equipment>(COLLECTIONS.EQUIPMENT, callback, {
        orderByField: 'name',
        orderDirection: 'asc',
        ...options,
    });
}

/**
 * Subscribe to single equipment changes
 */
export function subscribeToEquipmentById(
    id: string,
    callback: (equipment: Equipment | null) => void
): Unsubscribe {
    return subscribeToDocument<Equipment>(COLLECTIONS.EQUIPMENT, id, callback);
}

