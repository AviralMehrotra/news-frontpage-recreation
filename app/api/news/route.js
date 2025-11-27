import { NextResponse } from "next/server";

// Mock news data - replace with actual NewsAPI integration
const mockNewsData = [
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
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit")) || 10;

    let filteredNews = mockNewsData;

    if (category) {
      filteredNews = mockNewsData.filter(
        (article) => article.category.toLowerCase() === category.toLowerCase()
      );
    }

    const limitedNews = filteredNews.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: limitedNews,
      total: filteredNews.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
