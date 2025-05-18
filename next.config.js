/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'jthocxsthkkwrgzppyue.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    // 운영 빌드 중에는 ESLint 체크 비활성화
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 운영 빌드 중에는 타입 체크 비활성화
    ignoreBuildErrors: true,
  },
  // 클라이언트에 환경 변수 노출
  env: {
    NEXT_PUBLIC_REVALIDATE_SECRET_TOKEN: process.env.REVALIDATE_SECRET_TOKEN || 'your-secret-token',
  }
};

module.exports = nextConfig; 