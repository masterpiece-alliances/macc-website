import { supabase } from './supabase/client';
import { User } from './types';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.log('[ Server ] 로그인 세션이 없습니다.');
      return null;
    }

    console.log('[ Server ] 세션 확인됨:', session.user.id);

    // 기본 사용자 정보 (auth에서 가져온 것)
    const basicUser: User = {
      id: session.user.id,
      email: session.user.email || '',
      role: 'admin', // 기본값을 admin으로 설정 (User 타입에 맞게)
    };

    try {
      // 사용자 정보 가져오기
      console.log('[ Server ] users 테이블에서 사용자 정보 조회 시도...');
      const { data, error } = await supabase
        .from('users')
        .select('id, email, role')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('[ Server ] 사용자 정보 조회 중 오류:', JSON.stringify(error));
        // 오류 상세 정보 로깅
        if (error.code) console.error('오류 코드:', error.code);
        if (error.message) console.error('오류 메시지:', error.message);
        if (error.details) console.error('오류 상세:', error.details);
        
        return basicUser; // 에러가 있어도 기본 정보 반환
      }

      // role 값이 User 타입에 맞는지 확인
      if (data && (data.role === 'admin' || data.role === 'editor')) {
        console.log('[ Server ] 사용자 정보 조회 성공:', data);
        return data as User;
      } else if (data) {
        // role이 타입에 맞지 않으면 기본값 'admin'으로 설정
        console.log('[ Server ] 사용자 role 값 조정:', data.role, '→ admin');
        return { ...data, role: 'admin' as const } as User;
      } else {
        return basicUser;
      }
    } catch (dbError) {
      console.error('[ Server ] 사용자 테이블 조회 중 오류:', dbError instanceof Error ? dbError.message : JSON.stringify(dbError));
      return basicUser; // 에러가 있어도 기본 정보 반환
    }
  } catch (error) {
    console.error('[ Server ] 인증 세션 조회 중 오류:', error instanceof Error ? error.message : JSON.stringify(error));
    return null;
  }
}

export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === 'admin';
}

export async function requireAdmin() {
  const isUserAdmin = await isAdmin();
  if (!isUserAdmin) {
    throw new Error('관리자만 접근할 수 있습니다.');
  }
} 