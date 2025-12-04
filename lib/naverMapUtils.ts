/**
 * 네이버 지도 관련 유틸리티 함수
 */

/**
 * 네이버 지도 앱/웹에서 열기 URL 생성
 * @param lat 위도
 * @param lng 경도
 * @param name 장소명 (선택)
 */
export function generateNaverMapUrl(lat: number, lng: number, name?: string): string {
    const params = new URLSearchParams({
        lat: lat.toString(),
        lng: lng.toString(),
        title: name || "선택한 위치",
    });

    return `https://map.naver.com/v5/entry/place?${params.toString()}`;
}

/**
 * 네이버 지도 앱 딥링크 (모바일)
 * @param lat 위도
 * @param lng 경도
 * @param name 장소명 (선택)
 */
export function generateNaverMapAppScheme(lat: number, lng: number, name?: string): string {
    return `nmap://place?lat=${lat}&lng=${lng}&name=${encodeURIComponent(name || "선택한 위치")}`;
}

/**
 * 거리 계산 (Haversine formula)
 * @param lat1 위도1
 * @param lng1 경도1
 * @param lat2 위도2
 * @param lng2 경도2
 * @returns 거리 (km)
 */
export function calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
): number {
    const R = 6371; // 지구 반지름 (km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 10) / 10; // 소수점 1자리
}

/**
 * 여러 좌표의 중심점 계산
 * @param coordinates {lat, lng}[]
 * @returns {lat, lng}
 */
export function calculateCenter(coordinates: { lat: number; lng: number }[]): {
    lat: number;
    lng: number;
} {
    if (coordinates.length === 0) {
        return { lat: 37.5665, lng: 126.978 }; // 서울 중심
    }

    const sum = coordinates.reduce(
        (acc, coord) => ({
            lat: acc.lat + coord.lat,
            lng: acc.lng + coord.lng,
        }),
        { lat: 0, lng: 0 }
    );

    return {
        lat: sum.lat / coordinates.length,
        lng: sum.lng / coordinates.length,
    };
}
