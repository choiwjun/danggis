"use client";

import { Sparkles, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function AIPage() {
    const [mode, setMode] = useState<"general" | "saju">("general");

    return (
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
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
                    onClick={() => setMode("general")}
                    className={`rounded-full px-6 py-3 text-sm font-medium transition-colors ${mode === "general"
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    <MessageCircle className="mr-2 inline-block h-4 w-4" />
                    일반 Q&A 모드
                </button>
                <button
                    onClick={() => setMode("saju")}
                    className={`rounded-full px-6 py-3 text-sm font-medium transition-colors ${mode === "saju"
                            ? "bg-line-dosa text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    <Sparkles className="mr-2 inline-block h-4 w-4" />
                    사주풀이 모드
                </button>
            </div>

            {/* 채팅 영역 */}
            <div className="rounded-2xl bg-gray-50 p-6">
                <div className="mb-6 min-h-[400px] space-y-4">
                    {/* AI 환영 메시지 */}
                    <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-gray-200 bg-white p-4">
                            <div className="mb-1 text-xs text-gray-500">당골래 AI</div>
                            <p className="text-sm text-gray-900">
                                {mode === "general"
                                    ? "안녕하세요! 기도터 정보나 방문 예절에 대해 무엇이든 물어보세요."
                                    : "사주풀이 모드입니다. 생년월일과 시간을 알려주시면 사주를 바탕으로 기도 방향을 안내해드립니다."}
                            </p>
                        </div>
                    </div>

                    {/* 채팅 내용 (추후 구현) */}
                    <div className="text-center text-sm text-gray-400">
                        (채팅 기능은 추후 구현 예정입니다)
                    </div>
                </div>

                {/* 입력창 */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder={
                            mode === "general"
                                ? "기도터에 대해 궁금한 점을 입력하세요..."
                                : "생년월일(예: 1990년 1월 1일 오전 10시)을 입력하세요..."
                        }
                        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <button className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark">
                        전송
                    </button>
                </div>

                {/* 면책 문구 */}
                <div className="mt-4 rounded-lg bg-white p-3">
                    <p className="text-xs text-gray-500">
                        ⚠️ 당골래 AI 도우미의 답변은 참고용 정보이며, 효험이나 결과를
                        보장하지 않습니다. 건강·법률·재정 관련 결정은 반드시 전문가와
                        상의하세요.
                    </p>
                </div>
            </div>
        </div>
    );
}
