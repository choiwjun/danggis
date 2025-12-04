"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import PlacesContent from "./PlacesContent";

export default function PlacesPage() {
    return (
        <Suspense
            fallback={
                <div className="flex h-screen items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            }
        >
            <PlacesContent />
        </Suspense>
    );
}

    const [places, setPlaces] = useState<PlaceListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

    // 필터 상태
    const currentLine = searchParams.get("line");
    const currentType = searchParams.get("type");

    useEffect(() => {
        const fetchPlaces = async () => {
            setIsLoading(true);
            try {
                const query = new URLSearchParams(searchParams.toString());
                const response = await fetch(`/api/places?${query.toString()}`);
                const data = await response.json();
                setPlaces(data.places || []);
            } catch (error) {
                console.error("Failed to fetch places:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlaces();
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchQuery) {
            params.set("q", searchQuery);
        } else {
            params.delete("q");
        }
        router.push(`/places?${params.toString()}`);
    };

    const handleFilterChange = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/places?${params.toString()}`);
    };


