import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  // 임시 핵심 가치 데이터
  const coreValues = [
    {
      id: 1,
      title: "전문성",
      description: "다년간의 경험과 전문지식을 바탕으로 최상의 코칭 서비스를 제공합니다.",
      icon: "🎯"
    },
    {
      id: 2,
      title: "신뢰",
      description: "고객과의 신뢰 관계를 최우선으로 생각하며, 정직하고 투명한 소통을 지향합니다.",
      icon: "🤝"
    },
    {
      id: 3,
      title: "혁신",
      description: "변화하는 시대에 맞춰 지속적으로 새로운 접근법과 방법론을 개발합니다.",
      icon: "💡"
    },
    {
      id: 4,
      title: "성장",
      description: "고객의 지속적인 성장과 발전을 위해 실질적인 변화를 이끌어냅니다.",
      icon: "🌱"
    }
  ];

  // 임시 팀 멤버 데이터
  const teamMembers = [
    {
      id: 1,
      name: "홍길동",
      role: "대표 컨설턴트",
      bio: "15년 이상의 비즈니스 코칭 경력을 가진 전문가로, 수많은 기업과 경영진의 성장을 지원했습니다.",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: 2,
      name: "김서연",
      role: "리더십 코치",
      bio: "글로벌 기업에서의 경험을 바탕으로 효과적인 리더십 개발 프로그램을 설계하고 진행합니다.",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: 3,
      name: "이민준",
      role: "커리어 코치",
      bio: "다양한 산업 분야에서의 경험을 통해 개인의 커리어 성장 전략 수립을 지원합니다.",
      imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* 회사 소개 섹션 */}
      <section className="mb-10 md:mb-16">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-center">
          Masterpiece Alliance 소개
        </h1>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <p className="text-base md:text-lg mb-4">
              Masterpiece Alliance는 개인과 조직의 성장을 위한 전문적인 코칭과 컨설팅 서비스를 제공하는 회사입니다. 우리는 고객이 자신의 잠재력을 최대한 발휘하고 목표를 달성할 수 있도록 돕는 것을 사명으로 삼고 있습니다.
            </p>
            <p className="text-base md:text-lg mb-4">
              2015년 설립 이후, 다양한 분야의 리더들과 조직들이 직면한 도전 과제를 해결하고 지속적인 성장을 이룰 수 있도록 지원해왔습니다. 우리의 코칭 방법론은 최신 연구와 실제 경험을 바탕으로 하며, 각 고객의 고유한 상황과 요구에 맞게 커스터마이징됩니다.
            </p>
            <p className="text-base md:text-lg">
              Masterpiece Alliance와 함께라면, 개인과 조직은 더 높은 수준의 성과와 성취를 경험할 수 있습니다.
            </p>
          </div>
          <div className="w-full md:w-1/2 relative h-64 md:h-80 rounded-lg overflow-hidden order-1 md:order-2 mb-6 md:mb-0">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="팀 미팅 중인 모습"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* 핵심 가치 섹션 */}
      <section className="mb-10 md:mb-16 bg-gray-50 p-6 md:p-8 rounded-lg">
        <h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
          핵심 가치
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {coreValues.map((value) => (
            <div key={value.id} className="bg-white p-5 md:p-6 rounded-lg shadow-md">
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">{value.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-sm md:text-base text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 전문가 팀 소개 섹션 */}
      <section className="mb-10 md:mb-16">
        <h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
          전문가 팀
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white p-5 md:p-6 rounded-lg shadow-md">
              <div className="relative h-48 md:h-64 w-full mb-4 rounded-lg overflow-hidden">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-sm md:text-base text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="bg-blue-600 text-white p-6 md:p-8 rounded-lg text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
          Masterpiece Alliance와 함께 성장하세요
        </h2>
        <p className="text-base md:text-lg mb-5 md:mb-6 max-w-2xl mx-auto">
          개인과 조직의 성장을 위한 전문적인 코칭이 필요하시다면 지금 바로 문의하세요.
        </p>
        <Link href="/contact" className="inline-block bg-white text-blue-600 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          무료 상담 신청
        </Link>
      </section>
    </div>
  );
} 