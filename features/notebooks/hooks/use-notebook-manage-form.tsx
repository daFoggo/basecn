"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { create } from "zustand";
import { useThreadsManagement } from "./use-threads-management";

interface INotebookManageFormStore {
  isOpen: boolean;
  formType: "update" | "delete";
  selectedNotebookId: string | null;
  setIsOpen: (isOpen: boolean) => void;
  setFormType: (formType: "update" | "delete") => void;
  setSelectedNotebookId: (id: string | null) => void;
}

export const useNotebookManageFormStore = create<INotebookManageFormStore>(
  (set) => ({
    isOpen: false,
    formType: "update",
    selectedNotebookId: null,
    setIsOpen: (isOpen) => set({ isOpen }),
    setFormType: (formType) => set({ formType }),
    setSelectedNotebookId: (id) => set({ selectedNotebookId: id }),
  })
);

export const useNotebookManageForm = (userId: string) => {
  const router = useRouter();
  const store = useNotebookManageFormStore();
  const { createThread, isCreating } = useThreadsManagement(userId);

  const handleCreateNoteBook = async () => {
    try {
      const newThread = await createThread({
        user_id: userId,
        title: "Untitled Notebook",
      });

      if (newThread?.id) {
        toast.success("Notebook created successfully");
        router.push(`/notebooks/${newThread.id}`);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tạo notebook");
      console.error("Error creating notebook:", error);
    }
  };

  // Update notebook
  const handleUpdateNotebook = async (
    id: string,
    data: { title?: string; description?: string }
  ) => {
    try {
      // await updateThread(id, data) // Uncomment khi có API
      toast.success("Notebook updated successfully");
      onCloseForm();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật notebook");
      console.error("Error updating notebook:", error);
    }
  };

  // Delete notebook
  const handleDeleteNotebook = async (id: string) => {
    try {
      // await deleteThread(id) // Uncomment khi có API
      toast.success("Notebook deleted successfully");
      onCloseForm();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa notebook");
      console.error("Error deleting notebook:", error);
    }
  };

  // Open update form
  const onOpenUpdateForm = (notebookId: string, e: any) => {
    e.stopPropagation();
    store.setSelectedNotebookId(notebookId);
    store.setFormType("update");
    store.setIsOpen(true);
  };

  // Open delete confirmation
  const onOpenDeleteForm = (notebookId: string, e: any) => {
    e.stopPropagation();
    store.setSelectedNotebookId(notebookId);
    store.setFormType("delete");
    store.setIsOpen(true);
  };

  // Close form
  const onCloseForm = () => {
    store.setIsOpen(false);
    store.setSelectedNotebookId(null);
  };

  return {
    isOpen: store.isOpen,
    formType: store.formType,
    selectedNotebookId: store.selectedNotebookId,

    isCreating,

    handleCreateNoteBook,
    handleUpdateNotebook,
    handleDeleteNotebook,

    onOpenUpdateForm,
    onOpenDeleteForm,
    onCloseForm,
  };
};
