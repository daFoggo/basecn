"use client";

import type { Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { AsyncButton } from "@/components/common/async-button";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import type { IMember } from "@/features/overview";
import { useIsMobile } from "@/lib/hooks/use-mobile";

interface IDeleteMemberDialogProps
	extends ComponentPropsWithoutRef<typeof Dialog> {
	showTrigger?: boolean;
	members: Row<IMember>["original"][];
	deleteMember?: (id: string) => void;
	isDeletingMember?: boolean;
	deleteMemberError?: Error | null;
	bulkDeleteMembers?: (ids: string[]) => void;
	isBulkDeletingMembers?: boolean;
	bulkDeleteMembersError?: Error | null;
}

export function DeleteMemberDialog({
	showTrigger = true,
	members,
	deleteMember,
	isDeletingMember,
	deleteMemberError,
	bulkDeleteMembers,
	isBulkDeletingMembers,
	bulkDeleteMembersError,
	...props
}: IDeleteMemberDialogProps) {
	const isMobile = useIsMobile();
	const isDeleting = useRef(false);

	useEffect(() => {
		if (isDeletingMember || isBulkDeletingMembers) {
			isDeleting.current = true;
		}

		if (!isDeletingMember && !isBulkDeletingMembers && isDeleting.current) {
			isDeleting.current = false;
			props.onOpenChange?.(false);
		}
	}, [isDeletingMember, isBulkDeletingMembers, props.onOpenChange]);

	const handleDelete = () => {
		if (members.length === 1 && deleteMember) {
			deleteMember(members[0].id);
		} else if (bulkDeleteMembers) {
			const ids = members.map((member) => member.id);
			bulkDeleteMembers(ids);
		}
	};

	const isCurrentlyDeleting = isDeletingMember || isBulkDeletingMembers;

	if (isMobile) {
		return (
			<Drawer {...props}>
				{showTrigger ? (
					<DrawerTrigger asChild>
						<Button variant="outline" size="sm">
							<Trash className="mr-2 size-4" aria-hidden="true" />
							Delete ({members.length})
						</Button>
					</DrawerTrigger>
				) : null}
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Are you absolutely sure?</DrawerTitle>
						<DrawerDescription>
							This action cannot be undone. This will permanently delete
							{members.length === 1 ? (
								<span className="font-medium"> {members[0].name}</span>
							) : (
								<span className="font-medium"> {members.length}</span>
							)}
							{members.length === 1 ? " member" : " members"} from your
							projects.
						</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter className="gap-2 sm:space-x-0">
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
						<AsyncButton
							aria-label="Delete selected rows"
							variant="destructive"
							onClick={() => handleDelete()}
							isLoading={isCurrentlyDeleting}
						>
							{isCurrentlyDeleting ? "Deleting..." : "Delete"}
						</AsyncButton>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<Dialog {...props}>
			{showTrigger ? (
				<DialogTrigger asChild>
					<Button variant="outline" size="sm">
						<Trash className="mr-2 size-4" aria-hidden="true" />
						Delete ({members.length})
					</Button>
				</DialogTrigger>
			) : null}
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete
						{members.length === 1 ? (
							<span className="font-medium"> {members[0].name}</span>
						) : (
							<span className="font-medium"> {members.length}</span>
						)}
						{members.length === 1 ? " member" : " members"} from your projects.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="gap-2 sm:space-x-0">
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<AsyncButton
						aria-label="Delete selected rows"
						variant="destructive"
						onClick={() => handleDelete()}
						isLoading={isCurrentlyDeleting}
					>
						{isCurrentlyDeleting ? "Deleting..." : "Delete"}
					</AsyncButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
