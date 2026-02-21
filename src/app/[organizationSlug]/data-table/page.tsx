import { Suspense } from "react";
import { TaskDataTable, taskServer } from "@/features/task";

interface IPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const DataTableDemoPage = async (props: IPageProps) => {
  const searchParams = await props.searchParams;
  const p = new URLSearchParams();
  const resolvedParams = searchParams;

  Object.entries(resolvedParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        p.append(key, v);
      });
    } else if (value) {
      p.append(key, value);
    }
  });

  const queryString = p.toString();
  const tasks = await taskServer.getTasks(queryString);

  return (
    <Suspense>
      <TaskDataTable initialData={tasks} />
    </Suspense>
  );
};

export default DataTableDemoPage;
