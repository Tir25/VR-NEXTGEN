'use client';

import { Team } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TeamListProps {
    teams: Team[];
    onEdit?: (team: Team) => void;
    onManage?: (team: Team) => void;
}

export function TeamList({ teams, onEdit, onManage }: TeamListProps) {
    if (teams.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No teams yet</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mt-2">
                    Create a maintenance team to start assigning equipment and requests.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
                <Card key={team.id} className="hover:shadow-md transition-shadow">
                    <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {team.name}
                                </h3>
                                {team.description && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                        {team.description}
                                    </p>
                                )}
                            </div>
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {team.members.length}
                            </Badge>
                        </div>

                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-2">
                            {onManage && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onManage(team)}
                                >
                                    Manage Members
                                </Button>
                            )}
                            {onEdit && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(team)}
                                >
                                    Edit
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
