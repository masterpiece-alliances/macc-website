import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { preprocessBlogPost } from '@/lib/utils/preprocessors';
import BlogCard from '@/components/BlogCard';

// 항상 최신 데이터를 가져오도록 revalidate 값을 0으로 설정
export const revalidate = 0;

export default async function BlogPage() {
  try {
    // 디버깅을 위한 환경 정보 로깅
    console.log('[BlogPage] 환경 변수 확인:', {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '설정됨' : '설정안됨',
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV || '설정안됨'
    });

    // 게시된 블로그 포스트 가져오기
    console.log('[BlogPage] 블로그 포스트 조회 시작');
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*, categories(name, slug)')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    // 데이터베이스 오류 발생 시
    if (error) {
      console.error('[BlogPage] 블로그 포스트 조회 중 오류:', error);
      // 오류 메시지와 함께 사용자 친화적인 화면 표시
      return (
        <div className="flex flex-col">
          {/* 히어로 섹션 */}
          <section className="relative w-full h-[30vh] md:h-[40vh] flex items-center bg-gradient-to-r from-[#0061ad] to-[#004d8a]">
            <div className="container mx-auto px-4 z-10 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 break-keep">
                칼럼
              </h1>
              <p className="text-lg md:text-2xl mb-8 max-w-3xl break-keep">
                Masterpiece Alliance의 인사이트와 전문 지식을 공유합니다
              </p>
            </div>
          </section>

          {/* 오류 메시지 섹션 */}
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 shadow-sm">
                  <h2 className="text-xl font-medium text-amber-700 mb-3 break-keep">
                    일시적인 문제가 발생했습니다
                  </h2>
                  <p className="text-gray-700 mb-4 break-keep">
                    데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요. 
                    문제가 계속되면 관리자에게 문의하세요.
                  </p>
                  <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-[#0061ad] text-white font-medium rounded-lg hover:bg-[#004d8a] transition-colors"
                  >
                    메인 페이지로 돌아가기
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }

    console.log('[BlogPage] 포스트 수:', posts?.length || 0);

    // 블로그 포스트 전처리 (이미지 URL, 슬러그 정규화 등)
    const processedPosts = posts ? posts.map(post => preprocessBlogPost(post)) : [];

    return (
      <div className="flex flex-col">
        {/* 히어로 섹션 */}
        <section className="relative w-full h-[30vh] md:h-[40vh] flex items-center bg-gradient-to-r from-[#0061ad] to-[#004d8a]">
          <div className="container mx-auto px-4 z-10 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 break-keep">
              칼럼
            </h1>
            <p className="text-lg md:text-2xl mb-8 max-w-3xl break-keep">
              Masterpiece Alliance의 인사이트와 전문 지식을 공유합니다
            </p>
          </div>
        </section>

        {/* 블로그 콘텐츠 섹션 */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            {processedPosts.length === 0 ? (
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-gray-50 rounded-xl p-12">
                  <svg 
                    className="w-16 h-16 text-gray-400 mx-auto mb-6" 
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
                  <h2 className="text-2xl font-medium text-gray-700 mb-4 break-keep">아직 등록된 글이 없습니다</h2>
                  <p className="text-gray-600 mb-8 break-keep">
                    곧 새로운 글로 찾아뵙겠습니다! 블로그 포스트가 게시되면 이곳에서 확인하실 수 있습니다.
                  </p>
                  <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-[#0061ad] text-white font-medium rounded-lg hover:bg-[#004d8a] transition-colors"
                  >
                    메인 페이지로 돌아가기
                  </Link>
                </div>
              </div>
            ) : (
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
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
                      external_url={post.external_url}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('[BlogPage] 블로그 페이지 렌더링 중 예상치 못한 오류:', error);
    
    // 예상치 못한 오류 발생 시 사용자에게 표시할 UI
    return (
      <div className="flex flex-col">
        {/* 히어로 섹션 */}
        <section className="relative w-full h-[30vh] md:h-[40vh] flex items-center bg-gradient-to-r from-[#0061ad] to-[#004d8a]">
          <div className="container mx-auto px-4 z-10 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 break-keep">
              칼럼
            </h1>
            <p className="text-lg md:text-2xl mb-8 max-w-3xl break-keep">
              Masterpiece Alliance의 인사이트와 전문 지식을 공유합니다
            </p>
          </div>
        </section>

        {/* 오류 메시지 섹션 */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                <h2 className="text-xl font-medium text-red-700 mb-3 break-keep">
                  죄송합니다, 문제가 발생했습니다
                </h2>
                <p className="text-gray-700 mb-4 break-keep">
                  예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요. 
                  문제가 계속되면 관리자에게 문의하세요.
                </p>
                <Link
                  href="/"
                  className="inline-block px-6 py-3 bg-[#0061ad] text-white font-medium rounded-lg hover:bg-[#004d8a] transition-colors"
                >
                  메인 페이지로 돌아가기
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
} 