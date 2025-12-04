/**
 * OpenAI 클라이언트 설정
 */

import OpenAI from "openai";

// OpenAI 클라이언트 싱글톤
const globalForOpenAI = globalThis as unknown as {
    openai: OpenAI | undefined;
};

export const openai =
    globalForOpenAI.openai ??
    new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

if (process.env.NODE_ENV !== "production") {
    globalForOpenAI.openai = openai;
}

export default openai;
