"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { LayoutGrid, Plus, TableProperties } from "lucide-react";
import { useMemo, useState } from "react";
import { SAMPLE_NOTEBOOKS } from "../utils/constants";
import { NotebookCard } from "./notebook-card";
import { NotebookTable } from "./notebook-table";

type ViewMode = "card" | "table";
type SortOption = "title" | "updated";

export const NoteBookList = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [sortBy, setSortBy] = useState<SortOption>("updated");

  const sortedNotebooks = useMemo(() => {
    const notebooks = [...SAMPLE_NOTEBOOKS];

    switch (sortBy) {
      case "title":
        return notebooks.sort((a, b) => {
          const titleA = a.title || "Untitled";
          const titleB = b.title || "Untitled";
          return titleA.localeCompare(titleB);
        });
      case "updated":
        return notebooks.sort(
          (a, b) =>
            new Date(b.updatedAt || 0).getTime() -
            new Date(a.updatedAt || 0).getTime()
        );
      default:
        return notebooks;
    }
  }, [sortBy]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
        <Button>
          <Plus className="size-4" />
          Tạo mới
        </Button>

        <div className="flex items-center gap-6">
          {viewMode === "card" && (
            <Select
              value={sortBy}
              onValueChange={(value: SortOption) => setSortBy(value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Tên A-Z</SelectItem>
                <SelectItem value="updated">Gần đây</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* View Toggle */}
          <div className="flex border rounded-md">
            <Toggle
              pressed={viewMode === "card"}
              onPressedChange={() => setViewMode("card")}
              className="border-r rounded-r-none"
            >
              <LayoutGrid className="size-4" />
            </Toggle>
            <Toggle
              pressed={viewMode === "table"}
              onPressedChange={() => setViewMode("table")}
              className="rounded-l-none"
            >
              <TableProperties className="size-4" />
            </Toggle>
          </div>
        </div>
      </div>

      {/* List */}
      {viewMode === "card" ? (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedNotebooks.map((notebook) => (
            <NotebookCard key={notebook.id} notebook={notebook} />
          ))}
        </div>
      ) : (
        <NotebookTable notebooks={SAMPLE_NOTEBOOKS} />
      )}

      {sortedNotebooks.length === 0 && (
        <div className="flex flex-col justify-center items-center py-12 text-center">
          <div className="bg-muted mb-4 p-4 rounded-full">
            <LayoutGrid className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 font-semibold text-lg">Chưa có notebook nào</h3>
          <p className="mb-4 text-muted-foreground">
            Tạo notebook đầu tiên để bắt đầu ghi chú
          </p>
          <Button>
            <Plus className="size-4" />
            Tạo notebook mới
          </Button>
        </div>
      )}
    </div>
  );
};
