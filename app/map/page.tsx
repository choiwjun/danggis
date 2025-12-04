"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PrayerPlaceCard from "@/components/places/PrayerPlaceCard";
import MockMapView from "@/components/map/MockMapView";
import { PlaceListItem } from "@/types/place";

import { PLACE_IMAGES } from "@/lib/placeholderImage";

// Mock Data for Map List (나중에 API로 대체)
const MOCK_MAP_PLACES: PlaceListItem[] = [
    {
        id: "1",
        name: "계룡산 굿당",
        slug: "gyeryong-gutdang",
        addressFull: "충청남도 공주시 계룡면",
        latitude: 36.3484,
        longitude: 127.2175,
        placeType: { id: "t1", nameKo: "굿당" },
        deityTags: [{ deityTag: { id: "d1", code: "sansin", nameKo: "산신줄" } }],
        thumbnail: PLACE_IMAGES.sansin,
        reviewCount: 12,
        averageRating: 4.5,
        distance: 1.2,
    },
    {
        id: "2",
        name: "태백산 천제단",
        slug: "taebaek-cheunjedan",
        addressFull: "강원도 태백시",
        latitude: 37.1657,
        longitude: 128.9857,
        placeType: { id: "t2", nameKo: "기도터" },
        deityTags: [{ deityTag: { id: "d2", code: "janggun", nameKo: "장군줄" } }],
        thumbnail: PLACE_IMAGES.janggun,
        reviewCount: 8,
        averageRating: 4.8,
        distance: 5.4,
    },
    {
        id: "3",
        name: "지리산 용궁",
        slug: "jirisan-yonggung",
        addressFull: "전라남도 구례군",
        latitude: 35.3393,
        longitude: 127.7314,
        placeType: { id: "t3", nameKo: "용궁" },
        deityTags: [{ deityTag: { id: "d3", code: "yonggung", nameKo: "용궁줄" } }],
        thumbnail: PLACE_IMAGES.yonggung,
        reviewCount: 24,
        averageRating: 4.2,
        distance: 3.5,
    },
];

export default function MapPage() {
    const [showList, setShowList] = useState(true);
    const [places, setPlaces] = useState<PlaceListItem[]>(MOCK_MAP_PLACES);
    const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLine, setSelectedLine] = useState<string | null>(null);

    // 실제 구현 시 API 호출로 변경
    useEffect(() => {
        // 필터링 로직 (Mock)
        let filtered = MOCK_MAP_PLACES;

        if (searchQuery) {
            filtered = filtered.filter(
                (place) =>
                    place.name.includes(searchQuery) ||
                    place.addressFull.includes(searchQuery)
            );
        }

        if (selectedLine) {
            filtered = filtered.filter((place) =>
                place.deityTags.some((tag) => tag.deityTag.code === selectedLine)
            );
        }

        setPlaces(filtered);
    }, [searchQuery, selectedLine]);

    const handlePlaceCardClick = (placeId: string) => {
        setSelectedPlaceId(placeId);
    };

    const handleMarkerClick = (placeId: string) => {
        setSelectedPlaceId(placeId);
        // 모바일에서는 리스트를 열어줌
        if (window.innerWidth < 768) {
            setShowList(true);
        }
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col">
            {/* 상단 필터 바 */}
            <div className="z-10 flex items-center gap-2 border-b border-gray-200 bg-white p-4 shadow-sm">
                <div className="relative w-full max-w-xs">
                    <Input
                        type="text"
                        placeholder="지역, 기도터 검색"
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                    <Badge
                        variant={selectedLine === null ? "default" : "outline"}
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => setSelectedLine(null)}
                    >
                        전체
                    </Badge>
                    <Badge
                        variant={selectedLine === "yonggung" ? "default" : "outline"}
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => setSelectedLine("yonggung")}
                    >
                        용궁줄
                    </Badge>
                    <Badge
                        variant={selectedLine === "sansin" ? "default" : "outline"}
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => setSelectedLine("sansin")}
                    >
                        산신줄
                    </Badge>
                    <Badge
                        variant={selectedLine === "janggun" ? "default" : "outline"}
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => setSelectedLine("janggun")}
                    >
                        장군줄
                    </Badge>
                    <Badge
                        variant={selectedLine === "dosa" ? "default" : "outline"}
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => setSelectedLine("dosa")}
                    >
                        도사줄
                    </Badge>
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
                    className={`absolute inset-y-0 left-0 z-20 w-full bg-white transition-transform duration-300 md:relative md:w-96 md:translate-x-0 ${
                        showList ? "translate-x-0" : "-translate-x-full md:-ml-96"
                    } border-r border-gray-200 shadow-lg md:shadow-none`}
                >
                    <div className="h-full overflow-y-auto p-4">
                        <div className="mb-4 text-sm text-gray-500">
                            {places.length}개의 기도터
                        </div>
                        <div className="space-y-4">
                            {places.map((place) => (
                                <div
                                    key={place.id}
                                    className={`h-64 cursor-pointer transition-all ${
                                        selectedPlaceId === place.id
                                            ? "ring-2 ring-primary rounded-2xl"
                                            : ""
                                    }`}
                                    onClick={() => handlePlaceCardClick(place.id)}
                                >
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
                <div className="flex-1 bg-gray-100 relative">
                    <MockMapView
                        places={places}
                        selectedPlaceId={selectedPlaceId}
                        onMarkerClick={handleMarkerClick}
                        zoom={7}
                    />

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
