/**
 * Example feature component
 * Demonstrates the standard structure for feature components
 */

import React from 'react';
import { serviceContainer } from '@/architecture';
import { eventBus } from '@/architecture';

interface FeatureComponentProps {
  title: string;
  onAction?: () => void;
}

export function FeatureComponent({ title, onAction }: FeatureComponentProps) {
  const handleClick = () => {
    // Emit feature-specific event
    eventBus.emit('feature:action', { title });

    // Call optional callback
    onAction?.();
  };

  return (
    <div className='feature-component'>
      <h3>{title}</h3>
      <button onClick={handleClick}>Feature Action</button>
    </div>
  );
}

export default FeatureComponent;
