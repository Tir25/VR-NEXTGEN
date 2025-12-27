'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';
import { Bell, Trash, Save, Search, User } from 'lucide-react';

export default function DesignSystemPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { toast } = useToast();
    const [selectValue, setSelectValue] = useState('');

    return (
        <div className="p-10 space-y-12 bg-gray-50 dark:bg-gray-950 min-h-screen">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Design System Audit</h1>
                <p className="text-gray-500">Testing Phase 1 UI Component Foundation</p>
            </div>

            {/* BUTTONS */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Buttons</h2>
                <Card className="p-6 space-y-6">
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button>Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                        <Button size="icon"><User className="w-4 h-4" /></Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button isLoading>Loading</Button>
                        <Button leftIcon={<Save className="w-4 h-4" />}>Save</Button>
                        <Button rightIcon={<Trash className="w-4 h-4" />} variant="destructive">Delete</Button>
                    </div>
                </Card>
            </section>

            {/* BADGES */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Badges</h2>
                <Card className="p-6 flex flex-wrap gap-4">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                </Card>
            </section>

            {/* INPUTS */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Inputs & Textareas</h2>
                <Card className="p-6 grid gap-6 max-w-2xl">
                    <Input placeholder="Default Input" />
                    <Input placeholder="With Icon" leftIcon={<Search className="w-4 h-4" />} />
                    <Input placeholder="Error State" error="This field is required" />
                    <Input placeholder="Disabled" disabled />
                    <Textarea placeholder="Textarea" />
                </Card>
            </section>

            {/* SELECT */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Select</h2>
                <Card className="p-6 max-w-md">
                    <Select
                        label="Choose an option"
                        options={[
                            { value: 'opt1', label: 'Option 1' },
                            { value: 'opt2', label: 'Option 2' },
                            { value: 'opt3', label: 'Option 3' },
                        ]}
                        value={selectValue}
                        onChange={(e) => setSelectValue(e.target.value)}
                    />
                </Card>
            </section>

            {/* SPINNERS & SKELETONS */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Loading States</h2>
                <Card className="p-6 space-y-6">
                    <div className="flex gap-4">
                        <Spinner size="sm" />
                        <Spinner size="md" />
                        <Spinner size="lg" />
                    </div>
                    <div className="space-y-2 max-w-sm">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                </Card>
            </section>

            {/* MODALS & NOTIFICATIONS */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Feedback & Overlays</h2>
                <Card className="p-6 flex gap-4">
                    <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                    <Button onClick={() => toast({ title: 'Success', description: 'Action completed!', variant: 'success' })}>
                        Show Success Toast
                    </Button>
                    <Button variant="destructive" onClick={() => toast({ title: 'Error', description: 'Something went wrong', variant: 'error' })}>
                        Show Error Toast
                    </Button>
                </Card>
            </section>

            {/* TABS */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Tabs</h2>
                <Card className="p-6">
                    <Tabs defaultValue="tab1">
                        <TabsList>
                            <TabsTrigger value="tab1">Account</TabsTrigger>
                            <TabsTrigger value="tab2">Password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tab1" className="p-4">
                            Account settings content here.
                        </TabsContent>
                        <TabsContent value="tab2" className="p-4">
                            Change password here.
                        </TabsContent>
                    </Tabs>
                </Card>
            </section>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Test Modal"
            >
                <div className="space-y-4">
                    <p>This is a test modal dialog to verify component functionality.</p>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
