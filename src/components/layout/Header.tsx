'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  // 로고 사이즈 설정 (픽셀 단위로 직접 지정)
  const LOGO_SIZE = {
    mobile: 32,   // 모바일 높이 (px)
    desktop: 40   // 데스크톱 높이 (px)
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  const handleServicesMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 150);
    setDropdownTimeout(timeout);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-95 shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/ma_font.png"
            alt="Masterpiece Alliance"
            width={200}
            height={20}
            className="w-auto my-2 logo-responsive"
            style={{ 
              width: 'auto', 
              height: `${LOGO_SIZE.mobile}px`
            }}
            priority
          />
          <style jsx>{`
            .logo-responsive {
              height: ${LOGO_SIZE.mobile}px;
            }
            @media (min-width: 768px) {
              .logo-responsive {
                height: ${LOGO_SIZE.desktop}px;
              }
            }
          `}</style>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-[#0061ad] font-medium transition-colors duration-300 break-keep">
            홈
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-[#0061ad] font-medium transition-colors duration-300 break-keep">
            소개
          </Link>
          
          {/* 서비스 드롭다운 */}
          <div 
            className="relative group"
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <button className="text-gray-700 hover:text-[#0061ad] font-medium transition-colors duration-300 break-keep cursor-pointer">
              서비스
            </button>
            
            {/* 드롭다운 메뉴 */}
            {isServicesDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ 
                  duration: 0.2, 
                  ease: [0.16, 1, 0.3, 1],
                  opacity: { duration: 0.15 }
                }}
                className="absolute top-full left-0 mt-2 w-60 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                }}
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                {/* 화살표 */}
                <div className="absolute -top-2 left-6 w-4 h-4 bg-white/95 backdrop-blur-xl rotate-45 border-l border-t border-white/20"></div>
                
                <div className="relative bg-gradient-to-b from-white/90 to-white/95 backdrop-blur-xl">
                  <Link 
                    href="/services/main-biz" 
                    className="group relative flex items-center px-6 py-5 text-gray-800 hover:bg-gradient-to-r hover:from-[#0061ad]/90 hover:to-[#004d8a]/90 hover:text-white transition-all duration-300 ease-out break-keep overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0061ad]/5 to-[#004d8a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="font-semibold text-base mb-1">Main Biz</div>
                      <div className="text-sm opacity-70 group-hover:opacity-90 transition-opacity duration-300">핵심 비즈니스 서비스</div>
                    </div>
                    <motion.div
                      className="absolute right-4 opacity-0 group-hover:opacity-100"
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </Link>
                  
                  <div className="mx-6 border-t border-gray-200/50"></div>
                  
                  <Link 
                    href="/services/workshops" 
                    className="group relative flex items-center px-6 py-5 text-gray-800 hover:bg-gradient-to-r hover:from-[#0061ad]/90 hover:to-[#004d8a]/90 hover:text-white transition-all duration-300 ease-out break-keep overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0061ad]/5 to-[#004d8a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="font-semibold text-base mb-1">특강 & 워크숍</div>
                      <div className="text-sm opacity-70 group-hover:opacity-90 transition-opacity duration-300">전문 교육 프로그램</div>
                    </div>
                    <motion.div
                      className="absolute right-4 opacity-0 group-hover:opacity-100"
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
          
          <Link href="/blog" className="text-gray-700 hover:text-[#0061ad] font-medium transition-colors duration-300 break-keep">
            칼럼
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-[#0061ad] font-medium transition-colors duration-300 break-keep">
            상담 신청
          </Link>
          <Link href="/location" className="text-gray-700 hover:text-[#0061ad] font-medium transition-colors duration-300 break-keep">
            오시는 길
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-[#0061ad] focus:outline-none transition-colors duration-300"
          onClick={toggleMenu}
          aria-label="메뉴 열기"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/" onClick={closeMenu} className="text-gray-700 hover:text-[#0061ad] font-medium py-2 transition-colors duration-300 break-keep">
              홈
            </Link>
            <Link href="/about" onClick={closeMenu} className="text-gray-700 hover:text-[#0061ad] font-medium py-2 transition-colors duration-300 break-keep">
              소개
            </Link>
            
            {/* 모바일 서비스 드롭다운 */}
            <div>
              <button 
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="text-gray-700 hover:text-[#0061ad] font-medium py-2 transition-colors duration-300 break-keep flex items-center justify-between w-full"
              >
                <span>서비스</span>
                <div className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {isMobileServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 bg-gray-50 rounded-lg overflow-hidden"
                >
                  <Link 
                    href="/services/main-biz" 
                    onClick={closeMenu} 
                    className="group flex items-center justify-between px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#0061ad]/10 hover:to-[#004d8a]/10 hover:text-[#0061ad] transition-all duration-300 break-keep"
                  >
                    <div>
                      <div className="font-semibold text-sm mb-1">Main Biz</div>
                      <div className="text-xs text-gray-500 group-hover:text-[#0061ad]/70">핵심 비즈니스 서비스</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#0061ad] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  
                  <div className="border-t border-gray-200/50 mx-4"></div>
                  
                  <Link 
                    href="/services/workshops" 
                    onClick={closeMenu} 
                    className="group flex items-center justify-between px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#0061ad]/10 hover:to-[#004d8a]/10 hover:text-[#0061ad] transition-all duration-300 break-keep"
                  >
                    <div>
                      <div className="font-semibold text-sm mb-1">특강 & 워크숍</div>
                      <div className="text-xs text-gray-500 group-hover:text-[#0061ad]/70">전문 교육 프로그램</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#0061ad] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              )}
            </div>
            
            <Link href="/blog" onClick={closeMenu} className="text-gray-700 hover:text-[#0061ad] font-medium py-2 transition-colors duration-300 break-keep">
              칼럼
            </Link>
            <Link href="/contact" onClick={closeMenu} className="text-gray-700 hover:text-[#0061ad] font-medium py-2 transition-colors duration-300 break-keep">
              상담 신청
            </Link>
            <Link href="/location" onClick={closeMenu} className="text-gray-700 hover:text-[#0061ad] font-medium py-2 transition-colors duration-300 break-keep">
              오시는 길
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header; 