/**
 * Reusable SEO component for consistent metadata across pages
 * Generates dynamic titles, descriptions, and Open Graph tags
 **/
export function generateSEOMetadata({
  title,
  description,
  keywords,
  category = null,
  ogImage = "/images/placeholder-image.jpg",
  url = "https://localhost:3000",
}) {
  const siteTitle = "Live Hindustan";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return {
    title: fullTitle,
    description,
    keywords,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteTitle,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || "Live Hindustan News",
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Predefined SEO configurations
export const SEO_CONFIGS = {
  homepage: {
    title: "Latest News, Breaking News, Hindi News",
    description:
      "Get latest news, breaking news, and top stories from India and around the world. Stay updated with Live Hindustan.",
    keywords: "news, breaking news, latest news, hindi news, india news",
  },

  categories: {
    business: {
      title: "Business News",
      description:
        "Latest business news and updates from Live Hindustan. Stay informed with breaking business stories.",
      keywords: "business news, finance, economy, market news",
    },
    entertainment: {
      title: "Entertainment News",
      description:
        "Latest entertainment news and updates from Live Hindustan. Stay informed with breaking entertainment stories.",
      keywords: "entertainment news, bollywood, movies, celebrities",
    },
    health: {
      title: "Health News",
      description:
        "Latest health news and updates from Live Hindustan. Stay informed with breaking health stories.",
      keywords: "health news, medical news, wellness, healthcare",
    },
    science: {
      title: "Science News",
      description:
        "Latest science news and updates from Live Hindustan. Stay informed with breaking science stories.",
      keywords: "science news, technology, research, innovation",
    },
    sports: {
      title: "Sports News",
      description:
        "Latest sports news and updates from Live Hindustan. Stay informed with breaking sports stories.",
      keywords: "sports news, cricket, football, olympics",
    },
    technology: {
      title: "Technology News",
      description:
        "Latest technology news and updates from Live Hindustan. Stay informed with breaking tech stories.",
      keywords: "technology news, tech, gadgets, software",
    },
  },
};
