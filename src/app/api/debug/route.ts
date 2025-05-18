import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// 보안 토큰 - 실제 환경에서는 강력한 토큰으로 변경 필요
const DEBUG_SECRET_TOKEN = process.env.DEBUG_SECRET_TOKEN || 'debug-token-secret';

export async function GET(request: NextRequest) {
  try {
    // 요청으로부터 토큰 추출
    const token = request.nextUrl.searchParams.get('token');
    
    // 권한 확인
    if (token !== DEBUG_SECRET_TOKEN) {
      console.warn('[DebugAPI] 인증 실패. 잘못된 토큰');
      return NextResponse.json(
        { 
          success: false, 
          message: '인증 실패: 잘못된 토큰입니다.'
        },
        { status: 401 }
      );
    }
    
    // 환경 정보 수집
    const environmentInfo = {
      timestamp: new Date().toISOString(),
      nextJs: {
        version: process.env.NEXT_PUBLIC_VERSION || '정보 없음',
        environment: process.env.NODE_ENV || '정보 없음',
        vercelEnv: process.env.VERCEL_ENV || '정보 없음',
      },
      supabase: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? '설정됨' : '설정안됨',
        anonymousKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '설정됨' : '설정안됨',
        serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? '설정됨' : '설정안됨',
      }
    };
    
    // 데이터베이스 연결 테스트
    let dbStatus = {
      connected: false,
      message: '',
      postsCount: 0,
      categoriesCount: 0
    };
    
    try {
      const { count: postsCount, error: postsError } = await supabase
        .from('posts')
        .select('count', { count: 'exact', head: true });
        
      const { count: categoriesCount, error: categoriesError } = await supabase
        .from('categories')
        .select('count', { count: 'exact', head: true });
      
      if (postsError || categoriesError) {
        dbStatus.message = '데이터베이스 쿼리 오류';
        if (postsError) dbStatus.message += `: ${postsError.message}`;
        if (categoriesError) dbStatus.message += `, ${categoriesError.message}`;
      } else {
        dbStatus.connected = true;
        dbStatus.message = '데이터베이스 연결 성공';
        dbStatus.postsCount = postsCount || 0;
        dbStatus.categoriesCount = categoriesCount || 0;
      }
    } catch (error) {
      dbStatus.message = `데이터베이스 연결 실패: ${(error as Error).message}`;
    }
    
    return NextResponse.json({
      success: true,
      environment: environmentInfo,
      database: dbStatus
    });
  } catch (error) {
    console.error('[DebugAPI] 오류 발생:', error);
    return NextResponse.json(
      { 
        success: false,
        message: '디버그 정보 생성 중 오류 발생',
        error: (error as Error).message
      },
      { status: 500 }
    );
  }
} 