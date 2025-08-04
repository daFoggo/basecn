"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/features/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface IUserMenu {
	shouldShowGoToApp?: boolean;
}
export const UserMenu = ({ shouldShowGoToApp = false }: IUserMenu) => {
	const { isAuthenticated, isLoading, user, logout } = useAuthContext();

	if (isLoading) return <Skeleton className="rounded-full size-6" />;

	if (isAuthenticated) {
		if (shouldShowGoToApp) {
			return (
				<Link href="/dashboard">
					<Button className="rounded-full w-full">
						Go to App
						<ChevronRight className="ml-2 size-4" />
					</Button>
				</Link>
			);
		}
		
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar>
						<AvatarImage src={user?.image} alt={user?.userName} />
						<AvatarFallback>
							{user?.userName?.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="center">
					<DropdownMenuLabel className="flex flex-col items-start">
						{user?.userName}
						{user?.email && (
							<span className="text-muted-foreground text-xs">{user.email}</span>
						)}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>Settings</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	return (
		<Link href="/auth/login">
			<Button className="rounded-full w-full">
				Login
				<ChevronRight className="ml-2 size-4" />
			</Button>
		</Link>
	);
};