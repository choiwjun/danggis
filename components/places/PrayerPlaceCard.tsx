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
        <Link href={`/places/${place.id || place.slug}`}>
            <Card className="group h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md">
                {/* 썸네일 이미지 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    {place.thumbnail ? (
                        <img
                            src={place.thumbnail}
                            alt={place.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                            <span className="text-sm">이미지 없음</span>
                        </div>
                    )}

                    {/* 거리 표시 (nearby 검색 시) */}
                    {place.distance !== undefined && (
                        <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                            {place.distance}km
                        </div>
                    )}
                </div>

                <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
                            {place.name}
                        </h3>
                        {place.placeType && (
                            <Badge variant="outline" className="shrink-0 text-xs font-normal text-gray-500">
                                {place.placeType.nameKo}
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="p-4 pt-0">
                    {/* 줄 태그 */}
                    <div className="mb-2 flex flex-wrap gap-1">
                        {place.deityTags.map(({ deityTag }) => (
                            <Badge key={deityTag.id} variant={getBadgeVariant(deityTag.code) as any}>
                                {deityTag.nameKo}
                            </Badge>
                        ))}
                    </div>

                    {/* 주소 */}
                    <div className="flex items-start gap-1 text-sm text-gray-500">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        <span className="line-clamp-1">{place.addressFull}</span>
                    </div>
                </CardContent>

                <CardFooter className="border-t border-gray-100 p-3 text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium text-gray-900">
                                {place.averageRating ? place.averageRating.toFixed(1) : "0.0"}
                            </span>
                            <span>({place.reviewCount})</span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}
