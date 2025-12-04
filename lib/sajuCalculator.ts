/**
 * 사주팔자 계산 모듈
 * 
 * 현재는 Mock 데이터를 반환하며,
 * 추후 실제 만세력 라이브러리나 외부 API로 교체 가능하도록 설계됨
 */

import {
    SajuCalculationRequest,
    SajuResult,
    HeavenlyStem,
    EarthlyBranch,
    Element,
    Pillar,
} from "@/types/saju";

// 천간 배열
const HEAVENLY_STEMS: HeavenlyStem[] = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];

// 지지 배열
const EARTHLY_BRANCHES: EarthlyBranch[] = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

// 천간-오행 매핑
const STEM_ELEMENT_MAP: Record<HeavenlyStem, Element> = {
    "甲": "wood", "乙": "wood",
    "丙": "fire", "丁": "fire",
    "戊": "earth", "己": "earth",
    "庚": "metal", "辛": "metal",
    "壬": "water", "癸": "water",
};

// 지지-오행 매핑 (본기 기준)
const BRANCH_ELEMENT_MAP: Record<EarthlyBranch, Element> = {
    "寅": "wood", "卯": "wood",
    "巳": "fire", "午": "fire",
    "辰": "earth", "戌": "earth", "丑": "earth", "未": "earth",
    "申": "metal", "酉": "metal",
    "子": "water", "亥": "water",
};

/**
 * 생년월일을 기반으로 간지를 Mock으로 생성
 */
function generateMockPillar(year: number, month: number, day: number, hour?: number): Pillar {
    const stemIndex = (year + month + day + (hour || 0)) % 10;
    const branchIndex = (year + month + day + (hour || 0)) % 12;

    return {
        stem: HEAVENLY_STEMS[stemIndex],
        branch: EARTHLY_BRANCHES[branchIndex],
    };
}

/**
 * 오행 균형 계산
 */
function calculateElementsBalance(
    yearPillar: Pillar,
    monthPillar: Pillar,
    dayPillar: Pillar,
    hourPillar: Pillar
): Record<Element, number> {
    const balance: Record<Element, number> = {
        wood: 0,
        fire: 0,
        earth: 0,
        metal: 0,
        water: 0,
    };

    const pillars = [yearPillar, monthPillar, dayPillar, hourPillar];

    pillars.forEach((pillar) => {
        const stemElement = STEM_ELEMENT_MAP[pillar.stem];
        const branchElement = BRANCH_ELEMENT_MAP[pillar.branch];

        balance[stemElement] += 1;
        balance[branchElement] += 1;
    });

    return balance;
}

/**
 * 십성 강도 계산 (Mock)
 */
function calculateTenGods(balance: Record<Element, number>): SajuResult["tenGodsSummary"] {
    // 간단한 Mock 로직
    const total = Object.values(balance).reduce((sum, val) => sum + val, 0);
    const avg = total / 5;

    const getStrength = (value: number): SajuResult["tenGodsSummary"]["wealth"] => {
        if (value > avg * 1.5) return "very_strong";
        if (value > avg * 1.2) return "strong";
        if (value > avg * 0.8) return "normal";
        if (value > avg * 0.5) return "weak";
        return "very_weak";
    };

    return {
        wealth: getStrength(balance.earth),
        officer: getStrength(balance.metal),
        resource: getStrength(balance.water),
        companion: getStrength(balance.wood),
        output: getStrength(balance.fire),
    };
}

/**
 * 대운 계산 (Mock)
 */
function calculateMajorLuck(gender: "male" | "female", yearStem: HeavenlyStem): SajuResult["luck"]["majorLuck"] {
    const luck: SajuResult["luck"]["majorLuck"] = [];
    const startAge = gender === "male" ? 3 : 4; // 간단한 Mock 로직

    for (let i = 0; i < 8; i++) {
        const stemIndex = (HEAVENLY_STEMS.indexOf(yearStem) + i + 1) % 10;
        const branchIndex = (i + 2) % 12;

        luck.push({
            startAge: startAge + i * 10,
            stem: HEAVENLY_STEMS[stemIndex],
            branch: EARTHLY_BRANCHES[branchIndex],
        });
    }

    return luck;
}

/**
 * 사주 계산 메인 함수 (Mock 구현)
 * 
 * TODO: 실제 만세력 라이브러리나 외부 API로 교체
 * 추천 라이브러리:
 * - lunar-javascript (음력 변환)
 * - 만세력 API (외부 서비스)
 */
export async function calculateSaju(request: SajuCalculationRequest): Promise<SajuResult> {
    const { birthDate, birthTime, isLunar, gender } = request;

    // 날짜 파싱
    const [yearStr, monthStr, dayStr] = birthDate.split("-");
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);
    const day = parseInt(dayStr);

    // 시간 파싱 (optional)
    let hour: number | undefined;
    if (birthTime) {
        const [hourStr] = birthTime.split(":");
        hour = parseInt(hourStr);
    }

    // Mock: 음력 변환은 생략하고 양력 기준으로 계산
    // 실제 구현 시 lunar-javascript 등 사용

    // 사주 사기둥 생성 (Mock)
    const yearPillar = generateMockPillar(year, 0, 0);
    const monthPillar = generateMockPillar(year, month, 0);
    const dayPillar = generateMockPillar(year, month, day);
    const hourPillar = generateMockPillar(year, month, day, hour || 12);

    // 일간 정보
    const dayMaster: SajuResult["dayMaster"] = {
        stem: dayPillar.stem,
        element: STEM_ELEMENT_MAP[dayPillar.stem],
        yinYang: HEAVENLY_STEMS.indexOf(dayPillar.stem) % 2 === 0 ? "yang" : "yin",
    };

    // 오행 균형
    const elementsBalance = calculateElementsBalance(yearPillar, monthPillar, dayPillar, hourPillar);

    // 십성 요약
    const tenGodsSummary = calculateTenGods(elementsBalance);

    // 대운
    const majorLuck = calculateMajorLuck(gender, yearPillar.stem);

    return {
        pillars: {
            year: yearPillar,
            month: monthPillar,
            day: dayPillar,
            hour: hourPillar,
        },
        dayMaster,
        elementsBalance,
        tenGodsSummary,
        luck: {
            majorLuck,
        },
    };
}

/**
 * 사주 결과를 텍스트 요약으로 변환 (AI 프롬프트용)
 */
export function summarizeSajuForAI(result: SajuResult): string {
    const { pillars, dayMaster, elementsBalance, tenGodsSummary } = result;

    return `
사주팔자:
- 년주: ${pillars.year.stem}${pillars.year.branch}
- 월주: ${pillars.month.stem}${pillars.month.branch}
- 일주: ${pillars.day.stem}${pillars.day.branch}
- 시주: ${pillars.hour.stem}${pillars.hour.branch}

일간: ${dayMaster.stem} (${dayMaster.element}, ${dayMaster.yinYang === "yang" ? "양" : "음"})

오행 균형:
- 목(木): ${elementsBalance.wood}
- 화(火): ${elementsBalance.fire}
- 토(土): ${elementsBalance.earth}
- 금(金): ${elementsBalance.metal}
- 수(水): ${elementsBalance.water}

십성 분석:
- 재성(재물운): ${tenGodsSummary.wealth}
- 관성(직업운): ${tenGodsSummary.officer}
- 인성(학업운): ${tenGodsSummary.resource}
- 비겁(대인운): ${tenGodsSummary.companion}
- 식상(표현운): ${tenGodsSummary.output}
    `.trim();
}
