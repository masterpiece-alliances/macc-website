/**
 * 사용자 입력을 이스케이프 처리하는 유틸리티 함수
 */

// HTML 이스케이프
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 이메일 검증
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 전화번호 검증 (한국 전화번호 형식)
export function isValidPhoneNumber(phone: string): boolean {
  // 전화번호가 없는 경우는 유효하다고 간주 (선택적 필드인 경우)
  if (!phone) return true;
  
  // 한국 전화번호 형식 (휴대폰, 지역번호 포함한 일반 전화)
  const phoneRegex = /^(01[016789]|02|0[3-9][0-9])-?[0-9]{3,4}-?[0-9]{4}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// 텍스트 길이 검증
export function isValidLength(text: string, min: number, max: number): boolean {
  if (!text) return min === 0;
  return text.length >= min && text.length <= max;
}

// 입력 필드 전체 유효성 검증
export interface ContactFormData extends Record<string, unknown> {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  service: string;
  workshop?: string;
  message: string;
}

export function validateContactForm(data: ContactFormData): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  // 이름 검증
  if (!data.name || !isValidLength(data.name, 1, 50)) {
    errors.name = '이름을 입력해주세요 (최대 50자)';
  }
  
  // 이메일 검증
  if (!data.email || !isValidEmail(data.email)) {
    errors.email = '유효한 이메일 주소를 입력해주세요';
  }
  
  // 전화번호 검증 (선택 사항)
  if (data.phone && !isValidPhoneNumber(data.phone)) {
    errors.phone = '유효한 전화번호를 입력해주세요';
  }
  
  // 소속 검증 (선택 사항)
  if (data.organization && !isValidLength(data.organization, 1, 100)) {
    errors.organization = '소속을 100자 이내로 입력해주세요';
  }
  
  // 서비스 타입 검증
  if (!data.service) {
    errors.service = '서비스 유형을 선택해주세요';
  }
  
  // 특강&워크숍 선택 시 워크숍 세부 선택 검증
  if (data.service === '전문 프로그램' && !data.workshop) {
    errors.workshop = '특강/워크숍 유형을 선택해주세요';
  }
  
  // 메시지 검증
  if (!data.message || !isValidLength(data.message, 10, 1000)) {
    errors.message = '문의 내용을 10자 이상 입력해주세요 (최대 1000자)';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// 입력값 정리 (앞뒤 공백 제거 등)
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input.trim();
}

// 객체 내 모든 문자열 필드 정리
export function sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
  const sanitized = { ...data } as T;
  
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key as keyof T] === 'string') {
      (sanitized as Record<string, unknown>)[key] = sanitizeInput(sanitized[key as keyof T] as string);
    }
  });
  
  return sanitized;
} 