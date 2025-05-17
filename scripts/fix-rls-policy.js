// fix-rls-policy.js
// Supabase RLS 정책 수정 안내

console.log('Supabase RLS 정책 무한 재귀 문제를 해결하기 위한 SQL 명령어:');
console.log('\n===========================================\n');
console.log('-- 기존 정책 삭제');
console.log('DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."users";');
console.log('DROP POLICY IF EXISTS "Enable update for users based on id" ON "public"."users";');
console.log('\n-- 새 정책 생성');
console.log('CREATE POLICY "Allow read access for authenticated users" ON "public"."users" FOR SELECT TO authenticated USING (true);');
console.log('CREATE POLICY "Allow update for user own data" ON "public"."users" FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);');
console.log('\n===========================================\n');
console.log('위 SQL 명령을 Supabase 대시보드의 SQL 편집기에서 실행하세요:');
console.log('1. Supabase 대시보드에 로그인');
console.log('2. 프로젝트 선택');
console.log('3. 왼쪽 메뉴에서 "SQL Editor" 선택');
console.log('4. "New Query" 클릭');
console.log('5. 위 SQL 명령어를 복사하여 붙여넣기');
console.log('6. "RUN" 버튼 클릭하여 실행');
console.log('\n이렇게 하면 무한 재귀 문제가 해결됩니다.'); 