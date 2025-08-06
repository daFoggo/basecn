"use client";

import PageHeading from "@/components/common/page-heading";
import { useOverviewStatsSWR } from "../hooks/use-overview-stats-swr";
import { MemberWorkLoadRadialChart } from "./member-work-load-radial-chart";
import { OverviewStatisticBlocks } from "./overview-statistic-blocks";
import ProjectProgressLineChart from "./project-progress-line-chart";
import TaskCompletionBarChart from "./task-completion-bar-chart";
import TopPerformers from "./top-performers";

export const Overview = () => {
	const {
		overviewStats,
		overviewStatsError,
		isLoadingOverviewStats,

		taskCompletionData,
		taskCompletionError,
		isLoadingTaskCompletion,

		topPerformersData,
		topPerformersError,
		isLoadingTopPerformers,

		memberWorkloadData,
		memberWorkloadError,
		isLoadingMemberWorkload,

		projectProgressData,
		projectProgressError,
		isLoadingProjectProgress,
	} = useOverviewStatsSWR();

	return (
		<div className="flex flex-col gap-6">
			<PageHeading title="Wazzup my N-word 🤟" />
			<div className="gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/10 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs">
				<OverviewStatisticBlocks
					overviewStats={overviewStats}
					overviewStatsError={overviewStatsError}
					isLoadingOverviewStats={isLoadingOverviewStats}
				/>
			</div>
			<div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
				<div className="col-span-4">
					<TaskCompletionBarChart
						taskCompletionData={taskCompletionData || []}
						taskCompletionError={taskCompletionError}
						isLoadingTaskCompletion={isLoadingTaskCompletion}
					/>
				</div>
				<div className="col-span-4 md:col-span-3">
					<TopPerformers
						topPerformersData={topPerformersData || []}
						topPerformersError={topPerformersError}
						isLoadingTopPerformers={isLoadingTopPerformers}
					/>
				</div>
				<div className="col-span-4">
					<ProjectProgressLineChart
						projectProgressData={projectProgressData || []}
						projectProgressError={projectProgressError}
						isLoadingProjectProgress={isLoadingProjectProgress}
					/>
				</div>
				<div className="col-span-4 md:col-span-3">
					<MemberWorkLoadRadialChart
						memberWorkloadData={memberWorkloadData || []}
						memberWorkloadError={memberWorkloadError}
						isLoadingMemberWorkload={isLoadingMemberWorkload}
					/>
				</div>
			</div>
		</div>
	);
};
