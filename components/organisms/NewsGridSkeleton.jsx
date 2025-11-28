import NewsCardSkeleton from "../molecules/NewsCardSkeleton";

/**
 * Skeleton loading component for NewsGrid
 * Shows placeholder cards while news data is being fetched
 * Matches the exact layout of NewsGrid to prevent layout shift
 */
export default function NewsGridSkeleton({ count = 6 }) {
  return (
    // Same responsive grid layout as NewsGrid
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Generate skeleton cards based on count prop */}
      {Array.from({ length: count }).map((_, index) => (
        <NewsCardSkeleton key={index} />
      ))}
    </div>
  );
}
