import { MapPin, Filter } from "lucide-react";

export default function PlacesPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">기도터 목록</h1>
                <p className="mt-2 text-base text-gray-600">
                    전국의 사찰, 굿당, 산신당, 서낭당 등을 탐색하세요
                </p>
            </div>

            {/* 필터 & 검색 영역 (placeholder) */}
            <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Filter className="h-5 w-5" />
                    <span>필터 및 검색 기능 (추후 구현)</span>
                </div>
            </div>

            {/* 기도터 리스트 (placeholder) */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <PlaceholderCard key={i} index={i} />
                ))}
            </div>
        </div>
    );
}

function PlaceholderCard({ index }: { index: number }) {
    return (
        <div className="group rounded-2xl bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="mb-3 h-48 rounded-xl bg-gray-200"></div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                기도터 {index}
            </h3>
            <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-primary">
                    산신줄
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                    사찰
                </span>
            </div>
            <p className="flex items-start gap-1 text-sm text-gray-600">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>주소 정보 (추후 구현)</span>
            </p>
        </div>
    );
}
