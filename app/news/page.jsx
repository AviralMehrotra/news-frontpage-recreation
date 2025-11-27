import { Suspense } from 'react';
import Header from '../../components/organisms/Header';
import NewsGrid from '../../components/organisms/NewsGrid';
import { fetchTopHeadlines } from '../../lib/newsApi';

export const metadata = {
  title: 'All News | Live Hindustan',
  description: 'Browse all latest news articles from Live Hindustan. Stay updated with breaking news from India and around the world.',
};

export const revalidate = 300;

async function getAllNews() {
  try {
    const newsData = await fetchTopHeadlines('us', null, 50);
    return newsData.articles;
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return [];
  }
}

export default async function NewsPage() {
  const allNews = await getAllNews();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All News
          </h1>
          <p className="text-gray-600">
            Stay updated with the latest news from India and around the world
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-8">Loading news...</div>}>
          <NewsGrid stories={allNews} />
        </Suspense>
      </main>
    </div>
  );
}