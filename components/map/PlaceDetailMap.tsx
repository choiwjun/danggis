"use client";

import { useEffect, useRef } from "react";
import { useNaverMapScript } from "@/lib/useNaverMapScript";
import { generateNaverMapUrl, generateNaverMapAppScheme } from "@/lib/naverMapUtils";
import { Loader2, AlertCircle, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaceDetailMapProps {
    latitude: number;
    longitude: number;
    placeName: string;
    address?: string;
}

export default function PlaceDetailMap({
    latitude,
    longitude,
    placeName,
    address,
}: PlaceDetailMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const { isLoaded, isError, naver } = useNaverMapScript();

    useEffect(() => {
        if (!isLoaded || !naver || !mapRef.current) return;

        const position = new naver.maps.LatLng(latitude, longitude);

        // 지도 생성
        const map = new naver.maps.Map(mapRef.current, {
            center: position,
            zoom: 16,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
            mapTypeControl: false,
            scaleControl: false,
            logoControl: false,
            mapDataControl: false,
        });

        // 마커 생성
        const marker = new naver.maps.Marker({
            position: position,
            map: map,
            title: placeName,
            icon: {
                content: `
                    <div style="
                        background-color: #3C5F4A;
                        width: 40px;
                        height: 40px;
                        border-radius: 50% 50% 50% 0;
                        transform: rotate(-45deg);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 4px solid white;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    ">
                        <div style="
                            transform: rotate(45deg);
                            color: white;
                            font-size: 20px;
                            font-weight: bold;
                        ">🙏</div>
                    </div>
                `,
                size: new naver.maps.Size(40, 40),
                anchor: new naver.maps.Point(20, 40),
            },
        });

        // 정보 윈도우 생성
        const infoWindow = new naver.maps.InfoWindow({
            content: `
                <div style="padding: 12px; min-width: 180px;">
                    <h4 style="font-weight: bold; margin-bottom: 4px; color: #1a1a1a;">${placeName}</h4>
                    ${address ? `<p style="font-size: 12px; color: #666; margin: 0;">${address}</p>` : ""}
                </div>
            `,
        });

        infoWindow.open(map, marker);

        return () => {
            if (map) {
                map.destroy();
            }
        };
    }, [isLoaded, naver, latitude, longitude, placeName, address]);

    const handleOpenNaverMap = () => {
        const url = generateNaverMapUrl(latitude, longitude, placeName);
        window.open(url, "_blank");
    };

    const handleOpenNaverMapApp = () => {
        const scheme = generateNaverMapAppScheme(latitude, longitude, placeName);
        window.location.href = scheme;

        // 앱이 없을 경우 웹으로 리다이렉트 (3초 후)
        setTimeout(() => {
            handleOpenNaverMap();
        }, 3000);
    };

    // 로딩 상태
    if (!isLoaded) {
        return (
            <div className="flex h-[300px] w-full items-center justify-center rounded-2xl bg-gray-100">
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
            <div className="flex h-[300px] w-full items-center justify-center rounded-2xl bg-gray-50">
                <div className="text-center">
                    <AlertCircle className="mx-auto mb-2 h-8 w-8 text-red-500" />
                    <p className="text-sm text-gray-600">지도를 불러올 수 없습니다.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div ref={mapRef} className="h-[300px] w-full rounded-2xl overflow-hidden shadow-sm border border-gray-200" />

            {/* 네이버 지도 앱에서 열기 버튼 */}
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleOpenNaverMap}
                >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    네이버 지도에서 보기
                </Button>
                <Button
                    variant="outline"
                    className="flex-1 hidden sm:flex"
                    onClick={handleOpenNaverMapApp}
                >
                    <MapPin className="mr-2 h-4 w-4" />
                    앱에서 열기
                </Button>
            </div>
        </div>
    );
}
