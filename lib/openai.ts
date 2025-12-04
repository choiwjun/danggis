/**
 * OpenAI 클라이언트 설정
 * 빌드 시점이 아닌 런타임에 초기화되도록 lazy loading 사용
 */

import OpenAI from "openai";

// OpenAI 클라이언트 싱글톤
const globalForOpenAI = globalThis as unknown as {
    openai: OpenAI | undefined;
};

/**
 * OpenAI 클라이언트 인스턴스 가져오기
 * 런타임에 초기화되므로 빌드 시 환경 변수가 없어도 에러 없음
 */
export function getOpenAIClient(): OpenAI {
    if (!globalForOpenAI.openai) {
        globalForOpenAI.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY || "",
        });
    }
    return globalForOpenAI.openai;
}

// 기본 export (하위 호환성)
export default getOpenAIClient();
