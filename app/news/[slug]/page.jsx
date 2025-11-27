import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import Header from '../../../components/organisms/Header';

// ISR: Revalidate article pages every 10 minutes
export const revalidate = 600;

// Generate static params for popular articles
export async function generateStaticParams() {
  // This would fetch popular article slugs from API
  return [
    { slug: 'breaking-political-development-delhi' },
    { slug: 'sports-cricket-match-results' },
    { slug: 'entertainment-bollywood-news' },
  ];
}

async function getArticle(slug) {
  // Mock article data - replace with actual API call
  const mockArticle = {
    id: slug,
    title: 'Breaking: Major Political Development in Delhi',
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
      
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
    image: '/api/placeholder/800/500',
    category: 'Politics',
    publishedAt: new Date().toISOString(),
    author: 'News Reporter',
    excerpt: 'Major political developments unfold in the national capital...'
  };

  if (!mockArticle) {
    return null;
  }

  return mockArticle;
}

export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | Live Hindustan`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="inline-block bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              {article.author}
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              {new Date(article.publishedAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <button className="flex items-center hover:text-blue-600 transition-colors">
              <Share2 size={16} className="mr-2" />
              Share
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <Image
            src={article.image}
            alt={article.title}
            width={800}
            height={500}
            className="w-full h-auto rounded-lg shadow-lg"
            priority
          />
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Published on {new Date(article.publishedAt).toLocaleDateString('en-IN')}
            </div>
            <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <Share2 size={16} className="mr-2" />
              Share Article
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
}