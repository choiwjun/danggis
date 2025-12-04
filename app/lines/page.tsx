"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LineInfo {
    id: string;
    code: string;
    nameKo: string;
    nameEn: string;
    color: string;
    icon: string;
    description: string;
    characteristics: string[];
    placeCount: number;
}

const LINES: LineInfo[] = [
    {
        id: "1",
        code: "yonggung",
        nameKo: "용궁줄",
        nameEn: "Yonggung",
        color: "#2080C0",
        icon: "🐉",
        description: "물과 바다를 관장하는 용왕님을 모시는 줄입니다. 재물운과 사업운을 관장합니다.",
        characteristics: ["재물운", "사업운", "바다/물", "풍어"],
        placeCount: 142,
    },
    {
        id: "2",
        code: "sansin",
        nameKo: "산신줄",
        nameEn: "Sansin",
        color: "#3C5F4A",
        icon: "⛰️",
        description: "산을 지키는 산신령님을 모시는 줄입니다. 건강과 장수를 기원합니다.",
        characteristics: ["건강운", "장수", "산악", "수호"],
        placeCount: 238,
    },
    {
        id: "3",
        code: "janggun",
        nameKo: "장군줄",
        nameEn: "Janggun",
        color: "#A6472C",
        icon: "⚔️",
        description: "영웅과 장군을 모시는 줄입니다. 승진운과 리더십을 관장합니다.",
        characteristics: ["승진운", "리더십", "무예", "용맹"],
        placeCount: 89,
    },
    {
        id: "4",
        code: "dosa",
        nameKo: "도사줄",
        nameEn: "Dosa",
        color: "#7C4AC2",
        icon: "🔮",
        description: "도를 닦은 도사님을 모시는 줄입니다. 학업과 지혜를 관장합니다.",
        characteristics: ["학업운", "지혜", "수행", "도력"],
        placeCount: 67,
    },
];

export default function LinesPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredLines = LINES.filter(
        (line) =>
            line.nameKo.includes(searchQuery) ||
            line.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            line.description.includes(searchQuery) ||
            line.characteristics.some((c) => c.includes(searchQuery))
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary-soft/30 to-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary-dark py-20 text-white">
                <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-10"></div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                            줄별 기도터 찾기
                        </h1>
                        <p className="mx-auto mb-10 max-w-2xl text-lg text-primary-soft sm:text-xl">
                            전국의 기도터는 네 가지 주요 '줄'로 나뉩니다.<br />
                            당신의 소원에 맞는 줄을 찾아보세요.
                        </p>

                        {/* Search Bar */}
                        <div className="mx-auto max-w-xl">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="줄 이름, 특성으로 검색..."
                                    className="h-14 rounded-2xl bg-white pl-12 text-lg shadow-xl"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lines Grid */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        {filteredLines.length}개의 줄
                    </h2>
                    <p className="mt-2 text-gray-600">
                        각 줄의 특성과 기도터를 확인해보세요
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {filteredLines.map((line) => (
                        <Card
                            key={line.id}
                            className="group overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                            style={{ borderColor: line.color }}
                        >
                            <CardHeader
                                className="relative overflow-hidden py-8 text-white"
                                style={{
                                    background: `linear-gradient(135deg, ${line.color} 0%, ${line.color}dd 100%)`,
                                }}
                            >
                                <div className="absolute right-0 top-0 text-9xl opacity-10">
                                    {line.icon}
                                </div>
                                <div className="relative">
                                    <div className="mb-3 text-5xl">{line.icon}</div>
                                    <CardTitle className="mb-2 text-3xl font-bold">
                                        {line.nameKo}
                                    </CardTitle>
                                    <CardDescription className="text-white/90 text-base">
                                        {line.nameEn} Line
                                    </CardDescription>
                                </div>
                            </CardHeader>

                            <CardContent className="p-6">
                                <p className="mb-6 text-gray-700 leading-relaxed">
                                    {line.description}
                                </p>

                                <div className="mb-6">
                                    <h4 className="mb-3 text-sm font-semibold text-gray-500 uppercase">
                                        주요 특성
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {line.characteristics.map((char, idx) => (
                                            <Badge
                                                key={idx}
                                                variant="outline"
                                                className="border-2 text-sm font-medium"
                                                style={{
                                                    borderColor: line.color,
                                                    color: line.color,
                                                }}
                                            >
                                                {char}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6 flex items-center justify-between rounded-lg bg-gray-50 p-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-gray-500" />
                                        <span className="text-sm text-gray-600">등록된 기도터</span>
                                    </div>
                                    <span className="text-2xl font-bold" style={{ color: line.color }}>
                                        {line.placeCount}곳
                                    </span>
                                </div>

                                <Link href={`/places?line=${line.code}`}>
                                    <Button
                                        className="w-full rounded-xl py-6 text-base font-semibold shadow-md transition-all hover:shadow-xl active:scale-95"
                                        style={{
                                            backgroundColor: line.color,
                                        }}
                                    >
                                        {line.nameKo} 기도터 보기
                                        <MapPin className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredLines.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-xl text-gray-500">검색 결과가 없습니다.</p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => setSearchQuery("")}
                        >
                            전체 보기
                        </Button>
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-primary-soft to-primary-soft/50 py-16">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h3 className="mb-4 text-3xl font-bold text-primary-dark">
                        내게 맞는 기도터를 찾고 계신가요?
                    </h3>
                    <p className="mb-8 text-lg text-gray-700">
                        당골래 AI가 당신의 소원과 상황에 맞는 기도터를 추천해드립니다.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Link href="/map">
                            <Button
                                size="lg"
                                variant="default"
                                className="w-full rounded-xl px-8 py-6 text-base font-semibold sm:w-auto"
                            >
                                <MapPin className="mr-2 h-5 w-5" />
                                지도에서 찾기
                            </Button>
                        </Link>
                        <Link href="/ai">
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full rounded-xl border-2 border-primary px-8 py-6 text-base font-semibold sm:w-auto"
                            >
                                <Star className="mr-2 h-5 w-5" />
                                AI 추천 받기
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
