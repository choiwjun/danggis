"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Clock, Globe, Share2, Heart, MessageSquare, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PlaceDetailMap from "@/components/map/PlaceDetailMap";
import PlaceChatDrawer from "@/components/ai/PlaceChatDrawer";
import { PlaceDetail } from "@/types/place";

export default function PlaceDetailPage() {
    const params = useParams();
    const [place, setPlace] = useState<PlaceDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        const fetchPlace = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/places/${params.id}`);
                if (!response.ok) {
                    throw new Error("기도터 정보를 불러올 수 없습니다.");
                }
                const data = await response.json();
                setPlace(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (params.id) {
            fetchPlace();
        }
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !place) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
                <p className="text-gray-500">{error || "기도터를 찾을 수 없습니다."}</p>
                <Link href="/places">
                    <Button variant="outline">목록으로 돌아가기</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* 상단 헤더 */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        {place.placeType && (
                            <Badge variant="outline" className="text-gray-500">
                                {place.placeType.nameKo}
                            </Badge>
                        )}
                        {place.deityTags.map(({ deityTag }) => (
                            <Badge key={deityTag.id} variant={deityTag.code as any}>
                                {deityTag.nameKo}
                            </Badge>
                        ))}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        {place.name}
                    </h1>
                    <div className="mt-2 flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{place.addressFull}</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* 좌측: 이미지 및 상세 정보 */}
                <div className="lg:col-span-2 space-y-8">
                    {/* 이미지 갤러리 */}
                    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-gray-100">
                        {place.thumbnail ? (
                            <img
                                src={place.thumbnail}
                                alt={place.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-gray-400">
                                이미지 없음
                            </div>
                        )}
                    </div>

                    {/* 기본 정보 */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-bold text-gray-900">상세 정보</h2>
                        <div className="space-y-4">
                            {place.description && (
                                <p className="whitespace-pre-line text-gray-600 leading-relaxed">
                                    {place.description}
                                </p>
                            )}

                            <div className="grid gap-4 sm:grid-cols-2">
                                {place.phone && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                        <span>{place.phone}</span>
                                    </div>
                                )}
                                {place.businessHours && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Clock className="h-5 w-5 text-gray-400" />
                                        <span>{place.businessHours}</span>
                                    </div>
                                )}
                                {place.website && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Globe className="h-5 w-5 text-gray-400" />
                                        <a href={place.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                                            웹사이트 방문
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 지도 */}
                    {place.latitude && place.longitude && (
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-bold text-gray-900">위치</h2>
                            <PlaceDetailMap
                                latitude={place.latitude}
                                longitude={place.longitude}
                                placeName={place.name}
                                address={place.addressFull}
                            />
                        </div>
                    )}

                    {/* 후기 (Placeholder) */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">
                                후기 ({place._count.reviews})
                            </h2>
                            <Button variant="outline">후기 작성</Button>
                        </div>

                        {place._count.reviews === 0 ? (
                            <div className="py-8 text-center text-gray-500">
                                아직 작성된 후기가 없습니다. 첫 번째 후기를 남겨주세요!
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* 후기 리스트 Placeholder */}
                                <div className="border-b border-gray-100 pb-4">
                                    <div className="mb-2 flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-gray-200" />
                                        <span className="font-medium">사용자1</span>
                                        <span className="text-xs text-gray-400">2023.10.01</span>
                                    </div>
                                    <p className="text-gray-600">기도터 기운이 정말 좋았습니다. 추천합니다.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 우측: AI 도우미 및 액션 */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        {/* AI 도우미 카드 */}
                        <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-6 border border-primary/20">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">당골래 AI</h3>
                                    <p className="text-xs text-gray-600">무엇이든 물어보세요</p>
                                </div>
                            </div>
                            <p className="mb-6 text-sm text-gray-600">
                                이 기도터의 영험함, 기도 방법, 준비물 등에 대해 궁금한 점이 있으신가요?
                            </p>
                            <Button 
                                className="w-full gap-2"
                                onClick={() => setIsChatOpen(true)}
                            >
                                <MessageSquare className="h-4 w-4" />
                                AI에게 물어보기
                            </Button>
                        </div>

                        {/* 관리자 정보 (임시) */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-2 font-semibold text-gray-900">관리자 문의</h3>
                            <p className="text-sm text-gray-600">
                                정보 수정이나 삭제를 원하시면 관리자에게 문의해주세요.
                            </p>
                            <Button variant="link" className="mt-2 h-auto p-0 text-gray-500">
                                문의하기
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI 채팅 드로어 */}
            <PlaceChatDrawer
                placeId={place.id}
                placeName={place.name}
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
            />
        </div>
    );
}
