"use client";

import Image from "next/image";
import { useState } from "react";

// Fallback image for broken/missing images
const PLACEHOLDER_IMAGE = "/images/placeholder-image.jpg";

// Validate if URL is a proper image URL
function isValidImageUrl(url) {
  return (
    url &&
    typeof url === "string" &&
    url.trim() !== "" &&
    url.startsWith("http") // Only allow HTTP/HTTPS URLs
  );
}

/**
 * SafeImage component with automatic fallback for broken images
 * Handles NewsAPI images that often return 403 errors or are missing
 */
export default function SafeImage({
  src,
  alt = "News image",
  width,
  height,
  fill,
  className = "",
  priority = false,
  ...props
}) {
  // Initialize with valid URL or fallback to placeholder
  const [imgSrc, setImgSrc] = useState(
    isValidImageUrl(src) ? src : PLACEHOLDER_IMAGE
  );

  // Switch to placeholder on image load error (403, 404, etc.)
  const handleError = () => {
    setImgSrc(PLACEHOLDER_IMAGE);
  };

  // Handle both fill and fixed dimensions
  const imageProps = fill
    ? { fill: true }
    : { width: width || 600, height: height || 400 };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading={priority ? "eager" : "lazy"}
      {...imageProps}
      {...props}
    />
  );
}
