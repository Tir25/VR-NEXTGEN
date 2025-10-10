/**
 * Service Container for dependency injection and service management
 * Implements a simple IoC container pattern for better testability and modularity
 */

export type ServiceFactory<T = any> = () => T;
export type ServiceInstance<T = any> = T;
export type ServiceDefinition<T = any> = {
  factory?: ServiceFactory<T>;
  instance?: ServiceInstance<T>;
  singleton?: boolean;
  dependencies?: string[];
};

export class ServiceContainer {
  private services = new Map<string, ServiceDefinition>();
  private instances = new Map<string, any>();
  private circularDependencyCheck = new Set<string>();

  /**
   * Register a service
   */
  register<T>(name: string, definition: ServiceDefinition<T>): this {
    if (this.services.has(name)) {
      // Service already registered
      return this;
    }

    // Validate dependencies
    if (definition.dependencies) {
      const missingDeps = definition.dependencies.filter(dep => !this.services.has(dep));
      if (missingDeps.length > 0) {
        // Service has missing dependencies
        return this;
      }
    }

    this.services.set(name, definition);
    return this;
  }

  /**
   * Register a singleton service
   */
  singleton<T>(name: string, factory: ServiceFactory<T>): this {
    return this.register(name, {
      factory,
      singleton: true,
    });
  }

  /**
   * Register a transient service (new instance each time)
   */
  transient<T>(name: string, factory: ServiceFactory<T>): this {
    return this.register(name, {
      factory,
      singleton: false,
    });
  }

  /**
   * Register an instance
   */
  instance<T>(name: string, instance: T): this {
    return this.register(name, {
      instance,
      singleton: true,
    });
  }

  /**
   * Get a service
   */
  get<T>(name: string): T {
    const definition = this.services.get(name);
    if (!definition) {
      throw new Error(`Service ${name} is not registered`);
    }

    // Return existing instance if singleton
    if (definition.singleton && this.instances.has(name)) {
      return this.instances.get(name);
    }

    // Check for circular dependencies
    if (this.circularDependencyCheck.has(name)) {
      const cycle = Array.from(this.circularDependencyCheck).join(' -> ');
      throw new Error(`Circular dependency detected: ${cycle} -> ${name}`);
    }

    this.circularDependencyCheck.add(name);

    try {
      let instance: T;

      if (definition.instance) {
        instance = definition.instance;
      } else if (definition.factory) {
        // Resolve dependencies
        const dependencies = definition.dependencies?.map(dep => this.get(dep)) || [];
        instance = definition.factory(...(dependencies as Parameters<typeof definition.factory>));
      } else {
        throw new Error(`Service ${name} has no factory or instance`);
      }

      // Store instance if singleton
      if (definition.singleton) {
        this.instances.set(name, instance);
      }

      return instance;
    } finally {
      this.circularDependencyCheck.delete(name);
    }
  }

  /**
   * Check if service is registered
   */
  has(name: string): boolean {
    return this.services.has(name);
  }

  /**
   * Get all registered service names
   */
  getServiceNames(): string[] {
    return Array.from(this.services.keys());
  }

  /**
   * Clear all services
   */
  clear(): void {
    this.services.clear();
    this.instances.clear();
    this.circularDependencyCheck.clear();
  }

  /**
   * Remove a service
   */
  remove(name: string): boolean {
    const removed = this.services.delete(name);
    this.instances.delete(name);
    return removed;
  }
}

// Global service container instance
export const serviceContainer = new ServiceContainer();
