# Feature Template

This template provides a standardized structure for adding new features to the application.

## Structure

```
src/features/[feature-name]/
├── components/           # Feature-specific components
│   ├── [Component].tsx
│   └── index.ts
├── hooks/               # Feature-specific hooks
│   ├── use[Feature].ts
│   └── index.ts
├── services/            # Feature-specific services
│   ├── [Service].ts
│   └── index.ts
├── types/               # Feature-specific types
│   └── index.ts
├── utils/               # Feature-specific utilities
│   └── index.ts
├── constants/           # Feature-specific constants
│   └── index.ts
├── [Feature].ts         # Main feature file
└── index.ts            # Feature exports
```

## Guidelines

1. **Isolation**: Each feature should be self-contained
2. **Dependencies**: Use the service container for dependency injection
3. **Events**: Use the event bus for inter-feature communication
4. **Types**: Define feature-specific types in the types folder
5. **Exports**: Always export through index.ts files
6. **Testing**: Include tests alongside the feature code

## Example Implementation

```typescript
// src/features/[feature-name]/index.ts
export { default as FeatureName } from './FeatureName';
export * from './components';
export * from './hooks';
export * from './services';
export * from './types';

// src/features/[feature-name]/[Feature].ts
import { serviceContainer } from '@/architecture';
import { eventBus } from '@/architecture';

export class FeatureName {
  constructor() {
    this.initialize();
  }

  private initialize() {
    // Register services
    serviceContainer.singleton('featureNameService', () => new FeatureNameService());
    
    // Subscribe to events
    eventBus.on('app:initialized', this.handleAppInitialized.bind(this));
  }

  private handleAppInitialized() {
    // Feature initialization logic
  }
}
```
