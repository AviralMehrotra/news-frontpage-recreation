import { Suspense } from "react";
import NewsGrid from "../components/organisms/NewsGrid";
import Header from "../components/organisms/Header";
import Hero from "../components/organisms/Hero";

export const metadata = {
  title: "Live Hindustan - Latest News, Breaking News, Hindi News",
  description:
    "Get latest news, breaking news, and top stories from India and around the world. Stay updated with Live Hindustan.",
  keywords: "news, breaking news, latest news, hindi news, india news",
};

// ISR: Revalidate every 5 minutes for fresh news content
export const revalidate = 300;

async function getNewsData() {
  // This will be replaced with actual NewsAPI call
  const mockNews = {
    topStories: [
      {
        id: "1",
        title: "Breaking: Major Political Development in Delhi",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        image: "/api/placeholder/600/400",
        category: "Politics",
        publishedAt: new Date().toISOString(),
        author: "News Reporter",
      },
      // More mock data...
    ],
    categories: [
      "Politics",
      "Sports",
      "Entertainment",
      "Business",
      "Technology",
    ],
  };

  return mockNews;
}

export default async function HomePage() {
  const newsData = await getNewsData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <Hero topStory={newsData.topStories[0]} />

        <div className="container mx-auto px-4 py-8">
          <Suspense
            fallback={<div className="text-center py-8">Loading news...</div>}
          >
            <NewsGrid stories={newsData.topStories} />
          </Suspense>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; Live Hindustan Clone.</p>
        </div>
      </footer>
    </div>
  );
}
