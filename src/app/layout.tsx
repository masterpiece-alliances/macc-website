import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Masterpiece Alliance - 코칭 & 컨설팅",
  description: "전문적인 코칭과 컨설팅을 통해 개인과 조직의 성장을 돕습니다.",
  metadataBase: new URL("https://www.ma-cc.co.kr"),
  openGraph: {
    title: "Masterpiece Alliance - 코칭 & 컨설팅",
    description: "전문적인 코칭과 컨설팅을 통해 개인과 조직의 성장을 돕습니다.",
    url: "https://www.ma-cc.co.kr",
    siteName: "Masterpiece Alliance",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Masterpiece Alliance - 코칭 & 컨설팅",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Masterpiece Alliance - 코칭 & 컨설팅",
    description: "전문적인 코칭과 컨설팅을 통해 개인과 조직의 성장을 돕습니다.",
    images: ["/og-image.png"],
  },
  colorScheme: 'light',
  other: {
    'color-scheme': 'light',
    'format-detection': 'telephone=yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="light" style={{colorScheme: 'light'}}>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="format-detection" content="telephone=yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <Header />
        <main className="pt-20 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
