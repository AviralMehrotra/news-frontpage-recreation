import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Header from '../../../components/organisms/Header';
import NewsGrid from '../../../components/organisms/NewsGrid';
import { fetchTopHeadlines } from '../../../lib/newsApi';

const VALID_CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

export const revalidate = 300;

export async function generateStaticParams() {
  return VALID_CATEGORIES.map(category => ({ slug: category }));
}

async function getCategoryNews(category) {
  try {
    const newsData = await fetchTopHeadlines('us', category, 30);
    return newsData.articles;
  } catch (error) {
    console.error('Failed to fetch category news:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug: category } = await params;
  
  if (!VALID_CATEGORIES.includes(category)) {
    return { title: 'Category Not Found' };
  }

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  return {
    title: `${categoryName} News | Live Hindustan`,
    description: `Latest ${categoryName.toLowerCase()} news and updates from Live Hindustan. Stay informed with breaking ${categoryName.toLowerCase()} stories.`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug: category } = await params;
  
  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  const categoryNews = await getCategoryNews(category);
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {categoryName} News
          </h1>
          <p className="text-gray-600">
            Latest {categoryName.toLowerCase()} news and updates from around the world
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-8">Loading {categoryName.toLowerCase()} news...</div>}>
          <NewsGrid stories={categoryNews} />
        </Suspense>
      </main>
    </div>
  );
}