# GearGuard - Detailed Implementation Plan

> **Version:** 2.0.0  
> **Status:** Planning Phase  
> **Reference:** Follows `CODING_STANDARDS.md` and `GEARGUARD_PROJECT_GUIDE.md`

This document serves as the step-by-step master plan for building GearGuard. Each phase builds upon the previous one.

---

## Phase 0: Environment & Firebase Setup
**Goal:** Configure cloud services and environment before coding.

### 0.1 Firebase Project
- [ ] **Select/Create Firebase Project** via Firebase Console or MCP.
- [ ] **Enable Authentication**: Email/Password provider.
- [ ] **Create Firestore Database** (production mode).
- [ ] **Create Initial Admin User** in Firebase Auth console.

### 0.2 Environment Variables
- [ ] **Create `.env.local`** in project root:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
    NEXT_PUBLIC_FIREBASE_APP_ID=
    ```
- [ ] **Add `.env.local` to `.gitignore`** (should already be there).

### 0.3 Security Rules
- [ ] **Create `firestore.rules`**:
    ```javascript
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          allow read, write: if request.auth != null;
        }
      }
    }
    ```
- [ ] **Deploy rules**: `firebase deploy --only firestore:rules`

### 0.4 Firestore Indexes
- [ ] **Create `firestore.indexes.json`** for complex queries:
    ```json
    {
      "indexes": [
        {
          "collectionGroup": "requests",
          "queryScope": "COLLECTION",
          "fields": [
            { "fieldPath": "status", "order": "ASCENDING" },
            { "fieldPath": "createdAt", "order": "DESCENDING" }
          ]
        },
        {
          "collectionGroup": "requests",
          "queryScope": "COLLECTION",
          "fields": [
            { "fieldPath": "equipmentId", "order": "ASCENDING" },
            { "fieldPath": "createdAt", "order": "DESCENDING" }
          ]
        },
        {
          "collectionGroup": "requests",
          "queryScope": "COLLECTION",
          "fields": [
            { "fieldPath": "type", "order": "ASCENDING" },
            { "fieldPath": "scheduledDate", "order": "ASCENDING" }
          ]
        }
      ]
    }
    ```
- [ ] **Deploy indexes**: `firebase deploy --only firestore:indexes`

---

## Phase 1: Project Initialization & Foundation
**Goal:** Set up the codebase, UI library, and database connection.

### 1.1 Project Setup
- [ ] **Verify Next.js structure** (`app/` router).
- [ ] **Tailwind Config**: Ensure `@tailwindcss/postcss` working.
- [ ] **Directory Structure**: Create all folders:
    ```
    components/{ui,layout,equipment,teams,requests,dashboard,calendar}
    lib/
    hooks/
    services/
    contexts/
    ```
- [ ] **Global Styles**: Define CSS variables in `globals.css`:
    - Primary colors, status colors, priority colors.

### 1.2 Install Dependencies
- [ ] **Firebase**: `npm install firebase`
- [ ] **Icons**: `npm install lucide-react`
- [ ] **Animations**: `npm install framer-motion`
- [ ] **Drag & Drop** (for Kanban): `npm install @dnd-kit/core @dnd-kit/sortable`
- [ ] **Date Utils**: `npm install date-fns`
- [ ] **Form Validation**: `npm install zod react-hook-form @hookform/resolvers`

### 1.3 Core Libraries
- [ ] **Firebase Client**: `lib/firebase.ts`
    - Initialize App, Auth, Firestore exports.
- [ ] **Type Definitions**: `lib/types.ts`
    - Interfaces: `User`, `Equipment`, `Team`, `TeamMember`, `MaintenanceRequest`
- [ ] **Utility Functions**: `lib/utils.ts`
    - Class merger `cn()`, date formatters, status helpers.
- [ ] **Constants**: `lib/constants.ts`
    - Status arrays, priority arrays, category options.

### 1.4 Form Validation Schemas
- [ ] **Create `lib/validations.ts`** using Zod:
    - `equipmentSchema`, `requestSchema`, `teamSchema`, `loginSchema`.

### 1.5 Atomic UI Components
*Create in `components/ui/` as individual files.*
- [ ] `Button.tsx`: Variants (primary, secondary, ghost, destructive, outline).
- [ ] `Input.tsx`: Label, error state, disabled state.
- [ ] `Textarea.tsx`: Multi-line input with error support.
- [ ] `Select.tsx`: Native select with label wrapper.
- [ ] `Card.tsx`: Composition pattern (Card, CardHeader, CardContent, CardFooter).
- [ ] `Badge.tsx`: Status and priority indicators.
- [ ] `Modal.tsx`: Accessible dialog with portal.
- [ ] `Spinner.tsx`: Loading indicator.
- [ ] `Skeleton.tsx`: Loading placeholder.
- [ ] `Toast.tsx`: Notification system (success/error/warning).
- [ ] `EmptyState.tsx`: "No data" placeholder with icon and message.
- [ ] `ConfirmDialog.tsx`: Delete confirmation modal.
- [ ] `Tabs.tsx`: Tab navigation component.

---

## Phase 2: Authentication & Layout
**Goal:** Secure the app and establish the navigation shell.

### 2.1 Auth Context
- [ ] **Create `contexts/AuthContext.tsx`**:
    - `AuthProvider` component.
    - State: `user`, `loading`, `error`.
    - Effect: `onAuthStateChanged` listener.
    - Functions: `login()`, `logout()`, `register()` (optional).
- [ ] **Create `hooks/useAuth.ts`**: Wrapper hook for context.

### 2.2 Login Page
- [ ] **Create `app/(auth)/layout.tsx`**: Centered, no sidebar.
- [ ] **Create `app/(auth)/login/page.tsx`**: Login page shell.
- [ ] **Create `components/auth/LoginForm.tsx`**:
    - Email + Password fields.
    - Form validation with Zod + react-hook-form.
    - Error display.
    - Loading state on submit.
    - "Remember me" checkbox (optional).

### 2.3 Dashboard Layout
- [ ] **Create `app/(dashboard)/layout.tsx`**:
    - Auth check: redirect to `/login` if not authenticated.
    - Layout: Sidebar + Header + Main content.
- [ ] **Create `components/layout/Sidebar.tsx`**:
    - Logo at top.
    - Navigation links: Dashboard, Equipment, Teams, Requests, Calendar.
    - Active link highlighting using `usePathname()`.
    - Collapsible on mobile.
- [ ] **Create `components/layout/Header.tsx`**:
    - Page title / breadcrumbs.
    - User profile dropdown.
    - Logout button.
- [ ] **Create `components/layout/MobileNav.tsx`**:
    - Hamburger menu.
    - Slide-out navigation drawer.

---

## Phase 3: Data Services Layer
**Goal:** Abstract all Firestore logic. No direct `getDocs` in components.

### 3.1 Generic Firestore Utilities
- [ ] **Create `lib/firestore-utils.ts`**:
    ```typescript
    fetchCollection<T>(name: string): Promise<T[]>
    fetchDocument<T>(name: string, id: string): Promise<T | null>
    createDocument<T>(name: string, data: T): Promise<string>
    updateDocument(name: string, id: string, data: Partial<T>): Promise<void>
    deleteDocument(name: string, id: string): Promise<void>
    subscribeToCollection<T>(name: string, callback: (data: T[]) => void): Unsubscribe
    ```

### 3.2 Service Modules
- [ ] **Equipment Service**: `services/equipmentService.ts`
    - `getEquipment()`, `getEquipmentById()`, `addEquipment()`, `updateEquipment()`, `deleteEquipment()`.
    - `subscribeToEquipment()` for real-time updates.
    - `getEquipmentByStatus()` filter helper.
- [ ] **Team Service**: `services/teamService.ts`
    - `getTeams()`, `getTeamById()`, `addTeam()`, `updateTeam()`, `deleteTeam()`.
    - `addTeamMember()`, `removeTeamMember()`.
- [ ] **Request Service**: `services/requestService.ts`
    - `getRequests()`, `getRequestById()`, `addRequest()`, `updateRequest()`, `deleteRequest()`.
    - `updateRequestStatus()` (for Kanban drag).
    - `getRequestsByEquipment()` (for history).
    - `getPreventiveRequests(startDate, endDate)` (for calendar).
    - `subscribeToRequests()` for real-time Kanban.

### 3.3 Custom Hooks
- [ ] **`hooks/useEquipment.ts`**: Wraps service, manages loading/error state.
- [ ] **`hooks/useTeams.ts`**: Wraps team service.
- [ ] **`hooks/useRequests.ts`**: Wraps request service.
- [ ] **`hooks/useEquipmentById.ts`**: Fetch single equipment.
- [ ] **`hooks/useRequestsByEquipment.ts`**: For maintenance history.

### 3.4 Seed Data
- [ ] **Create seed script or admin button**:
    - 3 Teams: "Mechanical", "Electrical", "IT Support".
    - 5-10 Equipment items with varied statuses.
    - 5-10 Sample requests.

---

## Phase 4: Equipment Module
**Goal:** Full CRUD for assets.

### 4.1 Equipment Components
- [ ] **`components/equipment/EquipmentCard.tsx`**:
    - Name, serial, status badge, location.
    - Quick actions: Edit, Delete, Create Request.
- [ ] **`components/equipment/EquipmentList.tsx`**:
    - Grid layout of EquipmentCards.
    - Loading skeleton state.
    - Empty state component.
- [ ] **`components/equipment/EquipmentFilters.tsx`**:
    - Search input.
    - Department dropdown.
    - Status toggle buttons.
    - Category filter.
- [ ] **`components/equipment/EquipmentForm.tsx`**:
    - All fields from data model.
    - Team dropdown (from Teams service).
    - Technician dropdown (from selected Team members).
    - Form validation.
- [ ] **`components/equipment/MaintenanceHistory.tsx`**:
    - List of past requests for equipment.
    - Status badges, dates, outcomes.
- [ ] **`components/equipment/ViewToggle.tsx`**:
    - Grid / List view toggle.

### 4.2 Equipment Pages
- [ ] **`app/(dashboard)/equipment/page.tsx`**:
    - Composition: Filters + List + Pagination.
- [ ] **`app/(dashboard)/equipment/new/page.tsx`**:
    - EquipmentForm in create mode.
- [ ] **`app/(dashboard)/equipment/[id]/page.tsx`**:
    - Detail view with tabs: Overview, Maintenance History.
    - Edit button → opens modal or navigates to edit page.
- [ ] **`app/(dashboard)/equipment/[id]/edit/page.tsx`**:
    - EquipmentForm in edit mode.

---

## Phase 5: Teams Module
**Goal:** Define who performs the work.

### 5.1 Team Components
- [ ] **`components/teams/TeamCard.tsx`**:
    - Team name, member count, member avatars.
    - Quick actions: View, Edit, Delete.
- [ ] **`components/teams/TeamList.tsx`**:
    - Grid of TeamCards.
- [ ] **`components/teams/TeamForm.tsx`**:
    - Name, description fields.
    - Member management section.
- [ ] **`components/teams/MemberList.tsx`**:
    - List of members with role badges.
    - Remove member button.
- [ ] **`components/teams/AddMemberForm.tsx`**:
    - Name, email, role selection.
    - Add to team button.

### 5.2 Team Pages
- [ ] **`app/(dashboard)/teams/page.tsx`**:
    - Grid of TeamCards + "Create Team" button.
- [ ] **`app/(dashboard)/teams/new/page.tsx`**:
    - TeamForm in create mode.
- [ ] **`app/(dashboard)/teams/[id]/page.tsx`**:
    - Team detail: info + member management.
- [ ] **`app/(dashboard)/teams/[id]/edit/page.tsx`**:
    - TeamForm in edit mode.

---

## Phase 6: Requests Module (Core)
**Goal:** The workflow engine.

### 6.1 Request Form with Smart Auto-fill
- [ ] **`hooks/useRequestForm.ts`**:
    - Watch equipment selection.
    - Auto-populate team and technician from equipment defaults.
    - Allow manual override.
- [ ] **`components/requests/RequestForm.tsx`**:
    - Equipment dropdown (triggers auto-fill).
    - Subject, Description.
    - Type: Corrective / Preventive.
    - Priority selector.
    - Scheduled Date (visible only if Preventive).
    - Team dropdown (auto-filled, editable).
    - Technician dropdown (auto-filled, editable).
- [ ] **`app/(dashboard)/requests/new/page.tsx`**:
    - RequestForm in create mode.

### 6.2 Kanban Board
- [ ] **`components/requests/KanbanBoard.tsx`**:
    - Fetch all requests, group by status.
    - DndContext from @dnd-kit.
    - Handle onDragEnd → updateRequestStatus.
- [ ] **`components/requests/KanbanColumn.tsx`**:
    - Column header with count badge.
    - Droppable zone.
    - List of RequestCards.
- [ ] **`components/requests/RequestCard.tsx`**:
    - Subject, equipment name, priority badge.
    - Assigned technician avatar.
    - Draggable wrapper.
    - onClick → open detail modal.
- [ ] **`components/requests/PriorityBadge.tsx`**:
    - Color-coded priority indicator.
- [ ] **`app/(dashboard)/requests/page.tsx`**:
    - KanbanBoard + filter bar.

### 6.3 Request Detail
- [ ] **`components/requests/RequestDetailModal.tsx`**:
    - Full request info display.
    - Edit button.
    - Status change buttons.
    - Delete with confirmation.
- [ ] **`components/requests/RequestFilters.tsx`**:
    - Filter by team, priority, type.
    - Search by subject.

---

## Phase 7: Dashboard & Visualization
**Goal:** High-level overview and insights.

### 7.1 Dashboard Page
- [ ] **`app/(dashboard)/page.tsx`**:
    - Grid layout of widgets.
    - Welcome header with user name.

### 7.2 Dashboard Widgets
- [ ] **`components/dashboard/StatsCard.tsx`**:
    - Generic KPI card: icon, label, value, trend.
- [ ] **`components/dashboard/CriticalEquipment.tsx`**:
    - Count of critical-priority open requests.
    - Clickable list of affected equipment.
- [ ] **`components/dashboard/TechnicianLoad.tsx`**:
    - Bar chart: active requests per technician.
    - Highlight overloaded technicians.
- [ ] **`components/dashboard/RequestStatusChart.tsx`**:
    - Donut/pie chart of request statuses.
- [ ] **`components/dashboard/RecentActivity.tsx`**:
    - Timeline of recent actions.
    - New requests, status changes, completions.
- [ ] **`components/dashboard/UpcomingMaintenance.tsx`**:
    - Next 7 days of preventive requests.
    - Calendar mini-view or list.

### 7.3 Calendar View
- [ ] **`components/calendar/MaintenanceCalendar.tsx`**:
    - Month grid view.
    - Fetch preventive requests.
    - Render dots/bars on scheduled dates.
- [ ] **`components/calendar/CalendarDay.tsx`**:
    - Individual day cell.
    - Click to view requests or create new.
- [ ] **`components/calendar/CalendarEventList.tsx`**:
    - Side panel showing requests for selected day.
- [ ] **`app/(dashboard)/calendar/page.tsx`**:
    - MaintenanceCalendar + event details.

---

## Phase 8: Verification & Polish
**Goal:** Production readiness.

### 8.1 UI Polish
- [ ] **Empty States**: Add to all list views.
- [ ] **Loading States**: Skeleton loaders for cards/tables.
- [ ] **Error Boundaries**: Wrap each module.
- [ ] **Toast Notifications**: Success/error feedback on all actions.
- [ ] **Animations**: Framer Motion for page transitions, modals.
- [ ] **Responsive Design**: Test and fix mobile/tablet layouts.

### 8.2 Delete Confirmations
- [ ] Equipment delete → ConfirmDialog.
- [ ] Team delete → ConfirmDialog.
- [ ] Request delete → ConfirmDialog.

### 8.3 End-to-End Testing

#### Test Flow 1: Corrective Maintenance
1. Login with test user.
2. Create Equipment "Generator A" → Assign to "Mechanical" team.
3. Navigate to Requests → Create new.
4. Select "Generator A" → Verify team auto-fills.
5. Submit request → Verify appears in Kanban "New" column.
6. Drag to "In Progress" → Verify status updates.
7. Drag to "Repaired" → Verify completion.
8. Check Dashboard → Verify stats update.

#### Test Flow 2: Preventive Maintenance
1. Create Preventive request for next week.
2. Navigate to Calendar → Verify visual indicator.
3. Click date → Verify request details shown.

#### Test Flow 3: Equipment History
1. Create multiple requests for same equipment.
2. View equipment detail → History tab.
3. Verify all requests appear chronologically.

#### Test Flow 4: Team Management
1. Create new team.
2. Add members with different roles.
3. Assign team to equipment.
4. Verify team appears in request form dropdown.

### 8.4 Performance
- [ ] Verify no unnecessary re-renders.
- [ ] Optimize Firestore queries.
- [ ] Lazy load heavy components.

---

## Technical Appendix

### Component Architecture Rules
1. **Page files**: Composition only, < 50 lines.
2. **Form components**: Use react-hook-form + zod.
3. **List components**: Handle loading, error, empty states.
4. **Hooks**: Extract all data fetching logic.

### State Management
| Type | Solution |
|------|----------|
| Auth state | AuthContext |
| Server data | Custom hooks with service calls |
| Local UI | useState (modals, tabs, filters) |
| Form state | react-hook-form |

### Error Handling Pattern
```typescript
try {
  await someOperation();
  toast.success("Operation completed");
} catch (error) {
  console.error(error);
  toast.error("Something went wrong");
}
```

### File Size Targets
| File Type | Max Lines |
|-----------|-----------|
| Page | 50 |
| Component | 150 |
| Hook | 100 |
| Service | 100 |

---

## Checklist Summary

| Phase | Items | Critical |
|-------|-------|----------|
| 0: Environment | 8 | ✅ Firebase, env vars |
| 1: Foundation | 20 | ✅ Types, UI components |
| 2: Auth & Layout | 10 | ✅ Login, sidebar |
| 3: Services | 12 | ✅ CRUD + real-time |
| 4: Equipment | 10 | ✅ Full CRUD |
| 5: Teams | 9 | ✅ Member management |
| 6: Requests | 10 | ✅ Kanban + auto-fill |
| 7: Dashboard | 8 | ✅ KPIs + calendar |
| 8: Polish | 12 | ✅ Testing + UX |

**Total Estimated Items: ~100 discrete tasks**

---

*This plan ensures all components from the Project Guide are implemented with proper code structure and best practices.*
