import { Suspense } from 'react';
import Header from '../../components/organisms/Header';
import NewsGrid from '../../components/organisms/NewsGrid';

export const metadata = {
  title: 'All News | Live Hindustan',
  description: 'Browse all latest news articles from Live Hindustan. Stay updated with breaking news from India and around the world.',
};

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

async function getAllNews() {
  // Mock news data - replace with actual API call
  const mockNews = [
    {
      id: '1',
      title: 'Breaking: Major Political Development in Delhi',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: '/api/placeholder/400/300',
      category: 'Politics',
      publishedAt: new Date().toISOString(),
      author: 'News Reporter',
      slug: 'breaking-political-development-delhi'
    },
    {
      id: '2',
      title: 'Cricket World Cup: India Wins Against Australia',
      excerpt: 'In a thrilling match, India defeats Australia by 6 wickets...',
      image: '/api/placeholder/400/300',
      category: 'Sports',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      author: 'Sports Reporter',
      slug: 'sports-cricket-match-results'
    },
    {
      id: '3',
      title: 'Bollywood Star Announces New Movie Project',
      excerpt: 'Popular actor reveals details about upcoming blockbuster...',
      image: '/api/placeholder/400/300',
      category: 'Entertainment',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      author: 'Entertainment Reporter',
      slug: 'entertainment-bollywood-news'
    },
  ];

  return mockNews;
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