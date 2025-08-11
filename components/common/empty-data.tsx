import { FolderSearch } from "lucide-react";
import { cn } from "@/lib/utils/tailwind";

interface IEmptyDataProps {
	icon?: (className: string) => React.ReactNode;
	message: string;
	messageClassName?: string;
	iconClassName?: string;
}

const EmptyData = ({
	icon = (className) => <FolderSearch className={className} />,
	message,
	iconClassName,
	messageClassName,
}: IEmptyDataProps) => {
	return (
		<div className="flex flex-col justify-center items-center gap-4 w-full h-full text-muted-foreground">
			{icon(cn("size-12", iconClassName))}
			<p className={cn("text-center", messageClassName)}>{message}</p>
		</div>
	);
};

export default EmptyData;
