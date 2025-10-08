/**
 * Event Bus for decoupled communication between modules
 * Implements publish-subscribe pattern for better scalability
 */

export type EventHandler<T = any> = (data: T) => void | Promise<void>;
export type EventMap = Record<string, any>;

export interface EventSubscription {
  id: string;
  event: string;
  handler: EventHandler;
  once?: boolean;
  priority?: number;
}

export class EventBus {
  private subscriptions = new Map<string, EventSubscription[]>();
  private subscriptionCounter = 0;

  /**
   * Subscribe to an event
   */
  on<T = any>(
    event: string,
    handler: EventHandler<T>,
    options: { once?: boolean; priority?: number } = {}
  ): string {
    const subscriptionId = `sub_${++this.subscriptionCounter}`;
    const subscription: EventSubscription = {
      id: subscriptionId,
      event,
      handler,
      once: options.once || false,
      priority: options.priority || 0,
    };

    if (!this.subscriptions.has(event)) {
      this.subscriptions.set(event, []);
    }

    const eventSubscriptions = this.subscriptions.get(event)!;
    eventSubscriptions.push(subscription);

    // Sort by priority (higher priority first)
    eventSubscriptions.sort((a, b) => (b.priority || 0) - (a.priority || 0));

    return subscriptionId;
  }

  /**
   * Subscribe to an event once
   */
  once<T = any>(event: string, handler: EventHandler<T>): string {
    return this.on(event, handler, { once: true });
  }

  /**
   * Unsubscribe from an event
   */
  off(subscriptionId: string): boolean {
    for (const [event, subscriptions] of this.subscriptions) {
      const index = subscriptions.findIndex(sub => sub.id === subscriptionId);
      if (index !== -1) {
        subscriptions.splice(index, 1);
        if (subscriptions.length === 0) {
          this.subscriptions.delete(event);
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Unsubscribe all handlers for an event
   */
  offAll(event: string): void {
    this.subscriptions.delete(event);
  }

  /**
   * Emit an event
   */
  async emit<T = any>(event: string, data?: T): Promise<void> {
    const subscriptions = this.subscriptions.get(event);
    if (!subscriptions || subscriptions.length === 0) {
      return;
    }

    // Create a copy to avoid issues with modifications during iteration
    const subscriptionsCopy = [...subscriptions];

    for (const subscription of subscriptionsCopy) {
      try {
        await subscription.handler(data);
        
        // Remove subscription if it's a one-time subscription
        if (subscription.once) {
          this.off(subscription.id);
        }
      } catch (error) {
        // Error in event handler
      }
    }
  }

  /**
   * Emit an event synchronously
   */
  emitSync<T = any>(event: string, data?: T): void {
    const subscriptions = this.subscriptions.get(event);
    if (!subscriptions || subscriptions.length === 0) {
      return;
    }

    // Create a copy to avoid issues with modifications during iteration
    const subscriptionsCopy = [...subscriptions];

    for (const subscription of subscriptionsCopy) {
      try {
        subscription.handler(data);
        
        // Remove subscription if it's a one-time subscription
        if (subscription.once) {
          this.off(subscription.id);
        }
      } catch (error) {
        // Error in event handler
      }
    }
  }

  /**
   * Get all event names
   */
  getEvents(): string[] {
    return Array.from(this.subscriptions.keys());
  }

  /**
   * Get subscription count for an event
   */
  getSubscriptionCount(event: string): number {
    return this.subscriptions.get(event)?.length || 0;
  }

  /**
   * Clear all subscriptions
   */
  clear(): void {
    this.subscriptions.clear();
    this.subscriptionCounter = 0;
  }

  /**
   * Create a scoped event bus
   */
  createScope(prefix: string): ScopedEventBus {
    return new ScopedEventBus(this, prefix);
  }
}

/**
 * Scoped Event Bus for namespaced events
 */
export class ScopedEventBus {
  constructor(
    private parentBus: EventBus,
    private prefix: string
  ) {}

  private getScopedEvent(event: string): string {
    return `${this.prefix}:${event}`;
  }

  on<T = any>(
    event: string,
    handler: EventHandler<T>,
    options?: { once?: boolean; priority?: number }
  ): string {
    return this.parentBus.on(this.getScopedEvent(event), handler, options);
  }

  once<T = any>(event: string, handler: EventHandler<T>): string {
    return this.parentBus.once(this.getScopedEvent(event), handler);
  }

  off(subscriptionId: string): boolean {
    return this.parentBus.off(subscriptionId);
  }

  offAll(event: string): void {
    this.parentBus.offAll(this.getScopedEvent(event));
  }

  async emit<T = any>(event: string, data?: T): Promise<void> {
    return this.parentBus.emit(this.getScopedEvent(event), data);
  }

  emitSync<T = any>(event: string, data?: T): void {
    this.parentBus.emitSync(this.getScopedEvent(event), data);
  }
}

// Global event bus instance
export const eventBus = new EventBus();
