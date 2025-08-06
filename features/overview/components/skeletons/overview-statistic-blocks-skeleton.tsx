import { Skeleton } from "@/components/ui/skeleton";

const StatisticBlockSkeleton = () => {
    return (
        <div className="bg-card shadow-sm p-6 border rounded-lg text-card-foreground">
        
            <div className="flex flex-row justify-between items-center space-y-0 pb-2">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="rounded-full w-4 h-4" />
            </div>

     
            <div className="pb-2">
                <Skeleton className="mb-1 w-16 h-8" />
            </div>

       
            <div className="flex items-center space-x-1 pb-2">
                <Skeleton className="w-3 h-3" />
                <Skeleton className="w-8 h-3" />
            </div>


            <div className="space-y-1">
                <Skeleton className="w-32 h-3" />
                <Skeleton className="w-28 h-3" />
            </div>
        </div>
    );
};

// Component skeleton chính
export const OverviewStatisticBlocksSkeleton = () => {
    return (
        <>
            <StatisticBlockSkeleton />
            <StatisticBlockSkeleton />
            <StatisticBlockSkeleton />
            <StatisticBlockSkeleton />
        </>
    );
};