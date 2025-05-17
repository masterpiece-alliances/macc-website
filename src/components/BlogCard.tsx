'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogCardProps {
  id?: string;
  title: string;
  slug: string;
  featured_image: string | null | undefined;
  excerpt?: string;
  content?: string;
  published_at?: string;
  created_at: string;
  category?: {
    name: string;
    slug: string;
  };
}

export default function BlogCard({ 
  title, 
  slug, 
  featured_image, 
  excerpt, 
  content, 
  published_at, 
  created_at,
  category 
}: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const router = useRouter();
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const handleCardClick = (e: React.MouseEvent) => {
    // 내부 링크 요소가 클릭된 경우 카드 클릭 이벤트 중단
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    
    // 카드 클릭 시 블로그 상세 페이지로 이동
    router.push(`/blog/${slug}`);
  };
  
  return (
    <article 
      className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-[1.02] cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="block w-full aspect-[16/9] relative">
        <Image
          src={imageError ? '/images/placeholder.jpg' : (featured_image || '/images/placeholder.jpg')}
          alt={title}
          fill
          className={`object-cover ${imageError ? 'bg-gray-100' : ''}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={handleImageError}
        />
      </div>
      
      <div className="p-6">
        {category && (
          <Link
            href={`/blog/category/${category.slug}`}
            className="inline-block text-blue-600 text-sm font-medium mb-2 hover:underline z-10 relative"
          >
            {category.name}
          </Link>
        )}
        
        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
          {title}
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt || content?.substring(0, 150)}
        </p>
        
        <div className="flex items-center justify-between">
          <time className="text-gray-500 text-sm">
            {new Date(published_at || created_at).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          
          <Link
            href={`/blog/${slug}`}
            className="text-blue-600 font-medium hover:text-blue-800 transition-colors hover:underline z-10 relative"
          >
            자세히 보기
          </Link>
        </div>
      </div>
    </article>
  );
} 