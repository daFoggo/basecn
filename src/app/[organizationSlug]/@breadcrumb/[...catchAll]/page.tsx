import { getDashboardBreadcrumb } from "@/utils/navigation";
import { HeaderBreadcrumb } from "../../components/header-breadcrumb";

interface PageParams {
  organizationSlug: string;
  catchAll: string[];
}

interface PageProps {
  params: Promise<PageParams>;
}

export default async function BreadcrumbcatchAllPage({ params }: PageProps) {
  const resolvedParams = await params;
  const items = getDashboardBreadcrumb(
    resolvedParams.organizationSlug,
    resolvedParams.catchAll,
  );
  return <HeaderBreadcrumb items={items} />;
}
