"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Sparkles, Send, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatBubble from "@/components/ai/ChatBubble";
import SajuInputForm from "@/components/ai/SajuInputForm";
import { useChatSession } from "@/lib/useChatSession";
import { AiChatMode } from "@/types/ai";
import { SajuCalculationResponse } from "@/types/saju";

export default function AIPage() {
    const [mode, setMode] = useState<AiChatMode>("general");
    const [sajuResult, setSajuResult] = useState<SajuCalculationResponse | null>(null);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { messages, isLoading, error, sendMessage, clearChat } = useChatSession({
        mode,
        sajuResult: sajuResult || undefined,
    });

    // 메시지 자동 스크롤
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleModeChange = (newMode: AiChatMode) => {
        if (mode !== newMode) {
            setMode(newMode);
            setSajuResult(null);
            clearChat();
        }
    };

    const handleSajuCalculated = (result: SajuCalculationResponse) => {
        setSajuResult(result);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        // 사주 모드일 때 사주 결과가 없으면 전송 불가
        if (mode === "saju" && !sajuResult) {
            return;
        }

        await sendMessage(inputValue);
        setInputValue("");
    };

    const handleReset = () => {
        setSajuResult(null);
        clearChat();
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            {/* 헤더 */}
            <div className="mb-8 text-center">
                <h1 className="mb-4 text-3xl font-bold text-gray-900">
                    당골래 AI 도우미
                </h1>
                <p className="text-base text-gray-600">
                    기도터 정보부터 사주 풀이까지, 당골래 AI와 대화해보세요
                </p>
            </div>

            {/* 모드 선택 */}
            <div className="mb-6 flex justify-center gap-4">
                <button
                    onClick={() => handleModeChange("general")}
                    className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                        mode === "general"
                            ? "bg-primary text-white shadow-sm"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    <MessageCircle className="h-4 w-4" />
                    일반 질문 모드
                </button>
                <button
                    onClick={() => handleModeChange("saju")}
                    className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                        mode === "saju"
                            ? "bg-line-dosa text-white shadow-sm"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    <Sparkles className="h-4 w-4" />
                    사주풀이 모드
                </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* 좌측: 사주 입력 폼 (사주 모드일 때만) */}
                {mode === "saju" && !sajuResult && (
                    <div className="lg:col-span-1">
                        <SajuInputForm onSajuCalculated={handleSajuCalculated} />
                    </div>
                )}

                {/* 우측: 채팅 영역 */}
                <div className={mode === "saju" && !sajuResult ? "lg:col-span-2" : "lg:col-span-3"}>
                    <div className="flex h-[600px] flex-col rounded-2xl border border-gray-200 bg-gray-50">
                        {/* 채팅 메시지 영역 */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {messages.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center text-center">
                                    <div
                                        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                                            mode === "general" ? "bg-primary/10" : "bg-line-dosa/10"
                                        }`}
                                    >
                                        {mode === "general" ? (
                                            <MessageCircle
                                                className={`h-8 w-8 ${
                                                    mode === "general" ? "text-primary" : "text-line-dosa"
                                                }`}
                                            />
                                        ) : (
                                            <Sparkles className="h-8 w-8 text-line-dosa" />
                                        )}
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                        {mode === "general"
                                            ? "안녕하세요! 무엇을 도와드릴까요?"
                                            : sajuResult
                                            ? "사주 분석이 완료되었습니다!"
                                            : "사주 정보를 입력해주세요"}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {mode === "general"
                                            ? "기도터 정보나 방문 예절에 대해 궁금한 점을 물어보세요."
                                            : sajuResult
                                            ? "사주를 바탕으로 기도 방향을 안내해드립니다."
                                            : "왼쪽 폼에서 생년월일을 입력하시면 사주를 분석해드립니다."}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {messages.map((msg, index) => (
                                        <ChatBubble
                                            key={index}
                                            role={msg.role}
                                            content={msg.content}
                                        />
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
                            {mode === "saju" && sajuResult && messages.length > 0 && (
                                <div className="mb-3 flex items-center justify-between rounded-lg bg-line-dosa/10 p-3">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-line-dosa" />
                                        <span className="text-xs text-gray-600">
                                            사주 분석 결과가 적용되었습니다
                                        </span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleReset}
                                        className="h-auto p-1 text-xs"
                                    >
                                        <RefreshCw className="h-3 w-3 mr-1" />
                                        초기화
                                    </Button>
                                </div>
                            )}

                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <Input
                                    type="text"
                                    placeholder={
                                        mode === "general"
                                            ? "기도터에 대해 궁금한 점을 입력하세요..."
                                            : sajuResult
                                            ? "사주에 대해 궁금한 점을 입력하세요..."
                                            : "먼저 사주 정보를 입력해주세요"
                                    }
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    disabled={isLoading || (mode === "saju" && !sajuResult)}
                                    className="flex-1"
                                />
                                <Button
                                    type="submit"
                                    disabled={isLoading || !inputValue.trim() || (mode === "saju" && !sajuResult)}
                                    className="shrink-0"
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Send className="h-4 w-4" />
                                    )}
                                </Button>
                            </form>

                            {/* 면책 문구 */}
                            <p className="mt-3 text-xs text-gray-500">
                                ⚠️ 이 답변은 참고용 정보이며, 효험이나 결과를 보장하지 않습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
