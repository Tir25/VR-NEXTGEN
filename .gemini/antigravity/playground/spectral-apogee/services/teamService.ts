/**
 * Team Service
 * 
 * Firestore operations for teams collection.
 */

import {
    fetchCollection,
    fetchDocument,
    createDocument,
    updateDocument,
    deleteDocument,
    subscribeToCollection,
    subscribeToDocument,
    type QueryOptions,
} from '@/lib/firestore-utils';
import { COLLECTIONS } from '@/lib/constants';
import type { Team, TeamFormData, TeamMember } from '@/lib/types';
import type { Unsubscribe } from 'firebase/firestore';

// ============================================
// FETCH OPERATIONS
// ============================================

/**
 * Get all teams
 */
export async function getTeams(options?: QueryOptions): Promise<Team[]> {
    return fetchCollection<Team>(COLLECTIONS.TEAMS, {
        orderByField: 'name',
        orderDirection: 'asc',
        ...options,
    });
}

/**
 * Get team by ID
 */
export async function getTeamById(id: string): Promise<Team | null> {
    return fetchDocument<Team>(COLLECTIONS.TEAMS, id);
}

// ============================================
// WRITE OPERATIONS
// ============================================

/**
 * Create new team
 */
export async function addTeam(data: TeamFormData): Promise<string> {
    return createDocument(COLLECTIONS.TEAMS, data);
}

/**
 * Update team
 */
export async function updateTeam(id: string, data: Partial<TeamFormData>): Promise<void> {
    return updateDocument(COLLECTIONS.TEAMS, id, data);
}

/**
 * Delete team
 */
export async function deleteTeam(id: string): Promise<void> {
    return deleteDocument(COLLECTIONS.TEAMS, id);
}

// ============================================
// MEMBER MANAGEMENT
// ============================================

/**
 * Add member to team
 */
export async function addTeamMember(teamId: string, member: TeamMember): Promise<void> {
    const team = await getTeamById(teamId);
    if (!team) throw new Error('Team not found');
    
    const members = [...team.members, member];
    return updateDocument(COLLECTIONS.TEAMS, teamId, { members });
}

/**
 * Remove member from team
 */
export async function removeTeamMember(teamId: string, userId: string): Promise<void> {
    const team = await getTeamById(teamId);
    if (!team) throw new Error('Team not found');
    
    const members = team.members.filter((m) => m.userId !== userId);
    return updateDocument(COLLECTIONS.TEAMS, teamId, { members });
}

/**
 * Update team member
 */
export async function updateTeamMember(teamId: string, userId: string, data: Partial<TeamMember>): Promise<void> {
    const team = await getTeamById(teamId);
    if (!team) throw new Error('Team not found');
    
    const members = team.members.map((m) =>
        m.userId === userId ? { ...m, ...data } : m
    );
    return updateDocument(COLLECTIONS.TEAMS, teamId, { members });
}

// ============================================
// REAL-TIME SUBSCRIPTIONS
// ============================================

/**
 * Subscribe to all teams changes
 */
export function subscribeToTeams(
    callback: (teams: Team[]) => void,
    options?: QueryOptions
): Unsubscribe {
    return subscribeToCollection<Team>(COLLECTIONS.TEAMS, callback, {
        orderByField: 'name',
        orderDirection: 'asc',
        ...options,
    });
}

/**
 * Subscribe to single team changes
 */
export function subscribeToTeamById(
    id: string,
    callback: (team: Team | null) => void
): Unsubscribe {
    return subscribeToDocument<Team>(COLLECTIONS.TEAMS, id, callback);
}

