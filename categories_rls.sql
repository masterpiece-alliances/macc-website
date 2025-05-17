-- categories 테이블 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'categories';

-- 기존 정책 삭제 (필요한 경우)
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."categories";

-- 카테고리 테이블에 대한 공개 읽기 접근 정책 추가
CREATE POLICY "Allow public read access for categories" ON "public"."categories"
FOR SELECT USING (true);

-- 인증된 사용자에게만 카테고리 생성/수정/삭제 권한 부여
CREATE POLICY "Allow authenticated users to manage categories" ON "public"."categories"
FOR ALL TO authenticated
USING (true)
WITH CHECK (true); 