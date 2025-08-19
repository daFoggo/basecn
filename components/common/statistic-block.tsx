"use client"

import { Minus, TrendingDown, TrendingUp } from 'lucide-react'
import type { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils/tailwind"

export interface IStatisticBlockProps {
	title: string
	value: string | number
	description?: string
	trend?: {
		value: string | number
		direction: "up" | "down" | "neutral"
		label?: string
	}
	footer?: {
		primary: string
		secondary?: string
	}
	variant?: "default" | "success" | "warning" | "destructive"
	size?: "default" | "medium" | "small"
	className?: string
	valueClassName?: string
	icon?: ReactNode
	badge?: {
		text: string
		variant?: "default" | "secondary" | "destructive" | "outline"
	}
}

const trendIcons = {
	up: TrendingUp,
	down: TrendingDown,
	neutral: Minus,
}

const trendColors = {
	up: "text-green-600 dark:text-green-400",
	down: "text-red-600 dark:text-red-400",
	neutral: "text-gray-600 dark:text-gray-400",
}

const variantStyles = {
	default: "border-border",
	success: "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20",
	warning: "border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/20",
	destructive: "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20",
}

const sizeStyles = {
	default: {
		header: "space-y-2",
		description: "text-sm",
		title: "text-sm",
		value: "text-2xl @[250px]/card:text-3xl @[350px]/card:text-4xl",
		icon: "size-5",
		trendIcon: "size-3",
		footerTrendIcon: "size-4",
		footer: "gap-1.5 pt-0 text-sm",
		badge: "gap-1",
	},
	medium: {
		header: "space-y-1.5",
		description: "text-xs",
		title: "text-xs",
		value: "text-xl @[200px]/card:text-2xl @[300px]/card:text-3xl",
		icon: "size-4",
		trendIcon: "size-2.5",
		footerTrendIcon: "size-3.5",
		footer: "gap-1 pt-0 text-xs",
		badge: "gap-0.5 text-xs px-1.5 py-0.5",
	},
	small: {
		header: "space-y-1",
		description: "text-xs",
		title: "text-xs",
		value: "text-lg @[150px]/card:text-xl @[250px]/card:text-2xl",
		icon: "size-3.5",
		trendIcon: "size-2",
		footerTrendIcon: "size-3",
		footer: "gap-0.5 pt-0 text-xs",
		badge: "gap-0.5 text-xs px-1 py-0.5",
	},
}

export function StatisticBlock({
	title,
	value,
	description,
	trend,
	footer,
	variant = "default",
	size = "default",
	className,
	valueClassName,
	icon,
	badge,
}: IStatisticBlockProps) {
	const TrendIcon = trend ? trendIcons[trend.direction] : null
	const trendColorClass = trend ? trendColors[trend.direction] : ""
	const styles = sizeStyles[size]

	return (
		<Card className={cn("@container/card", variantStyles[variant], className)}>
			<CardHeader className={cn(styles.header)}>
				<div className="flex justify-between items-center">
					<div className="flex-1 space-y-1">
						{description && <p className={cn("text-muted-foreground", styles.description)}>{description}</p>}
						<h3 className={cn("font-medium text-muted-foreground", styles.title)}>{title}</h3>
					</div>
					{icon && <div className={cn("text-muted-foreground", styles.icon)}>{icon}</div>}
				</div>

				<div className="flex justify-between items-center">
					<div className={cn("font-semibold tabular-nums", styles.value, valueClassName)}>
						{typeof value === "number" ? value.toLocaleString() : value}
					</div>

					{(trend || badge) && (
						<div className="flex items-center gap-2">
							{trend && (
								<Badge variant="outline" className={cn(styles.badge, trendColorClass)}>
									{TrendIcon && <TrendIcon className={styles.trendIcon} />}
									{typeof trend.value === "number" && trend.direction !== "neutral"
										? `${trend.direction === "up" ? "+" : ""}${trend.value}%`
										: trend.value}
								</Badge>
							)}

							{badge && (
								<Badge variant={badge.variant || "outline"} className={cn(size !== "default" && styles.badge)}>
									{badge.text}
								</Badge>
							)}
						</div>
					)}
				</div>
			</CardHeader>

			{footer && (
				<CardFooter className={cn("flex-col items-start", styles.footer)}>
					<div className="flex items-center gap-2 font-medium">
						{footer.primary}
						{trend && TrendIcon && <TrendIcon className={cn(styles.footerTrendIcon, trendColorClass)} />}
					</div>
					{footer.secondary && <div className="text-muted-foreground line-clamp-2">{footer.secondary}</div>}
				</CardFooter>
			)}
		</Card>
	)
}
