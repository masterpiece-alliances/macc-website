// create-admin.js
// 기본 관리자 계정 생성 스크립트
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const readline = require('readline');

// CLI 인자 파싱
const args = process.argv.slice(2);
const argEmail = args.find(arg => arg.startsWith('--email='))?.split('=')[1];

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('환경 변수가 올바르게 설정되지 않았습니다.');
  console.error('NEXT_PUBLIC_SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY(또는 NEXT_PUBLIC_SUPABASE_ANON_KEY)가 필요합니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// 사용자 입력을 위한 readline 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function promptForCredentials() {
  // 이메일 입력 처리
  const getEmail = () => {
    return new Promise(resolve => {
      if (argEmail) {
        resolve(argEmail);
      } else {
        rl.question('관리자 이메일을 입력하세요 (기본값: admin@example.com): ', answer => {
          resolve(answer.trim() || 'admin@example.com');
        });
      }
    });
  };
  
  // 비밀번호 입력 처리
  const getPassword = () => {
    return new Promise(resolve => {
      rl.question('관리자 비밀번호를 입력하세요 (8자 이상, 특수문자 포함 권장): ', password => {
        if (!password || password.length < 8) {
          console.log('보안을 위해 8자 이상의 강력한 비밀번호를 사용하세요.');
          rl.close();
          process.exit(1);
        }
        resolve(password);
      });
    });
  };

  const email = await getEmail();
  const password = await getPassword();
  
  rl.close();
  return { email, password };
}

async function createAdminUser() {
  try {
    // 사용자로부터 관리자 계정 정보 입력 받기
    const { email: adminEmail, password: adminPassword } = await promptForCredentials();

    // 1. 사용자 계정 생성
    console.log(`관리자 계정 생성 중: ${adminEmail}`);
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true
    });

    if (authError) {
      console.error('사용자 생성 중 오류 발생:', authError.message);
      return;
    }

    console.log('사용자 계정이 성공적으로 생성되었습니다:', authData.user.id);

    // 2. users 테이블이 없으면 생성
    try {
      // 테이블 존재 여부 확인
      console.log('users 테이블 확인 중...');
      await supabase.from('users').select('id').limit(1);
      console.log('users 테이블이 존재합니다.');
    } catch (tableError) {
      console.log('users 테이블이 존재하지 않습니다. 테이블을 생성합니다...');
      
      // SQL 명령으로 테이블 생성 (여기서는 service_role 키로 데이터베이스 액세스)
      const { error: sqlError } = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'apikey': supabaseServiceKey,
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          command: `
            CREATE TABLE IF NOT EXISTS public.users (
              id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
              email TEXT NOT NULL,
              role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'editor', 'user')),
              created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
            );
            
            ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
            
            DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;
            CREATE POLICY "Enable read access for all users" ON public.users
              FOR SELECT USING (true);
              
            DROP POLICY IF EXISTS "Enable update for users based on id" ON public.users;
            CREATE POLICY "Enable update for users based on id" ON public.users
              FOR UPDATE USING (auth.uid() = id);
          `
        })
      }).then(res => res.json());
      
      if (sqlError) {
        console.error('테이블 생성 중 오류:', sqlError);
        console.log('테이블을 수동으로 생성해주세요:');
        console.log(`
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'editor', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.users
  FOR SELECT USING (true);
  
CREATE POLICY "Enable update for users based on id" ON public.users
  FOR UPDATE USING (auth.uid() = id);
        `);
      } else {
        console.log('users 테이블이 성공적으로 생성되었습니다.');
      }
    }

    // 3. 사용자 테이블에 추가 및 admin 역할 부여
    const { error: profileError } = await supabase
      .from('users')
      .upsert([
        {
          id: authData.user.id,
          email: adminEmail,
          role: 'admin'
        }
      ]);

    if (profileError) {
      console.error('사용자 프로필 업데이트 중 오류 발생:', profileError.message);
      console.log('수동으로 데이터를 추가해주세요:');
      console.log(`
INSERT INTO public.users (id, email, role) 
VALUES ('${authData.user.id}', '${adminEmail}', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
      `);
      return;
    }

    console.log('관리자 계정이 성공적으로 생성되었습니다!');
    console.log('================================');
    console.log('로그인 정보:');
    console.log(`이메일: ${adminEmail}`);
    console.log('비밀번호: (입력하신 비밀번호)');
    console.log('================================');
    console.log('이 비밀번호를 안전한 곳에 보관하세요. 로그인 후 반드시 변경하는 것을 권장합니다.');

  } catch (error) {
    console.error('오류 발생:', error.message);
  }
}

createAdminUser(); 