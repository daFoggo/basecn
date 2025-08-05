"use client";

import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils/tailwind";

export interface IStatisticBlockProps {
	title: string;
	value: string | number;
	description?: string;
	trend?: {
		value: string | number;
		direction: "up" | "down" | "neutral";
		label?: string;
	};
	footer?: {
		primary: string;
		secondary?: string;
	};
	variant?: "default" | "success" | "warning" | "destructive";
	className?: string;
	valueClassName?: string;
	icon?: ReactNode;
	badge?: {
		text: string;
		variant?: "default" | "secondary" | "destructive" | "outline";
	};
}

const trendIcons = {
	up: TrendingUp,
	down: TrendingDown,
	neutral: Minus,
};

const trendColors = {
	up: "text-green-600 dark:text-green-400",
	down: "text-red-600 dark:text-red-400",
	neutral: "text-gray-600 dark:text-gray-400",
};

const variantStyles = {
	default: "border-border",
	success:
		"border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20",
	warning:
		"border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/20",
	destructive:
		"border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20",
};

export function StatisticBlock({
	title,
	value,
	description,
	trend,
	footer,
	variant = "default",
	className,
	valueClassName,
	icon,
	badge,
}: IStatisticBlockProps) {
	const TrendIcon = trend ? trendIcons[trend.direction] : null;
	const trendColorClass = trend ? trendColors[trend.direction] : "";

	return (
		<Card className={cn("@container/card", variantStyles[variant], className)}>
			<CardHeader className="space-y-2">
				<div className="flex justify-between items-center">
					<div className="flex-1 space-y-1">
						{description && (
							<p className="text-muted-foreground text-sm">{description}</p>
						)}
						<h3 className="font-medium text-muted-foreground text-sm">
							{title}
						</h3>
					</div>
					{icon && <div className="text-muted-foreground">{icon}</div>}
				</div>

				<div className="flex justify-between items-center">
					<div
						className={cn(
							"font-semibold tabular-nums text-2xl @[250px]/card:text-3xl @[350px]/card:text-4xl",
							valueClassName,
						)}
					>
						{typeof value === "number" ? value.toLocaleString() : value}
					</div>

					{(trend || badge) && (
						<div className="flex items-center gap-2">
							{trend && (
								<Badge
									variant="outline"
									className={cn("gap-1", trendColorClass)}
								>
									{TrendIcon && <TrendIcon className="size-3" />}
									{typeof trend.value === "number" &&
									trend.direction !== "neutral"
										? `${trend.direction === "up" ? "+" : ""}${trend.value}%`
										: trend.value}
								</Badge>
							)}

							{badge && (
								<Badge variant={badge.variant || "outline"}>{badge.text}</Badge>
							)}
						</div>
					)}
				</div>
			</CardHeader>

			{footer && (
				<CardFooter className="flex-col items-start gap-1.5 pt-0 text-sm">
					<div className="flex items-center gap-2 font-medium">
						{footer.primary}
						{trend && TrendIcon && (
							<TrendIcon className={cn("size-4", trendColorClass)} />
						)}
					</div>
					{footer.secondary && (
						<div className="text-muted-foreground line-clamp-2">
							{footer.secondary}
						</div>
					)}
				</CardFooter>
			)}
		</Card>
	);
}
