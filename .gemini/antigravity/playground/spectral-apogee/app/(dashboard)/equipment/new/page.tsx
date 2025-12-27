'use client';

import { EquipmentForm } from '@/components/equipment/EquipmentForm';
import { useEquipmentMutation } from '@/hooks/useEquipment';
import { useRouter } from 'next/navigation';
import { EquipmentFormValues } from '@/lib/validations';
import { useToast } from '@/components/ui';
import { Timestamp } from 'firebase/firestore';

export default function NewEquipmentPage() {
    const router = useRouter();
    const { addEquipment, loading } = useEquipmentMutation();
    const { success, error } = useToast();

    const handleSubmit = async (data: EquipmentFormValues) => {
        try {
            // Convert string dates to Firestore Timestamps for service layer
            // data.purchaseDate is now a string "YYYY-MM-DD"
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
            await addEquipment(formData);
            success('Equipment Created', `${data.name} has been successfully added.`);
            router.push('/equipment');
        } catch (err) {
            console.error(err);
            error('Failed to create equipment', 'Please try again later.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Add Equipment
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Register a new equipment asset to the system.
                </p>
            </div>

            <EquipmentForm onSubmit={handleSubmit} isLoading={loading} />
        </div>
    );
}
