"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Star, ThumbsUp, MessageCircle, MapPin, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Review {
    id: string;
    placeName: string;
    placeSlug: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    title: string;
    content: string;
    createdAt: string;
    likes: number;
    comments: number;
    images?: string[];
    lineTag?: {
        code: string;
        nameKo: string;
    };
}

// Mock 데이터 (나중에 API로 대체)
const MOCK_REVIEWS: Review[] = [
    {
        id: "1",
        placeName: "계룡산 굿당",
        placeSlug: "gyeryong-gutdang",
        userName: "김영희",
        rating: 5,
        title: "정말 영험한 곳입니다",
        content: "가족의 건강을 기원하러 갔는데 정말 마음이 편안해지는 곳이었어요. 무당님도 친절하시고 조언도 잘 해주셨습니다. 다음에도 꼭 다시 방문하고 싶습니다.",
        createdAt: "2024-11-28",
        likes: 24,
        comments: 5,
        images: ["https://images.unsplash.com/photo-1518182170546-0766aa6f6914?w=800&q=80"],
        lineTag: { code: "sansin", nameKo: "산신줄" },
    },
    {
        id: "2",
        placeName: "태백산 천제단",
        placeSlug: "taebaek-cheunjedan",
        userName: "박철수",
        rating: 4,
        title: "경치가 너무 좋아요",
        content: "산 정상에 있어서 올라가기는 힘들지만, 경치가 정말 아름답습니다. 날씨 좋은 날 가시는 걸 추천드려요!",
        createdAt: "2024-11-25",
        likes: 18,
        comments: 3,
        lineTag: { code: "janggun", nameKo: "장군줄" },
    },
    {
        id: "3",
        placeName: "지리산 용궁",
        placeSlug: "jirisan-yonggung",
        userName: "이민수",
        rating: 5,
        title: "사업운이 정말 좋아졌어요",
        content: "작년에 처음 방문했는데 그 이후로 사업이 승승장구하고 있습니다. 용궁줄은 정말 재물운에 좋은 것 같아요. 감사드립니다!",
        createdAt: "2024-11-20",
        likes: 42,
        comments: 12,
        images: [
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
            "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
        ],
        lineTag: { code: "yonggung", nameKo: "용궁줄" },
    },
    {
        id: "4",
        placeName: "설악산 도사굿당",
        placeSlug: "seorak-dosa",
        userName: "최지은",
        rating: 5,
        title: "아이 합격기원 후 진짜 합격했어요!",
        content: "수능 전에 아이와 함께 방문해서 학업 기원을 드렸는데, 정말 원하는 대학에 합격했습니다. 도사줄은 학업에 정말 좋은 것 같아요. 너무 감사합니다!",
        createdAt: "2024-11-15",
        likes: 67,
        comments: 23,
        lineTag: { code: "dosa", nameKo: "도사줄" },
    },
    {
        id: "5",
        placeName: "한라산 영실굿당",
        placeSlug: "halla-yeongshil",
        userName: "정민호",
        rating: 4,
        title: "제주도 여행 중 방문했어요",
        content: "제주도 여행 중에 우연히 들렀는데 정말 신비로운 분위기였습니다. 관광지와는 또 다른 느낌이에요.",
        createdAt: "2024-11-10",
        likes: 15,
        comments: 7,
        lineTag: { code: "sansin", nameKo: "산신줄" },
    },
];

