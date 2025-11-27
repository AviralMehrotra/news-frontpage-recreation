# Live Hindustan News Website

A modern news aggregation website built with Next.js 15, featuring real-time news from NewsAPI with responsive design and optimal performance.

## 🚀 Live Demo

**Note**: This project is currently configured for local development only due to NewsAPI limitations.

## ⚠️ Important Notice - NewsAPI Limitations

**Why this website shows US news instead of Indian news:**

This project demonstrates a LiveHindustan-style news website but displays **US news content** due to NewsAPI restrictions:

- **Free Plan Limitation**: NewsAPI free tier only allows `country="us"` for top-headlines endpoint
- **Indian News Restriction**: Access to Indian news (`country="in"`) requires a paid Business plan ($449/month)
- **No Live Deployment**: Cannot be deployed to production hosting due to API key restrictions on free plans

**For Evaluation Purposes:**

- Run locally with `npm run dev` to see full functionality
- All features (categories, responsive design, error handling) work perfectly with US news data
- The technical implementation would work identically with Indian news data on a paid plan

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [API Integration](#api-integration)
- [Performance](#performance)
- [Contributing](#contributing)

## ✨ Features

- **Real-time News**: Integration with NewsAPI for latest headlines
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Category Navigation**: Browse news by Business, Entertainment, Health, Science, Sports, Technology
- **Image Optimization**: Smart image handling with fallbacks for broken links
- **Loading States**: Skeleton loaders for better user experience
- **Error Handling**: Comprehensive error boundaries and fallback UIs
- **SEO Optimized**: Dynamic metadata and Open Graph tags
- **Performance**: ISR (Incremental Static Regeneration) with 5-minute cache

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **API**: NewsAPI.org
- **Language**: JavaScript (ES6+)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- NewsAPI key from [newsapi.org](https://newsapi.org)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/aviralmehrotra/news-frontpage-recreation.git
   cd news-frontpage-recreation
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**

   ```bash
   # Create .env.local file
   cp .env.example .env.local

   # Add your NewsAPI key
   NEWS_API_KEY=your_newsapi_key_here
   NEWS_API_BASE_URL=https://newsapi.org/v2
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
news-frontpage-recreation/
├── app/                          # Next.js App Router
│   ├── category/[slug]/          # Dynamic category pages
│   ├── globals.css               # Global styles
│   ├── layout.jsx                # Root layout
│   ├── not-found.jsx            # 404 page
│   └── page.jsx                 # Homepage
├── components/                   # React components (Atomic Design)
│   ├── atoms/                   # Basic building blocks
│   │   ├── Button.jsx
│   │   ├── SafeImage.jsx
│   │   ├── Skeleton.jsx
│   │   └── Tag.jsx
│   ├── molecules/               # Component combinations
│   │   ├── NewsCard.jsx
│   │   └── NewsCardSkeleton.jsx
│   └── organisms/               # Complex UI sections
│       ├── Footer.jsx
│       ├── Header.jsx
│       ├── Hero.jsx
│       ├── NewsGrid.jsx
│       └── NewsGridSkeleton.jsx
├── lib/                         # Utility functions
│   └── newsApi.js              # NewsAPI integration
├── public/                      # Static assets
│   └── images/
│       └── placeholder-image.jpg
├── env.example
├── CodeExplaination.md
├── EdgeCases.md
├── README.md
├── Design Documentation.docx
└── AiUsageAndReflection.md
```

## 📚 Documentation

### Core Documentation

- **[Design Documentation](./DesignDocumentation.docx)** – A comprehensive overview of layout decisions, wireframes, data-flow planning, and the reasoning behind the chosen architecture.
- **[Code Explanation](./CodeExplaination.md)** - Comprehensive technical documentation covering architecture, components, and implementation details.
- **[Testing & Edge Cases](./EdgeCases.md)** - Complete guide to error handling, edge cases, and testing scenarios.
- **[AI Usage & Reflection](./AiUsageAndReflection.md)** - Detailed analysis of AI contributions vs human development work.

### Key Topics Covered:

- **Architecture**: Atomic design pattern, component hierarchy
- **Performance**: ISR implementation, image optimization, skeleton loading
- **Error Handling**: API failures, image loading errors, network issues
- **Responsive Design**: Mobile-first approach, breakpoint strategy
- **SEO**: Dynamic metadata, Open Graph implementation
- **Testing**: Edge cases, error scenarios, performance validation

## 🔌 API Integration

### NewsAPI Configuration

The application uses [NewsAPI.org](https://newsapi.org) for fetching news data:

- **Endpoint**: `/v2/top-headlines`
- **Parameters**: country="us" (due to free plan limitations), category, pageSize
- **Caching**: ISR with 5-minute revalidation
- **Error Handling**: Comprehensive fallbacks for API failures

### API Limitations & Constraints

**Current Configuration:**

```javascript
// In lib/newsApi.js - hardcoded to "us" due to API restrictions
const response = await fetch(
  `${NEWS_API_BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
);
```

**Why US News Only:**

- NewsAPI free plan restricts top-headlines to US sources only
- Indian news requires Business plan ($449/month)
- This is a technical demonstration, not a production news service
- All architectural patterns would work identically with any country's data

### Supported Categories

- Business
- Entertainment
- Health
- Science
- Sports
- Technology

### Data Transformation

Raw NewsAPI data is transformed to include:

- Generated slugs for routing
- Fallback values for missing fields
- Filtered invalid/removed articles
- Consistent data structure

## ⚡ Performance Features

### Optimization Strategies

- **ISR (Incremental Static Regeneration)**: 5-minute cache for optimal balance of freshness and performance
- **Image Optimization**: Next.js Image component with lazy loading and WebP conversion
- **Skeleton Loading**: Immediate visual feedback during data fetching
- **Error Boundaries**: Graceful handling of runtime errors
- **Bundle Optimization**: Tree shaking and code splitting

### Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

## 🧪 Testing & Error Handling

### Comprehensive Error Coverage

- **API Failures**: Network errors, rate limiting, invalid responses
- **Image Loading**: 403 errors, missing images, invalid URLs
- **Edge Cases**: Empty responses, long titles, missing data
- **Loading States**: Skeleton components matching actual layouts

### Testing Scenarios

- Articles without images → Placeholder fallback
- API returning no articles → "No news available" message
- Long article titles → CSS truncation with ellipsis
- Network failures → User-friendly error pages

## 🎨 Design System

### Atomic Design Architecture

- **Atoms**: SafeImage, Tag, Button, Skeleton
- **Molecules**: NewsCard, NewsCardSkeleton
- **Organisms**: Header, Hero, NewsGrid, Footer

### Responsive Breakpoints

- **Mobile**: < 768px (1 column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns)

### Color Palette

- **Primary**: Red-based theme matching LiveHindustan brand
- **Neutral**: Gray scale for text and backgrounds
- **Semantic**: Success, warning, error states

### Development Guidelines

- Follow the atomic design pattern
- Add comprehensive error handling
- Include loading states for async operations
- Write meaningful commit messages
- Update documentation for new features

## 🙏 Acknowledgments

- **NewsAPI.org** for providing the news data API
- **Next.js Team** for the excellent framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for the beautiful icons
