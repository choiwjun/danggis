/**
 * AI 도우미 관련 타입 정의
 */

import { SajuResult } from "./saju";

// AI 대화 모드
export type AiChatMode = "general" | "saju";

// 메시지 역할
export type MessageRole = "system" | "user" | "assistant";

// 채팅 메시지
export interface ChatMessage {
    role: MessageRole;
    content: string;
}

// AI 채팅 요청
export interface AiChatRequest {
    sessionId?: string;           // 세션 ID (optional)
    mode: AiChatMode;             // 대화 모드
    placeId?: string;             // 기도터 ID (general 모드)
    sajuResult?: SajuResult;      // 사주 결과 (saju 모드)
    messages: ChatMessage[];      // 대화 메시지 배열
}

// AI 채팅 응답
export interface AiChatResponse {
    sessionId: string;
    assistantMessage: {
        content: string;
        createdAt: string;
    };
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}

// OpenAI API 에러
export interface OpenAIError {
    message: string;
    type: string;
    code?: string;
}
