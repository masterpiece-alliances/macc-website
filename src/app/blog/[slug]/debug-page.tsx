'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function DebugPage({ params }: { params: { slug: string }}) {
  const [post, setPost] = useState<any>(null);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const slug = params.slug;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // 요청된 슬러그에 해당하는 포스트를 찾습니다
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (postError) {
          console.error('포스트 조회 중 오류:', postError);
          throw postError;
        }

        setPost(postData);

        // 이미지가 있는 모든 포스트를 가져옵니다
        const { data: allPostsData, error: allPostsError } = await supabase
          .from('posts')
          .select('id, title, slug, featured_image, status')
          .not('featured_image', 'is', null)
          .order('created_at', { ascending: false });

        if (allPostsError) {
          console.error('모든 포스트 조회 중 오류:', allPostsError);
          throw allPostsError;
        }

        setAllPosts(allPostsData || []);
      } catch (err) {
        console.error('데이터 조회 중 오류:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  // 슬러그를 수정하는 함수
  const fixSlug = async (postId: string, oldSlug: string) => {
    // 하이픈 중복 제거 및 정리
    const newSlug = oldSlug.replace(/--+/g, '-').replace(/^-|-$/g, '');
    
    if (newSlug === oldSlug) {
      alert('수정할 필요가 없습니다.');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('posts')
        .update({ slug: newSlug })
        .eq('id', postId);
        
      if (error) {
        throw error;
      }
      
      alert(`슬러그가 수정되었습니다: ${oldSlug} → ${newSlug}`);
      window.location.reload();
    } catch (err) {
      console.error('슬러그 수정 중 오류:', err);
      alert('슬러그 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">블로그 디버깅 페이지</h1>
      <p className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded">
        이 페이지는 슬러그 관련 문제를 진단하기 위한 디버깅 페이지입니다.
      </p>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-8">데이터 로딩 중...</div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">현재 요청된 슬러그: <span className="font-mono bg-gray-100 px-1 rounded">{slug}</span></h2>
          
          {post ? (
            <div className="mb-8 p-4 border border-green-300 bg-green-50 rounded">
              <h3 className="text-lg font-medium text-green-800 mb-2">일치하는 포스트 발견!</h3>
              <pre className="bg-white p-3 rounded text-sm overflow-x-auto">
                {JSON.stringify(post, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="mb-8 p-4 border border-red-300 bg-red-50 rounded">
              <h3 className="text-lg font-medium text-red-800 mb-2">일치하는 포스트 없음</h3>
              <p>요청한 슬러그와 일치하는 포스트를 찾을 수 없습니다.</p>
            </div>
          )}
          
          <h2 className="text-xl font-semibold mt-8 mb-4">이미지가 있는 포스트 목록 ({allPosts.length}개)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-3 border-b">ID</th>
                  <th className="py-2 px-3 border-b">제목</th>
                  <th className="py-2 px-3 border-b">상태</th>
                  <th className="py-2 px-3 border-b">슬러그</th>
                  <th className="py-2 px-3 border-b">이미지</th>
                  <th className="py-2 px-3 border-b">작업</th>
                </tr>
              </thead>
              <tbody>
                {allPosts.map((post) => (
                  <tr key={post.id} className={post.slug === slug ? "bg-yellow-50" : ""}>
                    <td className="py-2 px-3 border-b">{post.id.substring(0, 8)}...</td>
                    <td className="py-2 px-3 border-b">{post.title}</td>
                    <td className="py-2 px-3 border-b">
                      <span className={post.status === 'published' ? 'text-green-600' : 'text-gray-500'}>
                        {post.status === 'published' ? '발행됨' : '초안'}
                      </span>
                    </td>
                    <td className="py-2 px-3 border-b font-mono text-xs break-all">
                      {post.slug}
                      {post.slug.includes('--') && (
                        <span className="text-xs text-red-500 ml-1">중복 하이픈</span>
                      )}
                    </td>
                    <td className="py-2 px-3 border-b">
                      <div className="w-12 h-12 relative">
                        <img 
                          src={post.featured_image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                          style={{ maxWidth: "48px", maxHeight: "48px" }}
                        />
                      </div>
                    </td>
                    <td className="py-2 px-3 border-b">
                      <div className="flex space-x-2">
                        <a 
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          보기
                        </a>
                        <button
                          onClick={() => navigator.clipboard.writeText(post.slug)}
                          className="text-gray-500 hover:text-gray-700 text-sm"
                        >
                          복사
                        </button>
                        <button
                          onClick={() => fixSlug(post.id, post.slug)}
                          className="text-orange-600 hover:text-orange-800 text-sm"
                        >
                          수정
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 