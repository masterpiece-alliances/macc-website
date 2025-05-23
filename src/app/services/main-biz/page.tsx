import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Program {
  title: string;
  description: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  highlightText?: string;
  detailedDescription: string;
  subtitle?: string;
  features: string[];
  programs?: Program[];
  targetAudience: string;
  image: string;
}

export default function MainBizPage() {
  const services: Service[] = [
    {
      id: 1,
      title: "신중년 커리어 개발",
      description: "두 번째 전성기",
      highlightText: "은퇴 후의 삶이 막연하신가요? 과연 방법이 없을까요?",
      detailedDescription: "100세 시대의 평균 퇴직 연령은 49.3세입니다. 은퇴 후의 삶, 잘 준비하고 계신가요? 코칭과 컨설팅을 기반으로 은퇴 후의 막연한 삶에 대한 걱정, 창업, 재취업 등 계획부터 실행까지 실질적인 도움을 드립니다. 코칭 기반 은퇴 준비서 <빨리 은퇴하라> 저자 코치와 다양한 분야의 전문가가 함께합니다.",
      subtitle: "지금까지 살아온 삶이 헛되지 않도록 앞으로 살 삶에서는 진정한 주인공으로 우뚝 설 수 있도록 안내하고 함께 가는 동반자가 되겠습니다.",
      features: [
        "은퇴 후 주인공으로 살기 위한 코칭 기반 자기 인식",
        "내적 자아 성찰 기반 명확한 삶의 목표 설정",
        "검증된 툴을 활용, 경험과 경력에서 차별적인 개인의 경쟁 요소 정리",
        "은퇴 후 필요한 실질적 재무 계획 수립",
        "신중년 커리어 개발을 위한 다양한 지원 정책의 이해"
      ],
      targetAudience: "50세 이상의 경력 전환을 고민하는 분들",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "로컬 브랜딩",
      description: "사람과 지역 경제를 연결하는",
      highlightText: "지역이 살아야, 사람이 웃습니다. 사람이 있어야, 지역이 살아납니다.",
      detailedDescription: "Masterpiece Alliance는 '사람과 지역 경제를 연결하는 로컬 브랜딩'이라는 미션을 가지고 있습니다. 단순한 마케팅을 넘어 지역의 정체성과 공동체의 가치를 브랜드로 풀어내고, 로컬 브랜드를 지역 경제와 연결하는 지속 가능한 지역 활성화 프로젝트를 제안합니다.",
      subtitle: "지역의 가치가 제대로 빛날 수 있도록, 로컬 브랜드가 지역경제와 연결되도록, 함께 고민하고 실행할 파트너가 되어드리겠습니다.",
      features: [
        "지역의 이야기를 담은 콘텐츠",
        "지역 주민과 함께 만드는 브랜드",
        "지역 경제를 활성화시키는 브랜딩 실행",
        "사람들이 찾는 온·오프 로컬 체험 실행",
        "로컬 브랜드와 지역 경제를 연결하여 선순환을 돕는 사업구조 설계"
      ],
      targetAudience: "지자체, 지역 상공회의소, 로컬 사업자",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "조직 개발",
      description: "전략적 비즈니스의 Scale UP과 구성원의 Skill UP",
      highlightText: "구성원을 성장시켜야 비즈니스가 성공합니다.",
      detailedDescription: "Masterpiece Alliance는 조직과 개인의 성장을 돕는 근거 기반의 콘텐츠와 서비스로 함께합니다. 지금은 불황을 이기고, 급변하는 시대의 변화에 대한 효과적 대응 능력이 절대적으로 필요합니다. 이를 위해 리더십을 개발하고, 구성원의 조직 몰입도를 높이고, 전략적 비즈니스 목표를 명료화해야 합니다.",
      subtitle: "불확실과 불확실성의 격변기에도 비즈니스가 지속 성장하도록 근거 기반의 콘텐츠와 서비스로 구성원의 성장과 업무 몰입도를 높이도록 위기를 기회로 만드는 성장 파트너로 함께 하겠습니다.",
      features: [
        "리더십 코칭",
        "팀 성장 코칭",
        "창업가의 브랜딩 기반 조직문화 구축",
        "뇌 과학 기반의 조직 MVC 워크숍",
        "전략적 목표 달성과 조직 성장"
      ],
      targetAudience: "중소기업, 스타트업, 성장 기업의 CEO 및 임직원",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Masterpiece Career Society",
      description: "자신의 인생을 명작으로 만들어가는 마스터피스들의 커뮤니티",
      highlightText: "커리어 레벨 업, 함께 만드는 명작 인생",
      detailedDescription: "각 사람은 존재 자체로 고유한 브랜드입니다. Masterpiece Career Society는 나의 자기다움과 남과의 다름을 이해하고, 자기다운 일과 삶을 사는 사람들이 성장 프로그램을 통해 함께 만들어가는 커뮤니티입니다.",
      subtitle: "내가 더 나다운 삶을 살 수 있도록 그래서 더 빛나는 삶을 살 수 있도록 Masterpiece Alliance가 엄선한 프로그램을 제공합니다.",
      programs: [
        {
          title: "태헌라온 워커스 클럽",
          description: "매주 목요일에 진행되는, 직장인들의 성장 커뮤니티 챗"
        },
        {
          title: "커리어 독서 모임",
          description: "커리어의 발견과 개발을 중심으로 한 정기 독서모임"
        },
        {
          title: "흥미 기반 커리어 워크숍",
          description: "진로심리학 기반의 'Strong Interest Inventory' 진단을 통해, 일과 삶의 몰입도를 높이는 프로그램"
        },
        {
          title: "강점 기반 커리어 스킬업 워크숍",
          description: "3,700만 명 이상의 고성과자들의 비밀을 담은, 미국 갤럽의 'CliftonStrengths' 진단을 통해, 강점으로 생산성을 높이는 나만의 필살기를 찾는 프로그램"
        },
        {
          title: "마스터 피스 창업 워크숍",
          description: "세컨드 커리어로 창업에 도전하는 예비 마스터피스 창업가들의 실전 창업 프로그램"
        },
        {
          title: "마스터 피스 유튜브 체험",
          description: "세컨드 커리어 창업의 실제적인 이유를 사례와 영역별 비즈니스 지원 전문가들의 특강으로 진행되는 세컨드 커리어 창업 콘텐츠 체험"
        },
        {
          title: "멘탈 관리 훈련",
          description: "구글에서도 활용하는 호흡 훈련을 기반으로 한, 멘탈 관리 훈련과 멘탈 저널링 습관화 훈련 모임, 생산성 높은 자기 마음 사용법을 배울 수 있는 프로그램"
        },
        {
          title: "피드백 스킬 훈련",
          description: "일과 삶속에서, 감정을 버리면서 명확하게 성장 변화를 촉구하는 대화법 훈련 프로그램"
        },
        {
          title: "VIA(Values in Action) 강점 워크숍",
          description: "미국 긍정심리학회가 개발한, 일과 삶의 몰입을 이끄는 가치관(품성) 강점 진단 기반 코칭 프로그램"
        }
      ],
      features: [
        "월 1회 정기 모임 및 특별 강연",
        "업계 전문가와의 네트워킹",
        "개인 성장 워크숍",
        "커리어 멘토링 매칭",
        "온라인 커뮤니티 플랫폼"
      ],
      targetAudience: "자기계발에 관심이 높은 전문직 종사자",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1470&auto=format&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="relative w-full h-[30vh] md:h-[40vh] flex items-center bg-gradient-to-r from-[#0061ad] to-[#004d8a]">
        <div className="container mx-auto px-4 z-10 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 break-keep">
            Main Biz
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl break-keep">
            Masterpiece Alliance의 핵심 비즈니스 서비스
          </p>
        </div>
      </section>

      {/* 서비스 목차 */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.title}`}
                className="px-6 py-3 bg-white border-2 border-gray-200 rounded-full text-gray-700 font-medium hover:border-[#0061ad] hover:text-[#0061ad] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {service.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 상세 섹션 */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.title}
          className={`py-16 md:py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="container mx-auto px-4">
            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}>
              {/* 이미지 */}
              <div className="w-full lg:w-1/2">
                <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
                </div>
              </div>
              
              {/* 콘텐츠 */}
              <div className="w-full lg:w-1/2 space-y-6">
                {/* 제목 구조 */}
                <div>
                  <p className="text-[#0061ad] font-bold text-lg mb-2 break-keep">
                    {service.description}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 break-keep">
                    {service.title}
                  </h2>
                  {service.highlightText && (
                    <p className="text-xl md:text-2xl font-bold text-gray-900 mb-6 break-keep">
                      {service.highlightText}
                    </p>
                  )}
                </div>

                {/* 상세 설명 */}
                <p className="text-gray-700 text-lg leading-relaxed break-keep">
                  {service.detailedDescription}
                </p>

                {/* 부제목 (파란색 박스) */}
                {service.subtitle && (
                  <div className="bg-[#0061ad] text-white p-4 rounded-lg">
                    <p className="text-sm md:text-base leading-relaxed break-keep">
                      {service.subtitle}
                    </p>
                  </div>
                )}

                {/* 주요 서비스 - programs가 없는 경우만 표시 */}
                {!service.programs && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">주요 서비스</h3>
                    <div className="space-y-4">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <svg className="w-6 h-6 text-[#0061ad] mt-1 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="font-bold text-gray-900 break-keep">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 주요 서비스 (Masterpiece Career Society의 프로그램) */}
                {service.programs && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">주요 서비스</h3>
                    <div className="space-y-4">
                      {service.programs.map((program, programIndex) => (
                        <div key={programIndex} className="flex items-start">
                          <svg className="w-6 h-6 text-[#0061ad] mt-1 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1 break-keep">{program.title}</h4>
                            <p className="text-gray-600 break-keep">{program.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 대상 */}
                <div className="border-t pt-6">
                  <p className="text-gray-600">
                    <span className="font-semibold">대상: </span>
                    <span className="break-keep">{service.targetAudience}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA 섹션 */}
      <section className="py-16 bg-[#0061ad] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            어떤 서비스가 필요한지 궁금하신가요?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            전문 컨설턴트와의 무료 상담을 통해 귀하에게 가장 적합한 서비스를 찾아보세요.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center bg-white text-[#0061ad] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
          >
            무료 상담 신청
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
        </div>
      </section>
    </div>
  );
} 