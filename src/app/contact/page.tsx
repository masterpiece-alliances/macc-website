import React from "react";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="relative w-full h-[30vh] md:h-[40vh] flex items-center bg-gradient-to-r from-[#0061ad] to-[#004d8a]">
        <div className="container mx-auto px-4 z-10 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 break-keep">
            문의 및 상담
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl break-keep">
            Masterpiece Alliance의 코칭 및 컨설팅 서비스가 궁금하신가요? <br />
            지금 바로 연락하세요.
          </p>
        </div>
      </section>

      {/* 상담 신청 통합 섹션 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              
              {/* 왼쪽: 안내 텍스트 */}
              <div className="lg:pr-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 break-keep">성장의 첫 걸음을 내딛으세요</h2>
                <div className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-6 mb-12">
                  <p className="break-keep">
                    <span className="text-[#0061ad] font-semibold">Masterpiece Alliance</span>의 코칭 및 컨설팅 서비스가 여러분의 성장을 도울 준비가 되어 있습니다.
                  </p>
                  <p className="break-keep">
                    아래 문의 양식을 작성하시거나 직접 연락주시면 빠르게 답변 드리겠습니다.
                  </p>
                  <p className="break-keep">
                    무료 초기 상담을 통해 귀하의 목표와 상황에 맞는 <span className="text-[#0061ad] font-semibold">최적의 서비스</span>를 안내해 드립니다.
                  </p>
                </div>
                
                {/* 특징 리스트 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    "맞춤형 솔루션",
                    "전문가 코칭", 
                    "전문 프로그램",
                    "지속적인 지원"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-lg font-semibold text-gray-800 break-keep">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 오른쪽: 상담 신청 폼 */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 break-keep">무료 상담 신청</h3>
                  <p className="text-gray-600 break-keep">
                    아래 양식을 작성해 주시면 24시간 내에 연락드리겠습니다.
                  </p>
                </div>
                <ContactForm />
              </div>

            </div>
          </div>
        </div>
      </section>
      
      {/* 직접 연락 섹션 */}
      <section className="py-16 md:py-20 bg-[#0061ad] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 break-keep">
            더 궁금한 점이 있으신가요?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto break-keep">
            문의 양식 작성이 어렵거나 추가 정보가 필요하시면 언제든지 직접 연락주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="tel:+821034065414" 
              className="inline-flex items-center justify-center bg-white text-[#0061ad] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.948.684l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.042 11.042 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              전화하기
            </Link>
            <Link 
              href="mailto:leeyoon@ma-cc.co.kr" 
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#0061ad] transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              이메일 보내기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 