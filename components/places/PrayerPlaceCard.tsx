import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceListItem } from "@/types/place";

interface PrayerPlaceCardProps {
    place: PlaceListItem;
}

export default function PrayerPlaceCard({ place }: PrayerPlaceCardProps) {
    // 줄(DeityTag)에 따른 배지 스타일 매핑
    const getBadgeVariant = (code: string) => {
        switch (code) {
            case "yonggung": return "yonggung";
            case "sansin": return "sansin";
            case "janggun": return "janggun";
            case "dosa": return "dosa";
            default: return "secondary";
        }
    };

    return (
        <Link href={`/places/${place.id || place.slug}`} className="block h-full">
            <Card className="group h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                {/* 썸네일 이미지 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    {place.thumbnail ? (
                        <img
                            src={place.thumbnail}
                            alt={place.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
                            <span className="text-2xl">🙏</span>
                            <span className="mt-2 text-sm">이미지 없음</span>
                        </div>
                    )}

                    {/* 거리 표시 (nearby 검색 시) */}
                    {place.distance !== undefined && (
                        <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                            {place.distance}km
                        </div>
                    )}
                </div>

                <CardHeader className="p-5 pb-3">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="line-clamp-1 text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                            {place.name}
                        </h3>
                        {place.placeType && (
                            <Badge variant="outline" className="shrink-0 text-xs font-medium text-gray-600 border-gray-200">
                                {place.placeType.nameKo}
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="p-5 pt-0 space-y-3">
                    {/* 줄 태그 */}
                    {place.deityTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {place.deityTags.map(({ deityTag }) => (
                                <Badge key={deityTag.id} variant={getBadgeVariant(deityTag.code) as any} className="text-xs font-medium">
                                    {deityTag.nameKo}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* 주소 */}
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                        <span className="line-clamp-1">{place.addressFull}</span>
                    </div>
                </CardContent>

                <CardFooter className="border-t border-gray-50 bg-gray-50/50 px-5 py-3">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">
                            {place.averageRating ? place.averageRating.toFixed(1) : "0.0"}
                        </span>
                        <span className="text-gray-500">({place.reviewCount}개 후기)</span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}
