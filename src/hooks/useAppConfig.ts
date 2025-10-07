import { appConfig } from '@/config/app-config';

/**
 * useAppConfig
 * Lightweight hook to access centralized, tree-shakeable app configuration.
 * Returns a frozen object to discourage runtime mutation.
 */
export function useAppConfig() {
  return appConfig;
}

export type UseAppConfigReturn = typeof appConfig;


