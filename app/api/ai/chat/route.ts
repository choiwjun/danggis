import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getOpenAIClient } from "@/lib/openai";
import prisma from "@/lib/prisma";
import { AiChatRequest, AiChatResponse } from "@/types/ai";
import { getGeneralModePrompt, getSajuModePrompt, DISCLAIMER_MESSAGE } from "@/lib/aiPrompts";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const body: AiChatRequest = await request.json();

        // 필수 필드 검증
        if (!body.mode) {
            return NextResponse.json({ error: "mode는 필수입니다." }, { status: 400 });
        }

        if (!body.messages || body.messages.length === 0) {
            return NextResponse.json(
                { error: "messages는 필수이며 비어있을 수 없습니다." },
                { status: 400 }
            );
        }

        // OpenAI API 키 확인
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: "OpenAI API 키가 설정되지 않았습니다." },
                { status: 500 }
            );
        }

        // 세션 ID 처리 (새 세션 또는 기존 세션)
        let sessionId = body.sessionId;
        let aiSession: any = null;

        if (sessionId) {
            // 기존 세션 조회
            aiSession = await prisma.aiSession.findUnique({
                where: { id: sessionId },
            });

            if (!aiSession) {
                return NextResponse.json({ error: "세션을 찾을 수 없습니다." }, { status: 404 });
            }

            // 세션 활동 시간 업데이트
            await prisma.aiSession.update({
                where: { id: sessionId },
                data: { lastActivityAt: new Date() },
            });
        } else {
            // 새 세션 생성
            aiSession = await prisma.aiSession.create({
                data: {
                    userId: session?.user?.id || null,
                    mode: body.mode,
                    title: body.mode === "saju" ? "사주풀이 상담" : "기도터 상담",
                    lastActivityAt: new Date(),
                },
            });
            sessionId = aiSession.id;
        }

        // 시스템 프롬프트 생성
        let systemPrompt = "";

        if (body.mode === "general") {
            // 일반 모드: 기도터 정보 포함
            let placeData = null;
            if (body.placeId) {
                placeData = await prisma.prayerPlace.findUnique({
                    where: { id: body.placeId },
                    include: {
                        placeType: true,
                        deityTags: {
                            include: {
                                deityTag: true,
                            },
                        },
                    },
                });
            }
            systemPrompt = getGeneralModePrompt(placeData as any);
        } else if (body.mode === "saju") {
            // 사주 모드: 사주 결과 포함
            if (!body.sajuResult) {
                return NextResponse.json(
                    { error: "사주 모드에서는 sajuResult가 필요합니다." },
                    { status: 400 }
                );
            }
            systemPrompt = getSajuModePrompt(body.sajuResult);
        }

        // sessionId가 없으면 에러 (이론적으로 불가능하지만 타입 안전성을 위해)
        if (!sessionId) {
            return NextResponse.json(
                { error: "세션 ID를 생성할 수 없습니다." },
                { status: 500 }
            );
        }

        // 사용자 메시지 저장
        const userMessage = body.messages[body.messages.length - 1];
        await prisma.aiMessage.create({
            data: {
                sessionId: sessionId,
                senderType: "user",
                content: userMessage.content,
                placeId: body.placeId || null,
            },
        });

        // OpenAI API 호출
        const openai = getOpenAIClient();
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                ...body.messages,
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });

        const assistantMessageContent = completion.choices[0].message.content || "";

        // 면책 문구 추가 (5번째 메시지마다)
        const messageCount = await prisma.aiMessage.count({
            where: { sessionId: sessionId },
        });

        let finalMessage = assistantMessageContent;
        if (messageCount % 5 === 0) {
            finalMessage += "\n\n" + DISCLAIMER_MESSAGE;
        }

        // AI 응답 저장
        const assistantMessage = await prisma.aiMessage.create({
            data: {
                sessionId: sessionId,
                senderType: "assistant",
                content: finalMessage,
                placeId: body.placeId || null,
                metadata: JSON.stringify({
                    model: completion.model,
                    usage: completion.usage,
                }),
            },
        });

        // 응답 구성
        const response: AiChatResponse = {
            sessionId: sessionId,
            assistantMessage: {
                content: finalMessage,
                createdAt: assistantMessage.createdAt.toISOString(),
            },
            usage: completion.usage
                ? {
                      promptTokens: completion.usage.prompt_tokens,
                      completionTokens: completion.usage.completion_tokens,
                      totalTokens: completion.usage.total_tokens,
                  }
                : undefined,
        };

        return NextResponse.json(response);
    } catch (error: any) {
        console.error("AI 채팅 실패:", error);

        // OpenAI API 에러 처리
        if (error.status === 401) {
            return NextResponse.json(
                { error: "OpenAI API 키가 유효하지 않습니다." },
                { status: 500 }
            );
        }

        if (error.status === 429) {
            return NextResponse.json(
                { error: "API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요." },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: "AI 채팅 처리 중 오류가 발생했습니다.", details: error.message },
            { status: 500 }
        );
    }
}
