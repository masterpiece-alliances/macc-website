import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Post, Category } from '@/lib/types';

export const revalidate = 3600; // 1시간마다 페이지 재생성

interface PageProps {
  params: {
    slug: string;
  };
}

async function getCategory(slug: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  
  const { data: category, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error || !category) {
    return null;
  }
  
  return category as Category;
}

async function getCategoryPosts(categoryId: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, categories(name, slug)')
    .eq('category_id', categoryId)
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  
  if (error) {
    console.error('카테고리별 포스트 목록 조회 중 오류:', error);
    return [];
  }
  
  return posts as Post[];
}

async function getCategories() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('카테고리 목록 조회 중 오류:', error);
    return [];
  }
  
  return categories as Category[];
}

export default async function CategoryBlogPage({ params }: PageProps) {
  const category = await getCategory(params.slug);
  
  if (!category) {
    notFound();
  }
  
  const [posts, allCategories] = await Promise.all([
    getCategoryPosts(category.id),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {category.description}
          </p>
        )}
      </div>

      {/* 카테고리 필터 */}
      <div className="flex justify-center flex-wrap gap-2 mb-10">
        <Link 
          href="/blog" 
          className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
        >
          전체
        </Link>
        {allCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/blog/category/${cat.slug}`}
            className={`px-4 py-2 rounded-full ${
              cat.id === category.id 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'border border-gray-300 hover:bg-gray-100'
            } transition`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* 블로그 포스트 목록 */}
      {posts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700">이 카테고리에 아직 글이 없습니다</h2>
          <p className="text-gray-500 mt-2 mb-4">빠른 시일 내에 새로운 콘텐츠가 추가될 예정입니다</p>
          <Link href="/blog" className="text-blue-600 hover:underline">
            전체 블로그 글 보기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              {post.featured_image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-gray-900">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(post.published_at || post.created_at).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 font-medium hover:text-blue-700"
                  >
                    더 보기
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
} 