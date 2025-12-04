import { Map } from "lucide-react";

export default function MapPage() {
    return (
        <div className="h-[calc(100vh-4rem)]">
            <div className="flex h-full flex-col md:flex-row">
                {/* 좌측 리스트 */}
                <div className="w-full overflow-y-auto border-r border-gray-200 bg-white md:w-[360px]">
                    <div className="p-4">
                        <h1 className="mb-4 text-xl font-bold text-gray-900">
                            지도에서 기도터 찾기
                        </h1>
                        <p className="mb-4 text-sm text-gray-600">
                            지도를 움직이거나 검색하여 주변 기도터를 찾아보세요
                        </p>

                        {/* 검색바 placeholder */}
                        <div className="mb-4 rounded-xl border border-gray-200 p-3">
                            <input
                                type="text"
                                placeholder="지역, 기도터명 검색..."
                                className="w-full text-sm outline-none"
                            />
                        </div>

                        {/* 기도터 목록 placeholder */}
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="cursor-pointer rounded-xl border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                                >
                                    <h3 className="mb-1 text-sm font-semibold text-gray-900">
                                        기도터 {i}
                                    </h3>
                                    <p className="text-xs text-gray-600">주소 정보</p>
                                    <div className="mt-2">
                                        <span className="inline-flex items-center rounded-full bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary">
                                            산신줄
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 우측 지도 */}
                <div className="flex flex-1 items-center justify-center bg-gray-100">
                    <div className="text-center">
                        <Map className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                        <p className="text-lg font-medium text-gray-700">
                            네이버 지도 영역
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                            (Naver Maps JS API v3 연동 후 표시)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
