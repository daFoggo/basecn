import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const MemberWorkLoadRadialChartSkeleton = () => {
    const skeletonItems = Array.from({ length: 5 }, (_, index) => ({
        id: `skeleton-item-${index}`,
        barHeight: Math.floor(Math.random() * 100) + 50,
    }));

    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>
                    <Skeleton className="w-48 h-6" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="mt-2 w-64 h-4" />
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pb-0">
                <div className="relative flex justify-center items-center mx-auto">
                    {/* Container cho radial chart skeleton */}
                    <div className="relative flex justify-center items-center w-[300px] h-[300px]">
                        {/* Vòng tròn giữa */}
                        <div className="absolute inset-0 flex justify-center items-center">
                            <Skeleton className="rounded-full w-[120px] h-[120px]" />
                        </div>

                        {/* Các thanh radial bars */}
                        <div className="absolute inset-0 flex justify-center items-center">
                            {skeletonItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="absolute"
                                    style={{
                                        transform: `rotate(${skeletonItems.indexOf(item) * (360 / skeletonItems.length)}deg)`,
                                    }}
                                >
                                    <Skeleton
                                        className="rounded-full w-3 origin-bottom"
                                        style={{ height: `${item.barHeight}px` }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Vòng tròn ngoài */}
                        <div className="absolute inset-0">
                            <Skeleton className="opacity-20 rounded-full w-full h-full" />
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    <Skeleton className="w-52 h-4" />
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Skeleton className="w-64 h-4" />
                </div>
            </CardFooter>
        </Card>
    );
};