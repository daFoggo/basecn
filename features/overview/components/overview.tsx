"use client";
import {
	CircleFadingArrowUp,
	ClockAlert,
	FolderKanban,
	UsersRound,
} from "lucide-react";
import ErrorAlert from "@/components/common/error-alert";
import PageHeading from "@/components/common/page-heading";
import { PageLoading } from "@/components/common/page-loading";
import { StatisticBlock } from "@/components/common/statistic-block";
import { useOverviewStatsSWR } from "../hooks/use-overview-stats-swr";

export const Overview = () => {
	const { overviewStats, overviewStatsError, isLoadingOverviewStats } =
		useOverviewStatsSWR();

	if (isLoadingOverviewStats) {
		return <PageLoading variant="dots" text="Loading overview stats..." />;
	}

	if (overviewStatsError || !overviewStats) {
		return (
			<ErrorAlert
				title="Error fetching overview stats"
				description="Please try again later."
			/>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<PageHeading title="Wazzup my N-word 🤟" />
			<div className="gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs">
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
					trend={{
						value: 1,
						direction: "up",
					}}
					footer={{
						primary: "Trending up this week",
						secondary: "Current active members",
					}}
				/>
				<StatisticBlock
					icon={<FolderKanban />}
					title="Total Projects"
					value={overviewStats.totalProjects}
					trend={{
						value: 2,
						direction: "up",
					}}
					footer={{
						primary: "Trending up this week",
						secondary: "Current total projects",
					}}
				/>
			</div>
		</div>
	);
};
