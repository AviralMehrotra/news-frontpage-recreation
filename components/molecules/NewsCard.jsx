import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

export default function NewsCard({ article }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative aspect-[16/10]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-red-600 transition-colors">
          <Link href={`/news/${article.slug || article.id}`}>
            {article.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <User size={12} className="mr-1" />
            {article.author}
          </div>
          <div className="flex items-center">
            <Calendar size={12} className="mr-1" />
            {new Date(article.publishedAt).toLocaleDateString('en-IN')}
          </div>
        </div>
      </div>
    </article>
  );
}