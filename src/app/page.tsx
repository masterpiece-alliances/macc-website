import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // 임시 히어로 이미지 데이터
  const heroImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "코칭 세션 진행 모습"
    }
  ];

  // 임시 서비스 데이터
  const services = [
    {
      id: 1,
      title: "비즈니스 코칭",
      description: "기업 경영과 성장을 위한 전문적인 코칭 서비스를 제공합니다.",
      icon: "💼"
    },
    {
      id: 2,
      title: "리더십 코칭",
      description: "효과적인 리더십 개발을 위한 맞춤형 코칭 프로그램을 제공합니다.",
      icon: "👑"
    },
    {
      id: 3,
      title: "커리어 코칭",
      description: "개인의 커리어 성장과 목표 달성을 위한 전략적 코칭을 제공합니다.",
      icon: "📈"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="relative w-full h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImages[0].url}
            alt={heroImages[0].alt}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Masterpiece Alliance
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            전문적인 코칭과 컨설팅을 통해 개인과 조직의 성장을 돕습니다.
          </p>
          <Link href="/contact" className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition">
            상담 신청하기
          </Link>
        </div>
      </section>

      {/* 서비스 소개 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            제공 서비스
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <Link href={`/services#${service.title}`} className="inline-block mt-4 text-blue-600 font-medium hover:underline">
                  자세히 알아보기 &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            성장의 여정을 함께 시작하세요
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto whitespace-nowrap">
            Masterpiece Alliance와 함께라면 개인과 조직의 잠재력을 최대한 발휘할 수 있습니다.
          </p>
          <Link href="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition">
            무료 상담 신청
          </Link>
        </div>
      </section>
    </div>
  );
}
