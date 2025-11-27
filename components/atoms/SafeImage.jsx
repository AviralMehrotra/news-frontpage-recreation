'use client';

import Image from 'next/image';
import { useState } from 'react';

const PLACEHOLDER_IMAGE = '/images/placeholder-image.jpg';

function isValidImageUrl(url) {
  return url && typeof url === 'string' && url.trim() !== '' && url.startsWith('http');
}

export default function SafeImage({ 
  src, 
  alt = 'News image', 
  width, 
  height, 
  fill,
  className = '',
  priority = false,
  ...props 
}) {
  const [imgSrc, setImgSrc] = useState(isValidImageUrl(src) ? src : PLACEHOLDER_IMAGE);

  const handleError = () => {
    setImgSrc(PLACEHOLDER_IMAGE);
  };

  const imageProps = fill 
    ? { fill: true }
    : { width: width || 600, height: height || 400 };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
      {...imageProps}
      {...props}
    />
  );
}