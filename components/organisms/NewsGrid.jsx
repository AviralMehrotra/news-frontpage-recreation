import NewsCard from '../molecules/NewsCard';

/**
 * Responsive news grid component
 * Displays news articles in a responsive grid layout
 */
export default function NewsGrid({ stories = [] }) {
  // Handle empty state when no articles are available
  if (!stories.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No news articles available at the moment.</p>
      </div>
    );
  }

  return (
    // Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <NewsCard key={story.id} article={story} />
      ))}
    </div>
  );
}