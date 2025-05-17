# Supabase 연결 문제 해결 가이드

## 1. 환경 변수 설정 확인

Supabase 환경 변수가 제대로 설정되어 있는지 확인하세요:

```
NEXT_PUBLIC_SUPABASE_URL=https://실제-프로젝트-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=실제-anon-key
```

이 정보는 Supabase 대시보드의 Project Settings > API에서 찾을 수 있습니다.

## 2. 테이블 및 스토리지 설정

### 필요한 테이블 생성

Supabase SQL 에디터에서 아래 파일의 쿼리를 순서대로 실행하세요:

1. `categories_rls.sql` - 카테고리 테이블 및 정책 설정
2. `posts_table_setup.sql` - 포스트 테이블 및 정책 설정
3. `storage_setup.sql` - 블로그 이미지 스토리지 설정

### 테이블 구조 확인

각 테이블이 올바르게 생성되었는지 확인:

```sql
-- 카테고리 테이블 확인
SELECT * FROM information_schema.tables WHERE table_name = 'categories';
-- 포스트 테이블 확인
SELECT * FROM information_schema.tables WHERE table_name = 'posts';
```

## 3. 무한 재귀 오류 해결 (42P17)

`users` 테이블에서 무한 재귀 오류(42P17)가 발생하는 경우, 다음 SQL을 Supabase SQL 에디터에서 실행하여 해결합니다:

```sql
-- 모든 users 테이블 정책 삭제
DROP POLICY IF EXISTS "Allow read access for authenticated users" ON "public"."users";
DROP POLICY IF EXISTS "Allow update for user own data" ON "public"."users";
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."users";
DROP POLICY IF EXISTS "Enable update for users based on id" ON "public"."users";
DROP POLICY IF EXISTS "users_select" ON "public"."users";
DROP POLICY IF EXISTS "users_update_own" ON "public"."users";

-- 더 단순한 정책 생성 (무한 재귀 방지)
CREATE POLICY "users_select_simple" ON "public"."users" 
FOR SELECT USING (true);

CREATE POLICY "users_update_simple" ON "public"."users" 
FOR UPDATE USING (auth.uid() = id);
```

## 4. 포스트 저장 문제 해결

포스트 저장 중 오류가 발생하는 경우, 다음을 확인하세요:

1. 브라우저 콘솔에서 자세한 오류 메시지를 확인
2. `author_id`가 올바르게 설정되었는지 확인 
3. `slug` 필드가 고유한지 확인 (이미 존재하는 슬러그를 사용하면 오류 발생)
4. `category_id`가 유효한지 확인 (존재하는 카테고리의 ID인지)

## 5. 이미지 업로드 문제 해결

이미지 업로드 오류가 발생하는 경우:

1. `blog-images` 스토리지 버킷이 존재하는지 확인
2. 사용자가 스토리지에 업로드할 권한이 있는지 확인
3. 파일 크기가 너무 크지 않은지 확인 (8MB 이하 권장)

## 6. 브라우저 캐시 및 서버 재시작

문제가 지속되면 다음 단계를 수행하세요:

1. 브라우저 캐시 삭제 (Ctrl+F5 또는 Cmd+Shift+R)
2. Next.js 서버 재시작:

```sh
npm run dev
```

3. 필요한 경우 브라우저를 다시 시작 