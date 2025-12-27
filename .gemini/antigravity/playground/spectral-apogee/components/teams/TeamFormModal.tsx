'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { teamSchema, TeamFormValues } from '@/lib/validations';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Save } from 'lucide-react';
import { Textarea } from '@/components/ui/Textarea';
import { useEffect } from 'react';

interface TeamFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TeamFormValues) => Promise<void>;
    isLoading?: boolean;
    initialData?: Partial<TeamFormValues>;
    isEditMode?: boolean;
}

export function TeamFormModal({
    isOpen,
    onClose,
    onSubmit,
    isLoading = false,
    initialData,
    isEditMode = false,
}: TeamFormModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TeamFormValues>({
        resolver: zodResolver(teamSchema),
        defaultValues: {
            name: '',
            description: '',
            members: [],
            ...initialData,
        },
    });

    useEffect(() => {
        if (isOpen) {
            reset({
                name: initialData?.name || '',
                description: initialData?.description || '',
                members: initialData?.members || [],
            });
        }
    }, [isOpen, initialData, reset]);

    const handleFormSubmit = async (data: TeamFormValues) => {
        await onSubmit(data);
        onClose();
        reset();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? 'Edit Team' : 'Create New Team'}
            size="md"
        >
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                <Input
                    label="Team Name"
                    placeholder="e.g. Maintenance Alpha"
                    error={errors.name?.message}
                    {...register('name')}
                />

                <Textarea
                    label="Description"
                    placeholder="Team responsibilities..."
                    error={errors.description?.message}
                    {...register('description')}
                />

                <ModalFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        leftIcon={<Save className="w-4 h-4" />}
                    >
                        {isEditMode ? 'Update Team' : 'Create Team'}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}
