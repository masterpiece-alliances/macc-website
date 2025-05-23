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
  
  // 이미지가 없거나 에러인 경우 플레이스홀더 표시
  const shouldShowPlaceholder = !featured_image || imageError;
  
  // 외부 링크 여부에 따라 아이콘과 텍스트 변경
  const CardFooter = () => {
    if (external_url) {
      return (
        <a
          href={external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#0061ad] text-sm font-medium hover:text-[#004d8a] transition-colors z-10 relative break-keep"
          onClick={(e) => e.stopPropagation()}
        >
          <span>외부 링크</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      );
    }
    
    return (
      <Link
        href={`/blog/${slug}`}
        className="inline-flex items-center text-[#0061ad] text-sm font-medium hover:text-[#004d8a] transition-colors z-10 relative break-keep"
      >
        <span>자세히 보기</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    );
  };
  
  return (
    <article className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col overflow-hidden"
      onClick={handleCardClick}
    >
      {/* 이미지 섹션 */}
      <div className="relative w-full h-48 overflow-hidden">
        {shouldShowPlaceholder ? (
          // 플레이스홀더 - 브랜드 그라데이션 배경
          <div className="w-full h-full bg-gradient-to-br from-[#0061ad] to-[#004d8a] flex items-center justify-center relative">
            {/* 블로그 로고 */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="w-40 h-40 relative">
                <Image
                  src="/blog_logo.png"
                  alt="Masterpiece Alliance Blog"
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
            </div>
          </div>
        ) : (
          // 실제 이미지
          <Image
            src={featured_image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={handleImageError}
          />
        )}

        {/* 카테고리 배지 */}
        {category && (
          <div className="absolute top-3 left-3">
            <Link
              href={`/blog/category/${category.slug}`}
              className={`inline-block text-xs font-medium px-3 py-1 rounded-full transition-colors z-10 relative break-keep ${
                shouldShowPlaceholder 
                  ? 'bg-white/90 text-[#0061ad] hover:bg-white border border-white/20 backdrop-blur-sm' 
                  : 'bg-[#0061ad] text-white hover:bg-[#004d8a]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {category.name}
            </Link>
          </div>
        )}
        
        {/* 외부 링크 표시 */}
        {external_url && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            외부
          </div>
        )}
      </div>
      
      {/* 콘텐츠 섹션 */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 break-keep group-hover:text-[#0061ad] transition-colors">
            {title}
          </h2>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 break-keep">
            {excerpt || content?.substring(0, 120) + '...'}
          </p>
        </div>
        
        {/* 푸터 */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <time className="text-gray-500 text-xs break-keep">
            {new Date(published_at || created_at).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
          
          <CardFooter />
        </div>
      </div>
    </article>
  );
} 