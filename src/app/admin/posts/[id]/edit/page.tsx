'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Post } from '@/lib/types';
import PostEditor from '@/components/admin/PostEditor';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) {
          throw error;
        }

        setPost(data as Post);
      } catch (error) {
        console.error('포스트 로드 중 오류:', error);
        setError('포스트를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.id]);

  if (loading) {
    return <div>포스트 로딩 중...</div>;
  }

  if (error || !post) {
    return <div className="text-red-600">{error || '포스트를 찾을 수 없습니다.'}</div>;
  }

  return <PostEditor post={post} isEditMode={true} />;
} 