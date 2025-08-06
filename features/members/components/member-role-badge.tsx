import {
	Brush,
	Bug,
	Code,
	ShieldUser,
	User,
	UserRoundCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MEMBER_ROLE } from "@/features/overview";
import { cn } from "@/lib/utils/tailwind";

interface IMemberRoleBadgeProps {
	role: MEMBER_ROLE;
	className?: string;
}

export const MemberRoleBadge = ({ role, className }: IMemberRoleBadgeProps) => {
	const getRoleConfig = (role: MEMBER_ROLE) => {
		switch (role) {
			case MEMBER_ROLE.ADMIN:
				return {
					text: "Admin",
					className: "bg-purple-500/10 text-purple-500",
					icon: <ShieldUser />,
				};
			case MEMBER_ROLE.PROJECT_MANAGER:
				return {
					text: "Project Manager",
					className: "bg-blue-500/10 text-blue-500",
					icon: <UserRoundCheck />,
				};
			case MEMBER_ROLE.DEVELOPER:
				return {
					text: "Developer",
					className: "bg-green-500/10 text-green-500",
					icon: <Code />,
				};
			case MEMBER_ROLE.DESIGNER:
				return {
					text: "Designer",
					className: "bg-pink-500/10 text-pink-500",
					icon: <Brush />,
				};
			case MEMBER_ROLE.TESTER:
				return {
					text: "Tester",
					className: "bg-orange-500/10 text-orange-500",
					icon: <Bug />,
				};
			case MEMBER_ROLE.MEMBER:
				return {
					text: "Member",
					className: "bg-gray-500/10 text-gray-500",
					icon: <User />,
				};
			default:
				return {
					text: role,
					className: "bg-gray-500/10 text-gray-500",
					icon: <User />,
				};
		}
	};

	const config = getRoleConfig(role);

	return (
		<Badge
			className={cn("gap-1 font-medium text-xs", config.className, className)}
		>
			{config.icon}
			{config.text}
		</Badge>
	);
};
