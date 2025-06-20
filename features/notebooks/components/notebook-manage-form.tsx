"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useNotebookManageForm,
  useNotebookManageFormStore,
} from "../hooks/use-notebook-manage-form";

const formSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
});

export const NoteBookMangeForm = () => {
  const SAMPLE_USER_ID = "1";
  const { formType, isOpen, setIsOpen, selectedNotebookId } =
    useNotebookManageFormStore();
  const { onCloseForm, handleDeleteNotebook, handleUpdateNotebook } =
    useNotebookManageForm(SAMPLE_USER_ID);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedNotebookId) return;
    // Gọi function update notebook (cần implement)
    handleUpdateNotebook?.(selectedNotebookId, { title: values.title });
  }

  const handleDelete = () => {
    if (!selectedNotebookId) return;
    // Gọi function delete notebook (cần implement)
    handleDeleteNotebook?.(selectedNotebookId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {formType === "update"
              ? "Chỉnh sửa sổ tay"
              : "Bạn có chắc chắn muốn xóa?"}
          </DialogTitle>
          <DialogDescription>
            {formType === "update"
              ? "Thực hiện thay đổi thông tin sổ tay của bạn. Nhấn lưu khi hoàn tất."
              : "Hành động này không thể hoàn tác. Sổ tay sẽ bị xóa vĩnh viễn khỏi hệ thống."}
          </DialogDescription>
        </DialogHeader>

        {formType === "update" ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề*</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tiêu đề sổ tay" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={onCloseForm}>
                  Hủy
                </Button>
                <Button type="submit">Lưu thay đổi</Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <DialogFooter>
            <Button variant="outline" onClick={onCloseForm}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Xác nhận xóa
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
