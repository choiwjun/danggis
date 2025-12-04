import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        // 파라미터 파싱
        const q = searchParams.get("q"); // 검색어
        const line = searchParams.get("line"); // 줄 (yonggung, sansin, etc.)
        const region = searchParams.get("region"); // 지역 ID
        const type = searchParams.get("type"); // 기도터 유형 코드 (temple, etc.)
        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));

        // 필터 조건 구성
        const where: Prisma.PrayerPlaceWhereInput = {
            isActive: true, // 활성화된 기도터만 조회
        };

        // 1. 검색어 필터 (이름 또는 주소)
        if (q) {
            where.OR = [
                { name: { contains: q, mode: "insensitive" } },
                { addressFull: { contains: q, mode: "insensitive" } },
            ];
        }

        // 2. 줄(DeityTag) 필터
        if (line) {
            where.deityTags = {
                some: {
                    deityTag: {
                        code: line,
                    },
                },
            };
        }

        // 3. 지역 필터
        if (region) {
            where.regionId = region;
        }

        // 4. 유형 필터
        if (type) {
            where.placeType = {
                code: type,
            };
        }

        // 데이터 조회 (병렬 실행)
        const [total, places] = await Promise.all([
            prisma.prayerPlace.count({ where }),
            prisma.prayerPlace.findMany({
                where,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    addressFull: true,
                    latitude: true,
                    longitude: true,
                    placeType: {
                        select: { id: true, nameKo: true },
                    },
                    deityTags: {
                        select: {
                            deityTag: {
                                select: { id: true, code: true, nameKo: true },
                            },
                        },
                    },
                    images: {
                        where: { isMain: true },
                        take: 1,
                        select: { url: true },
                    },
                    _count: {
                        select: { reviews: true },
                    },
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
        ]);

        // 응답 데이터 가공
        const formattedPlaces = places.map((place) => ({
            id: place.id,
            name: place.name,
            slug: place.slug,
            addressFull: place.addressFull,
            latitude: place.latitude,
            longitude: place.longitude,
            placeType: place.placeType,
            deityTags: place.deityTags,
            thumbnail: place.images[0]?.url || null,
            reviewCount: place._count.reviews,
            averageRating: null, // 추후 리뷰 평점 계산 로직 추가
        }));

        return NextResponse.json({
            places: formattedPlaces,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("기도터 목록 조회 실패:", error);
        return NextResponse.json(
            { error: "기도터 목록을 불러오는 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}
