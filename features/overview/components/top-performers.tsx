"use client";

import EmptyData from "@/components/common/empty-data";
import ErrorAlert from "@/components/common/error-alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Scroller } from "@/components/ui/scroller";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ITopPerformerData } from "../services/overview-stats";
import TopPerformersSkeleton from "./skeletons/top-performers-skeleton";

interface ITopPerformersProps {
	topPerformersData: ITopPerformerData[];
	topPerformersError: Error | null;
	isLoadingTopPerformers: boolean;
}

const TopPerformers = ({
	topPerformersData,
	topPerformersError,
	isLoadingTopPerformers,
}: ITopPerformersProps) => {

	if (isLoadingTopPerformers) {
		return <TopPerformersSkeleton />;
	}

	if (topPerformersError || !topPerformersData) {
		return (
			<ErrorAlert
				title="Error loading top performers"
				description="Please try again later."
			/>
		);
	}

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
					<TooltipProvider>
						{topPerformersData.length === 0 ? (
							<EmptyData
								message="No top performers found."
							/>
						) : (
							<Scroller
								className="space-y-3 h-full max-h-[calc(var(--spacing)*77)]"
								orientation="vertical"
								withNavigation
							>
								{topPerformersData.map((performer, index) => (
									<div
										key={performer.id}
										className="flex items-center gap-4 hover:bg-muted/50 px-3 py-2 rounded-md transition-colors cursor-pointer"
									>
										{/* Rank */}
										<span className="w-4 font-medium text-muted-foreground text-xs">
											#{index + 1}
										</span>

										{/* Avatar & Name */}
										<Avatar className="size-8">
											<AvatarImage
												src={performer.avatar || "/placeholder.svg"}
												alt={performer.name}
											/>
											<AvatarFallback>
												{performer.name.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1 min-w-0">
											<p className="font-medium text-sm truncate">
												{performer.name}
											</p>
											<p className="text-muted-foreground text-xs truncate">
												{performer.role} - {performer.department}
											</p>
										</div>

										{/* Metrics */}
										<div className="flex items-center gap-4 text-sm">
											<Tooltip>
												<TooltipTrigger asChild>
													<span className="font-semibold">
														{performer.completionRate}%
													</span>
												</TooltipTrigger>
												<TooltipContent>
													<p>Task completion rate</p>
												</TooltipContent>
											</Tooltip>
											<span className="text-muted-foreground">/</span>
											<Tooltip>
												<TooltipTrigger asChild>
													<Badge
														variant="secondary"
														className="text-xs"
													>
														{performer.productivity}
													</Badge>
												</TooltipTrigger>
												<TooltipContent>
													<p>Overall productivity score</p>
												</TooltipContent>
											</Tooltip>
										</div>
									</div>
								))}
							</Scroller>
						)}
					</TooltipProvider>
				</div>
			</CardContent>
		</Card>
	);
};

export default TopPerformers;
