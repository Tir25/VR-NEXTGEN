'use client';

/**
 * Teams Hooks
 * 
 * Custom hooks for team data with loading/error states.
 */

import { useState, useEffect, useCallback } from 'react';
import type { Team, TeamFormData, TeamMember } from '@/lib/types';
import * as teamService from '@/services/teamService';

// ============================================
// useTeams - Fetch all teams
// ============================================

interface UseTeamsOptions {
    realtime?: boolean;
}

interface UseTeamsReturn {
    teams: Team[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useTeams(options: UseTeamsOptions = {}): UseTeamsReturn {
    const { realtime = false } = options;
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await teamService.getTeams();
            setTeams(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (realtime) {
            const unsubscribe = teamService.subscribeToTeams((data) => {
                setTeams(data);
                setLoading(false);
            });
            return () => unsubscribe();
        } else {
            fetchData();
        }
    }, [realtime, fetchData]);

    return { teams, loading, error, refetch: fetchData };
}

// ============================================
// useTeamById - Fetch single team
// ============================================

interface UseTeamByIdReturn {
    team: Team | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useTeamById(id: string | null): UseTeamByIdReturn {
    const [team, setTeam] = useState<Team | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!id) {
            setTeam(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await teamService.getTeamById(id);
            setTeam(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { team, loading, error, refetch: fetchData };
}

// ============================================
// useTeamMutation - CRUD operations
// ============================================

interface UseTeamMutationReturn {
    addTeam: (data: TeamFormData) => Promise<string>;
    updateTeam: (id: string, data: Partial<TeamFormData>) => Promise<void>;
    deleteTeam: (id: string) => Promise<void>;
    addMember: (teamId: string, member: TeamMember) => Promise<void>;
    removeMember: (teamId: string, userId: string) => Promise<void>;
    loading: boolean;
    error: Error | null;
}

export function useTeamMutation(): UseTeamMutationReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const addTeam = useCallback(async (data: TeamFormData): Promise<string> => {
        try {
            setLoading(true);
            setError(null);
            return await teamService.addTeam(data);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateTeam = useCallback(async (id: string, data: Partial<TeamFormData>): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await teamService.updateTeam(id, data);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteTeam = useCallback(async (id: string): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await teamService.deleteTeam(id);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const addMember = useCallback(async (teamId: string, member: TeamMember): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await teamService.addTeamMember(teamId, member);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const removeMember = useCallback(async (teamId: string, userId: string): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await teamService.removeTeamMember(teamId, userId);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { addTeam, updateTeam, deleteTeam, addMember, removeMember, loading, error };
}

