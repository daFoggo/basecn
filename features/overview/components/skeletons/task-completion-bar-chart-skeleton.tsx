import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TaskCompletionBarChartSkeleton = () => {
	return (
		<Card className="py-0">
			<CardHeader className="flex sm:flex-row flex-col items-stretch !p-0 border-b">
				<div className="flex flex-col flex-1 justify-center gap-1 px-6 sm:!py-0 pt-4 pb-3">
					<CardTitle>
						<Skeleton className="w-32 h-6" />
					</CardTitle>
					<CardDescription>
						<Skeleton className="w-64 h-4" />
					</CardDescription>
				</div>
				<div className="flex">
					{/* Completed button skeleton */}
					<div className="z-30 relative flex flex-col flex-1 justify-center gap-1 px-6 sm:px-8 py-4 sm:py-6 border-t sm:border-t-0 sm:border-l text-left">
						<Skeleton className="w-16 h-3" />
						<Skeleton className="w-8 h-6 sm:h-8" />
					</div>
					{/* Created button skeleton */}
					<div className="z-30 relative flex flex-col flex-1 justify-center gap-1 px-6 sm:px-8 py-4 sm:py-6 border-t sm:border-t-0 sm:border-l even:border-l rounded-tr-xl text-left">
						<Skeleton className="w-12 h-3" />
						<Skeleton className="w-8 h-6 sm:h-8" />
					</div>
				</div>
			</CardHeader>
			<CardContent className="sm:p-6 px-2">
				<div className="flex justify-between items-end gap-2 px-4 py-4 w-full h-[250px] aspect-auto">
					{/* Skeleton bars representing chart data */}
					{Array.from({ length: 12 }, (_, index) => `skeleton-bar-${index}`).map((key) => (
						<div key={key} className="flex flex-col flex-1 items-center gap-2">
							<Skeleton
								className="rounded-sm w-full max-w-8"
								style={{
									height: `${Math.random() * 150 + 50}px`
								}}
							/>
							<Skeleton className="w-6 h-3" />
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default TaskCompletionBarChartSkeleton;