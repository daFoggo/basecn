"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTableToolbar } from "@/components/ui/data-table-toolbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { Column, ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useMemo } from "react";
import { useNotebookManageForm } from "../hooks/use-notebook-manage-form";
import { INoteBook } from "../utils/types";
import { NoteBookMangeForm } from "./notebook-manage-form";

interface INotebookTableProps {
  notebooks: INoteBook[];
}

export const NotebookTable = ({ notebooks }: INotebookTableProps) => {
  const { setFormType, setIsOpen } = useNotebookManageForm();

  const handleOpenForm = (type: "update" | "delete") => {
    setFormType(type);
    setIsOpen(true);
  };

  const columns = useMemo<ColumnDef<INoteBook>[]>(
    () => [
      {
        accessorKey: "title",
        meta: {
          label: "Tiêu đề",
          variant: "text",
        },
        enableSorting: true,
        enableColumnFilter: true,
        header: ({ column }: { column: Column<INoteBook, unknown> }) => (
          <DataTableColumnHeader column={column} title="Tiêu đề" />
        ),
        cell: ({ row }) => {
          const title = row.getValue("title") as string;
          return (
            <div className="font-medium">{title || "Untitled Notebook"}</div>
          );
        },
      },
      {
        accessorKey: "sources",
        header: "Các nguồn",
        meta: {
          label: "Các nguồn",
        },
        cell: ({ row }) => {
          const sources = row.getValue("sources") as INoteBook["sources"];
          return (
            <div className="flex flex-wrap gap-1">
              {sources?.slice(0, 2).map((source) => (
                <Badge key={source.id} variant="secondary" className="text-xs">
                  {source.title}
                </Badge>
              ))}
              {sources && sources?.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{sources?.length - 2}
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "updatedAt",
        meta: {
          label: "Cập nhật lúc",
          variant: "date",
        },
        enableColumnFilter: true,
        enableSorting: true,
        header: ({ column }: { column: Column<INoteBook, unknown> }) => (
          <DataTableColumnHeader column={column} title="Cập nhật lúc" />
        ),
        cell: ({ row }) => {
          const date = new Date(row.getValue("updatedAt"));
          return (
            <div className="text-muted-foreground">
              {date.toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          );
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleOpenForm("update")}> 
                  Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={() => handleOpenForm("delete")}>
                  Xóa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const { table } = useDataTable({
    data: notebooks,
    columns,
    pageCount: 1,
    manualPagination: false,
    manualSorting: false,
    manualFiltering: false,
    initialState: {
      sorting: [{ id: "updatedAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
  });

  return (
    <div>
      <DataTable table={table}>
        <DataTableToolbar table={table} />
      </DataTable>
      <NoteBookMangeForm />
    </div>
  );
};
