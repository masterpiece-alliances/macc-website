"use client";

import Image from 'next/image';

interface LocationImageProps {
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  className?: string;
  alt?: string;
  src?: string;
}

const LocationImage = ({
  width = '100%',
  height = '400px',
  style,
  className,
  alt = '위치 이미지',
  src = '/images/location.jpg', // 기본 위치 이미지 경로
}: LocationImageProps) => {
  return (
    <div 
      style={{ 
        width, 
        height, 
        position: 'relative',
        ...style 
      }}
      className={className}
    >
      <Image
        src={src}
        fill
        alt={alt}
        style={{ objectFit: 'cover', borderRadius: '8px' }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
    </div>
  );
};

export default LocationImage; 