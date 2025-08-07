import { FolderSearch } from "lucide-react";
import { cn } from "@/lib/utils/tailwind";

interface IEmptyDataProps {
	message: string;
	messageClassName?: string;
	iconClassName?: string;
}
const EmptyData = ({
	message,
	iconClassName,
	messageClassName,
}: IEmptyDataProps) => {
	return (
		<div className="flex flex-col justify-center items-center gap-4 w-full h-full text-muted-foreground">
			<FolderSearch className={cn("size-12", iconClassName)} />
			<p className={cn("", messageClassName)}>{message}</p>
		</div>
	);
};

export default EmptyData;
