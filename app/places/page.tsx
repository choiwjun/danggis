"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Filter, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PrayerPlaceCard from "@/components/places/PrayerPlaceCard";
import { PlaceListItem } from "@/types/place";

export default function PlacesPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [places, setPlaces] = useState<PlaceListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

    // 필터 상태
    const currentLine = searchParams.get("line");
    const currentType = searchParams.get("type");

    useEffect(() => {
        const fetchPlaces = async () => {
            setIsLoading(true);
            try {
                const query = new URLSearchParams(searchParams.toString());
                const response = await fetch(`/api/places?${query.toString()}`);
                const data = await response.json();
                setPlaces(data.places || []);
            } catch (error) {
                console.error("Failed to fetch places:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlaces();
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchQuery) {
            params.set("q", searchQuery);
        } else {
            params.delete("q");
        }
        router.push(`/places?${params.toString()}`);
    };

    const handleFilterChange = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/places?${params.toString()}`);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">기도터 목록</h1>
                <p className="mt-2 text-base text-gray-600">
                    전국의 사찰, 굿당, 산신당, 서낭당 등을 탐색하세요
                </p>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row">
                {/* 좌측 필터 패널 (데스크탑) */}
                <aside className="w-full lg:w-64 shrink-0 space-y-8">
                    {/* 검색 */}
                    <form onSubmit={handleSearch} className="relative">
                        <Input
                            type="text"
                            placeholder="검색어 입력..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </form>

                    {/* 줄 필터 */}
                    <div>
                        <h3 className="mb-3 font-semibold text-gray-900">줄(Deity)</h3>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: "전체", value: null },
                                { label: "용궁줄", value: "yonggung" },
                                { label: "산신줄", value: "sansin" },
                                { label: "장군줄", value: "janggun" },
                                { label: "도사줄", value: "dosa" },
                            ].map((item) => (
                                <Badge
                                    key={item.label}
                                    variant={currentLine === item.value ? "default" : "outline"}
                                    className="cursor-pointer px-3 py-1.5"
                                    onClick={() => handleFilterChange("line", item.value)}
                                >
                                    {item.label}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* 유형 필터 */}
                    <div>
                        <h3 className="mb-3 font-semibold text-gray-900">유형</h3>
                        <div className="space-y-2">
                            {[
                                { label: "전체", value: null },
                                { label: "사찰", value: "temple" },
                                { label: "굿당", value: "gutdang" },
                                { label: "산신당", value: "shrine" },
                                { label: "서낭당", value: "seonangdang" },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className={`flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${currentType === item.value
                                            ? "bg-primary/10 font-medium text-primary"
                                            : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                    onClick={() => handleFilterChange("type", item.value)}
                                >
                                    <span>{item.label}</span>
                                    {currentType === item.value && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* 우측 리스트 */}
                <div className="flex-1">
                    {/* 모바일 필터 버튼 (추후 구현) */}
                    <div className="mb-4 flex items-center justify-between lg:hidden">
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            필터
                        </Button>
                        <span className="text-sm text-gray-500">
                            {places.length}개의 기도터
                        </span>
                    </div>

                    {isLoading ? (
                        <div className="flex h-64 items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : places.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {places.map((place) => (
                                <PrayerPlaceCard key={place.id} place={place} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-center">
                            <p className="text-gray-500">검색 결과가 없습니다.</p>
                            <Button
                                variant="link"
                                onClick={() => router.push("/places")}
                                className="mt-2 text-primary"
                            >
                                필터 초기화
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
