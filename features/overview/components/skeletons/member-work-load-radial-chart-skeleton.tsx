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
    const skeletonItems = [
        { id: 'skeleton-item-0', barHeight: 136 },
        { id: 'skeleton-item-1', barHeight: 101 },
        { id: 'skeleton-item-2', barHeight: 72 },
        { id: 'skeleton-item-3', barHeight: 129 },
        { id: 'skeleton-item-4', barHeight: 87 },
    ];

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
                
                    <div className="relative flex justify-center items-center w-[300px] h-[300px]">
                    
                        <div className="absolute inset-0 flex justify-center items-center">
                            <Skeleton className="rounded-full w-[120px] h-[120px]" />
                        </div>

                 
                        <div className="absolute inset-0 flex justify-center items-center">
                            {skeletonItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="absolute"
                                    style={{
                                        transform: `rotate(${index * (360 / skeletonItems.length)}deg)`,
                                    }}
                                >
                                    <Skeleton
                                        className="rounded-full w-3 origin-bottom"
                                        style={{ height: `${item.barHeight}px` }}
                                    />
                                </div>
                            ))}
                        </div>

                  
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