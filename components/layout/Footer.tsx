import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* 브랜드 섹션 */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-bold text-primary">당골래</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            전국 기도터 탐색 플랫폼
                        </p>
                    </div>

                    {/* 서비스 */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900">서비스</h4>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link
                                    href="/places"
                                    className="text-sm text-gray-600 hover:text-primary"
                                >
                                    기도터 목록
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/map"
                                    className="text-sm text-gray-600 hover:text-primary"
                                >
                                    지도에서 찾기
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/ai"
                                    className="text-sm text-gray-600 hover:text-primary"
                                >
                                    당골래 AI
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 줄별 기도터 */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900">줄별 기도터</h4>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link
                                    href="/lines/yonggung"
                                    className="text-sm text-gray-600 hover:text-primary"
                                >
                                    용궁줄
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/lines/sansin"
                                    className="text-sm text-gray-600 hover:text-primary"
                                >
                                    산신줄
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/lines/janggun"
                                    className="text-sm text-gray-600 hover:text-primary"
                                >
                                    장군줄
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/lines/dosa"
                                    className="text-sm text-gray-600 hover:text-primary"
                                >
                                    도사줄
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 고객 지원 */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900">고객 지원</h4>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-gray-600 hover:text-primary"
                                >
                                    서비스 소개
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-sm text-gray-600 hover:text-primary"
                                >
                                    이용약관
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-gray-600 hover:text-primary"
                                >
                                    개인정보처리방침
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 하단 */}
                <div className="mt-8 border-t border-gray-200 pt-8">
                    <p className="text-center text-xs text-gray-500">
                        © {currentYear} 당골래. All rights reserved.
                    </p>
                    <p className="mt-2 text-center text-xs text-gray-400">
                        당골래는 기도터 정보 제공 플랫폼입니다. 효험이나 결과를 보장하지
                        않으며, 건강·법률·재정 관련 결정은 반드시 전문가와 상의하세요.
                    </p>
                </div>
            </div>
        </footer>
    );
}
