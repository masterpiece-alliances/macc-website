-- external_url 컬럼이 이미 존재하는지 확인
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'posts' 
        AND column_name = 'external_url'
    ) THEN
        -- external_url 컬럼 추가
        ALTER TABLE public.posts 
        ADD COLUMN external_url TEXT;
        
        RAISE NOTICE 'external_url 컬럼이 추가되었습니다.';
    ELSE
        RAISE NOTICE 'external_url 컬럼이 이미 존재합니다.';
    END IF;
END $$; 