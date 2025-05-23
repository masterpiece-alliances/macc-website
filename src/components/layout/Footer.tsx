'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          <div className="md:col-span-3 flex flex-col min-h-[150px] md:min-h-[200px]">
            <h3 className="text-xl font-semibold mb-3 md:mb-4 break-keep">Masterpiece Alliance</h3>
            <p className="text-gray-400 break-keep">
              전문적인 코칭과 컨설팅을 통해 개인과 조직의 성장을 돕습니다.
            </p>
          </div>
          
          <div className="md:col-span-4 md:col-start-6 flex flex-col min-h-[150px] md:min-h-[200px]">
            <h3 className="text-xl font-semibold mb-3 md:mb-4 break-keep">바로가기</h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 md:gap-y-3">
              <div>
                <Link href="/" className="text-gray-400 hover:text-[#f9ce00] transition-colors duration-300 block break-keep">
                  홈
                </Link>
              </div>
              <div>
                <Link href="/about" className="text-gray-400 hover:text-[#f9ce00] transition-colors duration-300 block break-keep">
                  소개
                </Link>
              </div>
              <div>
                <Link href="/services/main-biz" className="text-gray-400 hover:text-[#f9ce00] transition-colors duration-300 block break-keep">
                  Main Biz
                </Link>
              </div>
              <div>
                <Link href="/services/workshops" className="text-gray-400 hover:text-[#f9ce00] transition-colors duration-300 block break-keep">
                  전문 프로그램
                </Link>
              </div>
              <div>
                <Link href="/columns" className="text-gray-400 hover:text-[#f9ce00] transition-colors duration-300 block break-keep">
                  칼럼
                </Link>
              </div>
              <div>
                <Link href="/contact" className="text-gray-400 hover:text-[#f9ce00] transition-colors duration-300 block break-keep">
                  상담 신청
                </Link>
              </div>
              <div>
                <Link href="/location" className="text-gray-400 hover:text-[#f9ce00] transition-colors duration-300 block break-keep">
                  오시는 길
                </Link>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3 md:col-start-10 flex flex-col min-h-[150px] md:min-h-[200px]">
            <h3 className="text-xl font-semibold mb-3 md:mb-4 break-keep">연락처</h3>
            <div className="flex flex-col space-y-2 md:space-y-3">
              <div className="text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0061ad] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">leeyoon@ma-cc.co.kr</span>
              </div>
              <div className="text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0061ad] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="truncate">+82 10 3406 5414</span>
              </div>
              <div className="text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0061ad] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm break-keep">서울특별시 강남구 테헤란로 311, 1022호(역삼동, 아남타워)</span>
              </div>
              <div className="text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0061ad] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="truncate break-keep">업무시간: 평일 09:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400">
          <p className="break-keep">&copy; {currentYear} Masterpiece Alliance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 