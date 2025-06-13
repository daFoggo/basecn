"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTable } from "@/lib/hooks/use-data-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTableToolbar } from "@/components/ui/data-table-toolbar";
import type { Column, ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle,
  CheckCircle2,
  DollarSign,
  MoreHorizontal,
  Text,
  XCircle,
} from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import * as React from "react";
import { use } from "react";

interface Project {
  id: string;
  title: string; // text
  status: "active" | "inactive"; // multiSelect
  budget: number; // number
  rating: number; // range
  startDate: string; // date
  period: { start: string; end: string }; // dateRange
  isFunded: boolean; // boolean
  category: "Education" | "Health" | "Tech"; // select
}

const data: Project[] = [
  {
    id: "1",
    title: "Project Alpha",
    status: "active",
    budget: 50000,
    rating: 4.5,
    startDate: "2025-01-15",
    period: { start: "2025-01-01", end: "2025-06-01" },
    isFunded: true,
    category: "Tech",
  },
  {
    id: "2",
    title: "Project Beta",
    status: "inactive",
    budget: 75000,
    rating: 3.8,
    startDate: "2025-02-20",
    period: { start: "2025-02-01", end: "2025-07-01" },
    isFunded: false,
    category: "Health",
  },
  {
    id: "3",
    title: "Project Gamma",
    status: "active",
    budget: 25000,
    rating: 4.9,
    startDate: "2025-03-10",
    period: { start: "2025-03-01", end: "2025-08-01" },
    isFunded: true,
    category: "Education",
  },
  {
    id: "4",
    title: "Project Delta",
    status: "active",
    budget: 100000,
    rating: 4.2,
    startDate: "2025-04-05",
    period: { start: "2025-04-01", end: "2025-09-01" },
    isFunded: false,
    category: "Tech",
  },
];

export const DiceUITable = () => {
  const [title] = useQueryState("title", parseAsString.withDefault(""));
  const [status] = useQueryState(
    "status",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  // Ideally we would filter the data server-side, but for the sake of this example, we'll filter the data client-side
  const filteredData = React.useMemo(() => {
    return data.filter((project) => {
      const matchesTitle =
        title === "" ||
        project.title.toLowerCase().includes(title.toLowerCase());
      const matchesStatus =
        status.length === 0 || status.includes(project.status);

      return matchesTitle && matchesStatus;
    });
  }, [title, status]);

  const columns = React.useMemo<ColumnDef<Project>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 32,
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "title",
        accessorKey: "title",
        header: ({ column }: { column: Column<Project, unknown> }) => (
          <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ cell }) => <div>{cell.getValue<Project["title"]>()}</div>,
        meta: {
          label: "Title",
          placeholder: "Search titles...",
          variant: "text",
          icon: Text,
        },
        enableColumnFilter: true,
      },
      {
        id: "status",
        accessorKey: "status",
        header: ({ column }: { column: Column<Project, unknown> }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ cell }) => {
          const status = cell.getValue<Project["status"]>();
          const Icon = status === "active" ? CheckCircle2 : XCircle;

          return (
            <Badge variant="outline" className="capitalize">
              <Icon />
              {status}
            </Badge>
          );
        },
        meta: {
          label: "Status",
          variant: "multiSelect",
          options: [
            { label: "Active", value: "active", icon: CheckCircle },
            { label: "Inactive", value: "inactive", icon: XCircle },
          ],
        },
        enableColumnFilter: true,
      },
      {
        id: "budget",
        accessorKey: "budget",
        meta: {
          label: "Budget",
        },
        header: ({ column }: { column: Column<Project, unknown> }) => (
          <DataTableColumnHeader column={column} title="Budget" />
        ),
        cell: ({ cell }) => {
          const budget = cell.getValue<Project["budget"]>();

          return (
            <div className="flex items-center gap-1">
              <DollarSign className="size-4" />
              {budget.toLocaleString("en-US")}
            </div>
          );
        },
      },
      {
        id: "rating",
        accessorKey: "rating",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Rating" />
        ),
        cell: ({ cell }) => <div>{cell.getValue<number>().toFixed(1)}</div>,
        meta: {
          label: "Rating",
          variant: "range",
        },
        enableColumnFilter: true,
      },
      {
        id: "startDate",
        accessorKey: "startDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Start Date" />
        ),
        cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
        meta: {
          label: "Start Date",
          variant: "date",
        },
        enableColumnFilter: true,
      },
      {
        id: "period",
        accessorKey: "period",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Period" />
        ),
        cell: ({ cell }) => {
          const period = cell.getValue<Project["period"]>();
          return <div>{`${period.start} - ${period.end}`}</div>;
        },
        meta: {
          label: "Project Period",
          variant: "dateRange",
        },
        enableColumnFilter: true,
      },
      {
        id: "isFunded",
        accessorKey: "isFunded",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Funded" />
        ),
        cell: ({ cell }) => (cell.getValue<boolean>() ? "Yes" : "No"),
        meta: {
          label: "Funded",
          variant: "boolean",
        },
        enableColumnFilter: true,
      },
      {
        id: "category",
        accessorKey: "category",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
        meta: {
          label: "Category",
          variant: "select",
          options: [
            { label: "Education", value: "Education" },
            { label: "Health", value: "Health" },
            { label: "Tech", value: "Tech" },
          ],
        },
        enableColumnFilter: true,
      },
      {
        id: "actions",
        cell: function Cell() {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        size: 32,
      },
    ],
    []
  );

  const { table } = useDataTable({
    data: filteredData,
    columns,
    pageCount: 1,
    initialState: {
      sorting: [{ id: "title", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (row) => row.id,
    manualPagination: false,
    manualSorting: false,
    manualFiltering: false,
  });

  return (
    <div>
      <DataTable table={table}>
        <DataTableToolbar table={table} />
      </DataTable>
    </div>
  );
};
