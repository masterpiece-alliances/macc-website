-- posts 테이블 존재 여부 확인
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'posts'
);

-- posts 테이블이 없으면 생성
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug TEXT NOT NULL UNIQUE,
  featured_image TEXT,
  category_id UUID REFERENCES public.categories(id),
  author_id UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- posts 테이블에 RLS 활성화
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 현재 posts 테이블의 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'posts';

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."posts";
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON "public"."posts";
DROP POLICY IF EXISTS "Enable update for users based on id" ON "public"."posts";
DROP POLICY IF EXISTS "Enable delete for users based on id" ON "public"."posts";

-- 새로운 정책 생성
-- 모든 사용자에게 조회 권한 부여
CREATE POLICY "posts_select" ON "public"."posts" 
FOR SELECT USING (true);

-- 인증된 사용자에게 생성 권한 부여
CREATE POLICY "posts_insert" ON "public"."posts" 
FOR INSERT TO authenticated 
WITH CHECK (true);

-- 작성자만 수정 권한
CREATE POLICY "posts_update" ON "public"."posts" 
FOR UPDATE TO authenticated 
USING (auth.uid() = author_id);

-- 작성자만 삭제 권한
CREATE POLICY "posts_delete" ON "public"."posts" 
FOR DELETE TO authenticated 
USING (auth.uid() = author_id);

-- 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'posts'; 