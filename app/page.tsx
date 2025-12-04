import Link from "next/link";
import { MapPin, Map, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PrayerPlaceCard from "@/components/places/PrayerPlaceCard";
import { PlaceListItem } from "@/types/place";

// Mock Data
const MOCK_PLACES: PlaceListItem[] = [
  {
    id: "1",
    name: "계룡산 굿당",
    slug: "gyeryong-gutdang",
    addressFull: "충청남도 공주시 계룡면",
    placeType: { id: "t1", nameKo: "굿당" },
    deityTags: [{ deityTag: { id: "d1", code: "sansin", nameKo: "산신줄" } }],
    thumbnail: "https://images.unsplash.com/photo-1518182170546-0766aa6f6914?w=800&q=80",
    reviewCount: 12,
    averageRating: 4.5,
  },
  {
    id: "2",
    name: "태백산 천제단",
    slug: "taebaek-cheunjedan",
    addressFull: "강원도 태백시",
    placeType: { id: "t2", nameKo: "기도터" },
    deityTags: [{ deityTag: { id: "d2", code: "janggun", nameKo: "장군줄" } }],
    thumbnail: "https://images.unsplash.com/photo-1505567745926-ba89000d255a?w=800&q=80",
    reviewCount: 8,
    averageRating: 4.8,
  },
  {
    id: "3",
    name: "지리산 용궁",
    slug: "jirisan-yonggung",
    addressFull: "전라남도 구례군",
    placeType: { id: "t3", nameKo: "용궁" },
    deityTags: [{ deityTag: { id: "d3", code: "yonggung", nameKo: "용궁줄" } }],
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    reviewCount: 24,
    averageRating: 4.2,
  },
  {
    id: "4",
    name: "인왕산 선바위",
    slug: "inwangsan-seonbawi",
    addressFull: "서울특별시 종로구",
    placeType: { id: "t4", nameKo: "기도터" },
    deityTags: [{ deityTag: { id: "d4", code: "dosa", nameKo: "도사줄" } }],
    thumbnail: "https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?w=800&q=80",
    reviewCount: 56,
    averageRating: 4.6,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero 섹션 */}
      <section className="relative overflow-hidden bg-primary-soft/30 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              당골래 <span className="text-primary">기도터 탐색</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              줄·유형·내 주변·지도에서 전국 기도터를 한 번에 찾아보세요.<br />
              당골래가 당신에게 맞는 영험한 기도터를 안내합니다.
            </p>

            {/* 검색바 */}
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <div className="relative w-full max-w-md">
                <Input
                  type="text"
                  placeholder="지역명, 기도터 이름으로 검색..."
                  className="h-12 rounded-full border-gray-300 pl-12 pr-4 shadow-sm focus:border-primary focus:ring-primary"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              <Button size="lg" className="h-12 rounded-full px-8">
                검색
              </Button>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Link href="/map">
                <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary-soft">
                  <Map className="mr-2 h-4 w-4" />
                  지도에서 찾기
                </Button>
              </Link>
              <Link href="/places/nearby">
                <Button variant="outline" className="rounded-full">
                  <MapPin className="mr-2 h-4 w-4" />
                  내 주변 기도터
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 추천 기도터 섹션 */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                촉이 오는 기도터
              </h2>
              <p className="mt-2 text-gray-600">
                많은 분들이 찾고 효험을 본 인기 기도터입니다.
              </p>
            </div>
            <Link href="/places" className="hidden text-sm font-semibold text-primary hover:text-primary-dark sm:block">
              전체보기 <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_PLACES.map((place) => (
              <PrayerPlaceCard key={place.id} place={place} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/places">
              <Button variant="outline" className="w-full">
                전체보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 줄별 기도터 섹션 */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-900">
            나에게 맞는 줄을 찾아보세요
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <LineCategoryCard
              title="용궁줄"
              desc="물과 관련된 기운"
              color="bg-line-yonggung"
              href="/places?line=yonggung"
            />
            <LineCategoryCard
              title="산신줄"
              desc="산의 기운을 받는"
              color="bg-line-sansin"
              href="/places?line=sansin"
            />
            <LineCategoryCard
              title="장군줄"
              desc="강인한 기운"
              color="bg-line-janggun"
              href="/places?line=janggun"
            />
            <LineCategoryCard
              title="도사줄"
              desc="지혜와 깨달음"
              color="bg-line-dosa"
              href="/places?line=dosa"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function LineCategoryCard({ title, desc, color, href }: { title: string, desc: string, color: string, href: string }) {
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className={`absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full ${color} opacity-10 transition-transform group-hover:scale-150`}></div>
      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${color} text-white shadow-sm`}>
        <span className="text-lg font-bold">{title[0]}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{desc}</p>
      <div className="mt-4 flex items-center text-sm font-medium text-gray-400 group-hover:text-primary">
        살펴보기 <ArrowRight className="ml-1 h-4 w-4" />
      </div>
    </Link>
  );
}
