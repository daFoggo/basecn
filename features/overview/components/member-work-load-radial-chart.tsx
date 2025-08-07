"use client";

import { PolarGrid, RadialBar, RadialBarChart } from "recharts";
import ErrorAlert from "@/components/common/error-alert";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from "@/components/ui/chart";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import type { IMemberWorkloadData } from "../services/overview-stats";
import { MemberWorkLoadRadialChartSkeleton } from "./skeletons/member-work-load-radial-chart-skeleton";

interface IMemberWorkLoadRadialChartProps {
	memberWorkloadData: IMemberWorkloadData[];
	memberWorkloadError: Error | null;
	isLoadingMemberWorkload: boolean;
}

const formatKeyForChart = (name: string): string => {
	return name.toLowerCase().replace(/[^a-z0-9]/g, "-");
};

const generateDynamicChartConfig = (
	memberData: IMemberWorkloadData[],
): ChartConfig => {
	const config: ChartConfig = {
		workload: {
			label: "Workload",
		},
	};

	memberData.forEach((member, index) => {
		const key = formatKeyForChart(member.member);
		config[key] = {
			label: member.member,
			color: `hsl(var(--chart-${(index % 5) + 1}))`,
		};
	});

	return config;
};

export const MemberWorkLoadRadialChart = ({
	memberWorkloadData,
	memberWorkloadError,
	isLoadingMemberWorkload,
}: IMemberWorkLoadRadialChartProps) => {
	const isMobile = useIsMobile();

	const dynamicChartConfig = generateDynamicChartConfig(memberWorkloadData);

	const transformedChartData = memberWorkloadData.map((data, index) => {
		const memberKey = formatKeyForChart(data.member);
		return {
			name: data.member,
			workload: data.workload,
			fill: `var(--chart-${(index % 5) + 1})`,
			[memberKey]: data.workload,
		};
	});

	const totalWorkload = transformedChartData.reduce(
		(sum, item) => sum + item.workload,
		0,
	);

	const averageWorkload =
		transformedChartData.length > 0
			? Math.round((totalWorkload / transformedChartData.length) * 10) / 10
			: 0;

	const highestWorkloadMember =
		transformedChartData.length > 0
			? transformedChartData.reduce((prev, current) =>
					prev.workload > current.workload ? prev : current,
				)
			: null;

	if (isLoadingMemberWorkload) {
		return <MemberWorkLoadRadialChartSkeleton />;
	}

	if (memberWorkloadError || !memberWorkloadData) {
		return (
			<ErrorAlert
				title="Error loading member workload data"
				description="No member workload data available."
			/>
		);
	}

	return (
		<Card className="flex flex-col h-full">
			<CardHeader className="items-center pb-0">
				<CardTitle>Top Member Workload</CardTitle>
				<CardDescription>
					Top {memberWorkloadData.length} active members by workload
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer config={dynamicChartConfig} className="mx-auto">
					<RadialBarChart
						data={transformedChartData}
						innerRadius={isMobile ? 30 : 60}
						outerRadius={isMobile ? 100 : 150}
					>
						<ChartTooltip
							content={({ active, payload }) => {
								if (active && payload && payload.length) {
									const data = payload[0].payload;
									const color = payload[0].fill || data.fill;
									return (
										<div className="flex justify-between items-center gap-4 bg-background shadow-lg p-2 border border-border rounded-lg">
											<div className="flex items-center gap-2">
												<div
													className="rounded-[2px] w-2.5 h-2.5 shrink-0"
													style={{ backgroundColor: color }}
												/>
												<span className="text-muted-foreground text-xs">
													{data.name}
												</span>
											</div>
											<p className="text-xs">{data.workload}%</p>
										</div>
									);
								}
								return null;
							}}
						/>
						<PolarGrid gridType="circle" />
						<RadialBar dataKey="workload" />
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					Average workload per member: {averageWorkload}%
				</div>
				<div className="flex items-center gap-2 text-muted-foreground">
					{highestWorkloadMember
						? `${highestWorkloadMember.name} has the highest workload (${highestWorkloadMember.workload}%)`
						: "No data available"}
				</div>
			</CardFooter>
		</Card>
	);
};
