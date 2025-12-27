/**
 * Request Service
 * 
 * Firestore operations for maintenance requests collection.
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
import type { MaintenanceRequest, RequestFormData, RequestStatus } from '@/lib/types';
import type { Unsubscribe, Timestamp } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

// ============================================
// FETCH OPERATIONS
// ============================================

/**
 * Get all requests
 */
export async function getRequests(options?: QueryOptions): Promise<MaintenanceRequest[]> {
    return fetchCollection<MaintenanceRequest>(COLLECTIONS.REQUESTS, {
        orderByField: 'createdAt',
        orderDirection: 'desc',
        ...options,
    });
}

/**
 * Get request by ID
 */
export async function getRequestById(id: string): Promise<MaintenanceRequest | null> {
    return fetchDocument<MaintenanceRequest>(COLLECTIONS.REQUESTS, id);
}

/**
 * Get requests by status
 */
export async function getRequestsByStatus(status: RequestStatus): Promise<MaintenanceRequest[]> {
    return fetchCollection<MaintenanceRequest>(COLLECTIONS.REQUESTS, {
        filters: [{ field: 'status', operator: '==', value: status }],
        orderByField: 'createdAt',
        orderDirection: 'desc',
    });
}

/**
 * Get requests by equipment
 */
export async function getRequestsByEquipment(equipmentId: string): Promise<MaintenanceRequest[]> {
    return fetchCollection<MaintenanceRequest>(COLLECTIONS.REQUESTS, {
        filters: [{ field: 'equipmentId', operator: '==', value: equipmentId }],
        orderByField: 'createdAt',
        orderDirection: 'desc',
    });
}

/**
 * Get requests by team
 */
export async function getRequestsByTeam(teamId: string): Promise<MaintenanceRequest[]> {
    return fetchCollection<MaintenanceRequest>(COLLECTIONS.REQUESTS, {
        filters: [{ field: 'teamId', operator: '==', value: teamId }],
        orderByField: 'createdAt',
        orderDirection: 'desc',
    });
}

/**
 * Get requests by technician
 */
export async function getRequestsByTechnician(technicianId: string): Promise<MaintenanceRequest[]> {
    return fetchCollection<MaintenanceRequest>(COLLECTIONS.REQUESTS, {
        filters: [{ field: 'technicianId', operator: '==', value: technicianId }],
        orderByField: 'createdAt',
        orderDirection: 'desc',
    });
}

/**
 * Get preventive requests in date range
 */
export async function getPreventiveRequests(
    startDate: Timestamp,
    endDate: Timestamp
): Promise<MaintenanceRequest[]> {
    return fetchCollection<MaintenanceRequest>(COLLECTIONS.REQUESTS, {
        filters: [
            { field: 'type', operator: '==', value: 'preventive' },
            { field: 'scheduledDate', operator: '>=', value: startDate },
            { field: 'scheduledDate', operator: '<=', value: endDate },
        ],
        orderByField: 'scheduledDate',
        orderDirection: 'asc',
    });
}

/**
 * Get critical requests (high/critical priority, open status)
 */
export async function getCriticalRequests(): Promise<MaintenanceRequest[]> {
    return fetchCollection<MaintenanceRequest>(COLLECTIONS.REQUESTS, {
        filters: [
            { field: 'priority', operator: 'in', value: ['high', 'critical'] },
            { field: 'status', operator: 'in', value: ['new', 'in_progress'] },
        ],
        orderByField: 'createdAt',
        orderDirection: 'desc',
    });
}

// ============================================
// WRITE OPERATIONS
// ============================================

/**
 * Create new request
 */
export async function addRequest(data: RequestFormData): Promise<string> {
    return createDocument(COLLECTIONS.REQUESTS, {
        ...data,
        status: 'new',
    });
}

/**
 * Update request
 */
export async function updateRequest(id: string, data: Partial<RequestFormData>): Promise<void> {
    return updateDocument(COLLECTIONS.REQUESTS, id, data);
}

/**
 * Delete request
 */
export async function deleteRequest(id: string): Promise<void> {
    return deleteDocument(COLLECTIONS.REQUESTS, id);
}

/**
 * Update request status (for Kanban drag)
 */
export async function updateRequestStatus(id: string, status: RequestStatus): Promise<void> {
    const updates: Record<string, unknown> = { status };

    // If status is repaired or scrap, set completedDate using serverTimestamp
    if (status === 'repaired' || status === 'scrap') {
        updates.completedDate = serverTimestamp();
    }

    return updateDocument(COLLECTIONS.REQUESTS, id, updates);
}

/**
 * Assign technician to request
 */
export async function assignTechnician(
    requestId: string,
    technicianId: string,
    technicianName: string
): Promise<void> {
    return updateDocument(COLLECTIONS.REQUESTS, requestId, {
        technicianId,
        technicianName,
    });
}

// ============================================
// REAL-TIME SUBSCRIPTIONS
// ============================================

/**
 * Subscribe to all requests changes
 */
export function subscribeToRequests(
    callback: (requests: MaintenanceRequest[]) => void,
    options?: QueryOptions
): Unsubscribe {
    return subscribeToCollection<MaintenanceRequest>(COLLECTIONS.REQUESTS, callback, {
        orderByField: 'createdAt',
        orderDirection: 'desc',
        ...options,
    });
}

/**
 * Subscribe to single request changes
 */
export function subscribeToRequestById(
    id: string,
    callback: (request: MaintenanceRequest | null) => void
): Unsubscribe {
    return subscribeToDocument<MaintenanceRequest>(COLLECTIONS.REQUESTS, id, callback);
}

