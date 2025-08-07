import { useMemo } from "react";
import { cn } from "@/lib/utils/tailwind";

export interface LoaderProps {
	variant?:
		| "circular"
		| "classic"
		| "pulse"
		| "pulse-dot"
		| "dots"
		| "typing"
		| "wave"
		| "bars"
		| "terminal"
		| "text-blink"
		| "text-shimmer"
		| "loading-dots";
	size?: "sm" | "md" | "lg";
	text?: string;
	className?: string;
}

export function CircularLoader({
	className,
	size = "md",
	text,
}: {
	className?: string;
	size?: "sm" | "md" | "lg";
	text?: string;
}) {
	const sizeClasses = {
		sm: "size-4",
		md: "size-5",
		lg: "size-6",
	};

	const textSizes = {
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base",
	};

	return (
		<div className={cn("flex flex-col items-center gap-2", className)}>
			<div
				className={cn(
					"border-2 border-primary border-t-transparent rounded-full animate-spin",
					sizeClasses[size],
				)}
			>
				<span className="sr-only">Loading</span>
			</div>
			{text && (
				<span
					className={cn("font-medium text-muted-foreground", textSizes[size])}
				>
					{text}
				</span>
			)}
		</div>
	);
}

export function ClassicLoader({
	className,
	size = "md",
	text,
}: {
	className?: string;
	size?: "sm" | "md" | "lg";
	text?: string;
}) {
	const sizeClasses = {
		sm: "size-4",
		md: "size-5",
		lg: "size-6",
	};

	const textSizes = {
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base",
	};

	const barSizes = {
		sm: { height: "6px", width: "1.5px" },
		md: { height: "8px", width: "2px" },
		lg: { height: "10px", width: "2.5px" },
	};

	const spinnerBars = useMemo(
		() =>
			Array.from({ length: 12 }, (_, i) => ({
				id: `spinner-bar-${i * 30}deg`,
				rotation: i * 30,
				delay: i * 0.1,
			})),
		[],
	);

	return (
		<div className={cn("flex flex-col items-center gap-2", className)}>
			<div className={cn("relative", sizeClasses[size])}>
				<div className="absolute w-full h-full">
					{spinnerBars.map((bar) => (
						<div
							key={bar.id}
							className="absolute bg-primary rounded-full animate-[spinner-fade_1.2s_linear_infinite]"
							style={{
								top: "0",
								left: "50%",
								marginLeft:
									size === "sm"
										? "-0.75px"
										: size === "lg"
											? "-1.25px"
											: "-1px",
								transformOrigin: `${
									size === "sm" ? "0.75px" : size === "lg" ? "1.25px" : "1px"
								} ${size === "sm" ? "10px" : size === "lg" ? "14px" : "12px"}`,
								transform: `rotate(${bar.rotation}deg)`,
								opacity: 0,
								animationDelay: `${bar.delay}s`,
								height: barSizes[size].height,
								width: barSizes[size].width,
							}}
						/>
					))}
				</div>
				<span className="sr-only">Loading</span>
			</div>
			{text && (
				<span
					className={cn("font-medium text-muted-foreground", textSizes[size])}
				>
					{text}
				</span>
			)}
		</div>
	);
}

export function PulseLoader({
	className,
	size = "md",
	text,
}: {
	className?: string;
	size?: "sm" | "md" | "lg";
	text?: string;
}) {
	const sizeClasses = {
		sm: "size-4",
		md: "size-5",
		lg: "size-6",
	};

	const textSizes = {
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base",
	};

	return (
		<div className={cn("flex flex-col items-center gap-2", className)}>
			<div className={cn("relative", sizeClasses[size])}>
				<div className="absolute inset-0 border-2 border-primary rounded-full animate-[thin-pulse_1.5s_ease-in-out_infinite]" />
				<span className="sr-only">Loading</span>
			</div>
			{text && (
				<span
					className={cn("font-medium text-muted-foreground", textSizes[size])}
				>
					{text}
				</span>
			)}
		</div>
	);
}

export function PulseDotLoader({
	className,
	size = "md",
	text,
}: {
	className?: string;
	size?: "sm" | "md" | "lg";
	text?: string;
}) {
	const sizeClasses = {
		sm: "size-1",
		md: "size-2",
		lg: "size-3",
	};

	const textSizes = {
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base",
	};

	return (
		<div className={cn("flex flex-col items-center gap-2", className)}>
			<div
				className={cn(
					"bg-primary rounded-full animate-[pulse-dot_1.2s_ease-in-out_infinite]",
					sizeClasses[size],
				)}
			>
				<span className="sr-only">Loading</span>
			</div>
			{text && (
				<span
					className={cn("font-medium text-muted-foreground", textSizes[size])}
				>
					{text}
				</span>
			)}
		</div>
	);
}

