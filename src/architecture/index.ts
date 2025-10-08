/**
 * Architecture module exports
 * Provides scalable patterns for the application
 */

export { PluginManager, pluginManager, type Plugin, type PluginConfig } from './plugins/PluginManager';
export { ServiceContainer, serviceContainer, type ServiceFactory, type ServiceDefinition } from './services/ServiceContainer';
export { EventBus, ScopedEventBus, eventBus, type EventHandler, type EventSubscription } from './events/EventBus';
