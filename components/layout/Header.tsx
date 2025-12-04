"use client";

import Link from "next/link";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
    const { data: session, status } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { label: "홈", href: "/" },
        { label: "기도터 목록", href: "/places" },
        { label: "지도에서 찾기", href: "/map" },
        { label: "줄별 기도터", href: "/lines" },
        { label: "후기", href: "/reviews" },
        { label: "당골래 AI", href: "/ai" },
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

                    {/* 데스크탑 인증 메뉴 */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        {status === "loading" ? (
                            <div className="h-8 w-20 animate-pulse rounded bg-gray-200"></div>
                        ) : session ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/my"
                                    className="flex items-center text-sm font-medium text-gray-700 hover:text-primary"
                                >
                                    <User className="mr-1 h-4 w-4" />
                                    마이페이지
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="flex items-center text-sm font-medium text-gray-500 hover:text-red-600"
                                >
                                    <LogOut className="mr-1 h-4 w-4" />
                                    로그아웃
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/auth/signin"
                                    className="text-sm font-medium text-gray-700 hover:text-primary"
                                >
                                    로그인
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
                                >
                                    회원가입
                                </Link>
                            </div>
                        )}
                    </div>

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

                        <div className="mt-4 border-t border-gray-100 pt-4">
                            {session ? (
                                <>
                                    <Link
                                        href="/my"
                                        className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-soft hover:text-primary"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        마이페이지
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            signOut();
                                        }}
                                        className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-gray-500 hover:bg-red-50 hover:text-red-600"
                                    >
                                        로그아웃
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/signin"
                                        className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-soft hover:text-primary"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        로그인
                                    </Link>
                                    <Link
                                        href="/auth/signup"
                                        className="block rounded-lg px-3 py-2 text-base font-medium text-primary hover:bg-primary-soft"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        회원가입
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
