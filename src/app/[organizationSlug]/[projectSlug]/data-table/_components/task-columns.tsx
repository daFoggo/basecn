"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  AlertCircle,
  BadgeCheck,
  Calendar,
  Clock,
  DollarSign,
  Hash,
  Tag,
  Text,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { useMemo } from "react";
import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { createLevelConfig } from "@/constants/color-levels";
import { cn } from "@/lib/utils";
import {
  CATEGORY_OPTIONS,
  type ITask,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  type TTaskPriority,
  type TTaskStatus,
} from "../_data/tasks";

// ─── Color Config ─────────────────────────────────────────────────────────────

const STATUS_CONFIG = createLevelConfig<TTaskStatus>({
  todo: { level: "neutral", label: "Todo" },
  in_progress: { level: "blue", label: "In Progress" },
  done: { level: "success", label: "Done" },
  cancelled: { level: "gray", label: "Cancelled" },
});

const PRIORITY_CONFIG = createLevelConfig<TTaskPriority>({
  low: { level: "neutral", label: "Low" },
  medium: { level: "blue", label: "Medium" },
  high: { level: "warning", label: "High" },
  urgent: { level: "danger", label: "Urgent" },
});

// ─── Cell Renderers ───────────────────────────────────────────────────────────

const getStatusBadge = (status: TTaskStatus) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.todo;
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-transparent font-medium",
        config.bgSubtle,
        config.text,
      )}
    >
      {config.label}
    </Badge>
  );
};

const getPriorityBadge = (priority: TTaskPriority) => {
  const config = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.low;
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize",
          config.bgSubtle,
          config.text,
        )}
      >
        {config.label}
      </span>
    </div>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useTaskColumns = (): ColumnDef<ITask>[] => {
  return useMemo<ColumnDef<ITask>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => (
          <span className="font-mono text-xs text-muted-foreground">
            {row.getValue("id")}
          </span>
        ),
        meta: {
          label: "ID",
          variant: "text",
          icon: Hash,
        },
        enableSorting: true,
      },
      {
        id: "title",
        accessorKey: "title",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => (
          <div className="max-w-[260px] truncate font-medium">
            {row.getValue("title")}
          </div>
        ),
        meta: {
          label: "Title",
          placeholder: "Search titles...",
          variant: "text",
          icon: Text,
        },
        enableColumnFilter: true,
        enableSorting: true,
      },
      {
        id: "status",
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => getStatusBadge(row.getValue("status")),
        meta: {
          label: "Status",
          variant: "multiSelect",
          options: STATUS_OPTIONS,
          icon: BadgeCheck,
        },
        enableColumnFilter: true,
        enableSorting: true,
      },
      {
        id: "priority",
        accessorKey: "priority",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => getPriorityBadge(row.getValue("priority")),
        meta: {
          label: "Priority",
          variant: "select",
          options: PRIORITY_OPTIONS,
          icon: AlertCircle,
        },
        enableColumnFilter: true,
        enableSorting: true,
      },
      {
        id: "category",
        accessorKey: "category",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => (
          <span className="text-sm capitalize">{row.getValue("category")}</span>
        ),
        meta: {
          label: "Category",
          variant: "multiSelect",
          options: CATEGORY_OPTIONS,
          icon: Tag,
        },
        enableColumnFilter: true,
        enableSorting: true,
      },
      {
        id: "assignee",
        accessorKey: "assignee",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {(row.getValue("assignee") as string).charAt(0)}
            </div>
            <span className="truncate text-sm">{row.getValue("assignee")}</span>
          </div>
        ),
        meta: {
          label: "Assignee",
          placeholder: "Search assignees...",
          variant: "text",
          icon: Users,
        },
        enableColumnFilter: true,
        enableSorting: true,
      },
      {
        id: "estimatedHours",
        accessorKey: "estimatedHours",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => (
          <span className="text-sm">{row.getValue("estimatedHours")}h</span>
        ),
        meta: {
          label: "Est. Hours",
          placeholder: "Filter hours...",
          variant: "range",
          range: [3, 40],
          unit: "hr",
          icon: Clock,
        },
        enableColumnFilter: true,
        enableSorting: true,
      },
      {
        id: "budget",
        accessorKey: "budget",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => (
          <span className="font-mono text-sm">
            ${(row.getValue("budget") as number).toLocaleString()}
          </span>
        ),
        meta: {
          label: "Budget",
          placeholder: "Filter budget...",
          variant: "number",
          unit: "$",
          icon: DollarSign,
        },
        enableColumnFilter: true,
        enableSorting: true,
      },
      {
        id: "dueDate",
        accessorKey: "dueDate",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => (
          <span className="text-sm">
            {new Date(row.getValue("dueDate") as number).toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric", year: "numeric" },
            )}
          </span>
        ),
        meta: {
          label: "Due Date",
          variant: "dateRange",
          icon: Calendar,
        },
        enableColumnFilter: true,
        enableSorting: true,
      },
      {
        id: "isBlocked",
        accessorKey: "isBlocked",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
          const blocked = row.getValue("isBlocked") as boolean;
          return (
            <Badge variant={blocked ? "destructive" : "outline"}>
              {blocked ? "Blocked" : "Clear"}
            </Badge>
          );
        },
        meta: {
          label: "Blocked",
          variant: "boolean",
          icon: XCircle,
        },
        enableColumnFilter: true,
        enableSorting: true,
      },
      {
        id: "completionRate",
        accessorKey: "completionRate",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
          const rate = row.getValue("completionRate") as number;
          return (
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${rate}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{rate}%</span>
            </div>
          );
        },
        meta: {
          label: "Completion Rate",
          variant: "range",
          range: [0, 100],
          unit: "%",
          icon: Zap,
        },
        enableColumnFilter: true,
        enableSorting: true,
      },
    ],
    [],
  );
};
