'use client';

import { useState } from 'react';
import { useTeams, useTeamMutation } from '@/hooks/useTeams';
import { TeamList, TeamFormModal } from '@/components/teams';
import { TeamFormValues } from '@/lib/validations';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui';
import { Spinner } from '@/components/ui/Spinner';
import { Team } from '@/lib/types';

export default function TeamsPage() {
    const { teams, loading, refetch } = useTeams({ realtime: true });
    const { addTeam, updateTeam } = useTeamMutation();
    const { success, error: toastError } = useToast();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeam, setEditingTeam] = useState<Team | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreate = () => {
        setEditingTeam(null);
        setIsModalOpen(true);
    };

    const handleEdit = (team: Team) => {
        setEditingTeam(team);
        setIsModalOpen(true);
    };

    const handleSubmit = async (data: TeamFormValues) => {
        try {
            setIsSubmitting(true);
            if (editingTeam) {
                await updateTeam(editingTeam.id, data);
                success('Team Updated', `${data.name} has been updated.`);
            } else {
                await addTeam(data);
                success('Team Created', `${data.name} has been created.`);
            }
            await refetch();
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            toastError(
                editingTeam ? 'Update Failed' : 'Creation Failed',
                'Something went wrong. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        Teams
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage maintenance teams and their members.
                    </p>
                </div>
                <Button onClick={handleCreate} leftIcon={<Plus className="w-4 h-4" />}>
                    Create Team
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Spinner size="lg" />
                </div>
            ) : (
                <TeamList
                    teams={teams}
                    onEdit={handleEdit}
                    onManage={(team) => console.log('Manage members for:', team.name)}
                />
            )}

            <TeamFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                isLoading={isSubmitting}
                isEditMode={!!editingTeam}
                initialData={editingTeam ? {
                    name: editingTeam.name,
                    description: editingTeam.description
                } : undefined}
            />
        </div>
    );
}
