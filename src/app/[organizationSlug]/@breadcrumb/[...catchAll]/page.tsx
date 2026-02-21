import { getDashboardBreadcrumb } from "@/utils/navigation";
import { HeaderBreadcrumb } from "../../components/header-breadcrumb";

interface PageParams {
  organizationSlug: string;
  catchAll: string[];
}

interface IPageProps {
  params: Promise<PageParams>;
}

export default async function BreadcrumbcatchAllPage({ params }: IPageProps) {
  const resolvedParams = await params;
  const items = getDashboardBreadcrumb(
    resolvedParams.organizationSlug,
    resolvedParams.catchAll,
  );
  return <HeaderBreadcrumb items={items} />;
}
