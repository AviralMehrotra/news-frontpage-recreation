# AI Use & Reflection Documentation

## Where AI Helped in the Project

I used AI selectively for small, time-saving tasks instead of core development work. The goal was to boost speed in repetitive areas while keeping all architectural, logic-heavy, and design decisions fully human-driven.

### 1. Basic Component Skeletons

AI helped generate simple starter versions of a few components such as the basic structure for the NewsCard, Header, and Footer. These were plain JSX shells that I later expanded with responsive layout, accessibility improvements, animation, and error-handling logic.

### 2. Initial Tailwind Layout Suggestions

AI generated a few standard grid and spacing combinations to speed up the layout foundation. All brand-specific colors, breakpoints, transitions, hover states, and mobile-first refinements were done manually.

### 3. Fetch Logic Boilerplate

AI provided a minimal fetch function using the NewsAPI endpoint as a reference. I rebuilt it with proper error handling, ISR support, transformation pipelines, and filtering of invalid articles.

### 4. Writing the documentations

Even though AI has written 50% of the documentations but most of the parts are corrected and formatted in a better and a presentable way by me.

## What I Built and Improved Manually

### 1. Image Handling & Error Recovery

AI suggested using direct image components without accounting for broken links or null images. I implemented a full fallback system, including validation, dynamic error handlers, and consistent placeholder behavior.

### 2. Next.js 15 Compatibility

AI followed outdated patterns for route params and server functions. I updated everything to match the latest conventions and fixed the runtime issues caused by the older syntax.

### 3. Navigation UX

I redesigned the mobile menu interactions with accessibility labels, transitions, auto-close behavior, and responsive animations. The AI’s original version used a basic toggle without UX considerations.

### 4. Performance & Caching

I added ISR, prefetch strategies, skeleton loaders, and image-loading optimizations. These were by manually testing on slow networks.

### 5. Atomic Design Architecture

AI produced standalone components, but the project was organized manually into atoms, molecules, and organisms to improve clarity and future scaling.

## Verification & Testing Process

### Manual Testing

- Repeated build and lint checks
- Browser console and API error monitoring
- Mobile responsiveness testing
- Slow-network behavior evaluation
- 404 and invalid route handling

### Performance Validation

- Layout shift checks
- Image loading audits
- API caching and ISR verification

### UI/UX Checks

- Accessible navigation
- Dynamic heights and animations
- Consistent fallbacks for missing API fields
- Clean rendering on very small and very large screens

## AI Suggestions That Needed Corrections

### 1. Image Handling

AI didn’t account for broken, blocked, or missing image sources. I replaced the suggestion with a full error-tolerant system that ensures visual consistency.

### 2. Dynamic Page Params

AI used older Next.js patterns. I updated route handling to the new params and fixed associated errors.

### 3. Mobile Navigation

AI proposed a simple state toggle for the menu. I redesigned the entire menu system for better UX, accessibility, and animation.
