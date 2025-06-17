"use client";

import { ErrorAlert } from "@/components/common/error-alert";
import { Loader } from "@/components/common/loaders";
import { PageLoader } from "@/components/common/page-loader";
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
import { useState } from "react";
import { toast } from "sonner";
import { useNotebookManageForm } from "../hooks/use-notebook-manage-form";
import { useThreadsManagement } from "../hooks/use-threads-management";
import { NotebookCard } from "./notebook-card";
import { NotebookTable } from "./notebook-table";

type ViewMode = "card" | "table";
type SortOption = "title" | "updated";

export const NoteBookList = () => {
  const SAMPLE_USER_ID = "1";
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [sortBy, setSortBy] = useState<SortOption>("updated");

  const { threads, isLoading, isError } = useThreadsManagement(SAMPLE_USER_ID);
  const {
    handleCreateNoteBook,
    isCreating,
    onOpenUpdateForm,
    onOpenDeleteForm,
  } = useNotebookManageForm(SAMPLE_USER_ID);

  if (isLoading) return <PageLoader variant="bars" />;

  if (isError) {
    toast.error("Không thể tải danh sách notebook");
    return <ErrorAlert title="Có lỗi xảy ra trong quá trình tải notebook" />;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
        <Button onClick={handleCreateNoteBook} disabled={isCreating}>
          {isCreating ? (
            <>
              <Loader />
              <span>Đang tạo...</span>
            </>
          ) : (
            <>
              <Plus className="size-4" />
              <span>Tạo notebook mới</span>
            </>
          )}
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
          {threads?.map((notebook) => (
            <NotebookCard
              key={notebook.id}
              notebook={notebook}
              onOpenUpdateForm={onOpenUpdateForm}
              onOpenDeleteForm={onOpenDeleteForm}
            />
          ))}
        </div>
      ) : (
        <NotebookTable
          notebooks={threads || []}
          onOpenUpdateForm={onOpenUpdateForm}
          onOpenDeleteForm={onOpenDeleteForm}
        />
      )}

      {threads?.length === 0 && (
        <div className="flex flex-col justify-center items-center py-12 text-center">
          <div className="bg-muted mb-4 p-4 rounded-full">
            <LayoutGrid className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 font-semibold text-lg">Chưa có notebook nào</h3>
          <p className="mb-4 text-muted-foreground">
            Tạo notebook đầu tiên để bắt đầu ghi chú
          </p>
          <Button onClick={handleCreateNoteBook} disabled={isCreating}>
            {isCreating ? (
              <>
                <Loader />
                <span>Đang tạo...</span>
              </>
            ) : (
              <>
                <Plus className="size-4" />
                Tạo notebook mới
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
