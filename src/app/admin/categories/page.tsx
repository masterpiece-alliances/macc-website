'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Category } from '@/lib/types';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 카테고리 목록 불러오기
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        throw error;
      }

      setCategories(data as Category[]);
    } catch (error) {
      console.error('카테고리 로드 중 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 슬러그 자동 생성
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // 카테고리 이름 변경 시 슬러그 자동 업데이트
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const name = e.target.value;
    
    if (isEditing && editingCategory) {
      // 편집 모드에서 슬러그가 수동으로 변경되지 않았거나, 이름이 변경된 경우에만 슬러그 업데이트
      if (editingCategory.slug === generateSlug(editingCategory.name)) {
        setEditingCategory({
          ...editingCategory,
          name,
          slug: generateSlug(name),
        });
      } else {
        setEditingCategory({
          ...editingCategory,
          name,
        });
      }
    } else {
      // 새 카테고리 생성 모드
      setNewCategory({
        ...newCategory,
        name,
        slug: generateSlug(name),
      });
    }
  };

  // 카테고리 추가
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (!newCategory.name.trim()) {
        setError('카테고리 이름은 필수입니다.');
        return;
      }

      const { data, error } = await supabase
        .from('categories')
        .insert([newCategory])
        .select();

      if (error) {
        throw error;
      }

      // 카테고리 추가 후 목록 갱신 및 입력 필드 초기화
      await fetchCategories();
      setNewCategory({ name: '', slug: '', description: '' });
    } catch (error) {
      console.error('카테고리 추가 중 오류:', error);
      setError('카테고리 추가에 실패했습니다.');
    }
  };

  // 카테고리 편집 모드 설정
  const handleEdit = (category: Category) => {
    setEditingCategory(category);
  };

  // 카테고리 업데이트
  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingCategory) return;
    
    try {
      if (!editingCategory.name.trim()) {
        setError('카테고리 이름은 필수입니다.');
        return;
      }

      const { error } = await supabase
        .from('categories')
        .update({
          name: editingCategory.name,
          slug: editingCategory.slug,
          description: editingCategory.description,
        })
        .eq('id', editingCategory.id);

      if (error) {
        throw error;
      }

      // 카테고리 업데이트 후 목록 갱신 및 편집 모드 종료
      await fetchCategories();
      setEditingCategory(null);
    } catch (error) {
      console.error('카테고리 업데이트 중 오류:', error);
      setError('카테고리 업데이트에 실패했습니다.');
    }
  };

  // 카테고리 삭제
  const handleDelete = async (id: string) => {
    if (!window.confirm('이 카테고리를 삭제하시겠습니까? 관련된 포스트는 카테고리가 없어집니다.')) {
      return;
    }

    try {
      // 삭제 전에 해당 카테고리를 사용하는 포스트가 있는지 확인
      const { data: relatedPosts, error: checkError } = await supabase
        .from('posts')
        .select('id')
        .eq('category_id', id);
      
      if (checkError) {
        console.error('관련 포스트 확인 중 오류:', JSON.stringify(checkError, null, 2));
        throw new Error('카테고리와 관련된 포스트를 확인하는 중 오류가 발생했습니다.');
      }
      
      // 관련 포스트가 있으면 먼저 해당 포스트의 category_id를 null로 업데이트
      if (relatedPosts && relatedPosts.length > 0) {
        console.log(`${relatedPosts.length}개의 관련 포스트 카테고리 연결 해제 중...`);
        
        const { error: updateError } = await supabase
          .from('posts')
          .update({ category_id: null })
          .eq('category_id', id);
        
        if (updateError) {
          console.error('포스트 카테고리 연결 해제 중 오류:', JSON.stringify(updateError, null, 2));
          throw new Error('포스트에서 카테고리 연결을 해제하는 중 오류가 발생했습니다.');
        }
      }
      
      // 카테고리 삭제 시도
      console.log(`카테고리 ID ${id} 삭제 시도...`);
      const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (deleteError) {
        console.error('카테고리 삭제 중 상세 오류:', JSON.stringify(deleteError, null, 2));
        throw new Error(`카테고리 삭제 실패: ${deleteError.message || '알 수 없는 오류'}`);
      }

      console.log('카테고리 삭제 성공');
      
      // 카테고리 삭제 후 목록 갱신
      await fetchCategories();
    } catch (error) {
      console.error('카테고리 삭제 중 오류:', error instanceof Error ? error.message : JSON.stringify(error, null, 2));
      
      // 사용자에게 표시할 오류 메시지
      const errorMessage = error instanceof Error 
        ? error.message 
        : (typeof error === 'object' && error !== null)
          ? JSON.stringify(error)
          : '카테고리 삭제에 실패했습니다.';
          
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">카테고리 관리</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* 카테고리 추가 폼 */}
      {!editingCategory && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-3">새 카테고리 추가</h2>
          <form onSubmit={handleAddCategory}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-1">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => handleNameChange(e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="slug" className="block text-gray-700 mb-1">
                  슬러그 <span className="text-red-500">*</span>
                </label>
                <input
                  id="slug"
                  type="text"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 mb-1">
                설명
              </label>
              <textarea
                id="description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                rows={2}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              카테고리 추가
            </button>
          </form>
        </div>
      )}

      {/* 카테고리 편집 폼 */}
      {editingCategory && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-3">카테고리 편집</h2>
          <form onSubmit={handleUpdateCategory}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="edit-name" className="block text-gray-700 mb-1">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  id="edit-name"
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => handleNameChange(e, true)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-slug" className="block text-gray-700 mb-1">
                  슬러그 <span className="text-red-500">*</span>
                </label>
                <input
                  id="edit-slug"
                  type="text"
                  value={editingCategory.slug}
                  onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="edit-description" className="block text-gray-700 mb-1">
                설명
              </label>
              <textarea
                id="edit-description"
                value={editingCategory.description || ''}
                onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                rows={2}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                저장
              </button>
              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 카테고리 목록 */}
      <div className="bg-white rounded shadow overflow-hidden">
        <h2 className="text-lg font-semibold p-4 border-b">카테고리 목록</h2>
        
        {loading ? (
          <div className="p-4 text-center">카테고리 로딩 중...</div>
        ) : categories.length === 0 ? (
          <div className="p-4 text-center">등록된 카테고리가 없습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">이름</th>
                  <th className="px-4 py-2 text-left">슬러그</th>
                  <th className="px-4 py-2 text-left">설명</th>
                  <th className="px-4 py-2 text-left">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="px-4 py-3 font-medium">{category.name}</td>
                    <td className="px-4 py-3">{category.slug}</td>
                    <td className="px-4 py-3">{category.description || '-'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-blue-600 hover:underline"
                        >
                          편집
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600 hover:underline"
                        >
                          삭제
                        </button>
                      </div>
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