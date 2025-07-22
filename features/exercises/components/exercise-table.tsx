"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { enumToOptions } from "@/lib/utils";
import type { Column, ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import React from "react";
import { EXERCISE_LEVEL, SAMPLE_EXERCISE } from "../utils/constants";
import type { IExercise } from "../utils/types";
import { ExerciseLevelBadge } from "./exercise-level-badge";

export const ExerciseTable = () => {
  const router = useRouter();

  function handleNavigateExercise(exercise: IExercise) {
    router.push(`/exercise/${exercise.id}`);
  }

  const columns = React.useMemo<ColumnDef<IExercise>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: ({ column }: { column: Column<IExercise, unknown> }) => (
          <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ cell }) => (
          <div className="bg-muted px-3 py-1 rounded-lg w-fit font-mono font-medium">
            {cell.getValue<IExercise["id"]>()}
          </div>
        ),
        meta: {
          label: "ID",
        },
        size: 30,
      },
      {
        id: "name",
        accessorKey: "name",
        header: ({ column }: { column: Column<IExercise, unknown> }) => (
          <DataTableColumnHeader column={column} title="Tên bài" />
        ),
        cell: ({ cell }) => <div>{cell.getValue<IExercise["name"]>()}</div>,
        meta: {
          label: "Tên bài",
          placeholder: "Tìm kiếm theo tên bài",
          variant: "text",
        },
        enableColumnFilter: true,
      },
      {
        id: "level",
        accessorKey: "level",
        header: ({ column }: { column: Column<IExercise, unknown> }) => (
          <DataTableColumnHeader column={column} title="Mức độ" />
        ),
        cell: ({ cell }) => (
          <ExerciseLevelBadge level={cell.getValue<IExercise["level"]>()} />
        ),
        meta: {
          label: "Mức độ",
          variant: "multiSelect",
          options: enumToOptions(EXERCISE_LEVEL),
        },
        enableColumnFilter: true,
        enableSorting: false,
      },
    ],
    []
  );

  const { table } = useDataTable({
    data: SAMPLE_EXERCISE,
    columns,
    pageCount: 1,
    // initialState: {
    //   sorting: [{ id: "title", desc: true }],
    //   columnPinning: { right: ["actions"] },
    // },
    getRowId: (row) => row.id,
  });

  // const isLoading = true;

  // if (isLoading) {
  //   return (
  //     <DataTableSkeleton columnCount={columns.length} rowCount={5} withPagination={false} />
  //   )
  // }

  return (
    <DataTable table={table} onRowClick={handleNavigateExercise}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
};
