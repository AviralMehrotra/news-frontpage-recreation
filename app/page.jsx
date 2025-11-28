import { Suspense } from "react";
import NewsGrid from "../components/organisms/NewsGrid";
import NewsGridSkeleton from "../components/organisms/NewsGridSkeleton";
import Header from "../components/organisms/Header";
import Hero from "../components/organisms/Hero";
import Footer from "../components/organisms/Footer";
import { fetchTopHeadlines } from "../lib/newsApi";

// SEO metadata for homepage
export const metadata = {
  title: "Live Hindustan - Latest News, Breaking News, Hindi News",
  description:
    "Get latest news, breaking news, and top stories from India and around the world. Stay updated with Live Hindustan.",
  keywords: "news, breaking news, latest news, hindi news, india news",
};

// ISR: Revalidate homepage every 5 minutes for fresh content
export const revalidate = 300;

// Fetch homepage news data with error handling
async function getNewsData() {
  try {
    const newsData = await fetchTopHeadlines("us", null, 20);
    return {
      topStories: newsData.articles,
      categories: [
        "Business",
        "Entertainment",
        "Health",
        "Science",
        "Sports",
        "Technology",
      ],
    };
  } catch (error) {
    // Return empty stories but keep categories for navigation
    return {
      topStories: [],
      categories: [
        "Business",
        "Entertainment",
        "Health",
        "Science",
        "Sports",
        "Technology",
      ],
    };
  }
}

// Homepage component with hero section and news grid
export default async function HomePage() {
  const newsData = await getNewsData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Show hero section only if we have stories */}
        {newsData.topStories.length > 0 && (
          <Hero topStory={newsData.topStories[0]} />
        )}

        <div className="container mx-auto px-4 py-8">
          {/* Suspense boundary for loading state */}
          <Suspense fallback={<NewsGridSkeleton count={9} />}>
            <NewsGrid stories={newsData.topStories} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
