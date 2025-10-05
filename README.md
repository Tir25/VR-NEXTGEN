# 🚀 VR NextGEN Solutions

**A modern, data-driven consultancy website built with Next.js, React, and TypeScript.**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

## 📋 **Table of Contents**

- [🚀 Quick Start](#-quick-start)
- [🏗️ Architecture](#️-architecture)
- [📁 Project Structure](#-project-structure)
- [🎨 Design System](#-design-system)
- [🔧 Development](#-development)
- [🚀 Deployment](#-deployment)
- [📚 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18.x or higher
- npm, yarn, or pnpm
- Git

### **Installation**

```bash
# Clone the repository
git clone https://github.com/Tir25/VR-NEXTGEN.git
cd VR-NEXTGEN

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### **Available Scripts**

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript compiler check

# Optimization
npm run optimize:all      # Optimize images, logos, and CSS
npm run optimize:images   # Optimize images only
npm run optimize:css      # Optimize CSS only
npm run build:optimized   # Build with full optimization

# Code Quality
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
```

---

## 🏗️ **Architecture**

### **Technology Stack**

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | Next.js | 15.5.4 | React framework with SSR/SSG |
| **Runtime** | React | 19.1.0 | UI library |
| **Language** | TypeScript | 5.x | Type-safe JavaScript |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS framework |
| **Animations** | CSS3 + Custom | - | Smooth transitions and effects |
| **Icons** | Heroicons | Latest | SVG icon library |
| **Deployment** | Vercel | Latest | Hosting platform |

### **Key Features**

- ✅ **Server-Side Rendering (SSR)** - Fast initial page loads
- ✅ **Static Site Generation (SSG)** - Optimized performance
- ✅ **TypeScript** - Type safety and better DX
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Accessibility** - WCAG 2.1 AA compliant
- ✅ **Performance** - Optimized bundle size and loading
- ✅ **SEO Optimized** - Meta tags, sitemap, structured data
- ✅ **Error Handling** - Graceful error boundaries
- ✅ **Lazy Loading** - Optimized resource loading

---

## 📁 **Project Structure**

```
VR-NEXTGEN/
├── 📁 public/                    # Static assets
│   ├── 📁 icons/                 # Logo variants
│   │   └── 📁 optimized/         # WebP optimized logos
│   ├── 📁 images/                # Images and photos
│   │   └── 📁 optimized/         # WebP optimized images
│   ├── favicon.ico               # Site favicon
│   ├── robots.txt                # SEO robots file
│   └── sitemap.xml               # SEO sitemap
├── 📁 src/                       # Source code
│   ├── 📁 components/            # React components
│   │   ├── 📁 common/            # Reusable UI components
│   │   │   ├── Button.tsx        # Enhanced button component
│   │   │   ├── ErrorBoundary.tsx # Error handling
│   │   │   ├── LazyWrapper.tsx   # Lazy loading wrapper
│   │   │   └── Logo.tsx          # Company logo
│   │   ├── 📁 layout/            # Layout components
│   │   │   ├── Header.tsx        # Navigation header
│   │   │   ├── Footer.tsx        # Site footer
│   │   │   └── Layout.tsx        # Main layout wrapper
│   │   ├── 📁 sections/          # Page sections
│   │   │   ├── 📁 hero/          # Hero sections
│   │   │   ├── 📁 services/      # Services sections
│   │   │   ├── 📁 what-we-do/    # What we do sections
│   │   │   ├── 📁 who-we-are/    # Who we are sections
│   │   │   └── 📁 why-choose-us/ # Why choose us sections
│   │   └── 📁 contact/           # Contact components
│   ├── 📁 hooks/                 # Custom React hooks
│   │   ├── useNavigation.ts      # Navigation logic
│   │   ├── useParallax.ts        # Parallax effects
│   │   ├── useTypewriter.ts      # Typewriter animation
│   │   └── useEnhancedNavigation.ts # Enhanced navigation
│   ├── 📁 utils/                 # Utility functions
│   │   ├── constants.ts          # App constants
│   │   ├── errorHandling.ts      # Error handling utilities
│   │   ├── performance.ts        # Performance utilities
│   │   └── security.ts           # Security utilities
│   ├── 📁 design-system/         # Design tokens
│   │   └── tokens.ts             # Centralized design system
│   ├── 📁 config/                # App configuration
│   │   └── app-config.ts         # Feature flags and settings
│   ├── 📁 contexts/              # React contexts
│   │   └── ThemeContext.tsx      # Theme management
│   ├── 📁 services/              # API services
│   │   └── api.ts                # API client
│   ├── 📁 styles/                # Global styles
│   │   └── globals.css           # Global CSS and Tailwind
│   ├── 📁 pages/                 # Next.js pages
│   │   ├── index.tsx             # Home page
│   │   ├── what-we-do.tsx        # What we do page
│   │   ├── who-we-are.tsx        # Who we are page
│   │   ├── contact.tsx           # Contact page
│   │   ├── nextgen-blog.tsx      # Blog page
│   │   └── 📁 api/               # API routes
│   └── middleware.ts             # Next.js middleware
├── 📁 scripts/                   # Build and optimization scripts
├── 📁 GUIDE/                     # Documentation
│   ├── VR-nextgen-guide.md       # Development guide
│   └── VR-nextgen-bestpractices.md # Best practices
├── package.json                  # Dependencies and scripts
├── next.config.ts                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── vercel.json                   # Vercel deployment configuration
└── README.md                     # This file
```

---

## 🎨 **Design System**

### **Color Palette**

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary Black** | `#000000` | Main backgrounds, headers |
| **Deep Charcoal** | `#231F20` | Text, secondary backgrounds |
| **Gold** | `#FFD700` | Accents, buttons, highlights |
| **Gold Dark** | `#AD974F` | Hover states |
| **Gold Darker** | `#8E793E` | Active states |
| **White** | `#FFFFFF` | Text on dark backgrounds |
| **Light Grey** | `#EAEAEA` | Section dividers |

### **Typography**

- **Headings**: Geist Sans (system font stack)
- **Body Text**: Geist Sans (system font stack)
- **Font Sizes**: Responsive scaling with Tailwind
- **Line Heights**: Optimized for readability

### **Breakpoints**

| Size | Width | Usage |
|------|-------|-------|
| **xs** | 320px | Mobile phones |
| **sm** | 640px | Large phones |
| **md** | 768px | Tablets |
| **lg** | 1024px | Small laptops |
| **xl** | 1280px | Desktops |

---

## 🔧 **Development**

### **Getting Started**

1. **Clone and Install**
   ```bash
   git clone https://github.com/Tir25/VR-NEXTGEN.git
   cd VR-NEXTGEN
   npm install
   ```

2. **Start Development**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   - Navigate to `http://localhost:3000`

### **Development Guidelines**

- **Component Structure**: Use functional components with TypeScript
- **Styling**: Use Tailwind CSS classes, avoid custom CSS when possible
- **State Management**: Use React hooks (useState, useEffect, useContext)
- **Error Handling**: Wrap components with ErrorBoundary
- **Performance**: Use LazyWrapper for heavy components
- **Accessibility**: Include ARIA labels and semantic HTML

### **Code Quality Tools**

- **ESLint**: Code linting and best practices
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Husky**: Git hooks (if configured)

---

## 🚀 **Deployment**

### **Vercel Deployment**

1. **Connect Repository**
   - Import project from GitHub to Vercel
   - Configure build settings (auto-detected)

2. **Environment Variables**
   - No environment variables required for basic deployment
   - Add any API keys or configuration as needed

3. **Deploy**
   - Automatic deployments on push to main branch
   - Preview deployments for pull requests

### **Build Optimization**

```bash
# Full optimization pipeline
npm run build:optimized

# Individual optimizations
npm run optimize:images  # Optimize images to WebP
npm run optimize:css     # Purge unused CSS
npm run optimize:logos   # Optimize logo variants
```

---

## 📚 **Documentation**

### **Guides**

- **[Development Guide](./GUIDE/VR-nextgen-guide.md)** - Comprehensive development documentation
- **[Best Practices](./GUIDE/VR-nextgen-bestpractices.md)** - Coding standards and best practices

### **Component Documentation**

- **[Button Component](./src/components/common/Button.tsx)** - Enhanced button with variants
- **[ErrorBoundary](./src/components/common/ErrorBoundary.tsx)** - Error handling component
- **[Navigation System](./src/components/layout/Header.tsx)** - Responsive navigation

### **API Documentation**

- **[Contact API](./src/pages/api/contact.ts)** - Contact form submission endpoint

---

## 🤝 **Contributing**

### **Development Workflow**

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the coding standards
4. **Test your changes**: `npm run lint && npm run type-check`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### **Coding Standards**

- Use TypeScript for all new code
- Follow the existing component structure
- Write meaningful commit messages
- Test your changes thoroughly
- Ensure responsive design
- Maintain accessibility standards

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 **Support**

For support, email [info@vrnextgensolutions.com](mailto:info@vrnextgensolutions.com) or create an issue in this repository.

---

**Built with ❤️ by VR NextGEN Solutions**