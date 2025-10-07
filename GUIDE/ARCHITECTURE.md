VR NextGEN Frontend Architecture

This document outlines the key modules, structure, and patterns to keep the codebase modular, maintainable, and future‑proof.

Folder Structure (Feature‑oriented)
- src/components/
  - common/: Reusable primitives (layout wrappers, containers, error boundary, animated background, etc.)
  - sections/: Feature sections composed from common primitives
    - hero/: Hero UI, text, buttons, background logic, and types
    - services/: Services section + service page shell and supporting components
    - industries/: Industries section and UI elements
  - layout/: Site‑wide Header, Footer, Layout
  - ui/: Generic UI widgets (carousels, etc.)
- src/pages/: Next.js pages
- src/hooks/: Custom hooks (parallax, tilt, typewriter, navigation, visibility)
- src/utils/: Utilities and helpers (e.g., routes.ts)
- src/config/: App configuration, constants, responsive tokens
- src/design-system/: Tokens and theming primitives
- src/services/: API client and integrations
- src/styles/: Global and component styles

Routing
- Centralize route construction in src/utils/routes.ts
  - APP_ROUTES.serviceById(id) and APP_ROUTES.industryById(id) prevent hardcoded paths
  - Change routes in one place without touching UI

Hero Section
- Hero.tsx: Orchestrates the hero layout and the scroll‑bound background fade (Framer Motion)
- HeroText.tsx: Heading, subheading, and content text
- HeroButtons.tsx: CTA buttons with responsive layout
- HeroStats.tsx: Memoized, reusable stats component with typed props
- types.ts: Shared hero‑specific type contracts
- constants.ts: Config values (e.g., parallax speed, sizes)

Services
- ServicePageShell.tsx (under sections/services): Consistent page shell for all service pages; accepts cardTitle, optional cardBgUrl, and children for content
- constants.tsx: Feature content constants (SERVICES) including bgUrl

Error Isolation
- src/components/common/ErrorBoundary.tsx wraps pages via Layout.tsx
- Use local error boundaries for complex, failure‑prone subtrees when needed

Patterns
- Single Responsibility: Prefer small, focused components
- Separation of Concerns: UI vs logic via custom hooks in src/hooks/
- Type Safety: All props typed; prefer explicit interfaces for public component APIs
- Configuration: Avoid hardcoded strings; use config/, constants, and APP_ROUTES
- Performance:
  - Framer Motion springs for smooth scroll‑bound animations
  - React.memo for presentational components with stable props
  - CSS will-change and reduced‑motion support

Adding Features Safely
1) Add constants and config first
2) Build a small, typed component in components/sections/<feature>
3) Reuse primitives from components/common
4) Route via APP_ROUTES
5) Validate with the testing checklist in GUIDE/TESTING.md


