import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "잘못된 요청입니다." },
                { status: 400 }
            );
        }

        // ID 또는 Slug로 조회
        const place = await prisma.prayerPlace.findFirst({
            where: {
                OR: [
                    { id: id },
                    { slug: id }
                ],
                isActive: true,
            },
            include: {
                placeType: {
                    select: { id: true, nameKo: true },
                },
                region: {
                    select: { id: true, name: true },
                },
                deityTags: {
                    include: {
                        deityTag: {
                            select: { id: true, code: true, nameKo: true },
                        },
                    },
                },
                images: {
                    orderBy: [
                        { isMain: "desc" }, // 메인 이미지 우선
                        { order: "asc" },
                    ],
                    select: { id: true, url: true, isMain: true },
                },
                _count: {
                    select: {
                        reviews: true,
                        favorites: true,
                    },
                },
            },
        });

        if (!place) {
            return NextResponse.json(
                { error: "존재하지 않는 기도터입니다." },
                { status: 404 }
            );
        }

        // 응답 데이터 가공
        const formattedPlace = {
            id: place.id,
            name: place.name,
            slug: place.slug,
            description: place.description,
            addressFull: place.addressFull,
            latitude: place.latitude,
            longitude: place.longitude,
            phone: place.phone,
            website: place.website,
            businessHours: place.businessHours,
            naverPlaceId: place.naverPlaceId,
            placeType: place.placeType,
            region: place.region,
            deityTags: place.deityTags,
            images: place.images,
            thumbnail: place.images.find(img => img.isMain)?.url || place.images[0]?.url || null,
            reviewCount: place._count.reviews,
            favoriteCount: place._count.favorites,
            averageRating: null, // 추후 구현
        };

        return NextResponse.json(formattedPlace);
    } catch (error) {
        console.error("기도터 상세 조회 실패:", error);
        return NextResponse.json(
            { error: "기도터 정보를 불러오는 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}
