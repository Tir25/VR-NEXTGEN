# GearGuard Coding Standards

> **Version:** 1.0.0  
> **Last Updated:** December 27, 2024

---

## Core Principles

| Principle | Description |
|-----------|-------------|
| **Modularity** | Code organized into independent, interchangeable modules |
| **Reusability** | Components designed for use across multiple contexts |
| **Single Responsibility** | Each file/function does one thing well |
| **Error Isolation** | Failures contained, don't cascade through system |
| **Clean Code** | Readable, maintainable, professional-grade |

---

## File Organization Standards

### Maximum File Size

| Metric | Limit |
|--------|-------|
| **Lines of Code** | ≤ 200 lines per file |
| **Functions per File** | ≤ 5 exported functions |
| **Complexity** | Single responsibility only |

### When to Split Files

```
❌ BAD: Large file with multiple responsibilities
├── UserDashboard.tsx (600 lines)
│   ├── User profile display
│   ├── Settings form
│   ├── Notifications panel
│   └── Activity feed

✅ GOOD: Small files with single responsibility
├── components/
│   ├── UserProfile.tsx (80 lines)
│   ├── SettingsForm.tsx (120 lines)
│   ├── NotificationsPanel.tsx (90 lines)
│   └── ActivityFeed.tsx (100 lines)
└── pages/
    └── UserDashboard.tsx (50 lines - composition only)
```

---

## Code Splitting Rules

### Rule 1: One Component Per File

```typescript
// ❌ BAD: Multiple components in one file
// components/Cards.tsx
export function EquipmentCard() { ... }
export function RequestCard() { ... }
export function TeamCard() { ... }

// ✅ GOOD: One component per file
// components/equipment/EquipmentCard.tsx
export function EquipmentCard() { ... }

// components/requests/RequestCard.tsx
export function RequestCard() { ... }

// components/teams/TeamCard.tsx
export function TeamCard() { ... }
```

### Rule 2: Extract Shared Logic

```typescript
// ❌ BAD: Duplicate logic in multiple components
// EquipmentList.tsx
const formatDate = (date: Date) => date.toLocaleDateString();

// RequestList.tsx
const formatDate = (date: Date) => date.toLocaleDateString();

// ✅ GOOD: Shared utility
// lib/utils.ts
export const formatDate = (date: Date) => date.toLocaleDateString();

// EquipmentList.tsx
import { formatDate } from '@/lib/utils';
```

### Rule 3: Separate Concerns

```
Component Structure:
├── components/        # UI components only
├── hooks/             # Custom React hooks
├── services/          # API/Firestore operations
├── lib/               # Utilities and helpers
└── types/             # TypeScript interfaces
```

---

## No Duplicate Implementation

### Prohibited Patterns

```typescript
// ❌ NEVER: Same logic in multiple places
// equipment-service.ts
async function fetchEquipment() {
  const snapshot = await getDocs(collection(db, 'equipment'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// team-service.ts
async function fetchTeams() {
  const snapshot = await getDocs(collection(db, 'teams'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // DUPLICATE!
}

// ✅ CORRECT: Generic reusable function
// lib/firestore-utils.ts
export async function fetchCollection<T>(collectionName: string): Promise<T[]> {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
}

// equipment-service.ts
import { fetchCollection } from '@/lib/firestore-utils';
export const fetchEquipment = () => fetchCollection<Equipment>('equipment');
```

---

## Error Isolation

### Pattern: Error Boundaries

```typescript
// components/ErrorBoundary.tsx
export class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

// Usage: Wrap each major section
<ErrorBoundary>
  <EquipmentModule />
</ErrorBoundary>
<ErrorBoundary>
  <RequestsModule />  {/* Error here won't break Equipment */}
</ErrorBoundary>
```

### Pattern: Safe Data Fetching

```typescript
// ❌ BAD: Unhandled errors crash the app
const data = await fetchEquipment(); // Throws on failure

// ✅ GOOD: Graceful error handling
const { data, error, isLoading } = useEquipment();

if (error) return <ErrorMessage error={error} />;
if (isLoading) return <Skeleton />;
return <EquipmentList data={data} />;
```

---

## Best Practices

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `EquipmentCard.tsx` |
| Hooks | camelCase, use prefix | `useEquipment.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | SCREAMING_SNAKE | `MAX_FILE_SIZE` |
| Types/Interfaces | PascalCase | `Equipment`, `Request` |

### Component Structure

```typescript
// Standard component template
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { ComponentProps } from './types';

interface Props extends ComponentProps {
  title: string;
  onAction?: () => void;
}

export function ComponentName({ title, onAction, className }: Props) {
  // 1. Hooks first
  const [state, setState] = useState(initialState);
  
  // 2. Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // 3. Event handlers
  const handleClick = () => {
    onAction?.();
  };
  
  // 4. Render
  return (
    <div className={cn('base-styles', className)}>
      {title}
    </div>
  );
}
```

### Import Order

```typescript
// 1. React/Next.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';

// 3. Internal absolute imports
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { formatDate } from '@/lib/utils';

// 4. Relative imports
import { ChildComponent } from './ChildComponent';
import type { LocalType } from './types';
```

---

## TypeScript Standards

### Always Define Types

```typescript
// ❌ BAD: Implicit any
function processData(data) {
  return data.map(item => item.name);
}

// ✅ GOOD: Explicit types
function processData(data: Equipment[]): string[] {
  return data.map(item => item.name);
}
```

### Centralized Type Definitions

```typescript
// lib/types.ts - Single source of truth
export interface Equipment {
  id: string;
  name: string;
  serialNumber: string;
  status: 'active' | 'maintenance' | 'scrap';
  maintenanceTeamId: string;
}

export interface Request {
  id: string;
  subject: string;
  equipmentId: string;
  status: 'new' | 'in_progress' | 'repaired' | 'scrap';
  priority: 'low' | 'medium' | 'high' | 'critical';
}
```

---

## Prohibited Practices

| ❌ Never Do | ✅ Instead |
|------------|-----------|
| Inline styles | Use Tailwind classes |
| Magic numbers | Use named constants |
| Commented-out code | Delete it (git has history) |
| Console.log in production | Use proper logging service |
| any type | Define proper interfaces |
| Nested ternaries | Use if/else or switch |
| Prop drilling > 2 levels | Use Context or Zustand |
| useEffect for data fetching | Use React Query or SWR patterns |

---

## Code Review Checklist

Before merging any code, verify:

- [ ] File is under 200 lines
- [ ] Single responsibility principle followed
- [ ] No duplicate logic exists elsewhere
- [ ] All types are explicitly defined
- [ ] Error states are handled gracefully
- [ ] Component has proper loading state
- [ ] No magic numbers or strings
- [ ] Imports are properly organized
- [ ] No console.log statements
- [ ] Component is properly named

---

## Quick Reference

```
📁 Maximum file size: 200 lines
📝 One component per file
🔄 Extract shared logic to /lib or /hooks
🛡️ Wrap sections in ErrorBoundary
📦 Types in /lib/types.ts
🎯 Single responsibility always
🚫 No duplicate implementations
✨ Clean, professional, production-ready
```

---

*Following these standards ensures a maintainable, scalable, and professional codebase.*
