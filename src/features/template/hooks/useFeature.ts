/**
 * Example feature hook
 * Demonstrates the standard structure for feature hooks
 */

import { useState, useEffect } from 'react';
import { eventBus } from '@/architecture';

export function useFeature() {
  const [state, setState] = useState<string>('initial');

  useEffect(() => {
    // Subscribe to feature events
    const subscription = eventBus.on('feature:action', (data) => {
      setState(`action: ${data.title}`);
    });

    return () => {
      eventBus.off(subscription);
    };
  }, []);

  return {
    state,
    setState,
  };
}

export default useFeature;
