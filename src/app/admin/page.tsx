'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    categories: 0,
  });
  
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // 통계 데이터 가져오기
        const [totalPostsRes, publishedPostsRes, draftPostsRes, categoriesRes, recentPostsRes] = await Promise.all([
          supabase.from('posts').select('id', { count: 'exact' }),
          supabase.from('posts').select('id', { count: 'exact' }).eq('status', 'published'),
          supabase.from('posts').select('id', { count: 'exact' }).eq('status', 'draft'),
          supabase.from('categories').select('id', { count: 'exact' }),
          supabase.from('posts').select('id, title, created_at, status').order('created_at', { ascending: false }).limit(5),
        ]);

        setStats({
          totalPosts: totalPostsRes.count || 0,
          publishedPosts: publishedPostsRes.count || 0,
          draftPosts: draftPostsRes.count || 0,
          categories: categoriesRes.count || 0,
        });

        if (recentPostsRes.data) {
          setRecentPosts(recentPostsRes.data);
        }
      } catch (error) {
        console.error('대시보드 데이터 로드 중 오류:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>데이터 로딩 중...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">대시보드</h1>
      
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">전체 포스트</h2>
          <p className="text-2xl font-bold">{stats.totalPosts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">발행된 포스트</h2>
          <p className="text-2xl font-bold">{stats.publishedPosts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">임시저장 포스트</h2>
          <p className="text-2xl font-bold">{stats.draftPosts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">카테고리</h2>
          <p className="text-2xl font-bold">{stats.categories}</p>
        </div>
      </div>

      {/* 빠른 작업 버튼 */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          href="/admin/posts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          새 포스트 작성
        </Link>
        <Link
          href="/admin/categories/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          카테고리 추가
        </Link>
        <Link
          href="/blog"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          target="_blank"
        >
          블로그 방문
        </Link>
      </div>

      {/* 최근 포스트 */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-bold mb-4">최근 포스트</h2>
        
        {recentPosts.length === 0 ? (
          <p className="text-gray-500">등록된 포스트가 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">제목</th>
                  <th className="px-4 py-2 text-left">상태</th>
                  <th className="px-4 py-2 text-left">작성일</th>
                  <th className="px-4 py-2 text-left">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentPosts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-4 py-3">{post.title}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.status === 'published' ? '발행됨' : '임시저장'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(post.created_at).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-blue-600 hover:underline mr-3"
                      >
                        편집
                      </Link>
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-gray-600 hover:underline"
                        target="_blank"
                      >
                        보기
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 