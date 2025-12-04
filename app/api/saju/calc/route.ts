import { NextRequest, NextResponse } from "next/server";
import { calculateSaju } from "@/lib/sajuCalculator";
import { SajuCalculationRequest, SajuCalculationResponse } from "@/types/saju";

export async function POST(request: NextRequest) {
    try {
        const body: SajuCalculationRequest = await request.json();

        // 필수 필드 검증
        if (!body.birthDate) {
            return NextResponse.json(
                { error: "생년월일(birthDate)은 필수입니다." },
                { status: 400 }
            );
        }

        if (!body.gender) {
            return NextResponse.json(
                { error: "성별(gender)은 필수입니다." },
                { status: 400 }
            );
        }

        // 날짜 형식 검증 (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(body.birthDate)) {
            return NextResponse.json(
                { error: "생년월일 형식이 올바르지 않습니다. (YYYY-MM-DD)" },
                { status: 400 }
            );
        }

        // 시간 형식 검증 (HH:mm, optional)
        if (body.birthTime) {
            const timeRegex = /^\d{2}:\d{2}$/;
            if (!timeRegex.test(body.birthTime)) {
                return NextResponse.json(
                    { error: "출생시간 형식이 올바르지 않습니다. (HH:mm)" },
                    { status: 400 }
                );
            }
        }

        // 성별 검증
        if (body.gender !== "male" && body.gender !== "female") {
            return NextResponse.json(
                { error: "성별은 'male' 또는 'female'이어야 합니다." },
                { status: 400 }
            );
        }

        // 사주 계산
        const sajuResult = await calculateSaju(body);

        // 응답 구성
        const response: SajuCalculationResponse = {
            ...sajuResult,
            birthInfo: {
                birthDate: body.birthDate,
                birthTime: body.birthTime,
                isLunar: body.isLunar,
                gender: body.gender,
            },
        };

        return NextResponse.json(response);
    } catch (error: any) {
        console.error("사주 계산 실패:", error);
        return NextResponse.json(
            { error: "사주 계산 중 오류가 발생했습니다.", details: error.message },
            { status: 500 }
        );
    }
}
