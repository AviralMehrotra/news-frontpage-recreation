const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE_URL =
  process.env.NEWS_API_BASE_URL || "https://newsapi.org/v2";

export async function fetchTopHeadlines(
  country = "us", // Free NewsAPI plan only supports US headlines
  category = null, // News category filter
  pageSize = 20 // Number of articles to fetch
) {
  if (!NEWS_API_KEY) {
    throw new Error("NEWS_API_KEY is not configured");
  }

  const params = new URLSearchParams({
    country,
    apiKey: NEWS_API_KEY,
    pageSize: pageSize.toString(),
  });

  if (category) {
    params.append("category", category);
  }

  const response = await fetch(`${NEWS_API_BASE_URL}/top-headlines?${params}`, {
    next: { revalidate: 300 }, // ISR: Cache for 5 minutes for optimal performance
  });

  if (!response.ok) {
    throw new Error(`NewsAPI error: ${response.status}`);
  }

  const data = await response.json();

  return {
    articles: data.articles
      // Filter out removed/invalid articles from NewsAPI
      .filter((article) => article.title && article.title !== "[Removed]")
      // Transform API data to consistent internal format
      .map((article) => ({
        id: generateSlug(article.title),
        title: article.title,
        excerpt: article.description || "No description available", // Fallback for missing descriptions
        content:
          article.content || article.description || "Content not available",
        image: article.urlToImage, // May be null - handled by SafeImage component
        category: category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : "General",
        publishedAt: article.publishedAt,
        author: article.author || article.source?.name || "Unknown", // Fallback chain for author
        slug: generateSlug(article.title), // URL-friendly identifier
        url: article.url,
      })),
    totalResults: data.totalResults,
  };
}

//  Generates URL-friendly slug from article title
//  Used for routing and unique identification

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/(^-|-$)/g, "") // Remove leading/trailing hyphens
    .substring(0, 100); // Limit length for URL compatibility
}
