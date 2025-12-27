import { Equipment } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import {
    Wrench, MapPin, Calendar, Building,
    Hash, Tag, Users, User, Edit, Trash2
} from 'lucide-react';

interface EquipmentDetailCardProps {
    equipment: Equipment;
    teamName: string;
    technicianName: string;
    onEdit: () => void;
    onDelete: () => void;
}

export function EquipmentDetailCard({
    equipment,
    teamName,
    technicianName,
    onEdit,
    onDelete
}: EquipmentDetailCardProps) {
    const statusColor = {
        active: 'success',
        maintenance: 'warning',
        scrap: 'destructive',
    } as const;

    return (
        <Card className="overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {equipment.name}
                            </h2>
                            <Badge variant={statusColor[equipment.status] || 'default'}>
                                {equipment.status.toUpperCase()}
                            </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1.5">
                                <Hash className="w-4 h-4" />
                                {equipment.serialNumber}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Tag className="w-4 h-4" />
                                {equipment.category}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Building className="w-4 h-4" />
                                {equipment.department}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onEdit} leftIcon={<Edit className="w-4 h-4" />}>
                            Edit
                        </Button>
                        <Button variant="destructive" onClick={onDelete} leftIcon={<Trash2 className="w-4 h-4" />}>
                            Delete
                        </Button>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Location & Model */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                        Specs & Location
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Location</p>
                                <p className="font-medium">{equipment.location}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600">
                                <Wrench className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Model</p>
                                <p className="font-medium">{equipment.model || '-'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assignment */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                        Assignment
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600">
                                <Users className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Maintenance Team</p>
                                <p className="font-medium">{teamName}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600">
                                <User className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Default Technician</p>
                                <p className="font-medium">{technicianName}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dates */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                        Timeline
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Purchased</p>
                                <p className="font-medium">{formatDate(equipment.purchaseDate)}</p>
                            </div>
                        </div>
                        {equipment.warrantyExpiration && (
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600">
                                    <Tag className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Warranty Ends</p>
                                    <p className="font-medium">{formatDate(equipment.warrantyExpiration)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Notes */}
            {equipment.notes && (
                <div className="px-6 pb-6 pt-0">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                        <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                            Notes
                        </h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            {equipment.notes}
                        </p>
                    </div>
                </div>
            )}
        </Card>
    );
}
