# VR Next Gen Solutions Website Project Guide

## 1. Project Overview
VR Next Gen Solutions is a Business Consultancy Firm specializing in Data-Driven Strategy. This project involves building a **professional**, **sleek**, and **interactive** website using Cursor IDE. The website will serve as a digital portfolio showcasing the firm’s expertise and client successes.

## 2. Core Pages and Structure
- **Home**: Eye-catching hero section with parallax background, animated headline, typewriter effect, and call-to-action buttons.
- **About**: Company mission, vision, team profiles, expertise overview, and animated counters for key metrics.
- **Our Clients**: Interactive rotating carousel wheel showcasing client logos and case studies with left/right navigation arrows.
- **Contact**: Animated contact form with validation feedback, company address, phone number, map embed, and social links.

## 3. Design Guidelines
- **Branding**: Black and Gold color scheme for luxury and professionalism.
- **Interactivity**: Hover effects on buttons, images, and cards; parallax scrolling on sections; smooth scroll navigation; animated statistics and counters.
- **Responsiveness**: Mobile-first approach with breakpoints at 320px, 768px, and 1024px; touch/swipe support.
- **Performance**: 60fps animations; lazy loading images; CSS transforms.
- **Accessibility**: Reduced motion support; semantic HTML; ARIA labels where needed.

## 4. Color Palette
- **Primary Black**: #000000 (backgrounds, headers)
- **Deep Charcoal**: #231F20 (texts, secondary backgrounds)
- **Gold Variants**: #FFD700, #AD974F, #8E793E (accents, buttons, highlights)
- **White**: #FFFFFF (text on dark backgrounds)
- **Light Grey**: #EAEAEA (section dividers, backgrounds)

## 5. Typography
- **Headings**: Playfair Display or Montserrat Bold
- **Body Text**: Montserrat Regular or Open Sans
- **Accent Text**: Gold-colored text for CTAs and highlights
- **Font Sizes**: Responsive scaling: H1 3rem, H2 2.25rem, H3 1.75rem, Body 1rem

## 6. Interactive Features
- **Parallax Scrolling**: Hero, About, Clients sections using Framer Motion or custom JS.
- **Hover Effects**:
  - Buttons: Scale, shadow, gradient background transition.
  - Images: Zoom, overlay, rotate on hover.
  - Cards: Lift with box-shadow.
- **Client Carousel**:
  - Circular rotation effect.
  - Auto-play with pause on hover.
  - Left/right arrows and touch/swipe support.
- **Animated Counters**: Count-up on scroll into view.
- **Smooth Scroll**: Progress indicator and section snapping.

## 7. Tech Stack
- **Frontend**: React with Next.js framework
- **Styling**: Tailwind CSS, styled-components for custom animations
- **Animations**: Framer Motion, React Spring, CSS3 Transitions
- **Icons & Images**: Heroicons, FontAwesome, Unsplash
- **Version Control**: Git with main/develop branches

## 8. File Structure
```
vr-nextgen-website/
├── public/
│   ├── images/
│   │   ├── hero-bg.jpg
│   │   └── clients/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   └── Hero.module.css
│   │   ├── About/
│   │   ├── ClientCarousel/
│   │   └── Contact/
│   ├── hooks/
│   │   └── useParallax.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── tailwind.config.js
│   ├── utils/
│   │   └── animations.ts
│   └── pages/
│       ├── index.tsx
│       ├── about.tsx
│       ├── clients.tsx
│       └── contact.tsx
├── .gitignore
├── package.json
├── tailwind.config.js
└── README.md
```

## 9. Development Timeline
- **Day 1-2**: Initialize Cursor project; configure Tailwind; implement global styles and typography.
- **Day 3-4**: Build Hero section with parallax and typewriter animation.
- **Day 5-6**: Develop About page with animated counters and team profiles.
- **Day 7-8**: Create ClientCarousel component and page; integrate auto-play and arrow controls.
- **Day 9**: Build Contact page with form validation and map embed.
- **Day 10**: Implement hover effects site-wide and smooth scroll.
- **Day 11**: Responsive testing and cross-browser QA.
- **Day 12**: Performance optimization, accessibility checks, and final polish.

## 10. Additional Notes
- Future upgrades can include CMS integration or Supabase for dynamic content management.
- Analytics setup with Google Analytics or HubSpot to track user interactions.
- Ensure SEO best practices: meta tags, alt text, sitemap.
