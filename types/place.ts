import { PrayerPlace, PlaceType, PlaceImage, RegionArea, PlaceDeityTag, DeityTag } from "@prisma/client";

// 목록 조회용 간략한 정보
export interface PlaceListItem {
    id: string;
    name: string;
    slug: string;
    addressFull: string;
    placeType: {
        id: string;
        nameKo: string;
    } | null;
    deityTags: {
        deityTag: {
            id: string;
            code: string;
            nameKo: string;
        };
    }[];
    thumbnail: string | null; // 첫 번째 이미지 URL
    reviewCount: number;
    averageRating: number | null; // 추후 구현 시 사용
    distance?: number; // nearby 검색 시 거리(km)
}

// 상세 조회용 전체 정보
export interface PlaceDetail extends PlaceListItem {
    description: string | null;
    latitude: number | null;
    longitude: number | null;
    phone: string | null;
    website: string | null;
    businessHours: string | null;
    naverPlaceId: string | null;
    images: {
        id: string;
        url: string;
        isMain: boolean;
    }[];
    region: {
        id: string;
        name: string;
    } | null;
    _count: {
        reviews: number;
        favorites: number;
    };
}

export interface PlacesResponse {
    places: PlaceListItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
