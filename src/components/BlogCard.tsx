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
  external_url?: string;
}

export default function BlogCard({ 
  title, 
  slug, 
  featured_image, 
  excerpt, 
  content, 
  published_at, 
  created_at,
  category,
  external_url
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
    
    // 외부 URL이 있는 경우 해당 URL로 이동 (새 탭에서 열기)
    if (external_url) {
      window.open(external_url, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // 외부 URL이 없는 경우 블로그 상세 페이지로 이동
    router.push(`/blog/${slug}`);
  };
  
  // 외부 링크 여부에 따라 아이콘과 텍스트 변경
  const CardFooter = () => {
    if (external_url) {
      return (
        <a
          href={external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-medium hover:text-blue-800 transition-colors hover:underline z-10 relative flex items-center"
          onClick={(e) => e.stopPropagation()} // 카드 클릭 이벤트 중단
        >
          <span>외부 링크</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      );
    }
    
    return (
      <Link
        href={`/blog/${slug}`}
        className="text-blue-600 font-medium hover:text-blue-800 transition-colors hover:underline z-10 relative"
      >
        자세히 보기
      </Link>
    );
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
        
        {/* 외부 링크 표시 (오른쪽 상단) */}
        {external_url && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
            외부 링크
          </div>
        )}
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
          
          <CardFooter />
        </div>
      </div>
    </article>
  );
} 