import Link from "next/link";
import { MapPin, Map, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PrayerPlaceCard from "@/components/places/PrayerPlaceCard";
import { PlaceListItem } from "@/types/place";
import { PLACE_IMAGES } from "@/lib/placeholderImage";

// Mock Data
const MOCK_PLACES: PlaceListItem[] = [
  {
    id: "1",
    name: "계룡산 굿당",
    slug: "gyeryong-gutdang",
    addressFull: "충청남도 공주시 계룡면",
    placeType: { id: "t1", nameKo: "굿당" },
    deityTags: [{ deityTag: { id: "d1", code: "sansin", nameKo: "산신줄" } }],
    thumbnail: PLACE_IMAGES.sansin,
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
    thumbnail: PLACE_IMAGES.janggun,
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
    thumbnail: PLACE_IMAGES.yonggung,
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
    thumbnail: PLACE_IMAGES.dosa,
    reviewCount: 56,
    averageRating: 4.6,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero 섹션 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-soft/40 via-white to-primary-soft/20 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <span>🙏</span>
              <span>전국 기도터 탐색 플랫폼</span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              당골래에서
              <br />
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">당신만의 기도터</span>를 찾으세요
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-gray-600 sm:text-xl">
              줄·유형·내 주변·지도에서 전국 기도터를 한 번에 찾아보세요.
              <br className="hidden sm:block" />
              당골래가 당신에게 맞는 영험한 기도터를 안내합니다.
            </p>

            {/* 검색바 */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <div className="relative w-full max-w-lg">
                <Input
                  type="text"
                  placeholder="지역명, 기도터 이름으로 검색..."
                  className="h-14 rounded-2xl border-gray-200 pl-14 pr-4 text-base shadow-lg focus:border-primary focus:ring-primary focus:shadow-xl transition-all"
                />
                <Search className="absolute left-5 top-4 h-6 w-6 text-gray-400" />
              </div>
              <Button size="lg" className="w-full sm:w-auto h-14 rounded-2xl px-8 shadow-lg hover:shadow-xl">
                검색
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/map">
                <Button variant="soft" size="lg" className="gap-2">
                  <Map className="h-5 w-5" />
                  지도에서 찾기
                </Button>
              </Link>
              <Link href="/places/nearby">
                <Button variant="soft" size="lg" className="gap-2">
                  <MapPin className="h-5 w-5" />
                  내 주변 기도터
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 추천 기도터 섹션 */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                <span>✨</span>
                <span>추천</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                촉이 오는 기도터
              </h2>
              <p className="mt-3 text-base text-gray-600">
                많은 분들이 찾고 효험을 본 인기 기도터입니다.
              </p>
            </div>
            <Link href="/places" className="hidden group items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark sm:flex">
              전체보기 
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_PLACES.map((place) => (
              <PrayerPlaceCard key={place.id} place={place} />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link href="/places">
              <Button variant="soft" size="lg" className="w-full max-w-sm">
                모든 기도터 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 줄별 기도터 섹션 */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-primary shadow-sm">
              <span>🎯</span>
              <span>줄별 분류</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              나에게 맞는 줄을 찾아보세요
            </h2>
            <p className="mt-4 text-base text-gray-600">
              각 줄의 특성에 맞는 기도터를 추천해드립니다.
            </p>
          </div>

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
    <Link href={href} className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm border border-gray-100 transition-all hover:-translate-y-2 hover:shadow-xl">
      <div className={`absolute -right-6 -top-6 h-32 w-32 rounded-full ${color} opacity-5 transition-all group-hover:scale-150 group-hover:opacity-10`}></div>
      <div className="relative">
        <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${color} text-white shadow-lg transition-transform group-hover:scale-110`}>
          <span className="text-xl font-bold">{title[0]}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
        <div className="mt-5 flex items-center text-sm font-bold text-gray-400 group-hover:text-primary transition-colors">
          살펴보기 
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
