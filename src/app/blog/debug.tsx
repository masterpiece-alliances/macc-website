'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { isValidImageUrl, normalizeImageUrl } from '@/lib/utils/image-utils';
import { normalizeSlug, getBaseSlug } from '@/lib/utils/slug-utils';
import { normalizeMarkdownImageUrls, extractImagesFromMarkdown } from '@/lib/utils/preprocessors';

export default function EnhancedBlogDebugPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [imagesOnly, setImagesOnly] = useState<boolean>(false);
  const [showIssuesOnly, setShowIssuesOnly] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fixed, setFixed] = useState<boolean>(false);
  const [diagnosticInfo, setDiagnosticInfo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'slug' | 'image' | 'content'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [postsWithIssues, setPostsWithIssues] = useState<{
    slugIssues: any[], 
    imageIssues: any[],
    contentIssues: any[],
    markdownImageIssues: any[]
  }>({
    slugIssues: [],
    imageIssues: [],
    contentIssues: [],
    markdownImageIssues: []
  });

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        // 모든 포스트 또는 이미지가 있는 포스트만 가져오기
        const query = supabase
          .from('posts')
          .select('*, categories(name, slug)')
          .order('created_at', { ascending: false });
          
        if (imagesOnly) {
          query.not('featured_image', 'is', null);
        }
        
        const { data, error } = await query;

        if (error) throw error;

        // 마크다운 이미지 검사를 위해 전체 콘텐츠 불러오기
        const postsData = data || [];
        setPosts(postsData);
        
        // 문제 분류
        const slugIssues = postsData.filter(post => 
          post.slug.includes('--') || // 중복 하이픈
          post.slug.startsWith('-') || // 시작 하이픈
          post.slug.endsWith('-') // 끝 하이픈
        );
        
        const imageIssues = postsData.filter(post => 
          post.featured_image && !isValidImageUrl(post.featured_image)
        );
        
        const contentIssues = postsData.filter(post => 
          !post.content || post.content.trim() === '' || // 내용 없음
          !post.title || post.title.trim() === '' // 제목 없음
        );
        
        // 마크다운 내 이미지 검사
        const markdownImageIssues = postsData.filter(post => {
          if (!post.content) return false;
          const images = extractImagesFromMarkdown(post.content);
          return images.some(imgUrl => !isValidImageUrl(imgUrl));
        });
        
        setPostsWithIssues({
          slugIssues,
          imageIssues,
          contentIssues,
          markdownImageIssues
        });
        
        setDiagnosticInfo(`총 ${postsData.length}개 포스트 확인됨, 이슈: 슬러그(${slugIssues.length}), 이미지(${imageIssues.length}), 내용(${contentIssues.length}), 마크다운 이미지(${markdownImageIssues.length})`);
      } catch (err) {
        console.error('포스트 조회 중 오류:', err);
        setError('포스트를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [fixed, imagesOnly]);

  // 필터링된 포스트 계산
  const filteredPosts = posts.filter(post => {
    // 검색어 필터링
    if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !post.slug.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // 탭 필터링
    if (showIssuesOnly) {
      const hasSlugIssue = post.slug.includes('--') || post.slug.startsWith('-') || post.slug.endsWith('-');
      const hasImageIssue = post.featured_image && !isValidImageUrl(post.featured_image);
      const hasContentIssue = !post.content || post.content.trim() === '' || !post.title || post.title.trim() === '';
      
      // 마크다운 이미지 이슈 확인
      const hasMarkdownImageIssue = post.content && extractImagesFromMarkdown(post.content).some(imgUrl => !isValidImageUrl(imgUrl));
      
      if (activeTab === 'all') {
        return hasSlugIssue || hasImageIssue || hasContentIssue || hasMarkdownImageIssue;
      } else if (activeTab === 'slug') {
        return hasSlugIssue;
      } else if (activeTab === 'image') {
        return hasImageIssue;
      } else if (activeTab === 'content') {
        return hasContentIssue || hasMarkdownImageIssue;
      }
    }
    
    return true;
  });

  // 슬러그 수정 함수
  const handleFixSlug = async (post: any) => {
    try {
      const fixedSlug = normalizeSlug(post.slug);
      
      if (fixedSlug === post.slug) {
        alert('이미 정규화된 슬러그입니다.');
        return;
      }
      
      const { error } = await supabase
        .from('posts')
        .update({ slug: fixedSlug })
        .eq('id', post.id);
      
      if (error) throw error;
      
      alert(`슬러그가 수정되었습니다: ${post.slug} → ${fixedSlug}`);
      setFixed(!fixed);
    } catch (err) {
      console.error('슬러그 수정 중 오류:', err);
      alert('슬러그 수정 중 오류가 발생했습니다.');
    }
  };

  // 이미지 URL 수정 함수
  const handleFixImage = async (post: any) => {
    try {
      if (!post.featured_image) {
        alert('이미지가 없습니다.');
        return;
      }
      
      const normalizedUrl = normalizeImageUrl(post.featured_image);
      
      if (!normalizedUrl) {
        alert('정규화할 수 없는 이미지 URL입니다.');
        return;
      }
      
      if (normalizedUrl === post.featured_image) {
        alert('이미지 URL이 이미 정규화되어 있습니다.');
        return;
      }
      
      const { error } = await supabase
        .from('posts')
        .update({ featured_image: normalizedUrl })
        .eq('id', post.id);
      
      if (error) throw error;
      
      alert(`이미지 URL이 수정되었습니다: ${post.featured_image.substring(0, 30)}... → ${normalizedUrl.substring(0, 30)}...`);
      setFixed(!fixed);
    } catch (err) {
      console.error('이미지 URL 수정 중 오류:', err);
      alert('이미지 URL 수정 중 오류가 발생했습니다.');
    }
  };

  // 마크다운 내 이미지 URL 수정 함수
  const handleFixMarkdownImages = async (post: any) => {
    try {
      if (!post.content) {
        alert('콘텐츠가 없습니다.');
        return;
      }
      
      const normalizedContent = normalizeMarkdownImageUrls(post.content);
      
      if (normalizedContent === post.content) {
        alert('마크다운 내 이미지가 이미 정규화되어 있습니다.');
        return;
      }
      
      const { error } = await supabase
        .from('posts')
        .update({ content: normalizedContent })
        .eq('id', post.id);
      
      if (error) throw error;
      
      alert('마크다운 내 이미지 URL이 모두 정규화되었습니다.');
      setFixed(!fixed);
    } catch (err) {
      console.error('마크다운 이미지 수정 중 오류:', err);
      alert('마크다운 이미지 수정 중 오류가 발생했습니다.');
    }
  };

  // 모든 슬러그 수정 함수
  const handleFixAllSlugs = async () => {
    if (!confirm('모든 문제 있는 슬러그를 수정하시겠습니까?')) {
      return;
    }
    
    setLoading(true);
    let fixedCount = 0;
    
    try {
      for (const post of postsWithIssues.slugIssues) {
        const fixedSlug = normalizeSlug(post.slug);
        
        if (fixedSlug !== post.slug) {
          const { error } = await supabase
            .from('posts')
            .update({ slug: fixedSlug })
            .eq('id', post.id);
          
          if (!error) fixedCount++;
        }
      }
      
      alert(`${fixedCount}개의 슬러그가 수정되었습니다.`);
      setFixed(!fixed);
    } catch (err) {
      console.error('슬러그 일괄 수정 중 오류:', err);
      alert('슬러그 일괄 수정 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 모든 이미지 URL 수정 함수
  const handleFixAllImages = async () => {
    if (!confirm('모든 문제 있는 이미지 URL을 수정하시겠습니까?')) {
      return;
    }
    
    setLoading(true);
    let fixedCount = 0;
    
    try {
      // 대표 이미지 수정
      for (const post of postsWithIssues.imageIssues) {
        if (post.featured_image) {
          const normalizedUrl = normalizeImageUrl(post.featured_image);
          
          if (normalizedUrl && normalizedUrl !== post.featured_image) {
            const { error } = await supabase
              .from('posts')
              .update({ featured_image: normalizedUrl })
              .eq('id', post.id);
            
            if (!error) fixedCount++;
          }
        }
      }
      
      // 마크다운 이미지 수정
      for (const post of postsWithIssues.markdownImageIssues) {
        if (post.content) {
          const normalizedContent = normalizeMarkdownImageUrls(post.content);
          
          if (normalizedContent !== post.content) {
            const { error } = await supabase
              .from('posts')
              .update({ content: normalizedContent })
              .eq('id', post.id);
            
            if (!error) fixedCount++;
          }
        }
      }
      
      alert(`${fixedCount}개의 이미지 URL이 수정되었습니다.`);
      setFixed(!fixed);
    } catch (err) {
      console.error('이미지 URL 일괄 수정 중 오류:', err);
      alert('이미지 URL 일괄 수정 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 모든 문제 수정 함수
  const handleFixAllIssues = async () => {
    if (!confirm('모든 발견된 문제를 자동으로 수정하시겠습니까?')) {
      return;
    }
    
    setLoading(true);
    let slugFixed = 0;
    let imageFixed = 0;
    let markdownImageFixed = 0;
    
    try {
      // 1. 슬러그 수정
      for (const post of postsWithIssues.slugIssues) {
        const fixedSlug = normalizeSlug(post.slug);
        
        if (fixedSlug !== post.slug) {
          const { error } = await supabase
            .from('posts')
            .update({ slug: fixedSlug })
            .eq('id', post.id);
          
          if (!error) slugFixed++;
        }
      }
      
      // 2. 대표 이미지 수정
      for (const post of postsWithIssues.imageIssues) {
        if (post.featured_image) {
          const normalizedUrl = normalizeImageUrl(post.featured_image);
          
          if (normalizedUrl && normalizedUrl !== post.featured_image) {
            const { error } = await supabase
              .from('posts')
              .update({ featured_image: normalizedUrl })
              .eq('id', post.id);
            
            if (!error) imageFixed++;
          }
        }
      }
      
      // 3. 마크다운 이미지 수정
      for (const post of postsWithIssues.markdownImageIssues) {
        if (post.content) {
          const normalizedContent = normalizeMarkdownImageUrls(post.content);
          
          if (normalizedContent !== post.content) {
            const { error } = await supabase
              .from('posts')
              .update({ content: normalizedContent })
              .eq('id', post.id);
            
            if (!error) markdownImageFixed++;
          }
        }
      }
      
      alert(`자동 수정 완료: 슬러그(${slugFixed}개), 대표 이미지(${imageFixed}개), 마크다운 이미지(${markdownImageFixed}개)`);
      setFixed(!fixed);
    } catch (err) {
      console.error('자동 수정 중 오류:', err);
      alert('자동 수정 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">블로그 진단 및 수정 도구</h1>
      
      {diagnosticInfo && (
        <div className="text-sm text-blue-600 mb-4 font-mono">
          {diagnosticInfo}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* 필터 및 컨트롤 */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="imagesOnly"
              checked={imagesOnly}
              onChange={(e) => setImagesOnly(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="imagesOnly">이미지가 있는 포스트만</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showIssuesOnly"
              checked={showIssuesOnly}
              onChange={(e) => setShowIssuesOnly(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showIssuesOnly">문제가 있는 포스트만</label>
          </div>
          
          <div className="flex-1">
            <input
              type="text"
              placeholder="제목이나 슬러그로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        
        {/* 탭 메뉴 */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 border-b-2 ${activeTab === 'all' ? 'border-blue-500 text-blue-600' : 'border-transparent'}`}
          >
            모든 문제 ({postsWithIssues.slugIssues.length + postsWithIssues.imageIssues.length + postsWithIssues.contentIssues.length + postsWithIssues.markdownImageIssues.length})
          </button>
          <button
            onClick={() => setActiveTab('slug')}
            className={`px-4 py-2 border-b-2 ${activeTab === 'slug' ? 'border-blue-500 text-blue-600' : 'border-transparent'}`}
          >
            슬러그 문제 ({postsWithIssues.slugIssues.length})
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`px-4 py-2 border-b-2 ${activeTab === 'image' ? 'border-blue-500 text-blue-600' : 'border-transparent'}`}
          >
            이미지 문제 ({postsWithIssues.imageIssues.length + postsWithIssues.markdownImageIssues.length})
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 border-b-2 ${activeTab === 'content' ? 'border-blue-500 text-blue-600' : 'border-transparent'}`}
          >
            내용 문제 ({postsWithIssues.contentIssues.length})
          </button>
        </div>
        
        {/* 일괄 수정 버튼 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleFixAllSlugs}
            disabled={loading || postsWithIssues.slugIssues.length === 0}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 
                     transition disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? '처리 중...' : `슬러그 일괄 수정 (${postsWithIssues.slugIssues.length})`}
          </button>
          
          <button
            onClick={handleFixAllImages}
            disabled={loading || (postsWithIssues.imageIssues.length === 0 && postsWithIssues.markdownImageIssues.length === 0)}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 
                     transition disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? '처리 중...' : `이미지 일괄 수정 (${postsWithIssues.imageIssues.length + postsWithIssues.markdownImageIssues.length})`}
          </button>
          
          <button
            onClick={handleFixAllIssues}
            disabled={loading || (postsWithIssues.slugIssues.length === 0 && postsWithIssues.imageIssues.length === 0 && postsWithIssues.markdownImageIssues.length === 0)}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 
                     transition disabled:bg-green-300 disabled:cursor-not-allowed"
          >
            {loading ? '처리 중...' : '모든 문제 자동 수정'}
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">데이터 처리 중...</p>
        </div>
      ) : (
        <>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">조건에 맞는 포스트가 없습니다.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="text-sm mb-2 text-gray-500">
                총 {filteredPosts.length}개 포스트 표시 중
              </div>
              
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 border-b text-left">제목 / ID</th>
                    <th className="py-2 px-3 border-b text-left">슬러그</th>
                    <th className="py-2 px-3 border-b text-center">이미지</th>
                    <th className="py-2 px-3 border-b text-center">마크다운 이미지</th>
                    <th className="py-2 px-3 border-b text-center">작업</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => {
                    // 문제 체크
                    const hasSlugIssue = post.slug.includes('--') || 
                                        post.slug.startsWith('-') ||
                                        post.slug.endsWith('-');
                                        
                    const hasImageIssue = post.featured_image && !isValidImageUrl(post.featured_image);
                    
                    const hasContentIssue = !post.content || 
                                          post.content.trim() === '' ||
                                          !post.title ||
                                          post.title.trim() === '';
                    
                    // 마크다운 이미지 추출 및 문제 확인
                    const markdownImages = post.content ? extractImagesFromMarkdown(post.content) : [];
                    const hasMarkdownImageIssue = markdownImages.some(imgUrl => !isValidImageUrl(imgUrl));
                    
                    return (
                      <tr key={post.id} className={`${hasSlugIssue || hasImageIssue || hasContentIssue || hasMarkdownImageIssue ? 'bg-yellow-50' : ''}`}>
                        <td className="py-3 px-3 border-b">
                          <div className="font-medium">{post.title || <span className="text-red-500">제목 없음</span>}</div>
                          <div className="text-xs text-gray-500">{post.id.substring(0, 8)}...</div>
                          <div className="text-xs">
                            <span className={post.status === 'published' ? 'text-green-600' : 'text-gray-500'}>
                              {post.status === 'published' ? '발행됨' : '초안'}
                            </span>
                          </div>
                        </td>
                        
                        <td className={`py-3 px-3 border-b font-mono text-xs break-all ${hasSlugIssue ? 'text-red-600' : ''}`}>
                          <div className="flex items-center gap-1">
                            <span>{post.slug}</span>
                            {hasSlugIssue && (
                              <button
                                onClick={() => handleFixSlug(post)}
                                className="ml-1 text-xs text-blue-600 hover:underline"
                                title="슬러그 정규화"
                              >
                                수정
                              </button>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            기본: {getBaseSlug(post.slug)}
                          </div>
                        </td>
                        
                        <td className="py-3 px-3 border-b text-center">
                          {post.featured_image ? (
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 relative border border-gray-300 overflow-hidden rounded">
                                <img 
                                  src={post.featured_image} 
                                  alt={post.title || '이미지'}
                                  className="w-full h-full object-cover"
                                  onError={(e) => { 
                                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg'; 
                                    (e.target as HTMLImageElement).classList.add('bg-red-100');
                                  }}
                                />
                              </div>
                              {hasImageIssue && (
                                <button
                                  onClick={() => handleFixImage(post)}
                                  className="mt-1 text-xs text-blue-600 hover:underline"
                                  title="이미지 URL 정규화"
                                >
                                  URL 수정
                                </button>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs">없음</span>
                          )}
                        </td>
                        
                        <td className="py-3 px-3 border-b text-center">
                          {markdownImages.length > 0 ? (
                            <div className="flex flex-col items-center">
                              <div className="text-xs">{markdownImages.length}개 이미지</div>
                              {hasMarkdownImageIssue && (
                                <button
                                  onClick={() => handleFixMarkdownImages(post)}
                                  className="mt-1 text-xs text-blue-600 hover:underline"
                                  title="마크다운 이미지 URL 정규화"
                                >
                                  URL 수정
                                </button>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs">없음</span>
                          )}
                        </td>
                        
                        <td className="py-3 px-3 border-b">
                          <div className="flex flex-col gap-1 items-center">
                            <Link
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              보기
                            </Link>
                            <Link
                              href={`/admin/posts/edit/${post.id}`}
                              className="text-orange-600 hover:underline text-sm"
                            >
                              편집
                            </Link>
                            <button
                              onClick={() => navigator.clipboard.writeText(post.slug)}
                              className="text-gray-500 hover:text-gray-700 text-sm"
                            >
                              슬러그 복사
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
} 