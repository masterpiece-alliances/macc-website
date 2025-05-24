'use client';

import React, { useState } from 'react';

type FormState = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  service: string;
  workshop: string;
  message: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactForm = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    service: '',
    workshop: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 서비스 옵션들 (아이콘과 설명 포함)
  const serviceOptions = [
    {
      value: '신중년 커리어 개발',
      label: '신중년 커리어 개발',
      icon: '👨‍💼',
      description: '50세 이후 새로운 도전과 성장을 위한 커리어 코칭'
    },
    {
      value: '로컬 브랜딩',
      label: '로컬 브랜딩',
      icon: '🏘️',
      description: '지역 경제를 살리는 브랜딩 전략과 솔루션'
    },
    {
      value: '조직 개발',
      label: '조직 개발',
      icon: '🏢',
      description: '비즈니스 성장을 위한 체계적인 조직 개발'
    },
    {
      value: 'Masterpiece Career Society',
      label: 'Masterpiece Career Society',
      icon: '👥',
      description: '멤버십으로 운영되는 프리미엄 커뮤니티'
    },
    {
      value: '전문 프로그램',
      label: '전문 프로그램',
      icon: '🎓',
      description: '전문적인 교육과 실습을 통한 역량 강화'
    },
    {
      value: '기타',
      label: '기타 서비스 문의',
      icon: '💬',
      description: '위에 없는 다른 서비스나 맞춤 상담'
    }
  ];

  // 특강&워크숍 옵션들
  const workshopOptions = [
    { value: 'first-book-writing', label: '내 인생 첫 책 쓰기' },
    { value: 'gallup-strengths', label: '갤럽 강점 프로그램' },
    { value: 'interest-based-career', label: '흥미 기반 커리어 프로그램' },
    { value: 'via-values-in-action', label: 'VIA(Values in Action)' },
    { value: 'career-reading-club', label: '커리어 전문 독서 모임' },
    { value: 'mental-management-skills', label: '멘탈 관리의 기술' },
    { value: 'one-on-one-conversation', label: '1 on 1 대화 스킬' },
    { value: 'listening-skills', label: '입으로 하는 경청' },
    { value: 'secret-of-questions', label: '질문의 비밀' },
    { value: 'connection-conversation', label: '연결의 대화법' },
    { value: 'feedback-skills', label: '피드백' },
    { value: 'business-mbti', label: '비즈니스 MBTI' },
    { value: 'expert-self-branding', label: '전문가의 자기브랜딩' }
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // 서비스가 변경되면 워크숍 선택 초기화
    if (name === 'service' && value !== '전문 프로그램') {
      setFormData((prev) => ({ ...prev, [name]: value, workshop: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '문의 접수 중 오류가 발생했습니다.');
      }

      // 성공 처리
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        service: '',
        workshop: '',
        message: '',
      });

      // 3초 후 상태 초기화
      setTimeout(() => {
        setStatus('idle');
      }, 5000);

    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-100">
      <div className="flex items-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-[#0061ad] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <h2 className="text-xl md:text-2xl font-bold break-keep">문의 양식</h2>
      </div>

      {/* 성공 메시지 */}
      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-md flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-semibold break-keep">문의가 성공적으로 접수되었습니다!</p>
            <p className="text-sm mt-1 break-keep">담당자가 검토 후 빠른 시간 내에 연락드리겠습니다.</p>
          </div>
        </div>
      )}

      {/* 에러 메시지 */}
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-semibold break-keep">문의 접수 중 오류가 발생했습니다</p>
            <p className="text-sm mt-1 break-keep">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 break-keep">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0061ad] focus:border-[#0061ad] transition"
            required
            disabled={status === 'submitting'}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 break-keep">
            이메일 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0061ad] focus:border-[#0061ad] transition"
            required
            disabled={status === 'submitting'}
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 break-keep">
            연락처
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0061ad] focus:border-[#0061ad] transition"
            disabled={status === 'submitting'}
          />
        </div>

        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1 break-keep">
            소속 (회사명/단체명)
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="예: (주)마스터피스, 서울대학교, 개인사업자 등"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0061ad] focus:border-[#0061ad] transition"
            disabled={status === 'submitting'}
          />
        </div>
        
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1 break-keep">
            관심 서비스 <span className="text-red-500">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#0061ad] focus:border-[#0061ad] transition bg-white"
            required
            disabled={status === 'submitting'}
          >
            <option value="">서비스를 선택해주세요</option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.icon} {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 특강&워크숍 선택 시 세부 선택 옵션 */}
        {formData.service === '전문 프로그램' && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label htmlFor="workshop" className="block text-sm font-medium text-gray-700 mb-3 break-keep">
              희망하는 특강/워크숍 <span className="text-red-500">*</span>
            </label>
            <select
              id="workshop"
              name="workshop"
              value={formData.workshop}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#0061ad] focus:border-[#0061ad] transition bg-white"
              required
              disabled={status === 'submitting'}
            >
              <option value="">워크숍을 선택해주세요</option>
              {workshopOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 break-keep">
            문의 내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="구체적인 요구사항이나 궁금한 점을 자유롭게 작성해주세요."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0061ad] focus:border-[#0061ad] transition"
            required
            disabled={status === 'submitting'}
          ></textarea>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={status === 'submitting' || !formData.service}
            className={`w-full py-3 px-6 rounded-md font-semibold transition flex items-center justify-center break-keep ${
              status === 'submitting' || !formData.service
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-[#0061ad] text-white hover:bg-[#004d8a]'
            }`}
          >
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                처리 중...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                문의하기
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm; 