"use client";

import { useMemo } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { SAMPLE_MEMBERS_DATA } from "@/features/overview";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { membersColumnConfig } from "./members-column-config";

const MembersTable = () => {
	const memoizedColumns = useMemo(() => membersColumnConfig, []);

	const { table } = useDataTable({
		data: SAMPLE_MEMBERS_DATA,
		columns: memoizedColumns,
		pageCount: 1,
		getRowId: (row) => row.id,
	});

	return (
		<DataTable table={table}>
			<DataTableToolbar table={table} />
		</DataTable>
	);
};

export default MembersTable;
