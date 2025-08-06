"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const TasksSkeleton = () => {
    const columnSkeletons = [
        { id: 'skeleton-todo', name: 'To Do', tasks: 4 },
        { id: 'skeleton-progress', name: 'In Progress', tasks: 3 },
        { id: 'skeleton-done', name: 'Done', tasks: 2 },
    ];

    return (
        <div className="gap-6 grid sm:grid-cols-3 auto-rows-fr">
            {columnSkeletons.map((column) => (
                <div key={column.id} className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-20 h-5" />
                            <Skeleton className="rounded-sm w-6 h-5" />
                        </div>
                        <Skeleton className="rounded-md w-8 h-8" />
                    </div>

                    <div className="flex flex-col gap-2 p-0.5">
                        {Array.from({ length: column.tasks }, (_, i) => `${column.id}-task-${i + 1}`).map((taskId) => (
                            <div
                                key={taskId}
                                className="bg-card shadow-xs p-3 border rounded-md"
                            >
                                <div className="flex flex-col gap-2">

                                    <div className="flex justify-between items-center gap-2">
                                        <Skeleton className="w-full max-w-32 h-4" />
                                        <Skeleton className="rounded-sm w-12 h-5" />
                                    </div>


                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-1">
                                            <Skeleton className="rounded-full size-2" />
                                            <Skeleton className="w-16 h-3" />
                                        </div>
                                        <Skeleton className="w-12 h-3" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};