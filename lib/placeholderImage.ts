/**
 * Placeholder 이미지 생성 함수
 * 외부 API 의존성 제거를 위한 SVG 기반 이미지
 */

export const generatePlaceholderImage = (
    text: string,
    width: number = 800,
    height: number = 600,
    bgColor: string = "#3C5F4A",
    textColor: string = "#ffffff"
): string => {
    const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${adjustBrightness(bgColor, -20)};stop-opacity:1" />
                </linearGradient>
                <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="2" fill="${textColor}" opacity="0.1"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad)"/>
            <rect width="100%" height="100%" fill="url(#pattern)"/>
            <text
                x="50%"
                y="50%"
                dominant-baseline="middle"
                text-anchor="middle"
                font-family="system-ui, -apple-system, sans-serif"
                font-size="48"
                font-weight="bold"
                fill="${textColor}"
                opacity="0.9"
            >
                ${text}
            </text>
        </svg>
    `;

    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

// 색상 밝기 조정 헬퍼 함수
function adjustBrightness(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return (
        "#" +
        (
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 1 ? 0 : B) : 255)
        )
            .toString(16)
            .slice(1)
    );
}

// 미리 정의된 기도터 이미지들
export const PLACE_IMAGES = {
    temple: generatePlaceholderImage("⛩️ 사찰", 800, 600, "#3C5F4A", "#ffffff"),
    gutdang: generatePlaceholderImage("🙏 굿당", 800, 600, "#7C4AC2", "#ffffff"),
    yonggung: generatePlaceholderImage("🐉 용궁", 800, 600, "#2080C0", "#ffffff"),
    sansin: generatePlaceholderImage("⛰️ 산신", 800, 600, "#3C5F4A", "#ffffff"),
    janggun: generatePlaceholderImage("⚔️ 장군", 800, 600, "#A6472C", "#ffffff"),
    dosa: generatePlaceholderImage("🔮 도사", 800, 600, "#7C4AC2", "#ffffff"),
    default: generatePlaceholderImage("🏔️ 기도터", 800, 600, "#3C5F4A", "#ffffff"),
};

// 랜덤 기도터 이미지 가져오기
export const getRandomPlaceImage = (): string => {
    const images = Object.values(PLACE_IMAGES);
    return images[Math.floor(Math.random() * images.length)];
};

// 기도터 타입에 따른 이미지 가져오기
export const getPlaceImageByType = (type?: string): string => {
    if (!type) return PLACE_IMAGES.default;

    const typeMap: Record<string, string> = {
        temple: PLACE_IMAGES.temple,
        사찰: PLACE_IMAGES.temple,
        굿당: PLACE_IMAGES.gutdang,
        gutdang: PLACE_IMAGES.gutdang,
        용궁: PLACE_IMAGES.yonggung,
        yonggung: PLACE_IMAGES.yonggung,
        산신: PLACE_IMAGES.sansin,
        sansin: PLACE_IMAGES.sansin,
        장군: PLACE_IMAGES.janggun,
        janggun: PLACE_IMAGES.janggun,
        도사: PLACE_IMAGES.dosa,
        dosa: PLACE_IMAGES.dosa,
    };

    return typeMap[type.toLowerCase()] || PLACE_IMAGES.default;
};
