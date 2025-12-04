"use client";

import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MockPlaceDetailMapProps {
    latitude: number;
    longitude: number;
    placeName: string;
    address?: string;
}

export default function MockPlaceDetailMap({
    latitude,
    longitude,
    placeName,
    address,
}: MockPlaceDetailMapProps) {
    return (
        <div className="space-y-3">
            {/* Mock 지도 */}
            <div className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-green-50 via-blue-50 to-green-50 shadow-sm">
                {/* 배경 그리드 */}
                <svg className="absolute inset-0 h-full w-full opacity-20">
                    <defs>
                        <pattern
                            id="detailGrid"
                            width="30"
                            height="30"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 30 0 L 0 0 0 30"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                className="text-gray-400"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#detailGrid)" />
                </svg>

                {/* 도로 표시 (장식용) */}
                <div className="absolute inset-0">
                    <div className="absolute left-1/4 top-0 h-full w-12 rotate-12 bg-gray-300/30"></div>
                    <div className="absolute left-1/2 top-0 h-full w-16 bg-gray-300/40"></div>
                    <div className="absolute right-1/4 top-0 h-full w-10 -rotate-12 bg-gray-300/30"></div>
                </div>

                {/* 중심 마커 */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                    <div className="relative animate-bounce">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-xl ring-4 ring-primary/30">
                            <span className="text-2xl">🙏</span>
                        </div>
                        <div
                            className="absolute left-1/2 top-full -ml-2 h-4 w-4 bg-primary"
                            style={{
                                clipPath: "polygon(50% 100%, 0 0, 100% 0)",
                            }}
                        />
                    </div>
                </div>

                {/* 정보 카드 */}
                <div className="absolute left-1/2 top-1/4 w-64 -translate-x-1/2 rounded-xl bg-white p-4 shadow-xl">
                    <div className="mb-2 flex items-start gap-2">
                        <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{placeName}</h4>
                            {address && (
                                <p className="mt-1 text-xs text-gray-600">{address}</p>
                            )}
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 rounded-lg bg-gray-50 p-2 text-xs text-gray-600">
                        <Navigation className="h-4 w-4" />
                        <span>
                            위도: {latitude.toFixed(4)}, 경도: {longitude.toFixed(4)}
                        </span>
                    </div>
                </div>

                {/* Mock 표시 */}
                <div className="absolute bottom-2 left-2 rounded-lg bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 shadow-md">
                    🗺️ Mock 지도
                </div>

                {/* 줌 컨트롤 (장식용) */}
                <div className="absolute right-3 top-3 flex flex-col gap-1 rounded-lg bg-white p-1 shadow-md">
                    <button className="rounded p-1.5 hover:bg-gray-100">
                        <span className="text-sm font-bold text-gray-700">+</span>
                    </button>
                    <div className="h-px bg-gray-200"></div>
                    <button className="rounded p-1.5 hover:bg-gray-100">
                        <span className="text-sm font-bold text-gray-700">−</span>
                    </button>
                </div>
            </div>

            {/* 외부 지도 앱 열기 버튼 */}
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                        const url = `https://map.naver.com/v5/search/${encodeURIComponent(
                            placeName
                        )}?c=${longitude},${latitude},15,0,0,0,dh`;
                        window.open(url, "_blank");
                    }}
                >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    네이버 지도에서 보기
                </Button>
                <Button
                    variant="outline"
                    className="hidden flex-1 sm:flex"
                    onClick={() => {
                        // 카카오맵으로 연결
                        const url = `https://map.kakao.com/link/map/${encodeURIComponent(
                            placeName
                        )},${latitude},${longitude}`;
                        window.open(url, "_blank");
                    }}
                >
                    <MapPin className="mr-2 h-4 w-4" />
                    카카오맵에서 보기
                </Button>
            </div>
        </div>
    );
}
