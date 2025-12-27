'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEquipmentById, useEquipmentMutation } from '@/hooks/useEquipment';
import { useTeamById } from '@/hooks/useTeams';
import { EquipmentDetailCard } from '@/components/equipment/EquipmentDetailCard';
import { MaintenanceHistory } from '@/components/equipment/MaintenanceHistory';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useToast } from '@/components/ui';

export default function EquipmentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const { equipment, loading: equipLoading, error: equipError } = useEquipmentById(id);
    const { team, loading: teamLoading } = useTeamById(equipment?.maintenanceTeamId || null);
    const { deleteEquipment } = useEquipmentMutation();
    const { success, error: toastError } = useToast();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const technician = team?.members.find(m => m.userId === equipment?.techId);
    const technicianName = technician ? `${technician.name} (${technician.role})` : 'Unassigned';
    const teamName = team?.name || 'Unassigned';

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteEquipment(id);
            setIsDeleteDialogOpen(false);
            success('Equipment Deleted', 'The equipment has been successfully removed.');
            router.push('/equipment');
        } catch (err) {
            console.error(err);
            toastError('Failed to delete', 'Something went wrong. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    if (equipLoading) {
        return (
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
            </div>
        );
    }

    if (equipError || !equipment) {
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

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/equipment">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Equipment Details
                </h1>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="history">Maintenance History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <EquipmentDetailCard
                        equipment={equipment}
                        teamName={teamLoading ? 'Loading...' : teamName}
                        technicianName={teamLoading ? 'Loading...' : technicianName}
                        onEdit={() => router.push(`/equipment/${id}/edit`)}
                        onDelete={() => setIsDeleteDialogOpen(true)}
                    />
                </TabsContent>

                <TabsContent value="history">
                    <div className="flex justify-end mb-4">
                        <Link href={`/requests/new?equipmentId=${id}`}>
                            <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                                Create Request
                            </Button>
                        </Link>
                    </div>
                    <MaintenanceHistory equipmentId={id} />
                </TabsContent>
            </Tabs>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDelete}
                title="Delete Equipment"
                message={`Are you sure you want to delete "${equipment.name}"? This action cannot be undone.`}
                variant="danger"
                isLoading={isDeleting}
                confirmLabel="Delete"
            />
        </div>
    );
}
