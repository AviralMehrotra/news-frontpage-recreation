import { Suspense } from "react";
import { notFound } from "next/navigation";
import Header from "../../../components/organisms/Header";
import NewsGrid from "../../../components/organisms/NewsGrid";
import NewsGridSkeleton from "../../../components/organisms/NewsGridSkeleton";
import Footer from "../../../components/organisms/Footer";
import { fetchTopHeadlines } from "../../../lib/newsApi";

// NewsAPI supported categories - prevents 404s for invalid categories
const VALID_CATEGORIES = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

// ISR: Revalidate every 5 minutes for fresh content
export const revalidate = 300;

// Pre-generate static pages for all valid categories at build time
export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ slug: category }));
}

// Fetch news for specific category with error handling
async function getCategoryNews(category) {
  try {
    const newsData = await fetchTopHeadlines("us", category, 30);
    return newsData.articles;
  } catch (error) {
    console.error("Failed to fetch category news:", error);
    return []; // Return empty array to prevent page crash
  }
}

// Generate dynamic SEO metadata for each category page
export async function generateMetadata({ params }) {
  const { slug: category } = await params;

  if (!VALID_CATEGORIES.includes(category)) {
    return { title: "Category Not Found" };
  }

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `${categoryName} News | Live Hindustan`,
    description: `Latest ${categoryName.toLowerCase()} news and updates from Live Hindustan. Stay informed with breaking ${categoryName.toLowerCase()} stories.`,
  };
}

// Dynamic category page component
export default async function CategoryPage({ params }) {
  const { slug: category } = await params;

  // Validate category exists, show 404 if invalid
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
            Latest {categoryName.toLowerCase()} news and updates from around the
            world
          </p>
        </div>

        {/* Show skeleton while loading, then render news grid */}
        <Suspense fallback={<NewsGridSkeleton count={12} />}>
          <NewsGrid stories={categoryNews} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
