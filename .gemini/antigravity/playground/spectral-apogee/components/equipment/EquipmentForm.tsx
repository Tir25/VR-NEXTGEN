'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { equipmentSchema, EquipmentFormValues } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Select, SelectOption } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { useTeams } from '@/hooks/useTeams';
import {
    EQUIPMENT_CATEGORIES,
    DEPARTMENT_OPTIONS,
    EQUIPMENT_STATUS_OPTIONS
} from '@/lib/constants';
import { useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

interface EquipmentFormProps {
    initialData?: Partial<EquipmentFormValues>;
    onSubmit: (data: EquipmentFormValues) => Promise<void>;
    isLoading?: boolean;
    isEditMode?: boolean;
}

// Convert readonly arrays to mutable SelectOption arrays
const categoryOptions: SelectOption[] = EQUIPMENT_CATEGORIES.map(c => ({ value: c, label: c }));
const departmentOptions: SelectOption[] = DEPARTMENT_OPTIONS.map(d => ({ value: d, label: d }));
const statusOptions: SelectOption[] = EQUIPMENT_STATUS_OPTIONS.map(s => ({ value: s.value, label: s.label }));

export function EquipmentForm({
    initialData,
    onSubmit,
    isLoading = false,
    isEditMode = false
}: EquipmentFormProps) {
    const { teams, loading: teamsLoading } = useTeams();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<EquipmentFormValues>({
        resolver: zodResolver(equipmentSchema),
        defaultValues: {
            status: 'active',
            ...initialData,
        },
    });

    // Watch team selection to filter technicians
    const selectedTeamId = watch('maintenanceTeamId');
    const selectedTeam = teams.find(t => t.id === selectedTeamId);

    // Reset technician when team changes
    useEffect(() => {
        if (selectedTeamId && initialData?.maintenanceTeamId !== selectedTeamId) {
            setValue('techId', '');
        }
    }, [selectedTeamId, setValue, initialData?.maintenanceTeamId]);

    const teamOptions: SelectOption[] = teams.map(t => ({ value: t.id, label: t.name }));
    const technicianOptions: SelectOption[] = selectedTeam?.members.map(m => ({
        value: m.userId,
        label: `${m.name} (${m.role})`
    })) || [];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Header / Actions */}
            <div className="flex items-center justify-between">
                <Link href="/equipment">
                    <Button type="button" variant="ghost" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                        Back to List
                    </Button>
                </Link>
                <Button type="submit" isLoading={isLoading} leftIcon={<Save className="w-4 h-4" />}>
                    {isEditMode ? 'Update Equipment' : 'Create Equipment'}
                </Button>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-4">
                    Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Equipment Name"
                        placeholder="e.g. CNC Machine #3"
                        error={errors.name?.message}
                        {...register('name')}
                    />

                    <Input
                        label="Serial Number"
                        placeholder="e.g. SN-12345678"
                        error={errors.serialNumber?.message}
                        {...register('serialNumber')}
                    />

                    <Select
                        label="Category"
                        placeholder="Select Category"
                        options={categoryOptions}
                        error={errors.category?.message}
                        {...register('category')}
                    />

                    <Select
                        label="Department"
                        placeholder="Select Department"
                        options={departmentOptions}
                        error={errors.department?.message}
                        {...register('department')}
                    />

                    <Input
                        label="Location"
                        placeholder="e.g. Building A, Floor 2"
                        error={errors.location?.message}
                        {...register('location')}
                    />

                    <Select
                        label="Status"
                        options={statusOptions}
                        error={errors.status?.message}
                        {...register('status')}
                    />
                </div>
            </div>

            {/* Assignment Section */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-4">
                    Maintenance Assignment
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                        label="Maintenance Team"
                        placeholder={teamsLoading ? "Loading teams..." : "Select Team"}
                        options={teamOptions}
                        error={errors.maintenanceTeamId?.message}
                        {...register('maintenanceTeamId')}
                        disabled={teamsLoading}
                    />

                    <Select
                        label="Default Technician"
                        placeholder="Select Technician (Optional)"
                        options={technicianOptions}
                        error={errors.techId?.message}
                        {...register('techId')}
                        disabled={!selectedTeamId}
                        helperText={!selectedTeamId ? "Select a team first" : undefined}
                    />
                </div>
            </div>

            {/* Dates & Notes Section */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-4">
                    Additional Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="date"
                        label="Purchase Date"
                        error={errors.purchaseDate?.message}
                        {...register('purchaseDate')}
                    />

                    <Input
                        type="date"
                        label="Warranty Expiration"
                        error={errors.warrantyExpiration?.message}
                        {...register('warrantyExpiration')}
                    />
                </div>

                <Textarea
                    label="Notes"
                    placeholder="Any additional information..."
                    error={errors.notes?.message}
                    {...register('notes')}
                    rows={4}
                />
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit" isLoading={isLoading} size="lg" leftIcon={<Save className="w-4 h-4" />}>
                    {isEditMode ? 'Update Equipment' : 'Create Equipment'}
                </Button>
            </div>
        </form>
    );
}
