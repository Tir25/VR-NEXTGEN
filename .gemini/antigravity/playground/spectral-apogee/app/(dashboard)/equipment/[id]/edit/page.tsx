'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEquipmentById, useEquipmentMutation } from '@/hooks/useEquipment';
import { EquipmentForm } from '@/components/equipment/EquipmentForm';
import { EquipmentFormValues } from '@/lib/validations';
import { useToast } from '@/components/ui';
import { Spinner } from '@/components/ui/Spinner';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Timestamp } from 'firebase/firestore';

export default function EditEquipmentPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const { equipment, loading: fetchLoading, error: fetchError } = useEquipmentById(id);
    const { updateEquipment, loading: updateLoading } = useEquipmentMutation();
    const { success, error: toastError } = useToast();

    const handleSubmit = async (data: EquipmentFormValues) => {
        try {
            // Convert string dates to Firestore Timestamps
            const formData = {
                name: data.name,
                serialNumber: data.serialNumber,
                category: data.category,
                department: data.department,
                location: data.location,
                status: data.status,
                purchaseDate: Timestamp.fromDate(new Date(data.purchaseDate)),
                warrantyExpiration: data.warrantyExpiration
                    ? Timestamp.fromDate(new Date(data.warrantyExpiration))
                    : undefined,
                maintenanceTeamId: data.maintenanceTeamId || '',
                techId: data.techId,
                employeeId: data.employeeId,
                notes: data.notes,
            };
            await updateEquipment(id, formData);
            success('Equipment Updated', 'Changes have been saved successfully.');
            router.push(`/equipment/${id}`);
        } catch (err) {
            console.error(err);
            toastError('Update Failed', 'Failed to update equipment information.');
        }
    };

    if (fetchLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
            </div>
        );
    }

    if (fetchError || !equipment) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Equipment Not Found
                </h2>
                <Link href="/equipment">
                    <Button variant="ghost" className="mt-4" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                        Back to List
                    </Button>
                </Link>
            </div>
        );
    }

    // Helper to dry up date formatting
    const formatDate = (date: Timestamp | undefined) => {
        if (!date) return undefined;
        return date.toDate().toISOString().split('T')[0];
    };

    // Pre-fill form with equipment data, formatting dates as YYYY-MM-DD
    const initialData: Partial<EquipmentFormValues> = {
        name: equipment.name,
        serialNumber: equipment.serialNumber,
        category: equipment.category,
        department: equipment.department,
        location: equipment.location,
        purchaseDate: formatDate(equipment.purchaseDate),
        warrantyExpiration: formatDate(equipment.warrantyExpiration),
        maintenanceTeamId: equipment.maintenanceTeamId,
        techId: equipment.techId,
        status: equipment.status,
        notes: equipment.notes,
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Edit Equipment
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Update information for {equipment.name}.
                </p>
            </div>

            <EquipmentForm
                initialData={initialData}
                onSubmit={handleSubmit}
                isLoading={updateLoading}
                isEditMode={true}
            />
        </div>
    );
}
