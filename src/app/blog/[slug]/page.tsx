import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Post } from '@/lib/types';
import { remark } from 'remark';
import html from 'remark-html';
import { normalizeSlug, getBaseSlug, cleanupSlug } from '@/lib/utils/slug-utils';
import { preprocessBlogPost } from '@/lib/utils/preprocessors';
import { fixAllMarkdownImages } from '@/lib/utils/preprocessors';
import { getValidImageUrl } from '@/lib/utils/image-utils';
import BlogImage from '@/components/BlogImage';

// 항상 최신 데이터를 가져오도록 revalidate 값을 0으로 설정
export const revalidate = 0;

interface PageProps {
  params: {
    slug: string;
  };
}

// 마크다운을 HTML로 변환하는 함수
async function markdownToHtml(markdown: string) {
  try {
    // 마크다운 내 이미지 URL 정규화 (포괄적인 변환 함수 사용)
    const normalizedMarkdown = fixAllMarkdownImages(markdown);
    const result = await remark().use(html).process(normalizedMarkdown);
    return result.toString();
  } catch (error) {
    console.error('[BlogPost] 마크다운 변환 중 오류:', error);
    return markdown; // 오류 시 원본 반환
  }
}

async function getPostBySlug(slug: string) {
  console.log('[BlogPost] 슬러그로 포스트 조회 시작. 원본 슬러그:', slug);
  
  try {
    // URL에서 가져온 슬러그 정리 (URL 인코딩, 쿼리 파라미터 제거 등)
    const cleanedSlug = cleanupSlug(slug);
    
    // 슬러그 정규화 (URL에서 사용될 수 있는 중복 하이픈 등 처리)
    const normalizedSlug = normalizeSlug(cleanedSlug);
    console.log('[BlogPost] 정규화된 슬러그:', normalizedSlug);
    
    // 조회 결과를 저장할 변수
    let post = null;
    
    // 1. 먼저 정확한 슬러그로 시도
    const { data: exactPost, error: exactError } = await supabase
      .from('posts')
      .select('*, categories(name, slug)')
      .eq('slug', normalizedSlug)
      .eq('status', 'published')
      .maybeSingle();
    
    if (exactError) {
      console.error('[BlogPost] 정확한 슬러그 조회 중 오류:', exactError);
    }
    
    if (!exactError && exactPost) {
      console.log('[BlogPost] 정확한 슬러그로 포스트 조회 성공:', exactPost.title);
      post = exactPost;
    } else {
      // 2. 슬러그가 포함된(부분 일치) 포스트 검색
      console.log('[BlogPost] 정확한 슬러그로 찾지 못함. 부분 일치 시도 중...');
      const { data: postsLike, error: errorLike } = await supabase
        .from('posts')
        .select('*, categories(name, slug)')
        .like('slug', `%${normalizedSlug}%`)
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      
      if (errorLike) {
        console.error('[BlogPost] 부분 일치 슬러그 조회 중 오류:', errorLike);
      }
      
      if (!errorLike && postsLike && postsLike.length > 0) {
        console.log(`[BlogPost] ${postsLike.length}개의 유사 슬러그 포스트 발견. 첫 번째 포스트 반환:`, postsLike[0].slug);
        post = postsLike[0];
      } else {
        // 3. 기본 슬러그만 사용하여 시도 (고유 ID 부분 제외)
        const baseSlug = getBaseSlug(normalizedSlug);
        if (baseSlug && baseSlug !== normalizedSlug) {
          console.log('[BlogPost] 기본 슬러그로 시도 중:', baseSlug);
          const { data: postsBase, error: errorBase } = await supabase
            .from('posts')
            .select('*, categories(name, slug)')
            .ilike('slug', `${baseSlug}%`) // 기본 슬러그로 시작하는 포스트 검색
            .eq('status', 'published')
            .order('created_at', { ascending: false });
          
          if (errorBase) {
            console.error('[BlogPost] 기본 슬러그 조회 중 오류:', errorBase);
          }
          
          if (!errorBase && postsBase && postsBase.length > 0) {
            console.log(`[BlogPost] 기본 슬러그로 ${postsBase.length}개 포스트 발견. 첫 번째 포스트 반환:`, postsBase[0].slug);
            post = postsBase[0];
          }
        }
        
        // 4. 추가 대안: 슬러그를 단어 단위로 분할하여 각 단어를 포함하는 포스트 검색
        if (!post && normalizedSlug.includes('-')) {
          const slugWords = normalizedSlug.split('-').filter(word => word.length > 2);
          if (slugWords.length > 0) {
            console.log('[BlogPost] 슬러그 단어 검색 시도 중:', slugWords.join(', '));
            
            for (const word of slugWords) {
              const { data: wordPosts, error: wordError } = await supabase
                .from('posts')
                .select('*, categories(name, slug)')
                .ilike('slug', `%${word}%`)
                .eq('status', 'published')
                .order('created_at', { ascending: false })
                .limit(1);
              
              if (wordError) {
                console.error(`[BlogPost] '${word}' 단어 검색 중 오류:`, wordError);
                continue;
              }
              
              if (!wordError && wordPosts && wordPosts.length > 0) {
                console.log(`[BlogPost] 단어 '${word}'로 포스트 발견:`, wordPosts[0].slug);
                post = wordPosts[0];
                break;
              }
            }
          }
        }
      }
    }
    
    // 5. 모든 시도 실패
    if (!post) {
      console.error('[BlogPost] 일치하는 포스트를 찾을 수 없음. 슬러그:', slug);
      return null;
    }
    
    // 포스트 데이터 전처리 (이미지 URL, 슬러그 정규화 등)
    return preprocessBlogPost(post as Post);
  } catch (err) {
    console.error('[BlogPost] 포스트 조회 중 예외 발생:', err);
    return null;
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  console.log('[BlogPost] 블로그 포스트 페이지 렌더링:', params.slug);
  
  try {
    // 디버깅을 위한 환경 정보 로깅
    console.log('[BlogPost] 환경 변수 확인:', {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '설정됨' : '설정안됨',
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV || '설정안됨'
    });
    
    const post = await getPostBySlug(params.slug);
    
    if (!post) {
      console.error('[BlogPost] 포스트를 찾을 수 없음, notFound() 호출');
      notFound();
    }
    
    // 마크다운을 HTML로 변환 (이미지 URL 정규화 포함)
    const contentHtml = await markdownToHtml(post.content);

    return (
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 포스트 헤더 */}
        <header className="mb-8">
          {post.categories && (
            <Link
              href={`/blog/category/${post.categories.slug}`}
              className="inline-block text-blue-600 font-medium text-sm mb-3"
            >
              {post.categories.name}
            </Link>
          )}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-600">
            <time dateTime={post.published_at || post.created_at}>
              {new Date(post.published_at || post.created_at).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </header>

        {/* 대표 이미지 */}
        {post.featured_image && (
          <div className="mb-10">
            <BlogImage 
              src={getValidImageUrl(post.featured_image)} 
              alt={post.title} 
              priority={true}
            />
          </div>
        )}

        {/* 콘텐츠 */}
        <div 
          className="prose prose-lg max-w-none prose-blue prose-headings:text-gray-900 prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* 하단 네비게이션 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            블로그 목록으로 돌아가기
          </Link>
        </div>
      </article>
    );
  } catch (error) {
    console.error('[BlogPost] 블로그 포스트 페이지 렌더링 중 오류:', error);
    throw error; // Next.js에서 오류 페이지 표시
  }
} 