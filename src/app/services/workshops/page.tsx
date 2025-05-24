"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Workshop {
  id: number;
  subtitle: string;
  title: string;
  highlightText: string;
  description: string;
  features: string[];
  category: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

export default function WorkshopsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("personal");

  const categories: Category[] = [
    {
      id: "personal",
      name: "개인 성장",
      description: "자기계발과 역량 강화",
      color: "from-emerald-500 to-teal-500"
    },
    {
      id: "leadership",
      name: "리더십 & 소통",
      description: "대화법과 리더십 스킬",
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: "business",
      name: "비즈니스 & 브랜딩",
      description: "비즈니스 역량과 브랜딩",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "special",
      name: "특별 프로그램",
      description: "특별한 경험과 추억",
      color: "from-orange-500 to-red-500"
    }
  ];

  const workshops: Workshop[] = [
    // 개인 성장 카테고리
    {
      id: 1,
      subtitle: "저자로 거듭나기",
      title: "내 인생 첫 책 쓰기",
      highlightText: "글을 쓰는 게 부담스러우신가요?",
      description: "글 쓰기에 대한 부담을 없애고, 출판 기획부터 원고 작성, 탈고는 물론 저자로서 성장 활동까지 돕습니다. 30년 경력의 편집장 출신 코치가 함께합니다.",
      category: "personal",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1470&auto=format&fit=crop",
      features: [
        "내 마음 글로 표현하기, 글 안에 담긴 자신과의 만남",
        "출간 프로세스 및 각 단계별 포인트의 이해와 적용 방법",
        "글의 다양한 특성 및 구성에 대한 이해",
        "주제 선정을 위한 자기 인식 및 경험 자원 탐색",
        "목차의 이해와 챕터별 소제목 선정",
        "원고 작성, 탈고 기본 / 제작 및 서점 판매(옵션)"
      ]
    },
    {
      id: 4,
      subtitle: "타고난 재능 DNA로 만드는 효과적 성과 창출",
      title: "갤럽 강점 프로그램",
      highlightText: "삶의 질과 업무 몰입도를 높이고 싶으신가요?",
      description: "갤럽(Gallup)에서 개발한 강점 진단을 통해 자신의 재능을 알고 집중하면, 업무 몰입도가 6배, 삶의 질이 3배 높아집니다. 포춘 500대 기업 중 90% 이상이 활용하고 있습니다.",
      category: "personal",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop",
      features: [
        "갤럽 강점 및 강점 강화 원리 이해",
        "개인 맞춤형 진단 레포트를 통한 자신의 강점 이해",
        "강점 테마의 빛과 그림자의 이해 및 약점 관리 스킬",
        "개인별 강점을 활용한 개인의 업무 생산성 향상 전략",
        "팀 단위 강점 그리드를 활용한 조직 생산성 강화"
      ]
    },
    {
      id: 10,
      subtitle: "더 행복한 직업과 여가생활을 찾을 수 있는",
      title: "흥미 기반 커리어 프로그램",
      highlightText: "행복한 인생을 만들기 위해 나에게 맞는 직업과 여가는 무엇일까요?",
      description: "\"나는 무엇을 좋아하는가?\"라는 인생 커리어 질문을 전세계에서 가장 많이 사용하는 'Strong Interest Inventory' 진단을 활용하여 탐색합니다. 이를 활용하여 나의 직업과 여가생활을 설계해 봅니다.",
      category: "personal",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop",
      features: [
        "Strong 전문가용 진단 : 국제공인 자격을 가진 전문가의 진행",
        "나의 흥미 코드 이해하기 : RIASEC 코드로 나의 흥미코드 탐색하기",
        "나의 퍼스널 스타일 이해하기 : 일하는 법, 학습하는 법, 리스크 관리 등 내 스타일 알아보기",
        "흥미코드 Top5, Low3 알기 : 나의 흥미 Top3코드 활용법, Low3로 약점 관리하기",
        "흥미코드에 기반한 직업 기회 찾기 : 나의 흥미코드와 연결된 직업군을 탐색하고 정리해 보기",
        "현재 나의 직업 접근방식 : 흥미코드로 현재 나의 직업을 나다운 방식으로 풀어보 놓이는 전략 찾기"
      ]
    },
    {
      id: 11,
      subtitle: "가치관(성품)기반 강점 탐색과 활용",
      title: "VIA(Values in Action)",
      highlightText: "당신은 소중하게 생각하는 가치에 맞게 살고, 살고 계신가요?",
      description: "미국 긍정심리학회에서 개발한 가치관 강점으로, 전세계 모든 문화권에서 나타나는 24가지 가치관 중 나의 Top5를 진단합니다. 이를 통해 지금까지 해온 중요한 선택에서 드러나는 나만의 가치관을 이해하고 내가 소중하게 여기는 가치로 삶을 선택할 수 있습니다.",
      category: "personal",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1470&auto=format&fit=crop",
      features: [
        "가치관 강점 진단 : 미국 긍정심리학회에서 제공하는 온라인 진단",
        "나의 가치관 Top5 이해하기 : 나의 행동을 이끄는 5가지 가치관 강점 이해하기",
        "나의 중요한 선택 속 드러나 가치관 강점 돌아보기",
        "나의 가치관을 중심으로 중요한 미래의 선택 기준 정리하기",
        "나의 가치관 강점으로 일과 삶에 적용하기"
      ]
    },
    {
      id: 12,
      subtitle: "커리어를 위한 지식을 쌓고, 지혜를 키우는",
      title: "커리어 전문 독서 모임",
      highlightText: "AI시대, 당신의 미래 커리어 여정이 불안하지 않나요?",
      description: "진로 심리학에 기반하여 커리어 변화를 이해하고, 시대 변화를 분석 예측하며, 전략을 함께 세워가는 독서 모임입니다. 전문 커리어 코치와 함께 나의 커리어 선택을 돌아보고 이후 커리어 개발에 적용해 보는 프로그램입니다.",
      category: "personal",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1470&auto=format&fit=crop",
      features: [
        "진로 심리학 기본서 읽기 : 전문적인 진로에 대한 이론과 콘텍스트 학습",
        "변화하는 커리어에 대해 제대로 알기 : 요즘 시대변화와 커리어 전략 토론에 보기",
        "세컨드 커리어 관련 서적 읽기 : 40대 이후 '요즘어른'들의 커리어 이해하기",
        "직장인 이직 시 도움되는 커리어 독서 : 커리어 피봇팅과 커리어 개발 전략",
        "사회 경험과 직장경험을 커리어 자원으로 활용하는 독서 : 나의 경험 활용하기"
      ]
    },
    {
      id: 13,
      subtitle: "구글에서도 활용하는 직장인 마음 사용법",
      title: "멘탈 관리의 기술",
      highlightText: "당신의 멘탈은 안녕하신가요?",
      description: "직장에서 활용할 수 있는 멘탈 관리 스킬을 이해하고, 멘탈 저널링을 통해서 새로운 습관으로 만들어 가는 챌린지를 함께 합니다. 구글에서도 활용하는 호흡 훈련을 기반으로 한, 멘탈 코움을 만들어 생산성 높은 자기 마음 사용법을 배우는 시간입니다.",
      category: "personal",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1470&auto=format&fit=crop",
      features: [
        "마음 챙김 호흡법 이론과 훈련 : 마음 챙김의 뇌과학적 효과와 스트레스 관리에 적용하는 훈련 함께 하기",
        "멘탈 저널링 연습 : 마음자극 5요인을 활용한 멘탈 저널링 배우고 활용하기",
        "감정 알아차리기 : 예일대학에서 개발한 감정 무드미터를 활용하여 나의 감정을 알아 차리기",
        "감정 활용하기 : 학인한 감정을 표현하고, 감정이 알려주는 메시지 수용하기"
      ]
    },

    // 리더십 & 소통 카테고리
    {
      id: 2,
      subtitle: "구성원의 자발적 성장을 돕는",
      title: "1 on 1 대화 스킬",
      highlightText: "구성원과 면담하는 게 부담스러우신가요?",
      description: "면담의 한계를 극복하기 위해 실리콘 밸리에서 시작된 1 on 1은 구성원이 더 기다리는 일대일 대화 스킬로, 구성원의 자발성과 몰입도를 높여 팀 성과를 높입니다.",
      category: "leadership",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1470&auto=format&fit=crop",
      features: [
        "통찰 활용한 리더의 자기인식",
        "경영환경 변화와 구성원에 대한 인식의 전환",
        "1 on 1에 대한 정확한 이해와 면담과의 차이점",
        "1 on 1의 실전 및 현업에서의 실행 계획 수립",
        "구성원의 몰입도를 높이는 노하우"
      ]
    },
    {
      id: 3,
      subtitle: "상대 중심으로 자발성을 높이는",
      title: "입으로 하는 경청",
      highlightText: "보다 잘 소통하고 싶으신가요?",
      description: "소통의 시작은 말하기가 아닌 경청입니다. 경청의 효과는 잘 듣는 것을 넘어 상대를 존중해주고, 스스로 움직이게 만드는 효과가 있습니다. 입으로 하는 경청을 경험하세요.",
      category: "leadership",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1470&auto=format&fit=crop",
      features: [
        "경청의 의미와 원리, 효과에 대한 이해",
        "경청의 종류와 경청 단계",
        "'입으로 하는 경청' 스킬 훈련",
        "사례를 통한 경청의 실습과 경험",
        "현업에서의 경청 계획 수립 및 다짐"
      ]
    },
    {
      id: 6,
      subtitle: "생각의 힘을 키우고, 잠재력을 일깨우는",
      title: "질문의 비밀",
      highlightText: "생각의 힘을 키우고, 잠재력을 일깨우는 질문 원리가 궁금하지 않으신가요?",
      description: "좋은 질문은 자녀와 구성원을 스스로 생각하게 만들고, 문제 해결력을 높여줍니다. 뇌 과학의 원리에 기반한 탁월한 질문법의 비밀을 알려드립니다.",
      category: "leadership",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1470&auto=format&fit=crop",
      features: [
        "질문의 힘과 중요성에 대한 이해",
        "뇌 과학 기반 좋은 질문의 원칙 4가지",
        "심리적 안전감을 만드는 질문 환경",
        "질문을 생활화하는 문화 설계 및 실천 팁"
      ]
    },
    {
      id: 7,
      subtitle: "관찰을 회복하고, 서로를 연결하는",
      title: "연결의 대화법",
      highlightText: "정말 '통하는' 대화를 하고 계신가요?",
      description: "'연결의 대화'는 비폭력대화(NVC)를 기반으로, 판단 대신 관찰하고, 비난 대신 공감하며, 통제 대신 연결을 선택하는 말하기를 배우는 프로그램입니다. 이 프로그램은 리더, 부모, 교사, 그리고 더 나은 인간관계를 원하는 모든 사람을 위한 실천형 콘텐츠입니다.",
      category: "leadership",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop",
      features: [
        "관찰 vs 평가",
        "느낌 표현하기",
        "욕구 인식하기",
        "요청과 강요 구분하기",
        "자기 공감 → 타인 공감 → 대화 확장"
      ]
    },
    {
      id: 14,
      subtitle: "감정을 배려하는 성장 촉진 대화법",
      title: "피드백",
      highlightText: "당신은 피드백이라는 이름으로 언어 폭력을 가하고 있지 않나요?",
      description: "뇌과학 기반으로 자발적 성장을 촉진하는 피드백의 원리를 익히고, 자발적 동기를 강화시키는 긍정적 피드백과 상대의 실패와 심수를 직책하지 않고, 스스로 성장하도록 이끄는, 성장촉진 5단계 대화법을 익힙니다.",
      category: "leadership",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1470&auto=format&fit=crop",
      features: [
        "자발적 성장을 촉진하는 뇌과학적 원리 이해하기",
        "인정과 칭찬의 차이 이해하기",
        "인정, 칭찬 언어 익히기",
        "긍정적 피드백 스킬 : 사람들의 긍정 행동과 자존감을 높여주는 인정, 칭찬 스킬 익히기",
        "성장촉진 5단계 피드백 : 감정을 배려하면서도, 자발적 성장을 이끄는 성장촉진 5단계 피드백 기술 익히기"
      ]
    },

    // 비즈니스 & 브랜딩 카테고리
    {
      id: 8,
      subtitle: "개인의 다름으로 비즈니스의 성공을 이끌어 내는",
      title: "비즈니스 MBTI",
      highlightText: "성격은 비즈니스의 핵심을 바꾼다!",
      description: "비즈니스에서의 성공은 단순히 전략이나 기술만으로 이루어지지 않습니다. 팀워크, 커뮤니케이션, 리더십은 각 개인의 성격에 큰 영향을 받습니다. <비즈니스 MBTI>는 성격 유형을 기반으로 조직 내 효율적인 소통과 협업 전략을 제시하는 프로그램입니다.",
      category: "business",
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1470&auto=format&fit=crop",
      features: [
        "MBTI, 비즈니스에 왜 필요한가?",
        "성격 유형에 맞는 커뮤니케이션 전략",
        "각 성격 유형의 리더십 스타일",
        "팀워크와 협업 : MBTI를 팀 시너지에 활용하기",
        "MBTI로 보는 비즈니스 의사결정 스타일"
      ]
    },
    {
      id: 9,
      subtitle: "전문성을 차별화된 브랜드로 만들어 비즈니스를 확장시키는",
      title: "전문가의 자기브랜딩",
      highlightText: "나만 똑같던 나의 전문성을 차별화된 브랜드로!",
      description: "자신도 미처 몰랐던 전문성과 커리어 자산을 탐색하고, 고객에게 자신의 가치와 서비스를 잘 전달할 수 있도록 자신의 전문성을 인식하고 브랜드 자산으로 재정의합니다. 이를 통해 '차별화된 브랜드'를 정립하여 당신다운 비즈니스로 확장합니다.",
      category: "business",
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?q=80&w=1470&auto=format&fit=crop",
      features: [
        "Being : 자기객관화, 자기다움의 이해",
        "Reviewing : 전문성, 커리어 자원 탐색을 통한 브랜드 에셋 추출",
        "Arranging : 브랜드 대시보드 만들기, 자원구조화(CAS)",
        "Navigating : POP, POD 정리 & 브랜드 아이덴티티 정의",
        "Doing : 브랜드 스테이트먼트 정리 & 실행 계획 수립"
      ]
    },

    // 특별 프로그램 카테고리
    {
      id: 5,
      subtitle: "진심 어린 존경을 담은 단행본",
      title: "청담(靑談) 레코드",
      highlightText: "보다 특별하게 감사의 마음을 전하고 싶으신가요?",
      description: "청담 레코드는 부모님과 존경하는 분의 푸른 시절을 담은 한 권의 책입니다. 함께 모여 그 분의 삶을 기억하는 과정을 통해 희복과 치유의 과정도 같게 됩니다. 그리고 무엇보다 진심 어린 존경을 전하는 감동의 선물이기도 합니다.",
      category: "special",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1470&auto=format&fit=crop",
      features: [
        "부모님에 대한 기억 수집",
        "단행본의 제목 및 목차 구성",
        "부모님과 함께했던 추억과 각자 소장한 사진 모음",
        "가족 사진 촬영(주제별 콘셉트 선정, 옵션)",
        "서프라이즈 이벤트 기획(출판 기념회 겸 팰샬 잔치)"
      ]
    }
  ];

  const filteredWorkshops = workshops.filter(workshop => workshop.category === activeCategory);
  const activeTab = categories.find(cat => cat.id === activeCategory);



  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="relative w-full h-[30vh] md:h-[40vh] flex items-center bg-gradient-to-r from-[#0061ad] to-[#004d8a] overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6 break-keep">
              전문 프로그램
            </h1>
            <p className="text-lg md:text-2xl mb-8 max-w-4xl break-keep opacity-90">
              Masterpiece Alliance의 전문 교육 프로그램으로 개인과 조직의 성장을 지원합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* 서비스 네비게이션 */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 border-2 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                  activeCategory === category.id
                    ? 'bg-white border-[#0061ad] text-[#0061ad]'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-[#0061ad] hover:text-[#0061ad]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 워크숍 상세 목록 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* 카테고리 헤더 */}
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {activeTab?.name}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {activeTab?.description}을 위한 전문 프로그램들입니다.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  총 {filteredWorkshops.length}개의 프로그램
                </div>
              </div>

              {/* 워크숍 상세 리스트 */}
              <div className="space-y-24">
                {filteredWorkshops.map((workshop, index) => (
                  <motion.div
                    key={workshop.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex flex-col ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } items-center gap-12 lg:gap-16`}
                  >
                    {/* 이미지 영역 */}
                    <div className="w-full lg:w-1/2">
                      <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
                        <Image
                          src={workshop.image}
                          alt={workshop.title}
                          fill
                          style={{ objectFit: "cover" }}
                          className="transition-transform duration-300 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                      </div>
                    </div>

                    {/* 콘텐츠 영역 */}
                    <div className="w-full lg:w-1/2 space-y-6">
                                             {/* 헤더 */}
                       <div>
                         <div className="mb-3">
                           <span className="text-sm font-medium text-[#0061ad] bg-blue-50 px-3 py-1 rounded-full">
                             {workshop.subtitle}
                           </span>
                         </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 break-keep">
                          {workshop.title}
                        </h3>
                        <p className="text-lg md:text-xl text-[#0061ad] font-semibold mb-4 break-keep">
                          {workshop.highlightText}
                        </p>
                      </div>

                      {/* 설명 */}
                      <p className="text-gray-700 leading-relaxed text-base md:text-lg break-keep">
                        {workshop.description}
                      </p>

                      {/* 주요 내용 */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4">주요 내용</h4>
                        <div className="space-y-3">
                          {workshop.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start">
                              <svg
                                className="w-6 h-6 text-[#0061ad] mr-3 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-gray-700 break-keep font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                                             {/* 문의 버튼 */}
                       <div>
                         <Link
                           href="/contact"
                           className="inline-flex items-center bg-[#0061ad] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#004d8a] transition-colors duration-300"
                         >
                           프로그램 문의
                           <svg
                             xmlns="http://www.w3.org/2000/svg"
                             className="h-5 w-5 ml-2"
                             fill="none"
                             viewBox="0 0 24 24"
                             stroke="currentColor"
                           >
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                           </svg>
                         </Link>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-[#0061ad] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            맞춤형 교육 프로그램을 원하시나요?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            귀하의 조직에 특화된 맞춤형 워크숍과 특강을 기획해드립니다.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center bg-white text-[#0061ad] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
          >
            맞춤 교육 문의
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
} 