'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function CheckSlugs() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fixed, setFixed] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, slug, status, created_at, content')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setPosts(data || []);
      } catch (err) {
        console.error('포스트 조회 중 오류:', err);
        setError('포스트를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [fixed]);

  const handleFixSlugs = async () => {
    setLoading(true);
    let fixedCount = 0;

    try {
      for (const post of posts) {
        // 슬러그에 하이픈이 2개 이상 연속되어 있는지 확인
        if (post.slug.includes('--')) {
          const fixedSlug = post.slug.replace(/--+/g, '-');
          console.log(`슬러그 수정: ${post.slug} => ${fixedSlug}`);
          
          const { error } = await supabase
            .from('posts')
            .update({ slug: fixedSlug })
            .eq('id', post.id);
          
          if (error) {
            console.error(`포스트 ID ${post.id} 슬러그 수정 중 오류:`, error);
          } else {
            fixedCount++;
          }
        }
      }
      
      alert(`${fixedCount}개의 슬러그가 수정되었습니다.`);
      setFixed(prev => !prev); // 상태를 토글하여 데이터 다시 불러오기
    } catch (err) {
      console.error('슬러그 수정 중 오류:', err);
      setError('슬러그 수정 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">슬러그 확인 도구</h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <button 
          onClick={handleFixSlugs}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4"
          disabled={loading}
        >
          {loading ? '처리 중...' : '슬러그 자동 수정'}
        </button>
        <p className="text-sm text-gray-600">
          연속된 하이픈(--) 같은 일반적인 슬러그 문제를 자동으로 수정합니다.
        </p>
      </div>
      
      {loading ? (
        <div className="text-center">로딩 중...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">제목</th>
                <th className="py-2 px-4 border-b">슬러그</th>
                <th className="py-2 px-4 border-b">상태</th>
                <th className="py-2 px-4 border-b">작성일</th>
                <th className="py-2 px-4 border-b">링크</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="py-2 px-4 border-b">{post.id}</td>
                  <td className="py-2 px-4 border-b">{post.title}</td>
                  <td className="py-2 px-4 border-b font-mono text-sm break-all">
                    {post.slug}
                    {post.slug.includes('--') && (
                      <span className="text-xs text-red-500 ml-2">문제 있음</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span className={post.status === 'published' ? 'text-green-600' : 'text-gray-500'}>
                      {post.status === 'published' ? '발행됨' : '초안'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <a 
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        보기
                      </a>
                      <button 
                        onClick={() => {navigator.clipboard.writeText(post.slug)}}
                        className="text-xs text-gray-500 hover:text-gray-700"
                        title="슬러그 복사"
                      >
                        복사
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-sm text-gray-600">총 {posts.length}개의 포스트</p>
        </div>
      )}
    </div>
  );
} 