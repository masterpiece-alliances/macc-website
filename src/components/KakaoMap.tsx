"use client";

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface KakaoMapProps {
  width?: string;
  height?: string;
  lat?: number;
  lng?: number;
  level?: number;
  markerPosition?: {
    lat: number;
    lng: number;
  };
  style?: React.CSSProperties;
  className?: string;
}

const KakaoMap = ({
  width = '100%',
  height = '400px',
  lat = 37.5665,        // 서울시청 위치 (기본값)
  lng = 126.9780,       // 서울시청 위치 (기본값)
  level = 3,            // 확대 레벨 기본값
  markerPosition,       // 마커 위치 (옵션)
  style,
  className,
}: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // 카카오맵 초기화
  const initializeMap = () => {
    if (mapRef.current && window.kakao && window.kakao.maps) {
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: level,
      };

      // 맵 인스턴스 생성
      const mapInstance = new window.kakao.maps.Map(mapRef.current, options);
      mapInstanceRef.current = mapInstance;

      // 마커 추가 (markerPosition이 있는 경우)
      if (markerPosition) {
        const markerPos = new window.kakao.maps.LatLng(
          markerPosition.lat,
          markerPosition.lng
        );
        
        const marker = new window.kakao.maps.Marker({
          position: markerPos,
        });

        marker.setMap(mapInstance);
      }
    }
  };

  useEffect(() => {
    // 카카오맵 SDK가 로드된 후 지도 초기화
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    }
  }, [lat, lng, level, markerPosition]);

  return (
    <>
      {/* 카카오맵 SDK 로드 */}
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
        onLoad={() => {
          window.kakao.maps.load(initializeMap);
        }}
      />
      
      {/* 지도를 담을 영역 */}
      <div 
        ref={mapRef} 
        style={{ width, height, ...style }}
        className={className}
      />
    </>
  );
};

export default KakaoMap;

// 전역 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
} 