export function DotsLoader({
	className,
	size = "md",
	text,
}: {
	className?: string;
	size?: "sm" | "md" | "lg";
	text?: string;
}) {
	const dotSizes = {
		sm: "h-1.5 w-1.5",
		md: "h-2 w-2",
		lg: "h-2.5 w-2.5",
	};

	const containerSizes = {
		sm: "h-4",
		md: "h-5",
		lg: "h-6",
	};

	const textSizes = {
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base",
	};

	const dots = useMemo(
		() =>
			Array.from({ length: 3 }, (_, i) => ({
				id: `dot-${i}`,
				delay: i * 160,
			})),
		[],
	);

	return (
		<div className={cn("flex items-center gap-4", className)}>
			<div className={cn("flex items-center space-x-1", containerSizes[size])}>
				{dots.map((dot) => (
					<div
						key={dot.id}
						className={cn(
							"bg-primary rounded-full animate-[bounce-dots_1.4s_ease-in-out_infinite]",
							dotSizes[size],
						)}
						style={{
							animationDelay: `${dot.delay}ms`,
						}}
					/>
				))}
				<span className="sr-only">Loading</span>
			</div>
			{text && (
				<span
					className={cn("font-medium text-muted-foreground", textSizes[size])}
				>
					{text}
				</span>
			)}
		</div>
	);
}

export function TypingLoader({
	className,
	size = "md",
	text,
}: {
	className?: string;
	size?: "sm" | "md" | "lg";
	text?: string;
}) {
	const dotSizes = {
		sm: "h-1 w-1",
		md: "h-1.5 w-1.5",
		lg: "h-2 w-2",
	};

	const containerSizes = {
		sm: "h-4",
		md: "h-5",
		lg: "h-6",
	};

	const textSizes = {
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base",
	};

	const typingDots = useMemo(
		() =>
			Array.from({ length: 3 }, (_, i) => ({
				id: `typing-dot-${i}`,
				delay: i * 250,
			})),
		[],
	);

	return (
		<div className={cn("flex items-center gap-4", className)}>
			{text && (
				<span
					className={cn("font-medium text-muted-foreground", textSizes[size])}
				>
					{text}
				</span>
			)}
			<div className={cn("flex items-center space-x-1", containerSizes[size])}>
				{typingDots.map((dot) => (
					<div
						key={dot.id}
						className={cn(
							"bg-primary rounded-full animate-[typing_1s_infinite]",
							dotSizes[size],
						)}
						style={{
							animationDelay: `${dot.delay}ms`,
						}}
					/>
				))}
				<span className="sr-only">Loading</span>
			</div>
		</div>
	);
}

export function WaveLoader({
	className,
	size = "md",
	text,
}: {
	className?: string;
	size?: "sm" | "md" | "lg";
	text?: string;
}) {
	const barWidths = {
		sm: "w-0.5",
		md: "w-0.5",
		lg: "w-1",
	};

	const containerSizes = {
		sm: "h-4",
		md: "h-5",
		lg: "h-6",
	};

	const textSizes = {
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base",
	};

	const waveBars = useMemo(
		() => {
			const heights = {
				sm: ["6px", "9px", "12px", "9px", "6px"],
				md: ["8px", "12px", "16px", "12px", "8px"],
				lg: ["10px", "15px", "20px", "15px", "10px"],
			};

			return Array.from({ length: 5 }, (_, i) => ({
				id: `wave-bar-${i}`,
				delay: i * 100,
				height: heights[size][i],
			}));
		},
		[size],
	);

	return (
		<div className={cn("flex items-center gap-4", className)}>
			<div className={cn("flex items-center gap-0.5", containerSizes[size])}>
				{waveBars.map((bar) => (
					<div
						key={bar.id}
						className={cn(
							"bg-primary rounded-full animate-[wave_1s_ease-in-out_infinite]",
							barWidths[size],
						)}
						style={{
							animationDelay: `${bar.delay}ms`,
							height: bar.height,
						}}
					/>
				))}
				<span className="sr-only">Loading</span>
			</div>
			{text && (
				<span
					className={cn("font-medium text-muted-foreground", textSizes[size])}
				>
					{text}
				</span>
			)}
		</div>
	);
}

export function BarsLoader({
	className,
	size = "md",
	text,
}: {
	className?: string;
	size?: "sm" | "md" | "lg";
	text?: string;
}) {
	const barWidths = {
		sm: "w-1",
		md: "w-1.5",
		lg: "w-2",
	};

	const containerSizes = {
		sm: "h-4 gap-1",
		md: "h-5 gap-1.5",
		lg: "h-6 gap-2",
	};

	const textSizes = {
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base",
	};

	const bars = useMemo(
		() =>
			Array.from({ length: 3 }, (_, i) => ({
				id: `bar-${i}`,
				delay: i * 0.2,
			})),
		[],
	);

	return (
		<div className={cn("flex items-center gap-4", className)}>
			<div className={cn("flex", containerSizes[size])}>
				{bars.map((bar) => (
					<div
						key={bar.id}
						className={cn(
							"bg-primary h-full animate-[wave-bars_1.2s_ease-in-out_infinite]",
							barWidths[size],
						)}
						style={{
							animationDelay: `${bar.delay}s`,
						}}
					/>
				))}
				<span className="sr-only">Loading</span>
			</div>
			{text && (
				<span
					className={cn("font-medium text-muted-foreground", textSizes[size])}
				>
					{text}
				</span>
			)}
		</div>
	);
}

