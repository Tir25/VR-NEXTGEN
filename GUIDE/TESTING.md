VR NextGEN Frontend Testing & Validation Checklist

Scope
- Validate critical UI flows, animations, and navigation without changing runtime code.

Manual Test Pass
1) Hero Section
   - Background image fades out by ~30% viewport scroll and fades in on scroll up
   - No layout shift/flicker; buttons don’t overlap stats on mobile
   - Reduced‑motion: opacity animation disabled/respect preferences
2) Services Section
   - Cards show proper background images and readable text
   - Hover glow effect applies; 3D tilt smooth; no transition conflicts
   - Learn More navigates to /services/:id for all six cards
3) Industries Section
   - Front/back Learn More navigates to /industries/:id
   - Carousel performance smooth; no jank
4) Service Subpages
   - Heading displayed above content card (gold), spacing correct on mobile/desktop
   - Content readable; card background image set where provided
   - Layout responsive across breakpoints

Performance & Accessibility
- Confirm images are optimized (webp/avif where available)
- Check no excessive re‑renders (memoized components where beneficial)
- Verify keyboard navigation and aria labels on interactive elements

Regression Guardrails
- Routes generated via APP_ROUTES
- Shared shells (ServicePageShell) used consistently
- ErrorBoundary wraps pages via Layout

Future Tests (optional)
- Unit test simple components (stateless presentational)
- Integration test navigation (Learn More buttons -> dynamic routes)


