"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { label: "홈", href: "/" },
        { label: "기도터 목록", href: "/places" },
        { label: "지도에서 찾기", href: "/map" },
        { label: "줄별 기도터", href: "/lines" },
        { label: "후기", href: "/reviews" },
        { label: "당골래 AI", href: "/ai" },
        { label: "마이페이지", href: "/my" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* 로고 */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary">당골래</span>
                    </Link>

                    {/* 데스크탑 네비게이션 */}
                    <nav className="hidden md:flex md:items-center md:space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* 모바일 메뉴 버튼 */}
                    <button
                        type="button"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="메뉴 열기"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6 text-gray-700" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-700" />
                        )}
                    </button>
                </div>
            </div>

            {/* 모바일 네비게이션 */}
            {mobileMenuOpen && (
                <div className="md:hidden">
                    <div className="space-y-1 border-t border-gray-200 bg-white px-4 pb-3 pt-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-soft hover:text-primary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