export default function ReviewsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLine, setSelectedLine] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");

    // 필터링 및 정렬
    let filteredReviews = MOCK_REVIEWS.filter(
        (review) =>
            review.placeName.includes(searchQuery) ||
            review.title.includes(searchQuery) ||
            review.content.includes(searchQuery) ||
            review.userName.includes(searchQuery)
    );

    if (selectedLine) {
        filteredReviews = filteredReviews.filter(
            (review) => review.lineTag?.code === selectedLine
        );
    }

    if (sortBy === "popular") {
        filteredReviews = [...filteredReviews].sort((a, b) => b.likes - a.likes);
    }

    // 별점 렌더링
    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-4 w-4 ${
                            star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                        }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary-dark to-primary-dark py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                            기도터 후기
                        </h1>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-soft">
                            전국 기도터를 다녀온 분들의 생생한 후기를 확인해보세요
                        </p>

                        {/* Search Bar */}
                        <div className="mx-auto max-w-2xl">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="후기 검색 (기도터명, 내용, 작성자...)"
                                    className="h-12 rounded-xl bg-white pl-12 shadow-lg"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute left-4 top-3 h-6 w-6 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="border-b bg-white py-4 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap gap-2">
                            <Badge
                                variant={selectedLine === null ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => setSelectedLine(null)}
                            >
                                전체
                            </Badge>
                            <Badge
                                variant={selectedLine === "yonggung" ? "yonggung" : "outline"}
                                className="cursor-pointer"
                                onClick={() => setSelectedLine("yonggung")}
                            >
                                용궁줄
                            </Badge>
                            <Badge
                                variant={selectedLine === "sansin" ? "sansin" : "outline"}
                                className="cursor-pointer"
                                onClick={() => setSelectedLine("sansin")}
                            >
                                산신줄
                            </Badge>
                            <Badge
                                variant={selectedLine === "janggun" ? "janggun" : "outline"}
                                className="cursor-pointer"
                                onClick={() => setSelectedLine("janggun")}
                            >
                                장군줄
                            </Badge>
                            <Badge
                                variant={selectedLine === "dosa" ? "dosa" : "outline"}
                                className="cursor-pointer"
                                onClick={() => setSelectedLine("dosa")}
                            >
                                도사줄
                            </Badge>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant={sortBy === "latest" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSortBy("latest")}
                            >
                                최신순
                            </Button>
                            <Button
                                variant={sortBy === "popular" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSortBy("popular")}
                            >
                                인기순
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews List */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <p className="text-sm text-gray-600">
                        총 <strong className="text-primary">{filteredReviews.length}</strong>개의 후기
                    </p>
                </div>

                <div className="space-y-6">
                    {filteredReviews.map((review) => (
                        <Card
                            key={review.id}
                            className="overflow-hidden transition-all hover:shadow-lg"
                        >
                            <CardHeader className="border-b bg-gray-50 p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-900">
                                                    {review.userName}
                                                </span>
                                                {renderStars(review.rating)}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Calendar className="h-3 w-3" />
                                                {review.createdAt}
                                            </div>
                                        </div>
                                    </div>

                                    {review.lineTag && (
                                        <Badge variant={review.lineTag.code as any}>
                                            {review.lineTag.nameKo}
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="p-6">
                                <Link
                                    href={`/places/${review.placeSlug}`}
                                    className="mb-2 flex items-center gap-2 text-primary hover:underline"
                                >
                                    <MapPin className="h-4 w-4" />
                                    <span className="font-semibold">{review.placeName}</span>
                                </Link>

                                <h3 className="mb-3 text-xl font-bold text-gray-900">
                                    {review.title}
                                </h3>

                                <p className="mb-4 leading-relaxed text-gray-700">
                                    {review.content}
                                </p>

                                {review.images && review.images.length > 0 && (
                                    <div className="mb-4 flex gap-2 overflow-x-auto">
                                        {review.images.map((img, idx) => (
                                            <img
                                                key={idx}
                                                src={img}
                                                alt={`후기 이미지 ${idx + 1}`}
                                                className="h-32 w-32 rounded-lg object-cover"
                                            />
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <button className="flex items-center gap-1 hover:text-primary">
                                        <ThumbsUp className="h-4 w-4" />
                                        <span>도움됨 {review.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-1 hover:text-primary">
                                        <MessageCircle className="h-4 w-4" />
                                        <span>댓글 {review.comments}</span>
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredReviews.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="mb-4 text-xl text-gray-500">검색 결과가 없습니다.</p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedLine(null);
                            }}
                        >
                            전체 후기 보기
                        </Button>
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className="bg-primary-soft py-12">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h3 className="mb-4 text-2xl font-bold text-primary-dark">
                        후기 작성은 로그인 후 가능합니다
                    </h3>
                    <p className="mb-6 text-gray-700">
                        당신의 소중한 경험을 다른 분들과 공유해주세요
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/auth/signin">
                            <Button size="lg" className="rounded-xl px-8">
                                로그인
                            </Button>
                        </Link>
                        <Link href="/auth/signup">
                            <Button size="lg" variant="outline" className="rounded-xl px-8">
                                회원가입
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
