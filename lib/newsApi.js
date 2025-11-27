const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE_URL = "https://newsapi.org/v2";

export async function fetchTopHeadlines(
  country = "in",
  category = null,
  pageSize = 20
) {
  try {
    // For development, return mock data
    if (process.env.NODE_ENV === "development" || !NEWS_API_KEY) {
      return getMockNews();
    }

    const params = new URLSearchParams({
      country,
      apiKey: NEWS_API_KEY,
      pageSize: pageSize.toString(),
    });

    if (category) {
      params.append("category", category);
    }

    const response = await fetch(
      `${NEWS_API_BASE_URL}/top-headlines?${params}`
    );

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }

    const data = await response.json();

    return {
      articles: data.articles.map((article) => ({
        id: generateSlug(article.title),
        title: article.title,
        excerpt: article.description,
        content: article.content,
        image: article.urlToImage,
        category: category || "General",
        publishedAt: article.publishedAt,
        author: article.author || "Unknown",
        slug: generateSlug(article.title),
        url: article.url,
      })),
      totalResults: data.totalResults,
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return getMockNews();
  }
}

export async function fetchArticleBySlug(slug) {
  try {
    // For development, return mock article
    if (process.env.NODE_ENV === "development" || !NEWS_API_KEY) {
      return getMockArticle(slug);
    }

    // In production, you might need to store articles in a database
    // or use a different approach since NewsAPI doesn't support slug-based queries
    return getMockArticle(slug);
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getMockNews() {
  return {
    articles: [
      {
        id: "1",
        title: "Breaking: Major Political Development in Delhi",
        excerpt:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        content: "Full article content here...",
        image: "https://placehold.co/600x400",
        category: "Politics",
        publishedAt: new Date().toISOString(),
        author: "News Reporter",
        slug: "breaking-political-development-delhi",
      },
      {
        id: "2",
        title: "Cricket World Cup: India Wins Against Australia",
        excerpt:
          "In a thrilling match, India defeats Australia by 6 wickets in the World Cup semi-final.",
        content: "Full article content here...",
        image: "https://placehold.co/600x400",
        category: "Sports",
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        author: "Sports Reporter",
        slug: "sports-cricket-match-results",
      },
      {
        id: "3",
        title: "Bollywood Star Announces New Movie Project",
        excerpt:
          "Popular actor reveals details about upcoming blockbuster film with renowned director.",
        content: "Full article content here...",
        image: "https://placehold.co/600x400",
        category: "Entertainment",
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        author: "Entertainment Reporter",
        slug: "entertainment-bollywood-news",
      },
    ],
    totalResults: 3,
  };
}

function getMockArticle(slug) {
  const articles = getMockNews().articles;
  return articles.find((article) => article.slug === slug) || null;
}
