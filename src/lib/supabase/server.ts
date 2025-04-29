import { createClient } from '@supabase/supabase-js';

/**
 * 서버 측에서만 사용되는 Supabase 클라이언트를 생성합니다.
 * 이 함수는 서버 컴포넌트나 API 라우트에서만 호출되어야 합니다.
 */
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
  }
  
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false, // 서버 측에서는 세션을 유지하지 않음
    }
  });
}

/**
 * 데이터베이스 오류를 처리하는 유틸리티 함수
 */
export function handleDatabaseError(error: unknown): string {
  console.error('데이터베이스 오류:', error);
  
  // 사용자에게 보여줄 일반적인 오류 메시지
  let errorMessage = '데이터를 처리하는 중 오류가 발생했습니다.';
  
  // 개발 환경에서는 상세 오류 표시
  if (process.env.NODE_ENV === 'development') {
    errorMessage += ` 상세 오류: ${error instanceof Error ? error.message : String(error)}`;
  }
  
  return errorMessage;
}

/**
 * 서버 전용 함수임을 명시하는 유틸리티
 */
export function ensureServerSide(): void {
  if (typeof window !== 'undefined') {
    throw new Error('이 함수는 서버 측에서만 호출되어야 합니다.');
  }
} 