import { Badge } from "@/components/ui/badge";
import { MEMBER_STATUS } from "@/features/overview";
import { cn } from "@/lib/utils/tailwind";

interface IMemberStatusBadgeProps {
    status: MEMBER_STATUS;
    className?: string;
}

export const MemberStatusBadge = ({ status, className }: IMemberStatusBadgeProps) => {
    const getStatusConfig = (status: MEMBER_STATUS) => {
        switch (status) {
            case MEMBER_STATUS.ACTIVE:
                return {
                    text: "Active",
                    className: "bg-green-500/10 text-green-500"
                };
            case MEMBER_STATUS.INACTIVE:
                return {
                    text: "Inactive",
                    className: "bg-red-500/10 text-red-500"
                };
            case MEMBER_STATUS.ON_LEAVE:
                return {
                    text: "On Leave",
                    className: "bg-yellow-500/10 text-yellow-500"
                };
            default:
                return {
                    text: status,
                    className: "bg-gray-500/10 text-gray-500"
                };
        }
    };

    const config = getStatusConfig(status);

    return (
        <Badge
            className={cn(
                "font-medium text-xs",
                config.className,
                className
            )}
        >
            {config.text}
        </Badge>
    );
};