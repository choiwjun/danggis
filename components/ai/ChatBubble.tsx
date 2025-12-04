"use client";

import { MessageRole } from "@/types/ai";
import { Bot, User } from "lucide-react";

interface ChatBubbleProps {
    role: MessageRole;
    content: string;
    timestamp?: string;
}

export default function ChatBubble({ role, content, timestamp }: ChatBubbleProps) {
    const isUser = role === "user";
    const isAssistant = role === "assistant";

    if (role === "system") {
        return (
            <div className="mx-auto my-4 max-w-md text-center">
                <p className="text-xs text-gray-400">{content}</p>
            </div>
        );
    }

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
            <div className={`flex max-w-[80%] gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                {/* 아바타 */}
                <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        isUser ? "bg-primary" : "bg-gray-200"
                    }`}
                >
                    {isUser ? (
                        <User className="h-4 w-4 text-white" />
                    ) : (
                        <Bot className="h-4 w-4 text-gray-600" />
                    )}
                </div>

                {/* 말풍선 */}
                <div className="flex flex-col gap-1">
                    {/* 이름 */}
                    <div className={`text-xs text-gray-500 ${isUser ? "text-right" : "text-left"}`}>
                        {isUser ? "나" : "당골래 AI"}
                    </div>

                    {/* 메시지 */}
                    <div
                        className={`rounded-2xl px-4 py-3 ${
                            isUser
                                ? "rounded-tr-sm bg-primary text-white"
                                : "rounded-tl-sm border border-gray-200 bg-white text-gray-900"
                        }`}
                    >
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{content}</p>
                    </div>

                    {/* 시간 */}
                    {timestamp && (
                        <div className={`text-xs text-gray-400 ${isUser ? "text-right" : "text-left"}`}>
                            {new Date(timestamp).toLocaleTimeString("ko-KR", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
