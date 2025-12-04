import { User, Heart, MessageSquare } from "lucide-react";

export default function MyPage() {
    return (
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="mb-8 text-3xl font-bold text-gray-900">마이페이지</h1>

            {/* 사용자 정보 */}
            <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
                        <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            사용자명 (로그인 후 표시)
                        </h2>
                        <p className="text-sm text-gray-600">email@example.com</p>
                    </div>
                </div>
            </div>

            {/* 메뉴 */}
            <div className="grid gap-6 md:grid-cols-3">
                <MenuCard
                    icon={<Heart className="h-8 w-8 text-line-janggun" />}
                    title="즐겨찾기"
                    description="내가 저장한 기도터"
                    count={0}
                    href="/my/favorites"
                />
                <MenuCard
                    icon={<MessageSquare className="h-8 w-8 text-primary" />}
                    title="내 후기"
                    description="내가 작성한 후기"
                    count={0}
                    href="/my/reviews"
                />
                <MenuCard
                    icon={<User className="h-8 w-8 text-line-dosa" />}
                    title="프로필 설정"
                    description="회원정보 수정"
                    href="/my/profile"
                />
            </div>

            {/* 최근 활동 */}
            <div className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">최근 활동</h2>
                <div className="rounded-2xl bg-gray-50 p-6 text-center">
                    <p className="text-sm text-gray-500">
                        최근 활동 내역이 없습니다
                    </p>
                </div>
            </div>
        </div>
    );
}

function MenuCard({
    icon,
    title,
    description,
    count,
    href,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    count?: number;
    href: string;
}) {
    return (
        <a
            href={href}
            className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
        >
            <div className="mb-4">{icon}</div>
            <h3 className="mb-1 text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
            {count !== undefined && (
                <p className="mt-2 text-2xl font-bold text-primary">{count}</p>
            )}
        </a>
    );
}
