'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Post } from '@/lib/types';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const postsPerPage = 10;

  // 포스트 데이터 불러오기
  const fetchPosts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('posts')
        .select('*, categories(name)')
        .order('created_at', { ascending: false })
        .range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);

      // 상태 필터 적용
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      // 검색어 필터 적용
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setPosts(data as Post[]);

      // 전체 페이지 수 계산
      let countQuery = supabase.from('posts').select('id', { count: 'exact' });
      
      if (statusFilter !== 'all') {
        countQuery = countQuery.eq('status', statusFilter);
      }
      
      if (searchQuery) {
        countQuery = countQuery.ilike('title', `%${searchQuery}%`);
      }
      
      const { count } = await countQuery;
      setTotalPages(Math.ceil((count || 0) / postsPerPage));
    } catch (error) {
      console.error('포스트 목록 로드 중 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, statusFilter, searchQuery]);

  // 포스트 삭제 함수
  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('정말 이 포스트를 삭제하시겠습니까?')) {
      return;
    }

    try {
      const { error } = await supabase.from('posts').delete().eq('id', postId);
      
      if (error) {
        throw error;
      }

      // 포스트 목록 갱신
      fetchPosts();
    } catch (error) {
      console.error('포스트 삭제 중 오류:', error);
      alert('포스트 삭제에 실패했습니다.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">블로그 포스트 관리</h1>
        <Link
          href="/admin/posts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          새 포스트 작성
        </Link>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="포스트 제목 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
              className="w-full md:w-40 px-3 py-2 border border-gray-300 rounded"
            >
              <option value="all">모든 상태</option>
              <option value="published">발행됨</option>
              <option value="draft">임시저장</option>
            </select>
          </div>
        </div>
      </div>

      {/* 포스트 목록 테이블 */}
      <div className="bg-white rounded shadow overflow-hidden">
        {loading ? (
          <div className="p-4 text-center">포스트 로딩 중...</div>
        ) : posts.length === 0 ? (
          <div className="p-4 text-center">등록된 포스트가 없습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">제목</th>
                  <th className="px-4 py-2 text-left">카테고리</th>
                  <th className="px-4 py-2 text-left">상태</th>
                  <th className="px-4 py-2 text-left">작성일</th>
                  <th className="px-4 py-2 text-left">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-4 py-3">
                      <span className="font-medium">{post.title}</span>
                    </td>
                    <td className="px-4 py-3">
                      {/* @ts-ignore */}
                      {post.categories?.name || '미분류'}
                    </td>
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
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="text-blue-600 hover:underline"
                        >
                          편집
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:underline"
                        >
                          삭제
                        </button>
                        {/* 발행된 포스트만 보기 버튼 표시 */}
                        {post.status === 'published' && (
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-gray-600 hover:underline"
                            target="_blank"
                          >
                            보기
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                이전
              </button>
              <span>
                {currentPage} / {totalPages} 페이지
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 