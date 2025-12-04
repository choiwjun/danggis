import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const latStr = searchParams.get("lat");
        const lngStr = searchParams.get("lng");
        const radiusStr = searchParams.get("radius"); // km 단위
        const limitStr = searchParams.get("limit");

        if (!latStr || !lngStr) {
            return NextResponse.json(
                { error: "위도(lat)와 경도(lng)는 필수입니다." },
                { status: 400 }
            );
        }

        const lat = parseFloat(latStr);
        const lng = parseFloat(lngStr);
        const radius = parseFloat(radiusStr || "10"); // 기본 10km
        const limit = parseInt(limitStr || "20");

        if (isNaN(lat) || isNaN(lng)) {
            return NextResponse.json(
                { error: "유효하지 않은 좌표입니다." },
                { status: 400 }
            );
        }

        // Haversine 공식을 이용한 거리 계산 및 정렬 (Raw Query)
        // PostgreSQL의 earthdistance 확장을 사용하지 않고 순수 수학 공식 사용
        // 6371: 지구 반지름 (km)
        const places = await prisma.$queryRaw`
      SELECT 
        p.id, 
        p.name, 
        p.slug, 
        p.address_full as "addressFull", 
        p.latitude, 
        p.longitude,
        (
          6371 * acos(
            cos(radians(${lat})) * cos(radians(p.latitude)) * 
            cos(radians(p.longitude) - radians(${lng})) + 
            sin(radians(${lat})) * sin(radians(p.latitude))
          )
        ) AS distance
      FROM prayer_places p
      WHERE 
        p.is_active = true
        AND p.latitude IS NOT NULL 
        AND p.longitude IS NOT NULL
        AND (
          6371 * acos(
            cos(radians(${lat})) * cos(radians(p.latitude)) * 
            cos(radians(p.longitude) - radians(${lng})) + 
            sin(radians(${lat})) * sin(radians(p.latitude))
          )
        ) <= ${radius}
      ORDER BY distance ASC
      LIMIT ${limit}
    `;

        // Raw Query 결과에는 관계 데이터가 포함되지 않으므로, 
        // 필요한 경우 추가 조회를 하거나 클라이언트에서 처리해야 함.
        // 여기서는 ID 목록으로 추가 정보를 조회하여 병합하는 방식을 사용.

        const placeIds = (places as any[]).map((p) => p.id);

        if (placeIds.length === 0) {
            return NextResponse.json({ places: [] });
        }

        // 추가 정보 조회 (이미지, 태그 등)
        const placeDetails = await prisma.prayerPlace.findMany({
            where: { id: { in: placeIds } },
            select: {
                id: true,
                placeType: { select: { id: true, nameKo: true } },
                deityTags: {
                    select: {
                        deityTag: { select: { id: true, code: true, nameKo: true } },
                    },
                },
                images: {
                    where: { isMain: true },
                    take: 1,
                    select: { url: true },
                },
                _count: { select: { reviews: true } },
            },
        });

        // 거리 정보와 상세 정보 병합
        const result = (places as any[]).map((place) => {
            const detail = placeDetails.find((d) => d.id === place.id);
            return {
                id: place.id,
                name: place.name,
                slug: place.slug,
                addressFull: place.addressFull,
                latitude: place.latitude,
                longitude: place.longitude,
                distance: Math.round(place.distance * 10) / 10, // 소수점 첫째자리까지
                placeType: detail?.placeType || null,
                deityTags: detail?.deityTags || [],
                thumbnail: detail?.images[0]?.url || null,
                reviewCount: detail?._count.reviews || 0,
            };
        });

        return NextResponse.json({ places: result });

    } catch (error) {
        console.error("주변 기도터 조회 실패:", error);
        return NextResponse.json(
            { error: "주변 기도터를 불러오는 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}
