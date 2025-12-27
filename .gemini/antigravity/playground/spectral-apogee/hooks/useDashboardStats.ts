'use client';

/**
 * Dashboard Stats Hook
 * 
 * Aggregates data for dashboard KPI widgets.
 */

import { useState, useEffect, useCallback } from 'react';
import * as requestService from '@/services/requestService';
import * as equipmentService from '@/services/equipmentService';
import type { MaintenanceRequest, Equipment } from '@/lib/types';

// ============================================
// TYPES
// ============================================

interface DashboardStats {
    criticalEquipment: number;
    criticalEquipmentList: Equipment[];
    openRequests: number;
    overdueRequests: number;
    totalEquipment: number;
    equipmentByStatus: {
        active: number;
        maintenance: number;
        scrap: number;
    };
    requestsByStatus: {
        new: number;
        in_progress: number;
        repaired: number;
        scrap: number;
    };
    requestsByPriority: {
        low: number;
        medium: number;
        high: number;
        critical: number;
    };
    technicianLoad: Map<string, number>;
    recentRequests: MaintenanceRequest[];
}

interface UseDashboardStatsReturn {
    stats: DashboardStats | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

// ============================================
// HOOK
// ============================================

export function useDashboardStats(): UseDashboardStatsReturn {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const [requests, equipment] = await Promise.all([
                requestService.getRequests(),
                equipmentService.getEquipment(),
            ]);

            // Calculate open requests (new + in_progress)
            const openRequests = requests.filter(
                (r) => r.status === 'new' || r.status === 'in_progress'
            ).length;

            // Calculate overdue (scheduled date in past, not completed)
            const now = new Date();
            const overdueRequests = requests.filter((r) => {
                if (r.status === 'repaired' || r.status === 'scrap') return false;
                if (!r.scheduledDate) return false;
                const scheduled = r.scheduledDate.toDate ? r.scheduledDate.toDate() : new Date(r.scheduledDate as unknown as string);
                return scheduled < now;
            }).length;

            // Equipment with critical priority open requests
            const criticalRequestEquipmentIds = new Set(
                requests
                    .filter((r) => r.priority === 'critical' && (r.status === 'new' || r.status === 'in_progress'))
                    .map((r) => r.equipmentId)
            );
            const criticalEquipmentList = equipment.filter((e) => criticalRequestEquipmentIds.has(e.id));

            // Equipment by status
            const equipmentByStatus = {
                active: equipment.filter((e) => e.status === 'active').length,
                maintenance: equipment.filter((e) => e.status === 'maintenance').length,
                scrap: equipment.filter((e) => e.status === 'scrap').length,
            };

            // Requests by status
            const requestsByStatus = {
                new: requests.filter((r) => r.status === 'new').length,
                in_progress: requests.filter((r) => r.status === 'in_progress').length,
                repaired: requests.filter((r) => r.status === 'repaired').length,
                scrap: requests.filter((r) => r.status === 'scrap').length,
            };

            // Requests by priority
            const requestsByPriority = {
                low: requests.filter((r) => r.priority === 'low').length,
                medium: requests.filter((r) => r.priority === 'medium').length,
                high: requests.filter((r) => r.priority === 'high').length,
                critical: requests.filter((r) => r.priority === 'critical').length,
            };

            // Technician load (open requests per technician)
            const technicianLoad = new Map<string, number>();
            requests
                .filter((r) => r.technicianId && (r.status === 'new' || r.status === 'in_progress'))
                .forEach((r) => {
                    const current = technicianLoad.get(r.technicianId!) || 0;
                    technicianLoad.set(r.technicianId!, current + 1);
                });

            // Recent requests (last 5)
            const recentRequests = requests.slice(0, 5);

            setStats({
                criticalEquipment: criticalEquipmentList.length,
                criticalEquipmentList,
                openRequests,
                overdueRequests,
                totalEquipment: equipment.length,
                equipmentByStatus,
                requestsByStatus,
                requestsByPriority,
                technicianLoad,
                recentRequests,
            });
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { stats, loading, error, refetch: fetchData };
}

