import { MapPin, Phone, Clock, Tag } from "lucide-react";

export default function PlaceDetailPage({
    params,
}: {
    params: { id: string };
}) {
    return (
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            {/* 기도터 기본 정보 */}
            <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-sm font-medium text-primary">
                        산신줄
                    </span>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                        사찰
                    </span>
                </div>

                <h1 className="mb-4 text-3xl font-bold text-gray-900">
                    기도터 {params.id} (상세 페이지 - 추후 구현)
                </h1>

                <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0" />
                        <span>주소: (DB 연동 후 표시)</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <Phone className="mt-0.5 h-5 w-5 flex-shrink-0" />
                        <span>연락처: (DB 연동 후 표시)</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <Clock className="mt-0.5 h-5 w-5 flex-shrink-0" />
                        <span>운영시간: (DB 연동 후 표시)</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <Tag className="mt-0.5 h-5 w-5 flex-shrink-0" />
                        <span>모시는 신: (DB 연동 후 표시)</span>
                    </div>
                </div>
            </div>

            {/* 이미지 갤러리 영역 */}
            <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">사진</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="aspect-video rounded-xl bg-gray-200"
                        ></div>
                    ))}
                </div>
            </div>

            {/* 지도 영역 */}
            <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">위치</h2>
                <div className="h-64 rounded-2xl bg-gray-100 p-4">
                    <p className="text-sm text-gray-500">
                        (네이버 지도 API 연동 후 표시)
                    </p>
                </div>
            </div>

            {/* 후기 영역 */}
            <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                    방문 후기
                </h2>
                <div className="rounded-2xl bg-gray-50 p-6 text-center">
                    <p className="text-sm text-gray-500">
                        후기 목록 및 작성 기능 (추후 구현)
                    </p>
                </div>
            </div>

            {/* AI 버튼 */}
            <div className="rounded-2xl bg-primary-soft p-6 text-center">
                <p className="mb-3 text-base font-medium text-gray-900">
                    이 기도터에 대해 궁금한 점이 있으신가요?
                </p>
                <button className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark">
                    당골래 AI에게 물어보기
                </button>
            </div>
        </div>
    );
}
