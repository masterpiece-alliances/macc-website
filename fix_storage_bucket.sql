-- Supabase 스토리지 설정 스크립트
-- 주의: 이 스크립트는 SQL 에디터에서 실행해야 합니다

-- 1. 버킷 설정
-- 버킷이 존재하는지 확인
SELECT * FROM storage.buckets WHERE name = 'blog-images';

-- 버킷이 없으면 생성
INSERT INTO storage.buckets (id, name, public)
SELECT 'blog-images', 'blog-images', true
WHERE NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE name = 'blog-images'
);

-- 2. 기존 정책 제거 (충돌 방지)
DO $$
BEGIN
    -- 기존 정책 삭제
    DROP POLICY IF EXISTS "Public Access Blog Images" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated Users Can Upload Blog Images" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated Users Can Update Blog Images" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated Users Can Delete Blog Images" ON storage.objects;
    DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
    DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
    DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
    DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
    
    RAISE NOTICE 'Successfully removed any existing policies';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error removing policies: %', SQLERRM;
END $$;

-- 3. 새 정책 생성
-- 공개 읽기 접근 정책 생성
CREATE POLICY "Allow public read access" 
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- 인증된 사용자만 파일 업로드 가능
CREATE POLICY "Allow authenticated uploads" 
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'blog-images');

-- 인증된 사용자만 파일 업데이트 가능
CREATE POLICY "Allow authenticated updates" 
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'blog-images');

-- 인증된 사용자만 파일 삭제 가능
CREATE POLICY "Allow authenticated deletes" 
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'blog-images');

-- 4. 버킷과 정책 확인
-- 버킷 확인
SELECT * FROM storage.buckets WHERE name = 'blog-images';

-- 정책 확인
SELECT 
    policyname, 
    tablename, 
    permissive, 
    roles, 
    cmd 
FROM pg_policies 
WHERE schemaname = 'storage' AND tablename = 'objects';

-- 5. 기본 폴더 생성을 위한 안내
-- 주의: SQL에서 직접 폴더를 생성할 수 없음. 이는 참고용 주석입니다.
/*
Supabase 대시보드에서 다음을 수행하세요:
1. Storage > blog-images 버킷으로 이동
2. "Create folder" 버튼 클릭
3. "featured-images" 폴더 생성
*/ 