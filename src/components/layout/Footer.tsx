'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Masterpiece Alliance</h3>
            <p className="text-gray-400 mb-4">
              전문적인 코칭과 컨설팅을 통해 개인과 조직의 성장을 돕습니다.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">바로가기</h3>
            <div className="grid grid-cols-2 gap-y-4">
              <div className="pr-2">
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  홈
                </Link>
              </div>
              <div>
                <Link href="/services" className="text-gray-400 hover:text-white transition">
                  서비스
                </Link>
              </div>
              <div className="pr-2">
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  소개
                </Link>
              </div>
              <div>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  상담 신청
                </Link>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">연락처</h3>
            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">leeyoon@ma-cc.co.kr</span>
              </div>
              <div className="text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="truncate">+82 10 3406 5414</span>
              </div>
              <div className="text-gray-400 flex items-center col-span-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="whitespace-nowrap">서울특별시 강남구 테헤란로 311, 1022호(역삼동, 아남타워)</span>
              </div>
              <div className="text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="truncate">업무시간: 평일 09:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Masterpiece Alliance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 