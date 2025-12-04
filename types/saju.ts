/**
 * 사주팔자 관련 타입 정의
 */

// 천간 (Heavenly Stems)
export type HeavenlyStem = "甲" | "乙" | "丙" | "丁" | "戊" | "己" | "庚" | "辛" | "壬" | "癸";

// 지지 (Earthly Branches)
export type EarthlyBranch = "子" | "丑" | "寅" | "卯" | "辰" | "巳" | "午" | "未" | "申" | "酉" | "戌" | "亥";

// 오행 (Five Elements)
export type Element = "wood" | "fire" | "earth" | "metal" | "water";

// 육십갑자 (60 Stems-Branches)
export interface Pillar {
    stem: HeavenlyStem;
    branch: EarthlyBranch;
}

// 사주 사기둥 (Four Pillars)
export interface FourPillars {
    year: Pillar;   // 년주
    month: Pillar;  // 월주
    day: Pillar;    // 일주
    hour: Pillar;   // 시주
}

// 일간 정보
export interface DayMaster {
    stem: HeavenlyStem;
    element: Element;
    yinYang: "yin" | "yang";
}

// 오행 균형
export interface ElementsBalance {
    wood: number;
    fire: number;
    earth: number;
    metal: number;
    water: number;
}

// 십성 요약
export type TenGodsStrength = "very_strong" | "strong" | "normal" | "weak" | "very_weak";

export interface TenGodsSummary {
    wealth: TenGodsStrength;       // 재성
    officer: TenGodsStrength;      // 관성
    resource: TenGodsStrength;     // 인성
    companion: TenGodsStrength;    // 비겁
    output: TenGodsStrength;       // 식상
}

// 대운 (Major Luck Cycle)
export interface MajorLuck {
    startAge: number;
    stem: HeavenlyStem;
    branch: EarthlyBranch;
}

// 사주 계산 결과
export interface SajuResult {
    pillars: FourPillars;
    dayMaster: DayMaster;
    elementsBalance: ElementsBalance;
    tenGodsSummary: TenGodsSummary;
    luck: {
        majorLuck: MajorLuck[];
    };
}

// 사주 계산 요청
export interface SajuCalculationRequest {
    birthDate: string;      // YYYY-MM-DD
    birthTime?: string;     // HH:mm (optional)
    isLunar: boolean;       // 음력 여부
    gender: "male" | "female";
}

// 사주 계산 응답
export interface SajuCalculationResponse extends SajuResult {
    birthInfo: {
        birthDate: string;
        birthTime?: string;
        isLunar: boolean;
        gender: string;
    };
}
