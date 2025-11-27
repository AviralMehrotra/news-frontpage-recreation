import { Calendar, User } from "lucide-react";
import SafeImage from "../atoms/SafeImage";
import Tag from "../atoms/Tag";
import Button from "../atoms/Button";

export default function Hero({ topStory }) {
  if (!topStory) return null;

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="order-2 md:order-1">
            <div className="mb-4">
              <Tag variant="primary" className="text-sm px-3 py-1">
                {topStory.category}
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {topStory.title}
            </h1>

            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {topStory.excerpt}
            </p>

            <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                {topStory.author}
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {new Date(topStory.publishedAt).toLocaleDateString("en-IN")}
              </div>
            </div>

            <Button href={topStory.url} target="_blank" rel="noopener noreferrer">
              Read Full Story
            </Button>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2">
            <div className="relative aspect-4/3 rounded-lg overflow-hidden shadow-lg">
              <SafeImage
                src={topStory.image}
                alt={topStory.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
