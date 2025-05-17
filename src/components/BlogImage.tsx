'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BlogImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export default function BlogImage({ src, alt, priority = false, className = '' }: BlogImageProps) {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div className={`relative w-full h-96 rounded-lg overflow-hidden shadow-lg ${className}`}>
      <Image
        src={imageError ? '/images/placeholder.jpg' : src}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        priority={priority}
        className={imageError ? 'bg-gray-100' : ''}
        onError={handleImageError}
      />
    </div>
  );
} 