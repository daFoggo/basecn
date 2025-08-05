"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import ErrorAlert from "@/components/common/error-alert";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils/tailwind";
import type { ITaskCompletionData } from "../services/overview-stats";
import TaskCompletionBarChartSkeleton from "./skeletons/task-completion-bar-chart-skeleton";

interface ITaskCompletionBarChartProps {
	taskCompletionData: ITaskCompletionData[];
	taskCompletionError: Error | null;
	isLoadingTaskCompletion: boolean;
}

const chartConfig = {
	completed: {
		label: "Completed",
		color: "var(--chart-1)",
	},
	created: {
		label: "Created",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

const TaskCompletionBarChart = ({
	taskCompletionData,
	taskCompletionError,
	isLoadingTaskCompletion,
}: ITaskCompletionBarChartProps) => {
	const [activeChart, setActiveChart] =
		useState<keyof typeof chartConfig>("completed");

	const total = useMemo(
		() => ({
			completed: taskCompletionData.reduce(
				(acc, curr) => acc + curr.completed,
				0,
			),
			created: taskCompletionData.reduce((acc, curr) => acc + curr.created, 0),
		}),
		[taskCompletionData],
	);

	if (isLoadingTaskCompletion) {
		return <TaskCompletionBarChartSkeleton />;
	}

	if (taskCompletionError || !taskCompletionData) {
		return (
			<ErrorAlert
				title="Error loading task completion data"
				description="No data available"
			/>
		);
	}

	return (
		<Card className="py-0 h-full">
			<CardHeader className="flex sm:flex-row flex-col items-stretch !p-0 border-b">
				<div className="flex flex-col flex-1 justify-center gap-1 px-6 sm:!py-0 pt-4 pb-3">
					<CardTitle>Task Completion</CardTitle>
					<CardDescription>
						Showing task completion data for the last 30 days.
					</CardDescription>
				</div>
				<div className="flex">
					{Object.keys(chartConfig).map((key) => {
						const chart = key as keyof typeof chartConfig;
						return (
							<button
								type="button"
								key={chart}
								data-active={activeChart === chart}
								className={cn(
									"z-30 relative flex flex-col flex-1 justify-center gap-1 data-[active=true]:bg-muted/50 px-6 sm:px-8 py-4 sm:py-6 border-t sm:border-t-0 sm:border-l even:border-l text-left",
									chart === "created" ? "sm:rounded-tr-xl" : "",
								)}
								onClick={() => setActiveChart(chart)}
							>
								<span className="text-muted-foreground text-xs">
									{chartConfig[chart].label}
								</span>
								<span className="font-bold text-lg sm:text-3xl leading-none">
									{total[key as keyof typeof total]}
								</span>
							</button>
						);
					})}
				</div>
			</CardHeader>
			<CardContent className="sm:p-6 px-2">
				<ChartContainer
					config={chartConfig}
					className="w-full h-[250px] aspect-auto"
				>
					<BarChart
						accessibilityLayer
						data={taskCompletionData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									className="w-[150px]"
									nameKey="views"
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										});
									}}
								/>
							}
						/>
						<Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default TaskCompletionBarChart;
