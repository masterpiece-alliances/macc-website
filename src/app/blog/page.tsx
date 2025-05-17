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

    if (error) {
      console.error('블로그 포스트 조회 중 오류:', error);
      throw new Error('블로그 포스트를 불러오는 중 오류가 발생했습니다.');
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
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium text-gray-700">등록된 글이 없습니다</h2>
            <p className="mt-2 text-gray-600">곧 새로운 글로 찾아뵙겠습니다!</p>
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
    console.error('블로그 페이지 렌더링 중 오류:', error);
    
    // 오류 발생 시 사용자에게 표시할 UI
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">블로그</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mx-auto">
          <h2 className="text-xl font-medium text-red-700 mb-3">
            콘텐츠를 불러오는 중 오류가 발생했습니다
          </h2>
          <p className="text-gray-700 mb-4">
            잠시 후 다시 시도해 주세요. 문제가 계속되면 관리자에게 문의하세요.
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