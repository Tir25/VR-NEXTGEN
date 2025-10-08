/**
 * Main feature class
 * Demonstrates the standard structure for features
 */

import { pluginManager } from '@/architecture';
import { serviceContainer } from '@/architecture';
import { eventBus } from '@/architecture';
import { FeatureService } from './services';

export class Feature {
  private initialized = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (this.initialized) return;

    // Register services
    serviceContainer.singleton('featureService', () => new FeatureService());

    // Register plugin
    pluginManager.register({
      id: 'feature',
      name: 'Example Feature',
      version: '1.0.0',
      init: () => {
        // Feature plugin initialized
      },
      destroy: () => {
        // Feature plugin destroyed
      },
    });

    this.initialized = true;
  }

  public destroy() {
    pluginManager.unregister('feature');
    serviceContainer.remove('featureService');
    this.initialized = false;
  }
}
