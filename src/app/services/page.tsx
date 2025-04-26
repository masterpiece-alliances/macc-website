import React from "react";
import Link from "next/link";

export default function ServicesPage() {
  // 임시 서비스 상세 데이터
  const services = [
    {
      id: 1,
      title: "비즈니스 코칭",
      description: "기업 경영과 성장을 위한 전문적인 코칭 서비스를 제공합니다.",
      icon: "💼",
      details: [
        "기업의 비전과 전략 수립 지원",
        "경영진 및 리더십 팀 코칭",
        "조직 문화 개선 및 변화 관리",
        "비즈니스 성과 향상을 위한 맞춤형 솔루션",
        "효과적인 팀 빌딩 및 협업 방법 제안"
      ]
    },
    {
      id: 2,
      title: "리더십 코칭",
      description: "효과적인 리더십 개발을 위한 맞춤형 코칭 프로그램을 제공합니다.",
      icon: "👑",
      details: [
        "리더십 역량 진단 및 개발 계획 수립",
        "효과적인 의사소통 스킬 향상",
        "임팩트 있는 피드백 및 코칭 기술 개발",
        "갈등 관리 및 문제 해결 능력 강화",
        "자기 인식 및 감성 지능 개발"
      ]
    },
    {
      id: 3,
      title: "커리어 코칭",
      description: "개인의 커리어 성장과 목표 달성을 위한 전략적 코칭을 제공합니다.",
      icon: "📈",
      details: [
        "커리어 목표 설정 및 액션 플랜 수립",
        "개인 강점 발견 및 효과적인 활용 방법",
        "전문성 개발 및 역량 강화 전략",
        "네트워킹 및 인맥 구축 전략",
        "직장 내 리더십 발휘 방법"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">서비스 소개</h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
        Masterpiece Alliance는 다양한 분야에서 개인과 조직의 성장을 지원하는 전문적인 코칭 및 컨설팅 서비스를 제공합니다.
      </p>
      
      <div className="space-y-16">
        {services.map((service) => (
          <section key={service.id} id={service.title} className="scroll-mt-24">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link href="/contact" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                  상담 신청하기
                </Link>
              </div>
              
              <div className="md:w-2/3 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">주요 서비스 내용</h3>
                <ul className="space-y-3">
                  {service.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>
      
      <div className="mt-16 bg-gray-100 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">맞춤형 코칭 서비스가 필요하신가요?</h2>
        <p className="text-gray-600 mb-6">
          귀하의 특별한 상황과 요구에 맞는 맞춤형 코칭 프로그램을 제공해 드립니다.
        </p>
        <Link href="/contact" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          무료 상담 예약하기
        </Link>
      </div>
    </div>
  );
} 