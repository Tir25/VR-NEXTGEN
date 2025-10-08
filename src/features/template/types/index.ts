/**
 * Feature type definitions
 */

export interface FeatureData {
  id: string;
  title: string;
  description: string;
}

export interface FeatureConfig {
  enabled: boolean;
  options: Record<string, any>;
}

export type FeatureEvent = 'feature:action' | 'feature:data' | 'feature:dataAdded';
