import PageHeader from "@/components/common/page-header";
import { ExerciseTable } from "./exercise-table";

export const ExercisesList = () => {
  return (
    <div className="flex flex-col gap-6 py-6 sm:py-12 container">
      <PageHeader
        breadcrumbs={[]}
        title="Danh sách bài tập"
      />
      <ExerciseTable />
    </div>
  );
};
