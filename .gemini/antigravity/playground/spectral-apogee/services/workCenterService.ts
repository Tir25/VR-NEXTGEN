/**
 * Work Center Service
 * 
 * Firestore operations for work centers collection.
 */

import {
    fetchCollection,
    fetchDocument,
    createDocument,
    updateDocument,
    deleteDocument,
    subscribeToCollection,
    type QueryOptions,
} from '@/lib/firestore-utils';
import { COLLECTIONS } from '@/lib/constants';
import type { WorkCenter, WorkCenterFormData } from '@/lib/types';
import type { Unsubscribe } from 'firebase/firestore';



// ============================================
// FETCH OPERATIONS
// ============================================

/**
 * Get all work centers
 */
export async function getWorkCenters(options?: QueryOptions): Promise<WorkCenter[]> {
    return fetchCollection<WorkCenter>(COLLECTIONS.WORK_CENTERS, {
        orderByField: 'name',
        orderDirection: 'asc',
        ...options,
    });
}

/**
 * Get work center by ID
 */
export async function getWorkCenterById(id: string): Promise<WorkCenter | null> {
    return fetchDocument<WorkCenter>(COLLECTIONS.WORK_CENTERS, id);
}

/**
 * Get work center by code
 */
export async function getWorkCenterByCode(code: string): Promise<WorkCenter | null> {
    const results = await fetchCollection<WorkCenter>(COLLECTIONS.WORK_CENTERS, {
        filters: [{ field: 'code', operator: '==', value: code }],
        limitCount: 1,
    });
    return results[0] || null;
}

// ============================================
// WRITE OPERATIONS
// ============================================

/**
 * Create new work center
 */
export async function addWorkCenter(data: WorkCenterFormData): Promise<string> {
    return createDocument(COLLECTIONS.WORK_CENTERS, data);
}

/**
 * Update work center
 */
export async function updateWorkCenter(id: string, data: Partial<WorkCenterFormData>): Promise<void> {
    return updateDocument(COLLECTIONS.WORK_CENTERS, id, data);
}

/**
 * Delete work center
 */
export async function deleteWorkCenter(id: string): Promise<void> {
    return deleteDocument(COLLECTIONS.WORK_CENTERS, id);
}

// ============================================
// REAL-TIME SUBSCRIPTIONS
// ============================================

/**
 * Subscribe to all work centers changes
 */
export function subscribeToWorkCenters(
    callback: (workCenters: WorkCenter[]) => void,
    options?: QueryOptions
): Unsubscribe {
    return subscribeToCollection<WorkCenter>(COLLECTIONS.WORK_CENTERS, callback, {
        orderByField: 'name',
        orderDirection: 'asc',
        ...options,
    });
}

