import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // Be 시리즈 데이터
  const beTexts = [
    { suffix: "side", description: "우리는 가장 가까운 곳에서 함께합니다." },
    { suffix: "yond", description: "우리는 함께 손잡고 상상, 그 너머를 바라봅니다." },
    { suffix: "neath", description: "우리는 숨겨진 가능성을 발견합니다." },
    { suffix: "tween", description: "우리는 현실에서 출발해 갈망하던 꿈으로 이끕니다." },
    { suffix: "come", description: "그렇게 우리는 함께 마스터피스가 됩니다." }
  ];

  // 히어로 이미지 데이터
  const heroImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "성장과 성공을 향한 여정"
    }
  ];

  // 서비스 데이터
  const services = [
    {
      id: 1,
      title: "신중년 커리어 개발",
      description: "두 번째 전성기",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "로컬 브랜딩",
      description: "사람과 지역 경제를 연결하는",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "조직 개발",
      description: "Scale UP을 만드는 Skill UP",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "Masterpiece Career Society",
      description: "함께 만들어가는 커뮤니티",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      title: "전문 프로그램",
      description: "전문적인 맞춤형 프로그램",
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 - 더 크고 잘 보이게 */}
      <section className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImages[0].url}
            alt={heroImages[0].alt}
            fill
            style={{ objectFit: "cover" }}
            priority
            className="brightness-100"
          />
          {/* 텍스트 가독성을 위한 매우 약한 오버레이 */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 break-keep">
            Masterpiece Alliance
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl break-keep">
          Masterpiece Partner for your sustainable success
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center bg-white text-[#0061ad] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
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
            <Link 
              href="/about" 
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#0061ad] transition-colors duration-300"
            >
              더 알아보기
            </Link>
          </div>
        </div>
      </section>

      {/* Be 시리즈 섹션 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 break-keep">Our Philosophy</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto break-keep">
              마스터피스 얼라이언스의 철학을 담은 다섯 가지 약속
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
              {beTexts.map((text, index) => (
                <div
                  key={text.suffix}
                  className="group relative overflow-hidden bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0061ad] to-[#f9ce00]"></div>
                  <div className="text-center">
                    <div className="mb-4 md:mb-6">
                      <span className="text-2xl md:text-3xl font-bold text-[#0061ad] group-hover:text-[#f9ce00] transition-colors duration-300">Be</span>
                      <span className="text-2xl md:text-3xl font-bold text-gray-800 break-keep">{text.suffix}</span>
                    </div>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed break-keep">
                      {text.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 소개 섹션 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 break-keep">
              전문 서비스
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto break-keep">
              개인과 조직의 성장을 위한 맞춤형 솔루션을 제공합니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <Link
                key={service.id}
                href={service.id === 5 ? "/services/workshops" : "/services/main-biz"}
                className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* 그라디언트 배경 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* 콘텐츠 */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                  <div>
                    {/* 아이콘 */}
                    <div className="mb-4">
                      {service.id === 1 && (
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                      {service.id === 2 && (
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                      {service.id === 3 && (
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      )}
                      {service.id === 4 && (
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )}
                      {service.id === 5 && (
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      )}
                    </div>
                    
                    {/* 설명 (주석처럼) */}
                    <p className="text-sm opacity-90 leading-relaxed break-keep mb-0">
                      {service.description}
                    </p>
                    
                    {/* 제목 */}
                    <h3 className="text-xl font-bold break-keep group-hover:scale-105 transition-transform duration-300">
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* 화살표 아이콘 */}
                  <div className="mt-6 flex justify-end">
                    <svg 
                      className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 고객 후기 섹션 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 break-keep">고객의 목소리</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto break-keep">
              함께 성장한 고객들의 진솔한 이야기를 들어보세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "김○○ 대표",
                company: "중소기업 CEO",
                content: "마스터피스 얼라이언스와 함께하면서 개인적 성장뿐만 아니라 조직 전체가 변화하는 것을 경험했습니다.",
                rating: 5
              },
              {
                name: "이○○ 부장",
                company: "대기업 임원",
                content: "신중년 커리어 전환 과정에서 전문적인 가이드를 받아 성공적으로 새로운 도전을 시작할 수 있었습니다.",
                rating: 5
              },
              {
                name: "박○○ 팀장",
                company: "스타트업 리더",
                content: "체계적인 코칭을 통해 리더십 역량이 크게 향상되었고, 팀 성과도 눈에 띄게 개선되었습니다.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic break-keep">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900 break-keep">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 break-keep">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 md:py-24 bg-[#0061ad] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 break-keep">
            성장의 여정을 함께 시작하세요
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto break-keep">
            Masterpiece Alliance와 함께라면 개인과 조직이 지속적인 성장을 할 수 있습니다.
          </p>
          <div className="inline-block">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center bg-white text-[#0061ad] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.948.684l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.042 11.042 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              무료 상담 신청
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
