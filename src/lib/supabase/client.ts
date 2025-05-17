import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// 환경 변수 확인
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase 환경 변수가 설정되지 않았습니다:', { 
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ? '설정됨' : '설정안됨',
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '설정됨' : '설정안됨'
  });
}

// 서버 컴포넌트에서 사용할 Supabase 클라이언트 생성
// 기존 cookies 기반 접근 방식 대신, 서버 컴포넌트에 최적화된 직접 클라이언트 초기화 사용
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Next.js 서버 컴포넌트에서 안전하게 사용할 수 있는 Supabase 클라이언트 생성 함수
export function createSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// 보안 작업을 위한 서버 전용 Supabase 클라이언트 (서비스 롤 키 사용)
// 주의: 이 클라이언트는 절대 클라이언트 컴포넌트에서 직접 접근하면 안 됨
export function createSupabaseServerClient() {
  // 서버 측 secret key가 있는 경우에만 사용
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
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