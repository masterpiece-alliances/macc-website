'use client';

import React from 'react';

const LocationPage = () => {
  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">오시는 길</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            마스터피스 얼라이언스에 방문하시는 방법을 안내해 드립니다.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="w-full h-[400px] relative">
            {/* 약도 이미지 (public/images/location-map.jpg 위치에 약도 이미지 파일 추가 필요) */}
            <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-4">
              {/* 이미지가 있는 경우 - 추후 이미지 추가 시 주석 해제
              <Image
                src="/images/location-map.jpg"
                alt="마스터피스 얼라이언스 오시는 길 약도"
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              /> */}
              
              {/* 이미지가 없는 경우 임시 표시 */}
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-600 text-lg">약도 이미지가 표시됩니다.</p>
                <p className="text-gray-500 text-sm mt-2">
                  (/public/images/location-map.jpg 위치에<br />약도 이미지를 추가해주세요)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">주소 및 연락처</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg">주소</h3>
                  <p className="mt-1">서울특별시 강남구 테헤란로 311, 1022호(역삼동, 아남타워)</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg">전화번호</h3>
                  <p className="mt-1">+82 10 3406 5414</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg">이메일</h3>
                  <p className="mt-1">leeyoon@ma-cc.co.kr</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg">업무시간</h3>
                  <p className="mt-1">평일 09:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">교통편 안내</h2>
            
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  지하철 이용 시
                </h3>
                <p className="ml-7 text-gray-700">
                  2호선, 수인분당선 선릉역 5번 출구에서 도보 5분<br />
                  2호선 역삼역 5번 출구에서 도보 10분
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  버스 이용 시
                </h3>
                <p className="ml-7 text-gray-700">
                  간선버스: 140, 144, 145, 146, 740<br />
                  지선버스: 3412, 4412<br />
                  광역버스: 9404, 9408
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  주차 안내
                </h3>
                <p className="ml-7 text-gray-700">
                  아남타워 지하 주차장 이용 가능<br />
                  {/* 방문 시 주차권 제공 */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LocationPage; 