"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatBubble from "./ChatBubble";
import { useChatSession } from "@/lib/useChatSession";

interface PlaceChatDrawerProps {
    placeId: string;
    placeName: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function PlaceChatDrawer({
    placeId,
    placeName,
    isOpen,
    onClose,
}: PlaceChatDrawerProps) {
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { messages, isLoading, error, sendMessage } = useChatSession({
        mode: "general",
        placeId,
    });

    // 메시지 자동 스크롤
    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        await sendMessage(inputValue);
        setInputValue("");
    };

    if (!isOpen) return null;

    return (
        <>
            {/* 배경 오버레이 */}
            <div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* 드로어 패널 */}
            <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl sm:max-w-lg">
                {/* 헤더 */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <MessageCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">당골래 AI</h3>
                            <p className="text-xs text-gray-500">{placeName}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* 채팅 메시지 영역 */}
                <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
                    {messages.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                <MessageCircle className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                {placeName}에 대해 물어보세요
                            </h3>
                            <p className="text-sm text-gray-500">
                                이 기도터의 특징, 방문 방법, 예절 등<br />
                                궁금한 점을 자유롭게 질문해주세요.
                            </p>
                        </div>
                    ) : (
                        <>
                            {messages.map((msg, index) => (
                                <ChatBubble key={index} role={msg.role} content={msg.content} />
                            ))}
                            {isLoading && (
                                <div className="flex justify-start mb-4">
                                    <div className="flex max-w-[80%] gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200">
                                            <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="text-xs text-gray-500">당골래 AI</div>
                                            <div className="rounded-2xl rounded-tl-sm border border-gray-200 bg-white px-4 py-3">
                                                <p className="text-sm text-gray-600">답변을 작성 중입니다...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                {/* 에러 메시지 */}
                {error && (
                    <div className="border-t border-gray-200 bg-red-50 p-4">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* 입력 영역 */}
                <div className="border-t border-gray-200 bg-white p-4">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <Input
                            type="text"
                            placeholder="이 기도터에 대해 궁금한 점을 입력하세요..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={isLoading}
                            className="flex-1"
                        />
                        <Button type="submit" disabled={isLoading || !inputValue.trim()}>
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                        </Button>
                    </form>

                    {/* 면책 문구 */}
                    <p className="mt-3 text-xs text-gray-500">
                        ⚠️ AI 답변은 참고용이며, 효험이나 결과를 보장하지 않습니다.
                    </p>
                </div>
            </div>
        </>
    );
}
