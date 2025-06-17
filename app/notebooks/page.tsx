import { PageLoader } from "@/components/common/page-loader";
import { NoteBookList } from "@/features/notebooks";
import { Suspense } from "react";

const NoteBooksPage = () => {
  return (
    <Suspense fallback={<PageLoader variant="bars" />}>
      <div className="flex flex-col gap-6">
        <p className="text-h1">Chào mừng bạn đến với Notebook Thái Bình </p>
        <NoteBookList />
      </div>
    </Suspense>
  );
};

export default NoteBooksPage;
