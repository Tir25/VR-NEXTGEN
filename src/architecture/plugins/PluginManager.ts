/**
 * Plugin Manager for extensible architecture
 * Allows dynamic feature registration and lifecycle management
 */

export interface Plugin {
  id: string;
  name: string;
  version: string;
  dependencies?: string[];
  init?: () => Promise<void> | void;
  destroy?: () => void;
  enabled?: boolean;
}

export interface PluginConfig {
  autoInit?: boolean;
  strictMode?: boolean;
  maxRetries?: number;
}

export class PluginManager {
  private plugins = new Map<string, Plugin>();
  private initializedPlugins = new Set<string>();
  private config: PluginConfig;

  constructor(config: PluginConfig = {}) {
    this.config = {
      autoInit: true,
      strictMode: false,
      maxRetries: 3,
      ...config,
    };
  }

  /**
   * Register a plugin
   */
  register(plugin: Plugin): boolean {
    if (this.plugins.has(plugin.id)) {
      // Plugin already registered
      return false;
    }

    // Validate dependencies
    if (plugin.dependencies) {
      const missingDeps = plugin.dependencies.filter(dep => !this.plugins.has(dep));
      if (missingDeps.length > 0) {
        // Plugin has missing dependencies
        return false;
      }
    }

    this.plugins.set(plugin.id, { ...plugin, enabled: true });

    if (this.config.autoInit) {
      this.initPlugin(plugin.id);
    }

    return true;
  }

  /**
   * Initialize a specific plugin
   */
  async initPlugin(pluginId: string): Promise<boolean> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      // Plugin not found
      return false;
    }

    if (this.initializedPlugins.has(pluginId)) {
      return true; // Already initialized
    }

    if (!plugin.enabled) {
      // Plugin is disabled
      return false;
    }

    try {
      // Initialize dependencies first
      if (plugin.dependencies) {
        for (const depId of plugin.dependencies) {
          const depInitialized = await this.initPlugin(depId);
          if (!depInitialized) {
            throw new Error(`Failed to initialize dependency: ${depId}`);
          }
        }
      }

      // Initialize the plugin
      if (plugin.init) {
        await plugin.init();
      }

      this.initializedPlugins.add(pluginId);
      return true;
    } catch (error) {
      // Failed to initialize plugin
      return false;
    }
  }

  /**
   * Unregister a plugin
   */
  unregister(pluginId: string): boolean {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      return false;
    }

    // Check if other plugins depend on this one
    const dependents = Array.from(this.plugins.values()).filter(p =>
      p.dependencies?.includes(pluginId)
    );

    if (dependents.length > 0) {
      // Cannot unregister plugin with dependents
      return false;
    }

    // Destroy the plugin
    if (plugin.destroy) {
      plugin.destroy();
    }

    this.plugins.delete(pluginId);
    this.initializedPlugins.delete(pluginId);
    return true;
  }

  /**
   * Enable/disable a plugin
   */
  setEnabled(pluginId: string, enabled: boolean): boolean {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      return false;
    }

    plugin.enabled = enabled;
    return true;
  }

  /**
   * Get plugin by ID
   */
  getPlugin(pluginId: string): Plugin | undefined {
    return this.plugins.get(pluginId);
  }

  /**
   * Get all plugins
   */
  getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  /**
   * Get initialized plugins
   */
  getInitializedPlugins(): string[] {
    return Array.from(this.initializedPlugins);
  }

  /**
   * Destroy all plugins
   */
  destroyAll(): void {
    const plugins = Array.from(this.plugins.values());
    for (const plugin of plugins) {
      if (plugin.destroy) {
        plugin.destroy();
      }
    }
    this.plugins.clear();
    this.initializedPlugins.clear();
  }
}

// Global plugin manager instance
export const pluginManager = new PluginManager();
