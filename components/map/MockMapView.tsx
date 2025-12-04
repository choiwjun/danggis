"use client";

import { useState } from "react";
import { MapPin, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { PlaceListItem } from "@/types/place";
import { Button } from "@/components/ui/button";

interface MockMapViewProps {
    places: PlaceListItem[];
    selectedPlaceId?: string | null;
    onMarkerClick?: (placeId: string) => void;
    center?: { lat: number; lng: number };
    zoom?: number;
}

export default function MockMapView({
    places,
    selectedPlaceId,
    onMarkerClick,
}: MockMapViewProps) {
    const [zoom, setZoom] = useState(8);

    // 마커 위치를 계산 (간단한 좌표 변환)
    const getMarkerPosition = (lat: number, lng: number) => {
        // 한국 중심 좌표 (서울 기준)
        const centerLat = 37.5;
        const centerLng = 127.5;

        // 상대적 위치 계산 (픽셀 단위)
        const x = 50 + ((lng - centerLng) * 400) / zoom;
        const y = 50 + ((centerLat - lat) * 400) / zoom;

        return { x, y };
    };

    return (
        <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
            {/* 배경 패턴 (지도 느낌) */}
            <svg className="absolute inset-0 h-full w-full opacity-20">
                <defs>
                    <pattern
                        id="grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-gray-400"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* 한국 지형 모양 (단순화) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <svg
                    width="300"
                    height="400"
                    viewBox="0 0 300 400"
                    className="text-green-600"
                >
                    <path
                        d="M 150 50 Q 100 80, 80 150 Q 60 220, 100 280 Q 130 320, 180 330 Q 220 320, 240 280 Q 270 220, 250 150 Q 230 80, 180 60 Q 160 50, 150 50 Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                </svg>
            </div>

            {/* 장식용 산 모양 */}
            <div className="absolute bottom-0 left-0 right-0 h-40 opacity-20">
                <svg width="100%" height="100%" preserveAspectRatio="none">
                    <path
                        d="M 0 100 Q 50 20, 100 100 Q 150 20, 200 100 Q 250 20, 300 100 Q 350 20, 400 100 L 400 160 L 0 160 Z"
                        fill="url(#mountainGradient)"
                    />
                    <defs>
                        <linearGradient
                            id="mountainGradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#3C5F4A" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3C5F4A" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* 지도 마커들 */}
            <div className="absolute inset-0">
                {places.map((place) => {
                    if (!place.latitude || !place.longitude) return null;

                    const pos = getMarkerPosition(place.latitude, place.longitude);
                    const isSelected = selectedPlaceId === place.id;

                    return (
                        <button
                            key={place.id}
                            className="absolute group transition-transform hover:scale-110"
                            style={{
                                left: `${pos.x}%`,
                                top: `${pos.y}%`,
                                transform: "translate(-50%, -100%)",
                            }}
                            onClick={() => onMarkerClick?.(place.id)}
                        >
                            {/* 마커 핀 */}
                            <div
                                className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                                    isSelected
                                        ? "bg-primary shadow-xl ring-4 ring-primary/30 scale-125"
                                        : "bg-blue-500 shadow-lg hover:shadow-xl"
                                }`}
                            >
                                <MapPin
                                    className={`h-6 w-6 text-white ${
                                        isSelected ? "animate-bounce" : ""
                                    }`}
                                    fill="currentColor"
                                />
                            </div>

                            {/* 마커 꼬리 */}
                            <div
                                className={`absolute left-1/2 top-full -ml-1 h-3 w-2 ${
                                    isSelected ? "bg-primary" : "bg-blue-500"
                                }`}
                                style={{
                                    clipPath: "polygon(50% 100%, 0 0, 100% 0)",
                                }}
                            />

                            {/* 호버 시 장소명 표시 */}
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full mb-2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                                {place.name}
                                <div
                                    className="absolute left-1/2 top-full -ml-1 h-2 w-2 bg-gray-900"
                                    style={{
                                        clipPath: "polygon(50% 100%, 0 0, 100% 0)",
                                    }}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* 지도 컨트롤 */}
            <div className="absolute right-4 top-4 flex flex-col gap-2">
                <Button
                    size="icon"
                    variant="secondary"
                    className="h-10 w-10 rounded-lg bg-white shadow-md hover:shadow-lg"
                    onClick={() => setZoom(Math.min(zoom + 1, 15))}
                >
                    <ZoomIn className="h-5 w-5" />
                </Button>
                <Button
                    size="icon"
                    variant="secondary"
                    className="h-10 w-10 rounded-lg bg-white shadow-md hover:shadow-lg"
                    onClick={() => setZoom(Math.max(zoom - 1, 5))}
                >
                    <ZoomOut className="h-5 w-5" />
                </Button>
                <Button
                    size="icon"
                    variant="secondary"
                    className="h-10 w-10 rounded-lg bg-white shadow-md hover:shadow-lg"
                >
                    <Maximize2 className="h-5 w-5" />
                </Button>
            </div>

            {/* 줌 레벨 표시 */}
            <div className="absolute bottom-4 left-4 rounded-lg bg-white px-3 py-2 text-sm font-medium shadow-md">
                줌: {zoom}
            </div>

            {/* Mock 지도 표시 (개발용) */}
            <div className="absolute bottom-4 right-4 rounded-lg bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-800 shadow-md">
                🗺️ Mock 지도 (네이버 API 미사용)
            </div>
        </div>
    );
}
