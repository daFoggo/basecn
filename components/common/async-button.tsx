"use client";

import type { VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { Button, type buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";

interface AsyncButtonProps
	extends React.ComponentProps<typeof Button>,
		VariantProps<typeof buttonVariants> {
	isLoading?: boolean;
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
	loadingText?: string;
}

const AsyncButton = React.forwardRef<HTMLButtonElement, AsyncButtonProps>(
	(
		{
			children,
			isLoading = false,
			icon,
			iconPosition = "left",
			loadingText,
			disabled,
			className,
			...props
		},
		ref,
	) => {
		const isButtonDisabled = disabled || isLoading;

		const buttonContent = React.useMemo(() => {
			const text = isLoading && loadingText ? loadingText : children;
			const displayIcon = isLoading ? (
				<Loader2 className="size-4 animate-spin" />
			) : (
				icon
			);

			if (!displayIcon) {
				return text;
			}

			return iconPosition === "right" ? (
				<>
					{text}
					{displayIcon}
				</>
			) : (
				<>
					{displayIcon}
					{text}
				</>
			);
		}, [isLoading, loadingText, children, icon, iconPosition]);

		return (
			<Button
				ref={ref}
				disabled={isButtonDisabled}
				className={cn(className)}
				aria-busy={isLoading}
				aria-disabled={isButtonDisabled}
				data-loading={isLoading}
				{...props}
			>
				{buttonContent}
			</Button>
		);
	},
);

AsyncButton.displayName = "AsyncButton";

export { AsyncButton, type AsyncButtonProps };
