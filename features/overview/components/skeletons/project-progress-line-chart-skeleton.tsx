import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectProgressLineChartSkeleton = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="w-32 h-6" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="w-48 h-4" />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
            
                    <div className="relative h-[300px]">
              
                        <div className="right-0 bottom-0 left-0 absolute flex justify-between px-3">
                            {Array.from({ length: 6 }, (_, i) => `x-axis-label-${i}`).map((key) => (
                                <Skeleton key={key} className="w-8 h-3" />
                            ))}
                        </div>

             
                        <div className="relative h-[280px]">
                    
                            <div className="absolute inset-0 space-y-8 pt-4">
                                {Array.from({ length: 4 }, (_, i) => `grid-line-${i}`).map((key) => (
                                    <Skeleton key={key} className="w-full h-px" />
                                ))}
                            </div>

                     
                            <div className="absolute inset-0">
                         
                                <div className="top-16 left-8 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>
                                <div className="top-12 left-24 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>
                                <div className="top-20 left-40 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>
                                <div className="top-8 left-56 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>
                                <div className="top-4 left-72 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>
                                <div className="top-6 right-8 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>

                    
                                <div className="top-24 left-8 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>
                                <div className="top-28 left-24 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>
                                <div className="top-32 left-40 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>
                                <div className="top-20 left-56 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>
                                <div className="top-16 left-72 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>
                                <div className="top-12 right-8 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>

                                <div className="top-32 left-8 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>
                                <div className="top-36 left-24 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>
                                <div className="top-28 left-40 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>
                                <div className="top-24 left-56 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>
                                <div className="top-12 left-72 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>
                                <div className="top-8 right-8 absolute">
                                    <Skeleton className="rounded-full w-2 h-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex items-start gap-2 w-full text-sm">
                    <div className="gap-2 grid">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-48 h-4" />
                            <Skeleton className="w-4 h-4" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-64 h-4" />
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ProjectProgressLineChartSkeleton;
