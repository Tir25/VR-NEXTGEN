import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Search, X, Filter } from 'lucide-react';
import {
    DEPARTMENT_OPTIONS,
    EQUIPMENT_STATUS_OPTIONS,
    EQUIPMENT_CATEGORIES
} from '@/lib/constants';

interface EquipmentFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    department: string;
    onDepartmentChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
    category: string;
    onCategoryChange: (value: string) => void;
    onClearFilters: () => void;
}

export function EquipmentFilters({
    search,
    onSearchChange,
    department,
    onDepartmentChange,
    status,
    onStatusChange,
    category,
    onCategoryChange,
    onClearFilters,
}: EquipmentFiltersProps) {
    const hasActiveFilters = department !== 'all' || status !== 'all' || category !== 'all' || search !== '';

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                    <Input
                        placeholder="Search by name or serial..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        leftIcon={<Search className="w-4 h-4" />}
                        className="bg-gray-50 dark:bg-gray-800"
                    />
                </div>

                {/* Filters Group */}
                <div className="flex flex-col sm:flex-row gap-2">
                    {/* Status Toggle */}
                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                        <button
                            onClick={() => onStatusChange('all')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${status === 'all'
                                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                                }`}
                        >
                            All
                        </button>
                        {EQUIPMENT_STATUS_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => onStatusChange(opt.value)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${status === opt.value
                                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    {/* Department Select */}
                    <div className="w-full sm:w-40">
                        <Select
                            options={[
                                { value: 'all', label: 'All Depts' },
                                ...DEPARTMENT_OPTIONS.map(d => ({ value: d, label: d }))
                            ]}
                            value={department}
                            onChange={(e) => onDepartmentChange(e.target.value)}
                            className="h-10"
                        />
                    </div>

                    {/* Category Select */}
                    <div className="w-full sm:w-40">
                        <Select
                            options={[
                                { value: 'all', label: 'All Categories' },
                                ...EQUIPMENT_CATEGORIES.map(c => ({ value: c, label: c }))
                            ]}
                            value={category}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            className="h-10"
                        />
                    </div>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClearFilters}
                            title="Clear filters"
                            className="text-gray-500 hover:text-red-500"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
