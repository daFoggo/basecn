"use client";

import { useState } from "react";
import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableAdvancedToolbar } from "@/components/common/data-table/data-table-advanced-toolbar";
import { DataTableFilterList } from "@/components/common/data-table/data-table-filter-list";
import { DataTableFilterMenu } from "@/components/common/data-table/data-table-filter-menu";
import { DataTableSortList } from "@/components/common/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/common/data-table/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { FilterTypeDescription } from "@/features/task/components/filter-type-description";
import { useTaskColumns } from "@/features/task/components/task-columns";
import { ToolbarModeTabs } from "@/features/task/components/toolbar-mode-tabs";
import { TOOLBAR_MODE } from "@/features/task/constants";
import { useTasks } from "@/features/task/hooks";
import type {
  ITask,
  ITasksApiResponse,
  TToolbarMode,
} from "@/features/task/types";
import { useDataTable } from "@/hooks/use-data-table";

interface ITaskDataTableProps {
  initialData: ITasksApiResponse;
}

export const TaskDataTable = ({ initialData }: ITaskDataTableProps) => {
  const [toolbarMode, setToolbarMode] = useState<TToolbarMode>(
    TOOLBAR_MODE.STANDARD,
  );
  const columns = useTaskColumns();
  const isAdvanced = toolbarMode !== TOOLBAR_MODE.STANDARD;

  const { data, pageCount } = useTasks({
    enableAdvancedFilter: isAdvanced,
    fallbackData: initialData,
  });

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    initialState: {
      sorting: [{ id: "dueDate", desc: false }],
      pagination: { pageIndex: 0, pageSize: 10 },
      columnPinning: { right: ["completionRate"] },
    },
    getRowId: (row: ITask) => row.id,
    enableAdvancedFilter: isAdvanced,
    shallow: false,
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-semibold tracking-tight">Task Management</p>
        <p className="text-sm text-muted-foreground">
          Server-side data table - filtering, sorting and pagination are
          processed by the API. All state lives in the URL.
        </p>
      </div>

      <ToolbarModeTabs
        value={toolbarMode}
        onChange={(mode) => setToolbarMode(mode)}
      />

      <FilterTypeDescription />

      {selectedRows.length > 0 && (
        <div className="flex items-center gap-3 rounded-lg border bg-muted/50 px-4 py-2.5">
          <span className="text-sm font-medium">
            {selectedRows.length} row{selectedRows.length > 1 ? "s" : ""}{" "}
            selected
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.toggleAllRowsSelected(false)}
          >
            Clear selection
          </Button>
          <Button variant="destructive" size="sm">
            Delete selected
          </Button>
        </div>
      )}

      <DataTable table={table}>
        {toolbarMode === TOOLBAR_MODE.STANDARD && (
          <DataTableToolbar table={table}>
            <DataTableSortList table={table} align="end" />
          </DataTableToolbar>
        )}

        {toolbarMode === TOOLBAR_MODE.FILTER_LIST && (
          <DataTableAdvancedToolbar table={table}>
            <DataTableFilterList table={table} />
            <DataTableSortList table={table} align="end" />
          </DataTableAdvancedToolbar>
        )}

        {toolbarMode === TOOLBAR_MODE.FILTER_MENU && (
          <DataTableAdvancedToolbar table={table}>
            <DataTableFilterMenu table={table} />
            <DataTableSortList table={table} align="end" />
          </DataTableAdvancedToolbar>
        )}
      </DataTable>
    </div>
  );
};
