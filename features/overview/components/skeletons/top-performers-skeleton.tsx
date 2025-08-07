import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TopPerformersSkeleton = () => {
    return (
        <Card className="flex flex-col w-full h-full">
            <CardHeader className="flex-shrink-0">
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>
                    Team members ranked by overall performance
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-0 min-h-0 overflow-hidden">
                <div className="px-6 h-full">
                    <div className="space-y-3 h-full max-h-[calc(var(--spacing)*77)]">
                        {Array.from({ length: 8 }, (_, index) => `skeleton-${index}`).map((skeletonId) => (
                            <div
                                key={skeletonId}
                                className="flex items-center gap-4 px-3 py-2"
                            >

                                <Skeleton className="w-4 h-4" />

                                <Skeleton className="rounded-full size-8" />

                                <div className="flex-1 space-y-1 min-w-0">
                                    <Skeleton className="w-24 h-4" />
                                    <Skeleton className="w-32 h-3" />
                                </div>


                                <div className="flex items-center gap-4">
                                    <Skeleton className="w-8 h-4" />
                                    <span className="text-muted-foreground">/</span>
                                    <Skeleton className="rounded-full w-12 h-5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default TopPerformersSkeleton;