'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser, signOut } from '@/lib/auth';
import { User } from '@/lib/types';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const router = useRouter();
  const pathname = usePathname();

  // 세션 타임아웃 설정 (15분)
  const SESSION_TIMEOUT = 15 * 60 * 1000;

  // 캐시 방지를 위한 메타태그 추가
  useEffect(() => {
    // 캐시 방지 헤더 설정
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Cache-Control';
    meta.content = 'no-store, no-cache, must-revalidate, proxy-revalidate';
    document.head.appendChild(meta);

    const pragmaMeta = document.createElement('meta');
    pragmaMeta.httpEquiv = 'Pragma';
    pragmaMeta.content = 'no-cache';
    document.head.appendChild(pragmaMeta);

    const expiresMeta = document.createElement('meta');
    expiresMeta.httpEquiv = 'Expires';
    expiresMeta.content = '0';
    document.head.appendChild(expiresMeta);

    return () => {
      document.head.removeChild(meta);
      document.head.removeChild(pragmaMeta);
      document.head.removeChild(expiresMeta);
    };
  }, []);

  // 사용자 활동 감지 및 세션 타임아웃 처리
  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
    };

    // 사용자 활동 이벤트 리스너 등록
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    // 주기적으로 세션 타임아웃 체크
    const checkSessionTimeout = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity > SESSION_TIMEOUT) {
        console.log('세션 타임아웃: 비활성 상태가 15분 이상 지속됨');
        clearInterval(checkSessionTimeout);
        signOut().then(() => {
          alert('장시간 비활성 상태로 인해 보안을 위해 자동 로그아웃되었습니다.');
          router.push('/admin-login');
        });
      }
    }, 60000); // 1분마다 체크

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      clearInterval(checkSessionTimeout);
    };
  }, [lastActivity, router]);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== 'admin') {
          // 로그인되지 않았거나 관리자가 아닌 경우 로그인 페이지로 리다이렉트
          router.push('/admin-login');
          return;
        }
        setUser(currentUser);
      } catch (error) {
        console.error('사용자 정보 로드 중 오류:', error);
        router.push('/admin-login');
      } finally {
        setLoading(false);
      }
    }

    loadUser();

    // 페이지 닫힐 때 브라우저가 캐시하지 않도록 설정
    const handleBeforeUnload = () => {
      if (window.performance && window.performance.navigation.type !== window.performance.navigation.TYPE_RELOAD) {
        // 세션 스토리지에서 민감한 정보 삭제
        window.sessionStorage.removeItem('adminSession');
        // ... 다른 필요한 클린업 작업
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut();
      // 로그아웃 시 클라이언트 측 캐시 및 스토리지 정리
      window.sessionStorage.clear();
      window.localStorage.removeItem('supabase.auth.token');
      router.push('/admin-login');
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
    }
  };

  // 사용자 로딩 중에는 로딩 표시
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  // 사용자가 없으면 아무것도 표시하지 않음 (useEffect에서 리다이렉트 처리됨)
  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 사이드바 */}
      <aside className="w-64 bg-white shadow-md flex flex-col h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">관리자 대시보드</h1>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-xs text-gray-500 mt-1">마지막 활동: {new Date().toLocaleTimeString()}</p>
        </div>
        <nav className="p-4 flex-grow">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin"
                className={`block p-2 rounded ${
                  pathname === '/admin' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                }`}
              >
                대시보드
              </Link>
            </li>
            <li>
              <Link
                href="/admin/posts"
                className={`block p-2 rounded ${
                  pathname.startsWith('/admin/posts') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                }`}
              >
                블로그 관리
              </Link>
            </li>
            <li>
              <Link
                href="/admin/categories"
                className={`block p-2 rounded ${
                  pathname.startsWith('/admin/categories') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                }`}
              >
                카테고리 관리
              </Link>
            </li>
          </ul>
        </nav>
        {/* 로그아웃 버튼 - 하단에 고정 */}
        <div className="p-4 border-t mt-auto">
          <button
            onClick={handleLogout}
            className="block w-full text-left p-2 rounded hover:bg-red-100 text-red-600 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </aside>
      
      {/* 메인 컨텐츠 */}
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
} 