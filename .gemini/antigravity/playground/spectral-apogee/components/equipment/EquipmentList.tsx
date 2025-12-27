'use client';

import { EquipmentCard } from './EquipmentCard';
import { Equipment } from '@/lib/types';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { NoEquipment } from '@/components/ui/EmptyState';

interface EquipmentListProps {
    equipment: Equipment[];
    loading: boolean;
    view: 'grid' | 'list';
    onEdit: (id: string) => void;
    onView: (id: string) => void;
    onAdd?: () => void;
}

export function EquipmentList({
    equipment,
    loading,
    view,
    onEdit,
    onView,
    onAdd
}: EquipmentListProps) {
    if (loading) {
        return (
            <div className={`grid gap-6 ${view === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                }`}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <SkeletonCard key={i} className={view === 'list' ? 'h-24' : undefined} />
                ))}
            </div>
        );
    }

    if (equipment.length === 0) {
        return <NoEquipment onAdd={onAdd} />;
    }

    return (
        <div className={`grid gap-6 ${view === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}>
            {equipment.map((item) => (
                <EquipmentCard
                    key={item.id}
                    equipment={item}
                    onEdit={onEdit}
                    onView={onView}
                />
            ))}
        </div>
    );
}
