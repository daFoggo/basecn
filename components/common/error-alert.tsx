import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import type React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface IErrorAlertProps {
	title?: string;
	description?: string | React.ReactNode;
	variant?: "destructive" | "warning" | "info" | "success";
	showCloseButton?: boolean;
	onClose?: () => void;
	className?: string;
	children?: React.ReactNode;
}

const ErrorAlert = ({
	title = "Đã xảy ra lỗi",
	description = "Vui lòng thử lại sau.",
	variant = "destructive",
	showCloseButton = false,
	onClose,
	className = "",
	children,
}: IErrorAlertProps) => {
	const iconMap = {
		destructive: AlertCircle,
		warning: AlertCircle,
		info: Info,
		success: CheckCircle2,
	};

	const shadcnVariant = variant === "destructive" ? "destructive" : "default";

	const Icon = iconMap[variant];

	return (
		<Alert
			variant={shadcnVariant as "default" | "destructive"}
			className={`relative ${className}`}
		>
			<Icon className="size-4" />

			{showCloseButton && (
				<button
					type="button"
					onClick={onClose}
					className="top-4 right-4 absolute opacity-70 hover:opacity-100 rounded-sm focus:outline-none focus:ring-2 focus:ring-ring ring-offset-background focus:ring-offset-2 transition-opacity disabled:pointer-events-none"
					aria-label="Đóng thông báo"
				>
					<X className="size-4" />
				</button>
			)}

			<AlertTitle>{title}</AlertTitle>

			<AlertDescription>
				{typeof description === "string" ? <p>{description}</p> : description}
				{children}
			</AlertDescription>
		</Alert>
	);
};

export default ErrorAlert;
