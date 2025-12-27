/**
 * Hooks Exports
 * 
 * Central export for all custom hooks.
 */

export { useAuth } from './useAuth';
export { useEquipment, useEquipmentById, useEquipmentByStatus, useEquipmentMutation } from './useEquipment';
export { useTeams, useTeamById, useTeamMutation } from './useTeams';
export { useRequests, useRequestById, useRequestsByEquipment, useRequestsByStatus, useRequestMutation } from './useRequests';
export { useCategories, useCategoryMutation } from './useCategories';
export { useWorkCenters, useWorkCenterMutation } from './useWorkCenters';
export { useDashboardStats } from './useDashboardStats';

