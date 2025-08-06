import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_DATA = [
	{ id: 'bar-jan', height: 134 },
	{ id: 'bar-feb', height: 190 },
	{ id: 'bar-mar', height: 151 },
	{ id: 'bar-apr', height: 95 },
	{ id: 'bar-may', height: 50 },
	{ id: 'bar-jun', height: 189 },
	{ id: 'bar-jul', height: 186 },
	{ id: 'bar-aug', height: 104 },
	{ id: 'bar-sep', height: 182 },
	{ id: 'bar-oct', height: 62 },
	{ id: 'bar-nov', height: 83 },
	{ id: 'bar-dec', height: 140 }
];

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
		
					<div className="z-30 relative flex flex-col flex-1 justify-center gap-1 px-6 sm:px-8 py-4 sm:py-6 border-t sm:border-t-0 sm:border-l text-left">
						<Skeleton className="w-16 h-3" />
						<Skeleton className="w-8 h-6 sm:h-8" />
					</div>
			
					<div className="z-30 relative flex flex-col flex-1 justify-center gap-1 px-6 sm:px-8 py-4 sm:py-6 border-t sm:border-t-0 sm:border-l even:border-l rounded-tr-xl text-left">
						<Skeleton className="w-12 h-3" />
						<Skeleton className="w-8 h-6 sm:h-8" />
					</div>
				</div>
			</CardHeader>
			<CardContent className="sm:p-6 px-2">
				<div className="flex justify-between items-end gap-2 px-4 py-4 w-full h-[250px] aspect-auto">
				
					{SKELETON_DATA.map((bar) => (
						<div key={bar.id} className="flex flex-col flex-1 items-center gap-2">
							<Skeleton
								className="rounded-sm w-full max-w-8"
								style={{
									height: `${bar.height}px`
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