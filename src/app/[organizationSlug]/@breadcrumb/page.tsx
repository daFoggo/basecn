import { getDashboardBreadcrumb } from "@/utils/navigation";
import { HeaderBreadcrumb } from "../components/header-breadcrumb";

interface PageParams {
  organizationSlug: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

export default async function BreadcrumbPage({ params }: PageProps) {
  const { organizationSlug } = await params;
  const items = getDashboardBreadcrumb(organizationSlug, []);

  // If no items found (e.g. root /org which might not be in nav explicitly),
  // we could optionally add a default "Home" or "Organization" item.
  // For now, if empty, it renders nothing.

  return <HeaderBreadcrumb items={items} />;
}
