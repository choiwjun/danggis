"use client";

import { useState } from "react";
import { Search, MapPin, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PrayerPlaceCard from "@/components/places/PrayerPlaceCard";
import { PlaceListItem } from "@/types/place";

// Mock Data for Map List
const MOCK_MAP_PLACES: PlaceListItem[] = [
    {
        id: "1",
        name: "계룡산 굿당",
        slug: "gyeryong-gutdang",
        addressFull: "충청남도 공주시 계룡면",
        placeType: { id: "t1", nameKo: "굿당" },
        deityTags: [{ deityTag: { id: "d1", code: "sansin", nameKo: "산신줄" } }],
        thumbnail: "https://images.unsplash.com/photo-1518182170546-0766aa6f6914?w=800&q=80",
        reviewCount: 12,
        averageRating: 4.5,
        distance: 1.2,
    },
    {
        id: "2",
        name: "태백산 천제단",
        slug: "taebaek-cheunjedan",
        addressFull: "강원도 태백시",
        placeType: { id: "t2", nameKo: "기도터" },
        deityTags: [{ deityTag: { id: "d2", code: "janggun", nameKo: "장군줄" } }],
        thumbnail: "https://images.unsplash.com/photo-1505567745926-ba89000d255a?w=800&q=80",
        reviewCount: 8,
        averageRating: 4.8,
        distance: 5.4,
    },
];

export default function MapPage() {
    const [showList, setShowList] = useState(true);

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col">
            {/* 상단 필터 바 */}
            <div className="z-10 flex items-center gap-2 border-b border-gray-200 bg-white p-4 shadow-sm">
                <div className="relative w-full max-w-xs">
                    <Input
                        type="text"
                        placeholder="지역, 기도터 검색"
                        className="pl-9"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">전체</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">용궁줄</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">산신줄</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">장군줄</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">도사줄</Badge>
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <Button
                        variant={showList ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowList(!showList)}
                        className="hidden md:flex"
                    >
                        <List className="mr-2 h-4 w-4" />
                        목록 {showList ? "닫기" : "열기"}
                    </Button>
                </div>
            </div>

            <div className="relative flex flex-1 overflow-hidden">
                {/* 좌측 리스트 패널 */}
                <div
                    className={`absolute inset-y-0 left-0 z-20 w-full bg-white transition-transform duration-300 md:relative md:w-96 md:translate-x-0 ${showList ? "translate-x-0" : "-translate-x-full md:-ml-96"
                        } border-r border-gray-200 shadow-lg md:shadow-none`}
                >
                    <div className="h-full overflow-y-auto p-4">
                        <div className="mb-4 text-sm text-gray-500">
                            내 주변 2개의 기도터
                        </div>
                        <div className="space-y-4">
                            {MOCK_MAP_PLACES.map((place) => (
                                <div key={place.id} className="h-64">
                                    <PrayerPlaceCard place={place} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 모바일에서 리스트 닫기 버튼 */}
                    <button
                        className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md md:hidden"
                        onClick={() => setShowList(false)}
                    >
                        <MapPin className="h-5 w-5 text-gray-700" />
                    </button>
                </div>

                {/* 우측 지도 영역 */}
                <div className="flex-1 bg-gray-100">
                    <div className="flex h-full w-full items-center justify-center text-gray-500">
                        <div className="text-center">
                            <MapPin className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                            <p className="text-lg font-medium">지도 영역</p>
                            <p className="text-sm">Step 6에서 네이버 지도가 연동됩니다.</p>
                        </div>
                    </div>

                    {/* 모바일에서 리스트 열기 버튼 (리스트가 닫혀있을 때) */}
                    {!showList && (
                        <button
                            className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 transform items-center rounded-full bg-primary px-4 py-2 text-white shadow-lg md:hidden"
                            onClick={() => setShowList(true)}
                        >
                            <List className="mr-2 h-4 w-4" />
                            목록 보기
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
