"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles } from "lucide-react";
import { SajuCalculationRequest, SajuCalculationResponse } from "@/types/saju";

interface SajuInputFormProps {
    onSajuCalculated: (result: SajuCalculationResponse) => void;
}

export default function SajuInputForm({ onSajuCalculated }: SajuInputFormProps) {
    const [formData, setFormData] = useState<SajuCalculationRequest>({
        birthDate: "",
        birthTime: "",
        isLunar: false,
        gender: "male",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/saju/calc", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "사주 계산에 실패했습니다.");
            }

            const result: SajuCalculationResponse = await response.json();
            onSajuCalculated(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-line-dosa">
                    <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">사주 정보 입력</h3>
                    <p className="text-xs text-gray-500">
                        정확한 생년월일과 시간을 입력해주세요
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* 생년월일 */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        생년월일 <span className="text-red-500">*</span>
                    </label>
                    <Input
                        type="date"
                        required
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="w-full"
                    />
                </div>

                {/* 출생 시간 */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        출생 시간 (선택)
                    </label>
                    <Input
                        type="time"
                        value={formData.birthTime}
                        onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                        className="w-full"
                        placeholder="HH:mm"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        시간을 모르시면 비워두셔도 됩니다
                    </p>
                </div>

                {/* 음력/양력 */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        양력/음력
                    </label>
                    <div className="flex gap-4">
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                name="calendar"
                                checked={!formData.isLunar}
                                onChange={() => setFormData({ ...formData, isLunar: false })}
                                className="h-4 w-4 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">양력</span>
                        </label>
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                name="calendar"
                                checked={formData.isLunar}
                                onChange={() => setFormData({ ...formData, isLunar: true })}
                                className="h-4 w-4 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">음력</span>
                        </label>
                    </div>
                </div>

                {/* 성별 */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        성별 <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                checked={formData.gender === "male"}
                                onChange={() => setFormData({ ...formData, gender: "male" })}
                                className="h-4 w-4 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">남성</span>
                        </label>
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                checked={formData.gender === "female"}
                                onChange={() => setFormData({ ...formData, gender: "female" })}
                                className="h-4 w-4 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">여성</span>
                        </label>
                    </div>
                </div>

                {/* 에러 메시지 */}
                {error && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* 제출 버튼 */}
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            계산 중...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            사주 계산하기
                        </>
                    )}
                </Button>

                {/* 면책 문구 */}
                <p className="text-xs text-gray-500">
                    💡 사주 해석은 참고용이며, 과학적으로 검증된 것이 아닙니다.
                </p>
            </form>
        </div>
    );
}
