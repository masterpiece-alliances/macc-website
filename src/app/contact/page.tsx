import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="relative w-full h-[30vh] md:h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="비즈니스 미팅"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-white text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">
            문의 및 상담
          </h1>
          <p className="text-base md:text-xl max-w-2xl mx-auto">
            Masterpiece Alliance의 코칭 및 컨설팅 서비스에 관심이 있으신가요?
            지금 바로 연락하세요.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* 안내 텍스트 */}
        <div className="max-w-3xl mx-auto mb-8 md:mb-16 text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">성장의 첫 걸음을 내딛으세요</h2>
          <p className="text-base md:text-lg mb-4">
            Masterpiece Alliance의 코칭 및 컨설팅 서비스가 여러분의 성장을 도울 준비가 되어 있습니다.
            아래 문의 양식을 작성하시거나 직접 연락주시면 빠르게 답변 드리겠습니다.
          </p>
          <p className="text-base md:text-lg">
            무료 초기 상담을 통해 귀하의 목표와 상황에 맞는 최적의 서비스를 안내해 드립니다.
          </p>
          <div className="flex flex-row justify-center gap-4 mt-6 md:mt-8">
            <div className="flex items-center justify-center text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>맞춤형 솔루션</span>
            </div>
            <div className="flex items-center justify-center text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>전문가 코칭</span>
            </div>
            <div className="flex items-center justify-center text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>지속적인 지원</span>
            </div>
          </div>
        </div>
        
        {/* 문의 양식 */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h2 className="text-xl md:text-2xl font-bold">문의 양식</h2>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  연락처
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                  관심 서비스 <span className="text-red-500">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                >
                  <option value="">선택해주세요</option>
                  <option value="business">비즈니스 코칭</option>
                  <option value="leadership">리더십 코칭</option>
                  <option value="career">커리어 코칭</option>
                  <option value="other">기타</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  문의 내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                ></textarea>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                  문의하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* CTA 섹션 */}
      <section className="py-10 md:py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            더 궁금한 점이 있으신가요?
          </h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            문의 양식 작성이 어렵거나 추가 정보가 필요하시면 언제든지 직접 연락주세요.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Link href="tel:+821034065414" className="w-full md:w-auto inline-flex items-center justify-center bg-white text-blue-600 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.948.684l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.042 11.042 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              전화하기
            </Link>
            <Link href="mailto:leeyoon@ma-cc.co.kr" className="w-full md:w-auto inline-flex items-center justify-center bg-transparent text-white border border-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
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