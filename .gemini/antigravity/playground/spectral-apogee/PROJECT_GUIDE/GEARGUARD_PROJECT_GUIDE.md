# GearGuard - Complete Project Guide

> **Version:** 1.0.0  
> **Last Updated:** December 27, 2024  
> **Project Type:** Hackathon MVP  
> **Status:** Planning Phase

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Solution Overview](#solution-overview)
4. [Core Philosophy](#core-philosophy)
5. [Technology Stack](#technology-stack)
6. [Data Model](#data-model)
7. [Project Structure](#project-structure)
8. [Feature Specifications](#feature-specifications)
9. [Implementation Phases](#implementation-phases)
10. [Firebase Setup Guide](#firebase-setup-guide)
11. [Verification Plan](#verification-plan)
12. [UI/UX Guidelines](#uiux-guidelines)
13. [API Reference](#api-reference)
14. [Deployment Guide](#deployment-guide)
15. [Future Enhancements](#future-enhancements)

---

## Executive Summary

**GearGuard** is a comprehensive maintenance management system designed to track organizational assets (machines, vehicles, computers, equipment) and efficiently manage maintenance requests. The system serves as a central hub connecting Equipment, Teams, and Maintenance Requests to streamline operations and minimize downtime.

### Key Value Propositions
- 🔧 **Centralized Asset Tracking** - Single source of truth for all equipment
- 📋 **Smart Request Management** - Auto-fill fields based on equipment selection
- 👥 **Team Coordination** - Assign work to the right technicians automatically
- 📅 **Preventive Maintenance** - Calendar-based scheduling for routine checkups
- 📊 **Real-time Dashboard** - Monitor critical equipment and technician workload

---

## Problem Statement

### The Challenge

Organizations struggle with:

1. **Asset Visibility Issues**
   - No centralized database of equipment
   - Uncertainty about warranty status and maintenance history
   - Difficulty tracking equipment location and assignment

2. **Inefficient Request Handling**
   - Manual assignment of maintenance tasks
   - No visibility into technician workload
   - Lost or forgotten maintenance requests

3. **Reactive Maintenance Culture**
   - Equipment breaks down unexpectedly
   - No scheduled preventive maintenance
   - High downtime costs and repair expenses

4. **Poor Communication**
   - Disconnect between requesters and maintenance teams
   - No status updates on ongoing repairs
   - Lack of historical data for decision-making

### The Impact

- **Increased Downtime** - Equipment failures halt production
- **Higher Costs** - Emergency repairs cost more than preventive maintenance
- **Frustrated Staff** - No visibility into when issues will be resolved
- **Lost Productivity** - Time wasted tracking down maintenance status

---

## Solution Overview

GearGuard addresses these challenges through an integrated platform that:

| Feature | Benefit |
|---------|---------|
| **Equipment Registry** | Complete asset database with all relevant details |
| **Smart Request System** | Auto-populates team and technician based on equipment |
| **Kanban Workflow** | Visual drag-and-drop request management |
| **Preventive Calendar** | Scheduled maintenance never gets missed |
| **Dashboard Analytics** | Real-time KPIs for informed decisions |
| **Team Management** | Organize technicians by specialty |

---

## Core Philosophy

> **The Three Pillars of GearGuard**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ⚙️ EQUIPMENT          👥 TEAMS           📋 REQUESTS     │
│   (What is broken)      (Who fixes it)     (Work to be done)│
│                                                             │
│         └──────────────────┼──────────────────┘             │
│                            │                                 │
│                     🔗 CONNECTED                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Every piece of equipment is assigned to a **default team** and **default technician**. When a maintenance request is created, GearGuard automatically suggests the right team and technician, reducing manual work and errors.

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.1 | React framework with App Router |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Utility-first styling |
| **Framer Motion** | Latest | Animations |
| **Lucide React** | Latest | Icon system |

### Backend / Database
| Technology | Purpose |
|------------|---------|
| **Firebase Auth** | User authentication (Email/Password) |
| **Cloud Firestore** | NoSQL document database |
| **Firebase Hosting** | Static hosting (optional) |

### Development Tools
| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **PostCSS** | CSS processing |
| **pnpm/npm** | Package management |

### State Management
- **React Context API** for global state
- **Zustand** if more complex state needed

---

## Data Model

### Collections Overview

```
Firestore Database
├── equipment/          # All organizational assets
├── teams/              # Maintenance team definitions  
├── requests/           # Maintenance work orders
└── users/              # User profiles (optional extended data)
```

---

### Equipment Collection

**Path:** `/equipment/{equipmentId}`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Auto-generated document ID |
| `name` | string | Yes | Display name (e.g., "CNC Machine #3") |
| `serialNumber` | string | Yes | Manufacturer serial number |
| `category` | string | Yes | Equipment type (e.g., "Printer", "CNC Machine", "Vehicle") |
| `department` | string | Yes | Owning department (e.g., "Production", "IT") |
| `employeeId` | string | No | If assigned to specific employee |
| `location` | string | Yes | Physical location (e.g., "Building A, Floor 2") |
| `purchaseDate` | timestamp | Yes | When purchased |
| `warrantyExpiration` | timestamp | No | Warranty end date |
| `maintenanceTeamId` | string | Yes | **Default team** for maintenance |
| `techId` | string | No | **Default technician** ID |
| `status` | enum | Yes | `'active'`, `'maintenance'`, `'scrap'` |
| `notes` | string | No | Additional notes |
| `createdAt` | timestamp | Yes | Record creation time |
| `updatedAt` | timestamp | Yes | Last modification time |

**Status Values:**
- `active` - Equipment is operational
- `maintenance` - Currently under repair
- `scrap` - Decommissioned/retired

---

### Teams Collection

**Path:** `/teams/{teamId}`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Auto-generated document ID |
| `name` | string | Yes | Team name (e.g., "Mechanics", "IT Support") |
| `description` | string | No | Team purpose/specialty |
| `members` | array | Yes | List of team members |
| `createdAt` | timestamp | Yes | Record creation time |

**Members Array Item:**
```typescript
{
  userId: string;      // Reference to user
  name: string;        // Display name
  role: 'lead' | 'technician' | 'apprentice';
  email: string;
}
```

---

### Requests Collection

**Path:** `/requests/{requestId}`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Auto-generated document ID |
| `subject` | string | Yes | Brief description of issue |
| `description` | string | No | Detailed description |
| `equipmentId` | string | Yes | Reference to equipment |
| `equipmentName` | string | Yes | Denormalized for display |
| `teamId` | string | Yes | Assigned team |
| `teamName` | string | Yes | Denormalized for display |
| `technicianId` | string | No | Assigned individual |
| `technicianName` | string | No | Denormalized for display |
| `type` | enum | Yes | `'corrective'`, `'preventive'` |
| `status` | enum | Yes | `'new'`, `'in_progress'`, `'repaired'`, `'scrap'` |
| `priority` | enum | Yes | `'low'`, `'medium'`, `'high'`, `'critical'` |
| `scheduledDate` | timestamp | No | For preventive maintenance |
| `completedDate` | timestamp | No | When work was completed |
| `duration` | number | No | Hours spent on repair |
| `requesterId` | string | Yes | Who submitted request |
| `requesterName` | string | Yes | Denormalized |
| `createdAt` | timestamp | Yes | Submission time |
| `updatedAt` | timestamp | Yes | Last modification |

**Request Types:**
- `corrective` - Fix something that's broken
- `preventive` - Scheduled routine maintenance

**Status Flow:**
```
new → in_progress → repaired
                 └→ scrap (if unrepairable)
```

**Priority Levels:**
- `low` - Can wait, minimal impact
- `medium` - Should be addressed soon
- `high` - Significant impact, needs quick attention
- `critical` - Production stopped, immediate action required

---

## Project Structure

```
spectral-apogee/
├── app/                           # Next.js App Router
│   ├── (auth)/                    # Auth route group
│   │   ├── login/
│   │   │   └── page.tsx           # Login screen
│   │   └── layout.tsx             # Auth layout (no sidebar)
│   │
│   ├── (dashboard)/               # Protected route group
│   │   ├── layout.tsx             # Dashboard layout with sidebar
│   │   ├── page.tsx               # Main Dashboard (KPIs)
│   │   │
│   │   ├── equipment/
│   │   │   ├── page.tsx           # Equipment list view
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx       # Equipment detail view
│   │   │   └── new/
│   │   │       └── page.tsx       # Add new equipment
│   │   │
│   │   ├── requests/
│   │   │   ├── page.tsx           # Kanban board view
│   │   │   └── new/
│   │   │       └── page.tsx       # Create request form
│   │   │
│   │   ├── calendar/
│   │   │   └── page.tsx           # Preventive maintenance calendar
│   │   │
│   │   └── teams/
│   │       ├── page.tsx           # Teams list
│   │       └── [id]/
│   │           └── page.tsx       # Team detail/edit
│   │
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing/redirect
│
├── components/
│   ├── ui/                        # Generic UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   ├── modal.tsx
│   │   └── loading.tsx
│   │
│   ├── layout/                    # Layout components
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── mobile-nav.tsx
│   │
│   ├── equipment/                 # Equipment-specific
│   │   ├── equipment-card.tsx
│   │   ├── equipment-form.tsx
│   │   ├── equipment-list.tsx
│   │   └── maintenance-history.tsx
│   │
│   ├── requests/                  # Request-specific
│   │   ├── kanban-board.tsx
│   │   ├── kanban-column.tsx
│   │   ├── request-card.tsx
│   │   ├── request-form.tsx
│   │   └── priority-badge.tsx
│   │
│   ├── teams/                     # Team-specific
│   │   ├── team-card.tsx
│   │   ├── team-form.tsx
│   │   └── member-list.tsx
│   │
│   └── dashboard/                 # Dashboard widgets
│       ├── stats-card.tsx
│       ├── critical-equipment.tsx
│       ├── technician-load.tsx
│       └── recent-requests.tsx
│
├── lib/
│   ├── firebase.ts                # Firebase initialization
│   ├── auth-context.tsx           # Auth provider & hooks
│   ├── types.ts                   # TypeScript interfaces
│   ├── utils.ts                   # Helper functions
│   └── constants.ts               # App constants
│
├── hooks/
│   ├── use-equipment.ts           # Equipment CRUD hooks
│   ├── use-teams.ts               # Teams CRUD hooks
│   ├── use-requests.ts            # Requests CRUD hooks
│   └── use-auth.ts                # Auth state hook
│
├── services/
│   ├── equipment-service.ts       # Equipment Firestore operations
│   ├── teams-service.ts           # Teams Firestore operations
│   └── requests-service.ts        # Requests Firestore operations
│
├── docs/
│   └── PROJECT_GUIDE/             # Project documentation
│       └── GEARGUARD_PROJECT_GUIDE.md
│
├── public/
│   ├── logo.svg
│   └── favicon.ico
│
├── firebase.json                  # Firebase config (to be created)
├── firestore.rules                # Security rules (to be created)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Feature Specifications

### 1. Authentication

**Login Page Features:**
- Email/password authentication
- "Remember me" functionality
- Error handling with user-friendly messages
- Loading states during authentication

**Protected Routes:**
- All `/dashboard/` routes require authentication
- Redirect to `/login` if unauthenticated
- Session persistence using Firebase Auth state

---

### 2. Equipment Module

#### Equipment List View
- **Grid/List toggle** for different view preferences
- **Search** by name, serial number, or department
- **Filter** by:
  - Category (Printer, CNC, Vehicle, etc.)
  - Department
  - Status (Active, Maintenance, Scrap)
- **Pagination** for large datasets
- **Quick actions** - Edit, View History, Create Request

#### Equipment Form (Add/Edit)
- **Required fields:** Name, Serial Number, Category, Department, Location, Purchase Date
- **Optional fields:** Employee ID, Warranty, Notes
- **Auto-complete** for Department and Category from existing values
- **Team/Technician selection** - Dropdowns populated from Teams collection

#### Smart Button (Maintenance History)
When viewing equipment, show a contextual button that:
- Displays count of past requests
- Opens a side panel with full maintenance history
- Shows last maintenance date and outcome

---

### 3. Teams Module

#### Team Management
- Create new teams with name and description
- Add/remove team members
- Assign roles: Lead, Technician, Apprentice
- View team workload (assigned requests)

---

### 4. Requests Module (Core Feature)

#### Request Creation Form

**Smart Auto-fill Workflow:**
1. User selects **Equipment** from dropdown
2. System automatically populates:
   - Default **Team** from equipment record
   - Default **Technician** from equipment record
3. User can override defaults if needed
4. User fills in Subject, Type, Priority, Description

#### Kanban Board

**Columns:**
| Column | Status | Color |
|--------|--------|-------|
| New | `new` | Blue |
| In Progress | `in_progress` | Yellow |
| Repaired | `repaired` | Green |
| Scrap | `scrap` | Red |

**Features:**
- Drag-and-drop to change status
- Click to expand details
- Quick edit (assign technician, change priority)
- Filter by team, priority, date range
- Search by subject or equipment name

---

### 5. Calendar View

**Purpose:** Visualize preventive maintenance schedule

**Features:**
- Month/Week view toggle
- Color-coded by priority
- Click to view/edit request details
- Create new preventive request by clicking date
- Upcoming maintenance reminders

---

### 6. Dashboard

**Key Performance Indicators:**

1. **Critical Equipment Counter**
   - Count of equipment with critical-priority open requests
   - Click to see list

2. **Technician Workload**
   - Bar chart showing requests per technician
   - Highlight overloaded technicians

3. **Request Status Summary**
   - Pie/donut chart of request statuses
   - Quick filters

4. **Recent Activity Feed**
   - Latest request updates
   - New equipment added
   - Completed maintenance

5. **Upcoming Maintenance**
   - Next 7 days of scheduled preventive maintenance

---

## Implementation Phases

### Phase 1: Foundation (Day 1)

#### Tasks:
- [x] Next.js project initialized
- [x] Tailwind CSS configured
- [ ] Set up project folder structure
- [ ] Configure Firebase project
- [ ] Initialize Firestore database
- [ ] Create TypeScript types
- [ ] Set up Firebase auth

**Deliverables:**
- Working development environment
- Firebase connected
- Basic types defined

---

### Phase 2: Core UI & Auth (Day 1-2)

#### Tasks:
- [ ] Create design system (colors, typography, spacing)
- [ ] Build reusable UI components (Button, Card, Input, etc.)
- [ ] Build layout components (Sidebar, Header)
- [ ] Implement Login page
- [ ] Implement Auth context/provider
- [ ] Protect dashboard routes

**Deliverables:**
- Complete UI component library
- Working authentication flow
- Protected route structure

---

### Phase 3: Equipment Module (Day 2)

#### Tasks:
- [ ] Implement Firestore service for equipment
- [ ] Build Equipment list view with search/filter
- [ ] Build Equipment form (create/edit)
- [ ] Build Equipment detail view
- [ ] Add equipment CRUD hooks
- [ ] Implement maintenance history panel

**Deliverables:**
- Full equipment management
- Seed data for testing

---

### Phase 4: Teams Module (Day 2-3)

#### Tasks:
- [ ] Implement Firestore service for teams
- [ ] Build Teams list view
- [ ] Build Team form with member management
- [ ] Connect teams to equipment

**Deliverables:**
- Team management functionality
- Seed team data

---

### Phase 5: Requests Module (Day 3)

#### Tasks:
- [ ] Implement Firestore service for requests
- [ ] Build Request creation form with auto-fill
- [ ] Build Kanban board with drag-and-drop
- [ ] Implement status transitions
- [ ] Add filtering and search

**Deliverables:**
- Complete request lifecycle management
- Working Kanban interface

---

### Phase 6: Dashboard & Calendar (Day 3-4)

#### Tasks:
- [ ] Build dashboard layout
- [ ] Implement KPI widgets
- [ ] Build calendar view
- [ ] Add preventive maintenance scheduling
- [ ] Real-time updates using Firestore listeners

**Deliverables:**
- Informative dashboard
- Functional calendar

---

### Phase 7: Polish & Testing (Day 4)

#### Tasks:
- [ ] UI polish and animations
- [ ] Responsive design fixes
- [ ] End-to-end workflow testing
- [ ] Bug fixes
- [ ] Performance optimization

**Deliverables:**
- Production-ready application
- Tested workflows

---

## Firebase Setup Guide

### Step 1: Create/Select Firebase Project

Use the Firebase MCP tools or Firebase Console:

```bash
# Using Firebase CLI
firebase login
firebase projects:list
# Select existing or create new
```

### Step 2: Initialize Firestore

```bash
firebase init firestore
```

### Step 3: Configure Security Rules

Create `firestore.rules` in project root:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write
    // (Temporary rule for development)
    match /{document=**} {
      allow read, write: if request.auth != null 
        && request.time < timestamp.date(2025, 12, 28);
    }
  }
}
```

### Step 4: Deploy Rules

```bash
firebase deploy --only firestore
```

### Step 5: Verify Setup

1. Visit: `https://console.firebase.google.com/u/0/project/{PROJECT_ID}/firestore`
2. Confirm database is created
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Test basic Firestore operations

### Step 6: Configure Client SDK

Create `lib/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

---

## Verification Plan

### Flow 1: The Breakdown (Corrective Maintenance)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Requests > New | Request form opens |
| 2 | Select equipment from dropdown | Team and Technician auto-fill |
| 3 | Fill subject: "Motor overheating" | Field accepts input |
| 4 | Set type: Corrective, Priority: High | Dropdowns work correctly |
| 5 | Submit request | Redirects to Kanban, card appears in "New" column |
| 6 | Drag card to "In Progress" | Status updates, card moves |
| 7 | Drag card to "Repaired" | Status updates, completes workflow |
| 8 | Check Dashboard | Critical equipment count updated |

### Flow 2: The Routine Checkup (Preventive Maintenance)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Requests > New | Request form opens |
| 2 | Set type: Preventive | Scheduled Date field appears |
| 3 | Pick date: tomorrow | Calendar picker works |
| 4 | Submit request | Request created |
| 5 | Navigate to Calendar | Request appears on selected date |
| 6 | Click calendar event | Request details shown |

### Flow 3: Equipment Lifecycle

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Equipment > New | Form opens |
| 2 | Fill all required fields | Validation works |
| 3 | Assign team and technician | Dropdowns populated from Teams |
| 4 | Submit | Equipment appears in list |
| 5 | Search for equipment | Found by name/serial |
| 6 | Click equipment > View History | History panel shows (empty initially) |
| 7 | Create request for this equipment | Request created |
| 8 | Return to equipment history | New request appears |

### Dashboard Verification

| Check | Expected |
|-------|----------|
| Critical Equipment count | Matches count of equipment with critical open requests |
| Technician Load chart | Shows accurate request distribution |
| Recent Activity | Shows latest actions |
| Upcoming Maintenance | Shows next 7 days of preventive requests |

---

## UI/UX Guidelines

### Color Palette

```css
/* Primary */
--primary: #2563eb;      /* Blue 600 */
--primary-dark: #1d4ed8; /* Blue 700 */

/* Status Colors */
--status-new: #3b82f6;       /* Blue */
--status-progress: #f59e0b; /* Amber */
--status-repaired: #10b981; /* Emerald */
--status-scrap: #ef4444;    /* Red */

/* Priority Colors */
--priority-low: #6b7280;    /* Gray */
--priority-medium: #3b82f6; /* Blue */
--priority-high: #f97316;   /* Orange */
--priority-critical: #ef4444; /* Red */

/* Backgrounds */
--bg-primary: #ffffff;
--bg-secondary: #f9fafb;
--bg-dark: #111827;
```

### Typography

- **Headings:** Inter or system font stack
- **Body:** 16px base, 1.5 line-height
- **Small:** 14px for captions

### Design Principles

1. **Clean & Professional** - Minimize visual clutter
2. **Action-Oriented** - Clear CTAs, obvious flows
3. **Responsive** - Works on tablet for technicians in the field
4. **Minimal Clicks** - Most common actions require < 3 clicks

---

## API Reference

### Firestore Operations

#### Equipment

```typescript
// Create
await addDoc(collection(db, 'equipment'), equipmentData);

// Read All
const snapshot = await getDocs(collection(db, 'equipment'));

// Read One
const doc = await getDoc(doc(db, 'equipment', id));

// Update
await updateDoc(doc(db, 'equipment', id), updates);

// Delete
await deleteDoc(doc(db, 'equipment', id));

// Real-time listener
onSnapshot(collection(db, 'equipment'), (snapshot) => {
  // Handle changes
});
```

#### Query Examples

```typescript
// Equipment with critical requests
const criticalQuery = query(
  collection(db, 'requests'),
  where('status', 'in', ['new', 'in_progress']),
  where('priority', '==', 'critical')
);

// Requests for a specific team
const teamQuery = query(
  collection(db, 'requests'),
  where('teamId', '==', teamId),
  orderBy('createdAt', 'desc')
);

// Preventive maintenance in date range
const calendarQuery = query(
  collection(db, 'requests'),
  where('type', '==', 'preventive'),
  where('scheduledDate', '>=', startDate),
  where('scheduledDate', '<=', endDate)
);
```

---

## Deployment Guide

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Access at http://localhost:3000
```

### Production Build

```bash
# Create production build
npm run build

# Test production build locally
npm run start
```

### Firebase Hosting (Optional)

```bash
# Initialize hosting
firebase init hosting

# Deploy
firebase deploy --only hosting
```

---

## Future Enhancements

### Phase 2 Features (Post-MVP)

1. **Notifications**
   - Email alerts for new assignments
   - Push notifications for status changes

2. **Reporting**
   - PDF export of maintenance reports
   - Equipment downtime analytics
   - Cost tracking

3. **Mobile App**
   - React Native or PWA
   - Barcode scanning for equipment

4. **Advanced Features**
   - Parts inventory management
   - Work order approval workflows
   - External contractor management
   - Integration with ERP systems

5. **AI/ML**
   - Predictive maintenance suggestions
   - Auto-prioritization of requests
   - Equipment failure prediction

---

## Quick Reference

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run lint` | Run ESLint |
| `firebase deploy` | Deploy to Firebase |

### Key Files

| File | Purpose |
|------|---------|
| `lib/firebase.ts` | Firebase initialization |
| `lib/types.ts` | TypeScript interfaces |
| `lib/auth-context.tsx` | Auth state management |
| `firestore.rules` | Security rules |

### Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

## Contact & Resources

- **Firebase Documentation:** https://firebase.google.com/docs
- **Next.js Documentation:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

---

*This document serves as the complete reference for the GearGuard project. Keep it updated as the project evolves.*
