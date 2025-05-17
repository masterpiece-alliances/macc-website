// 인증 관련 타입
export type User = {
  id: string;
  email: string;
  role: 'admin' | 'editor';
}

// 블로그 포스트 관련 타입
export type Post = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  featured_image?: string;
  author_id: string;
  category_id?: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  published_at?: string;
  categories?: Category; // Supabase 관계 데이터
}

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export type Tag = {
  id: string;
  name: string;
  slug: string;
}

// 페이지네이션 타입
export type PaginationParams = {
  page: number;
  limit: number;
}

// API 응답 타입
export type ApiResponse<T> = {
  data?: T;
  error?: string;
} 