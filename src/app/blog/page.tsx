import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { preprocessBlogPost } from '@/lib/utils/preprocessors';
import BlogCard from '@/components/BlogCard';

export const revalidate = 3600; // 1시간마다 페이지 재생성

export default async function BlogPage() {
  try {
    // 게시된 블로그 포스트 가져오기
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*, categories(name, slug)')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    // 데이터베이스 오류 발생 시
    if (error) {
      console.error('블로그 포스트 조회 중 오류:', error);
      // 오류 메시지와 함께 사용자 친화적인 화면 표시
      return (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">블로그</h1>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-xl font-medium text-amber-700 mb-3">
              일시적인 문제가 발생했습니다
            </h2>
            <p className="text-gray-700 mb-4">
              데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요. 
              문제가 계속되면 관리자에게 문의하세요.
            </p>
            <Link
              href="/"
              className="inline-block px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              메인 페이지로 돌아가기
            </Link>
          </div>
        </div>
      );
    }

    // 블로그 포스트 전처리 (이미지 URL, 슬러그 정규화 등)
    const processedPosts = posts ? posts.map(post => preprocessBlogPost(post)) : [];

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">블로그</h1>
          <p className="text-xl text-gray-600">최신 소식과 유용한 정보를 확인하세요</p>
        </div>

        {processedPosts.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl shadow-sm">
            <svg 
              className="w-16 h-16 text-gray-400 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1.5" 
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h2 className="text-2xl font-medium text-gray-700 mb-2">아직 등록된 글이 없습니다</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              곧 새로운 글로 찾아뵙겠습니다! 블로그 포스트가 게시되면 이곳에서 확인하실 수 있습니다.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              메인 페이지로 돌아가기
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processedPosts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                slug={post.slug}
                featured_image={post.featured_image}
                excerpt={post.excerpt}
                content={post.content}
                published_at={post.published_at}
                created_at={post.created_at}
                category={post.categories}
              />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('블로그 페이지 렌더링 중 예상치 못한 오류:', error);
    
    // 예상치 못한 오류 발생 시 사용자에게 표시할 UI
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">블로그</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 shadow-sm">
          <h2 className="text-xl font-medium text-red-700 mb-3">
            죄송합니다, 문제가 발생했습니다
          </h2>
          <p className="text-gray-700 mb-4">
            예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요. 
            문제가 계속되면 관리자에게 문의하세요.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            메인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    );
  }
} 