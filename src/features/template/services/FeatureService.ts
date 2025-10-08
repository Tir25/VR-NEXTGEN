/**
 * Example feature service
 * Demonstrates the standard structure for feature services
 */

import { serviceContainer } from '@/architecture';
import { eventBus } from '@/architecture';

export class FeatureService {
  private data: string[] = [];

  constructor() {
    this.initialize();
  }

  private initialize() {
    // Service initialization logic
    eventBus.on('feature:data', this.handleData.bind(this));
  }

  private handleData(data: any) {
    this.data.push(data);
  }

  public getData(): string[] {
    return [...this.data];
  }

  public addData(item: string): void {
    this.data.push(item);
    eventBus.emit('feature:dataAdded', { item });
  }
}

// Register service with container
serviceContainer.singleton('featureService', () => new FeatureService());
