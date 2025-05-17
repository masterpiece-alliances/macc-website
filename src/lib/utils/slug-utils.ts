/**
 * 슬러그 관련 유틸리티 함수
 */

/**
 * 문자열을 URL 친화적인 슬러그로 변환
 * @param text 슬러그로 변환할 문자열
 * @param options 옵션 객체
 * @returns URL 친화적인 슬러그
 */
export function generateSlug(text: string, options: { 
  addUniqueId?: boolean, // 고유 ID 추가 여부
  preserveKorean?: boolean, // 한글 보존 여부
  maxLength?: number // 최대 길이 (ID 제외)
} = {}): string {
  const { 
    addUniqueId = true, 
    preserveKorean = true, 
    maxLength = 100 
  } = options;
  
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  // 기본 슬러그 생성
  let slug = text
    .toLowerCase()
    .trim();
    
  if (preserveKorean) {
    // 한글과 영문, 숫자, 공백 유지하고 나머지는 하이픈으로 대체
    slug = slug.replace(/[^\w\s가-힣]/g, '-');
  } else {
    // 영문과 숫자, 공백만 유지하고 나머지는 하이픈으로 대체
    slug = slug.replace(/[^\w\s]/g, '-');
  }
  
  // 공백을 하이픈으로 변환
  slug = slug.replace(/\s+/g, '-');
  
  // 연속된 하이픈을 하나로 통합
  slug = slug.replace(/-+/g, '-');
  
  // 앞뒤 하이픈 제거
  slug = slug.replace(/^-|-$/g, '');
  
  // 최대 길이 제한 (너무 긴 슬러그 방지)
  if (maxLength > 0 && slug.length > maxLength) {
    slug = slug.substring(0, maxLength).replace(/-+$/, '');
  }
  
  // 고유 ID 추가 (필요 시)
  if (addUniqueId) {
    const timestamp = Date.now().toString(36); // 타임스탬프를 36진수로 변환 (더 짧게)
    const random = Math.random().toString(36).substring(2, 5); // 랜덤 문자열
    slug = `${slug}-${timestamp}${random}`;
  }
  
  return slug;
}

/**
 * 슬러그 정규화 - 중복 하이픈 제거 및 형식 정리
 * @param slug 정규화할 슬러그
 * @returns 정규화된 슬러그
 */
export function normalizeSlug(slug: string): string {
  if (!slug || typeof slug !== 'string') {
    return '';
  }
  
  // 하이픈 중복 제거, 앞뒤 하이픈 제거
  return slug.replace(/--+/g, '-').replace(/^-|-$/g, '');
}

/**
 * 슬러그에서 기본 부분 추출 (고유 ID 제외)
 * @param slug 처리할 슬러그
 * @returns 기본 슬러그 (ID 부분 제외)
 */
export function getBaseSlug(slug: string): string {
  if (!slug || typeof slug !== 'string') {
    return '';
  }
  
  const normalizedSlug = normalizeSlug(slug);
  
  // 1. 일반적인 패턴: 마지막 하이픈 이후 ID 형태 (예: my-post-123abc)
  const lastHyphenIndex = normalizedSlug.lastIndexOf('-');
  if (lastHyphenIndex !== -1) {
    const lastPart = normalizedSlug.substring(lastHyphenIndex + 1);
    
    // ID 형식 체크 - 숫자+문자 형태 (예: 123abc) 또는 타임스탬프 형태 (예: ljxfj3)
    if ((/^\d+[a-z0-9]{2,4}$/.test(lastPart) || /^[a-z0-9]{6,10}$/.test(lastPart)) && 
        lastHyphenIndex > 0) {
      return normalizedSlug.substring(0, lastHyphenIndex);
    }
  }
  
  // 2. 특정 규칙에 맞는 것이 없으면 원본 반환
  return normalizedSlug;
}

/**
 * 두 슬러그가 유사한지 비교
 * @param slug1 첫번째 슬러그
 * @param slug2 두번째 슬러그
 * @returns 유사하면 true, 아니면 false
 */
export function areSlugsRelated(slug1: string, slug2: string): boolean {
  if (!slug1 || !slug2) return false;
  
  // 정확히 일치하는 경우
  if (normalizeSlug(slug1) === normalizeSlug(slug2)) {
    return true;
  }
  
  // 기본 슬러그 추출 후 비교
  const base1 = getBaseSlug(slug1);
  const base2 = getBaseSlug(slug2);
  
  // 기본 슬러그가 동일하거나 포함 관계면 관련 있는 것으로 판단
  // Make sure both base slugs exist and are strings
  return !!base1 && !!base2 && (
    base1 === base2 || 
    base1.includes(base2) || 
    base2.includes(base1)
  );
}

/**
 * 슬러그 유효성 검사
 * @param slug 검사할 슬러그
 * @returns 유효하면 true, 아니면 false
 */
export function isValidSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') {
    return false;
  }
  
  // 슬러그 유효성 검사: 영문, 숫자, 하이픈, 한글만 허용 (옵션)
  const slugRegex = /^[a-z0-9가-힣-]+$/;
  
  return (
    slugRegex.test(slug) && // 유효한 문자만 포함
    !slug.startsWith('-') && // 하이픈으로 시작하지 않음
    !slug.endsWith('-') && // 하이픈으로 끝나지 않음
    !slug.includes('--') // 중복 하이픈 없음
  );
}

/**
 * 슬러그를 깔끔하게 복구 (URL 인코딩, 잘못된 형식 등을 처리)
 * @param rawSlug URL이나 다른 소스에서 가져온 슬러그
 * @returns 복구된 깔끔한 슬러그
 */
export function cleanupSlug(rawSlug: string): string {
  if (!rawSlug) return '';
  
  // 1. URL 디코딩 (인코딩된 슬러그 처리)
  let decoded;
  try {
    decoded = decodeURIComponent(rawSlug);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    decoded = rawSlug; // 디코딩 실패 시 원본 사용
  }
  
  // 2. 비슬러그 문자 제거 (URL 파라미터 등)
  const cleaned = decoded
    .split('?')[0] // URL 쿼리 파라미터 제거
    .split('#')[0] // URL 해시 제거
    .split('/').pop() || ''; // 경로의 마지막 부분만 사용
  
  // 3. 정규화
  return normalizeSlug(cleaned);
} 