"use client";

import { Suspense, useState } from "react";
import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableAdvancedToolbar } from "@/components/common/data-table/data-table-advanced-toolbar";
import { DataTableFilterList } from "@/components/common/data-table/data-table-filter-list";
import { DataTableFilterMenu } from "@/components/common/data-table/data-table-filter-menu";
import { DataTableSortList } from "@/components/common/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/common/data-table/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataTable } from "@/hooks/use-data-table";
import { cn } from "@/lib/utils";
import { useTaskColumns } from "./_components/task-columns";
import type { ITask } from "./_data/tasks";
import { useServerData } from "./_data/use-server-data";

// ─── Constants ────────────────────────────────────────────────────────────────

type TToolbarMode = "standard" | "filter-list" | "filter-menu";

const TOOLBAR_TABS: { value: TToolbarMode; label: string }[] = [
  { value: "standard", label: "Standard Toolbar" },
  { value: "filter-list", label: "Filter List" },
  { value: "filter-menu", label: "Filter Menu" },
];

const FILTER_LEGEND = [
  { color: "bg-blue-500", label: "Text", desc: "ID, Title, Assignee" },
  { color: "bg-green-500", label: "Multi-Select", desc: "Status, Category" },
  { color: "bg-orange-500", label: "Select", desc: "Priority" },
  { color: "bg-purple-500", label: "Range", desc: "Est. Hours, Completion" },
  { color: "bg-red-500", label: "Number", desc: "Budget" },
  { color: "bg-yellow-500", label: "Date Range", desc: "Due Date" },
  { color: "bg-pink-500", label: "Boolean", desc: "Blocked" },
];

// ─── Inner page (needs Suspense for useSearchParams in useServerData) ─────────

function DataTableDemoInner() {
  const [toolbarMode, setToolbarMode] = useState<TToolbarMode>("standard");
  const columns = useTaskColumns();
  const isAdvanced = toolbarMode !== "standard";

  const { data, pageCount } = useServerData({
    enableAdvancedFilter: isAdvanced,
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
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Task Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Server-side data table - filtering, sorting and pagination are
          processed by the API. All state lives in the URL.
        </p>
      </div>

      {/* Toolbar Mode Switcher */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Toolbar Mode
        </p>
        <Tabs
          value={toolbarMode}
          onValueChange={(v) => setToolbarMode(v as TToolbarMode)}
        >
          <TabsList>
            {TOOLBAR_TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Filter Variant Legend */}
      <div className="rounded-lg border bg-muted/30 p-3">
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Filter variants
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5">
          {FILTER_LEGEND.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <span
                className={cn("size-2 rounded-full shrink-0", item.color)}
              />
              <span className="font-medium text-foreground">{item.label}</span>
              <span>- {item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selection Action Bar */}
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

      {/* Data Table */}
      <DataTable table={table}>
        {toolbarMode === "standard" && (
          <DataTableToolbar table={table}>
            <DataTableSortList table={table} align="end" />
          </DataTableToolbar>
        )}

        {toolbarMode === "filter-list" && (
          <DataTableAdvancedToolbar table={table}>
            <DataTableFilterList table={table} />
            <DataTableSortList table={table} align="end" />
          </DataTableAdvancedToolbar>
        )}

        {toolbarMode === "filter-menu" && (
          <DataTableAdvancedToolbar table={table}>
            <DataTableFilterMenu table={table} />
            <DataTableSortList table={table} align="end" />
          </DataTableAdvancedToolbar>
        )}
      </DataTable>
    </div>
  );
}

// ─── Page export (Suspense boundary for useSearchParams) ──────────────────────

export default function DataTableDemoPage() {
  return (
    <Suspense>
      <DataTableDemoInner />
    </Suspense>
  );
}
