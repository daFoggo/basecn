"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
	ChartTooltipContent,
} from "@/components/ui/chart";
import type { IProjectProgressData } from "../services/overview-stats";
import ProjectProgressLineChartSkeleton from "./skeletons/project-progress-line-chart-skeleton";

interface IProjectProgressLineChartProps {
	projectProgressData: IProjectProgressData[];
	projectProgressError: Error | null;
	isLoadingProjectProgress: boolean;
}

const chartConfig = {
	webApp: {
		label: "Web App",
		color: "var(--chart-1)",
	},
	mobileApp: {
		label: "Mobile App",
		color: "var(--chart-2)",
	},
	design: {
		label: "Design",
		color: "var(--chart-3)",
	},
} satisfies ChartConfig;

const ProjectProgressLineChart = ({
	projectProgressData,
	projectProgressError,
	isLoadingProjectProgress,
}: IProjectProgressLineChartProps) => {
	if (isLoadingProjectProgress) {
		return <ProjectProgressLineChartSkeleton />;
	}

	if (projectProgressError || !projectProgressData) {
		return (
			<ErrorAlert
				title="Error loading project progress"
				description="No project progress data available."
			/>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Project Progress</CardTitle>
				<CardDescription>Progress for the last 6 months</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={projectProgressData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<Line
							dataKey="webApp"
							type="monotone"
							stroke="var(--color-webApp)"
							strokeWidth={2}
							dot={true}
						/>
						<Line
							dataKey="mobileApp"
							type="monotone"
							stroke="var(--color-mobileApp)"
							strokeWidth={2}
							dot={true}
						/>
						<Line
							dataKey="design"
							type="monotone"
							stroke="var(--color-design)"
							strokeWidth={2}
							dot={true}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex items-start gap-2 w-full text-sm">
					<div className="gap-2 grid">
						<div className="flex items-center gap-2 font-medium leading-none">
							Overall progress trending up <TrendingUp className="size-4" />
						</div>
						<div className="flex items-center gap-2 text-muted-foreground leading-none">
							Design projects show stronger growth in later periods
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default ProjectProgressLineChart;
