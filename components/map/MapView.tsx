"use client";

import { useEffect, useRef, useState } from "react";
import { useNaverMapScript } from "@/lib/useNaverMapScript";
import { PlaceListItem } from "@/types/place";
import { Loader2, AlertCircle } from "lucide-react";

interface MapViewProps {
    places: PlaceListItem[];
    selectedPlaceId?: string | null;
    onMarkerClick?: (placeId: string) => void;
    center?: { lat: number; lng: number };
    zoom?: number;
}

export default function MapView({
    places,
    selectedPlaceId,
    onMarkerClick,
    center,
    zoom = 12,
}: MapViewProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markersRef = useRef<any[]>([]);
    const { isLoaded, isError, naver } = useNaverMapScript();

    // 지도 초기화
    useEffect(() => {
        if (!isLoaded || !naver || !mapRef.current) return;

        // 중심 좌표 결정
        const mapCenter =
            center ||
            (places.length > 0 && places[0].latitude && places[0].longitude
                ? new naver.maps.LatLng(places[0].latitude, places[0].longitude)
                : new naver.maps.LatLng(37.5665, 126.978)); // 서울 시청

        // 지도 생성
        const map = new naver.maps.Map(mapRef.current, {
            center: mapCenter,
            zoom: zoom,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
            mapTypeControl: true,
        });

        mapInstanceRef.current = map;

        // 마커 생성
        createMarkers(map);

        return () => {
            // cleanup
            if (mapInstanceRef.current) {
                mapInstanceRef.current.destroy();
                mapInstanceRef.current = null;
            }
        };
    }, [isLoaded, naver]);

    // 마커 생성 함수
    const createMarkers = (map: any) => {
        // 기존 마커 제거
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        places.forEach((place) => {
            if (!place.latitude || !place.longitude) return;

            const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(place.latitude, place.longitude),
                map: map,
                title: place.name,
                icon: {
                    content: `
                        <div style="
                            background-color: ${selectedPlaceId === place.id ? "#3C5F4A" : "#2080C0"};
                            width: 32px;
                            height: 32px;
                            border-radius: 50% 50% 50% 0;
                            transform: rotate(-45deg);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border: 3px solid white;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                        ">
                            <div style="
                                transform: rotate(45deg);
                                color: white;
                                font-size: 16px;
                                font-weight: bold;
                            ">📿</div>
                        </div>
                    `,
                    size: new naver.maps.Size(32, 32),
                    anchor: new naver.maps.Point(16, 32),
                },
            });

            // 마커 클릭 이벤트
            naver.maps.Event.addListener(marker, "click", () => {
                if (onMarkerClick) {
                    onMarkerClick(place.id);
                }
            });

            markersRef.current.push(marker);
        });
    };

    // places 변경 시 마커 업데이트
    useEffect(() => {
        if (!mapInstanceRef.current || !naver) return;
        createMarkers(mapInstanceRef.current);
    }, [places, selectedPlaceId]);

    // 선택된 장소로 지도 이동
    useEffect(() => {
        if (!mapInstanceRef.current || !selectedPlaceId || !naver) return;

        const selectedPlace = places.find((p) => p.id === selectedPlaceId);
        if (selectedPlace && selectedPlace.latitude && selectedPlace.longitude) {
            const newCenter = new naver.maps.LatLng(
                selectedPlace.latitude,
                selectedPlace.longitude
            );
            mapInstanceRef.current.setCenter(newCenter);
            mapInstanceRef.current.setZoom(15);
        }
    }, [selectedPlaceId, places, naver]);

    // 로딩 상태
    if (!isLoaded) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <div className="text-center">
                    <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-gray-600">지도 로딩 중...</p>
                </div>
            </div>
        );
    }

    // 에러 상태
    if (isError) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-gray-50">
                <div className="text-center">
                    <AlertCircle className="mx-auto mb-2 h-8 w-8 text-red-500" />
                    <p className="text-sm text-gray-600">지도를 불러올 수 없습니다.</p>
                    <p className="mt-1 text-xs text-gray-500">
                        네이버 지도 API 키를 확인해주세요.
                    </p>
                </div>
            </div>
        );
    }

    return <div ref={mapRef} className="h-full w-full" />;
}
