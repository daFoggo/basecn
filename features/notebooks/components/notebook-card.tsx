"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/format";
import { Clock, FileText, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { INoteBook } from "../utils/types";
import { NoteBookMangeForm } from "./notebook-manage-form";

interface INotebookCardProps {
  notebook: INoteBook;
  onOpenUpdateForm: (notebookId: string, e: any) => void;
  onOpenDeleteForm: (notebookId: string, e: any) => void;
}

export function NotebookCard({
  notebook,
  onOpenUpdateForm,
  onOpenDeleteForm,
}: INotebookCardProps) {
  const router = useRouter();
  const sources = notebook?.sources || [];
  const handleNavigateToNotebook = () => {
    router.push(`/notebooks/${notebook.id}`);
  };

  return (
    <>
      <Card
        className="group flex flex-col justify-between gap-3 hover:border-primary transition-all cursor-pointer"
        onClick={handleNavigateToNotebook}
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <p className="text-h4 truncate">
                {notebook.title || "Chưa có tiêu đề"}
              </p>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {notebook.description || "Chưa có mô tả"}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => onOpenUpdateForm(notebook.id, e)}
                >
                  Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={(e) => onOpenDeleteForm(notebook.id, e)}
                >
                  Xóa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">
                {sources.length} nguồn
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="size-4" />
              <span>{formatDate(notebook?.updatedAt)}</span>
            </div>
          </div>
          {sources.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {sources.slice(0, 2).map((source) => (
                <Badge key={source.id} variant="secondary" className="text-xs">
                  {source.title}
                </Badge>
              ))}
              {sources.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{sources.length - 2} khác
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <NoteBookMangeForm />
    </>
  );
}
