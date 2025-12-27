import { Equipment } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Wrench, Calendar, MapPin, MoreHorizontal } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface EquipmentCardProps {
    equipment: Equipment;
    onEdit?: (id: string) => void;
    onView?: (id: string) => void;
}

export function EquipmentCard({ equipment, onEdit, onView }: EquipmentCardProps) {
    const statusColor = {
        active: 'success',
        maintenance: 'warning',
        scrap: 'destructive',
    } as const;

    const maintenanceDue = equipment.nextMaintenanceDate?.toDate()
        ? equipment.nextMaintenanceDate.toDate() < new Date()
        : false;

    return (
        <Card className="hover:border-blue-500/50 transition-colors duration-200">
            <div className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                {equipment.name}
                            </h3>
                            <Badge variant={statusColor[equipment.status] || 'default'}>
                                {equipment.status.replace('_', ' ')}
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            SN: {equipment.serialNumber}
                        </p>
                    </div>
                    <Button variant="ghost" size="icon" className="-mr-2">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{equipment.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Wrench className="w-4 h-4 text-gray-400" />
                        <span>{equipment.model}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div className={cn(
                        "flex items-center gap-1.5 text-xs font-medium",
                        maintenanceDue ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                    )}>
                        <Calendar className="w-3.5 h-3.5" />
                        {maintenanceDue
                            ? 'Maintenance Overdue'
                            : 'On Schedule'
                        }
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onView?.(equipment.id)}
                        >
                            View
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onEdit?.(equipment.id)}
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
