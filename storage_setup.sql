-- blog-images 버킷 생성 확인 및 생성
-- 실행 시 주의: 버킷이 이미 존재하는 경우 무시됩니다.
SELECT * FROM storage.buckets WHERE name = 'blog-images';

-- 버킷이 없으면 생성
INSERT INTO storage.buckets (id, name, public)
SELECT 'blog-images', 'blog-images', true
WHERE NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE name = 'blog-images'
);

-- 스토리지 버킷 정책 설정
-- 모든 사용자가 이미지 읽기 접근 가능
DROP POLICY IF EXISTS "Public Access Blog Images" ON storage.objects;
CREATE POLICY "Public Access Blog Images" 
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- 인증된 사용자만 이미지 삽입 가능
DROP POLICY IF EXISTS "Authenticated Users Can Upload Blog Images" ON storage.objects;
CREATE POLICY "Authenticated Users Can Upload Blog Images" 
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'blog-images');

-- 인증된 사용자만 이미지 업데이트 가능
DROP POLICY IF EXISTS "Authenticated Users Can Update Blog Images" ON storage.objects;
CREATE POLICY "Authenticated Users Can Update Blog Images" 
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'blog-images');

-- 인증된 사용자만 이미지 삭제 가능
DROP POLICY IF EXISTS "Authenticated Users Can Delete Blog Images" ON storage.objects;
CREATE POLICY "Authenticated Users Can Delete Blog Images" 
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'blog-images'); 