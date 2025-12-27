import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ViewToggleProps {
    view: 'grid' | 'list';
    onViewChange: (view: 'grid' | 'list') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
    return (
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewChange('grid')}
                className={`flex-1 ${view === 'grid'
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
            >
                <LayoutGrid className="w-4 h-4 mr-1.5" />
                Grid
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewChange('list')}
                className={`flex-1 ${view === 'list'
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
            >
                <List className="w-4 h-4 mr-1.5" />
                List
            </Button>
        </div>
    );
}
