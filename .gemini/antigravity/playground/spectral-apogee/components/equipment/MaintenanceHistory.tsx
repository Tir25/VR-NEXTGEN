'use client';

import { useRequestsByEquipment } from '@/hooks/useRequestsByEquipment';
import { Card } from '@/components/ui/Card';
import { Badge, getRequestStatusBadgeVariant, getPriorityBadgeVariant } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { RefreshCw, ClipboardList, Calendar, User } from 'lucide-react';

interface MaintenanceHistoryProps {
    equipmentId: string;
}

export function MaintenanceHistory({ equipmentId }: MaintenanceHistoryProps) {
    const { requests, loading, error, refetch } = useRequestsByEquipment(equipmentId);

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8 text-red-500">
                <p>Failed to load maintenance history.</p>
                <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2">
                    Retry
                </Button>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                <ClipboardList className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    No Maintenance History
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    There are no recorded requests for this equipment.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {requests.length} Requests Found
                </h3>
                <Button variant="ghost" size="icon" onClick={() => refetch()} title="Refresh">
                    <RefreshCw className="w-4 h-4" />
                </Button>
            </div>

            {requests.map((request) => (
                <Card key={request.id} className="p-4 hover:border-blue-500/50 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                    {request.subject}
                                </span>
                                <Badge variant={getRequestStatusBadgeVariant(request.status)}>
                                    {request.status.replace('_', ' ')}
                                </Badge>
                                <Badge variant={getPriorityBadgeVariant(request.priority)}>
                                    {request.priority}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                {request.description || 'No description provided.'}
                            </p>
                        </div>
                        <div className="text-right text-xs text-gray-500 dark:text-gray-400 space-y-1">
                            <div className="flex items-center justify-end gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(request.createdAt)}
                            </div>
                            {request.technicianName && (
                                <div className="flex items-center justify-end gap-1.5">
                                    <User className="w-3.5 h-3.5" />
                                    {request.technicianName}
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
