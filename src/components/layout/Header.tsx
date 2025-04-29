'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-95 shadow-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/ma_font.png"
            alt="Masterpiece Alliance Logo"
            width={200}
            height={40}
            style={{ width: 'auto', height: 'auto', maxWidth: '200px' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
            홈
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">
            소개
          </Link>
          <Link href="/services" className="text-gray-600 hover:text-gray-900 font-medium">
            서비스
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">
            상담 신청
          </Link>
          <Link href="/location" className="text-gray-600 hover:text-gray-900 font-medium">
            오시는 길
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 focus:outline-none"
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
            <Link href="/" onClick={closeMenu} className="text-gray-600 hover:text-gray-900 font-medium py-2">
              홈
            </Link>
            <Link href="/about" onClick={closeMenu} className="text-gray-600 hover:text-gray-900 font-medium py-2">
              소개
            </Link>
            <Link href="/services" onClick={closeMenu} className="text-gray-600 hover:text-gray-900 font-medium py-2">
              서비스
            </Link>
            <Link href="/contact" onClick={closeMenu} className="text-gray-600 hover:text-gray-900 font-medium py-2">
              상담 신청
            </Link>
            <Link href="/location" onClick={closeMenu} className="text-gray-600 hover:text-gray-900 font-medium py-2">
              오시는 길
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header; 