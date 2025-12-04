import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "당골래 - 전국 기도터 탐색 플랫폼",
  description: "전국의 사찰, 굿당, 서낭당, 산신당 등 기도터를 탐색하고 후기를 공유하세요. 당골래 AI가 기도 방법과 사주풀이를 도와드립니다.",
  keywords: ["기도터", "사찰", "굿당", "산신당", "서낭당", "줄", "용궁줄", "산신줄", "장군줄", "도사줄"],
  openGraph: {
    title: "당골래 - 전국 기도터 탐색 플랫폼",
    description: "전국의 기도터를 탐색하고 후기를 공유하세요",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