export function TerminalLoader({
	className,
	text = "Loading",
	size = "md",
}: {
	className?: string;
	text?: string;
	size?: "sm" | "md" | "lg";
}) {
	const cursorSizes = {
		sm: "h-3 w-1.5",
		md: "h-4 w-2",
		lg: "h-5 w-2.5",
	};

	const textSizes = {
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base",
	};

	const containerSizes = {
		sm: "h-4",
		md: "h-5",
		lg: "h-6",
	};

	return (
		<div className="flex flex-col items-start gap-1">
			<div
				className={cn(
					"flex items-center space-x-1",
					containerSizes[size],
					className,
				)}
			>
				<span className={cn("font-mono text-primary", textSizes[size])}>
					{">"}
				</span>
				<div
					className={cn(
						"bg-primary animate-[blink_1s_step-end_infinite]",
						cursorSizes[size],
					)}
				/>
			</div>
			<span className={cn("font-mono text-primary", textSizes[size])}>
				{text}
			</span>
		</div>
	);
}

export function TextBlinkLoader({
	text = "Thinking",
	className,
	size = "md",
}: {
	text?: string;
	className?: string;
	size?: "sm" | "md" | "lg";
}) {
	const textSizes = {
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base",
	};

	return (
		<div
			className={cn(
				"font-medium animate-[text-blink_2s_ease-in-out_infinite]",
				textSizes[size],
				className,
			)}
		>
			{text}
		</div>
	);
}

export function TextShimmerLoader({
	text = "Thinking",
	className,
	size = "md",
}: {
	text?: string;
	className?: string;
	size?: "sm" | "md" | "lg";
}) {
	const textSizes = {
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base",
	};

	return (
		<div
			className={cn(
				"bg-[linear-gradient(to_right,var(--muted-foreground)_40%,var(--foreground)_60%,var(--muted-foreground)_80%)]",
				"bg-[200%_auto] bg-clip-text font-medium text-transparent",
				"animate-[shimmer_4s_infinite_linear]",
				textSizes[size],
				className,
			)}
		>
			{text}
		</div>
	);
}

export function TextDotsLoader({
	className,
	text = "Thinking",
	size = "md",
}: {
	className?: string;
	text?: string;
	size?: "sm" | "md" | "lg";
}) {
	const textSizes = {
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base",
	};

	const textDots = useMemo(
		() => [
			{ id: "text-dot-1", delay: "0.2s" },
			{ id: "text-dot-2", delay: "0.4s" },
			{ id: "text-dot-3", delay: "0.6s" },
		],
		[],
	);

	return (
		<div className={cn("inline-flex items-center", className)}>
			<span className={cn("font-medium text-primary", textSizes[size])}>
				{text}
			</span>
			<span className="inline-flex">
				{textDots.map((dot) => (
					<span
						key={dot.id}
						className="text-primary animate-[loading-dots_1.4s_infinite]"
						style={{ animationDelay: dot.delay }}
					>
						.
					</span>
				))}
			</span>
		</div>
	);
}

function Loader({
	variant = "circular",
	size = "md",
	text,
	className,
}: LoaderProps) {
	switch (variant) {
		case "circular":
			return <CircularLoader size={size} text={text} className={className} />;
		case "classic":
			return <ClassicLoader size={size} text={text} className={className} />;
		case "pulse":
			return <PulseLoader size={size} text={text} className={className} />;
		case "pulse-dot":
			return <PulseDotLoader size={size} text={text} className={className} />;
		case "dots":
			return <DotsLoader size={size} text={text} className={className} />;
		case "typing":
			return <TypingLoader size={size} text={text} className={className} />;
		case "wave":
			return <WaveLoader size={size} text={text} className={className} />;
		case "bars":
			return <BarsLoader size={size} text={text} className={className} />;
		case "terminal":
			return <TerminalLoader text={text} size={size} className={className} />;
		case "text-blink":
			return <TextBlinkLoader text={text} size={size} className={className} />;
		case "text-shimmer":
			return (
				<TextShimmerLoader text={text} size={size} className={className} />
			);
		case "loading-dots":
			return <TextDotsLoader text={text} size={size} className={className} />;
		default:
			return <CircularLoader size={size} text={text} className={className} />;
	}
}

export { Loader };