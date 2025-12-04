import Link from "next/link";
import { MapPin, Map, Sparkles, Heart } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-soft/30 to-white">
      {/* Hero 섹션 */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            전국 기도터를 한눈에
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            당골래와 함께 사찰, 굿당, 산신당, 서낭당 등<br />
            전국의 기도터를 탐색하고 소중한 후기를 공유하세요.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/places"
              className="inline-flex items-center rounded-full bg-primary px-8 py-3 text-base font-medium text-white shadow-sm transition-all hover:bg-primary-dark hover:shadow-md"
            >
              <MapPin className="mr-2 h-5 w-5" />
              기도터 둘러보기
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center rounded-full border border-primary bg-transparent px-8 py-3 text-base font-medium text-primary transition-all hover:bg-primary-soft"
            >
              <Map className="mr-2 h-5 w-5" />
              지도에서 찾기
            </Link>
          </div>
        </div>
      </section>

      {/* 주요 기능 */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          당골래의 주요 기능
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<MapPin className="h-8 w-8 text-primary" />}
            title="기도터 탐색"
            description="전국의 기도터를 검색하고 상세 정보를 확인하세요"
            href="/places"
          />
          <FeatureCard
            icon={<Map className="h-8 w-8 text-line-yonggung" />}
            title="지도 검색"
            description="네이버 지도로 내 주변 기도터를 찾아보세요"
            href="/map"
          />
          <FeatureCard
            icon={<Sparkles className="h-8 w-8 text-line-dosa" />}
            title="당골래 AI"
            description="AI 도우미와 대화하며 기도터 정보와 사주를 확인하세요"
            href="/ai"
          />
          <FeatureCard
            icon={<Heart className="h-8 w-8 text-line-janggun" />}
            title="후기 공유"
            description="다녀온 기도터의 경험을 공유하고 다른 이의 후기를 읽어보세요"
            href="/reviews"
          />
        </div>
      </section>

      {/* 줄별 기도터 */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            줄별 기도터
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <LineCard
              name="용궁줄"
              color="bg-line-yonggung"
              bgColor="bg-blue-50"
              href="/lines/yonggung"
            />
            <LineCard
              name="산신줄"
              color="bg-line-sansin"
              bgColor="bg-green-50"
              href="/lines/sansin"
            />
            <LineCard
              name="장군줄"
              color="bg-line-janggun"
              bgColor="bg-orange-50"
              href="/lines/janggun"
            />
            <LineCard
              name="도사줄"
              color="bg-line-dosa"
              bgColor="bg-purple-50"
              href="/lines/dosa"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
}

function LineCard({
  name,
  color,
  bgColor,
  href,
}: {
  name: string;
  color: string;
  bgColor: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={`${bgColor} group rounded-2xl p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md`}
    >
      <div className={`inline-block rounded-full ${color} px-4 py-2 text-sm font-medium text-white`}>
        {name}
      </div>
      <p className="mt-3 text-sm text-gray-600">
        {name}의 기도터를 탐색해보세요
      </p>
    </Link>
  );
}
