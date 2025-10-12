/**
 * SimpleCarouselConfig Component
 * A simplified configuration component that provides essential
 * carousel settings without overwhelming complexity.
 */

import React, { useState, useCallback } from 'react';
import type { CarouselConfig } from '@/types/carousel';

interface SimpleCarouselConfigProps {
  config: CarouselConfig;
  onConfigChange: (config: CarouselConfig) => void;
  className?: string;
}

interface ConfigPreset {
  name: string;
  description: string;
  config: Partial<CarouselConfig>;
}

const CONFIG_PRESETS: ConfigPreset[] = [
  {
    name: 'Default',
    description: 'Standard carousel with basic navigation',
    config: {
      autoRotate: false,
      enableKeyboard: true,
      enableTouch: true,
      enableMouse: true,
      animationDuration: 300,
      swipeThreshold: 50,
    },
  },
  {
    name: 'Auto-rotate',
    description: 'Carousel with automatic rotation',
    config: {
      autoRotate: true,
      autoRotateInterval: 5000,
      pauseOnHover: true,
      pauseOnFocus: true,
      enableKeyboard: true,
      enableTouch: true,
      enableMouse: true,
      animationDuration: 400,
      swipeThreshold: 50,
    },
  },
  {
    name: 'Mobile-optimized',
    description: 'Optimized for mobile devices',
    config: {
      autoRotate: false,
      enableKeyboard: false,
      enableTouch: true,
      enableMouse: false,
      animationDuration: 200,
      swipeThreshold: 30,
      spacing: 16,
    },
  },
  {
    name: 'Accessibility-focused',
    description: 'Enhanced accessibility features',
    config: {
      autoRotate: false,
      enableKeyboard: true,
      enableTouch: true,
      enableMouse: true,
      announceChanges: true,
      ariaLive: 'polite',
      animationDuration: 300,
      swipeThreshold: 50,
    },
  },
];

const SimpleCarouselConfig: React.FC<SimpleCarouselConfigProps> = ({
  config,
  onConfigChange,
  className = '',
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('Default');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handlePresetChange = useCallback((presetName: string) => {
    const preset = CONFIG_PRESETS.find(p => p.name === presetName);
    if (preset) {
      setSelectedPreset(presetName);
      onConfigChange({ ...config, ...preset.config });
    }
  }, [config, onConfigChange]);

  const handleConfigChange = useCallback((key: keyof CarouselConfig, value: unknown) => {
    onConfigChange({ ...config, [key]: value as CarouselConfig[keyof CarouselConfig] });
  }, [config, onConfigChange]);

  const resetToDefault = useCallback(() => {
    const defaultPreset = CONFIG_PRESETS[0];
    setSelectedPreset(defaultPreset.name);
    onConfigChange({ ...config, ...defaultPreset.config });
  }, [config, onConfigChange]);

  return (
    <div className={`simple-carousel-config ${className}`}>
      <div className="config-header">
        <h3 className="config-title">Carousel Configuration</h3>
        <p className="config-description">
          Choose a preset or customize individual settings
        </p>
      </div>

      {/* Preset Selection */}
      <div className="config-section">
        <label className="config-label">Preset</label>
        <div className="preset-buttons">
          {CONFIG_PRESETS.map((preset) => (
            <button
              key={preset.name}
              className={`preset-button ${selectedPreset === preset.name ? 'active' : ''}`}
              onClick={() => handlePresetChange(preset.name)}
              title={preset.description}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Basic Settings */}
      <div className="config-section">
        <h4 className="config-subtitle">Basic Settings</h4>
        
        <div className="config-row">
          <label className="config-checkbox-label">
            <input
              type="checkbox"
              checked={config.autoRotate || false}
              onChange={(e) => handleConfigChange('autoRotate', e.target.checked)}
            />
            Auto-rotate
          </label>
        </div>

        {config.autoRotate && (
          <div className="config-row">
            <label className="config-label">
              Rotation Interval (ms)
            </label>
            <input
              type="number"
              min="1000"
              max="10000"
              step="500"
              value={config.autoRotateInterval || 5000}
              onChange={(e) => handleConfigChange('autoRotateInterval', parseInt(e.target.value))}
              className="config-input"
            />
          </div>
        )}

        <div className="config-row">
          <label className="config-label">
            Animation Duration (ms)
          </label>
          <input
            type="number"
            min="100"
            max="1000"
            step="50"
            value={config.animationDuration || 300}
            onChange={(e) => handleConfigChange('animationDuration', parseInt(e.target.value))}
            className="config-input"
          />
        </div>

        <div className="config-row">
          <label className="config-label">
            Swipe Threshold (px)
          </label>
          <input
            type="number"
            min="10"
            max="100"
            step="5"
            value={config.swipeThreshold || 50}
            onChange={(e) => handleConfigChange('swipeThreshold', parseInt(e.target.value))}
            className="config-input"
          />
        </div>
      </div>

      {/* Advanced Settings Toggle */}
      <div className="config-section">
        <button
          className="advanced-toggle"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
        </button>
      </div>

      {/* Advanced Settings */}
      {showAdvanced && (
        <div className="config-section advanced-settings">
          <h4 className="config-subtitle">Advanced Settings</h4>
          
          <div className="config-row">
            <label className="config-checkbox-label">
              <input
                type="checkbox"
                checked={config.enableKeyboard !== false}
                onChange={(e) => handleConfigChange('enableKeyboard', e.target.checked)}
              />
              Enable Keyboard Navigation
            </label>
          </div>

          <div className="config-row">
            <label className="config-checkbox-label">
              <input
                type="checkbox"
                checked={config.enableTouch !== false}
                onChange={(e) => handleConfigChange('enableTouch', e.target.checked)}
              />
              Enable Touch Navigation
            </label>
          </div>

          <div className="config-row">
            <label className="config-checkbox-label">
              <input
                type="checkbox"
                checked={config.enableMouse !== false}
                onChange={(e) => handleConfigChange('enableMouse', e.target.checked)}
              />
              Enable Mouse Navigation
            </label>
          </div>

          <div className="config-row">
            <label className="config-checkbox-label">
              <input
                type="checkbox"
                checked={config.announceChanges !== false}
                onChange={(e) => handleConfigChange('announceChanges', e.target.checked)}
              />
              Announce Changes to Screen Readers
            </label>
          </div>

          <div className="config-row">
            <label className="config-label">
              Aria Live Region
            </label>
            <select
              value={config.ariaLive || 'polite'}
              onChange={(e) => handleConfigChange('ariaLive', e.target.value as 'off' | 'polite' | 'assertive')}
              className="config-select"
            >
              <option value="off">Off</option>
              <option value="polite">Polite</option>
              <option value="assertive">Assertive</option>
            </select>
          </div>
        </div>
      )}

      {/* Reset Button */}
      <div className="config-section">
        <button
          className="reset-button"
          onClick={resetToDefault}
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
};

export default SimpleCarouselConfig;
