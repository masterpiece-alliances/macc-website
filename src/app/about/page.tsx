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

  // 전문가 팀 멤버 데이터
  const teamMembers = [
    {
      id: 1,
      name: "이윤",
      role: "성장 브랜딩 주치의 & 브랜드 컨설턴트",
      bio: "자기다움으로 탁월하게 행복한 이윤을 창출하도록 돕습니다.",
      credentials: [
        "국제코치연맹 PCC 코치 & 한국코치협회 KPC 코치",
        "미국 갤럽 인증 강점코치",
        "ICCS_CCCS 1급",
        "MBTI 글로벌 전문가 & STRONG 직업흥미 전문코치",
        "직장 괴롭힘(존중 리더십) 전문 코치"
      ],
      imageUrl: "/images/team/lee-yoon.jpg"
    },
    {
      id: 2,
      name: "조원섭",
      role: "차별화 브랜딩 전문가 / 강점 기반 브랜딩 코치",
      bio: "강점과 자기다움을 통해 브랜드워커로 거듭나도록 돕습니다.",
      credentials: [
        "한국코치협회 KPC 프로 코치(Korea Professional Coach)",
        "미국 갤럽 인증 강점코치",
        "MBTI 글로벌 전문가",
        "STRONG 직업흥미 전문가",
        "리더십 멘탈 케어 전문가(마음 챙김 프로그램)",
        "Global Executive Leadership Mirror ® (GELM) Certified 전문가"
      ],
      imageUrl: "/images/team/cho-wonseop.jpg"
    },
    {
      id: 3,
      name: "최승영",
      role: "실전 경험경력자원화 전문가 / 은퇴 후의 삶 설계, 리더십, 책 쓰기",
      bio: "드러나지 않은 숨은 자아를 만나 자신의 잠재력을 극대화합니다.",
      credentials: [
        "국제코치연맹 PCC 코치 & 한국코치협회 KPC 코치",
        "미국 갤럽 인증 강점코치",
        "직장 괴롭힘(존중 리더십) 전문 코치",
        "도형심리 GeoPiA 1급",
        "감정 코칭 전문가",
        "명상심리상담사",
        "명상지도사"
      ],
      imageUrl: "/images/team/choi-seungyoung.jpg"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="relative w-full h-[30vh] md:h-[40vh] flex items-center bg-gradient-to-r from-[#0061ad] to-[#004d8a]">
        <div className="container mx-auto px-4 z-10 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 break-keep">
            소개
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl break-keep">
            마스터피스 얼라이언스는 개인과 조직의 지속가능한 성장을 돕습니다
          </p>
        </div>
      </section>

      {/* 소개 본문 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg md:prose-xl max-w-none">
              <div className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-8">
                <p className="break-keep">
                  Masterpiece Alliance는 개인과 조직의 행복을 위해 함께 손잡고 걷는 동반의 가치를 지향합니다. 
                  단순히 고객 혹은 고객사의 발전이라는 결과에만 집중하지 않습니다. 
                  결과를 만드는 과정에도 큰 무게를 두는 것은, <strong className="text-[#0061ad]">명작(Masterpiece)을 만들기 위해 
                  함께 만드는(Alliance) 가치가 지속가능한 발전을 만든다</strong>는 믿음이 있기 때문입니다.
                </p>

                <p className="break-keep">
                  그래서 Masterpiece Alliance의 모든 시작은 고객의 마음을 듣는 <strong className="text-[#0061ad]">'경청'</strong>에서 시작됩니다. 
                  Masterpiece Alliance가 <strong className="text-[#0061ad]">코칭과 컨설팅이 가진 장점을 융합하여</strong> 
                  만들어 가는 특별한 MA만의 솔루션에 고객을 초대합니다.
                </p>

                {/* 첫 번째 이미지 */}
                <div className="my-12">
                  <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop"
                      alt="Masterpiece Alliance 솔루션"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>

                <p className="break-keep">
                  Masterpiece Alliance는 <strong className="text-[#0061ad]">코칭, 컨설팅, 브랜딩, 마케팅, 콘텐츠, 디자인</strong> 등 
                  각 분야의 전문가 그룹으로 구성되어 있습니다. 
                  모든 사람의 생각이 다르다는 것을 <strong className="text-[#0061ad]">인정하고 존중</strong>하며, 
                  그 안에서 예상하지 못했던 다른 해법을 찾는 놀라움을 경험하고 있습니다.
                </p>

                <p className="break-keep">
                  그것은 Masterpiece Alliance가 고객을 <strong className="text-[#0061ad]">존재(Being)로 대하는 기반</strong>이 됩니다. 
                  Masterpiece Alliance는 신중년의 커리어 개발, 지역 경제를 살리는 로컬 브랜딩, 
                  비즈니스의 성장을 위한 조직 개발은 물론 멤버십으로 운영되는 Masterpiece Career Society 등 
                  다양한 서비스를 제공하고 있습니다.
                </p>

                {/* 두 번째 이미지 */}
                <div className="my-12">
                  <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop"
                      alt="다양성과 존중"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>

                <p className="text-xl md:text-2xl font-medium text-[#0061ad] text-center py-8 break-keep">
                  함께 만드는 지속가능한 발전을 위해 노력하는 Masterpiece Alliance는 여러분의 참 좋은 파트너입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 미션, 비전, 전략, 핵심가치 섹션 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-0">
                우리의 철학
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-0">
                Masterpiece Alliance의 미션, 비전, 전략, 핵심가치를 소개합니다
              </p>
            </div>

            {/* 피라미드 이미지 */}
            <div className="flex justify-center">
              <Image
                src="/images/mission-vision-pyramid.png"
                alt="미션, 비전, 전략, 핵심가치 피라미드"
                width={1600}
                height={1200}
                className="w-full max-w-none h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 전문가 프로필 섹션 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 break-keep">
                우리의 전문가
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto break-keep">
                각 분야의 전문 지식과 풍부한 경험을 바탕으로 여러분의 성장을 지원하는 전문가들을 소개합니다
              </p>
            </div>

            <div className="space-y-12">
              {teamMembers.map((member, index) => (
                <div key={member.id} className="group flex flex-col md:flex-row items-center gap-8 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative flex-shrink-0">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left space-y-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 break-keep">
                        {member.name} <span className="text-lg md:text-xl text-[#0061ad] font-bold">- {member.role}</span>
                      </h3>
                    </div>
                    
                    <p className="text-lg text-gray-600 leading-relaxed break-keep mb-4">
                      {member.bio}
                    </p>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-[#0061ad] uppercase tracking-wide">자격증 및 전문분야</h4>
                      <ul className="space-y-1">
                        {member.credentials.map((credential, credIndex) => (
                          <li key={credIndex} className="text-sm text-gray-600 flex items-start break-keep">
                            <span className="text-[#0061ad] mr-2 mt-1 flex-shrink-0">•</span>
                            <span>{credential}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 md:py-20 bg-[#0061ad] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            여러분의 참 좋은 파트너
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Masterpiece Alliance와 함께 지속가능한 성장의 여정을 시작해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-[#0061ad] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
            >
              상담 신청하기
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/services/main-biz"
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#0061ad] transition-colors duration-300"
            >
              Main Biz
            </Link>
            <Link
              href="/services/workshops"
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#0061ad] transition-colors duration-300"
            >
              특강 & 워크숍
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 