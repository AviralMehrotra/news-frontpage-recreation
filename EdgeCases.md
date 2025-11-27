# Testing & Edge Cases

## Test Scenarios

### 1. Article Without Image

**Scenario**: NewsAPI returns article with `urlToImage: null` or invalid image URL
**Current Handling**:

```javascript
// SafeImage component automatically handles missing images
const [imgSrc, setImgSrc] = useState(
  isValidImageUrl(src) ? src : PLACEHOLDER_IMAGE
);

const handleError = () => {
  setImgSrc(PLACEHOLDER_IMAGE);
};
```

**Result**:

- Displays placeholder image (`/images/placeholder-news.jpg`)
- Layout remains consistent
- No broken image icons

### 2. API Returns No Articles

**Scenario**: Empty response from NewsAPI (no articles found)
**Current Handling**:

```javascript
// In NewsGrid component
{
  articles.length === 0 ? (
    <div className="col-span-full text-center py-12">
      <p className="text-gray-600 text-lg">
        No news articles available at the moment.
      </p>
      <p className="text-gray-500 mt-2">Please check back later for updates.</p>
    </div>
  ) : (
    articles.map((article) => <NewsCard key={article.id} article={article} />)
  );
}
```

**Result**:

- Shows user-friendly "No news available" message
- Maintains page layout structure
- Provides clear feedback to users

### 3. Long Article Titles

**Scenario**: Article titles exceeding normal length limits
**Current Handling**:

```css
/* NewsCard title styling */
.news-card-title {
  @apply text-lg font-semibold text-gray-900 mb-2 line-clamp-2;
}

/* Hero section title */
.hero-title {
  @apply text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight;
}
```

**Result**:

- Titles truncate with ellipsis after 2 lines
- Consistent card heights maintained
- Responsive text sizing

## Error State Handling

### 1. Show a fallback / "No news available" UI when data fetch fails

**Answer**: When the NewsAPI fetch fails (network errors, API downtime, rate limiting), the application handles it through a comprehensive error handling system:

- **API Level**: The `fetchTopHeadlines` function wraps all API calls in try-catch blocks and returns an error object when failures occur.
- **Page Level**: Components check for error states and render a dedicated fallback UI instead of the normal content.
- **Fallback UI**: Displays a centered error message with "Unable to Load News" heading, explains the technical difficulty.
- **Layout Preservation**: The error UI maintains the same page structure (Header/Footer) so users don't feel completely lost.
- **User-Friendly Messaging**: Uses clear, non-technical language like "We're experiencing technical difficulties" instead of showing raw error messages.

The system gracefully degrades from showing news content to showing a helpful error state, ensuring users always see something meaningful rather than a broken page.

### 2. Gracefully handle loading state (while data is being fetched)

**Answer**: The application implements skeleton loading components that provide immediate visual feedback during data fetching:

- **Skeleton Components**: Created `NewsCardSkeleton` components that exactly match the dimensions and layout of actual news cards.
- **Visual Consistency**: Skeleton loaders use the same spacing, proportions, and grid layout as real content, so the page doesn't jump when content loads.
- **Animated Placeholders**: Uses Tailwind's `animate-pulse` class to create subtle pulsing animations that indicate loading is in progress.
- **Progressive Loading**: Shows skeleton cards immediately while API calls are happening in the background, then smoothly transitions to real content.
- **Grid Preservation**: Maintains the responsive grid system (1/2/3 columns) during loading so users understand the final layout structure.
- **Multiple Skeletons**: Displays 6 skeleton cards to fill the initial viewport, giving users a sense of the content volume coming.
