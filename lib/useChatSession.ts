"use client";

import { useState } from "react";
import { ChatMessage, AiChatMode, AiChatRequest, AiChatResponse } from "@/types/ai";
import { SajuResult } from "@/types/saju";

interface UseChatSessionOptions {
    mode: AiChatMode;
    placeId?: string;
    sajuResult?: SajuResult;
}

export function useChatSession({ mode, placeId, sajuResult }: UseChatSessionOptions) {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        // 사용자 메시지 추가
        const userMessage: ChatMessage = {
            role: "user",
            content: content.trim(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            const request: AiChatRequest = {
                sessionId: sessionId || undefined,
                mode,
                placeId,
                sajuResult,
                messages: [...messages, userMessage],
            };

            const response = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "AI 응답을 받는 데 실패했습니다.");
            }

            const data: AiChatResponse = await response.json();

            // 세션 ID 저장
            if (!sessionId) {
                setSessionId(data.sessionId);
            }

            // AI 응답 메시지 추가
            const assistantMessage: ChatMessage = {
                role: "assistant",
                content: data.assistantMessage.content,
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (err: any) {
            setError(err.message);
            console.error("채팅 전송 실패:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        setSessionId(null);
        setMessages([]);
        setError(null);
    };

    return {
        sessionId,
        messages,
        isLoading,
        error,
        sendMessage,
        clearChat,
    };
}
