'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Post, Category } from '@/lib/types';
import dynamic from 'next/dynamic';
import { generateSlug as generateSlugUtil } from '@/lib/utils/slug-utils';

// 마크다운 에디터 동적 임포트 (클라이언트 측에서만 로드)
const MDEditor = dynamic(() => import('@uiw/react-md-editor').then(mod => mod.default), { ssr: false });
const MDPreview = dynamic(() => import('@uiw/react-md-editor').then(mod => mod.default.Markdown), { ssr: false });

// rehype 관련 코드 제거

interface PostEditorProps {
  post?: Post; // 수정 모드인 경우 제공
  isEditMode?: boolean;
}

export default function PostEditor({ post, isEditMode = false }: PostEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [categoryId, setCategoryId] = useState(post?.category_id || '');
  const [status, setStatus] = useState<'draft' | 'published'>(post?.status || 'draft');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState(post?.featured_image || '');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 카테고리 목록 불러오기
  useEffect(() => {
    async function fetchCategories() {
      try {
        // 카테고리 요청 전에 supabase 설정 확인
        if (!supabase || !supabase.from) {
          console.error('카테고리 로드 중 오류: Supabase 클라이언트가 초기화되지 않았습니다');
          return;
        }

        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (error) {
          console.error('카테고리 로드 중 오류:', JSON.stringify(error, null, 2));
          throw error;
        }

        if (!data) {
          console.error('카테고리 로드 중 오류: 데이터가 없습니다');
          return;
        }

        setCategories(data as Category[]);
        console.log('카테고리 로드 성공:', data.length);
      } catch (error) {
        console.error('카테고리 로드 중 오류:', error);
        // 오류 상태 설정 (UI에 표시 가능)
        setError('카테고리를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }

    fetchCategories();
  }, []);

  // 제목에서 슬러그 자동 생성
  const generateSlug = (title: string) => {
    // 수정 모드에서는 기존 슬러그 유지 (사용자가 직접 변경한 경우는 제외)
    if (isEditMode && post?.slug && post.slug === slug) {
      return post.slug; // 사용자가 변경하지 않은 경우 기존 슬러그 유지
    }
    
    // 향상된 슬러그 생성 유틸리티 사용
    return generateSlugUtil(title, { addUniqueId: !isEditMode });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    // 슬러그를 직접 수정하지 않았을 때만 자동 생성
    // 초기 렌더링이거나 사용자가 아직 슬러그를 편집하지 않은 경우
    if (!isEditMode || (post && slug === post.slug)) {
      setSlug(generateSlug(newTitle));
    }
  };

  // 이미지 업로드 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 유형 검증
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    setFeaturedImage(file);
    setFeaturedImagePreview(URL.createObjectURL(file));
  };

  // 이미지 삭제 처리 함수
  const handleImageDelete = () => {
    // 파일 업로드 입력 초기화
    const fileInput = document.getElementById('featuredImage') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    
    // 이미지 상태 초기화
    setFeaturedImage(null);
    setFeaturedImagePreview('');
    
    // 수정 모드인 경우 기존 이미지 URL도 제거
    if (isEditMode && post?.featured_image) {
      // 실제 저장은 폼 제출 시 이루어집니다
      console.log('기존 이미지 URL 제거:', post.featured_image);
    }
  };

  // 이미지 업로드 함수
  const uploadFeaturedImage = async (file: File): Promise<string | undefined> => {
    try {
      if (!file) {
        throw new Error('업로드할 파일이 없습니다.');
      }

      console.log('이미지 업로드 시작:', file.name, file.type, file.size);
      
      // Supabase 클라이언트 확인
      if (!supabase || !supabase.storage) {
        throw new Error('스토리지 클라이언트가 초기화되지 않았습니다.');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `featured-images/${fileName}`;

      console.log('업로드 경로:', filePath);

      // 직접 파일 업로드 시도
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) {
        console.error('파일 업로드 오류:', JSON.stringify(uploadError, null, 2));
        throw new Error(`파일 업로드 실패: ${uploadError.message}`);
      }
      
      console.log('파일 업로드 성공:', uploadData);

      // 공개 URL 가져오기
      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);
      
      if (!urlData || !urlData.publicUrl) {
        throw new Error('업로드된 파일의 URL을 가져올 수 없습니다.');
      }
      
      console.log('파일 URL 생성 성공:', urlData.publicUrl);
      return urlData.publicUrl;
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      throw error; // 상위 함수에서 처리하도록 다시 throw
    }
  };

  // 캐시 재검증 함수 추가
  const revalidateCache = async (path: string = '/blog') => {
    try {
      console.log('캐시 재검증 시작:', path);
      // 환경 변수 또는 config에서 설정된 토큰 사용
      const token = process.env.NEXT_PUBLIC_REVALIDATE_SECRET_TOKEN || 'your-secret-token';
      const response = await fetch(`/api/revalidate?token=${token}&path=${path}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(`재검증 실패: ${data.message || response.statusText}`);
      }
      
      console.log('캐시 재검증 성공:', data);
      return true;
    } catch (error) {
      console.error('캐시 재검증 중 오류:', error);
      return false;
    }
  };

  // 포스트 저장 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 기본 유효성 검사
      if (!title.trim()) {
        throw new Error('제목을 입력해주세요.');
      }

      if (!content.trim()) {
        throw new Error('내용을 입력해주세요.');
      }

      // 이미지 업로드 처리
      let imageUrl = post?.featured_image || '';
      if (featuredImage) {
        try {
          // 버킷 존재 확인 대신 바로 업로드 시도
          const uploadedUrl = await uploadFeaturedImage(featuredImage);
          if (uploadedUrl) {
            imageUrl = uploadedUrl;
          }
        } catch (uploadErr) {
          console.error('이미지 업로드 오류:', 
            typeof uploadErr === 'object' ? JSON.stringify(uploadErr, null, 2) : uploadErr);
          const continueWithoutImage = window.confirm('이미지 업로드 중 오류가 발생했습니다. 이미지 없이 계속 진행할까요?');
          if (!continueWithoutImage) {
            throw new Error(`이미지 업로드 중 오류: ${uploadErr instanceof Error ? uploadErr.message : '알 수 없는 오류'}`);
          }
          // 사용자가 확인했으면 이미지 없이 계속 진행
        }
      }

      // 슬러그가 비어있으면 자동 생성
      if (!slug.trim()) {
        const generatedSlug = generateSlug(title);
        setSlug(generatedSlug);
      }

      // 항상 고유한 슬러그 생성을 위한 랜덤 ID 추가
      const uniqueId = Date.now().toString().slice(-6) + Math.random().toString(36).substring(2, 5);
      const finalSlug = isEditMode && post?.slug === slug 
        ? slug // 수정 모드에서 변경되지 않은 경우 그대로 유지
        : `${slug.trim()}-${uniqueId}`; // 그 외 경우 고유 ID 추가

      // 현재 시간
      const now = new Date().toISOString();

      // 마크다운에서 텍스트만 추출하는 함수
      const extractTextFromMarkdown = (markdown: string) => {
        return markdown
          .replace(/#+\s+(.*)\n/g, '$1 ') // 제목 태그 처리
          .replace(/\*\*(.*?)\*\*/g, '$1') // 볼드 처리
          .replace(/\*(.*?)\*/g, '$1') // 이탤릭 처리
          .replace(/!\[(.*?)\]\((.*?)\)/g, '') // 이미지 태그 제거
          .replace(/\[(.*?)\]\((.*?)\)/g, '$1') // 링크 태그 처리
          .replace(/```[\s\S]*?```/g, '') // 코드 블록 제거
          .replace(/`(.*?)`/g, '$1') // 인라인 코드 처리
          .replace(/\n/g, ' ') // 줄바꿈을 공백으로
          .trim();
      };

      const postData = {
        title,
        content,
        excerpt: excerpt || extractTextFromMarkdown(content).slice(0, 150),
        slug: finalSlug,
        featured_image: imageUrl,
        category_id: categoryId || null,
        status,
        updated_at: now,
      };

      // 저장 전 로그
      console.log('저장할 포스트 데이터:', postData);

      let result;
      
      try {
        if (isEditMode && post) {
          // 기존 포스트 업데이트
          console.log('포스트 업데이트 시작:', post.id);
          result = await supabase.from('posts').update(postData).eq('id', post.id);
        } else {
          // 새 포스트 생성
          console.log('새 포스트 생성 시작');
          try {
            const userData = await supabase.auth.getUser();
            
            if (userData.data.user) {
              // 사용자 정보가 있는 경우
              result = await supabase.from('posts').insert({
                ...postData,
                created_at: new Date().toISOString(),
                author_id: userData.data.user.id,
                published_at: status === 'published' ? new Date().toISOString() : null,
              });
            } else {
              // 사용자 정보를 가져올 수 없는 경우 (임시 처리)
              console.warn('사용자 인증 정보가 없습니다. 기본 작성자 ID를 사용합니다.');
              result = await supabase.from('posts').insert({
                ...postData,
                created_at: new Date().toISOString(),
                author_id: 'default-author', // 임시 ID 사용
                published_at: status === 'published' ? new Date().toISOString() : null,
              });
            }
          } catch (authErr) {
            console.error('사용자 인증 오류:', authErr);
            // 인증 오류 발생 시 임시 ID로 시도
            result = await supabase.from('posts').insert({
              ...postData,
              created_at: new Date().toISOString(),
              author_id: 'default-author', // 임시 ID 사용
              published_at: status === 'published' ? new Date().toISOString() : null,
            });
          }
        }
        
        console.log('Supabase 응답:', JSON.stringify(result, null, 2));
      } catch (dbErr) {
        console.error('데이터베이스 작업 오류:', dbErr);
        throw new Error('데이터베이스 작업 중 오류가 발생했습니다.');
      }

      if (result.error) {
        console.error('Supabase 오류 상세:', JSON.stringify(result.error, null, 2));
        throw new Error(`저장 오류: ${result.error.message || '알 수 없는 오류'}`);
      }

      // 성공 시 캐시 재검증 실행
      if (status === 'published') {
        console.log('포스트가 발행되어 캐시 재검증 시작');
        // 블로그 목록과 개별 포스트 페이지 모두 재검증
        await Promise.all([
          revalidateCache('/blog'),
          revalidateCache(`/blog/${finalSlug}`)
        ]);
      }

      // 성공 시 목록 페이지로 이동
      console.log('포스트 저장 성공');
      router.push('/admin/posts');
    } catch (err) {
      console.error('포스트 저장 중 오류:', JSON.stringify(err, null, 2));
      
      // 오류 객체를 문자열로 변환하여 상세 내용 표시
      const errorMessage = err instanceof Error 
        ? err.message 
        : (typeof err === 'object' && err !== null)
          ? JSON.stringify(err)
          : '포스트 저장 중 오류가 발생했습니다.';
          
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? '포스트 수정' : '새 포스트 작성'}
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* 제목 */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* 슬러그 */}
        <div className="mb-4">
          <label htmlFor="slug" className="block text-gray-700 mb-2">
            슬러그 <span className="text-red-500">*</span>
          </label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            URL에 사용될 고유 식별자(예: my-blog-post)
          </p>
        </div>

        {/* 카테고리 */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 mb-2">
            카테고리
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">카테고리 선택</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* 대표 이미지 */}
        <div className="mb-4">
          <label htmlFor="featuredImage" className="block text-gray-700 mb-2">
            대표 이미지
          </label>
          <input
            id="featuredImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {featuredImagePreview && (
            <div className="mt-2">
              <div className="flex flex-col">
                <img
                  src={featuredImagePreview}
                  alt="대표 이미지 미리보기"
                  className="max-w-full h-auto max-h-64 object-contain mb-2"
                />
                <button
                  type="button"
                  onClick={handleImageDelete}
                  className="self-start px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  이미지 삭제
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 요약 */}
        <div className="mb-4">
          <label htmlFor="excerpt" className="block text-gray-700 mb-2">
            요약
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="포스트 요약을 입력하세요. 비워두면 본문에서 자동 추출합니다."
          />
        </div>

        {/* 마크다운 에디터 */}
        <div className="mb-4" data-color-mode="light">
          <label htmlFor="content" className="block text-gray-700 mb-2">
            내용 <span className="text-red-500">*</span>
          </label>
          <div className="border border-gray-300 rounded">
            <MDEditor
              value={content}
              onChange={(value) => setContent(value || '')}
              height={400}
              preview="edit"
            />
          </div>
        </div>

        {/* 상태 */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            상태
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="status"
                value="draft"
                checked={status === 'draft'}
                onChange={() => setStatus('draft')}
              />
              <span className="ml-2">초안</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="status"
                value="published"
                checked={status === 'published'}
                onChange={() => setStatus('published')}
              />
              <span className="ml-2">발행</span>
            </label>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 mr-2"
            disabled={loading}
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? '저장 중...' : isEditMode ? '수정하기' : '작성하기'}
          </button>
        </div>
      </form>
    </div>
  );
} 