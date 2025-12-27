'use client';

import {
    EquipmentList,
    EquipmentFilters,
    ViewToggle
} from '@/components/equipment';
import { useEquipment } from '@/hooks/useEquipment';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EquipmentPage() {
    const router = useRouter();
    const { equipment, loading, error, refetch } = useEquipment();

    // Filter State
    const [search, setSearch] = useState('');
    const [department, setDepartment] = useState('all');
    const [status, setStatus] = useState('all');
    const [category, setCategory] = useState('all');

    // View State
    const [view, setView] = useState<'grid' | 'list'>('grid');

    // Filter Logic
    const filteredEquipment = equipment.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.serialNumber.toLowerCase().includes(search.toLowerCase());

        const matchesDepartment = department === 'all' || item.department === department;
        const matchesStatus = status === 'all' || item.status === status;
        const matchesCategory = category === 'all' || item.category === category;

        return matchesSearch && matchesDepartment && matchesStatus && matchesCategory;
    });

    const handleClearFilters = () => {
        setSearch('');
        setDepartment('all');
        setStatus('all');
        setCategory('all');
    };

    if (error) {
        return (
            <div className="p-8 text-center text-red-500">
                <p>Failed to load equipment.</p>
                <Button variant="outline" onClick={() => refetch()} className="mt-4">
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        Equipment
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Manage and track all equipment assets across the organization.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <ViewToggle view={view} onViewChange={setView} />
                    <Link href="/equipment/new">
                        <Button leftIcon={<Plus className="w-4 h-4" />}>
                            Add Equipment
                        </Button>
                    </Link>
                </div>
            </div>

            <EquipmentFilters
                search={search}
                onSearchChange={setSearch}
                department={department}
                onDepartmentChange={setDepartment}
                status={status}
                onStatusChange={setStatus}
                category={category}
                onCategoryChange={setCategory}
                onClearFilters={handleClearFilters}
            />

            <EquipmentList
                equipment={filteredEquipment}
                loading={loading}
                view={view}
                onEdit={(id) => router.push(`/equipment/${id}/edit`)}
                onView={(id) => router.push(`/equipment/${id}`)}
                onAdd={() => router.push('/equipment/new')}
            />
        </div>
    );
}
