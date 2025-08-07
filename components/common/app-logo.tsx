import { LayoutPanelLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/tailwind";
import { APP_INFO } from "../../lib/configs/app-info";

interface IAppLogoProps {
	showText?: boolean;
	showIcon?: boolean;
	containerClassName?: string;
	iconClassName?: string;
	textClassName?: string;
	navigateTo?: string;
}

const AppLogo = ({
	showText = true,
	showIcon = true,
	containerClassName,
	iconClassName,
	textClassName,
	navigateTo = "/",
}: IAppLogoProps) => {
	return (
		<Link href={navigateTo}>
			<div
				className={cn("flex items-center gap-2 font-bold", containerClassName)}
			>
				{showIcon && (
					<LayoutPanelLeft className={cn("size-6", iconClassName)} />
				)}
				{showText && (
					<span className={cn("hidden lg:block", textClassName)}>
						{APP_INFO.name}
					</span>
				)}
			</div>
		</Link>
	);
};

export default AppLogo;
