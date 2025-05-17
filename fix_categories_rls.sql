-- 카테고리 테이블의 현재 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'categories';

-- 인증된 사용자가 카테고리를 삭제할 수 있도록 정책 설정
-- 기존 정책 삭제
DROP POLICY IF EXISTS "Allow authenticated users to manage categories" ON "public"."categories";

-- 더 구체적인 정책으로 교체
-- 읽기 정책 (모든 사용자)
DROP POLICY IF EXISTS "Allow public read access for categories" ON "public"."categories";
CREATE POLICY "categories_select" ON "public"."categories" 
FOR SELECT USING (true);

-- 추가 정책 (인증된 사용자)
CREATE POLICY "categories_insert" ON "public"."categories" 
FOR INSERT TO authenticated 
WITH CHECK (true);

-- 수정 정책 (인증된 사용자)
CREATE POLICY "categories_update" ON "public"."categories" 
FOR UPDATE TO authenticated 
USING (true);

-- 삭제 정책 (인증된 사용자)
CREATE POLICY "categories_delete" ON "public"."categories" 
FOR DELETE TO authenticated 
USING (true);

-- 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'categories'; 