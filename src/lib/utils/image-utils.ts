/**
 * 이미지 관련 유틸리티 함수
 */

// 지원하는 스토리지 프로바이더 목록
const STORAGE_PROVIDERS = [
  'imagedelivery.net', // Cloudflare Images
  'storage.googleapis.com', // GCS
  'storage.cloud.google.com', // GCS
  'amazonaws.com', // S3
  'supabase.co', // Supabase Storage
  'blob.core.windows.net', // Azure Blob Storage
  'res.cloudinary.com', // Cloudinary
  'imgix.net', // Imgix
  'imagekit.io' // ImageKit
];

// 지원하는 이미지 확장자 목록
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif', '.bmp', '.tiff', '.ico'];

/**
 * 이미지 URL이 유효한지 확인
 * @param url 확인할 이미지 URL
 * @returns 유효한 URL이면 true, 그렇지 않으면 false
 */
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  
  try {
    // 기본 URL 형식 검증
    new URL(url);
    
    // 이미지 확장자 또는 스토리지 프로바이더 확인
    return (
      // 확장자 검증
      IMAGE_EXTENSIONS.some(ext => url.toLowerCase().endsWith(ext)) || 
      // 스토리지 프로바이더 확인
      STORAGE_PROVIDERS.some(provider => url.includes(provider)) ||
      // 추가 확인: 스토리지 경로 패턴 (/storage/v1/object/public/)
      url.includes('/storage/v1/object/public/') ||
      // 데이터 URL 확인 (base64 등)
      url.startsWith('data:image/')
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    // URL 파싱 실패
    return false;
  }
}

/**
 * 이미지 URL 정규화 - 다양한 URL 형식을 처리하고 표준화
 * @param url 정규화할 이미지 URL
 * @returns 정규화된 URL 또는 원본 URL (수정이 필요 없는 경우) 또는 null
 */
