"use client";

import { useEffect, useState } from "react";

declare global {
    interface Window {
        naver: any;
    }
}

export function useNaverMapScript() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        // 이미 로드된 경우
        if (window.naver && window.naver.maps) {
            setIsLoaded(true);
            return;
        }

        // 이미 스크립트가 추가되어 있는지 확인
        const existingScript = document.querySelector(
            'script[src*="openapi.map.naver.com"]'
        );

        if (existingScript) {
            existingScript.addEventListener("load", () => setIsLoaded(true));
            existingScript.addEventListener("error", () => setIsError(true));
            return;
        }

        // 클라이언트 ID 확인
        const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

        if (!clientId) {
            console.error("NEXT_PUBLIC_NAVER_MAP_CLIENT_ID가 설정되지 않았습니다.");
            setIsError(true);
            return;
        }

        // 스크립트 동적 로드
        const script = document.createElement("script");
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
        script.async = true;

        script.onload = () => {
            setIsLoaded(true);
        };

        script.onerror = () => {
            console.error("네이버 지도 스크립트 로드 실패");
            setIsError(true);
        };

        document.head.appendChild(script);

        return () => {
            // cleanup은 하지 않음 (전역 스크립트)
        };
    }, []);

    return { isLoaded, isError, naver: typeof window !== "undefined" ? window.naver : null };
}
