import NewsCard from '../molecules/NewsCard';

export default function NewsGrid({ stories = [] }) {
  if (!stories.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No news articles available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <NewsCard key={story.id} article={story} />
      ))}
    </div>
  );
}