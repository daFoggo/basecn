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
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { useMemo } from "react";
import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CATEGORY_OPTIONS,
  PRIORITY_COLOR_CONFIG,
  PRIORITY_OPTIONS,
  STATUS_COLOR_CONFIG,
  STATUS_OPTIONS,
} from "@/features/task/constants";
import type { ITask, TTaskPriority, TTaskStatus } from "@/features/task/types";
import { cn } from "@/lib/utils";

const renderStatusBadge = (status: TTaskStatus) => {
  const config = STATUS_COLOR_CONFIG[status] || STATUS_COLOR_CONFIG.todo;
  return (
    <Badge
      variant="outline"
      className={cn("font-normal", config.bgSubtle, config.text)}
    >
      {config.label}
    </Badge>
  );
};

const renderPriorityBadge = (priority: TTaskPriority) => {
  const config = PRIORITY_COLOR_CONFIG[priority] || PRIORITY_COLOR_CONFIG.low;
  return (
    <Badge
      variant="outline"
      className={cn("capitalize font-normal", config.bgSubtle, config.text)}
    >
      {config.label}
    </Badge>
  );
};

export const useTaskColumns = () => {
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
        cell: ({ row }) => renderStatusBadge(row.getValue("status")),
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
        cell: ({ row }) => renderPriorityBadge(row.getValue("priority")),
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
        id: "assignees",
        accessorKey: "assignees",
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
          const assignees = row.getValue("assignees") as string[];
          const minimalCount = 3;
          const showAssignees = assignees.slice(0, minimalCount);
          const remaining = assignees.length - minimalCount;

          return (
            <HoverCard openDelay={300} closeDelay={300}>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <AvatarGroup data-size="sm">
                    {showAssignees.map((assignee) => (
                      <Avatar key={assignee} size="sm">
                        <AvatarFallback>
                          {assignee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {remaining > 0 && (
                      <AvatarGroupCount>+{remaining}</AvatarGroupCount>
                    )}
                  </AvatarGroup>
                  <span className="truncate text-sm">
                    {assignees.length === 1
                      ? assignees[0]
                      : `${assignees.length} Assignees`}
                  </span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="flex flex-col items-start gap-4">
                <p className="text-sm font-semibold">Assignees</p>
                <ScrollArea className="h-52 w-full">
                  <div>
                    <ItemGroup className=" gap-2">
                      {assignees.map((assignee) => (
                        <Item
                          key={assignee}
                          size="sm"
                          className="p-1"
                          variant="muted"
                        >
                          <ItemMedia>
                            <Avatar size="sm">
                              <AvatarFallback>
                                {assignee
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </ItemMedia>
                          <ItemContent>
                            <ItemTitle className="font-normal">
                              {assignee}
                            </ItemTitle>
                          </ItemContent>
                          <ItemActions>
                            <Button variant="secondary" size="icon-xs">
                              <X />
                            </Button>
                          </ItemActions>
                        </Item>
                      ))}
                    </ItemGroup>
                  </div>
                </ScrollArea>
              </HoverCardContent>
            </HoverCard>
          );
        },
        meta: {
          label: "Assignees",
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
