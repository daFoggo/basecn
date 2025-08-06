"use client";

import {
	CircleFadingArrowUp,
	ClockAlert,
	FolderKanban,
	UsersRound,
} from "lucide-react";
import ErrorAlert from "@/components/common/error-alert";
import { StatisticBlock } from "@/components/common/statistic-block";
import type { IOverviewStatsResponse } from "../services/overview-stats";
import { OverviewStatisticBlocksSkeleton } from "./skeletons/overview-statistic-blocks-skeleton";

interface IOverviewStatisticBlocksProps {
	overviewStats?: IOverviewStatsResponse;
	overviewStatsError: Error | null;
	isLoadingOverviewStats: boolean;
}
export const OverviewStatisticBlocks = ({
	overviewStats,
	overviewStatsError,
	isLoadingOverviewStats,
}: IOverviewStatisticBlocksProps) => {
	if (isLoadingOverviewStats) {
		return <OverviewStatisticBlocksSkeleton />;
	}

	if (overviewStatsError || !overviewStats) {
		return (
			<ErrorAlert
				title="Error loading overview stats"
				description="Please try again later."
			/>
		);
	}
	return (
		<>
			<StatisticBlock
				icon={<CircleFadingArrowUp />}
				title="Inprogress Tasks"
				value={overviewStats.inProgressTasks}
				trend={{
					value: 5,
					direction: "up",
				}}
				footer={{
					primary: "Trending up this week",
					secondary: "Current inprogress tasks",
				}}
			/>
			<StatisticBlock
				icon={<ClockAlert />}
				title="Overdue Tasks"
				value={overviewStats.overdueTasks}
				trend={{
					value: 5,
					direction: "down",
				}}
				footer={{
					primary: "Trending down this week",
					secondary: "Current overdue tasks",
				}}
			/>
			<StatisticBlock
				icon={<UsersRound />}
				title="Active Members"
				value={overviewStats.activeMembers}
				footer={{
					primary: "Trending up this week",
					secondary: "Current active members",
				}}
			/>
			<StatisticBlock
				icon={<FolderKanban />}
				title="Total Projects"
				value={overviewStats.totalProjects}
				footer={{
					primary: "Trending up this week",
					secondary: "Current total projects",
				}}
			/>
		</>
	);
};
