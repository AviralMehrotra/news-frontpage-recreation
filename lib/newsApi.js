const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE_URL =
  process.env.NEWS_API_BASE_URL || "https://newsapi.org/v2";

export async function fetchTopHeadlines(
  country = "us",
  category = null,
  pageSize = 20
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
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`NewsAPI error: ${response.status}`);
  }

  const data = await response.json();
  
  return {
    articles: data.articles
      .filter(article => article.title && article.title !== "[Removed]")
      .map(article => ({
        id: generateSlug(article.title),
        title: article.title,
        excerpt: article.description || "No description available",
        content: article.content || article.description || "Content not available",
        image: article.urlToImage,
        category: category || "General",
        publishedAt: article.publishedAt,
        author: article.author || article.source?.name || "Unknown",
        slug: generateSlug(article.title),
        url: article.url,
      })),
    totalResults: data.totalResults,
  };
}

export async function fetchArticleBySlug(slug) {
  try {
    const newsData = await fetchTopHeadlines("us", null, 100);
    return newsData.articles.find((article) => article.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 100);
}
