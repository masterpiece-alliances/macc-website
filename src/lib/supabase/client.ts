import { createClient } from '@supabase/supabase-js'

// 환경 변수 또는 기본값 설정 (빌드를 위한 더미 URL)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key-for-build'

// 환경 변수 확인 (실제 실행 시 로깅 용도)
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('Supabase 환경 변수가 설정되지 않았습니다:', { 
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ? '설정됨' : '설정안됨',
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '설정됨' : '설정안됨',
    env: process.env.NODE_ENV || '설정안됨',
    vercel_env: process.env.VERCEL_ENV || '설정안됨'
  });
}

// 서버 컴포넌트에서 사용할 Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
});

// 클라이언트 초기화 확인 로깅
try {
  // 간단한 쿼리로 연결 테스트
  supabase.from('posts').select('count', { count: 'exact', head: true }).then(({ count, error }) => {
    if (error) {
      console.error('[Supabase] 연결 테스트 실패:', error);
      return;
    }
    console.log(`[Supabase] 연결 테스트 성공, 포스트 수: ${count}`);
  });
} catch (error) {
  console.error('[Supabase] 클라이언트 초기화 오류:', error);
}

// Next.js 서버 컴포넌트에서 안전하게 사용할 수 있는 Supabase 클라이언트 생성 함수
export function createSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    }
  });
}

// 보안 작업을 위한 서버 전용 Supabase 클라이언트 (서비스 롤 키 사용)
// 주의: 이 클라이언트는 절대 클라이언트 컴포넌트에서 직접 접근하면 안 됨
export function createSupabaseServerClient() {
  // 서버 측 secret key가 있는 경우에만 사용
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return createClient(
      supabaseUrl,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );
  }
  
  // 서비스 롤 키가 없으면 일반 클라이언트 반환
  console.warn('서비스 롤 키가 없어 일반 클라이언트를 반환합니다. 관리자 기능이 제한될 수 있습니다.');
  return createSupabaseClient();
} 