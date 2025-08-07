"use client";

import { useMemo, useState } from "react";
import ErrorAlert from "@/components/common/error-alert";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import type { IMember } from "@/features/overview";
import { useDataTable } from "@/lib/hooks/use-data-table";
import type { DataTableRowAction } from "@/lib/types/data-table";
import { DeleteMemberDialog } from "./delete-member-dialog";
import { getMembersColumnConfig } from "./members-column-config";
import MembersTableActionBar from "./members-table-action-bar";
import { UpdateMemberDialog } from "./update-member-dialog";

interface IMembersTableProps {
	membersData: IMember[];
	membersError?: Error | null;
	isLoadingMembers: boolean;

	updateMember?: (id: string, data: Partial<IMember>) => void;
	isUpdatingMember?: boolean;
	updateMemberError?: Error | null;

	deleteMember?: (id: string) => void;
	isDeletingMember?: boolean;
	deleteMemberError?: Error | null;

	bulkDeleteMembers?: (ids: string[]) => void;
	isBulkDeletingMembers?: boolean;
	bulkDeleteMembersError?: Error | null;
}

const MembersTable = ({
	membersData,
	isLoadingMembers,
	membersError,

	updateMember,
	isUpdatingMember,
	updateMemberError,

	deleteMember,
	isDeletingMember,
	deleteMemberError,

	bulkDeleteMembers,
	isBulkDeletingMembers,
	bulkDeleteMembersError,
}: IMembersTableProps) => {
	const [rowAction, setRowAction] =
		useState<DataTableRowAction<IMember> | null>(null);
	const memoizedColumns = useMemo(
		() => getMembersColumnConfig({ setRowAction }),
		[],
	);

	const { table } = useDataTable({
		data: membersData,
		columns: memoizedColumns,
		pageCount: 1,
		initialState: {
			columnPinning: { right: ["actions"] },
		},
		getRowId: (originalRow) => originalRow.id,
	});

	if (isLoadingMembers) {
		return (
			<DataTableSkeleton
				columnCount={11}
				filterCount={4}
				cellWidths={[
					"2rem",
					"2rem",
					"4rem",
					"3rem",
					"12rem",
					"16rem",
					"6rem",
					"6rem",
					"8rem",
					"7rem",
					"3rem",
				]}
				shrinkZero
			/>
		);
	}

	if (membersError || !membersData) {
		return (
			<ErrorAlert
				title="Error loading members"
				description="Please try again later."
			/>
		);
	}
	return (
		<>
			<DataTable
				table={table}
				actionBar={
					<MembersTableActionBar
						table={table}
						bulkDeleteMembers={bulkDeleteMembers}
						isBulkDeletingMembers={isBulkDeletingMembers}
						bulkDeleteMembersError={bulkDeleteMembersError}
					/>
				}
			>
				<DataTableToolbar table={table} />
			</DataTable>
			<DeleteMemberDialog
				open={rowAction?.variant === "delete"}
				onOpenChange={() => setRowAction(null)}
				showTrigger={false}
				members={rowAction?.row.original ? [rowAction?.row.original] : []}
				deleteMember={deleteMember}
				isDeletingMember={isDeletingMember}
				deleteMemberError={deleteMemberError}
				bulkDeleteMembers={bulkDeleteMembers}
				isBulkDeletingMembers={isBulkDeletingMembers}
				bulkDeleteMembersError={bulkDeleteMembersError}
			/>
			<UpdateMemberDialog
				open={rowAction?.variant === "update"}
				onOpenChange={() => setRowAction(null)}
				showTrigger={false}
				member={rowAction?.row.original || null}
				updateMember={updateMember}
				isUpdatingMember={isUpdatingMember}
				updateMemberError={updateMemberError}
			/>
		</>
	);
};

export default MembersTable;
