import type { Table } from "@tanstack/react-table";
import { Download, Trash2 } from "lucide-react";
import { useCallback, useState, useTransition } from "react";
import {
	DataTableActionBar,
	DataTableActionBarAction,
	DataTableActionBarSelection,
} from "@/components/data-table/data-table-action-bar";
import { Separator } from "@/components/ui/separator";
import type { IMember } from "@/features/overview";
import { exportTableToCSV } from "@/lib/utils/export-table-to-csv";

const actions = ["export", "delete"];

type Action = (typeof actions)[number];

interface IMembersTableActionBarProps {
	table: Table<IMember>;
	bulkDeleteMembers?: (ids: string[]) => void;
	isBulkDeletingMembers?: boolean;
	bulkDeleteMembersError?: Error | null;
}

const MembersTableActionBar = ({
	table,
	bulkDeleteMembers,
	isBulkDeletingMembers,
}: IMembersTableActionBarProps) => {
	const rows = table.getFilteredSelectedRowModel().rows;
	const [isPending, startTransition] = useTransition();
	const [currentAction, setCurrentAction] = useState<Action | null>(null);

	const getIsActionPending = useCallback(
		(action: Action) => isPending && currentAction === action,
		[isPending, currentAction],
	);

	const onMembersFExport = useCallback(() => {
		setCurrentAction("export");
		startTransition(() => {
			exportTableToCSV(table, {
				excludeColumns: ["select", "actions"],
				onlySelected: true,
			});
			console.log("Export action triggered", table);
		});
	}, [table]);

	const onMembersFDelete = useCallback(() => {
		setCurrentAction("delete");
		if (rows.length === 0) {
			return;
		}
		const ids = rows.map((row) => row.original.id);
		if (bulkDeleteMembers) {
			bulkDeleteMembers(ids);
		} else {
			console.warn("Bulk delete members function is not provided");
		}
	}, [rows, bulkDeleteMembers]);

	return (
		<DataTableActionBar table={table} visible={rows.length > 0}>
			<DataTableActionBarSelection table={table} />
			<Separator
				orientation="vertical"
				className="hidden sm:block data-[orientation=vertical]:h-5"
			/>
			<div className="flex items-center gap-1.5">
				<DataTableActionBarAction
					size="icon"
					tooltip="Export tasks"
					isPending={getIsActionPending("export")}
					onClick={onMembersFExport}
				>
					<Download />
				</DataTableActionBarAction>
				<DataTableActionBarAction
					size="icon"
					tooltip="Delete tasks"
					isPending={isBulkDeletingMembers}
					onClick={onMembersFDelete}
				>
					<Trash2 />
				</DataTableActionBarAction>
			</div>
		</DataTableActionBar>
	);
};

export default MembersTableActionBar;