export function normalizeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  
  try {
    // URL 파싱 시도
    new URL(url);
    
    // 이미 정상적인 URL인 경우 그대로 반환
    return url;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    // URL 파싱에 실패한 경우, 상대 경로일 수 있음
    
    // 1. 절대 경로인 경우 (슬래시로 시작)
    if (url.startsWith('/')) {
      return `${process.env.NEXT_PUBLIC_SITE_URL || ''}${url}`;
    } 
    
    // 2. Supabase Storage 상대 경로인 경우
    else if (url.startsWith('storage/')) {
      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${url}`;
    }
    
    // 3. 다른 형태의 상대 경로
    else if (!url.includes('://') && !url.startsWith('data:')) {
      // 상대 경로를 완전한 URL로 변환
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
      if (baseUrl) {
        // 슬래시 중복 방지
        const pathPrefix = url.startsWith('./') ? '' : '/';
        return `${baseUrl}${pathPrefix}${url.startsWith('./') ? url.substring(2) : url}`;
      }
    }
    
    // 이외의 경우 (수정할 수 없는 경우)
    return url;
  }
}

/**
 * 이미지 URL이 Supabase Storage URL인지 확인
 * @param url 확인할 URL
 * @returns Supabase Storage URL이면 true, 아니면 false
 */
export function isSupabaseStorageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  
  try {
    const parsed = new URL(url);
    return parsed.hostname.includes('supabase.co') && 
           (parsed.pathname.includes('/storage/v1/') || 
            parsed.pathname.includes('/storage/v1/object/public/'));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return false;
  }
}

/**
 * 스토리지 프로바이더 식별
 * @param url 확인할 URL
 * @returns 식별된 스토리지 프로바이더 또는 null
 */
export function identifyStorageProvider(url: string | null | undefined): string | null {
  if (!url) return null;
  
  try {
    const parsed = new URL(url);
    
    // Supabase
    if (parsed.hostname.includes('supabase.co')) {
      return 'supabase';
    }
    
    // Cloudflare Images
    if (parsed.hostname.includes('imagedelivery.net')) {
      return 'cloudflare';
    }
    
    // Google Cloud Storage
    if (parsed.hostname.includes('storage.googleapis.com') || 
        parsed.hostname.includes('storage.cloud.google.com')) {
      return 'gcs';
    }
    
    // Amazon S3
    if (parsed.hostname.includes('amazonaws.com')) {
      return 's3';
    }
    
    // Azure Blob Storage
    if (parsed.hostname.includes('blob.core.windows.net')) {
      return 'azure';
    }
    
    // Cloudinary
    if (parsed.hostname.includes('res.cloudinary.com')) {
      return 'cloudinary';
    }
    
    // Imgix
    if (parsed.hostname.includes('imgix.net')) {
      return 'imgix';
    }
    
    // ImageKit
    if (parsed.hostname.includes('imagekit.io')) {
      return 'imagekit';
    }
    
    // 알 수 없는 프로바이더
    return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return null;
  }
}

/**
 * Next.js Image 컴포넌트에서 사용할 수 있는 유효한 이미지 URL 생성
 * @param url 이미지 URL
 * @param options 추가 옵션
 * @returns 정규화된 URL 또는 fallback 이미지 URL
 */
export function getValidImageUrl(
  url: string | null | undefined, 
  options: { 
    fallbackImage?: string,
    usePlaceholder?: boolean
  } = {}
): string {
  const { 
    fallbackImage = '/images/placeholder.jpg',
    usePlaceholder = true
  } = options;
  
  // 기본 유효성 검사
  if (!url) return usePlaceholder ? fallbackImage : '';
  
  // 데이터 URL인 경우 그대로 반환
  if (url.startsWith('data:image/')) {
    return url;
  }
  
  // URL 정규화
  const normalized = normalizeImageUrl(url);
  
  // 정규화된 URL 유효성 검사
  if (normalized && isValidImageUrl(normalized)) {
    return normalized;
  }
  
  // 유효하지 않은 경우 Fallback 이미지 사용
  return usePlaceholder ? fallbackImage : '';
}

/**
 * 이미지 크기 조정을 위한 URL 생성 (CDN 또는 스토리지 프로바이더 기능 활용)
 * @param url 원본 이미지 URL
 * @param options 크기 옵션
 * @returns 크기가 조정된 이미지 URL
 */
export function getResizedImageUrl(
  url: string | null | undefined,
  options: {
    width?: number,
    height?: number,
    quality?: number
  } = {}
): string {
  if (!url) return '';
  
  const { width, height, quality = 80 } = options;
  
  // 유효한 URL 확인
  const validUrl = getValidImageUrl(url, { usePlaceholder: false });
  if (!validUrl) return '';
  
  // 스토리지 프로바이더 확인
  const provider = identifyStorageProvider(validUrl);
  
  // 스토리지 프로바이더에 따른 URL 생성
  switch (provider) {
    case 'cloudinary':
      // Cloudinary URL 형식: https://res.cloudinary.com/cloud-name/image/upload/c_fit,w_WIDTH,h_HEIGHT,q_QUALITY/filename
      return validUrl.replace(/\/upload\//, `/upload/c_fit,w_${width || 'auto'},h_${height || 'auto'},q_${quality}/`);
      
    case 'imgix':
      // Imgix URL 형식: https://your-source.imgix.net/image.jpg?w=WIDTH&h=HEIGHT&q=QUALITY
      const separator = validUrl.includes('?') ? '&' : '?';
      return `${validUrl}${separator}` + 
          (width ? `w=${width}&` : '') + 
          (height ? `h=${height}&` : '') + 
          `q=${quality}`;
      
    case 'supabase':
      // Supabase Storage URL은 현재 공식적인 변환 기능 미지원, 원본 반환
      return validUrl;
      
    // 다른 프로바이더에 대한 구현 가능
      
    default:
      // 지원되지 않는 프로바이더나 인식 불가능한 URL은 원본 반환
      return validUrl;
  }
} 