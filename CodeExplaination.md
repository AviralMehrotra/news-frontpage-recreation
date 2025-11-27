# Live Hindustan News Website - Code Explanation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Component Structure](#component-structure)
3. [Data Model & API Integration](#data-model--api-integration)
4. [Routing & Navigation](#routing--navigation)
5. [Challenges & Solutions](#challenges--solutions)
6. [Performance Optimizations](#performance-optimizations)
7. [Future Improvements](#future-improvements)

## Architecture Overview

### Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component
- **Data Fetching**: NewsAPI with ISR (Incremental Static Regeneration)

### Design Pattern: Atomic Design

The project follows atomic design methodology for component organization:

```
components/
├── atoms/          # Basic building blocks
├── molecules/      # Simple combinations of atoms
└──organisms/       # Complex UI sections
```

## Component Structure

### Atoms (Basic Building Blocks)

#### 1. SafeImage Component

**Purpose**: Handles image loading with error fallbacks and placeholder support.
**Key Features**:

- Validates image URLs (must start with 'http')
- Graceful fallback to placeholder image on error
- Supports both `fill` and `width/height` props
- Error handling for 403/404 image responses

```javascript
// Usage Examples
<SafeImage src={article.image} alt={article.title} fill />
<SafeImage src={article.image} width={600} height={400} />
```

**Implementation Details**:

- Uses `useState` to manage image source
- `onError` handler switches to placeholder
- Supports all Next.js Image component props

#### 2. Tag Component

**Purpose**: Reusable category/status tags with consistent styling.
**Variants**:

- `primary` (red) - Default for news categories
- `secondary` (gray) - For less important tags
- `success` (green) - For positive news
- `warning` (yellow) - For alerts/warnings

```javascript
// Usage Examples
<Tag variant="primary">{article.category}</Tag>
<Tag variant="secondary" className="text-sm">Breaking</Tag>
```

#### 3. Button Component

**Purpose**: Unified button component supporting both buttons and links.
**Features**:

- Multiple variants: `primary`, `secondary`, `outline`
- Multiple sizes: `sm`, `md`, `lg`
- Automatic Link wrapper when `href` prop provided
- Supports all button and Link props

```javascript
// Button Examples
<Button variant="primary" onClick={handleClick}>Click Me</Button>
<Button href="/category/sports" variant="outline">Sports News</Button>
```

#### 4. Skeleton Component

**Purpose**: Loading animation for better perceived performance.

```javascript
// Usage
<Skeleton className="h-6 w-3/4 mb-2" />
<Skeleton className="aspect-16/10 w-full" />
```

### Molecules (Component Combinations)

#### 1. NewsCard Component

**Purpose**: Individual news article display card.

**Structure**:

```javascript
<article className="bg-white rounded-lg shadow-md">
  <div className="relative aspect-16/10">
    <SafeImage src={article.image} alt={article.title} fill />
    <Tag>{article.category}</Tag>
  </div>
  <div className="p-4">
    <h3>
      <Link href={article.url}>{article.title}</Link>
    </h3>
    <p>{article.excerpt}</p>
    <div className="metadata">
      <span>
        <User /> {article.author}
      </span>
      <span>
        <Calendar /> {formattedDate}
      </span>
    </div>
  </div>
</article>
```

**Key Features**:

- Responsive aspect ratio (16:10)
- Hover effects for better UX
- External link to original article
- Metadata display (author, date)
- Category tag overlay on image

#### 2. NewsCardSkeleton Component

**Purpose**: Loading state that mimics NewsCard layout.

**Design Philosophy**:

- Matches exact dimensions of actual NewsCard
- Uses consistent spacing and proportions
- Provides visual feedback during loading

### Organisms (Complex UI Sections)

#### 1. Header Component

**Purpose**: Main navigation with responsive mobile menu.
**Features**:

- **Desktop Navigation**: Horizontal menu with category links
- **Mobile Navigation**: Hamburger menu with slide-down panel
- **Logo**: Live Hindustan branding
- **Action Buttons**: Search, notifications (placeholder)

**State Management**:

```javascript
const [isMenuOpen, setIsMenuOpen] = useState(false);
```

**Mobile Menu Implementation**:

- Toggle between hamburger (☰) and close (✕) icons
- Conditional rendering of mobile menu
- Auto-close on link click for better UX

#### 2. Hero Component

**Purpose**: Featured story showcase on homepage.
**Layout**:

- **Desktop**: Side-by-side image and content (50/50 split)
- **Mobile**: Stacked layout (image top, content bottom)
- **Content**: Category tag, title, excerpt, author, date, CTA button

**Responsive Design**:

```javascript
<div className="grid md:grid-cols-2 gap-8 items-center">
  <div className="order-2 md:order-1">{/* Content */}</div>
  <div className="order-1 md:order-2">{/* Image */}</div>
</div>
```

#### 3. NewsGrid Component

**Purpose**: Responsive grid layout for multiple news articles.
**Grid System**:

- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 3 columns

```css
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
```

**Error Handling**:

- Displays message when no articles available
- Graceful degradation for API failures

#### 4. Footer Component

**Purpose**: Comprehensive site footer with multiple sections.
**Sections**:

1. **Brand Section**: Logo, description, social media links
2. **Categories**: Quick links to all news categories
3. **Quick Links**: About, Contact, Privacy, Terms
4. **Contact Info**: Email, phone, location with icons

**Layout**:

- **Desktop**: 4-column grid
- **Mobile**: Stacked single column
- **Bottom Bar**: Copyright and legal links

**Social Media Integration**:

```javascript
const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Youtube, href: "#" },
];
```

## Data Model & API Integration

### Article Data Structure

```javascript
{
  id: "generated-slug-from-title",
  title: "Breaking: Major Political Development in Delhi",
  excerpt: "Brief description for card preview",
  content: "Full article content (often truncated by NewsAPI)",
  image: "https://external-image-url.jpg",
  category: "Politics", // Capitalized for display
  publishedAt: "2024-01-01T12:00:00Z",
  author: "Author Name" || "Source Name" || "Unknown",
  slug: "breaking-major-political-development-delhi",
  url: "https://original-news-source.com/article"
}
```

### NewsAPI Integration

#### Configuration

```javascript
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE_URL = "https://newsapi.org/v2";
```

#### Data Fetching Function

```javascript
export async function fetchTopHeadlines(
  country = "us",
  category = null,
  pageSize = 20
) {
  const params = new URLSearchParams({
    country,
    apiKey: NEWS_API_KEY,
    pageSize: pageSize.toString(),
  });

  if (category) {
    params.append("category", category);
  }

  const response = await fetch(`${NEWS_API_BASE_URL}/top-headlines?${params}`, {
    next: { revalidate: 300 }, // ISR: 5-minute cache
  });

  const data = await response.json();

  return {
    articles: data.articles
      .filter((article) => article.title && article.title !== "[Removed]")
      .map(transformArticle),
    totalResults: data.totalResults,
  };
}
```

#### Data Transformation

```javascript
function transformArticle(article) {
  return {
    id: generateSlug(article.title),
    title: article.title,
    excerpt: article.description || "No description available",
    content: article.content || article.description || "Content not available",
    image: article.urlToImage,
    category: category ? capitalizeFirst(category) : "General",
    publishedAt: article.publishedAt,
    author: article.author || article.source?.name || "Unknown",
    slug: generateSlug(article.title),
    url: article.url,
  };
}
```

### ISR (Incremental Static Regeneration) Strategy

**Implementation**:

```javascript
// Page level
export const revalidate = 300; // 5 minutes

// API level
fetch(url, { next: { revalidate: 300 } });
```

**Benefits**:

- **Performance**: Static pages load instantly
- **Freshness**: Content updates every 5 minutes
- **SEO**: Pre-rendered pages for search engines
- **Scalability**: Reduces API calls and server load

**Trade-offs**:

- Content can be up to 5 minutes stale
- More complex than client-side fetching
- Requires careful cache invalidation strategy

## Routing & Navigation

### App Router Structure

```
app/
├── page.jsx                    # Homepage (/)
├── category/[slug]/page.jsx    # Category pages (/category/business)
├── not-found.jsx              # 404 page
├── layout.jsx                 # Root layout
└── globals.css                # Global styles
```

### Dynamic Category Routes

#### Static Generation

```javascript
export async function generateStaticParams() {
  return [
    { slug: "business" },
    { slug: "entertainment" },
    { slug: "health" },
    { slug: "science" },
    { slug: "sports" },
    { slug: "technology" },
  ];
}
```

#### Metadata Generation

```javascript
export async function generateMetadata({ params }) {
  const { slug: category } = await params;
  const categoryName = capitalizeFirst(category);

  return {
    title: `${categoryName} News | Live Hindustan`,
    description: `Latest ${category} news and updates...`,
  };
}
```

### Navigation Logic

#### Header Navigation

```javascript
const categories = [
  { name: "Business", href: "/category/business" },
  { name: "Entertainment", href: "/category/entertainment" },
  // ... more categories
];
```

#### External Article Links

**Decision**: Link to original news sources instead of creating internal article pages.
**Reasoning**:

- Avoids content duplication
- Respects original publishers
- Follows news aggregator pattern
- Reduces legal concerns

```javascript
<Link href={article.url} target="_blank" rel="noopener noreferrer">
  {article.title}
</Link>
```

## Challenges & Solutions

### 1. Next.js 15 Params Promise Issue

**Problem**: In Next.js 15, `params` became a Promise object.

```javascript
// This stopped working
const category = params.slug;
```

**Error**: `Route "/category/[slug]" used params.slug. params is a Promise and must be unwrapped`

**Solution**: Await the params object before accessing properties.

```javascript
// Fixed version
const { slug: category } = await params;
```

**Impact**: Required updates to all dynamic route handlers and metadata functions.

### 2. Image Loading & Error Handling

**Problem**: Many news sites return 403 errors for Next.js image optimization requests.

**Errors**:

```
⨯ upstream image response failed for https://example.com/image.jpg 403
```

**Solution**: Created SafeImage component with comprehensive error handling.

```javascript
const [imgSrc, setImgSrc] = useState(
  isValidImageUrl(src) ? src : PLACEHOLDER_IMAGE
);

const handleError = () => {
  setImgSrc(PLACEHOLDER_IMAGE);
};
```

**Additional Measures**:

- Added placeholder image in `/public/images/`
- URL validation before attempting to load
- Graceful fallback without breaking layout

### 3. Category System Implementation

**Problem**: NewsAPI categories didn't match initial navigation structure.
**NewsAPI Categories**: `business`, `entertainment`, `general`, `health`, `science`, `sports`, `technology`

**Solution**: Updated navigation to match API categories exactly.

```javascript
// Before (mismatched)
<Link href="/politics">Politics</Link>

// After (API-aligned)
<Link href="/category/business">Business</Link>
```

**Data Transformation**:

```javascript
category: category
  ? category.charAt(0).toUpperCase() + category.slice(1)
  : "General";
```

## Performance Optimizations

#### 1. Image Optimization

- Next.js Image component with automatic optimization
- Lazy loading for off-screen images
- Responsive image sizing
- WebP format conversion (automatic)

#### 2. Static Generation with ISR

- Pre-rendered pages for instant loading
- Background revalidation for fresh content
- Reduced server load and API calls

#### 3. Component Optimization

- Minimal re-renders with proper state management
- Efficient prop passing
- Conditional rendering to avoid unnecessary DOM updates

#### 4. Bundle Optimization

- Tree shaking with ES modules
- Dynamic imports for code splitting (potential future improvement)
- Optimized Tailwind CSS with purging
